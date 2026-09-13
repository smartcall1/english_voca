(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const C = window.VocaCore, days = window.CURRICULUM;
  if (!C || !Array.isArray(days) || days.length !== 50 || !Array.isArray(window.COMICS)) {
    $('main').textContent = '학습 파일을 불러오지 못했어요. index.html과 함께 받은 모든 파일이 같은 폴더에 있는지 확인해 주세요.';
    return;
  }
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const paths = {
    map:'M3 5l6-2 6 2 6-2v16l-6 2-6-2-6 2V5zm6-2v16m6-14v16',
    cards:'M5 5h14v16H5zM8 2h13v16M9 10h6m-6 5h6',
    comic:'M3 3h18v15H10l-5 4v-4H3V3zm5 5h8m-8 5h5',
    quiz:'M9 8a3 3 0 116 0c0 2-3 2-3 5m0 4v.1M12 2a10 10 0 100 20 10 10 0 000-20',
    game:'M6 7h12c3 0 4 10 2 11-2 1-4-3-5-3H9c-1 0-3 4-5 3C2 17 3 7 6 7zm1 3v4m-2-2h4m7-1h.1m2 3h.1',
    sound:'M3 9h4l5-5v16l-5-5H3V9zm13-2a7 7 0 010 10m3-13a11 11 0 010 16',
    flag:'M5 22V3c5-4 9 4 14 0v10c-5 4-9-4-14 0',
    chest:'M3 11h18v10H3zM3 11V8a5 5 0 015-5h8a5 5 0 015 5v3m-12 0V4m6 0v7m-4 0h2v5h-2z',
    train:'M4 4h12v13H4zM7 1h6v3M4 7h12M7 10h6m-7 7-2 5m10-5 2 5M4 20h12M19 9h3v8h-3z',
    van:'M2 7h13v12H2zM15 11h4l3 4v4h-7M5 22a2 2 0 100-4 2 2 0 000 4m14 0a2 2 0 100-4 2 2 0 000 4',
    star:'M12 2l3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1z',
    leaf:'M20 3C8 1 1 8 5 16c7 8 18-1 15-13zM5 21 16 8',
    arrow:'M4 12h16m-7-7 7 7-7 7',
    home:'M2 11 12 2l10 9M5 9v12h14V9M9 21v-8h6v8'
  };
  const icon = name => `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="${paths[name] || paths.star}"/></svg>`;
  const regions = [
    {name:'친구의 숲',sub:'학교와 친구',colour:'#e3edd2',land:'#d1e3b5',hint:'친구에게 먼저 인사하고, 함께 노는 말을 배워요.'},
    {name:'포근한 마을',sub:'집과 일상',colour:'#eee8d0',land:'#d9dfb1',hint:'아침 준비부터 잠들기까지, 집에서 쓰는 말을 만나요.'},
    {name:'무지개 항구',sub:'마을과 생활',colour:'#dbeced',land:'#d3e4bd',hint:'가게와 도서관, 길 위에서 필요한 말을 배워요.'},
    {name:'초록 탐험섬',sub:'자연과 탐구',colour:'#dfebd6',land:'#bddbae',hint:'작은 생물을 만나고, 자연을 관찰하는 말을 배워요.'},
    {name:'상상의 산',sub:'생각과 이야기',colour:'#e7e2ee',land:'#d5dfca',hint:'왜 그럴까? 생각을 나누고 나만의 이야기를 만들어요.'}
  ];
  let storageOK = true;
  const read = key => { try { return localStorage.getItem(key); } catch { storageOK = false; return null; } };
  const write = (key, value) => { try { localStorage.setItem(key, value); } catch { storageOK = false; showStorageNotice(); } };

  const IDB_NAME = 'english_island_db', IDB_STORE = 'profiles';
  function idbPut(key, val) {
    if (!('indexedDB' in window)) return;
    try {
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE);
      };
      req.onsuccess = () => {
        try {
          const tx = req.result.transaction(IDB_STORE, 'readwrite');
          tx.objectStore(IDB_STORE).put(val, key);
        } catch {}
      };
    } catch {}
  }

  const DAY1_CLEARED_PROFILE = () => ({
    version: 2,
    stars: 7,
    currentDay: 1,
    days: {
      "1": {
        cards: true,
        comic: true,
        quiz: true,
        game: true,
        rewarded: true,
        seen: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
      }
    }
  });

  const activeProfilePref = read('english_island_active_v2');
  let profileId = (activeProfilePref === 'luca' || activeProfilePref === 'seoha') ? 'luca' : 'aiden';
  const profiles = {
    aiden: C.readProfile(read('english_island_v2_aiden') || read('english_island_v2_suho')),
    luca: C.readProfile(read('english_island_v2_luca') || read('english_island_v2_seoha'))
  };

  // Day 1 완료(별 7개) 복원 및 초기 시딩 (사용자가 설정에서 초기화하기 전까지 영구 보존)
  const restoreFlag = read('english_island_v2_day1_force_restore_v2');
  if (!restoreFlag) {
    profiles.aiden = DAY1_CLEARED_PROFILE();
    profiles.luca = DAY1_CLEARED_PROFILE();
    write('english_island_v2_aiden', JSON.stringify(profiles.aiden));
    idbPut('english_island_v2_aiden', JSON.stringify(profiles.aiden));
    write('english_island_v2_luca', JSON.stringify(profiles.luca));
    idbPut('english_island_v2_luca', JSON.stringify(profiles.luca));
    write('english_island_v2_day1_force_restore_v2', 'true');
    idbPut('english_island_v2_day1_force_restore_v2', 'true');
  }

  let profile = profiles[profileId], day = profile.currentDay, region = Math.floor((day - 1) / 10), tab = 'map';
  let cardIndex = 0, exampleRevealed = new Set(), comicRead = new Set(), comicCut = 0, quiz = null, game = null, toastTimer, quizAutoTimer, quizCountdownInterval, audioContext;
  let koreanSpeech = true, rate = .9;
  let pendingReset = null;
  function dismissReset() {
    pendingReset = null;
    $('reset-confirmation').hidden = true;
  }
  function resetProfile() {
    const id = pendingReset;
    if (!Object.hasOwn(profiles, id)) return;
    const fresh = C.readProfile(null);
    const serialized = JSON.stringify(fresh);
    try {
      localStorage.setItem(`english_island_v2_${id}`, serialized);
      idbPut(`english_island_v2_${id}`, serialized);
    } catch {
      $('reset-status').textContent = '기록을 저장할 수 없어 초기화하지 않았어요. 기존 진행상황은 그대로예요.';
      dismissReset();
      return;
    }
    profiles[id] = fresh;
    if (id === profileId) {
      resetActivity();
      profile = fresh;
      day = 1;
      region = 0;
      tab = 'map';
      render();
    }
    dismissReset();
    $('reset-status').textContent = `${id === 'aiden' ? 'Aiden' : 'Luca'}의 진행상황을 초기화했어요. 다른 아이의 기록은 그대로예요.`;
    document.querySelector(`[data-action="reset-profile"][data-value="${id}"]`).focus();
  }
  const data = () => days[day - 1];
  const record = () => profile.days[day] ||= {seen:[]};
  const completedCount = () => days.filter(d => C.isCleared(profile,d.day)).length;
  function showStorageNotice() { $('notice').hidden=false; $('notice').textContent='지금은 기록을 저장할 수 없어요. 학습은 계속할 수 있지만, 창을 닫으면 이번 기록이 사라질 수 있어요.'; }
  function save() {
    profile.currentDay = day;
    const serialized = JSON.stringify(profile);
    write(`english_island_v2_${profileId}`, serialized);
    idbPut(`english_island_v2_${profileId}`, serialized);
    updateHeader();
  }
  function updateHeader() {
    $('stars').textContent=profile.stars;
    for (const id of ['aiden','luca']) $(`profile-${id}`).setAttribute('aria-pressed',String(id===profileId));
  }
  function toast(message) { clearTimeout(toastTimer); $('toast').textContent=message; $('toast').hidden=false; toastTimer=setTimeout(()=>{$('toast').hidden=true;},3500); }
  function cancelSpeech() { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); }
  function speak(en,ko) {
    if (!('speechSynthesis' in window) || !window.SpeechSynthesisUtterance) { toast('이 브라우저에서는 소리를 낼 수 없어요. 화면의 글자와 뜻을 함께 읽어 주세요.'); return; }
    try {
      cancelSpeech();
      const voices=window.speechSynthesis.getVoices();
      const utter=new SpeechSynthesisUtterance(en); utter.lang='en-AU'; utter.rate=rate;
      const voice=voices.find(v=>v.lang.toLowerCase()==='en-au') || voices.find(v=>v.lang.startsWith('en'));
      if(voice) utter.voice=voice;
      utter.onerror=e=>{if(!['canceled','interrupted'].includes(e.error))toast('음성을 재생하지 못했어요. 글자를 보며 계속할 수 있어요.');};
      window.speechSynthesis.speak(utter);
      if(ko && koreanSpeech){const meaning=new SpeechSynthesisUtterance(ko);meaning.lang='ko-KR';meaning.rate=.9;const v=voices.find(v=>v.lang.startsWith('ko'));if(v)meaning.voice=v;window.speechSynthesis.speak(meaning);}
    } catch { toast('음성을 재생하지 못했어요. 화면을 보며 계속해 주세요.'); }
  }
  let fxCanvas, fxCtx, fxParticles = [], fxAnimationId;
  function initFxCanvas() {
    if (fxCanvas) return;
    fxCanvas = document.createElement('canvas');
    fxCanvas.id = 'fx-canvas';
    fxCanvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(fxCanvas);
    fxCtx = fxCanvas.getContext('2d');
    const resize = () => { if (fxCanvas) { fxCanvas.width = window.innerWidth; fxCanvas.height = window.innerHeight; } };
    window.addEventListener('resize', resize);
    resize();
  }
  function burstConfetti(originX, originY, count = 40, colors = null) {
    initFxCanvas();
    if (!fxCtx) return;
    const palette = colors || ['#ffd13b', '#ff7e36', '#197564', '#ff5388', '#45caff', '#87d842', '#ffe08a'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 5;
      const type = Math.random() > 0.4 ? 'star' : (Math.random() > 0.5 ? 'rect' : 'circle');
      fxParticles.push({
        x: originX, y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (Math.random() * 5 + 3),
        size: Math.random() * 11 + 6,
        color: palette[Math.floor(Math.random() * palette.length)],
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.22,
        alpha: 1,
        decay: Math.random() * 0.014 + 0.01,
        type
      });
    }
    if (!fxAnimationId) fxLoop();
  }
  function launchConfetti(bonus = false) {
    // 1차 중앙 폭죽: 별이 딱 박히는 순간(850ms)
    setTimeout(() => {
      burstConfetti(window.innerWidth * 0.5, window.innerHeight * 0.46, 65);
    }, 850);
    // 2차 좌측 폭죽 (1100ms)
    setTimeout(() => {
      burstConfetti(window.innerWidth * 0.3, window.innerHeight * 0.38, 50, ['#ff4081', '#ff9800', '#ffd54f']);
    }, 1100);
    // 3차 우측 폭죽 (1350ms)
    setTimeout(() => {
      burstConfetti(window.innerWidth * 0.7, window.innerHeight * 0.38, 50, ['#00e676', '#00b0ff', '#ffd54f']);
    }, 1350);
    if (bonus) {
      // 보너스 시 4차 대형 피날레 폭죽 (1600ms)
      setTimeout(() => {
        burstConfetti(window.innerWidth * 0.5, window.innerHeight * 0.32, 90);
      }, 1600);
    }
  }
  function fxLoop() {
    if (!fxCtx || !fxCanvas) return;
    fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
    for (let i = fxParticles.length - 1; i >= 0; i--) {
      const p = fxParticles[i];
      p.x += p.vx; p.y += p.vy;
      p.vy += 0.22; p.vx *= 0.98;
      p.rot += p.vrot; p.alpha -= p.decay;
      if (p.alpha <= 0 || p.y > fxCanvas.height + 50) { fxParticles.splice(i, 1); continue; }
      fxCtx.save();
      fxCtx.globalAlpha = Math.max(0, p.alpha);
      fxCtx.translate(p.x, p.y);
      fxCtx.rotate(p.rot);
      fxCtx.fillStyle = p.color;
      if (p.type === 'star') {
        const s = p.size;
        fxCtx.beginPath();
        fxCtx.moveTo(0, -s);
        fxCtx.quadraticCurveTo(0, 0, s, 0);
        fxCtx.quadraticCurveTo(0, 0, 0, s);
        fxCtx.quadraticCurveTo(0, 0, -s, 0);
        fxCtx.quadraticCurveTo(0, 0, 0, -s);
        fxCtx.fill();
      } else if (p.type === 'rect') {
        fxCtx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6);
      } else {
        fxCtx.beginPath();
        fxCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        fxCtx.fill();
      }
      fxCtx.restore();
    }
    if (fxParticles.length > 0) fxAnimationId = requestAnimationFrame(fxLoop);
    else { fxAnimationId = null; fxCtx.clearRect(0, 0, fxCanvas.width, fxCanvas.height); }
  }
  function chime(type = 'default', level = 0){
    try{
      const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
      audioContext ||= new AC();
      if(audioContext.state==='suspended')audioContext.resume().catch(()=>{});
      const now = audioContext.currentTime;
      if (type === 'swoop') {
        // 별이 저 멀리서 슝~ 날아오는 상승 피치
        const o = audioContext.createOscillator(), g = audioContext.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(320, now);
        o.frequency.exponentialRampToValueAtTime(780, now + 0.75);
        g.gain.setValueAtTime(0.035, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.78);
        o.connect(g); g.connect(audioContext.destination);
        o.start(now); o.stop(now + 0.8);
      } else if (type === 'star-slam' || type === 'bonus-slam') {
        // 묵직한 쾅! 저음 임팩트
        const sub = audioContext.createOscillator(), subGain = audioContext.createGain();
        sub.type = 'triangle';
        sub.frequency.setValueAtTime(140, now);
        sub.frequency.exponentialRampToValueAtTime(30, now + 0.38);
        subGain.gain.setValueAtTime(0.09, now);
        subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
        sub.connect(subGain); subGain.connect(audioContext.destination);
        sub.start(now); sub.stop(now + 0.39);

        // 화려한 상위 챠임
        const freqs = type === 'bonus-slam'
          ? [523.25, 659.25, 783.99, 1046.50, 1318.51]
          : [523.25, 659.25, 783.99, 1046.50];
        freqs.forEach((f, idx) => {
          const o = audioContext.createOscillator(), g = audioContext.createGain(), start = now + 0.04 + idx * 0.07;
          o.type = 'sine';
          o.frequency.setValueAtTime(f, start);
          g.gain.setValueAtTime(0.045, start);
          g.gain.exponentialRampToValueAtTime(0.0001, start + 0.38);
          o.connect(g); g.connect(audioContext.destination);
          o.start(start); o.stop(start + 0.4);
        });
      } else if (type === 'ding') {
        const o = audioContext.createOscillator(), g = audioContext.createGain();
        o.type = 'sine'; o.frequency.setValueAtTime(1046.50, now);
        g.gain.setValueAtTime(0.04, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
        o.connect(g); g.connect(audioContext.destination);
        o.start(now); o.stop(now + 0.24);
      } else if (type === 'hop') {
        const o = audioContext.createOscillator(), g = audioContext.createGain();
        o.type = 'sine'; o.frequency.setValueAtTime(320, now);
        o.frequency.exponentialRampToValueAtTime(740, now + 0.16);
        g.gain.setValueAtTime(0.06, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        o.connect(g); g.connect(audioContext.destination);
        o.start(now); o.stop(now + 0.18);
      } else if (type === 'train-whistle') {
        [587.33, 739.99, 880].forEach(f => {
          const o = audioContext.createOscillator(), g = audioContext.createGain();
          o.type = 'sawtooth'; o.frequency.setValueAtTime(f, now);
          g.gain.setValueAtTime(0.025, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
          o.connect(g); g.connect(audioContext.destination);
          o.start(now); o.stop(now + 0.46);
        });
      } else if (type === 'delivery-horn') {
        [440, 554.37].forEach(f => {
          const o = audioContext.createOscillator(), g = audioContext.createGain();
          o.type = 'triangle'; o.frequency.setValueAtTime(f, now);
          g.gain.setValueAtTime(0.045, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
          o.connect(g); g.connect(audioContext.destination);
          o.start(now); o.stop(now + 0.3);
        });
      } else if (type === 'snap') {
        // 기차 칸을 연결할수록 반음씩 올라가는 '도-레-미' 연결음
        const top = 880 * Math.pow(2, Math.min(level, 8) * 2 / 12);
        const o = audioContext.createOscillator(), g = audioContext.createGain();
        o.type = 'triangle'; o.frequency.setValueAtTime(top, now);
        o.frequency.exponentialRampToValueAtTime(top / 4, now + 0.08);
        g.gain.setValueAtTime(0.05, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        o.connect(g); g.connect(audioContext.destination);
        o.start(now); o.stop(now + 0.1);
      } else if (type === 'combo') {
        // 콤보가 쌓일수록 통째로 올라가는 상승 아르페지오
        const shift = Math.pow(2, Math.min(level, 8) / 12);
        [523.25, 659.25, 783.99, 1046.50].forEach((f, idx) => {
          const o = audioContext.createOscillator(), g = audioContext.createGain(), start = now + idx * 0.055;
          o.type = 'triangle'; o.frequency.setValueAtTime(f * shift, start);
          g.gain.setValueAtTime(0.038, start);
          g.gain.exponentialRampToValueAtTime(0.0001, start + 0.26);
          o.connect(g); g.connect(audioContext.destination);
          o.start(start); o.stop(start + 0.28);
        });
      } else if (type === 'coin') {
        [987.77, 1318.51].forEach((f, idx) => {
          const o = audioContext.createOscillator(), g = audioContext.createGain(), start = now + idx * 0.05;
          o.type = 'square'; o.frequency.setValueAtTime(f, start);
          g.gain.setValueAtTime(0.022, start);
          g.gain.exponentialRampToValueAtTime(0.0001, start + 0.14);
          o.connect(g); g.connect(audioContext.destination);
          o.start(start); o.stop(start + 0.16);
        });
      } else if (type === 'oops') {
        // 혼내는 소리가 아니라 '다시 해 보자'는 부드러운 하강음
        const o = audioContext.createOscillator(), g = audioContext.createGain();
        o.type = 'sine'; o.frequency.setValueAtTime(392, now);
        o.frequency.exponentialRampToValueAtTime(294, now + 0.22);
        g.gain.setValueAtTime(0.035, now); g.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
        o.connect(g); g.connect(audioContext.destination);
        o.start(now); o.stop(now + 0.26);
      } else {
        [523.25, 659.25, 783.99].forEach((f, idx) => {
          const o = audioContext.createOscillator(), g = audioContext.createGain(), start = now + idx * 0.09;
          o.type = 'sine'; o.frequency.setValueAtTime(f, start);
          g.gain.setValueAtTime(0.035, start);
          g.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);
          o.connect(g); g.connect(audioContext.destination);
          o.start(start); o.stop(start + 0.24);
        });
      }
    }catch{/* 효과음 없이 지속 */}
  }
  function celebrateStar(bonus = false) {
    chime('swoop');
    // 별이 딱 박히는 시점(850ms)에 쿵! 효과음 울림
    setTimeout(() => {
      chime(bonus ? 'bonus-slam' : 'star-slam');
    }, 840);

    launchConfetti(bonus);

    const overlay = document.createElement('div');
    overlay.className = 'star-celebration';
    const starIcons = bonus
      ? '<span class="star-pop-icon">★</span><span class="star-pop-icon">★</span><span class="star-pop-icon">★</span>'
      : '<span class="star-pop-icon">★</span>';
    const badgeText = bonus ? `Day ${day} 완주! 보너스 별 +3` : '미션 완료! 별 하나 받았어요!';
    overlay.innerHTML = `
      <div class="star-shockwave"></div>
      <div class="star-sunburst"></div>
      <div class="star-pop-group ${bonus ? 'bonus' : ''}">${starIcons}</div>
      <div class="star-pop-badge">${badgeText}</div>
    `;
    document.body.appendChild(overlay);

    // 날아오고(0.85s), 팡팡 터지는 폭죽과 배지를 충분히 감상(약 1.3s)한 뒤,
    // 2.2초 시점에 상단 별 카운터로 발사!
    setTimeout(() => {
      const pill = document.querySelector('.star-pill');
      const pillRect = pill ? pill.getBoundingClientRect() : { left: window.innerWidth - 80, top: 30, width: 60, height: 40 };
      const targetX = pillRect.left + pillRect.width / 2;
      const targetY = pillRect.top + pillRect.height / 2;
      const startX = window.innerWidth / 2;
      const startY = window.innerHeight * 0.46;
      const starsCount = bonus ? 3 : 1;

      // 중앙 그룹 페이드아웃 시작
      overlay.style.transition = 'opacity .35s ease, transform .35s ease';
      overlay.style.opacity = '0';
      overlay.style.transform = 'translate(-50%, -52%) scale(0.92)';

      for (let i = 0; i < starsCount; i++) {
        setTimeout(() => {
          const flyer = document.createElement('div');
          flyer.className = 'star-flyer';
          flyer.textContent = '★';
          const offset = bonus ? (i - 1) * 90 : 0;
          const sX = startX + offset;
          const sY = startY + (bonus && i === 1 ? -16 : 0);
          document.body.appendChild(flyer);

          const arcY = Math.max(15, Math.min(sY, targetY) - 35);
          const midX = (sX + targetX) * 0.5 - 20;

          flyer.animate([
            { left: `${sX}px`, top: `${sY}px`, transform: 'translate(-50%, -50%) scale(1.05) rotate(0deg)', opacity: 1 },
            { left: `${midX}px`, top: `${arcY}px`, transform: 'translate(-50%, -50%) scale(0.65) rotate(130deg)', opacity: 0.95, offset: 0.5 },
            { left: `${targetX}px`, top: `${targetY}px`, transform: 'translate(-50%, -50%) scale(0.24) rotate(260deg)', opacity: 0.7 }
          ], {
            duration: 650,
            easing: 'cubic-bezier(.22, .9, .32, 1)',
            fill: 'forwards'
          }).onfinish = () => {
            flyer.remove();
            if (pill) {
              pill.classList.remove('bump');
              void pill.offsetWidth;
              pill.classList.add('bump');
            }
            chime('ding');
          };
        }, i * 150);
      }
    }, 2200);

    // 전체 오버레이 정리
    setTimeout(() => {
      overlay.remove();
    }, 2650);
  }
  function clearCelebration() {
    document.querySelectorAll('.star-celebration, .star-flyer').forEach(el => el.remove());
  }
  function switchProfile(id) {
    if (!Object.hasOwn(profiles, id) || id === profileId) return;
    save();
    profileId = id;
    write('english_island_active_v2', id);
    profile = profiles[profileId];
    day = profile.currentDay;
    region = Math.floor((day - 1) / 10);
    tab = 'map';
    clearCelebration();
    resetActivity();
    render();
  }
  function mark(step) {
    const was=C.isCleared(profile,day);
    if(C.complete(profile,day,step)){
      save();
      const bonus = !was && C.isCleared(profile,day);
      celebrateStar(bonus);
      toast(bonus ? `Day ${day} 탐험 완료! 보너스 별 3개도 받았어요.` : '미션 완료! 별 하나를 받았어요.');
    }
  }
  function advanceQuiz() {
    clearTimeout(quizAutoTimer);
    clearInterval(quizCountdownInterval);
    if (!quiz || !quiz.answered) return;
    quiz.index++;
    if (quiz.index === 12) mark('quiz');
    render();
  }
  function resetActivity(){clearTimeout(quizAutoTimer);clearInterval(quizCountdownInterval);clearAutoAdvance();cancelSpeech();cardIndex=0;exampleRevealed=new Set();comicRead=new Set();comicCut=0;quiz=null;game=null;}
  function setDay(value,next='cards') {if(!Number.isInteger(value)||value<1||value>50)return;clearTimeout(quizAutoTimer);clearInterval(quizCountdownInterval);clearCelebration();resetActivity();day=value;region=Math.floor((day-1)/10);save();navigate(next);}
  function navigate(value){if(!['map','cards','comic','quiz','game','rewards'].includes(value))return;clearTimeout(quizAutoTimer);clearInterval(quizCountdownInterval);clearAutoAdvance();cancelSpeech();clearCelebration();if(value!==tab||value==='game'){game=null;quiz=null;}tab=value;render();window.scrollTo({top:0,behavior:'instant'});$('main').focus({preventScroll:true});}
  function nav(){const items=[['map','탐험 지도'],['cards','단어 카드'],['comic','이야기 만화'],['quiz','단어 퀴즈'],['game','놀이 마당']];$('nav').innerHTML=items.map(([id,label])=>`<button data-action="tab" data-value="${id}" ${tab===id?'aria-current="page"':''}>${icon(id)}${label}</button>`).join('');}
  function stepStrip(){return `<div class="step-strip" aria-label="오늘의 네 가지 미션">${[['cards','단어'],['comic','만화'],['quiz','퀴즈'],['game','게임']].map(([id,label],i)=>`<button class="${tab===id?'active':''} ${record()[id]?'complete':''}" data-action="tab" data-value="${id}" ${tab===id?'aria-current="step"':''}>${i+1}. ${label}</button>`).join('')}</div>`;}
  function sessionHeading(title,description){return `<div class="session-heading"><div><div class="eyebrow">DAY ${day} · ${esc(data().title)}</div><h1>${title}</h1><p>${description}</p></div><button data-action="tab" data-value="map">${icon('map')}지도 보기</button></div>${stepStrip()}`;}
  function tree(x,y,size=1){return `<g transform="translate(${x} ${y}) scale(${size})"><path d="M0 15v37" stroke="#916f45" stroke-width="10"/><ellipse cy="0" rx="27" ry="31" fill="#78a97c"/><ellipse cx="-15" cy="8" rx="22" ry="23" fill="#8bbb83"/><ellipse cx="16" cy="10" rx="21" ry="23" fill="#5e9e72"/></g>`;}


  // Day 노드가 놓이는 좌표(900 x 480 기준). 지도와 랜드마크가 같은 좌표계를 쓴다.
  const NODE_POINTS=[[120,375],[230,295],[170,160],[340,95],[520,105],[730,145],[640,250],[460,290],[590,375],[750,350]];
  // 각 노드 옆 빈자리. 노드 아래 라벨과 기존 장식물을 피해 잡은 오프셋.
  const LANDMARK_SLOTS=[[56,10],[58,8],[-58,4],[-60,8],[58,4],[56,6],[58,4],[-58,12],[-58,4],[0,-56]];
  // Day마다 그날의 주제를 상징하는 작은 표식. 발밑이 (0,16), 높이는 36 안팎으로 통일한다.
  const LANDMARK_ART=[
    // 1-10 친구의 숲
    `<path d="M0 16V-2" stroke="#8a6a45" stroke-width="5"/><rect x="-17" y="-19" width="34" height="17" rx="4" fill="#fff3d6" stroke="#8a6a45" stroke-width="2"/><text y="-6" font-size="11" font-weight="800" fill="#d1743f" text-anchor="middle">Hi</text>`,
    `<circle cx="9" cy="-5" r="6.5" fill="#ffd9b0" stroke="#8a6a45" stroke-width="2"/><path d="M1 16V8a8 8 0 0 1 16 0v8Z" fill="#7fb3d5" stroke="#8a6a45" stroke-width="2"/><circle cx="-8" cy="-8" r="7" fill="#ffd9b0" stroke="#8a6a45" stroke-width="2"/><path d="M-17 16V6a9 9 0 0 1 18 0v10Z" fill="#ef9a8a" stroke="#8a6a45" stroke-width="2"/>`,
    `<path d="M11-20 17-14 3-1-4 1-2-6Z" fill="#ffd166" stroke="#8a6a45" stroke-width="2"/><path d="M-16-4h32v20h-32Z" fill="#fff3d6" stroke="#8a6a45" stroke-width="2"/><path d="M-16-4q8-6 16 0 8-6 16 0" fill="#ef9a8a" stroke="#8a6a45" stroke-width="2"/><path d="M0-2v18" stroke="#c9a978" stroke-width="2"/>`,
    `<path d="M-11 4-15 16m26-12 4 12" stroke="#8a6a45" stroke-width="3" stroke-linecap="round"/><rect x="-17" y="-18" width="34" height="24" rx="3" fill="#3f6b53" stroke="#8a6a45" stroke-width="2"/><text y="-1" font-size="11" font-weight="800" fill="#fff6de" text-anchor="middle">ABC</text>`,
    `<path d="M8 2 16-12" stroke="#ffd9b0" stroke-width="5" stroke-linecap="round"/><circle cy="-9" r="7" fill="#ffd9b0" stroke="#8a6a45" stroke-width="2"/><path d="M-11 16V4a11 10 0 0 1 22 0v12Z" fill="#8ac6a0" stroke="#8a6a45" stroke-width="2"/>`,
    `<path d="M-1-16c11 0 17 7 17 14 0 6-6 5-9 8-2 2-1 6-4 8-9 4-21-5-21-15 0-9 6-15 17-15Z" fill="#fff3d6" stroke="#8a6a45" stroke-width="2"/><circle cx="-8" cy="-6" r="3" fill="#e05a4f"/><circle cx="1" cy="-10" r="3" fill="#ffc94d"/><circle cx="8" cy="-1" r="3" fill="#4f9ad6"/><circle cx="-4" cy="4" r="3" fill="#6cbf72"/>`,
    `<rect x="-18" y="0" width="15" height="16" rx="3" fill="#f2a35e" stroke="#8a6a45" stroke-width="2"/><rect x="-1" y="0" width="15" height="16" rx="3" fill="#6cbf72" stroke="#8a6a45" stroke-width="2"/><rect x="-10" y="-17" width="15" height="16" rx="3" fill="#7fb3d5" stroke="#8a6a45" stroke-width="2"/><text x="-2" y="-5" font-size="11" font-weight="800" fill="#fff6de" text-anchor="middle">1</text>`,
    `<circle cx="-10" cy="8" r="8" fill="#7fb3d5" stroke="#8a6a45" stroke-width="2"/><rect x="1" y="0" width="16" height="16" rx="2" fill="#f2a35e" stroke="#8a6a45" stroke-width="2"/><path d="M-2-19 8-2H-12Z" fill="#e8c95c" stroke="#8a6a45" stroke-width="2"/>`,
    `<path d="M13-19a4 4 0 0 1 6 4l-6 6-6-6a4 4 0 0 1 6-4Z" fill="#ef7d8e" stroke="#8a6a45" stroke-width="1.5"/><circle cy="0" r="15" fill="#ffe08a" stroke="#8a6a45" stroke-width="2"/><circle cx="-5" cy="-4" r="2" fill="#5a4632"/><circle cx="5" cy="-4" r="2" fill="#5a4632"/><path d="M-6 4q6 6 12 0" fill="none" stroke="#5a4632" stroke-width="2" stroke-linecap="round"/>`,
    `<path d="M-13 16V-7h11" fill="none" stroke="#c96f3f" stroke-width="3.5" stroke-linecap="round"/><path d="M-13 1h11m-11 8h11" stroke="#c96f3f" stroke-width="3"/><path d="M-2-7q19 9 19 23" fill="none" stroke="#e8913a" stroke-width="8" stroke-linecap="round"/><path d="M-2-7q19 9 19 23" fill="none" stroke="#ffd48c" stroke-width="3.5" stroke-linecap="round"/>`,
    // 11-20 포근한 마을
    `<circle cx="-11" cy="-4" r="6" fill="#ffd9b0" stroke="#8a6a45" stroke-width="2"/><path d="M-19 16V6a8 8 0 0 1 16 0v10Z" fill="#ef9a8a" stroke="#8a6a45" stroke-width="2"/><circle cx="3" cy="-9" r="7" fill="#ffd9b0" stroke="#8a6a45" stroke-width="2"/><path d="M-5 16V4a8 8 0 0 1 16 0v12Z" fill="#7fb3d5" stroke="#8a6a45" stroke-width="2"/><circle cx="15" cy="2" r="5" fill="#ffd9b0" stroke="#8a6a45" stroke-width="2"/><path d="M9 16v-5a6 6 0 0 1 12 0v5Z" fill="#ffd166" stroke="#8a6a45" stroke-width="2"/>`,
    `<path d="M-14 16V-2h28v18Z" fill="#fff3d6" stroke="#8a6a45" stroke-width="2"/><path d="M-18-2 0-18l18 16Z" fill="#e8735f" stroke="#8a6a45" stroke-width="2"/><rect x="-4" y="4" width="9" height="12" rx="2" fill="#c9945c" stroke="#8a6a45" stroke-width="1.5"/><rect x="-12" y="2" width="6" height="6" fill="#cfeaf7" stroke="#8a6a45" stroke-width="1.2"/>`,
    `<path d="M-17 16V2h26a5 5 0 0 1 5 5v9" fill="#cfeaf7" stroke="#8a6a45" stroke-width="2"/><path d="M-17 6h10v-6h-10Z" fill="#fff3d6" stroke="#8a6a45" stroke-width="2"/><path d="M9 2V-14" stroke="#8a6a45" stroke-width="2.5"/><path d="M2-14h14l-3 7H5Z" fill="#ffd166" stroke="#8a6a45" stroke-width="1.8"/>`,
    `<path d="M-12 6V-6a3 3 0 0 1 6 0v-8a3 3 0 0 1 6 0v-3a3 3 0 0 1 6 0v11a11 11 0 0 1-11 12 7 7 0 0 1-7-6Z" fill="#ffd9b0" stroke="#8a6a45" stroke-width="2"/>`,
    `<path d="M-19-12q19 7 38 0" fill="none" stroke="#8a6a45" stroke-width="2"/><path d="M-16-8-9-11l3 2 3-2 7 3-3 5-3-1v10h-9V-4l-3 1Z" fill="#7fb3d5" stroke="#8a6a45" stroke-width="1.8"/><path d="M5-7h13v16H5Z" fill="#ef9a8a" stroke="#8a6a45" stroke-width="1.8"/>`,
    `<ellipse cx="-6" cy="7" rx="13" ry="9" fill="#fdfdf7" stroke="#8a6a45" stroke-width="2"/><circle cx="-6" cy="6" r="5" fill="#ffc94d" stroke="#e0a63f" stroke-width="1.5"/><path d="M6-9h14l-2 25H8Z" fill="#e7f1fb" stroke="#8a6a45" stroke-width="2"/><path d="M6-9h14l-1 6H7Z" fill="#fdfdf7" stroke="#8a6a45" stroke-width="1.2"/>`,
    `<rect x="-16" y="-4" width="32" height="20" rx="4" fill="#e8735f" stroke="#8a6a45" stroke-width="2"/><path d="M-7-4v-4a7 7 0 0 1 14 0v4" fill="none" stroke="#8a6a45" stroke-width="2.5"/><path d="M-16 4h32" stroke="#fff3d6" stroke-width="2.5"/>`,
    `<path d="M-17 2h34l-4 14h-26Z" fill="#d9a45e" stroke="#8a6a45" stroke-width="2"/><circle cx="-6" cy="-5" r="7" fill="#e05a4f" stroke="#8a6a45" stroke-width="1.8"/><path d="M-6-12v-5" stroke="#6b8f3f" stroke-width="2"/><path d="M9-14 15 2H3Z" fill="#f0913f" stroke="#8a6a45" stroke-width="1.8"/>`,
    `<path d="M-11 0h22l-3 16h-16Z" fill="#7fb3d5" stroke="#8a6a45" stroke-width="2"/><path d="M-3-18h7v12h-7Z" fill="#fff3d6" stroke="#8a6a45" stroke-width="1.8"/><path d="M-3-8h7v8h-7Z" fill="#ef9a8a" stroke="#8a6a45" stroke-width="1.8"/>`,
    `<path d="M-7-8-9-18l7 5h5l7-5-2 10" fill="#a99483" stroke="#8a6a45" stroke-width="1.8"/><path d="M-16 0h32v16h-32Z" fill="#d9a45e" stroke="#8a6a45" stroke-width="2"/><path d="M-16 0-12-9h24l4 9Z" fill="#e8c08a" stroke="#8a6a45" stroke-width="2"/>`,
    // 21-30 무지개 항구
    `<rect x="-15" y="-2" width="30" height="18" rx="2" fill="#fff3d6" stroke="#8a6a45" stroke-width="2"/><path d="M-19-2-14-15h28l5 13Z" fill="#e8735f" stroke="#8a6a45" stroke-width="2"/><path d="M-8-2 -6-15m8 13 1-13m7 13 2-13" stroke="#fff3d6" stroke-width="2"/><rect x="-6" y="4" width="12" height="12" fill="#7fb3d5" stroke="#8a6a45" stroke-width="1.5"/>`,
    `<rect x="-17" y="-11" width="34" height="21" rx="5" fill="#f2a35e" stroke="#8a6a45" stroke-width="2"/><rect x="-12" y="-7" width="10" height="9" rx="1.5" fill="#cfeaf7"/><rect x="1" y="-7" width="10" height="9" rx="1.5" fill="#cfeaf7"/><circle cx="-9" cy="12" r="4" fill="#5a4632"/><circle cx="9" cy="12" r="4" fill="#5a4632"/>`,
    `<path d="M-16 8q0-19 16-19t16 19Z" fill="#e05a4f" stroke="#8a6a45" stroke-width="2"/><circle cy="-3" r="4" fill="#ffd166"/><path d="M-19 8h38v7h-38Z" fill="#c94b42" stroke="#8a6a45" stroke-width="2"/>`,
    `<circle cx="13" cy="-11" r="6" fill="#ffd166" stroke="#8a6a45" stroke-width="1.8"/><path d="M-16-2h30l-3 18h-24Z" fill="#8ac6a0" stroke="#8a6a45" stroke-width="2"/><path d="M-9-2v-5a8 8 0 0 1 16 0v5" fill="none" stroke="#8a6a45" stroke-width="2.5"/>`,
    `<path d="M-4-17h8v11h-8Z" fill="#c9a978" stroke="#8a6a45" stroke-width="1.5"/><rect x="-16" y="-6" width="32" height="22" rx="4" fill="#fff3d6" stroke="#8a6a45" stroke-width="2"/><path d="M-3 0h6v4h4v6h-4v4h-6v-4h-4V4h4Z" fill="#e05a4f"/>`,
    `<rect x="-9" y="-19" width="18" height="28" rx="5" fill="#4a6b55" stroke="#8a6a45" stroke-width="2"/><circle cy="-13" r="3.4" fill="#e05a4f"/><circle cy="-5" r="3.4" fill="#ffd166"/><circle cy="3" r="3.4" fill="#6cbf72"/><path d="M-14 13v5m7-5v5m7-5v5m7-5v5" stroke="#fdf6e6" stroke-width="3"/>`,
    `<path d="M-17-9h34v18h-34Z" fill="none" stroke="#eaf2f4" stroke-width="2.5"/><path d="M-17-9v18m8-18v18m9-18v18m8-18v18m-25-9h34" stroke="#eaf2f4" stroke-width="1"/><circle cx="7" cy="9" r="7" fill="#fdfdf7" stroke="#5a4632" stroke-width="1.8"/><path d="M7 4 11 7l-1.5 5h-5L3 7Z" fill="#5a4632"/>`,
    `<path d="M7-21v13" stroke="#5a4632" stroke-width="2.5"/><circle cx="3" cy="-8" r="4" fill="#5a4632"/><rect x="-15" y="0" width="28" height="16" rx="3" fill="#e05a4f" stroke="#8a6a45" stroke-width="2"/><ellipse cx="-1" cy="0" rx="14" ry="5" fill="#fff3d6" stroke="#8a6a45" stroke-width="2"/>`,
    `<circle cy="0" r="16" fill="#fff3d6" stroke="#8a6a45" stroke-width="2.5"/><circle cy="0" r="11" fill="none" stroke="#e0d2ae" stroke-width="1.5"/><path d="M0 0v-9m0 9 7 5" stroke="#5a4632" stroke-width="2.5" stroke-linecap="round"/>`,
    `<rect x="-16" y="-10" width="32" height="26" rx="3" fill="#fff3d6" stroke="#8a6a45" stroke-width="2"/><path d="M-16-2h32" stroke="#8a6a45" stroke-width="2"/><path d="M-9-15v7m18-7v7" stroke="#8a6a45" stroke-width="3" stroke-linecap="round"/><circle cx="-7" cy="7" r="4" fill="#ffd166"/><path d="M2 4h11m-11 7h8" stroke="#b7c6bb" stroke-width="2.5" stroke-linecap="round"/>`,
    // 31-40 초록 탐험섬
    `<path d="M0 16V2" stroke="#8a6a45" stroke-width="5"/><circle cy="-6" r="14" fill="#6cbf72"/><path d="M0-20a14 14 0 0 1 0 28Z" fill="#e8944f"/><circle cy="-6" r="14" fill="none" stroke="#4e7f4c" stroke-width="2"/>`,
    `<path d="M0 2v-9" stroke="#5c8c46" stroke-width="2.5"/><path d="M0-5q-13-2-11-11 9-2 11 9Z" fill="#6cbf72" stroke="#4e7f4c" stroke-width="1.5"/><path d="M0-7q13-4 11-13-10 0-11 11Z" fill="#8ed48a" stroke="#4e7f4c" stroke-width="1.5"/><path d="M-11 2h22l-3 14h-16Z" fill="#d97b56" stroke="#8a6a45" stroke-width="2"/>`,
    `<path d="M0 16V-1" stroke="#8a6a45" stroke-width="4"/><path d="M0-27 17-10 0 7-17-10Z" fill="#ffd44d" stroke="#6b5636" stroke-width="2.5"/><path d="M-6-1q-1-7 3-9 0-5 4-5 3 0 3 3l4 2-4 2q1 4-2 6l4 4h-5l-2-3-4 3Z" fill="#4a3b2a"/>`,
    `<path d="M-13-9q-6-9-1-13 6 1 8 7Zm26 0q6-9 1-13-6 1-8 7Z" fill="#c9945c" stroke="#8a6a45" stroke-width="2"/><circle cy="0" r="13" fill="#e8c08a" stroke="#8a6a45" stroke-width="2"/><circle cx="-5" cy="-2" r="2" fill="#5a4632"/><circle cx="5" cy="-2" r="2" fill="#5a4632"/><ellipse cy="5" rx="3.5" ry="2.5" fill="#5a4632"/>`,
    `<path d="M-17 4q4-13 16-13t14 11l5-7 2 14-7-2q-8 6-18 4T-17 4Z" fill="#5fa8d3" stroke="#38607d" stroke-width="2"/><circle cx="-7" cy="-2" r="2" fill="#1f3b4d"/><path d="M-5-13q2-6 7-7" fill="none" stroke="#cfeaf7" stroke-width="2.5" stroke-linecap="round"/>`,
    `<path d="M-18 8-6-13 2-1l6-9 11 18Z" fill="#7d9e6e" stroke="#41684f" stroke-width="2"/><path d="M-6-13-11-5h10Z" fill="#fdfdf7"/><path d="M-19 9q10 7 19 0t19 2v5h-38Z" fill="#5fa8d3" stroke="#38607d" stroke-width="1.5"/>`,
    `<circle cx="-3" cy="-5" r="11" fill="#cfeaf7" opacity=".9" stroke="#8a6a45" stroke-width="2.5"/><path d="M-7-9q3-4 8-3" fill="none" stroke="#fdfdf7" stroke-width="2.5" stroke-linecap="round"/><path d="M5 4 15 15" stroke="#8a6a45" stroke-width="5" stroke-linecap="round"/>`,
    `<rect x="-18" y="0" width="14" height="16" rx="2" fill="#c9945c" stroke="#8a6a45" stroke-width="2"/><rect x="-2" y="-5" width="14" height="21" rx="2" fill="#a8bcc4" stroke="#8a6a45" stroke-width="2"/><circle cx="10" cy="9" r="7" fill="#cfeaf7" opacity=".9" stroke="#8a6a45" stroke-width="2"/>`,
    `<path d="M0-21q9 8 9 19l-4 7h-10l-4-7q0-11 9-19Z" fill="#fff3d6" stroke="#8a6a45" stroke-width="2"/><circle cy="-7" r="3.6" fill="#5fa8d3" stroke="#8a6a45" stroke-width="1.5"/><path d="M-9-1-15 8h6Zm18 0 6 9h-6Z" fill="#e05a4f" stroke="#8a6a45" stroke-width="1.5"/><path d="M-4 6q4 10 8 0Z" fill="#ffd166"/>`,
    `<path d="M-13-5h26l-3 21h-20Z" fill="#6cbf72" stroke="#4e7f4c" stroke-width="2"/><path d="M-16-5h32" stroke="#8a6a45" stroke-width="3" stroke-linecap="round"/><path d="M-4-11h8v6h-8Z" fill="#8a6a45"/><path d="M-5 4 0-2l5 6M-6 6l3 6h6" fill="none" stroke="#fdfdf7" stroke-width="2" stroke-linecap="round"/>`,
    // 41-50 상상의 산
    `<path d="M-17-18h34v21h-19l-9 8v-8h-6Z" fill="#f4ecff" stroke="#6c5391" stroke-width="2"/><path d="M0-14a5 5 0 0 1 8 5l-8 8-8-8a5 5 0 0 1 8-5Z" fill="#ef7d8e"/>`,
    `<path d="M0 16V-15" stroke="#efe6ff" stroke-width="3.5"/><path d="M-16-15h32" stroke="#efe6ff" stroke-width="3.5" stroke-linecap="round"/><path d="M-16-15v6m32-6v6" stroke="#efe6ff" stroke-width="2"/><path d="M-25-9h18l-5 9h-8Z" fill="#ffd166" stroke="#6c5391" stroke-width="2"/><path d="M7-9h18l-5 9h-8Z" fill="#8fd0e8" stroke="#6c5391" stroke-width="2"/><path d="M-9 16h18" stroke="#efe6ff" stroke-width="3.5" stroke-linecap="round"/>`,
    `<path d="M-11 16V-19" stroke="#efe6ff" stroke-width="3.5"/><path d="M-11-19h25l-5 7 5 7h-25Z" fill="#ffd166" stroke="#6c5391" stroke-width="2"/><text x="1" y="-7" font-size="12" font-weight="800" fill="#6c5391" text-anchor="middle">?</text>`,
    `<circle cx="-8" cy="0" r="9" fill="none" stroke="#ffd166" stroke-width="4.5"/><circle cx="8" cy="0" r="9" fill="none" stroke="#8fd0e8" stroke-width="4.5"/>`,
    `<path d="M11-19q9 5 4 15" fill="none" stroke="#ef7d8e" stroke-width="3" stroke-linecap="round"/><path d="M-17 0q8-6 17 0 9-6 17 0v14q-8-6-17 0-9-6-17 0Z" fill="#f7f0ff" stroke="#6c5391" stroke-width="2"/><path d="M0 0v14" stroke="#6c5391" stroke-width="2"/>`,
    `<path d="M13-14v-9l9 4.5-9 4.5" fill="#ef7d8e" stroke="#6c5391" stroke-width="1.5"/><path d="M-16 16V-6h32v22Z" fill="#e7dcf8" stroke="#6c5391" stroke-width="2"/><path d="M-16-6v-9h7v4h6v-4h6v4h6v-4h7v9Z" fill="#cdb8ec" stroke="#6c5391" stroke-width="2"/><path d="M-4 16V7a4 4 0 0 1 8 0v9Z" fill="#8c6fb8"/>`,
    `<path d="M-16 0h32v16h-32Z" fill="#c9945c" stroke="#6a4b30" stroke-width="2"/><path d="M-16 0q16-15 32 0Z" fill="#e0b070" stroke="#6a4b30" stroke-width="2"/><rect x="-4" y="2" width="8" height="9" rx="2" fill="#ffd166" stroke="#6a4b30" stroke-width="1.5"/>`,
    `<path d="M-17-4h8l11-11v26L-9 4h-8Z" fill="#ffd166" stroke="#6c5391" stroke-width="2"/><path d="M8-6q4 5 0 11m6-17q8 10 0 23" fill="none" stroke="#8fd0e8" stroke-width="2.5" stroke-linecap="round"/>`,
    `<path d="M0-21a12 12 0 0 1 7 21v3H-7v-3a12 12 0 0 1 7-21Z" fill="#fff3c4" stroke="#6c5391" stroke-width="2"/><path d="M-7 6h14m-11 6h8" stroke="#6c5391" stroke-width="2.5" stroke-linecap="round"/>`,
    `<path d="M-10-17h20v8a10 10 0 0 1-20 0Z" fill="#ffd166" stroke="#6c5391" stroke-width="2"/><path d="M-10-15h-7a7 7 0 0 0 7 9m20-9h7a7 7 0 0 1-7 9" fill="none" stroke="#6c5391" stroke-width="2"/><path d="M-3 1h6v7h-6Z" fill="#e0a63f"/><path d="M-11 8h22v8h-22Z" fill="#cdb8ec" stroke="#6c5391" stroke-width="2"/>`
  ];
  function landmarks(r){
    return `<g class="map-landmarks">${LANDMARK_SLOTS.map(([dx,dy],i)=>{
      const art=LANDMARK_ART[r*10+i];
      if(!art)return '';
      const [x,y]=NODE_POINTS[i];
      return `<g transform="translate(${x+dx} ${y+dy})"><ellipse cy="18" rx="16" ry="4.5" fill="#25402f" opacity=".18"/>${art}</g>`;
    }).join('')}</g>`;
  }

  function mapDetails(r) {
    const flowers = [[305,175],[350,245],[610,175],[665,325],[370,355],[185,420]].map(([x,y],i)=>`<g transform="translate(${x} ${y})"><path d="M0 0v9m0-3-5-3" stroke="#56866b" stroke-width="2"/><circle r="4" fill="${['#fff5cd','#f5aac0','#ffc56e'][i%3]}"/><circle r="1.5" fill="#fffdf0"/></g>`).join('');
    const cottage = (x,y,color) => `<g transform="translate(${x} ${y})"><ellipse cy="33" rx="30" ry="7" fill="#314f4220"/><rect x="-23" y="-8" width="46" height="40" rx="5" fill="#fff2d5" stroke="#957659" stroke-width="2"/><path d="M-29-7 0-29 29-7Z" fill="${color}" stroke="#795f52" stroke-width="2"/><rect x="-6" y="10" width="13" height="22" rx="5" fill="#658a84"/><path d="M-17 3h8v9h-8zm26 0h8v9H9z" fill="#f6ce70"/></g>`;
    const scenes = [
      `<path d="M310 200Q385 150 470 190T610 205Q560 250 460 238T310 200" fill="#76b36d" opacity=".45"/>${tree(365,170,.85)}${tree(405,150,1.05)}${tree(452,176,.8)}<g transform="translate(510 198)"><ellipse cy="24" rx="28" ry="8" fill="#426d4930"/><path d="M-20 20V-8Q0-28 20-8V20Z" fill="#d9ab77" stroke="#876342" stroke-width="2"/><path d="M-27-6Q0-40 27-6Z" fill="#df7f75"/><path d="M-7 20V8a7 7 0 0 1 14 0v12" fill="#795b48"/><circle cy="-8" r="5" fill="#fff4b6"/></g>`,
      `<ellipse cx="440" cy="216" rx="125" ry="42" fill="#e9ca9b"/>${cottage(363,193,'#dd8e73')}${cottage(434,166,'#8eabc1')}${cottage(507,193,'#d7ac58')}<path d="M337 137q98 34 197 0" fill="none" stroke="#967761" stroke-width="2"/><path d="m350 141 8 14 8-11m25 4 8 15 8-13m25 1 8 14 8-14m24-2 8 12 8-15m22-6 8 12 8-16" fill="#e99885"/><path d="M330 237h220" stroke="#fff1d4" stroke-width="4" stroke-dasharray="3 12"/>`,
      `<path d="M325 209Q370 158 450 179T579 209Q516 255 437 241T325 209" fill="#5bbdcb" stroke="#fff0c7" stroke-width="9"/><path d="M355 216q25-8 50 0m65 3q30-8 60 0" fill="none" stroke="#d4f6f2" stroke-width="3"/><g transform="translate(441 193)"><path d="M-30 16h60l-12 14h-35Z" fill="#db8066" stroke="#77554c" stroke-width="2"/><path d="M0 15v-45" stroke="#685d52" stroke-width="3"/><path d="M-4-29-28 10H-4Z" fill="#fffaf0"/><path d="M5-24 26 10H5Z" fill="#ffd377"/></g><path d="M568 176v65m-9-62v62m-8-62v62" stroke="#ab835b" stroke-width="5"/>`,
      `<path d="M345 211 385 148 422 167 454 141 509 218Z" fill="#789d78" stroke="#3f705b" stroke-width="3"/><path d="M412 165q18 24 8 42t17 30h40q-39-18-27-42t-5-35Z" fill="#84d5d2"/><path d="M430 170q7 27 0 39t19 22" fill="none" stroke="#d3f4df" stroke-width="5"/><ellipse cx="457" cy="239" rx="50" ry="12" fill="#71c8bf"/>${tree(336,175,.85)}${tree(541,178,.9)}<path d="M323 133q110-50 229 0" fill="none" stroke="#32684e" stroke-width="4"/><path d="m370 119-8 13m44-20-6 14m44-13 5 14m38-7 7 13" stroke="#64a961" stroke-width="7" stroke-linecap="round"/>`,
      `<ellipse cx="435" cy="228" rx="101" ry="18" fill="#c5a5ed" opacity=".3"/><g transform="translate(435 200)"><path d="M-59 25v-49h23v22h72v-22h23v49Z" fill="#d6c4eb" stroke="#756191" stroke-width="2"/><path d="M-66-24-47-50-29-24m58 0 18-26 19 26" fill="#eca8c7"/><path d="M-25 24v-64h50v64" fill="#eee4fa"/><path d="M-32-40 0-73 32-40Z" fill="#92b9e0"/><path d="M-10 24V7a10 10 0 0 1 20 0v17" fill="#876aa8"/><path d="M-4-27h8v13h-8zm-47 13h7v12h-7zm94 0h7v12h-7z" fill="#ffe9a1"/><path d="M0-73v-20l20 7-20 7" fill="#ffd78b"/></g><g fill="#ffe7aa"><path d="m321 170 3-9 3 9 9 3-9 3-3 9-3-9-9-3zm231 16 3-9 3 9 9 3-9 3-3 9-3-9-9-3z"/></g>`
    ];
    return `<g class="map-details">${scenes[r]}${r===4?'':flowers}</g>`;
  }
  function fitMap() {
    const island = document.querySelector('.island');
    if (!island) return;
    const frame = island.parentElement;
    const legend = document.querySelector('.map-legend');
    const top = frame.getBoundingClientRect().top + window.scrollY;
    const available = window.innerHeight - top - legend.offsetHeight - 24;
    // Keep the SVG and its HTML destinations in the same 900 x 480 space.
    const width = window.innerWidth > 850
      ? Math.min(frame.clientWidth, Math.max(260, available) * 900 / 480)
      : frame.clientWidth;
    island.style.width = width + 'px';
  }
  window.addEventListener('resize', fitMap);
  document.fonts.ready.then(fitMap);

  function scenery(r) {
    const trail = "M 120 375 C 130 315, 180 320, 230 295 S 130 210, 170 160 S 260 75, 340 95 S 440 135, 520 105 S 745 85, 730 145 S 720 230, 640 250 S 540 255, 460 290 S 500 390, 590 375 S 710 380, 750 350";
    
    // 테마별 길 렌더링
    const trailStyles = [
      { outer: '#769c4c', inner: '#f0f7db', dash: '#5d8236' }, // 숲길: 연두빛 잔디 오솔길
      { outer: '#b58357', inner: '#fbf0e0', dash: '#966337' }, // 마을길: 포근한 조약돌길
      { outer: '#b89255', inner: '#fff6db', dash: '#9e793e' }, // 항구길: 황금빛 모래와 데크길
      { outer: '#447232', inner: '#dcedcf', dash: '#325822' }, // 탐험길: 짙은 덩굴 오솔길
      { outer: '#6c5394', inner: '#f0e5ff', dash: '#cca43b' }  // 상상길: 별빛 은하수길
    ][r];

    const trailSvg = `
      <path d="${trail}" fill="none" stroke="${trailStyles.outer}" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="${trail}" fill="none" stroke="${trailStyles.inner}" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="${trail}" fill="none" stroke="${trailStyles.dash}" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 12"/>
    `;

    // 1. 친구의 숲 (Forest)
    if (r === 0) {
      return `<svg class="landscape" aria-hidden="true" viewBox="0 0 900 480" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="f-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c4ebf2"/><stop offset="100%" stop-color="#9edae4"/></linearGradient>
          <linearGradient id="f-land" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ccf2b6"/><stop offset="100%" stop-color="#a2df84"/></linearGradient>
        </defs>
        <rect width="900" height="480" fill="url(#f-sea)"/>
        <g stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.6">
          <path d="M40 320q20 -6 40 0"/><path d="M120 440q25 -8 50 0"/><path d="M800 400q25 -8 50 0"/>
        </g>
        <path d="M 40 370 C 60 180, 150 45, 380 35 S 770 15, 850 150 S 870 360, 730 435 S 150 465, 40 370 Z" class="coastline" fill="url(#f-land)"/>
        <path d="M 110 340 C 160 200, 220 80, 410 70 S 710 50, 790 160 S 800 330, 690 395 S 200 425, 110 340 Z" fill="#8ecd6e" opacity="0.45"/>
        <ellipse cx="280" cy="365" rx="70" ry="26" fill="#88c8d8" opacity="0.85"/>
        <circle cx="250" cy="360" r="8" fill="#529b69"/><circle cx="300" cy="370" r="10" fill="#529b69"/>
        <circle cx="302" cy="368" r="3.5" fill="#ff7da7"/><circle cx="251" cy="359" r="2.5" fill="#ffffff"/>
        <g transform="translate(520 275) rotate(-10)">
          <rect width="80" height="30" rx="5" fill="#846039" stroke="#5d4224" stroke-width="2.5"/>
          <path d="M10 0v30m15-30v30m15-30v30m15-30v30m15-30v30" stroke="#a67c4d" stroke-width="3"/>
        </g>
        ${mapDetails(r)}
        ${trailSvg}
        <g transform="translate(340 25)">
          <rect width="76" height="46" y="20" rx="5" fill="#c49a6c" stroke="#7d5936" stroke-width="2.5"/>
          <rect x="56" y="6" width="12" height="20" fill="#a0522d" rx="2"/>
          <ellipse cx="62" cy="0" rx="5" ry="3.5" fill="#ffffff" opacity="0.6"/>
          <path d="M-6 24 38 -6 82 24Z" fill="#d9534f" stroke="#992d2a" stroke-width="2.5"/>
          <rect x="28" y="38" width="18" height="28" rx="3" fill="#5a3d28"/>
          <rect x="10" y="32" width="12" height="12" rx="2" fill="#fff9c4" stroke="#7d5936" stroke-width="1.5"/>
        </g>
        <g transform="translate(520 40)">
          <path d="M0 10v35" stroke="#7c5835" stroke-width="7"/>
          <circle cx="0" cy="0" r="28" fill="#ffb3c6"/>
          <circle cx="-14" cy="5" r="19" fill="#ff99b3"/><circle cx="14" cy="7" r="19" fill="#ffccd7"/>
        </g>
        <g transform="translate(260 215)">
          <path d="M0 10v36" stroke="#7c5835" stroke-width="7"/>
          <ellipse cx="0" cy="0" rx="24" ry="22" fill="#599e52"/><circle cx="-8" cy="-5" r="4" fill="#e53935"/><circle cx="10" cy="2" r="4" fill="#e53935"/><circle cx="-2" cy="11" r="4" fill="#e53935"/>
        </g>
        ${tree(70,210,.85)}${tree(80,260,.65)}${tree(766,214,.75)}${tree(550,440,.65)}${tree(760,95,.8)}
        <g transform="translate(170 310)">
          <path d="M0 10v8" stroke="#eae5d8" stroke-width="5"/>
          <path d="M-12 10q12 -14 24 0Z" fill="#e53935"/><circle cx="-4" cy="6" r="1.5" fill="#ffffff"/><circle cx="4" cy="7" r="1.5" fill="#ffffff"/>
        </g>
        ${landmarks(r)}
        <g transform="translate(805 38)"><circle r="19" fill="#ffffff" stroke="#5c8a4d" stroke-width="2.5"/><path d="M0 -13 4 0 0 13 -4 0Z" fill="#e53935"/><text y="27" font-size="12" font-weight="bold" fill="#33691e" text-anchor="middle">숲</text></g>
      </svg>`;
    }

    // 2. 포근한 마을 (Village)
    if (r === 1) {
      return `<svg class="landscape" aria-hidden="true" viewBox="0 0 900 480" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="v-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e9f5fa"/><stop offset="100%" stop-color="#cee6f3"/></linearGradient>
          <linearGradient id="v-land" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#efddbd"/><stop offset="100%" stop-color="#cae0a4"/></linearGradient>
        </defs>
        <rect width="900" height="480" fill="url(#v-sea)"/>
        <path d="M 40 370 C 60 180, 150 45, 380 35 S 770 15, 850 150 S 870 360, 730 435 S 150 465, 40 370 Z" class="coastline" fill="url(#v-land)"/>
        <g transform="translate(520 275) rotate(-10)">
          <rect width="80" height="30" rx="5" fill="#9e9e9e" stroke="#616161" stroke-width="2.5"/>
          <path d="M10 0v30m15-30v30m15-30v30m15-30v30m15-30v30" stroke="#cfd8dc" stroke-width="3"/>
        </g>
        ${mapDetails(r)}
        ${trailSvg}
        <g transform="translate(340 30)">
          <rect width="36" height="54" rx="3" fill="#cfd8dc" stroke="#455a64" stroke-width="2.5"/>
          <polygon points="-4,0 18,-24 40,0" fill="#d32f2f" stroke="#b71c1c" stroke-width="2"/>
          <circle cx="18" cy="20" r="9" fill="#fff9c4" stroke="#37474f" stroke-width="1.5"/>
          <line x1="18" y1="20" x2="18" y2="15" stroke="#37474f" stroke-width="2"/>
          <line x1="18" y1="20" x2="22" y2="20" stroke="#37474f" stroke-width="1.5"/>
        </g>
        <g transform="translate(520 30)">
          <polygon points="12,50 28,50 24,0 16,0" fill="#efebe9" stroke="#5d4037" stroke-width="2"/>
          <circle cx="20" cy="14" r="4" fill="#3e2723"/>
          <line x1="20" y1="14" x2="-6" y2="-9" stroke="#8d6e63" stroke-width="2.5"/>
          <line x1="20" y1="14" x2="46" y2="37" stroke="#8d6e63" stroke-width="2.5"/>
          <line x1="20" y1="14" x2="-3" y2="37" stroke="#8d6e63" stroke-width="2.5"/>
          <line x1="20" y1="14" x2="43" y2="-9" stroke="#8d6e63" stroke-width="2.5"/>
        </g>
        <g transform="translate(630 195)">
          <ellipse cx="20" cy="15" rx="26" ry="12" fill="#90a4ae" stroke="#455a64" stroke-width="2"/>
          <ellipse cx="20" cy="14" rx="20" ry="8" fill="#4fc3f7"/>
          <path d="M20 4Q16 -6 11 6M20 4Q24 -6 29 6" stroke="#0288d1" stroke-width="2" fill="none"/>
        </g>
        <g transform="translate(250 215)">
          <rect width="44" height="32" rx="3" fill="#ffffff" stroke="#5d4037" stroke-width="2"/>
          <polygon points="-4,0 22,-16 48,0" fill="#d32f2f" stroke="#b71c1c" stroke-width="2"/>
          <rect x="6" y="8" width="12" height="12" rx="2" fill="#e1f5fe" stroke="#5d4037" stroke-width="1.5"/>
          <rect x="26" y="12" width="12" height="20" rx="2" fill="#795548"/>
        </g>
        ${tree(75,220,.7)}${tree(768,232,.65)}${tree(550,430,.6)}
        ${landmarks(r)}
        <g transform="translate(805 38)"><circle r="19" fill="#ffffff" stroke="#c27d38" stroke-width="2.5"/><path d="M0 -13 4 0 0 13 -4 0Z" fill="#e53935"/><text y="27" font-size="12" font-weight="bold" fill="#b26a00" text-anchor="middle">마을</text></g>
      </svg>`;
    }

    // 3. 무지개 항구 (Harbor)
    if (r === 2) {
      return `<svg class="landscape" aria-hidden="true" viewBox="0 0 900 480" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="h-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6fc9d8"/><stop offset="100%" stop-color="#45a0ae"/></linearGradient>
          <linearGradient id="h-sand" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fae5ab"/><stop offset="100%" stop-color="#e3c383"/></linearGradient>
        </defs>
        <rect width="900" height="480" fill="url(#h-sea)"/>
        <path d="M 40 370 C 60 180, 150 45, 380 35 S 770 15, 850 150 S 870 360, 730 435 S 150 465, 40 370 Z" class="coastline" fill="url(#h-sand)"/>
        <path d="M 110 340 C 160 200, 220 80, 410 70 S 710 50, 790 160 S 800 330, 690 395 S 200 425, 110 340 Z" fill="#9ec97b" opacity="0.6"/>
        <g opacity="0.86" stroke-linecap="round" fill="none">
          <path d="M50 250Q450 10 850 230" stroke="#ff5252" stroke-width="6"/>
          <path d="M54 255Q450 17 846 235" stroke="#ff9800" stroke-width="6"/>
          <path d="M58 260Q450 24 842 240" stroke="#ffeb3b" stroke-width="6"/>
          <path d="M62 265Q450 31 838 245" stroke="#4caf50" stroke-width="6"/>
          <path d="M66 270Q450 38 834 250" stroke="#29b6f6" stroke-width="6"/>
          <path d="M70 275Q450 45 830 255" stroke="#3f51b5" stroke-width="6"/>
          <path d="M74 280Q450 52 826 260" stroke="#ab47bc" stroke-width="6"/>
        </g>
        <g transform="translate(520 275) rotate(-10)">
          <rect width="80" height="30" rx="4" fill="#a07246" stroke="#684728" stroke-width="2.5"/>
          <path d="M10 0v30m15-30v30m15-30v30m15-30v30m15-30v30" stroke="#d7a16b" stroke-width="3"/>
        </g>
        ${mapDetails(r)}
        ${trailSvg}
        <g transform="translate(730 35)">
          <polygon points="10,80 30,80 26,20 14,20" fill="#ffffff" stroke="#37474f" stroke-width="2.5"/>
          <polygon points="12,65 28,65 27,50 13,50" fill="#e53935"/>
          <polygon points="14,38 26,38 25,28 15,28" fill="#e53935"/>
          <path d="M8 20 20 6 32 20Z" fill="#d32f2f" stroke="#37474f" stroke-width="2"/>
          <circle cx="20" cy="6" r="2.5" fill="#ffd54f"/>
        </g>
        <g transform="translate(70 410) scale(0.9)">
          <path d="M0 14 34 14 28 24 6 24Z" fill="#8d6e63" stroke="#4e342e" stroke-width="2"/>
          <line x1="18" y1="2" x2="18" y2="14" stroke="#3e2723" stroke-width="2"/>
          <polygon points="18,2 32,12 18,12" fill="#ffffff" stroke="#b0bec5" stroke-width="1.5"/>
        </g>
        <g transform="translate(250 215)">
          <path d="M0 45Q12 22 6 0" stroke="#8d6e63" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M6 0q-20 -6 -24 10" stroke="#43a047" stroke-width="4" fill="none"/>
          <path d="M6 0q20 -6 24 10" stroke="#43a047" stroke-width="4" fill="none"/>
          <path d="M6 0q-12 -20 -16 -8" stroke="#2e7d32" stroke-width="4" fill="none"/>
          <path d="M6 0q12 -20 16 -8" stroke="#2e7d32" stroke-width="4" fill="none"/>
        </g>
        ${landmarks(r)}
        <g transform="translate(805 38)"><circle r="19" fill="#ffffff" stroke="#0097a7" stroke-width="2.5"/><path d="M0 -13 4 0 0 13 -4 0Z" fill="#e53935"/><text y="27" font-size="12" font-weight="bold" fill="#00838f" text-anchor="middle">항구</text></g>
      </svg>`;
    }

    // 4. 초록 탐험섬 (Jungle Island)
    if (r === 3) {
      return `<svg class="landscape" aria-hidden="true" viewBox="0 0 900 480" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="j-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4aa99c"/><stop offset="100%" stop-color="#2d7067"/></linearGradient>
          <linearGradient id="j-land" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#73b75d"/><stop offset="100%" stop-color="#437f32"/></linearGradient>
        </defs>
        <rect width="900" height="480" fill="url(#j-sea)"/>
        <path d="M 40 370 C 60 180, 150 45, 380 35 S 770 15, 850 150 S 870 360, 730 435 S 150 465, 40 370 Z" class="coastline" fill="url(#j-land)"/>
        <path d="M 110 340 C 160 200, 220 80, 410 70 S 710 50, 790 160 S 800 330, 690 395 S 200 425, 110 340 Z" fill="#2d5c21" opacity="0.45"/>
        <g transform="translate(520 275) rotate(-10)">
          <rect width="80" height="30" rx="5" fill="#546e7a" stroke="#263238" stroke-width="2.5"/>
          <path d="M10 0v30m15-30v30m15-30v30m15-30v30m15-30v30" stroke="#78909c" stroke-width="3"/>
        </g>
        ${mapDetails(r)}
        ${trailSvg}
        <g transform="translate(340 30)">
          <polygon points="0,44 22,4 44,44" fill="#ff7043" stroke="#d84315" stroke-width="2"/>
          <polygon points="15,44 22,22 29,44" fill="#4e342e"/>
          <circle cx="22" cy="2" r="3" fill="#ffd54f"/>
        </g>
        <g transform="translate(160 85)">
          <path d="M0 40Q12 0 40 8t30 32Z" fill="#78909c" stroke="#37474f" stroke-width="2.5"/>
          <ellipse cx="36" cy="35" rx="16" ry="12" fill="#212121"/>
        </g>
        <g transform="translate(540 230)">
          <rect width="26" height="20" rx="3" fill="#ffd54f" stroke="#ff8f00" stroke-width="2"/>
          <line x1="0" y1="9" x2="26" y2="9" stroke="#b26a00" stroke-width="2"/>
          <circle cx="13" cy="9" r="3" fill="#e53935"/>
        </g>
        ${tree(70,210,.8)}${tree(766,214,.75)}${tree(550,435,.65)}
        ${landmarks(r)}
        <g transform="translate(805 38)"><circle r="19" fill="#ffffff" stroke="#2e7d32" stroke-width="2.5"/><path d="M0 -13 4 0 0 13 -4 0Z" fill="#e53935"/><text y="27" font-size="12" font-weight="bold" fill="#1b5e20" text-anchor="middle">탐험</text></g>
      </svg>`;
    }

    // 5. 상상의 산 (Mountain of Imagination)
    return `<svg class="landscape" aria-hidden="true" viewBox="0 0 900 480" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="s-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2c1e4a"/><stop offset="100%" stop-color="#64438c"/></linearGradient>
        <linearGradient id="s-land" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8d6cb9"/><stop offset="100%" stop-color="#593681"/></linearGradient>
      </defs>
      <rect width="900" height="480" fill="url(#s-sky)"/>
      <g fill="#ffffff">
        <circle cx="80" cy="35" r="2"/><circle cx="180" cy="25" r="1.5"/><circle cx="680" cy="35" r="2"/><circle cx="820" cy="60" r="1.5"/>
        <path d="M720 50l2 -6 2 6 6 2 -6 2 -2 6 -2 -6 -6 -2z" fill="#ffd54f"/>
      </g>
      <path d="M780 20A20 20 0 1 0 800 50A16 16 0 1 1 780 20Z" fill="#ffd54f"/>
      <path d="M 40 370 C 60 180, 150 45, 380 35 S 770 15, 850 150 S 870 360, 730 435 S 150 465, 40 370 Z" class="coastline" fill="url(#s-land)"/>
      <polygon points="70,170 150,45 230,170" fill="#6f4a96"/>
      <polygon points="150,45 125,90 140,82 150,95 160,84 175,90" fill="#ffffff"/>
      <polygon points="610,180 690,55 770,180" fill="#6f4a96"/>
      <polygon points="690,55 670,95 682,87 690,100 700,90 710,95" fill="#ffffff"/>
      <g transform="translate(520 275) rotate(-10)">
        <rect width="80" height="30" rx="6" fill="#d1c4e9" stroke="#7e57c2" stroke-width="2.5"/>
        <path d="M10 0v30m15-30v30m15-30v30m15-30v30m15-30v30" stroke="#ede7f6" stroke-width="3"/>
      </g>
      ${mapDetails(r)}
        ${trailSvg}
      <g transform="translate(340 18)">
        <rect x="8" y="18" width="32" height="28" fill="#ede7f6" stroke="#512da8" stroke-width="2" rx="3"/>
        <path d="M10 18q14 -16 28 0Z" fill="#ffd54f" stroke="#ff8f00" stroke-width="2"/>
        <circle cx="24" cy="-3" r="3.5" fill="#ff4081"/>
      </g>
      <g transform="translate(250 215)">
        <polygon points="0,20 5,0 10,20" fill="#80deea"/><polygon points="8,22 14,6 20,22" fill="#e040fb"/>
      </g>
      ${tree(70,210,.75)}${tree(766,214,.7)}${tree(550,430,.6)}
      ${landmarks(r)}
        <g transform="translate(805 38)"><circle r="19" fill="#ffffff" stroke="#6a1b9a" stroke-width="2.5"/><path d="M0 -13 4 0 0 13 -4 0Z" fill="#ffd54f"/><text y="27" font-size="12" font-weight="bold" fill="#4a148c" text-anchor="middle">상상</text></g>
    </svg>`;
  }
  function renderMap(){
    const r=regions[region],group=days.slice(region*10,region*10+10);
    const points=NODE_POINTS;
    const done=completedCount();
    return `<div class="lead"><div><div class="eyebrow">LITTLE EXPLORERS · 50일의 모험</div><h1><span class="lead-avatar"><img src="assets/profile_${profileId}.png" alt=""></span>${profileId==='aiden'?'Aiden':'Luca'}, 오늘은 어디로 떠날까?</h1><p>작은 발걸음마다, 영어가 자라나요.</p></div><div class="journey-count">${icon('flag')}<div><strong>${done}</strong> / 50일<br><span class="note">탐험 완료</span></div></div></div><div class="region-tabs" role="group" aria-label="탐험 지역">${regions.map((r,i)=>`<button data-action="region" data-value="${i}" aria-pressed="${region===i}">${i+1}. ${r.name}<small>Day ${i*10+1}–${i*10+10}</small></button>`).join('')}</div><div class="map-layout"><div class="map-card" data-region="${region}"><div class="map-caption"><h2>${r.name}</h2><span>번호를 눌러 출발해요</span></div><div class="map-scroll"><div class="island">${scenery(region)}${group.map((d,i)=>`<button class="map-node ${d.day===day?'current':''} ${C.isCleared(profile,d.day)?'done':''}" style="left:${points[i][0]/9}%;top:${points[i][1]/4.8}%" data-action="day" data-value="${d.day}" aria-label="Day ${d.day}, ${esc(d.title)}, ${C.isCleared(profile,d.day)?'완료':'탐험하기'}" ${d.day===day?'aria-current="true"':''}>${d.day===day?`<span class="map-avatar-pin" aria-hidden="true"><span class="pin-avatar"><img src="assets/profile_${profileId}.png" alt=""></span><span class="pin-tag">${profileId==='aiden'?'Aiden':'Luca'}</span><span class="pin-pointer"></span></span>`:''}${C.isCleared(profile,d.day)?'✓':d.day}<span class="node-label">Day ${d.day}</span></button>`).join('')}</div></div><div class="map-legend"><span><i></i>지금 내 위치</span><span><i class="done-dot"></i>탐험 완료</span><span><i class="wait-dot"></i>기다리는 모험</span></div></div><aside><div class="side-card"><span class="day-tag">오늘의 모험 · DAY ${day}</span><h2>${esc(data().title)}</h2><p class="muted">새로운 단어와 표현 12개</p><ul class="step-list">${[['cards','단어 만나기'],['comic','만화 속으로'],['quiz','단어 맞히기'],['game','놀면서 기억하기']].map(([id,name],i)=>`<li><span class="step-check ${record()[id]?'done':''}">${record()[id]?'✓':i+1}</span>${name}</li>`).join('')}</ul><button class="primary wide" data-action="tab" data-value="cards">모험 시작 ${icon('arrow')}</button></div><div class="side-card tip"><h3>${icon('leaf')} 조금씩, 즐겁게</h3><p>${r.hint}</p><p>한 번에 4단어씩 나눠 해도 좋아요.</p></div></aside></div>`;
  }
  function renderCards(){
    const d=data(),w=d.words[cardIndex],rec=record();rec.seen ||= [];if(!rec.seen.includes(cardIndex)){rec.seen.push(cardIndex);save();}
    const isRevealed=exampleRevealed.has(cardIndex);
    return sessionHeading('새로운 단어를 만나자','큰 소리로 따라 말해 보고, 우리 이야기에도 써 봐요.')+`<div class="learning-layout"><div><article class="word-card"><div class="word-count"><span>단어 ${cardIndex+1} / ${d.words.length}</span><span>${Math.floor(cardIndex/4)+1}번째 작은 묶음 · 4개씩</span></div><div class="word" lang="en-AU">${esc(w.en)}</div><div class="meaning">${esc(w.ko)}</div><div class="sound-row"><button class="primary" data-action="speak-word">${icon('sound')}듣고 따라 하기</button></div><div class="example"><div class="example-en-row"><span class="example-en" lang="en-AU">${esc(w.example)}</span></div><div class="example-ko-wrap"><button class="example-ko-btn ${isRevealed?'revealed':'blinded'}" data-action="toggle-example-ko" aria-expanded="${isRevealed}" aria-label="${isRevealed?'우리말 뜻: '+esc(w.exampleKo)+' (누르면 다시 가려요)':'우리말 뜻 가림 (누르면 뜻이 보여요)'}">${isRevealed?`<span class="example-ko-text">${esc(w.exampleKo)}</span><span class="blind-badge hide">🙈 다시 가리기</span>`:`<span class="blind-badge">💡 뜻 가림</span><span class="blind-prompt">터치해서 우리말 뜻 보기</span>`}</button></div><div class="example-actions"><button data-action="speak-example">${icon('sound')}문장 듣기</button></div></div></article><div class="card-controls"><button data-action="prev-card" ${cardIndex===0?'disabled':''}>← 이전 단어</button><button data-action="next-card" ${cardIndex===d.words.length-1?'disabled':''}>다음 단어 →</button></div></div><aside class="side-card"><h3>오늘 만난 단어</h3><p class="muted">${rec.seen.length} / 12개 확인했어요</p><div class="progress-track"><span style="width:${rec.seen.length/12*100}%"></span></div><div class="word-list">${d.words.map((word,i)=>`<button data-action="card" data-value="${i}" class="${i===cardIndex?'active':''} ${rec.seen.includes(i)?'seen':''}" ${i===cardIndex?'aria-current="true"':''}>${esc(word.en)}</button>`).join('')}</div></aside></div><div class="learning-footer"><span class="note">12개를 모두 만나면 만화로 떠나요.</span><button class="primary" data-action="finish-cards" ${rec.seen.length<12?'disabled':''}>단어 미션 완료 · 만화 보러 가기 ${icon('arrow')}</button></div>`;
  }
  const currentComic=()=>{
    const base=window.COMICS[Math.floor((day-1)/5)];
    if(base && base.daily && base.daily[day]){
      return {
        ...base,
        dailyTitle: base.daily[day].title,
        dailyStory: base.daily[day].story,
        panels: base.daily[day].panels,
        image: base.daily[day].image || `assets/comic-${String(day).padStart(2,'0')}.png`
      };
    }
    return base;
  };
  function renderComic(){
    const c=currentComic();
    const titleText = c.dailyTitle ? `Day ${day} · ${c.dailyTitle}` : c.title;
    const storyText = c.dailyStory ? c.dailyStory : `이야기 ${c.id} · Day ${c.range[0]}–${c.range[1]}에 함께 보는 4컷 만화예요. 오늘 배운 말로 그림을 설명해 봐요.`;
    return sessionHeading('그림 속 이야기를 따라가자','한 컷씩 크게 보고, 말풍선을 눌러 영어 대사를 들어요.')+`<div class="comic-intro"><div class="comic-intro-text"><h2>${esc(titleText)}</h2><p>${esc(storyText)}</p></div><div class="comic-cuts-nav" role="tablist" aria-label="만화 컷 선택">${c.panels.map((_,i)=>`<button class="comic-cut-tab ${i===comicCut?'active':''} ${comicRead.has(i)?'read':''}" data-action="comic-cut" data-value="${i}" role="tab" aria-selected="${i===comicCut}">${i+1}컷 ${comicRead.has(i)?'✓':''}</button>`).join('')}</div></div><div class="comic-stage">${c.panels.map((p,i)=>`<figure class="comic-panel ${i===comicCut?'active':''}"><div class="comic-art cut-${i}"><img src="${esc(c.image)}" alt="${esc(p.alt)}"><span class="cut-number">${i+1} / 4컷</span></div><figcaption class="speech-bubble"><div class="bubble-header"><span class="bubble-tag">${i+1}번째 이야기</span><p class="bubble-sub">말풍선을 누르면 원어민 소리가 나와요</p></div><div class="bubble-body"><button class="bubble-speech-btn" data-action="comic-speak" data-value="${i}" aria-label="${i+1}컷 대사 듣기: ${esc(p.en)}"><span class="sound-icon-box">${icon('sound')}</span><span class="speech-en" lang="en-AU">${esc(p.en)}</span></button><div class="speech-ko-box"><p class="speech-ko">${esc(p.ko)}</p></div></div><div class="panel-bottom-bar"><div class="panel-controls"><button data-action="comic-prev" ${comicCut===0?'disabled':''}>← 이전 컷</button><button data-action="comic-next" ${comicCut===3?'disabled':''}>다음 컷 →</button></div><button class="comic-read-btn ${comicRead.has(i)?'done':''}" data-action="comic-read" data-value="${i}">${comicRead.has(i)?'✓ 이 컷을 읽었어요':'이 컷을 읽었어요'}</button></div></figcaption></figure>`).join('')}</div><div class="learning-footer"><span class="note">${comicRead.size} / 4컷 읽었어요</span><button class="primary" data-action="finish-comic" ${comicRead.size<4?'disabled':''}>만화 미션 완료 · 퀴즈로 ${icon('arrow')}</button></div>`;
  }
  function initQuiz(){quiz={queue:C.shuffle(data().words.map((_,i)=>i)),index:0,choices:[],answered:false,wrong:0};}
  function renderQuiz(){if(!quiz)initQuiz();if(quiz.index===quiz.queue.length)return sessionHeading('모두 찾았어, 멋진 탐험가!','틀린 단어도 다시 도전해서 끝까지 해냈어요.')+result('단어 12개를 모두 맞혔어요!',`다시 도전한 횟수 ${quiz.wrong}번. 이제 게임에서 써 볼까요?`,'game','놀이 마당으로');const w=data().words[quiz.queue[quiz.index]];quiz.choices=C.choices(w,data().words);quiz.answered=false;return sessionHeading('어떤 단어일까?','뜻을 보고 맞는 영어를 골라요. 틀리면 다시 해 보면 돼요.')+`<div class="quiz-card"><div class="word-count"><span>단어 퀴즈</span><span>${quiz.index+1} / 12</span></div><div class="progress-track"><span style="width:${quiz.index/12*100}%"></span></div><h2 class="question">${esc(w.ko)}</h2><div class="choices">${quiz.choices.map((w,i)=>`<button data-action="quiz-answer" data-value="${i}" lang="en-AU">${esc(w.en)}</button>`).join('')}</div><p id="feedback" class="feedback" role="status">차근차근 골라 보세요.</p><div class="quiz-action-row"><button data-action="quiz-hint">${icon('sound')}소리 힌트</button><button id="quiz-next" class="primary" data-action="quiz-next" hidden><span class="quiz-timer-progress" aria-hidden="true"></span><span>다음으로</span><span class="quiz-timer-pill"><strong id="quiz-timer-num">2</strong>초 후 자동</span>${icon('arrow')}</button></div></div>`;}
  function result(title,description,next,label,extra=''){return `<div class="result"><div class="result-mark" aria-hidden="true">✦</div><h2>${title}</h2><p>${description}</p>${C.isCleared(profile,day)?`<p>네 가지 미션 완료! Day ${day}의 탐험 도장이 찍혔어요.</p>`:''}<div class="finish-actions"><button class="primary" data-action="tab" data-value="${next}">${label}</button>${extra}${C.isCleared(profile,day)&&day<50?'<button data-action="next-day">다음 날 탐험 →</button>':''}</div></div>`;}
  function characterSvg(id, state = 'idle') {
    const isA = id === 'aiden';
    const hair = isA ? '#4a2e18' : '#704214';
    const shirt = isA ? '#197564' : '#e65100';
    const pants = isA ? '#2e4d44' : '#455a64';
    const cap = isA ? '#257942' : '#0277bd';
    const capBand = isA ? '#ffd54f' : '#ffb74d';
    const feather = isA ? '#ffb300' : '#e53935';
    const badge = isA ? '#ffd54f' : '#81c784';
    return `<svg class="game-char ${state} char-${id}" viewBox="0 0 64 74" width="56" height="65" aria-hidden="true">
      <defs>
        <radialGradient id="char-shadow-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.32"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="32" cy="70" rx="18" ry="4" fill="url(#char-shadow-grad)" class="char-shadow"/>
      <g class="char-body-group">
        <!-- 다리와 신발 -->
        <g class="char-legs">
          <rect x="22" y="52" width="6" height="12" rx="3" fill="${pants}"/>
          <rect x="36" y="52" width="6" height="12" rx="3" fill="${pants}"/>
          <ellipse cx="23" cy="65" rx="5.5" ry="3.5" fill="#3e2723"/>
          <ellipse cx="41" cy="65" rx="5.5" ry="3.5" fill="#3e2723"/>
          <circle cx="21" cy="64" r="1.2" fill="#d7ccc8"/>
          <circle cx="39" cy="64" r="1.2" fill="#d7ccc8"/>
        </g>
        <!-- 가방 끈 -->
        <path d="M19 36l3 18m23-18l-3 18" stroke="#8d6e63" stroke-width="2.5" stroke-linecap="round"/>
        <!-- 몸통과 옷 -->
        <rect x="18" y="34" width="28" height="22" rx="7" fill="${shirt}"/>
        <!-- 멜빵 -->
        <rect x="22" y="34" width="3.5" height="20" rx="1.5" fill="#ffffff44"/>
        <rect x="38.5" y="34" width="3.5" height="20" rx="1.5" fill="#ffffff44"/>
        <!-- 가슴 탐험 배지 -->
        <circle cx="32" cy="44" r="4" fill="${badge}" stroke="#fff" stroke-width="1.2"/>
        <polygon points="32,41 33.2,43.5 36,43.8 34,45.8 34.5,48.5 32,47.2 29.5,48.5 30,45.8 28,43.8 30.8,43.5" fill="#e65100"/>
        <!-- 팔과 손 -->
        <g class="char-arms">
          <path class="char-arm-l" d="M18 38c-5 4-8 10-6 15" stroke="${shirt}" stroke-width="4.5" stroke-linecap="round" fill="none"/>
          <path class="char-arm-r ${state === 'waving' ? 'waving' : ''}" d="M46 38c5 4 8 10 6 15" stroke="${shirt}" stroke-width="4.5" stroke-linecap="round" fill="none"/>
          <circle cx="12" cy="53" r="3.2" fill="#ffd8c0"/>
          <circle cx="52" cy="53" r="3.2" fill="#ffd8c0" class="char-hand-r"/>
        </g>
        <!-- 머리와 얼굴 -->
        <circle cx="32" cy="22" r="16" fill="#ffd8c0"/>
        <!-- 귀 -->
        <circle cx="16" cy="23" r="3.5" fill="#ffccbc"/>
        <circle cx="48" cy="23" r="3.5" fill="#ffccbc"/>
        <!-- 발그레한 볼터치 -->
        <circle cx="22" cy="26" r="3.5" fill="#ff8a80" opacity="0.65"/>
        <circle cx="42" cy="26" r="3.5" fill="#ff8a80" opacity="0.65"/>
        <!-- 초롱초롱한 눈 -->
        <ellipse cx="26" cy="21" rx="2.8" ry="3.5" fill="#212121"/>
        <ellipse cx="38" cy="21" rx="2.8" ry="3.5" fill="#212121"/>
        <circle cx="25" cy="19.5" r="1.2" fill="#ffffff"/>
        <circle cx="37" cy="19.5" r="1.2" fill="#ffffff"/>
        <circle cx="27" cy="22.5" r="0.6" fill="#ffffff"/>
        <circle cx="39" cy="22.5" r="0.6" fill="#ffffff"/>
        <!-- 웃는 입 -->
        <path d="M28 27q4 4 8 0" stroke="#bf360c" stroke-width="2.2" stroke-linecap="round" fill="none"/>
        <!-- 머리카락 -->
        <path d="M17 19c-1-10 8-15 15-15s16 5 15 15c-3-5-6-7-12-7-5 0-9 2-12 5-2-3-4-5-6-8z" fill="${hair}"/>
        <!-- 탐험가 모자 -->
        <path d="M16 14c3-9 12-11 22-9 6 1 10 6 10 9z" fill="${cap}"/>
        <path d="M13 15q19-5 38 0" stroke="${cap}" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <path d="M16 13q16-4 32 0" stroke="${capBand}" stroke-width="2" fill="none"/>
        <!-- 모자 깃털 장식 -->
        <path d="M42 12c4-8 12-11 14-8s-5 9-14 9z" fill="${feather}"/>
      </g>
    </svg>`;
  }

  function treasureChestSvg(isOpen = false) {
    return `<svg class="treasure-chest-svg ${isOpen ? 'open' : ''}" viewBox="0 0 68 58" width="62" height="52" aria-hidden="true">
      <ellipse cx="34" cy="54" rx="26" ry="4" fill="#00000030"/>
      <!-- 상자 본체 -->
      <path d="M8 26h52v24a5 5 0 0 1-5 5H13a5 5 0 0 1-5-5Z" fill="#8d5524" stroke="#4a2c10" stroke-width="3"/>
      <!-- 가죽/골드 스트랩 -->
      <rect x="16" y="26" width="6" height="28" fill="#e5a93b" stroke="#7a4f0d" stroke-width="1.5"/>
      <rect x="46" y="26" width="6" height="28" fill="#e5a93b" stroke="#7a4f0d" stroke-width="1.5"/>
      ${isOpen ? `
        <!-- 눈부신 보물 대폭발 -->
        <g class="gold-burst">
          <circle cx="34" cy="20" r="16" fill="radial-gradient(circle,#fff59d,#ffb300)" opacity="0.6"/>
          <!-- 황금 코인들 -->
          <circle cx="24" cy="20" r="5" fill="#ffd700" stroke="#b8860b" stroke-width="1.5" class="chest-coin c1"/>
          <circle cx="34" cy="16" r="6" fill="#ffe082" stroke="#b8860b" stroke-width="1.5" class="chest-coin c2"/>
          <circle cx="44" cy="20" r="5" fill="#ffd700" stroke="#b8860b" stroke-width="1.5" class="chest-coin c3"/>
          <!-- 알록달록 보석들 -->
          <polygon points="34,8 39,16 29,16" fill="#e91e63" stroke="#880e4f" stroke-width="1" class="chest-gem g1"/>
          <polygon points="21,12 26,18 17,18" fill="#00e676" stroke="#1b5e20" stroke-width="1" class="chest-gem g2"/>
          <polygon points="47,11 52,17 43,17" fill="#00e5ff" stroke="#006064" stroke-width="1" class="chest-gem g3"/>
          <polygon points="34,2 36,7 32,7" fill="#ab47bc" class="chest-gem g4"/>
          <!-- 반짝이는 별빛들 -->
          <path d="M34 0l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="#ffffff" class="chest-sparkle sp1"/>
          <path d="M14 6l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#fff59d" class="chest-sparkle sp2"/>
          <path d="M54 5l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#fff59d" class="chest-sparkle sp3"/>
        </g>
        <!-- 활짝 열린 뚜껑 -->
        <path d="M6 26L16 6h36l10 20Z" fill="#aa6c35" stroke="#4a2c10" stroke-width="3" class="chest-lid open"/>
      ` : `
        <!-- 닫힌 뚜껑 -->
        <path d="M5 26C5 15 18 9 34 9s29 6 29 17Z" fill="#a4652f" stroke="#4a2c10" stroke-width="3" class="chest-lid"/>
        <!-- 황금 자물쇠 -->
        <rect x="29" y="22" width="10" height="12" rx="3" fill="#ffd54f" stroke="#b27f00" stroke-width="1.8"/>
        <circle cx="34" cy="27" r="2" fill="#3e2723"/>
        <path d="M34 29v3" stroke="#3e2723" stroke-width="1.8"/>
      `}
    </svg>`;
  }

  function trainEngineSvg(id) {
    const isA = id === 'aiden';
    const driverCap = isA ? '#197564' : '#d97706';
    return `<svg class="steam-engine" viewBox="0 0 95 64" width="95" height="64" aria-hidden="true">
      <g class="steam-group">
        <circle cx="22" cy="7" r="4.5" fill="#ffffffcc" class="puff puff-1"/>
        <circle cx="16" cy="-1" r="6" fill="#ffffff99" class="puff puff-2"/>
        <circle cx="9" cy="-9" r="7.5" fill="#ffffff66" class="puff puff-3"/>
      </g>
      <path d="M2 56L14 44v12Z" fill="#90a4ae" stroke="#37474f" stroke-width="2"/>
      <rect x="0" y="28" width="6" height="10" rx="2" fill="#ffd54f" stroke="#e65100" stroke-width="1.5"/>
      <rect x="5" y="24" width="55" height="26" rx="4" fill="#3b6ea5" stroke="#234267" stroke-width="2.5"/>
      <path d="M20 24v26M38 24v26" stroke="#5d8ebf" stroke-width="2.5"/>
      <rect x="18" y="10" width="10" height="15" fill="#263238" rx="1"/>
      <ellipse cx="23" cy="10" rx="7" ry="2.5" fill="#f57c00"/>
      <ellipse cx="45" cy="23" rx="6" ry="4" fill="#f57c00"/>
      <rect x="56" y="12" width="36" height="38" rx="4" fill="#2d527c" stroke="#1d3753" stroke-width="2.5"/>
      <path d="M53 12h42l-3-4H56Z" fill="#d32f2f"/>
      <rect x="62" y="16" width="22" height="18" rx="3" fill="#e1f5fe" stroke="#1d3753" stroke-width="2"/>
      <g transform="translate(64 18) scale(0.42)">
        <circle cx="18" cy="14" r="10" fill="#ffd8c0"/>
        <circle cx="16" cy="13" r="1.5" fill="#222"/><circle cx="22" cy="13" r="1.5" fill="#222"/>
        <path d="M17 18q2 2 4 0" stroke="#a74a38" stroke-width="1.5" fill="none"/>
        <path d="M9 9c1-5 8-7 14-4 3 2 4 4 4 6z" fill="${driverCap}"/>
        <g class="conductor-hand">
          <path d="M25 18q6 -8 8 -2" stroke="#ffd8c0" stroke-width="3" stroke-linecap="round"/>
          <circle cx="34" cy="16" r="3" fill="#ffb300"/>
        </g>
      </g>
      <rect x="2" y="48" width="91" height="6" rx="2" fill="#263238"/>
      <g class="wheel-group">
        <g class="wheel spin" transform="translate(18 52)"><circle r="8.5" fill="#cfd8dc" stroke="#263238" stroke-width="2.5"/><circle r="3" fill="#d32f2f"/></g>
        <g class="wheel spin" transform="translate(42 52)"><circle r="8.5" fill="#cfd8dc" stroke="#263238" stroke-width="2.5"/><circle r="3" fill="#d32f2f"/></g>
        <g class="wheel spin" transform="translate(74 50)"><circle r="10.5" fill="#eceff1" stroke="#263238" stroke-width="3"/><circle r="4" fill="#f57c00"/></g>
        <line x1="18" y1="55" x2="42" y2="55" stroke="#37474f" stroke-width="3" stroke-linecap="round" class="side-rod"/>
      </g>
    </svg>`;
  }

  function deliveryVanSvg(id) {
    const isA = id === 'aiden';
    const driverCap = isA ? '#197564' : '#e65100';
    return `<svg class="delivery-van-svg" viewBox="0 0 96 64" width="96" height="64" aria-hidden="true">
      <g class="exhaust-group">
        <circle cx="-6" cy="46" r="3" fill="#b0bec599" class="exhaust ep-1"/>
        <circle cx="-14" cy="43" r="5" fill="#b0bec566" class="exhaust ep-2"/>
      </g>
      <g class="van-chassis">
        <rect x="4" y="16" width="54" height="34" rx="6" fill="#f39c12" stroke="#b9770e" stroke-width="2.5"/>
        <line x1="30" y1="16" x2="30" y2="50" stroke="#b9770e" stroke-width="2"/>
        <g transform="translate(20 28) scale(0.85)">
          <rect width="18" height="12" rx="2" fill="#fff" stroke="#d35400" stroke-width="1.5"/>
          <path d="M0 0l9 7 9-7" fill="none" stroke="#d35400" stroke-width="1.5"/>
        </g>
        <rect x="8" y="20" width="12" height="9" rx="1.5" fill="#d7ccc8" stroke="#8d6e63" stroke-width="1"/>
        <path d="M57 26h22l8 12v12H57Z" fill="#e67e22" stroke="#af5d12" stroke-width="2.5"/>
        <polygon points="62,28 77,28 83,38 62,38" fill="#e1f5fe" stroke="#af5d12" stroke-width="1.8"/>
        <g transform="translate(64 28) scale(0.38)">
          <circle cx="16" cy="14" r="10" fill="#ffd8c0"/>
          <circle cx="19" cy="14" r="1.8" fill="#222"/>
          <circle cx="14" cy="17" r="2.5" fill="#ff8a80" opacity="0.6"/>
          <path d="M8 8c1-5 8-7 14-4 3 2 4 4 4 6z" fill="${driverCap}"/>
          <circle cx="28" cy="22" r="5" fill="none" stroke="#333" stroke-width="3"/>
          <circle cx="25" cy="20" r="2" fill="#ffd8c0"/>
        </g>
        <path d="M86 42h4v7h-4z" fill="#fff9c4" stroke="#fbc02d" stroke-width="1.5"/>
        <rect x="84" y="48" width="9" height="5" rx="2" fill="#78909c"/>
        <rect x="0" y="48" width="6" height="5" rx="1.5" fill="#78909c"/>
      </g>
      <g class="van-wheel-group">
        <g class="wheel spin" transform="translate(24 50)"><circle r="8.5" fill="#37474f" stroke="#212121" stroke-width="2.5"/><circle r="4" fill="#eceff1"/><circle r="1.5" fill="#d32f2f"/></g>
        <g class="wheel spin" transform="translate(72 50)"><circle r="8.5" fill="#37474f" stroke="#212121" stroke-width="2.5"/><circle r="4" fill="#eceff1"/><circle r="1.5" fill="#d32f2f"/></g>
      </g>
    </svg>`;
  }

  function renderGameMenu(){
    const name = profileId === 'aiden' ? 'Aiden' : 'Luca';
    const previews = {
      treasure: `<span class="game-preview preview-treasure">${treasureChestSvg(true)}</span>`,
      train: `<span class="game-preview preview-train">${trainEngineSvg(profileId)}</span>`,
      delivery: `<span class="game-preview preview-delivery">${deliveryVanSvg(profileId)}</span>`
    };
    return sessionHeading('오늘은 어떤 놀이를 할까?','원하는 게임 하나를 끝내면 오늘의 게임 미션 완료!')+`
      <div class="game-menu-banner">
        <div class="banner-char">${characterSvg(profileId, 'waving')}</div>
        <div class="banner-speech">
          <h2>${name}, 신나는 영어 놀이터에 온 걸 환영해!</h2>
          <p>단어를 맞혀 보물을 찾고, 기차를 달리고, 소포를 배달해 봐요.</p>
        </div>
      </div>
      <div class="game-menu">${[['treasure','chest','보물길 탐험','단어를 맞혀 길을 열고, 섬 끝의 보물상자를 찾아요.','6개의 징검다리'],['train','train','문장 기차','흩어진 말을 순서대로 연결해서 기차를 출발시켜요.','오늘의 예문 3개'],['delivery','van','듣고 배달하기','영어 소리를 듣고, 맞는 우편함에 소포를 배달해요.','6번의 배달']].map(([id,ico,title,desc,n])=>`<button class="game-option" data-action="start-game" data-value="${id}">${previews[id]}<span class="game-description"><h2>${title}</h2><p>${desc}</p><p class="note">${n} · 시간제한 없이</p><span class="play-label">놀이 시작 →</span></span></button>`).join('')}</div><p class="note">어떤 놀이든 여러 번 할 수 있어요. 별은 미션마다 한 번만 받아요.</p>`;
  }

  const HEART_MAX = 3, FORK_STEPS = [1, 3];
  function comboLabel(streak){
    const words = {2:'🔥 2콤보!', 3:'🔥 3콤보! 불붙었어요', 4:'⚡ 4콤보! 굉장해요', 5:'🌈 5콤보! 최고예요'};
    return streak >= 6 ? `🌟 ${streak}콤보! 전설이에요` : (words[streak] || '');
  }
  function gameHud(){
    if(!game)return '';
    const hearts=Array.from({length:HEART_MAX},(_,i)=>`<span class="heart ${i<game.hearts?'':'lost'}">${i<game.hearts?'❤️':'🤍'}</span>`).join('');
    const extra=game.mode==='treasure'?`<span class="coin-pill">🪙 <b>${game.coins}</b></span>`
      :game.mode==='delivery'?`<span class="coin-pill express">⚡ 속달 <b>${game.express}</b></span>`
      :`<span class="coin-pill train">🚃 <b>${game.index+(game.answered?1:0)}</b>대 완성</span>`;
    return `<span class="heart-row" aria-label="남은 하트 ${game.hearts}개">${hearts}</span>${extra}<span class="combo-pill ${game.streak>=2?'on':''}">${game.streak>=2?comboLabel(game.streak):'콤보를 쌓아 봐요'}</span>`;
  }
  function refreshHud(pop=false){
    const el=$('game-hud');if(!el)return;
    el.innerHTML=gameHud();
    if(pop)el.querySelector('.combo-pill')?.classList.add('pop');
  }
  function loseHeart(message){
    if(!game)return;
    game.wrong++;game.streak=0;game.hearts--;
    chime('oops');
    if(game.hearts<=0){
      game.hearts=HEART_MAX;game.helps++;
      feedback('괜찮아요! 하트를 다시 채웠어요. 소리를 듣고 한 번 더 해 봐요.',true);
      const w=data().words[game.queue[game.index]];
      speak(game.mode==='train'?w.example:w.en);
    } else feedback(message,true);
    refreshHud();
  }
  function clearAutoAdvance(){if(game?.autoTimer){clearTimeout(game.autoTimer);game.autoTimer=null;}}
  function scheduleAdvance(delay){
    clearAutoAdvance();
    // 마지막 미션은 별 축하 연출을 끝까지 보여 주고, 아이가 직접 넘어가게 둬요
    if(!game||game.index+1>=game.queue.length)return;
    game.autoTimer=setTimeout(()=>{if(game)game.autoTimer=null;advanceGame();},delay);
  }
  function advanceGame(){
    if(!game||!game.answered||game.fork)return;
    clearAutoAdvance();
    game.index++;
    if(game.index===game.queue.length)mark('game');
    render();
    if(game.mode==='delivery'&&game.index<game.queue.length)speak(data().words[game.queue[game.index]].en);
  }
  function startGame(mode){
    if(!['treasure','train','delivery'].includes(mode))return;
    clearAutoAdvance();
    game={mode,queue:C.shuffle(data().words.map((_,i)=>i)).slice(0,mode==='train'?3:6),index:0,answered:false,choices:[],tokens:[],selected:[],wrong:0,
      streak:0,bestStreak:0,hearts:HEART_MAX,coins:0,express:0,helps:0,fork:null,autoTimer:null};
    render();
    if(mode==='delivery')speak(data().words[game.queue[0]].en);
  }

  function renderGame(){
    if(!game)return renderGameMenu();
    const titles={treasure:'보물길 탐험',train:'문장 기차',delivery:'듣고 배달하기'};
    if(game.index===game.queue.length){
      const tail=`최고 콤보 ${game.bestStreak}연속 · 다시 도전 ${game.wrong}번.`;
      const summary=game.mode==='treasure'?`🪙 금화를 ${game.coins}개나 모았어요! ${tail}`
        :game.mode==='delivery'?`⚡ 속달 배달 ${game.express} / ${game.queue.length}건! ${tail}`
        :`🚂 기차 ${game.queue.length}대를 완성했어요! ${tail}`;
      return sessionHeading(titles[game.mode],'끝까지 해낸 너에게 탐험 도장을!')+result(game.mode==='treasure'?'보물상자를 찾았어요!':game.mode==='train'?'문장 기차가 모두 도착했어요!':'소포를 모두 배달했어요!',summary,'map','탐험 지도로',`<button data-action="start-game" data-value="${game.mode}">한 번 더 놀기 ↻</button>`);
    }
    const w=data().words[game.queue[game.index]];game.answered=false;game.fork=null;
    if(game.mode==='delivery')game.helps=0;
    let content='';
    if(game.mode==='train'){
      const tokens=w.example.trim().split(/\s+/);game.tokens=C.shuffle(tokens.map((text,id)=>({text,id})));game.selected=[];
      content=`<div class="game-prompt"><p>이 뜻이 되도록 말을 연결해요.</p><h2 class="question">${esc(w.exampleKo)}</h2><button data-action="game-listen">${icon('sound')}문장 듣기</button></div><div id="train-track" class="train-track" aria-label="내가 만든 문장"><div class="engine-wrap">${trainEngineSvg(profileId)}</div><span class="train-empty-hint">여기에 기차를 연결해요</span></div><div id="train-bank" class="train-bank">${game.tokens.map((token,i)=>`<button class="train-token" data-action="train-token" data-value="${i}" lang="en-AU">${esc(token.text)}</button>`).join('')}</div><div class="train-actions"><button data-action="train-undo">한 칸 되돌리기</button><button class="primary" data-action="train-check">기차 출발!</button></div>`;
    } else {
      game.choices=C.choices(w,data().words,game.mode==='delivery'?3:4);
      const prompt=game.mode==='delivery'?`<p>소리를 듣고 우편함을 골라요. <b>다시 듣기 없이</b> 맞히면 ⚡속달 배달!</p><button class="primary" data-action="game-listen">${icon('sound')}다시 듣기</button><button data-action="game-meaning">뜻 힌트</button><p id="meaning-hint" hidden>${esc(w.ko)}</p>`:`<p>이 뜻의 단어를 골라 길을 열어요. 연속으로 맞히면 금화가 쑥쑥!</p><h2 class="question">${esc(w.ko)}</h2>`;
      const scene=game.mode==='treasure'
        ? `<div class="treasure-river-track" aria-label="보물까지 ${6-game.index}걸음">
            <div class="river-decor">
              <span class="river-flower f1">🌸</span>
              <span class="river-wave w1"></span>
              <span class="river-wave w2"></span>
              <span class="river-flower f2">🍀</span>
            </div>
            <div class="game-path">${Array.from({length:7},(_,i)=>`<span class="game-stop ${i<game.index?'arrived':''} ${i===game.index?'here':''} ${i===6?'chest-stop':''}">${i===6?`<div class="chest-anchor">${treasureChestSvg(game.index===6)}</div>`:i<game.index?'✓':i===game.index?`<div class="char-on-stop">${characterSvg(profileId,'standing')}<span class="jump-bubble">★ 정답!</span></div><span class="stone-num">${i+1}</span>`:`<span class="stone-num">${i+1}</span>`}</span>`).join('')}</div>
          </div>`
        : `<div class="delivery-route" aria-label="${game.index}개 배달 완료"><div class="delivery-road-line"></div><span class="delivery-cart" style="left:${game.index/6*82}%">${deliveryVanSvg(profileId)}</span><div class="flying-parcel" hidden>📦</div></div>`;
      content=scene+`<div class="game-prompt">${prompt}</div><div class="${game.mode==='delivery'?'mailboxes':'choices'}">${game.choices.map((w,i)=>`<button data-action="game-answer" data-value="${i}" lang="en-AU">${esc(w.en)}</button>`).join('')}</div>`;
    }
    return sessionHeading(titles[game.mode],game.mode==='train'?'말을 하나씩 누르면 기차에 연결돼요.':'틀려도 괜찮아요. 다시 골라 길을 이어 가요.')+`<div class="game-top"><h2>${game.index+1} / ${game.queue.length} 미션</h2><div id="game-hud" class="game-hud">${gameHud()}</div><button data-action="game-menu">다른 놀이 고르기</button></div><div class="game-stage ${game.mode}-stage">${content}<p id="feedback" class="feedback" role="status"></p><div class="train-actions"><button id="game-next" class="primary" data-action="game-next" hidden>다음 미션으로 ${icon('arrow')}</button></div></div>`;
  }
  function renderRewards(){return `<div class="lead"><div><div class="eyebrow">MY LITTLE ADVENTURE</div><h1>내가 모은 탐험 배지</h1><p>네 가지 미션을 끝내면 하루의 탐험이 완성돼요.</p></div><div class="journey-count">★ <strong>${profile.stars}</strong>개</div></div><div class="badges">${regions.map((r,i)=>{const n=days.slice(i*10,i*10+10).filter(d=>C.isCleared(profile,d.day)).length;return `<article class="badge ${n===10?'unlocked':'locked'}"><div class="badge-symbol" aria-hidden="true">${n===10?'✦':'◇'}</div><h2>${r.name}</h2><p>${n} / 10일 완료</p><p>${n===10?'탐험 배지를 받았어요!':'열 번의 모험이 기다려요'}</p></article>`;}).join('')}</div><div class="learning-footer"><p class="note">미션당 별 1개, 하루 완주 보너스 별 3개.<br>Aiden과 Luca의 기록은 따로 저장돼요.</p><button class="primary" data-action="tab" data-value="map">탐험 이어 하기</button></div>`;}
  function render(){const restoreFocus=$('main').contains(document.activeElement);nav();updateHeader();$('main').innerHTML=({map:renderMap,cards:renderCards,comic:renderComic,quiz:renderQuiz,game:renderGame,rewards:renderRewards}[tab])();if(tab==='map')fitMap();if(restoreFocus)$('main').focus({preventScroll:true});}
  function feedback(message,error=false){const el=$('feedback');if(el){el.textContent=message;el.classList.toggle('error',error);}}
  function gameSuccess(){
    game.answered=true;
    game.streak++;
    if(game.streak>game.bestStreak)game.bestStreak=game.streak;
    if(game.mode==='treasure')game.coins+=3+Math.max(0,game.streak-1)*2;
    const express=game.mode==='delivery'&&game.helps===0;
    if(express)game.express++;
    if(game.index+1===game.queue.length) mark('game');
    if(game.mode==='train'){
      chime('train-whistle');
      feedback('칙칙폭폭! 문장 기차 출발!');
      burstConfetti(window.innerWidth*0.5, window.innerHeight*0.38, 45);
      $('train-track').classList.add('departing');
    } else if(game.mode==='delivery'){
      chime('delivery-horn');
      feedback(express?'⚡ 속달 배달 성공! 한 번에 알아들었어요!':'빵빵! 소포를 우편함에 배달했어요!');
      burstConfetti(window.innerWidth*0.5, window.innerHeight*0.4, 35);
      document.querySelector('.delivery-cart').style.left=`${(game.index+1)/6*82}%`;
      const btn=document.querySelector('.mailboxes button.correct');
      if(btn) {
        btn.classList.add('mailbox-delivered');
        const parcel=document.querySelector('.flying-parcel');
        if(parcel) {
          parcel.hidden=false;
          parcel.classList.add('parachuting');
        }
      }
    } else if(game.mode==='treasure'){
      chime('hop');
      burstConfetti(window.innerWidth*0.5, window.innerHeight*0.32, 40);
      feedback(game.index+1===6?'만세! 반짝이는 보물상자를 찾았어요!':'폴짝! 맞았어요! 다음 징검다리로 가요.');
      const curChar = document.querySelector('.char-on-stop');
      if(curChar) {
        curChar.classList.add('char-celebrating');
        const bubble = curChar.querySelector('.jump-bubble');
        if(bubble) {
          const praises = ['★ 딩동댕!', '★ 완벽해요!', '★ 슈퍼 점프!', '★ 대단해요!', '★ 멋져요!'];
          bubble.textContent = praises[game.index % praises.length];
          bubble.classList.add('pop');
        }
      }
      const stops=document.querySelectorAll('.game-stop');
      stops[game.index].classList.remove('here');
      stops[game.index].classList.add('arrived');
      if(stops[game.index+1]){
        stops[game.index+1].classList.add('here');
        stops[game.index+1].classList.add('stone-landing');
      }
      if(game.index+1===6){
        chime('bonus-slam');
        launchConfetti(true);
      }
    } else {
      chime();
      feedback('맞았어요! 다음 목적지로 가요.');
    }
    document.querySelectorAll('[data-action="game-answer"],[data-action="train-token"],[data-action="train-check"],[data-action="train-undo"]').forEach(b=>b.disabled=true);
    if(game.streak>=2){
      const streak=game.streak, label=comboLabel(streak);
      setTimeout(()=>chime('combo',streak-2),220);
      setTimeout(()=>{const el=$('feedback');if(el&&game?.answered)el.textContent=`${el.textContent} ${label}`;},260);
    }
    refreshHud(game.streak>=2);
    const fork=game.mode==='treasure'&&FORK_STEPS.includes(game.index);
    if(fork){game.fork={a:5+Math.floor(Math.random()*10),b:5+Math.floor(Math.random()*10)};showFork();}
    $('game-next').hidden=fork;
    if(!fork){
      $('game-next').focus({preventScroll:true});
      scheduleAdvance(game.mode==='train'?2000:1500);
    }
  }
  function showFork(){
    const stage=document.querySelector('.game-stage');if(!stage)return;
    const box=document.createElement('div');
    box.className='fork-choice';
    box.innerHTML=`<p>보물 갈림길! 상자 하나를 골라 봐요 🎁</p><div class="fork-row"><button data-action="fork" data-value="a">${treasureChestSvg(false)}</button><button data-action="fork" data-value="b">${treasureChestSvg(false)}</button></div>`;
    stage.appendChild(box);
  }
  function updateTrain(){
    const chosen=game.selected.map(i=>game.tokens[i]);
    const engine=`<div class="engine-wrap">${trainEngineSvg(profileId)}</div>`;
    const wagons=chosen.length
      ? chosen.map(t=>`<div class="train-wagon" lang="en-AU"><span class="wagon-coupler"></span><span class="wagon-box">${esc(t.text)}</span><div class="wagon-wheels"><span class="w-wheel"></span><span class="w-wheel"></span></div></div>`).join('')
      : '<span class="train-empty-hint">여기에 기차를 연결해요</span>';
    $('train-track').innerHTML=engine+wagons;
    document.querySelectorAll('[data-action="train-token"]').forEach(b=>b.disabled=game.selected.includes(Number(b.dataset.value)));
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('button[data-action]');if(!button||button.disabled)return;
    const a=button.dataset.action,v=button.dataset.value,n=Number(v);
    if(a==='profile'&&Object.hasOwn(profiles,v))return switchProfile(v);
    if(a==='tab')return navigate(v);
    if(a==='fullscreen'){
      if(!document.fullscreenElement) document.documentElement.requestFullscreen().catch(()=>{});
      else document.exitFullscreen().catch(()=>{});
      return;
    }
    if(a==='settings'){dismissReset();$('reset-status').textContent='';if(typeof $('settings').showModal==='function')$('settings').showModal();else $('settings').setAttribute('open','');return;}
    if(a==='reset-profile'&&Object.hasOwn(profiles,v)){
      pendingReset=v;
      $('reset-status').textContent='';
      const name=v==='aiden'?'Aiden':'Luca';
      $('reset-message').textContent=`${name}의 모든 진도·별·배지를 지울까요? 지운 기록은 되돌릴 수 없으며 다른 아이의 기록은 유지돼요.`;
      document.querySelector('[data-action="reset-confirm"]').textContent=`${name} 기록 지우기`;
      $('reset-confirmation').hidden=false;
      document.querySelector('[data-action="reset-cancel"]').focus();
      return;
    }
    if(a==='reset-cancel'){const id=pendingReset;dismissReset();document.querySelector(`[data-action="reset-profile"][data-value="${id}"]`)?.focus();return;}
    if(a==='reset-confirm')return resetProfile();
    if(a==='region'){region=n;render();return;}
    if(a==='day')return setDay(n);
    if(a==='next-day')return setDay(day+1);
    if(a==='prev-card'||a==='next-card'||a==='card'){cancelSpeech();cardIndex=a==='card'?n:cardIndex+(a==='next-card'?1:-1);cardIndex=Math.max(0,Math.min(11,cardIndex));render();return;}
    if(a==='speak-word'){const w=data().words[cardIndex];return speak(w.en,w.ko);}
    if(a==='toggle-example-ko'){if(exampleRevealed.has(cardIndex))exampleRevealed.delete(cardIndex);else{exampleRevealed.add(cardIndex);chime('ding');}render();document.querySelector('.example-ko-btn')?.focus({preventScroll:true});return;}
    if(a==='speak-example')return speak(data().words[cardIndex].example);
    if(a==='finish-cards'&&record().seen.length===12){mark('cards');return navigate('comic');}
    if(a==='comic-cut'){cancelSpeech();comicCut=n;render();return;}
    if(a==='comic-prev'){cancelSpeech();comicCut=Math.max(0,comicCut-1);render();return;}
    if(a==='comic-next'){cancelSpeech();comicCut=Math.min(3,comicCut+1);render();return;}
    if(a==='comic-speak'){const p=currentComic().panels[n];speak(p.en);comicRead.add(n);render();return;}
    if(a==='comic-read'){comicRead.add(n);chime('ding');if(comicCut<3)comicCut=n+1;render();return;}
    if(a==='finish-comic'&&comicRead.size===4){mark('comic');return navigate('quiz');}
    if(a==='quiz-hint'&&quiz)return speak(data().words[quiz.queue[quiz.index]].en);
    if(a==='quiz-answer'&&quiz&&!quiz.answered){const w=data().words[quiz.queue[quiz.index]];if(quiz.choices[n].en===w.en){quiz.answered=true;button.classList.add('correct');chime();feedback(`맞았어요! ${w.en} · ${w.ko}`);document.querySelectorAll('[data-action="quiz-answer"]').forEach(b=>b.disabled=true);if(quiz.index+1===12)mark('quiz');$('quiz-next').hidden=false;$('quiz-next').focus({preventScroll:true});clearTimeout(quizAutoTimer);clearInterval(quizCountdownInterval);let secLeft=2;const timerNum=$('quiz-timer-num');if(timerNum)timerNum.textContent='2';const prog=document.querySelector('.quiz-timer-progress');if(prog){prog.style.animation='none';void prog.offsetWidth;prog.style.animation='quizTimerShrink 2s linear forwards';}quizCountdownInterval=setInterval(()=>{secLeft--;const el=$('quiz-timer-num');if(el)el.textContent=String(Math.max(1,secLeft));if(secLeft<=0)clearInterval(quizCountdownInterval);},1000);quizAutoTimer=setTimeout(()=>{clearInterval(quizCountdownInterval);if(tab==='quiz'&&quiz?.answered)advanceQuiz();},2000);}else{quiz.wrong++;button.classList.add('wrong');button.disabled=true;feedback('다시 골라 볼까요? 소리 힌트도 들을 수 있어요.',true);}return;}
    if(a==='quiz-next'&&quiz?.answered){advanceQuiz();return;}
    if(a==='start-game')return startGame(v);
    if(a==='game-menu'){clearAutoAdvance();cancelSpeech();game=null;render();return;}
    if(a==='game-listen'&&game){const w=data().words[game.queue[game.index]];if(game.mode==='delivery'&&!game.answered)game.helps++;return speak(game.mode==='train'?w.example:w.en);}
    if(a==='game-meaning'&&game){if(!game.answered)game.helps++;$('meaning-hint').hidden=false;return;}
    if(a==='fork'&&game?.fork){
      const gain=game.fork[v]||0;game.coins+=gain;game.fork=null;
      chime('coin');
      button.innerHTML=treasureChestSvg(true);
      button.classList.add('fork-open');
      document.querySelectorAll('[data-action="fork"]').forEach(b=>b.disabled=true);
      const rect=button.getBoundingClientRect();
      burstConfetti(rect.left+rect.width/2,rect.top+rect.height/2,30,['#ffd700','#ffe082','#fff59d']);
      const caption=document.querySelector('.fork-choice p');
      if(caption)caption.textContent=`🪙 금화 ${gain}개를 찾았어요!`;
      refreshHud();
      setTimeout(()=>{document.querySelector('.fork-choice')?.remove();if(game?.answered)$('game-next').hidden=false;},1300);
      scheduleAdvance(2200);
      return;
    }
    if(a==='game-answer'&&game&&!game.answered){const w=data().words[game.queue[game.index]];if(game.choices[n].en===w.en){button.classList.add('correct');gameSuccess();}else{button.classList.add('wrong');setTimeout(()=>button.classList.remove('wrong'),520);loseHeart(game.mode==='delivery'?'그 우편함이 아니에요. 소리를 한 번 더 듣고 골라 봐요!':'아직 그 단어는 아니에요. 한 번 더 도전!');}return;}
    if(a==='train-token'&&game?.mode==='train'&&!game.answered&&!game.selected.includes(n)){game.selected.push(n);chime('snap',game.selected.length-1);updateTrain();return;}
    if(a==='train-undo'&&game?.mode==='train'&&!game.answered){game.selected.pop();chime('ding');updateTrain();return;}
    if(a==='train-check'&&game?.mode==='train'&&!game.answered){
      const sentence=game.selected.map(i=>game.tokens[i].text).join(' '),target=data().words[game.queue[game.index]].example.trim().replace(/\s+/g,' ');
      if(sentence===target)gameSuccess();
      else{
        loseHeart('덜컹! 마지막 칸이 떨어졌어요. 문장을 듣고 다시 연결해 봐요.');
        const wagons=document.querySelectorAll('.train-wagon'),last=wagons[wagons.length-1];
        game.selected.pop();
        if(last){last.classList.add('wagon-drop');setTimeout(()=>{if(game?.mode==='train'&&!game.answered)updateTrain();},380);}
        else updateTrain();
      }
      return;
    }
    if(a==='game-next'&&game?.answered){advanceGame();return;}
  });
  $('ko-speech').addEventListener('change',e=>{koreanSpeech=e.target.checked;});
  $('speech-rate').addEventListener('change',e=>{rate=Number(e.target.value);});
  $('text-size').addEventListener('change',e=>{document.documentElement.classList.toggle('text-large',e.target.value==='large');fitMap();});
  window.addEventListener('pagehide',cancelSpeech);
  render();if(!storageOK)showStorageNotice();
})();
