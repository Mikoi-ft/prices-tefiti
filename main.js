// Ожидает data.js с PRICE_PAGES и (опционально) USE_PDF/PDF_RANGES
(function(){
  const landing = document.getElementById('landing');
  const viewer  = document.getElementById('viewer');
  const backBtn = document.getElementById('backBtn');
  const title   = document.getElementById('title');
  const pagesEl = document.getElementById('pages');

  // ВКЛ/ВЫКЛ автозапуска (по умолчанию ВЫКЛ)
  const AUTO_OPEN_LAST = false;

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => selectLang(btn.dataset.lang));
  });

  function selectLang(lang){
    const cfg = window.PRICE_PAGES[lang];
    const usePDF = !!window.USE_PDF;

    document.documentElement.lang = lang;
    document.body.dir = cfg.rtl ? 'rtl' : 'ltr';
    title.textContent = `${window.UI[lang].priceTitle} — ${cfg.label}`;


    landing.classList.add('hidden');
    viewer.classList.remove('hidden');

    // отрисовать страницы вертикально
    pagesEl.innerHTML = '';
    if(usePDF){
      const rng = (window.PDF_RANGES && window.PDF_RANGES[lang]) || {start:1,end:cfg.count||2};
      for(let i=rng.start;i<=rng.end;i++){
        const wrap = document.createElement('div'); wrap.className = 'page';
        const fr = document.createElement('iframe');
        fr.src = `assets/prices/${lang}.pdf#page=${i}&zoom=page-fit`;
        wrap.appendChild(fr); pagesEl.appendChild(wrap);
      }
    }else{
      for(let i=1;i<=cfg.count;i++){
        const wrap = document.createElement('div'); wrap.className = 'page';
        const img = document.createElement('img');
        img.loading = 'lazy'; img.decoding = 'async';
        img.src = `assets/prices/${lang}/${i}.${cfg.ext||'avif'}`;
        img.alt = `Прайс ${cfg.label} — стр. ${i}`;
        wrap.appendChild(img); pagesEl.appendChild(wrap);
      }
    }

    // можно хранить выбор, но не авто-открывать при следующем заходе
    try { localStorage.setItem('tefiti_lang', lang); } catch(e){}
  }

  backBtn.addEventListener('click', ()=>{
    viewer.classList.add('hidden');
    landing.classList.remove('hidden');
  });

  // --- ВАЖНО: Больше не авто-открываем сохранённый язык ---
  // Если когда-нибудь захочешь включить автозапуск — поставь AUTO_OPEN_LAST = true
  if (AUTO_OPEN_LAST) {
    try {
      const saved = localStorage.getItem('tefiti_lang');
      if(saved && window.PRICE_PAGES[saved]) selectLang(saved);
    } catch(e){}
  }

  // Дополнительно: поддержка deeplink ?lang=ru (если нужно)
  const params = new URLSearchParams(location.search);
  const deeplinkLang = params.get('lang');
  if (deeplinkLang && window.PRICE_PAGES[deeplinkLang]) {
    selectLang(deeplinkLang);
  }
})();
