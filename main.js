(function(){
  const landing = document.getElementById('landing');
  const viewer  = document.getElementById('viewer');
  const backBtn = document.getElementById('backBtn');
  const title   = document.getElementById('title');
  const pagesEl = document.getElementById('pages');
  const langBtns= document.querySelectorAll('.langbar .lang');

  function selectLang(lang){
    const cfg = window.PRICE_PAGES[lang];
    const usePDF = !!window.USE_PDF;
    document.documentElement.lang = lang;
    document.body.dir = cfg.rtl ? 'rtl' : 'ltr';

    title.textContent = `Прайс-лист — ${cfg.label}`;
    landing.classList.add('hidden');
    viewer.classList.remove('hidden');

    // Render pages stacked
    pagesEl.innerHTML = '';
    if(usePDF){
      const rng = (window.PDF_RANGES && window.PDF_RANGES[lang]) || {start:1,end:cfg.count||2};
      for(let i=rng.start;i<=rng.end;i++){
        const wrap = document.createElement('div');
        wrap.className = 'page';
        const fr = document.createElement('iframe');
        fr.src = `assets/prices/${lang}.pdf#page=${i}&zoom=page-fit`;
        wrap.appendChild(fr);
        pagesEl.appendChild(wrap);
      }
    }else{
      for(let i=1;i<=cfg.count;i++){
        const wrap = document.createElement('div');
        wrap.className = 'page';
        const img = document.createElement('img');
        img.src = `assets/prices/${lang}/${i}.${cfg.ext||'avif'}`;
        img.alt = `Прайс ${cfg.label} — стр. ${i}`;
        wrap.appendChild(img);
        pagesEl.appendChild(wrap);
      }
    }

    try{ localStorage.setItem('tefiti_lang', lang); }catch(e){}
  }

  backBtn.addEventListener('click', ()=>{
    viewer.classList.add('hidden');
    landing.classList.remove('hidden');
  });

  langBtns.forEach(b=> b.addEventListener('click', ()=> selectLang(b.dataset.lang)));

  try{
    const saved = localStorage.getItem('tefiti_lang');
    if(saved && window.PRICE_PAGES[saved]) selectLang(saved);
  }catch(e){}
})();