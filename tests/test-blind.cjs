const puppeteer = require('D:/Codes/Blogger_bot/node_modules/puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 }
  });
  const page = await browser.newPage();
  await page.goto('file:///D:/Codes/english_voca/index.html', { waitUntil: 'load' });
  await page.click('[data-action="tab"][data-value="cards"]');
  await new Promise(r => setTimeout(r, 200));

  // 1. Blinded state screenshot
  const blindedBtn = await page.$('.example-ko-btn.blinded');
  if (!blindedBtn) throw new Error('Blinded button not found!');
  const textBefore = await page.$eval('.example-ko-btn', el => el.textContent);
  console.log('Blinded state text:', textBefore);
  await page.screenshot({ path: 'D:/Codes/english_voca/tests/shot-cards-blinded.png' });

  // 2. Click to reveal
  await page.click('.example-ko-btn');
  await new Promise(r => setTimeout(r, 200));
  const revealedBtn = await page.$('.example-ko-btn.revealed');
  if (!revealedBtn) throw new Error('Revealed button not found!');
  const textAfter = await page.$eval('.example-ko-btn', el => el.textContent);
  console.log('Revealed state text:', textAfter);

  const scrollDiff = await page.evaluate(() => document.documentElement.scrollHeight - document.documentElement.clientHeight);
  console.log('Revealed scroll diff:', scrollDiff);
  await page.screenshot({ path: 'D:/Codes/english_voca/tests/shot-cards-revealed.png' });

  // 3. Click again to re-blind
  await page.click('.example-ko-btn');
  await new Promise(r => setTimeout(r, 200));
  const reblinded = await page.$('.example-ko-btn.blinded');
  if (!reblinded) throw new Error('Re-blinded button not found!');
  console.log('Re-blinded successfully!');

  // 4. Move to next card
  await page.click('[data-action="next-card"]');
  await new Promise(r => setTimeout(r, 200));
  const nextCardBlinded = await page.$('.example-ko-btn.blinded');
  if (!nextCardBlinded) throw new Error('Next card should be blinded by default!');
  console.log('Next card is properly blinded by default!');

  await browser.close();
  console.log('ALL CHECKS PASSED!');
})();
