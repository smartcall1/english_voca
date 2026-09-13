const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const context={window:{}};
vm.createContext(context);
for(const file of ['curriculum.js','comics.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
const days=context.window.CURRICULUM, comics=context.window.COMICS;
test('50일 모두 12항목과 완전한 예문을 제공한다',()=>{
 assert.equal(days.length,50);
 days.forEach((d,i)=>{
  assert.equal(d.day,i+1);assert.equal(d.region,Math.floor(i/10));assert.equal(d.words.length,12);
  assert.ok(d.title.trim());
  d.words.forEach(w=>{for(const key of ['en','ko','example','exampleKo','type'])assert.ok(typeof w[key]==='string'&&w[key].trim(),`Day ${d.day} ${key}`);});
 });
});
test('표제어 600개가 모두 고유하며 호주 철자를 사용한다',()=>{
 const words=days.flatMap(d=>d.words),en=words.map(w=>w.en.toLowerCase());
 assert.equal(en.length,600);assert.equal(new Set(en).size,600);
 for(const word of ['colour','favourite','centre','mum','grey','neighbour','pyjamas'])assert.ok(en.includes(word),word);
 assert.equal(words.filter(w=>w.type==='phrase').length,3);
});
test('모든 예문이 문장 기차에서 재조립된다',()=>{
 for(const d of days)for(const w of d.words){const tokens=w.example.trim().split(/\s+/);assert.ok(tokens.length>=2&&tokens.length<=15,`${w.en}: ${tokens.length}`);assert.equal(tokens.join(' '),w.example.trim());}
});
test('만화 10편이 50일을 빠짐없이 덮으며 각 4컷의 대사와 그림 설명을 제공한다',()=>{
 assert.equal(comics.length,10);
 comics.forEach((c,i)=>{assert.equal(c.id,i+1);assert.equal(c.range[0],i*5+1);assert.equal(c.range[1],i*5+5);assert.equal(c.panels.length,4);for(const p of c.panels)for(const key of ['en','ko','alt'])assert.ok(p[key]?.trim());});
});
test('50일 모든 날짜에 고유한 일일 만화 소제목과 4컷 대사가 제공된다',()=>{
 for(let d=1; d<=50; d++){
  const epIndex = Math.floor((d-1)/5);
  const c = comics[epIndex];
  assert.ok(c.daily && c.daily[d], `Day ${d} 만화 데이터 필요`);
  const dayComic = c.daily[d];
  assert.ok(dayComic.title && dayComic.title.trim(), `Day ${d} 제목 필요`);
  assert.ok(dayComic.story && dayComic.story.trim(), `Day ${d} 스토리 요약 필요`);
  assert.equal(dayComic.panels.length, 4, `Day ${d} 4컷 패널 필요`);
  for(const p of dayComic.panels){
   for(const key of ['en','ko','alt']){
    assert.ok(p[key]?.trim(), `Day ${d} 패널 ${key}`);
   }
  }
 }
});
test('만화 그림 50편이 모두 실제 PNG 파일이며 네 칸 분할 가능한 정사각형이다',()=>{
 for(let d=1; d<=50; d++){
  const file=path.join(root,`assets/comic-${String(d).padStart(2,'0')}.png`);
  assert.ok(fs.existsSync(file),`comic-${String(d).padStart(2,'0')}.png 생성 완료 필요`);
  const bytes=fs.readFileSync(file);
  assert.equal(bytes.subarray(1,4).toString(),'PNG');
  assert.ok(bytes.length>100000);
  assert.equal(bytes.readUInt32BE(16),bytes.readUInt32BE(20));
 }
});
test('HTML은 오프라인에서도 필요한 모든 코드 파일을 찾을 수 있다',()=>{
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 assert.ok(!/https?:\/\//.test(html));
 for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g))assert.ok(fs.existsSync(path.join(root,match[1])),match[1]);
 assert.ok(!html.includes('user-scalable=no'));
});
