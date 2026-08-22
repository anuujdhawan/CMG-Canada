const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 900 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.addStyleTag({ content: `
    .cmg-template-home .hero { isolation: auto !important; }
    .cmg-template-home .hero-copy { z-index: auto !important; position: static !important; }
  ` });
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'diag_d_no_isolation.png' });
  await browser.close();
})();
