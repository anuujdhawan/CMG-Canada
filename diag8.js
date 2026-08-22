const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const result = await page.evaluate(() => {
    const points = [[14,150],[14,200],[14,300],[15,350],[16,400],[14,450],[13,500],[14,550]];
    return points.map(([x,y]) => {
      const els = document.elementsFromPoint(x, y);
      return { x, y, stack: els.slice(0,4).map(e => e.tagName + '.' + (e.className||'').toString().slice(0,40)) };
    });
  });
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
