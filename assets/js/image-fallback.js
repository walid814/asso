/*
 * image-fallback.js — Damien Osvald, stage FATE 2026
 *
 * Détecte les <img> qui n'ont pas pu charger leur source et les remplace par
 * un SVG inline généré au runtime. Le SVG est dimensionné au ratio réel du
 * conteneur et stylé selon le composant englobant (carte événement, carte
 * document, logo partenaire), pour s'intégrer au design FATE existant.
 *
 * Si l'image est dans un <a> qui pointe vers la même ressource cassée, le
 * lien est neutralisé.
 */
(function () {
  'use strict';

  var GOLD = '#F3C23C';        // teinte hover utilisée dans style.css
  var GOLD_SOFT = 'rgba(243, 194, 60, 0.08)';
  var INK = '#1f2937';         // gris foncé cohérent avec le header
  var INK_SOFT = '#6b7280';
  var PAPER = '#ffffff';
  var STROKE = '#e5e7eb';

  function escapeXml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  function wrapLabel(label, maxCharsPerLine, maxLines) {
    var words = String(label).split(/\s+/).filter(Boolean);
    var lines = [];
    var cur = '';
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      if (!cur) { cur = w; continue; }
      if ((cur + ' ' + w).length <= maxCharsPerLine) cur += ' ' + w;
      else { lines.push(cur); cur = w; }
    }
    if (cur) lines.push(cur);
    if (lines.length > maxLines) {
      lines = lines.slice(0, maxLines);
      lines[maxLines - 1] = lines[maxLines - 1].replace(/.{0,3}$/, '…');
    }
    return lines;
  }

  function detectKind(img) {
    if (img.closest('.partner-logo')) return 'partner';
    if (img.closest('.rapport-card-img')) return 'document';
    if (img.closest('.actionImgContainer') || img.classList.contains('actionImage')) return 'event';
    if (img.classList.contains('actuImage')) return 'event';
    return 'event';
  }

  var RATIO = { event: 16 / 9, document: 3 / 4, partner: 3 / 1 };
  var AR_CSS = { event: '16 / 9', document: '3 / 4', partner: '3 / 1' };

  function measure(img, kind) {
    var rect = img.getBoundingClientRect();
    var parentRect = img.parentElement ? img.parentElement.getBoundingClientRect() : rect;
    var w = Math.round(rect.width || parentRect.width) || 600;
    var h = Math.round(rect.height);

    if (h < 40) {
      var parentH = Math.round(parentRect.height);
      if (parentH >= 40) {
        // le parent a une hauteur définie (ex: actionImgContainer 250px) → on remplit
        h = parentH;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
      } else {
        // pas de hauteur de parent → on impose un ratio CSS au <img>
        h = Math.round(w / RATIO[kind]);
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.aspectRatio = AR_CSS[kind];
        img.style.display = 'block';
      }
    }
    if (w < 40) w = 600;
    return { w: w, h: h };
  }

  function svgEvent(label, w, h) {
    var lines = wrapLabel(label || 'Visuel à venir', 22, 2);
    var cx = w / 2;
    var cy = h / 2;
    var titleSize = Math.max(16, Math.min(28, Math.round(w / 18)));
    var lineH = titleSize * 1.25;
    var titleY = cy - ((lines.length - 1) * lineH) / 2 + titleSize * 0.35;
    var monoSize = Math.min(w, h) * 0.55;

    var tspans = lines.map(function (l, i) {
      return '<tspan x="' + cx + '" y="' + (titleY + i * lineH) + '">' + escapeXml(l) + '</tspan>';
    }).join('');

    return '' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + escapeXml(label || 'Visuel à venir') + '">' +
        '<defs>' +
          '<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0%" stop-color="' + GOLD_SOFT + '"/>' +
            '<stop offset="60%" stop-color="rgba(255,255,255,0)"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="' + w + '" height="' + h + '" fill="' + PAPER + '"/>' +
        '<rect width="' + w + '" height="' + h + '" fill="url(#g)"/>' +
        '<text x="' + cx + '" y="' + (cy + monoSize * 0.32) + '" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-weight="700" font-size="' + monoSize + '" fill="rgba(31,41,55,0.06)">F</text>' +
        '<rect x="' + (cx - 24) + '" y="' + (h - 36) + '" width="48" height="2" fill="' + GOLD + '"/>' +
        '<rect x="20" y="20" width="4" height="44" fill="' + GOLD + '"/>' +
        '<g font-family="Montserrat, \'Helvetica Neue\', Arial, sans-serif" text-anchor="middle">' +
          '<text font-size="' + titleSize + '" font-weight="700" fill="' + INK + '" letter-spacing="0.3">' + tspans + '</text>' +
          '<text x="' + cx + '" y="' + (h - 14) + '" font-size="11" font-style="italic" fill="' + INK_SOFT + '" letter-spacing="1.2">VISUEL À COMPLÉTER</text>' +
        '</g>' +
      '</svg>';
  }

  function svgDocument(label, w, h) {
    var lines = wrapLabel(label || 'Document à archiver', 14, 4);
    var cx = w / 2;
    var titleSize = Math.max(18, Math.min(32, Math.round(w / 11)));
    var lineH = titleSize * 1.18;
    var titleBlockH = lines.length * lineH;
    var titleStartY = (h - titleBlockH) / 2 + titleSize * 0.7;
    var monoSize = Math.min(w, h) * 0.9;

    var tspans = lines.map(function (l, i) {
      return '<tspan x="' + cx + '" y="' + (titleStartY + i * lineH) + '">' + escapeXml(l) + '</tspan>';
    }).join('');

    return '' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + escapeXml(label || 'Document à archiver') + '">' +
        '<defs>' +
          '<linearGradient id="dg" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="#fff8e1"/>' +
            '<stop offset="100%" stop-color="#fdf6d8"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<rect width="' + w + '" height="' + h + '" fill="url(#dg)"/>' +
        '<rect x="8" y="8" width="' + (w - 16) + '" height="' + (h - 16) + '" fill="none" stroke="' + GOLD + '" stroke-width="2"/>' +
        '<rect x="0" y="0" width="' + w + '" height="' + Math.max(8, Math.round(h * 0.025)) + '" fill="' + GOLD + '"/>' +
        '<rect x="0" y="' + (h - Math.max(8, Math.round(h * 0.025))) + '" width="' + w + '" height="' + Math.max(8, Math.round(h * 0.025)) + '" fill="' + GOLD + '"/>' +
        // grand F italique en filigrane
        '<text x="' + cx + '" y="' + (h * 0.78) + '" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-weight="700" font-size="' + monoSize + '" fill="rgba(31,41,55,0.05)">F</text>' +
        '<g font-family="Montserrat, \'Helvetica Neue\', Arial, sans-serif" text-anchor="middle">' +
          '<text x="' + cx + '" y="' + (h * 0.13) + '" font-size="10" font-weight="700" fill="' + GOLD + '" letter-spacing="3">FATE — ARCHIVES</text>' +
          '<text font-size="' + titleSize + '" font-weight="700" fill="' + INK + '" letter-spacing="0.3">' + tspans + '</text>' +
          '<text x="' + cx + '" y="' + (h - 24) + '" font-size="10" font-style="italic" fill="' + INK_SOFT + '" letter-spacing="1.5">VISUEL À RESTAURER</text>' +
        '</g>' +
      '</svg>';
  }

  function svgPartner(w, h) {
    var cx = w / 2;
    var cy = h / 2;
    var r = Math.min(w, h) * 0.22;
    var fSize = r * 1.4;

    return '' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Logo partenaire">' +
        '<rect width="' + w + '" height="' + h + '" fill="' + PAPER + '"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + GOLD + '" stroke-width="1.5" stroke-dasharray="3 5"/>' +
        '<text x="' + cx + '" y="' + (cy + fSize * 0.34) + '" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-weight="700" font-size="' + fSize + '" fill="' + GOLD + '">F</text>' +
        '<text x="' + cx + '" y="' + (cy + r + 22) + '" text-anchor="middle" font-family="Montserrat, \'Helvetica Neue\', Arial, sans-serif" font-size="9" font-style="italic" fill="' + INK_SOFT + '" letter-spacing="1.5">LOGO À VENIR</text>' +
      '</svg>';
  }

  function buildPlaceholder(kind, label, w, h) {
    var svg;
    if (kind === 'partner') svg = svgPartner(w, h);
    else if (kind === 'document') svg = svgDocument(label, w, h);
    else svg = svgEvent(label, w, h);
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  function handleBroken(img) {
    if (img.dataset.fallbackApplied === 'true') return;
    img.dataset.fallbackApplied = 'true';

    var originalSrc = img.getAttribute('src') || '';
    var label = img.getAttribute('alt') || img.getAttribute('title') || '';
    var kind = detectKind(img);
    var box = measure(img, kind);

    img.dataset.originalSrc = originalSrc;
    img.dataset.fallbackKind = kind;
    img.src = buildPlaceholder(kind, label, box.w, box.h);
    img.removeAttribute('srcset');

    var parentLink = img.closest('a');
    if (parentLink) {
      var href = parentLink.getAttribute('href') || '';
      var sameTarget = href && originalSrc && (
        href === originalSrc ||
        href.endsWith(originalSrc.split('/').pop()) ||
        originalSrc.endsWith(href.split('/').pop())
      );
      if (sameTarget) {
        parentLink.setAttribute('aria-disabled', 'true');
        parentLink.setAttribute('tabindex', '-1');
        parentLink.style.pointerEvents = 'none';
        parentLink.style.cursor = 'default';
        parentLink.removeAttribute('href');
      }
    }
  }

  function attach(img) {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) {
      handleBroken(img);
      return;
    }
    img.addEventListener('error', function () { handleBroken(img); }, { once: true });
  }

  function init() {
    var imgs = document.querySelectorAll('img');
    for (var i = 0; i < imgs.length; i++) attach(imgs[i]);
  }

  // Harmonisation: une fois toutes les ressources chargées, on aligne la hauteur
  // de chaque placeholder sur la médiane des vraies images de la même grille,
  // pour éviter le déséquilibre visuel quand un placeholder est entouré
  // d'affiches ou de scans plus grands.
  function findSiblingMedianHeight(img) {
    var container =
      img.closest('.documentation-list, .actionsParAnneeContainer, .actionCardContainer, .actions-container, .partner-grid, .partners-grid, .row') ||
      img.parentElement && img.parentElement.parentElement;
    if (!container) return 0;
    var probe = '.rapport-card-img img, .actionImgContainer img, .partner-logo img';
    var siblings = container.querySelectorAll(probe);
    var heights = [];
    for (var i = 0; i < siblings.length; i++) {
      var s = siblings[i];
      if (s === img) continue;
      if (s.dataset.fallbackApplied === 'true') continue;
      if (!s.complete || s.naturalWidth === 0) continue;
      var h = s.getBoundingClientRect().height;
      if (h > 40) heights.push(h);
    }
    if (!heights.length) return 0;
    heights.sort(function (a, b) { return a - b; });
    return Math.round(heights[Math.floor(heights.length / 2)]);
  }

  function harmonize() {
    var fallbacks = document.querySelectorAll('img[data-original-src]');
    for (var i = 0; i < fallbacks.length; i++) {
      var img = fallbacks[i];
      var target = findSiblingMedianHeight(img);
      if (!target) continue;
      img.style.height = target + 'px';
      img.style.aspectRatio = '';
      var rect = img.getBoundingClientRect();
      var w = Math.round(rect.width) || 600;
      img.src = buildPlaceholder(img.dataset.fallbackKind, img.alt || img.title || '', w, target);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  // window.load = toutes les images (vraies) ont fini de charger ou d'échouer
  window.addEventListener('load', function () { setTimeout(harmonize, 50); });
})();
