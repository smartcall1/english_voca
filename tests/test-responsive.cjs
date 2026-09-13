const puppeteer = require('D:/Codes/Blogger_bot/node_modules/puppeteer');
const path = require('path');

const viewports = [
  { name: '1920x1080 (FHD 데스크톱)', width: 1920, height: 1080 },
  { name: '1536x864 (FHD 노트북 125% 배율)', width: 1536, height: 864 },
  { name: '1440x900 (16:10 맥북/노트북)', width: 1440, height: 900 },
  { name: '1366x768 (표준 보급형 노트북)', width: 1366, height: 768 },
  { name: '1280x800 (태블릿/소형 노트북)', width: 1280, height: 800 },
  { name: '1024x768 (아이패드 가로)', width: 1024, height: 768 },
  { name: '768x1024 (아이패드 세로)', width: 768, height: 1024 },
  { name: '390x844 (스마트폰 모바일 세로)', width: 390, height: 844 }
];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });
  const page = await browser.newPage();
  const fileUrl = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

  console.log('=== 해상도별 반응형 레이아웃 및 가로 스크롤 깨짐 검증 ===\n');

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(fileUrl, { waitUntil: 'load' });
    
    // 1. 지도 화면
    const mapHOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    
    // 2. 단어 카드 화면
    await page.click('#nav [data-value="cards"]');
    const cardsHOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    
    // 3. 만화 화면
    await page.click('#nav [data-value="comic"]');
    const comicHOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

    // 4. 퀴즈 화면
    await page.click('#nav [data-value="quiz"]');
    const quizHOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

    // 5. 게임 화면
    await page.click('#nav [data-value="game"]');
    await page.click('[data-action="start-game"][data-value="treasure"]');
    const gameHOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

    // 6. 배지 화면
    await page.click('.star-pill');
    const rewardsHOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

    const allOk = !mapHOverflow && !cardsHOverflow && !comicHOverflow && !quizHOverflow && !gameHOverflow && !rewardsHOverflow;
    console.log(`[${vp.name}]`);
    console.log(`  -> 지도: ${mapHOverflow ? '⚠️ 깨짐(가로스크롤)' : '정상'}, 카드: ${cardsHOverflow ? '⚠️ 깨짐' : '정상'}, 만화: ${comicHOverflow ? '⚠️ 깨짐' : '정상'}`);
    console.log(`  -> 퀴즈: ${quizHOverflow ? '⚠️ 깨짐' : '정상'}, 게임: ${gameHOverflow ? '⚠️ 깨짐' : '정상'}, 배지: ${rewardsHOverflow ? '⚠️ 깨짐' : '정상'}`);
    console.log(`  => 종합 결과: ${allOk ? '✅ 완벽 유지' : '❌ 수정 필요'}\n`);
  }

  await browser.close();
})();
