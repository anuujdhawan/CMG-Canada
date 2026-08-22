const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 900 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.addStyleTag({ content: `
    .cmg-hero-carousel__image { filter: none !important; transform: none !important; transition: none !important; }
    .cmg-hero-carousel__slide { transition: none !important; }
  ` });
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'diag_g_nofilter.png' });

  // also try: hide the image entirely, replace hero bg with solid color
  await page.addStyleTag({ content: `
    .hero-background-carousel { display: none !important; }
    .cmg-template-home .hero { background: #1a1520 !important; }
  ` });
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'diag_h_nocarousel.png' });
  await browser.close();
})();
