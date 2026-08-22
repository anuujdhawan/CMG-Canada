const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 900 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Completely remove hero-copy from the DOM
  await page.evaluate(() => {
    document.querySelector('.hero-copy').remove();
  });
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'diag_e_removed.png' });
  await browser.close();
})();
