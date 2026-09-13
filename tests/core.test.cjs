const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const corePath = path.join(__dirname, '..', 'core.js');
test('진도 처리 모듈을 제공한다', () => assert.ok(fs.existsSync(corePath), '새 커리큘럼의 진도 처리 모듈이 아직 없음'));
if (fs.existsSync(corePath)) {
 const C = require(corePath);
 test('손상된 기록과 범위를 벗어난 일자를 복구한다', () => {
  for (const input of ['{', 'null', '[]', '"x"']) assert.equal(C.readProfile(input).currentDay, 1);
  assert.equal(C.readProfile('{"currentDay":900,"stars":-50}').stars, 0);
  assert.equal(C.readProfile('{"currentDay":900}').currentDay, 50);
 });
 test('완주 보상은 반복 호출에도 한 번만 지급한다', () => {
  const p = C.readProfile(null);
  for (const step of ['cards','comic','quiz','game']) C.complete(p, 1, step);
  const stars = p.stars;
  for (let i=0;i<10;i++) C.complete(p,1,'game');
  assert.equal(p.stars,stars);
  assert.equal(C.isCleared(p,1),true);
  assert.equal(C.isCleared(p,2),false);
 });
 test('모든 단계 이전에는 완주하지 않는다', () => {
  const p=C.readProfile(null); C.complete(p,1,'game');
  assert.equal(C.isCleared(p,1),false);
  assert.equal(C.complete(p,99,'cards'),false);
  assert.equal(C.complete(p,1,'invalid'),false);
 });
 test('프로필은 독립적이다', () => {
  const a=C.readProfile(null),b=C.readProfile(null); C.complete(a,1,'cards');
  assert.equal(b.stars,0); assert.deepEqual(b.days,{});
 });
 test('정답은 중복 없이 한 번 포함된다', () => {
  const words=['cat','dog','bird','fish','cat'].map(en=>({en}));
  const choices=C.choices(words[0],words);
  assert.equal(choices.length,4); assert.equal(choices.filter(w=>w.en==='cat').length,1);
 });
}
