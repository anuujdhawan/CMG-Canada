const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const result = await page.evaluate(() => {
    function d(el) {
      const cs = getComputedStyle(el);
      return {
        border: `${cs.borderTopWidth}/${cs.borderRightWidth}/${cs.borderBottomWidth}/${cs.borderLeftWidth} ${cs.borderStyle} ${cs.borderColor}`,
        boxShadow: cs.boxShadow,
        background: cs.backgroundImage,
      };
    }
    return { html: d(document.documentElement), body: d(document.body) };
  });
  console.log(JSON.stringify(result, null, 2));

  // Ultimate test: does the line appear on a BLANK page with no app content at all?
  await page.setContent('<html><body style="margin:0;background:#1a1520;height:900px;"></body></html>');
  await page.screenshot({ path: 'diag_blank.png' });

  await browser.close();
})();
