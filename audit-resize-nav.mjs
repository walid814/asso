import pw from '/home/damien/stage/fate-site/node_modules/playwright/index.js';
const { chromium } = pw;
import { mkdir } from 'fs/promises';
import path from 'path';

const BASE = 'http://localhost:8765';
const OUT = '/tmp/fate-resize';
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

// On joue avec l'index — le menu y est dans son écosystème complet.
await page.goto(BASE + '/', { waitUntil: 'load' });
// Ferme le popup d'accueil s'il apparait
await page.waitForTimeout(2200);
await page.evaluate(() => {
  const o = document.getElementById('fate-popup-overlay');
  if (o) { o.classList.remove('visible'); o.style.display = 'none'; }
});

const widths = [1440, 1280, 1100, 1024, 900, 768, 600, 480, 375, 320];

async function diagnose(label) {
  return await page.evaluate(() => {
    const nav = document.querySelector('.mainNav');
    const toggle = document.querySelector('.mobileNavToggle, #mobileToggle');
    const navOpen = nav && nav.classList.contains('navOpen');
    const navCs = nav ? getComputedStyle(nav) : null;
    const tgCs = toggle ? getComputedStyle(toggle) : null;
    const html = document.documentElement;
    const body = document.body;
    return {
      url: location.pathname,
      viewportW: html.clientWidth,
      htmlScrollW: html.scrollWidth,
      bodyScrollW: body.scrollWidth,
      hOverflow: html.scrollWidth > html.clientWidth || body.scrollWidth > body.clientWidth,
      nav: nav ? {
        display: navCs.display,
        position: navCs.position,
        navOpen,
        width: nav.getBoundingClientRect().width,
        right: nav.getBoundingClientRect().right,
        height: nav.getBoundingClientRect().height,
      } : null,
      toggle: toggle ? {
        display: tgCs.display,
        visible: tgCs.display !== 'none',
      } : null,
    };
  });
}

console.log('═══ TEST 1 : resize progressif de 1440 → 320 (sans clic) ═══\n');
for (const w of widths) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.waitForTimeout(300);
  const d = await diagnose(`load-${w}`);
  await page.screenshot({ path: path.join(OUT, `t1-${String(w).padStart(4, '0')}.png`), fullPage: false });
  console.log(`[${w}px] hOver=${d.hOverflow} nav.display=${d.nav?.display} nav.width=${Math.round(d.nav?.width ?? 0)} burger=${d.toggle?.visible ? 'visible' : 'hidden'}`);
}

console.log('\n═══ TEST 2 : à chaque viewport mobile, on clique sur le burger ═══\n');
const mobileWidths = [1100, 1024, 900, 768, 600, 480, 375, 320];
for (const w of mobileWidths) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.waitForTimeout(300);

  // Reset : drawer fermé
  await page.evaluate(() => {
    const n = document.querySelector('.mainNav');
    if (n) n.classList.remove('navOpen');
    document.body.classList.remove('noScroll');
  });
  await page.waitForTimeout(200);

  // Clic sur le burger
  const clicked = await page.evaluate(() => {
    const btn = document.querySelector('.mobileNavToggle, #mobileToggle');
    if (!btn || getComputedStyle(btn).display === 'none') return false;
    btn.click();
    return true;
  });
  await page.waitForTimeout(400);

  const d = await diagnose(`burger-${w}`);
  await page.screenshot({ path: path.join(OUT, `t2-burger-${String(w).padStart(4, '0')}.png`), fullPage: false });
  console.log(`[${w}px] burger.clicked=${clicked} navOpen=${d.nav?.navOpen} nav.width=${Math.round(d.nav?.width ?? 0)} nav.height=${Math.round(d.nav?.height ?? 0)} hOver=${d.hOverflow}`);
}

console.log('\n═══ TEST 3 : drawer ouvert puis resize 320 → 1440 (transition mobile→desktop) ═══\n');
// On démarre à 320 avec le drawer ouvert
await page.setViewportSize({ width: 320, height: 900 });
await page.waitForTimeout(300);
await page.evaluate(() => {
  const n = document.querySelector('.mainNav');
  if (n) n.classList.add('navOpen');
  document.body.classList.add('noScroll');
});
await page.waitForTimeout(300);
for (const w of widths.slice().reverse()) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.waitForTimeout(300);
  const d = await diagnose(`drawer-open-${w}`);
  await page.screenshot({ path: path.join(OUT, `t3-drawerOpen-${String(w).padStart(4, '0')}.png`), fullPage: false });
  console.log(`[${w}px] navOpen=${d.nav?.navOpen} nav.display=${d.nav?.display} nav.width=${Math.round(d.nav?.width ?? 0)} body.noScroll=${await page.evaluate(() => document.body.classList.contains('noScroll'))}`);
}

await browser.close();
console.log('\n✓ Captures dans /tmp/fate-resize/');
