const fs = require('fs');
const path = require('path');

const p = 'C:/Users/p123_/.gemini/antigravity-cli/brain/732c423a-edf5-4141-a4c3-d0368bb15b18/scratch/generate_exact_curriculum_comics.js';
const dailyData = require(p);

const originalComics = [
  { id: 1, title: "새 교실, 새 친구", range: [1, 5], image: "assets/comic-01.png" },
  { id: 2, title: "그네를 함께 타요", range: [6, 10], image: "assets/comic-02.png" },
  { id: 3, title: "식탁 차리기 대작전", range: [11, 15], image: "assets/comic-03.png" },
  { id: 4, title: "잠자기 전 베개 요새", range: [16, 20], image: "assets/comic-04.png" },
  { id: 5, title: "달콤한 과일 가게", range: [21, 25], image: "assets/comic-05.png" },
  { id: 6, title: "시계탑 광장의 지도", range: [26, 30], image: "assets/comic-06.png" },
  { id: 7, title: "나비 정원의 비밀", range: [31, 35], image: "assets/comic-07.png" },
  { id: 8, title: "반딧불이 숲의 모닥불", range: [36, 40], image: "assets/comic-08.png" },
  { id: 9, title: "별빛 관측소의 망원경", range: [41, 45], image: "assets/comic-09.png" },
  { id: 10, title: "우정의 타임캡슐", range: [46, 50], image: "assets/comic-10.png" }
];

const comics = originalComics.map(ep => {
  const [start, end] = ep.range;
  const epDaily = {};
  for (let d = start; d <= end; d++) {
    if (!dailyData[d]) {
      throw new Error(`Missing daily data for day ${d}`);
    }
    epDaily[d] = {
      ...dailyData[d],
      image: `assets/comic-${String(d).padStart(2, '0')}.png`
    };
  }

  // 기본 panels는 해당 에피소드의 첫째 날(start) 패널을 기본값으로 유지
  return {
    id: ep.id,
    title: ep.title,
    range: ep.range,
    image: ep.image,
    panels: epDaily[start].panels,
    daily: epDaily
  };
});

const content = `// 10편의 4컷 이야기를 각각 5일 동안 읽고, 듣고, 다시 말하며 복습합니다.
// 그림에는 글자를 넣지 않아 대사를 크게 표시하고 음성으로 들을 수 있습니다.
// Day 1부터 Day 50까지 매일매일 새로운 소제목과 4컷 대사, 이야기 요약이 제공됩니다.
window.COMICS = ${JSON.stringify(comics, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'comics.js'), content, 'utf8');
console.log('Successfully wrote comics.js with 50 daily comics!');
