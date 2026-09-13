(function (root) {
  'use strict';
  const steps = ['cards', 'comic', 'quiz', 'game'];
  const number = (value, min, max) => Number.isFinite(value) ? Math.max(min, Math.min(max, Math.floor(value))) : min;
  function readProfile(raw) {
    let input;
    try { input = JSON.parse(raw); } catch { input = null; }
    const result = {version: 2, stars: 0, currentDay: 1, days: {}};
    if (!input || typeof input !== 'object' || Array.isArray(input)) return result;
    result.stars = number(input.stars, 0, 100000);
    result.currentDay = number(input.currentDay, 1, 50);
    for (let day = 1; day <= 50; day++) {
      const old = input.days && input.days[day];
      if (!old || typeof old !== 'object') continue;
      result.days[day] = {};
      for (const step of steps) result.days[day][step] = old[step] === true;
      result.days[day].rewarded = old.rewarded === true;
      result.days[day].seen = Array.isArray(old.seen) ? [...new Set(old.seen.filter(n => Number.isInteger(n) && n >= 0 && n < 12))] : [];
    }
    return result;
  }
  function isCleared(profile, day) { return steps.every(step => profile.days[day]?.[step] === true); }
  function complete(profile, day, step) {
    if (!Number.isInteger(day) || day < 1 || day > 50 || !steps.includes(step)) return false;
    const record = profile.days[day] ||= {seen: []};
    if (record[step]) return false;
    record[step] = true;
    profile.stars += 1;
    if (isCleared(profile, day) && !record.rewarded) { profile.stars += 3; record.rewarded = true; }
    return true;
  }
  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
    return copy;
  }
  function choices(target, words, count = 4) {
    const unique = [...new Map(words.filter(w => w.en !== target.en).map(w => [w.en, w])).values()];
    return shuffle([target, ...shuffle(unique).slice(0, count - 1)]);
  }
  const api = {readProfile, isCleared, complete, shuffle, choices, steps};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.VocaCore = api;
})(typeof window !== 'undefined' ? window : globalThis);
