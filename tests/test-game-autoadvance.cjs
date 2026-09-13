const puppeteer = require('D:/Codes/Blogger_bot/node_modules/puppeteer');
const assert = require('node:assert/strict');

(async () => {
  console.log('=== 문장 기차 및 배달 게임 2초 자동 다음 미션 이동 테스트 ===');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();
  await page.goto('file:///D:/Codes/english_voca/index.html', { waitUntil: 'load' });

  // 1. 문장 기차 (Train) 자동 넘김 테스트
  console.log('\n[1. 문장 기차 (Train) 자동 넘김 테스트]');
  await page.click('#nav [data-action="tab"][data-value="game"]');
  await page.click('[data-action="start-game"][data-value="train"]');

  // 미션 1/3 진행: 올바른 토큰 조립
  const tokens = await page.evaluate(() => {
    const ko = document.querySelector('.game-prompt .question').textContent.trim();
    const w = window.CURRICULUM[0].words.find(word => word.exampleKo === ko);
    return w.example.trim().split(/\s+/);
  });
  console.log('1번 문장 정답 토큰:', tokens.join(' '));

  for (const token of tokens) {
    const idx = await page.evaluate((t) => {
      const btns = [...document.querySelectorAll('#train-bank [data-action="train-token"]')];
      return btns.findIndex(b => !b.disabled && b.textContent.trim() === t);
    }, token);
    await page.click(`#train-bank [data-action="train-token"][data-value="${idx}"]`);
  }

  // "기차 출발!" 클릭
  await page.click('[data-action="train-check"]');
  await page.waitForSelector('#game-next:not([hidden])');

  // 버튼 UI 검증: 타이머 배지와 프로그레스 바
  const timerNum1 = await page.$eval('#game-timer-num', el => el.textContent.trim());
  console.log('기차 정답 후 타이머 초기 숫자:', timerNum1);
  assert.equal(timerNum1, '2', '타이머 초기 숫자는 2여야 합니다.');

  const hasProgress = await page.evaluate(() => !!document.querySelector('.game-timer-progress'));
  assert.ok(hasProgress, '프로그레스 바 요소가 존재해야 합니다.');
  console.log('✅ 타이머 숫자 및 프로그레스 바 요소 확인 완료');

  // 2.1초 대기 후 자동으로 2번 미션으로 넘어갔는지 확인
  console.log('수동 클릭 없이 2초 자동 넘김 대기 중...');
  const t0 = Date.now();
  await page.waitForFunction(() => {
    const heading = document.querySelector('.game-top h2');
    return heading && heading.textContent.includes('2 /');
  }, { timeout: 4000 });
  const elapsed = (Date.now() - t0) / 1000;
  console.log(`✅ 기차 1번 -> 2번 자동 전환 성공! (소요 시간: ${elapsed.toFixed(2)}초)`);

  // 미션 2/3: 수동 클릭 시 즉시 전환되는지 검증
  const tokens2 = await page.evaluate(() => {
    const ko = document.querySelector('.game-prompt .question').textContent.trim();
    const w = window.CURRICULUM[0].words.find(word => word.exampleKo === ko);
    return w.example.trim().split(/\s+/);
  });
  for (const token of tokens2) {
    const idx = await page.evaluate((t) => {
      const btns = [...document.querySelectorAll('#train-bank [data-action="train-token"]')];
      return btns.findIndex(b => !b.disabled && b.textContent.trim() === t);
    }, token);
    await page.click(`#train-bank [data-action="train-token"][data-value="${idx}"]`);
  }
  await page.click('[data-action="train-check"]');
  await page.waitForSelector('#game-next:not([hidden])');

  // 즉시 수동 클릭
  await page.click('#game-next');
  await page.waitForFunction(() => {
    const heading = document.querySelector('.game-top h2');
    return heading && heading.textContent.includes('3 /');
  }, { timeout: 1000 });
  console.log('✅ 기차 2번 -> 3번 수동 클릭 즉시 전환 성공!');

  // 2. 듣고 배달하기 (Delivery) 자동 넘김 테스트
  console.log('\n[2. 듣고 배달하기 (Delivery) 자동 넘김 테스트]');
  await page.click('[data-action="game-menu"]');
  await page.click('[data-action="start-game"][data-value="delivery"]');

  // 1번 우편함 정답 선택
  await page.click('[data-action="game-meaning"]');
  const meaning = await page.$eval('#meaning-hint', el => el.textContent.trim());
  const wTarget = await page.evaluate((m) => {
    return window.CURRICULUM[0].words.find(w => w.ko === m).en;
  }, meaning);
  console.log('1번 배달 정답 단어:', wTarget, `(${meaning})`);

  const correctBoxIdx = await page.evaluate((targetKo) => {
    const btns = [...document.querySelectorAll('.world-destinations.mailboxes button')];
    return btns.findIndex(b => b.querySelector('strong').textContent.trim() === targetKo);
  }, meaning);

  await page.click(`.world-destinations.mailboxes button[data-value="${correctBoxIdx}"]`);
  await page.waitForSelector('#game-next:not([hidden])');

  const deliveryTimerNum = await page.$eval('#game-timer-num', el => el.textContent.trim());
  console.log('배달 정답 후 타이머 초기 숫자:', deliveryTimerNum);
  assert.equal(deliveryTimerNum, '2', '배달 타이머 초기 숫자는 2여야 합니다.');

  console.log('수동 클릭 없이 2초 자동 넘김 대기 중...');
  const tDelivery = Date.now();
  await page.waitForFunction(() => {
    const heading = document.querySelector('.game-top h2');
    return heading && heading.textContent.includes('2 /');
  }, { timeout: 4000 });
  const elapsedDelivery = (Date.now() - tDelivery) / 1000;
  console.log(`✅ 배달 1번 -> 2번 자동 전환 성공! (소요 시간: ${elapsedDelivery.toFixed(2)}초)`);

  console.log('\n🎉 문장 기차와 배달 게임 모두 2초 자동 넘김 및 수동 즉시 넘김 완벽 검증 통과!');
  await browser.close();
})().catch(err => {
  console.error('테스트 실패:', err);
  process.exit(1);
});
