import pw from '/home/damien/stage/fate-site/node_modules/playwright/index.js';
const { chromium } = pw;
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

const BASE = 'http://localhost:8765';
const OUT = '/tmp/fate-audit';

const pages = [
  ['index', '/'],
  ['actualites', '/pages/actualites.html'],
  ['actions', '/pages/actions.html'],
  ['archives', '/pages/archives.html'],
  ['collaborations', '/pages/collaborations.html'],
  ['partenaires', '/pages/partenaires.html'],
  ['soutenir', '/pages/soutenir.html'],
  ['adherer', '/pages/adherer.html'],
  ['contact', '/pages/contact.html'],
  ['suggestions', '/pages/suggestions.html'],
  ['fate', '/pages/fate.html'],
  ['festival-arta-sacra', '/pages/festival-arta-sacra.html'],
  ['can-juin-2025', '/pages/can-juin-2025.html'],
  ['pied-des-tours', '/pages/pied-des-tours-juin-2025.html'],
  ['routes-esclavage', '/pages/routes-de-l-esclavage-a-nos-jours-juin-2025.html'],
  ['assainissement-douala', '/pages/assainissement-d-eau-douala-septembre-2026.html'],
  ['plantation-bihang', '/pages/plantation-bananiers-piments-bihang-2026-2027.html'],
  ['fate-25ans', '/pages/fate-vingt-cinq-ans-2026.html'],
];

const breakpoints = [
  { name: '320', w: 320, h: 720 },
  { name: '375', w: 375, h: 812 },
  { name: '768', w: 768, h: 1024 },
  { name: '1024', w: 1024, h: 768 },
  { name: '1440', w: 1440, h: 900 },
];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const report = [];

for (const bp of breakpoints) {
  const ctx = await browser.newContext({ viewport: { width: bp.w, height: bp.h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const dir = path.join(OUT, bp.name);
  await mkdir(dir, { recursive: true });

  for (const [name, url] of pages) {
    try {
      await page.goto(BASE + url, { waitUntil: 'load', timeout: 20000 });
      await page.waitForTimeout(400);
      const diag = await page.evaluate((vw) => {
        const html = document.documentElement;
        const body = document.body;
        const hOverflow = html.scrollWidth > html.clientWidth || body.scrollWidth > body.clientWidth;

        // Un élément déborde "visuellement" uniquement si :
        // - sa bounding box dépasse le viewport à droite,
        // - aucun de ses ancêtres ne le clippe (overflow hidden/clip/auto/scroll),
        // - il n'est pas masqué (visibility hidden, opacity 0, display none).
        function isClippedByAncestor(el) {
          let p = el.parentElement;
          while (p && p !== document.documentElement) {
            const cs = getComputedStyle(p);
            if (['hidden', 'clip', 'auto', 'scroll'].includes(cs.overflowX)) return true;
            if (['hidden', 'clip', 'auto', 'scroll'].includes(cs.overflow)) return true;
            p = p.parentElement;
          }
          return false;
        }
        function isVisuallyHidden(el) {
          let p = el;
          while (p && p !== document.documentElement) {
            const cs = getComputedStyle(p);
            if (cs.display === 'none') return true;
            if (cs.visibility === 'hidden') return true;
            if (parseFloat(cs.opacity) === 0) return true;
            p = p.parentElement;
          }
          return false;
        }

        const widerThanViewport = [];
        const trueOverflowers = [];
        document.querySelectorAll('body *').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.right > vw + 1 && r.width > 0 && getComputedStyle(el).display !== 'none') {
            const tag = el.tagName.toLowerCase();
            const cls = (el.className && typeof el.className === 'string') ? el.className.slice(0, 60) : '';
            const entry = { tag, cls, right: Math.round(r.right), width: Math.round(r.width) };
            widerThanViewport.push(entry);
            if (!isVisuallyHidden(el) && !isClippedByAncestor(el)) {
              trueOverflowers.push(entry);
            }
          }
        });
        return {
          docWidth: html.scrollWidth,
          viewportWidth: vw,
          hOverflow,
          overflowers: widerThanViewport.slice(0, 15),
          trueOverflowers: trueOverflowers.slice(0, 15),
        };
      }, bp.w);

      await page.screenshot({ path: path.join(dir, `${name}.png`), fullPage: false });
      report.push({ bp: bp.name, page: name, ...diag });
    } catch (e) {
      report.push({ bp: bp.name, page: name, error: e.message });
    }
  }
  await ctx.close();
}

await browser.close();
await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));

// Summary
const realIssues = report.filter(r => r.trueOverflowers && r.trueOverflowers.length);
const scrollOnly = report.filter(r => r.hOverflow && (!r.trueOverflowers || !r.trueOverflowers.length));
console.log(`\n=== AUDIT TERMINÉ ===`);
console.log(`Total: ${report.length} captures (18 pages × 5 bp = 90 attendus)`);
console.log(`Pages avec overflow VISUEL réel (élément débordant, non clippé, non masqué): ${realIssues.length}`);
console.log(`Pages avec scrollWidth > clientWidth mais sans débord visuel: ${scrollOnly.length}`);

if (realIssues.length) {
  console.log(`\n--- VRAIS BUGS À FIXER ---`);
  for (const r of realIssues) {
    console.log(`\n  [${r.bp}px] ${r.page}`);
    r.trueOverflowers.forEach(o => console.log(`     → <${o.tag}> .${o.cls} (right=${o.right}, w=${o.width})`));
  }
} else {
  console.log(`\n✓ Aucun débordement visuel détecté sur les 18 pages × 5 breakpoints.`);
}

if (scrollOnly.length) {
  console.log(`\n--- FAUX POSITIFS (scrollWidth résiduel sans bug visuel) ---`);
  scrollOnly.forEach(r => console.log(`  [${r.bp}px] ${r.page}`));
}
