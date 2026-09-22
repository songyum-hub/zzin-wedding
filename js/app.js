(function () {
  const C = window.CONFIG;
  const WEDDING_DATE = new Date(C.weddingDateISO);

  // ---------- toast ----------
  function showToast(msg) {
    const root = document.getElementById('toast-root');
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    root.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 250);
    }, 2200);
  }

  // ---------- optional asset loader (film frame / asterisk / paper texture) ----------
  function tryLoadAsset(id, src) {
    const el = document.getElementById(id);
    if (!el || !src) return;
    const img = new Image();
    img.onload = () => { el.src = src; el.style.display = ''; };
    img.onerror = () => { el.style.display = 'none'; };
    img.src = src;
  }
  tryLoadAsset('paper-bg', C.images.paperTexture);
  tryLoadAsset('film-frame-img', C.images.filmFrame);
  tryLoadAsset('asterisk-img', C.images.asterisk);
  document.getElementById('asterisk-img').addEventListener('load', () => {
    document.getElementById('asterisk-fallback').style.display = 'none';
  });

  // ---------- image slot placeholders ----------
  function imagePlusSVG() {
    return '<svg viewBox="0 0 24 24" class="size-5 text-primary" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/><path d="M16 5h4M18 3v4"/></svg>';
  }
  function renderImageSlot(container, src, label, file) {
    container.classList.add('overflow-hidden');
    const showPlaceholder = () => {
      container.innerHTML =
        '<div class="grid h-full w-full place-items-center border border-dashed border-foreground/20 bg-secondary/50 text-center p-2">' +
          '<div class="flex flex-col items-center gap-1">' +
            imagePlusSVG() +
            '<span class="font-mono text-[10px]">' + label + '</span>' +
            '<span class="text-[9px] text-muted-foreground">' + file + '</span>' +
          '</div>' +
        '</div>';
    };
    if (!C.photosReady) { showPlaceholder(); return; }
    const img = new Image();
    img.onload = () => {
      container.innerHTML = '';
      img.className = 'w-full h-full object-cover no-filter';
      container.appendChild(img);
    };
    img.onerror = showPlaceholder;
    img.src = src;
  }
  document.querySelectorAll('[data-image-slot]').forEach(container => {
    const key = container.dataset.imageSlot;
    const label = container.dataset.label;
    if (key === 'hero') renderImageSlot(container, C.images.hero, label, C.images.hero.split('/').pop());
    if (key === 'middle') renderImageSlot(container, C.images.middle, label, C.images.middle.split('/').pop());
    if (key === 'map') renderImageSlot(container, C.images.map, label, C.images.map.split('/').pop());
  });

  // ---------- gallery carousel ----------
  const track = document.getElementById('gallery-track');
  C.images.gallery.forEach((src, i) => {
    const item = document.createElement('div');
    item.className = 'carousel-item shrink-0 basis-[78%] pl-3';
    const slot = document.createElement('div');
    slot.className = 'aspect-[4/5] w-full';
    item.appendChild(slot);
    track.appendChild(item);
    renderImageSlot(slot, src, 'gallery-' + (i + 1), src.split('/').pop());
  });

  // ---------- hero / invite text ----------
  document.getElementById('hero-venue-en').innerHTML = C.venue.name + '<br/>' + C.venue.cityLabelEn;
  document.getElementById('hero-groom-name').textContent = C.groom.name;
  document.getElementById('hero-bride-name').textContent = C.bride.name;
  document.getElementById('hero-names-en').innerHTML = C.groom.name + '<br/>' + C.bride.name;

  const monthNamesEn = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const monthNamesFull = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('hero-date-time').innerHTML =
    monthNamesFull[WEDDING_DATE.getMonth()] + ' ' + WEDDING_DATE.getDate() + ',<br/>' +
    WEDDING_DATE.getFullYear() + ' ' + C.weddingTimeLabel;

  function telLink(name, phone) {
    if (!phone || phone.startsWith('〈')) return name;
    return '<a href="tel:' + phone.replace(/[^0-9+]/g, '') + '" class="underline decoration-dotted">' + name + '</a>';
  }
  document.getElementById('invite-groom-line').innerHTML =
    '<span class="text-muted-foreground">' + C.groomFather.name + ' · ' + C.groomMother.name + '의 ' + C.groomOrder + '</span> ' + telLink(C.groom.name, C.groom.phone);
  document.getElementById('invite-bride-line').innerHTML =
    '<span class="text-muted-foreground">' + C.brideFather.name + ' · ' + C.brideMother.name + '의 ' + C.brideOrder + '</span> ' + telLink(C.bride.name, C.bride.phone);
  document.getElementById('invite-signature').textContent = C.groom.name + ' · ' + C.bride.name + ' 드림';
  document.getElementById('footer-names').textContent = C.groom.name + ' · ' + C.bride.name;

  // ---------- calendar ----------
  (function buildCalendar(){
    const grid = document.getElementById('calendar-grid');
    const year = WEDDING_DATE.getFullYear();
    const month = WEDDING_DATE.getMonth();
    const weddingDay = WEDDING_DATE.getDate();
    document.getElementById('calendar-month-label').textContent = monthNamesEn[month] + ' ' + year;
    document.getElementById('wedding-time-label').textContent = C.weddingTimeLabel;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dow = ['S','M','T','W','T','F','S'];
    dow.forEach(d => {
      const el = document.createElement('div');
      el.className = 'text-muted-foreground';
      el.textContent = d;
      grid.appendChild(el);
    });
    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));
    for (let d = 1; d <= daysInMonth; d++) {
      const el = document.createElement('div');
      el.className = 'grid h-8 place-items-center' + (d === weddingDay ? ' font-bold text-primary underline decoration-primary underline-offset-4' : '');
      el.textContent = d;
      grid.appendChild(el);
    }
  })();

  // ---------- countdown ----------
  function pad2(n){ return String(Math.max(0,n)).padStart(2,'0'); }
  function updateCountdown(){
    let diff = WEDDING_DATE.getTime() - Date.now();
    if (diff < 0) diff = 0;
    document.getElementById('cd-day').textContent = pad2(Math.floor(diff / 86400000));
    document.getElementById('cd-hour').textContent = pad2(Math.floor((diff % 86400000) / 3600000));
    document.getElementById('cd-min').textContent = pad2(Math.floor((diff % 3600000) / 60000));
    document.getElementById('cd-sec').textContent = pad2(Math.floor((diff % 60000) / 1000));
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---------- location ----------
  document.getElementById('venue-name').textContent = C.venue.name;
  document.getElementById('venue-address').innerHTML = C.venue.address + '<br/>' + C.venue.hallInfo;
  document.getElementById('parking-info').textContent = C.parkingInfo;
  document.getElementById('transit-info').textContent = C.transitInfo;
  if (C.mapEmbedUrl) {
    document.getElementById('map-area').innerHTML =
      '<div class="aspect-[16/10] w-full overflow-hidden border border-primary/20">' +
      '<iframe src="' + C.mapEmbedUrl + '" title="예식장 약도" loading="lazy" allowfullscreen ' +
      'class="h-full w-full touch-pan-x touch-pan-y" style="border:0;"></iframe></div>';
  }
  document.getElementById('kakao-map-btn').addEventListener('click', () => {
    if (C.kakaoMapLink) window.open(C.kakaoMapLink, '_blank');
    else showToast('카카오 길찾기 링크를 config.js에 추가해주세요.');
  });
  document.getElementById('naver-map-btn').addEventListener('click', () => {
    if (C.naverMapLink) window.open(C.naverMapLink, '_blank');
    else showToast('네이버 길찾기 링크를 config.js에 추가해주세요.');
  });

  // ---------- accordion (account) ----------
  (function buildAccordion(){
    const wrap = document.getElementById('accordion');
    const groups = [
      { key: 'groom', label: '신랑측 계좌번호', accounts: C.accounts.groom },
      { key: 'bride', label: '신부측 계좌번호', accounts: C.accounts.bride },
    ];
    groups.forEach(g => {
      const section = document.createElement('div');
      section.className = 'border-b border-border';

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'plain flex w-full items-center justify-between px-4 py-4 text-left text-sm';
      trigger.innerHTML = g.label + '<svg class="accordion-chevron size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';

      const content = document.createElement('div');
      content.className = 'accordion-content';
      const inner = document.createElement('div');
      g.accounts.forEach(acc => {
        const row = document.createElement('div');
        row.className = 'flex items-center justify-between gap-6 px-4 py-4';
        row.innerHTML =
          '<div class="text-xs">' + acc.bank + ' ' + acc.number + '<br/><span class="text-muted-foreground">예금주 ' + acc.holder + '</span></div>' +
          '<button type="button" class="grid size-9 place-items-center" aria-label="복사">' +
            '<svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="0"/><path d="M5 15V5a2 2 0 012-2h10"/></svg>' +
          '</button>';
        row.querySelector('button').addEventListener('click', () => {
          navigator.clipboard?.writeText(acc.bank + ' ' + acc.number).then(() => showToast('계좌번호를 복사했어요.')).catch(() => showToast('복사에 실패했습니다.'));
        });
        inner.appendChild(row);
      });
      content.appendChild(inner);
      section.appendChild(trigger);
      section.appendChild(content);
      wrap.appendChild(section);

      trigger.addEventListener('click', () => {
        const chevron = trigger.querySelector('.accordion-chevron');
        const isOpen = content.classList.contains('open');
        wrap.querySelectorAll('.accordion-content.open').forEach(c => c.classList.remove('open'));
        wrap.querySelectorAll('.accordion-chevron.open').forEach(c => c.classList.remove('open'));
        if (!isOpen) { content.classList.add('open'); chevron.classList.add('open'); }
      });
    });
  })();

  // ---------- background music ----------
  (function bgm(){
    const audio = document.getElementById('bgm');
    const icon = document.getElementById('bgm-icon');
    if (C.bgmFile) audio.src = C.bgmFile;
    let playing = false;
    function setIcon(isPlaying) {
      icon.innerHTML = isPlaying
        ? '<rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/>'
        : '<path d="M8 5v14l11-7z"/>';
      icon.style.opacity = isPlaying ? '0.5' : '1';
    }
    function tryPlay(){
      const p = audio.play();
      if (p && p.catch) {
        p.then(() => { playing = true; setIcon(true); })
         .catch(() => {
            const resume = () => {
              audio.play().then(() => { playing = true; setIcon(true); }).catch(()=>{});
              window.removeEventListener('pointerdown', resume);
              window.removeEventListener('keydown', resume);
            };
            window.addEventListener('pointerdown', resume, { once: true });
            window.addEventListener('keydown', resume, { once: true });
         });
      }
    }
    tryPlay();
    document.getElementById('bgm-toggle').addEventListener('click', () => {
      if (playing) audio.pause(); else tryPlay();
    });
    audio.addEventListener('play', () => { playing = true; setIcon(true); });
    audio.addEventListener('pause', () => { playing = false; setIcon(false); });
  })();

  // ---------- share / copy link ----------
  document.getElementById('share-btn').addEventListener('click', () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: '모던 모바일 청첩장 템플릿', text: '소중한 분들을 초대합니다.', url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url).then(() => showToast('링크를 복사했어요.'));
    }
  });
  document.getElementById('copy-link-btn').addEventListener('click', () => {
    navigator.clipboard?.writeText(window.location.href).then(() => showToast('링크를 복사했어요.')).catch(() => showToast('복사에 실패했습니다.'));
  });

  // ---------- guestbook (Firebase Firestore) ----------
  (function guestbook(){
    const form = document.getElementById('guestbook-form');
    const listEl = document.getElementById('guestbook-list');
    const emptyEl = document.getElementById('guestbook-empty');
    const rotations = ['-1deg','1deg','0deg'];
    let db = null;

    function renderMessages(messages) {
      listEl.innerHTML = '';
      if (!messages.length) { emptyEl.classList.remove('hidden'); return; }
      emptyEl.classList.add('hidden');
      messages.forEach((m, i) => {
        const card = document.createElement('div');
        card.className = 'mb-3 inline-block w-full break-inside-avoid p-4 text-ink shadow-sm bg-note-' + (m.color_index % 6);
        card.style.transform = 'rotate(' + rotations[i % 3] + ')';
        card.innerHTML =
          '<div class="break-words text-xs leading-5"></div>' +
          '<div class="mt-3 font-mono text-[9px] text-ink/60"></div>';
        card.children[0].textContent = m.content;
        card.children[1].textContent = m.author;
        listEl.appendChild(card);
      });
    }

    try {
      if (!C.firebase.apiKey || C.firebase.apiKey.startsWith('〈')) {
        throw new Error('firebase not configured');
      }
      firebase.initializeApp(C.firebase);
      db = firebase.firestore();
      db.collection(C.guestbookCollection).orderBy('created_at', 'desc').limit(30)
        .onSnapshot(snap => {
          renderMessages(snap.docs.map(d => d.data()));
        }, () => renderMessages([]));
    } catch (e) {
      renderMessages([]);
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const author = document.getElementById('gb-author').value.trim().slice(0, 30);
      const content = document.getElementById('gb-content').value.trim().slice(0, 300);
      if (!author || !content) return;
      const color_index = Math.floor(Math.random() * 6);
      const created_at = Date.now();
      if (!db) {
        showToast('방명록을 사용하려면 js/config.js의 firebase 설정을 먼저 채워주세요.');
        return;
      }
      try {
        await db.collection(C.guestbookCollection).add({ author, content, color_index, created_at });
        showToast('축하 메시지를 남겼어요.');
        form.reset();
      } catch (err) {
        showToast('메시지를 남기지 못했습니다.');
      }
    });
  })();
})();
