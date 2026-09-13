// 설치된 Puppeteer와 Chrome을 이용하며 별도 브라우저 프로필에서만 실행한다.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
console.log('자동 검증 준비: 설치된 Puppeteer 불러오기');
const puppeteer=require(process.argv[2]||'D:/Codes/Blogger_bot/node_modules/puppeteer');
const root=path.resolve(__dirname,'..'),shots=path.join(__dirname,'screenshots');
fs.mkdirSync(shots,{recursive:true});
(async()=>{
 console.log('별도 테스트 프로필로 Chrome 시작');
 const browser=await puppeteer.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',userDataDir:path.join(__dirname,'browser-profile'),args:['--no-first-run','--no-default-browser-check'],defaultViewport:{width:1366,height:768}});
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const click=async(selector)=>{await page.waitForSelector(selector);await page.click(selector);};
 const action=(a,v)=>`[data-action="${a}"]${v===undefined?'':`[data-value="${v}"]`}`;
 const shot=async(name)=>page.screenshot({path:path.join(shots,name+'.png'),fullPage:true});
 const stars=()=>page.$eval('#stars',el=>Number(el.textContent));
 // 갈림길 상자를 고르고, 자동 진행이 이미 일어났으면 버튼 클릭을 건너뛴다.
 const nextMission=async()=>{
  const fork=await page.$('.fork-choice button:not([disabled])');
  if(fork){await fork.click();await page.waitForFunction(()=>!document.querySelector('.fork-choice'),{timeout:6000});}
  const btn=await page.$('#game-next:not([hidden])');
  if(btn)await btn.click().catch(()=>{});
  await page.waitForSelector('.game-stage,.result');
 };
 let checks=0;
 const check=(condition,message)=>{assert.ok(condition,message);checks++;console.log('통과: '+message);};
 try{
  await page.goto(pathToFileURL(path.join(root,'index.html')).href,{waitUntil:'load'});
  await page.evaluate(()=>{localStorage.removeItem('english_island_v2_aiden');localStorage.removeItem('english_island_v2_luca');localStorage.removeItem('english_island_v2_suho');localStorage.removeItem('english_island_v2_seoha');localStorage.removeItem('english_island_active_v2');});await page.reload({waitUntil:'load'});
  check(await stars()===0,'새 과정은 별 0개에서 시작');
  check(await page.$$eval('.map-node',els=>els.length)===10,'한 지역에 실제 지도 목적지 10개');
  check(await page.$eval('body',el=>getComputedStyle(el).fontSize)==='22px','기본 본문 22px');
  await shot('01-map-1366');
  await click(action('day',1));
  check(await page.$eval(action('finish-cards'),el=>el.disabled),'첫 단어만 보고 카드 완료 불가');
  await shot('02-cards-1366');
  for(let i=1;i<12;i++)await click(action('next-card'));
  check(await page.$eval('#main',el=>document.activeElement===el),'문제 전환 후 키보드 포커스 유지');
  await click(action('finish-cards'));
  check(await stars()===1,'12단어 확인 후 카드 별 1개');
  await page.waitForFunction(()=>[...document.querySelectorAll('.comic-art img')].every(img=>img.complete&&img.naturalWidth>0));
  await shot('03-comic-1366');
  for(let i=0;i<4;i++)await click(action('comic-read',i));
  await click(action('finish-comic'));check(await stars()===2,'4컷 읽기 완료 별');
  for(let i=0;i<12;i++){
   const target=await page.evaluate(()=>{const ko=document.querySelector('.question').textContent;return window.CURRICULUM[0].words.find(w=>w.ko===ko).en;});
   if(i===0){const wrong=await page.$$eval('[data-action="quiz-answer"]',(els,target)=>els.find(el=>el.textContent!==target).dataset.value,target);await click(action('quiz-answer',wrong));check(await stars()===2,'오답으로 별을 받지 않음');}
   const right=await page.$$eval('[data-action="quiz-answer"]',(els,target)=>els.find(el=>el.textContent===target).dataset.value,target);await click(action('quiz-answer',right));await click(action('quiz-next'));
  }
  check(await stars()===3,'12문제 전부 정답 후 퀴즈 완료');
  await click('#main '+action('tab','game'));await shot('04-game-menu-1366');
  await click(action('start-game','treasure'));await shot('05-treasure-1366');
  for(let i=0;i<6;i++){
   const value=await page.evaluate(()=>{const ko=document.querySelector('.game-prompt .question').textContent;const en=window.CURRICULUM[0].words.find(w=>w.ko===ko).en;return [...document.querySelectorAll('[data-action="game-answer"]')].find(b=>b.textContent===en).dataset.value;});
   await click(action('game-answer',value));await nextMission();
  }
  check(await stars()===7,'네 미션 완료시 별4개와 완주 보너스3개');
  await click('#nav '+action('tab','game'));await click(action('start-game','train'));await shot('06-train-1366');
  for(let i=0;i<3;i++){
   const tokens=await page.evaluate(()=>{const ko=document.querySelector('.game-prompt .question').textContent;return window.CURRICULUM[0].words.find(w=>w.exampleKo===ko).example.split(/\s+/);});
   if(i===0){await click(action('train-check'));check(await page.$eval('#feedback',el=>el.classList.contains('error')),'미완성 문장 출발 방지');}
   for(const token of tokens){const value=await page.$$eval('[data-action="train-token"]',(els,token)=>els.find(el=>!el.disabled&&el.textContent===token).dataset.value,token);await click(action('train-token',value));}
   await click(action('train-check'));await nextMission();
  }
  check(await stars()===7,'다른 게임 재완료로 보상 중복 없음');
  await click('#nav '+action('tab','game'));await click(action('start-game','delivery'));await shot('07-delivery-1366');
  for(let i=0;i<6;i++){
   await click(action('game-meaning'));
   const value=await page.evaluate(()=>{const ko=document.querySelector('#meaning-hint').textContent;const en=window.CURRICULUM[0].words.find(w=>w.ko===ko).en;return [...document.querySelectorAll('[data-action="game-answer"]')].find(b=>b.textContent===en).dataset.value;});await click(action('game-answer',value));await nextMission();
  }
  check(await stars()===7,'배달 게임 완주 및 중복 보상 방지');
  await click(action('profile','luca'));check(await stars()===0,'Luca 프로필은 진도와 별이 독립적');
  await click(action('region',4));await click(action('day',50));check(await page.$eval('.eyebrow',el=>el.textContent.includes('50')),'Day 50 학습 가능');
  await page.reload({waitUntil:'load'});check(await page.$eval('.day-tag',el=>el.textContent.includes('50')),'새로고침 후 마지막 학습일 저장');
  await click(action('profile','aiden'));check(await stars()===7,'Aiden의 완주 기록 보존');
  await page.setViewport({width:1536,height:864});await shot('08-map-1536');
  check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'1536px 화면 가로 넘침 없음');
  await page.setViewport({width:390,height:844});await shot('09-map-mobile');
  check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'모바일 전체 화면 가로 넘침 없음');
  await page.setViewport({width:1366,height:768});await click(action('settings'));await page.select('#text-size','large');await page.click('#settings .primary');
  check(await page.$eval('body',el=>getComputedStyle(el).fontSize)==='26px','아주 큰 글자 26px 설정');await shot('10-large-text');
  await click(action('settings'));await page.select('#text-size','normal');await page.click('#settings .primary');
  for(let episode=0;episode<10;episode++){
   await click('#nav '+action('tab','map'));await click(action('region',Math.floor(episode/2)));await click(action('day',episode*5+1));await click('#nav '+action('tab','comic'));
   await page.waitForFunction(()=>[...document.querySelectorAll('.comic-art img')].every(img=>img.complete&&img.naturalWidth>0));
  }
  check(true,'50일에 연결된 만화 10편 모두 실제 브라우저에서 이미지 로드');await shot('11-comic-finale');
  await page.evaluate(()=>localStorage.setItem('english_island_v2_aiden','{broken'));await page.reload({waitUntil:'load'});
  check(await stars()===0,'손상된 저장 기록에서도 화면 시작');
  await page.evaluate(()=>{Storage.prototype.setItem=function(){throw new DOMException('검증용 저장 차단','QuotaExceededError');};});
  await click(action('day',1));check(await page.$eval('#notice',el=>!el.hidden),'저장 실패 안내 후에도 카드 학습 지속');
  await page.evaluate(()=>{delete window.SpeechSynthesisUtterance;});await click(action('speak-word'));
  check(await page.$eval('#toast',el=>el.textContent.includes('소리를 낼 수 없어요')),'음성 미지원 환경의 텍스트 안내');
  check(errors.length===0,'브라우저 JavaScript 오류 없음: '+errors.join('; '));
  fs.writeFileSync(path.join(__dirname,'browser-results.json'),JSON.stringify({date:new Date().toISOString(),checks,errors,viewports:['1366x768','1536x864','390x844'],source:'별도 Chrome 프로필에서 file:// 직접 실행'},null,2));
 }catch(error){await shot('failure');console.error(await page.evaluate(()=>({stars:document.querySelector('#stars').textContent,screen:document.querySelector('#main').innerText,progress:localStorage.getItem('english_island_v2_aiden')})));throw error;}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
