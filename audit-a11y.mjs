/* ============================================================
   AUDIT-A11Y.MJS — accessibilité axe-core sur les 18 pages
   ------------------------------------------------------------
   Injecte axe-core (4.10.0) depuis le CDN dans chaque page,
   teste WCAG 2.0/2.1 Levels A et AA + best-practices, sur
   deux viewports (mobile 375 + desktop 1440). Génère un JSON
   complet + un sommaire console + un sommaire markdown.

   Prérequis : un serveur HTTP local doit tourner sur 8765
   (ex: `python3 -m http.server 8765` à la racine du repo).
   ============================================================ */

import pw from '/home/damien/stage/fate-site/node_modules/playwright/index.js';
const { chromium } = pw;
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

const BASE = 'http://localhost:8765';
const OUT = '/tmp/fate-a11y';
await mkdir(OUT, { recursive: true });

const AXE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js';

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

const viewports = [
    { name: 'mobile-375', w: 375, h: 812 },
    { name: 'desktop-1440', w: 1440, h: 900 },
];

const browser = await chromium.launch();
const report = [];

for (const vp of viewports) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
    const page = await ctx.newPage();

    for (const [name, url] of pages) {
        try {
            await page.goto(BASE + url, { waitUntil: 'load', timeout: 25000 });
            // Ferme le popup d'accueil sur l'index pour ne pas le compter en bloc
            await page.waitForTimeout(500);
            await page.evaluate(() => {
                const o = document.getElementById('fate-popup-overlay');
                if (o) { o.classList.remove('visible'); o.style.display = 'none'; }
            });
            await page.waitForTimeout(300);

            // Injecte axe-core via le CDN
            await page.addScriptTag({ url: AXE_CDN });
            await page.waitForFunction(() => typeof window.axe !== 'undefined', { timeout: 5000 });

            const result = await page.evaluate(async () => {
                /* eslint-disable no-undef */
                const res = await window.axe.run(document, {
                    runOnly: {
                        type: 'tag',
                        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
                    },
                    resultTypes: ['violations', 'incomplete'],
                });
                return {
                    violations: res.violations.map(v => ({
                        id: v.id,
                        impact: v.impact,
                        help: v.help,
                        helpUrl: v.helpUrl,
                        description: v.description,
                        nodeCount: v.nodes.length,
                        sampleHtml: v.nodes.slice(0, 2).map(n => (n.html || '').slice(0, 220)),
                        targets: v.nodes.slice(0, 5).map(n => (n.target && n.target[0]) || ''),
                    })),
                    incomplete: res.incomplete.length,
                    passes: res.passes ? res.passes.length : 0,
                };
            });

            report.push({ viewport: vp.name, page: name, ...result });
        } catch (e) {
            report.push({ viewport: vp.name, page: name, error: e.message });
        }
    }
    await ctx.close();
}

await browser.close();

await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));

// ─── Sommaire console ────────────────────────────────────────
const allViolations = report.flatMap(r => (r.violations || []).map(v => ({ ...v, page: r.page, viewport: r.viewport })));
const byImpact = { critical: 0, serious: 0, moderate: 0, minor: 0, null: 0 };
allViolations.forEach(v => { byImpact[v.impact ?? 'null']++; });

console.log(`\n═══ AUDIT A11Y TERMINÉ ═══`);
console.log(`Pages × Viewports : ${pages.length} × ${viewports.length} = ${report.length} captures`);
console.log(`Total violations  : ${allViolations.length}`);
console.log(`  Critical        : ${byImpact.critical}`);
console.log(`  Serious         : ${byImpact.serious}`);
console.log(`  Moderate        : ${byImpact.moderate}`);
console.log(`  Minor           : ${byImpact.minor}`);

// Top règles violées (agrégation par id)
const byRule = {};
allViolations.forEach(v => {
    if (!byRule[v.id]) byRule[v.id] = { id: v.id, impact: v.impact, help: v.help, count: 0, pages: new Set() };
    byRule[v.id].count += v.nodeCount;
    byRule[v.id].pages.add(v.page);
});
const topRules = Object.values(byRule).sort((a, b) => b.count - a.count);

console.log(`\n--- TOP RÈGLES VIOLÉES (par instances) ---`);
topRules.slice(0, 12).forEach(r => {
    console.log(`  [${(r.impact ?? '?').padEnd(8)}] ${r.id.padEnd(28)} ${String(r.count).padStart(4)} nœuds, ${r.pages.size} page(s)`);
});

// ─── Sommaire markdown (futur journal) ──────────────────────
let md = `# Audit accessibilité — résumé brut\n\n`;
md += `Lancé via \`audit-a11y.mjs\` sur ${pages.length} pages × ${viewports.length} viewports.\n\n`;
md += `## Volumes\n\n`;
md += `| Impact | Instances |\n|---|---|\n`;
md += `| Critical | ${byImpact.critical} |\n| Serious | ${byImpact.serious} |\n| Moderate | ${byImpact.moderate} |\n| Minor | ${byImpact.minor} |\n\n`;
md += `## Top règles violées\n\n`;
md += `| Règle | Impact | Instances | Pages |\n|---|---|---|---|\n`;
topRules.forEach(r => {
    md += `| \`${r.id}\` | ${r.impact ?? '?'} | ${r.count} | ${r.pages.size} |\n`;
});
await writeFile(path.join(OUT, 'summary.md'), md);

console.log(`\n✓ JSON : ${OUT}/report.json`);
console.log(`✓ MD   : ${OUT}/summary.md`);
