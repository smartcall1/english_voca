const puppeteer = require('D:/Codes/Blogger_bot/node_modules/puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 }
  });
  const page = await browser.newPage();
  await page.goto('file:///D:/Codes/english_voca/index.html', { waitUntil: 'load' });

  const capture = async (name, actionFn) => {
    if (actionFn) await actionFn();
    await new Promise(r => setTimeout(r, 200));
    const p = path.join('D:/Codes/english_voca/tests', `shot-${name}.png`);
    await page.screenshot({ path: p, fullPage: false });
    console.log(`Captured: ${p}`);
  };

  await capture('01-map', async () => {
    await page.click('[data-action="tab"][data-value="map"]');
  });
  await capture('02-cards', async () => {
    await page.click('[data-action="tab"][data-value="cards"]');
  });
  await capture('03-comic', async () => {
    await page.click('[data-action="tab"][data-value="comic"]');
  });
  await capture('04-quiz', async () => {
    await page.click('[data-action="tab"][data-value="quiz"]');
  });
  await capture('05-game-menu', async () => {
    await page.click('#nav [data-action="tab"][data-value="game"]');
  });
  await capture('06-game-treasure', async () => {
    await page.click('[data-action="start-game"][data-value="treasure"]');
  });
  await capture('07-game-train', async () => {
    await page.click('#nav [data-action="tab"][data-value="game"]');
    await page.click('[data-action="start-game"][data-value="train"]');
  });
  await capture('08-game-delivery', async () => {
    await page.click('#nav [data-action="tab"][data-value="game"]');
    await page.click('[data-action="start-game"][data-value="delivery"]');
  });

  await browser.close();
  console.log('All screenshots captured!');
})();
