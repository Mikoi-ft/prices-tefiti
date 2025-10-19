// Place images into assets/prices/<lang>/1.jpg, 2.jpg, ...
// Two pages per language by default; update `count` if needed.
window.PRICE_PAGES = {
  ky: { count: 2, ext: "avif", label: "Кыргызча" },
  ru: { count: 2, ext: "avif", label: "Русский" },
  en: { count: 2, ext: "avif", label: "English" },
  zh: { count: 2, ext: "avif", label: "中文" },
  ar: { count: 2, ext: "avif", label: "العربية" }
};

// Set to true if you want to use per-language PDFs placed at assets/prices/<lang>.pdf
window.USE_PDF = false;
window.PDF_RANGES = {
  ky: { start:1, end:2 },
  ru: { start:1, end:2 },
  en: { start:1, end:2 },
  zh: { start:1, end:2 },
  ar: { start:1, end:2 },
};
