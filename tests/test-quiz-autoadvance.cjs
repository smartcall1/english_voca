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

  console.log('--- [퀴즈 자동 넘김 테스트 시작] ---');
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
  console.log('정답 클릭 직후 피드백:', feedbackText);

  // '다음으로' 버튼을 누르지 않고 대기!
  console.log('버튼 누르지 않고 2초 대기 중...');
  await page.waitForFunction(() => {
    const countEl = document.querySelector('.quiz-card .word-count span:last-child');
    return countEl && countEl.textContent.trim() === '2 / 12';
  }, { timeout: 3500 });

  const elapsed = Date.now() - startTime;
  console.log(`자동 넘김 성공! 소요 시간: ${(elapsed / 1000).toFixed(2)}초 (목표: 약 1.8~2.0초)`);
  assert.ok(elapsed >= 1500 && elapsed <= 2500, '약 2초(1.8초) 경과 후 자동 전환되어야 함');

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
  console.log('🎉 퀴즈 2초 자동 넘김 + 수동 즉시 넘김 검증 완벽 통과!');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
