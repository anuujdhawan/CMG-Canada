const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    function describe(el) {
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        selector: el.className,
        tag: el.tagName,
        borderTopWidth: cs.borderTopWidth,
        borderRightWidth: cs.borderRightWidth,
        borderBottomWidth: cs.borderBottomWidth,
        borderLeftWidth: cs.borderLeftWidth,
        borderStyle: cs.borderStyle,
        borderColor: cs.borderColor,
        outlineWidth: cs.outlineWidth,
        outlineStyle: cs.outlineStyle,
        boxShadow: cs.boxShadow,
        rect: el.getBoundingClientRect(),
      };
    }
    const heroCopy = document.querySelector('.hero-copy');
    const chain = [];
    let node = heroCopy;
    while (node && node.tagName !== 'BODY') {
      chain.push(describe(node));
      node = node.parentElement;
    }
    return chain;
  });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
