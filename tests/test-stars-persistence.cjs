const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const puppeteer = require('D:/Codes/Blogger_bot/node_modules/puppeteer');

(async () => {
  const testProfileDir = path.join(__dirname, 'test-profile-fresh');
  if (fs.existsSync(testProfileDir)) {
    fs.rmSync(testProfileDir, { recursive: true, force: true });
  }

  const launch = () => puppeteer.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    userDataDir: testProfileDir,
    defaultViewport: { width: 1366, height: 768 }
  });

  const fileUrl = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

  console.log('--- [검증 1] 신규/복원 사용자: 첫 접속 시 Aiden/Luca Day 1 완료 7별 복원 확인 ---');
  let browser = await launch();
  let page = await browser.newPage();
  await page.goto(fileUrl, { waitUntil: 'load' });

  let stars = await page.$eval('#stars', el => Number(el.textContent));
  console.log('첫 접속 Aiden 별 개수:', stars);
  assert.equal(stars, 7, '첫 접속 시 Aiden은 Day 1 완료 7별 상태여야 함');

  // Luca로 전환하여 Luca도 7별인지 확인
  await page.click('[data-action="profile"][data-value="luca"]');
  stars = await page.$eval('#stars', el => Number(el.textContent));
  console.log('첫 접속 Luca 별 개수:', stars);
  assert.equal(stars, 7, '첫 접속 시 Luca도 Day 1 완료 7별 상태여야 함');

  await browser.close();

  console.log('--- [검증 2] 브라우저 종료 후 재접속: 껐다 켜도 별 7개 영구 기억 확인 ---');
  browser = await launch();
  page = await browser.newPage();
  await page.goto(fileUrl, { waitUntil: 'load' });

  // 마지막 활성 프로필인 Luca 별점 확인
  stars = await page.$eval('#stars', el => Number(el.textContent));
  console.log('재접속 후 Luca 별 개수:', stars);
  assert.equal(stars, 7, '재접속 후에도 Luca의 7별이 그대로 보존되어야 함');

  // Aiden으로 전환하여 확인
  await page.click('[data-action="profile"][data-value="aiden"]');
  stars = await page.$eval('#stars', el => Number(el.textContent));
  console.log('재접속 후 Aiden 별 개수:', stars);
  assert.equal(stars, 7, '재접속 후에도 Aiden의 7별이 그대로 보존되어야 함');

  await browser.close();

  console.log('--- [검증 3] 게임 마지막 문제 맞힌 직후 다음버튼 안누르고 창 닫아도 즉시 저장 확인 ---');
  browser = await launch();
  page = await browser.newPage();
  await page.goto(fileUrl, { waitUntil: 'load' });

  // Day 2로 이동하여 게임 시작
  await page.click('[data-action="region"][data-value="0"]');
  await page.click('[data-action="day"][data-value="2"]');
  await page.click('#main [data-action="tab"][data-value="game"]');
  await page.click('[data-action="start-game"][data-value="treasure"]');

  // 6개 문제 맞추기
  for (let i = 0; i < 6; i++) {
    const value = await page.evaluate(() => {
      const ko = document.querySelector('.game-prompt .question').textContent;
      const en = window.CURRICULUM[1].words.find(w => w.ko === ko).en;
      return [...document.querySelectorAll('[data-action="game-answer"]')].find(b => b.textContent === en).dataset.value;
    });
    await page.click(`[data-action="game-answer"][data-value="${value}"]`);
    if (i < 5) {
      await page.click('[data-action="game-next"]');
    }
  }

  // 6번째 문제를 맞춘 상태 (보물상자 열리고 폭죽 터짐, 'game-next' 버튼은 누르지 않음!)
  // 별이 7개에서 8개(게임 1개 추가)로 올랐는지 확인
  stars = await page.$eval('#stars', el => Number(el.textContent));
  console.log('보물상자 연 직후(game-next 미클릭) 별 개수:', stars);
  assert.equal(stars, 8, '마지막 문제를 맞히자마자 즉시 별이 지급되어야 함');

  // game-next 버튼을 누르지 않고 브라우저 강제 종료!
  await browser.close();

  console.log('--- [검증 4] 강제 종료 후 재실행 시 게임 완료 별점 보존 확인 ---');
  browser = await launch();
  page = await browser.newPage();
  await page.goto(fileUrl, { waitUntil: 'load' });

  stars = await page.$eval('#stars', el => Number(el.textContent));
  console.log('재접속 후 별 개수:', stars);
  assert.equal(stars, 8, 'game-next를 누르지 않고 종료했어도 8별이 영구 저장되어야 함');

  console.log('--- [검증 5] 설정에서 초기화 시에만 0별 리셋 확인 ---');
  await page.click('[data-action="settings"]');
  await page.click('[data-action="reset-profile"][data-value="aiden"]');
  await page.click('[data-action="reset-confirm"]');

  stars = await page.$eval('#stars', el => Number(el.textContent));
  console.log('Aiden 초기화 후 별 개수:', stars);
  assert.equal(stars, 0, '설정에서 명시적으로 초기화했을 때만 0별이 됨');

  // 설정 팝업 닫기
  await page.click('#settings form > button.primary');

  // Luca는 여전히 7별 유지 확인
  await page.click('[data-action="profile"][data-value="luca"]');
  stars = await page.$eval('#stars', el => Number(el.textContent));
  console.log('Luca 별 개수 유지:', stars);
  assert.equal(stars, 7, 'Luca의 기록은 초기화되지 않고 7별 유지');

  await browser.close();

  // 정리
  if (fs.existsSync(testProfileDir)) {
    fs.rmSync(testProfileDir, { recursive: true, force: true });
  }

  console.log('🎉 모든 영구 저장 및 별점 복원 검증 완벽 통과!');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
