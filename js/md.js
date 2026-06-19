/* ───────────────────────────────────────────────────────────
   md.js — Markdown content layer for Stevens World Travel
   ───────────────────────────────────────────────────────────
   All site content is stored as .md files: a JSON front matter
   block fenced by `---`, followed by a bilingual Markdown body.
   The browser fetches the .md and renders it live — no build step.

   File shape:
     ---
     { ...JSON metadata... }       ← structured fields (object OR array)
     ---
     <!--zh-->  …Chinese markdown…  <!--en-->  …English markdown…

   Public API (window.MD):
     MD.fetch(url)        → { meta, body }      (parses a .md file)
     MD.splitLang(body)   → { zh, en }          (split bilingual body)
     MD.sections(half)    → { key: markdown }    (split by `## key`)
     MD.render(md)        → HTML                  (generic prose)
     MD.renderPost(md, l) → HTML                  (journal post styling)
   ─────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  // ── Front-matter + body ───────────────────────────────
  function parseDoc(text) {
    text = String(text).replace(/^﻿/, '').replace(/\r\n?/g, '\n');
    if (!text.startsWith('---')) return { meta: {}, body: text };
    const rest = text.slice(3).replace(/^\n/, '');
    const end = rest.indexOf('\n---');
    if (end === -1) return { meta: {}, body: rest };
    const fm = rest.slice(0, end);
    let body = rest.slice(end + 4).replace(/^\n/, '');
    let meta = {};
    try { meta = JSON.parse(fm); }
    catch (e) { console.error('md.js: front-matter JSON parse failed —', e); }
    return { meta, body };
  }

  // ── Bilingual split ───────────────────────────────────
  function splitLang(body) {
    body = String(body || '');
    if (!/<!--\s*(?:zh|en)\s*-->/.test(body)) {
      const t = body.trim();
      return { zh: t, en: t };
    }
    const parts = body.split(/<!--\s*(zh|en)\s*-->/);
    const map = { zh: '', en: '' };
    for (let k = 1; k < parts.length; k += 2) {
      map[parts[k]] = (parts[k + 1] || '').trim();
    }
    if (!map.en) map.en = map.zh;
    if (!map.zh) map.zh = map.en;
    return map;
  }

  // ── Named sections (`## key`) ─────────────────────────
  function sections(half) {
    const map = {};
    const re = /^##\s+(\S+)[^\n]*\n/gm;
    const hits = [];
    let m;
    while ((m = re.exec(half))) hits.push({ key: m[1], start: m.index, body: re.lastIndex });
    for (let j = 0; j < hits.length; j++) {
      const end = j + 1 < hits.length ? hits[j + 1].start : half.length;
      map[hits[j].key] = half.slice(hits[j].body, end).trim();
    }
    return map;
  }

  // ── Inline formatting ─────────────────────────────────
  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function inline(s) {
    s = escapeHtml(s);
    s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, a, u) => `<img src="${u}" alt="${a}">`);
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`);
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    return s;
  }

  const SPECIAL = /^(?::::|#{1,4}\s|>\s?|[-*]\s|!\[[^\]]*\]\()/;

  // ── `:::name … :::` containers ────────────────────────
  function renderContainer(name, lines, opt) {
    if (name === 'gallery') {
      const figs = lines.map(l => l.trim()).filter(Boolean).map(l => {
        const [src, cap] = l.split('|').map(x => x.trim());
        return `<figure><img src="${src}" alt="${cap || ''}" loading="lazy" onerror="this.style.display='none'">${cap ? `<figcaption>${inline(cap)}</figcaption>` : ''}</figure>`;
      }).join('');
      return `<div class="post-gallery">${figs}</div>`;
    }
    if (name === 'tip') {
      const inner = renderMd(lines.join('\n'), { post: false });
      return `<div class="post-tip"><div class="post-tip-label">💡 ${opt.tipLabel || 'Tip'}</div>${inner}</div>`;
    }
    // unknown container → render contents plainly
    return renderMd(lines.join('\n'), opt);
  }

  // ── Block renderer ────────────────────────────────────
  function renderMd(md, opt) {
    opt = opt || {};
    const post = !!opt.post;
    const lines = String(md == null ? '' : md).replace(/\r\n?/g, '\n').split('\n');
    const out = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (line.trim() === '') { i++; continue; }

      const cont = line.match(/^:::\s*(\w+)/);
      if (cont) {
        i++;
        const inner = [];
        while (i < lines.length && !/^:::\s*$/.test(lines[i])) { inner.push(lines[i]); i++; }
        i++; // closing :::
        out.push(renderContainer(cont[1], inner, opt));
        continue;
      }

      const h = line.match(/^(#{1,4})\s+(.*)$/);
      if (h) { const lv = h[1].length; out.push(`<h${lv}>${inline(h[2])}</h${lv}>`); i++; continue; }

      if (/^>\s?/.test(line)) {
        const buf = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, '')); i++; }
        out.push(`<blockquote${post ? ' class="post-quote"' : ''}>${buf.map(inline).join('<br>')}</blockquote>`);
        continue;
      }

      if (/^[-*]\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^[-*]\s+/.test(lines[i])) { items.push(lines[i].replace(/^[-*]\s+/, '')); i++; }
        out.push(`<ul>${items.map(it => `<li>${inline(it)}</li>`).join('')}</ul>`);
        continue;
      }

      const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
      if (img) {
        const cap = img[1], src = img[2];
        out.push(post
          ? `<figure class="post-image"><img src="${src}" alt="${cap}" loading="lazy" onerror="this.style.display='none'">${cap ? `<figcaption>${inline(cap)}</figcaption>` : ''}</figure>`
          : `<figure><img src="${src}" alt="${cap}" loading="lazy">${cap ? `<figcaption>${inline(cap)}</figcaption>` : ''}</figure>`);
        i++; continue;
      }

      const buf = [];
      while (i < lines.length && lines[i].trim() !== '' && !SPECIAL.test(lines[i])) { buf.push(lines[i]); i++; }
      out.push(`<p${post ? ' class="post-text"' : ''}>${buf.map(inline).join('<br>')}</p>`);
    }
    return out.join('\n');
  }

  // ── Public API ────────────────────────────────────────
  window.MD = {
    parseDoc,
    splitLang,
    sections,
    render: md => renderMd(md, { post: false }),
    renderPost: (md, tipLabel) => renderMd(md, { post: true, tipLabel }),
    async fetch(url) {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status + ' — ' + url);
      return parseDoc(await res.text());
    },
  };
})();
