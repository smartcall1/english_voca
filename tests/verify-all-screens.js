const puppeteer = require('D:/Codes/Blogger_bot/node_modules/puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 }
  });
  const page = await browser.newPage();
  await page.goto('file:///D:/Codes/english_voca/index.html', { waitUntil: 'load' });

  async function checkTab(name, actionFn) {
    if (actionFn) await actionFn();
    const data = await page.evaluate(() => ({
      ch: document.documentElement.clientHeight,
      sh: document.documentElement.scrollHeight,
      diff: document.documentElement.scrollHeight - document.documentElement.clientHeight
    }));
    const pass = data.sh <= data.ch;
    console.log(`${pass ? 'PASS' : 'FAIL'} [${name}] clientHeight=${data.ch}, scrollHeight=${data.sh} (diff: ${data.diff}px)`);
    return pass;
  }

  const results = [];
  results.push(await checkTab('map', async () => {
    await page.click('[data-action="tab"][data-value="map"]');
  }));

  results.push(await checkTab('cards', async () => {
    await page.click('[data-action="tab"][data-value="cards"]');
  }));

  results.push(await checkTab('comic', async () => {
    await page.click('[data-action="tab"][data-value="comic"]');
  }));

  results.push(await checkTab('quiz', async () => {
    await page.click('[data-action="tab"][data-value="quiz"]');
  }));

  results.push(await checkTab('game-menu', async () => {
    await page.click('#nav [data-action="tab"][data-value="game"]');
  }));

  results.push(await checkTab('game-treasure', async () => {
    await page.click('[data-action="start-game"][data-value="treasure"]');
  }));

  results.push(await checkTab('game-train', async () => {
    await page.click('#nav [data-action="tab"][data-value="game"]');
    await page.click('[data-action="start-game"][data-value="train"]');
  }));

  results.push(await checkTab('game-delivery', async () => {
    await page.click('#nav [data-action="tab"][data-value="game"]');
    await page.click('[data-action="start-game"][data-value="delivery"]');
  }));

  results.push(await checkTab('rewards', async () => {
    await page.click('.star-pill');
  }));

  const allPassed = results.every(Boolean);
  console.log('\n--- Result Summary ---');
  console.log(`Passed: ${results.filter(Boolean).length} / ${results.length}`);
  await browser.close();
  process.exit(allPassed ? 0 : 1);
})();
