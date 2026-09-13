const assert = require('node:assert/strict');
const path = require('node:path');
const puppeteer = require('D:/Codes/Blogger_bot/node_modules/puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    defaultViewport: { width: 1366, height: 768 }
  });
  const page = await browser.newPage();
  const fileUrl = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

  console.log('--- [퀴즈 양옆 버튼 배치 및 2초 자동 카운트다운 테스트] ---');
  await page.goto(fileUrl, { waitUntil: 'load' });

  // 퀴즈 탭으로 이동
  await page.click('#nav [data-value="quiz"]');

  // 첫 번째 문제의 정답 찾기
  const target1 = await page.evaluate(() => {
    const ko = document.querySelector('.quiz-card .question').textContent;
    return window.CURRICULUM[0].words.find(w => w.ko === ko).en;
  });
  console.log('1번 문제 우리말:', await page.$eval('.quiz-card .question', el => el.textContent), '-> 정답:', target1);

  // 정답 버튼 클릭
  const rightButtonVal1 = await page.$$eval('[data-action="quiz-answer"]', (els, target) => {
    return els.find(el => el.textContent === target).dataset.value;
  }, target1);

  const startTime = Date.now();
  await page.click(`[data-action="quiz-answer"][data-value="${rightButtonVal1}"]`);

  // 맞춘 직후 피드백 표시 확인
  const feedbackText = await page.$eval('#feedback', el => el.textContent);
  assert.ok(feedbackText.includes('맞았어요!'), '맞췄을 때 칭찬 피드백 노출');
  await page.screenshot({ path: path.join(__dirname, 'shot-quiz-countdown.png') });

  // 1. 소리 힌트와 다음으로 버튼이 양옆(수평)으로 나란히 배치되었는지 확인
  const { hintBox, nextBox } = await page.evaluate(() => {
    const hint = document.querySelector('[data-action="quiz-hint"]');
    const next = document.querySelector('[data-action="quiz-next"]');
    const hRect = hint.getBoundingClientRect();
    const nRect = next.getBoundingClientRect();
    return {
      hintBox: { x: hRect.left, y: hRect.top, width: hRect.width, height: hRect.height },
      nextBox: { x: nRect.left, y: nRect.top, width: nRect.width, height: nRect.height }
    };
  });
  console.log('버튼 위치:', '소리힌트 y=' + hintBox.y + ', 다음으로 y=' + nextBox.y);
  assert.ok(Math.abs(hintBox.y - nextBox.y) < 15, '소리 힌트와 다음으로 버튼이 위아래가 아닌 양옆(동일한 y축 높이)으로 배치되어야 함');
  assert.ok(nextBox.x > hintBox.x, '다음으로 버튼이 소리 힌트 오른쪽에 위치해야 함');
  console.log('✅ 소리 힌트와 다음으로 버튼 양옆 나란히 배치 확인 완료!');

  // 2. 숫자 타이머 및 프로그레스 바 애니메이션 확인
  const timerNum = await page.$eval('#quiz-timer-num', el => el.textContent.trim());
  console.log('카운트다운 숫자 배지 초기값:', timerNum);
  assert.equal(timerNum, '2', '초기 카운트다운은 2초여야 함');

  const hasProgressBar = await page.evaluate(() => !!document.querySelector('.quiz-timer-progress'));
  assert.ok(hasProgressBar, '줄어드는 타이머 프로그레스 바 애니메이션 요소 존재 확인');
  console.log('✅ 타이머 바 애니메이션 요소 확인 완료!');

  // '다음으로' 버튼을 누르지 않고 대기!
  console.log('버튼 누르지 않고 2초 자동 넘김 대기 중...');
  await page.waitForFunction(() => {
    const countEl = document.querySelector('.quiz-card .word-count span:last-child');
    return countEl && countEl.textContent.trim() === '2 / 12';
  }, { timeout: 3500 });

  const elapsed = Date.now() - startTime;
  console.log(`자동 넘김 성공! 소요 시간: ${(elapsed / 1000).toFixed(2)}초 (목표: 약 2.0초)`);
  assert.ok(elapsed >= 1700 && elapsed <= 2600, '약 2초 경과 후 자동 전환되어야 함');

  // 2번 문제 확인
  const question2 = await page.$eval('.quiz-card .question', el => el.textContent);
  console.log('자동으로 넘어간 2번 문제:', question2);

  // 수동 즉시 넘김도 여전히 잘 작동하는지 확인
  const target2 = await page.evaluate(() => {
    const ko = document.querySelector('.quiz-card .question').textContent;
    return window.CURRICULUM[0].words.find(w => w.ko === ko).en;
  });
  const rightButtonVal2 = await page.$$eval('[data-action="quiz-answer"]', (els, target) => {
    return els.find(el => el.textContent === target).dataset.value;
  }, target2);

  await page.click(`[data-action="quiz-answer"][data-value="${rightButtonVal2}"]`);
  // 즉시 '다음으로' 클릭
  await page.click('[data-action="quiz-next"]');

  const count3 = await page.$eval('.quiz-card .word-count span:last-child', el => el.textContent.trim());
  assert.equal(count3, '3 / 12', '수동으로 다음 버튼을 누르면 2초를 기다리지 않고 즉시 넘어감');
  console.log('수동 클릭 시 즉시 3번 문제로 전환 확인:', count3);

  await browser.close();
  console.log('🎉 퀴즈 양옆 배치 + 2초 타이머 카운트다운/애니메이션 검증 완벽 통과!');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
