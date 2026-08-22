const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const result = await page.evaluate(() => {
    function describe(el) {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName, cls: el.className,
        rect: { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height },
        border: `${cs.borderTopWidth}/${cs.borderRightWidth}/${cs.borderBottomWidth}/${cs.borderLeftWidth} ${cs.borderStyle} ${cs.borderColor}`,
        borderRadius: cs.borderRadius,
        outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
        boxShadow: cs.boxShadow,
        background: cs.backgroundColor,
        backdropFilter: cs.backdropFilter,
        position: cs.position,
        transform: cs.transform,
      };
    }
    const heroVisual = document.querySelector('.hero-visual');
    const visualCard = document.querySelector('.visual-card');
    const heroActions = document.querySelector('.hero-actions');
    return {
      heroVisual: describe(heroVisual),
      visualCard: describe(visualCard),
      heroActions: describe(heroActions),
    };
  });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
