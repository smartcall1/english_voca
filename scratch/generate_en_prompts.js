const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = 'D:/Codes/english_voca';
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'comics.js'), 'utf8'), ctx);
const comics = ctx.window.COMICS;

const prompts = {};

for (let d = 1; d <= 50; d++) {
  const ep = Math.floor((d - 1) / 5);
  const dayData = comics[ep].daily[d];
  const panels = dayData.panels;

  const prompt = `Warm beautiful gouache illustration for children age 5-8, square 1:1, four equal panels in a 2x2 grid. Two young Korean boys: Aiden (7yo Korean boy, short dark hair, blue T-shirt, navy shorts) and Luca (6yo Korean boy, neat short dark hair, yellow T-shirt, khaki shorts). Both are cute young boys. A tiny cute koala explorer with green scarf is with them. No lettering, no text, no speech bubbles, no watermark.
Panel 1 (top-left): ${panels[0].en}.
Panel 2 (top-right): ${panels[1].en}.
Panel 3 (bottom-left): ${panels[2].en}.
Panel 4 (bottom-right): ${panels[3].en}.
Setting: Day ${d} story "${dayData.title}". Soft warm Australian sunlight, vivid colors, expressive joyful faces, consistent boy characters throughout.`;

  prompts[d] = prompt;
}

fs.writeFileSync(path.join(root, 'scratch', 'prompts_en_50.json'), JSON.stringify(prompts, null, 2), 'utf8');
console.log('Saved 50 English prompts successfully!');
