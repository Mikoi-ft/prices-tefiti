// Put your page images to assets/prices/<lang>/1.jpg, 2.jpg, ...
// Set count + extension for each lang below.
window.PRICE_PAGES = {
  ky: { count: 2, ext: "pdf", label: "Кыргызча" },
  ru: { count: 2, ext: "pdf", label: "Русский" },
  en: { count: 2, ext: "pdf", label: "English" },
  zh: { count: 2, ext: "pdf", label: "中文" },
  ar: { count: 2, ext: "pdf", label: "العربية", rtl: true }
};

window.USE_PDF = false; // true if you want to use assets/prices/<lang>.pdf
window.PDF_RANGES = {
  ky: { start:1, end:2 },
  ru: { start:1, end:2 },
  en: { start:1, end:2 },
  zh: { start:1, end:2 },
  ar: { start:1, end:2 },
};
