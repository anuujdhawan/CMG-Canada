const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 900 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const result = await page.evaluate(() => {
    function describe(el) {
      if (!el) return 'NOT FOUND';
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName, cls: el.className,
        rect: { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height },
        border: `${cs.borderTopWidth}/${cs.borderRightWidth}/${cs.borderBottomWidth}/${cs.borderLeftWidth} ${cs.borderStyle} ${cs.borderColor}`,
        borderRadius: cs.borderRadius,
        boxShadow: cs.boxShadow,
        opacity: cs.opacity,
        filter: cs.filter,
      };
    }
    const carousel = document.querySelector('.hero-background-carousel');
    const slides = document.querySelector('.cmg-hero-carousel__slides') || document.querySelector('[class*="carousel__slides"]');
    const slide = document.querySelector('.cmg-hero-carousel__slide.is-active');
    const image = document.querySelector('.cmg-hero-carousel__image');
    const wash = document.querySelector('.cmg-hero-carousel__wash');
    return {
      carousel: describe(carousel),
      slides: describe(slides),
      slide: describe(slide),
      image: describe(image),
      wash: describe(wash),
    };
  });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
