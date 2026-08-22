const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const result = await page.evaluate(() => {
    // Scan a vertical strip near x=14-20 for any element whose left/right edge
    // lands there with a border/outline/box-shadow actually set.
    const candidates = [];
    document.querySelectorAll('*').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height < 100) return;
      const cs = getComputedStyle(el);
      const hasBorder = cs.borderTopWidth !== '0px' || cs.borderLeftWidth !== '0px' || cs.borderRightWidth !== '0px' || cs.borderBottomWidth !== '0px';
      const hasOutline = cs.outlineStyle !== 'none' && cs.outlineWidth !== '0px';
      const hasShadow = cs.boxShadow !== 'none';
      if (!hasBorder && !hasOutline && !hasShadow) return;
      if (rect.left > 40 && rect.right < 335) return; // must touch near our line x~14-20 or right side
      candidates.push({
        tag: el.tagName,
        cls: el.className && el.className.toString().slice(0, 80),
        rect: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height },
        border: `${cs.borderTopWidth}/${cs.borderRightWidth}/${cs.borderBottomWidth}/${cs.borderLeftWidth} ${cs.borderStyle} ${cs.borderColor}`,
        outline: hasOutline ? `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}` : null,
        shadow: hasShadow ? cs.boxShadow.slice(0,120) : null,
      });
    });
    return candidates;
  });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
