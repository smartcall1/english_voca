const assert = require('node:assert/strict');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const puppeteer = require('D:/Codes/Blogger_bot/node_modules/puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',userDataDir:path.join(__dirname,'browser-profile'),defaultViewport:{width:1366,height:768}});
  const page = await browser.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const click = selector => page.click(selector);
  const button = id => `[data-action="reset-profile"][data-value="${id}"]`;
  const snapshot = () => page.evaluate(() => ['aiden','luca'].map(id=>localStorage.getItem(`english_island_v2_${id}`)));
  const seed = async () => {
    await page.evaluate(() => {
      for(const [id,day] of [['aiden',9],['luca',15]]){
        const p=window.VocaCore.readProfile(null);p.currentDay=day;
        for(const step of window.VocaCore.steps)window.VocaCore.complete(p,day,step);
        localStorage.setItem(`english_island_v2_${id}`,JSON.stringify(p));
      }
      localStorage.setItem('english_island_active_v2','aiden');
    });
    await page.reload({waitUntil:'load'});
  };
  try {
    await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href,{waitUntil:'load'});
    await seed();await click('[data-action="settings"]');
    assert.equal(await page.$$eval('[data-action="reset-profile"]',els=>els.length),2,'설정에 아이별 초기화 버튼 2개');
    const before=await snapshot();
    await click(button('aiden'));await click('[data-action="reset-cancel"]');
    assert.deepEqual(await snapshot(),before,'취소하면 두 기록 모두 유지');
    await click(button('luca'));await click('[data-action="reset-confirm"]');
    const inactive=await snapshot();
    assert.equal(inactive[0],before[0],'Luca 초기화는 Aiden 저장 기록에 영향 없음');
    assert.deepEqual(JSON.parse(inactive[1]),{version:2,stars:0,currentDay:1,days:{}},'Luca 진도·별·완료 기록 초기화');
    assert.equal(await page.$eval('#stars',el=>Number(el.textContent)),7,'활성 Aiden 화면 유지');
    await page.reload({waitUntil:'load'});assert.deepEqual(await snapshot(),inactive,'재실행 후 초기화 유지');
    await seed();await click('#nav [data-value="game"]');await click('[data-action="start-game"][data-value="train"]');
    await click('[data-action="settings"]');await click(button('aiden'));
    await page.screenshot({path:path.join(__dirname,'screenshots/reset-confirm.png')});
    await click('[data-action="reset-confirm"]');
    const active=await snapshot();
    assert.equal(active[1],before[1],'Aiden 초기화는 Luca 저장 기록에 영향 없음');
    assert.deepEqual(JSON.parse(active[0]),{version:2,stars:0,currentDay:1,days:{}},'Aiden 진도와 별 초기화');
    assert.equal(await page.$eval('#stars',el=>Number(el.textContent)),0);
    assert.ok(await page.$eval('.day-tag',el=>el.textContent.includes('DAY 1')),'진행 중 게임을 닫고 Day 1 지도로 복귀');
    await seed();await click('[data-action="settings"]');await click(button('aiden'));
    await page.evaluate(()=>{Storage.prototype.setItem=()=>{throw new Error('검증용 저장 실패');};});
    await click('[data-action="reset-confirm"]');
    assert.deepEqual(await snapshot(),before,'저장 실패 시 기록 유지');
    assert.ok(await page.$eval('#reset-status',el=>el.textContent.includes('초기화하지 않았어요')),'실패를 성공으로 표시하지 않음');
    assert.deepEqual(errors,[]);
    console.log('초기화 검증 통과: 아이별 분리, 취소, 재접속, 게임 중 초기화, 저장 실패 보호, JavaScript 오류 0');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
