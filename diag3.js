const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const result = await page.evaluate(() => {
    const heroCopy = document.querySelector('.hero-copy');
    function describePseudo(el, pseudo) {
      const cs = getComputedStyle(el, pseudo);
      return {
        content: cs.content,
        display: cs.display,
        position: cs.position,
        border: `${cs.borderTopWidth}/${cs.borderRightWidth}/${cs.borderBottomWidth}/${cs.borderLeftWidth} ${cs.borderStyle} ${cs.borderColor}`,
        background: cs.backgroundColor,
        boxShadow: cs.boxShadow,
        inset: cs.inset,
        width: cs.width,
        height: cs.height,
      };
    }
    return {
      before: describePseudo(heroCopy, '::before'),
      after: describePseudo(heroCopy, '::after'),
      heroCopyBg: getComputedStyle(heroCopy).backgroundColor,
      heroCopyBackdrop: getComputedStyle(heroCopy).backdropFilter,
    };
  });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
