const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 900 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'diag_a_before.png' });

  await page.evaluate(() => {
    document.querySelectorAll('.ambient').forEach(el => el.style.display = 'none');
  });
  await page.screenshot({ path: 'diag_b_no_ambient.png' });

  await page.evaluate(() => {
    document.querySelector('.hero').style.setProperty('--px', '0px');
    const before = document.querySelector('.hero');
    before.style.setProperty('overflow', 'visible');
  });
  // also try removing ::before/::after via a style tag
  await page.addStyleTag({ content: '.hero::before, .hero::after { display: none !important; }' });
  await page.screenshot({ path: 'diag_c_no_before_after.png' });

  await browser.close();
})();
