const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Test 1: hide ambient divs and carousel wash, see if line disappears
  await page.evaluate(() => {
    document.querySelectorAll('.ambient').forEach(el => el.style.display = 'none');
  });
  await page.screenshot({ path: 'diag_no_ambient.png' });

  const heroInfo = await page.evaluate(() => {
    const hero = document.querySelector('.hero');
    const cs = getComputedStyle(hero, '::before');
    const csAfter = getComputedStyle(hero, '::after');
    return {
      before: { border: cs.borderTopWidth+'/'+cs.borderRightWidth+'/'+cs.borderBottomWidth+'/'+cs.borderLeftWidth, style: cs.borderStyle, color: cs.borderColor, bg: cs.backgroundColor, boxShadow: cs.boxShadow, inset: cs.inset, borderRadius: cs.borderRadius },
      after: { border: csAfter.borderTopWidth+'/'+csAfter.borderRightWidth+'/'+csAfter.borderBottomWidth+'/'+csAfter.borderLeftWidth, style: csAfter.borderStyle, color: csAfter.borderColor, bg: csAfter.backgroundColor, boxShadow: csAfter.boxShadow }
    };
  });
  console.log(JSON.stringify(heroInfo, null, 2));
  await browser.close();
})();
