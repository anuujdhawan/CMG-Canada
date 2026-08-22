const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 900 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.addStyleTag({ content: `
    .cmg-template-home .hero-copy { transition: none !important; will-change: auto !important; }
  ` });
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'diag_f_notransition.png' });
  await browser.close();
})();
