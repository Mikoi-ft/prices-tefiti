(function(){
  const landing = document.getElementById('landing');
  const viewer  = document.getElementById('viewer');
  const backBtn = document.getElementById('backBtn');
  const pageImg = document.getElementById('pageImage');
  const pageIndicator = document.getElementById('pageIndicator');
  const title = document.getElementById('title');
  const btnPrev = document.getElementById('prev');
  const btnNext = document.getElementById('next');
  const wrap = document.getElementById('canvasWrap');

  const langs = document.querySelectorAll('.langbar .lang');

  let state = { lang: null, page: 1, total: 2, ext: 'jpg', rtl: false, usePDF: false };

  function selectLang(lang){
    const cfg = window.PRICE_PAGES[lang];
    state.lang = lang;
    state.page = 1;
    state.total = cfg.count;
    state.ext = cfg.ext || 'jpg';
    state.rtl = !!cfg.rtl;
    state.usePDF = !!window.USE_PDF;

    document.documentElement.lang = lang;
    document.body.dir = state.rtl ? 'rtl' : 'ltr';

    title.textContent = `Прайс-лист — ${cfg.label}`;
    landing.classList.add('hidden');
    viewer.classList.remove('hidden');

    if(state.usePDF){
      ensureIframe(); updatePDF();
    }else{
      removeIframe(); updateImage();
    }
    updateIndicator(); updateArrows();
    try { localStorage.setItem('tefiti_lang', lang); } catch(e){}
  }

  function updateIndicator(){ pageIndicator.textContent = `${state.page}/${state.total}`; }
  function updateArrows(){ btnPrev.disabled = state.page <= 1; btnNext.disabled = state.page >= state.total; }
  function srcFor(lang,page,ext){ return `assets/prices/${lang}/${page}.${ext}`; }
  function updateImage(){ const src = srcFor(state.lang, state.page, state.ext); pageImg.src = src; pageImg.alt = `Прайс ${state.lang} — страница ${state.page}`; }

  // PDF via iframe
  let pdfFrame = null;
  function ensureIframe(){ if(!pdfFrame){ pdfFrame = document.createElement('iframe'); pdfFrame.style="position:absolute; inset:0; width:100%; height:100%; border:0;"; wrap.appendChild(pdfFrame); pageImg.style.display='none'; } }
  function removeIframe(){ if(pdfFrame){ wrap.removeChild(pdfFrame); pdfFrame=null; } pageImg.style.display=''; }
  function updatePDF(){ const rng = window.PDF_RANGES[state.lang]||{start:1,end:state.total}; const page=(rng.start-1)+state.page; const url=`assets/prices/${state.lang}.pdf#page=${page}&zoom=page-fit`; pdfFrame.src=url; }

  btnPrev.addEventListener('click', () => { if(state.page>1){ state.page--; state.usePDF?updatePDF():updateImage(); updateIndicator(); updateArrows(); }});
  btnNext.addEventListener('click', () => { if(state.page<state.total){ state.page++; state.usePDF?updatePDF():updateImage(); updateIndicator(); updateArrows(); }});

  // swipe support
  let sx=0, sy=0, dx=0, dy=0, on=false;
  wrap.addEventListener('touchstart', e=>{ const t=e.touches[0]; sx=t.clientX; sy=t.clientY; on=true; }, {passive:true});
  wrap.addEventListener('touchmove', e=>{ if(!on) return; const t=e.touches[0]; dx=t.clientX-sx; dy=t.clientY-sy; }, {passive:true});
  wrap.addEventListener('touchend', ()=>{ if(!on) return; on=false; if(Math.abs(dx)>40 && Math.abs(dy)<60){ if(dx>0){ if(!state.rtl && state.page>1) state.page--; if(state.rtl && state.page<state.total) state.page++; } else { if(!state.rtl && state.page<state.total) state.page++; if(state.rtl && state.page>1) state.page--; } state.usePDF?updatePDF():updateImage(); updateIndicator(); updateArrows(); } dx=dy=0; }, {passive:true});

  backBtn.addEventListener('click', ()=>{ viewer.classList.add('hidden'); landing.classList.remove('hidden'); });

  langs.forEach(btn => btn.addEventListener('click', ()=> selectLang(btn.dataset.lang)));

  try{ const saved=localStorage.getItem('tefiti_lang'); if(saved && window.PRICE_PAGES[saved]) selectLang(saved); }catch(e){}
})();