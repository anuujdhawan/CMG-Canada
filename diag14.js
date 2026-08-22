const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const result = await page.evaluate(() => {
    const els = document.elementsFromPoint(14, 230);
    return els.map(e => ({
      tag: e.tagName,
      cls: (e.className||'').toString(),
      id: e.id,
    }));
  });
  console.log(JSON.stringify(result, null, 2));

  // Also check: total count of ALL elements in the document, and list any with 'fixed' or 'absolute' position that span near x=14 with tall height, ANYWHERE in body (not just inside hero)
  const wide = await page.evaluate(() => {
    const found = [];
    document.querySelectorAll('*').forEach(el => {
      const cs = getComputedStyle(el);
      if (cs.position !== 'fixed' && cs.position !== 'absolute' && cs.position !== 'sticky') return;
      const r = el.getBoundingClientRect();
      if (r.height < 200) return;
      found.push({ tag: el.tagName, cls: (el.className||'').toString().slice(0,60), position: cs.position, rect: {left:r.left, top:r.top, width:r.width, height:r.height}, border: cs.borderLeftWidth, outline: cs.outlineWidth });
    });
    return found;
  });
  console.log('--- fixed/absolute/sticky tall elements ---');
  console.log(JSON.stringify(wide, null, 2));

  await browser.close();
})();
