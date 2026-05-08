/* =====================================================
   app.js — Stevens Voyage v2
   Index data : window.DB_INDEX (data/index.js, sync)
   Detail data: fetch()         (data/countries/*.json)
   Dest data  : fetch()         (data/destinations/*.json)
   World map  : Leaflet + world-atlas TopoJSON (index page)
   Search     : navbar + hero   (filters DB_INDEX)
   ===================================================== */

// ── Language ───────────────────────────────────────────
const I18N = {
  zh: {
    site_name:       '斯蒂文斯环球旅行',
    nav_home:        '首页',
    nav_continents:  '大洲',
    nav_about:       '关于',
    lang_toggle:     'English',
    search_ph:       '搜索国家或大洲…',
    search_no:       '无匹配结果',
    explore:         '探索',
    countries:       '个国家',
    dest_btn:        '🗺️ 查看旅游景点',
    info_btn:        '国家详情',
    tab_geo:         '地理',
    tab_his:         '历史',
    tab_eco:         '经济',
    tab_pop:         '人口',
    tab_cul:         '文化',
    fact_area:       '面积',
    fact_pop:        '人口',
    fact_lang:       '语言',
    fact_cur:        '货币',
    fact_tz:         '时区',
    fact_cap:        '首都',
    all_regions:     '全部地区',
    dest_title:      '旅游景点',
    back:            '← 返回',
    loading:         '加载中…',
    not_found:       '未找到相关内容',
    hero_sub:        '探索全球之美',
    hero_desc:       '带您走遍六大洲，发现每一片土地的独特魅力',
    hero_search_btn: '搜索',
    stats_countries: '收录国家',
    stats_dest:      '旅游景点',
    stats_cont:      '大洲',
    nav_world:       '世界地图',
    world_map_title: '点击地图探索各国',
    world_map_hint:  '蓝色国家已收录详细介绍，点击即可前往',
    browse_cont:     '开始探索',
    continent_intro: '选择一个大洲，开始您的探索之旅',
    enter_world_map: '探索世界地图',
    enter_continents:'浏览各大洲',
    cont_map_title:  '地图概览',
    no_countries:    '暂无收录国家',
    countries_in:    '收录国家',
    view_country:    '国家详情',
    view_dest:       '旅游景点',
    subdivisions:    '省份 / 地区',
    cc_notice:       '© 2026 Stevens. 本站原创内容采用 CC BY-NC-SA 4.0 协议进行许可。未经授权，禁止用于商业用途。',
    footer_home:     '首页',
    footer_about:    '关于',
    no_dest:         '暂无景点数据',
    filter_all:      '全部',
    map_title:       '景点地图',
    fetch_err_title: '需要本地服务器',
    fetch_err_body:  '请在项目目录运行以下命令后刷新页面：',
    fetch_err_note:  '然后访问',
    continent_label: '大洲',
    country_label:   '国家',
  },
  en: {
    site_name:       'Stevens World Travel',
    nav_home:        'Home',
    nav_continents:  'Continents',
    nav_about:       'About',
    lang_toggle:     '中文',
    search_ph:       'Search countries or continents…',
    search_no:       'No results found',
    explore:         'Explore',
    countries:       'countries',
    dest_btn:        '🗺️ See Attractions',
    info_btn:        'Country Details',
    tab_geo:         'Geography',
    tab_his:         'History',
    tab_eco:         'Economy',
    tab_pop:         'Demographics',
    tab_cul:         'Culture',
    fact_area:       'Area',
    fact_pop:        'Population',
    fact_lang:       'Language',
    fact_cur:        'Currency',
    fact_tz:         'Timezone',
    fact_cap:        'Capital',
    all_regions:     'All Regions',
    dest_title:      'Tourist Destinations',
    back:            '← Back',
    loading:         'Loading…',
    not_found:       'Content not found',
    hero_sub:        'Discover the World',
    hero_desc:       'Explore six continents and uncover the unique charm of every corner of Earth',
    hero_search_btn: 'Search',
    stats_countries: 'Countries',
    stats_dest:      'Destinations',
    stats_cont:      'Continents',
    nav_world:       'World Map',
    world_map_title: 'Click the map to explore',
    world_map_hint:  'Blue countries have full coverage — click to visit',
    browse_cont:     'Start Exploring',
    continent_intro: 'Choose a continent to begin your journey',
    enter_world_map: 'Explore World Map',
    enter_continents:'Browse Continents',
    cont_map_title:  'Map Overview',
    no_countries:    'No countries covered yet',
    countries_in:    'Countries',
    view_country:    'Country Details',
    view_dest:       'Attractions',
    subdivisions:    'States / Provinces',
    cc_notice:       '© 2026 Stevens. Original content licensed under CC BY-NC-SA 4.0. Commercial use prohibited.',
    footer_home:     'Home',
    footer_about:    'About',
    no_dest:         'No destinations available',
    filter_all:      'All',
    map_title:       'Destination Map',
    fetch_err_title: 'Local server required',
    fetch_err_body:  'Run the following in the project folder, then refresh:',
    fetch_err_note:  'Then open',
    continent_label: 'Continent',
    country_label:   'Country',
  }
};

let LANG = localStorage.getItem('sv-lang') || 'zh';
function t(key) { return (I18N[LANG] || I18N.zh)[key] || key; }
function setLang(l) {
  LANG = l;
  localStorage.setItem('sv-lang', l);
  document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
}
function tx(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[LANG] || obj.zh || obj.en || '';
}

// ── URL helpers ────────────────────────────────────────
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name) || '';
}
function buildUrl(page, params = {}) {
  const q = new URLSearchParams(params).toString();
  return page + (q ? '?' + q : '');
}

// ── Index data (always available synchronously) ────────
function idx() { return window.DB_INDEX || { continents: [], countries: {}, isoMap: {} }; }

// ── Fetch helpers ──────────────────────────────────────
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json();
}

function buildFetchError(err) {
  if (location.protocol === 'file:') {
    return `
      <div class="fetch-error">
        <div class="fetch-error-icon">⚠️</div>
        <h3>${t('fetch_err_title')}</h3>
        <p>${t('fetch_err_body')}</p>
        <code>python -m http.server 8000</code>
        <p>${t('fetch_err_note')} <a href="http://localhost:8000" target="_blank">http://localhost:8000</a></p>
      </div>`;
  }
  return `<div class="empty">加载失败 / Failed to load: ${err.message}</div>`;
}

// ── Coordinate helpers ─────────────────────────────────
function destCoords(id) { return window.DB_COORDS?.destinations?.[id] || null; }
function countryMapMeta(id) { return window.DB_COORDS?.countries?.[id] || { center: [20, 0], zoom: 2 }; }
function subMapMeta(cid, sub) {
  return window.DB_COORDS?.subdivisions?.[`${cid}-${sub}`] || countryMapMeta(cid);
}

// ── Destination map ────────────────────────────────────
let _map = null, _mapMarkers = [];

function destroyMap() {
  if (_map) { _map.remove(); _map = null; }
  _mapMarkers = [];
}

function buildMap(containerId, dests, center, zoom) {
  destroyMap();
  if (!window.L) return;
  const el = document.getElementById(containerId);
  if (!el) return;

  _map = L.map(containerId, { scrollWheelZoom: false });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(_map);

  const validCoords = [];
  dests.forEach(dest => {
    const coords = destCoords(dest.id);
    if (!coords) return;
    const name = tx(dest.name), loc = tx(dest.location), img = dest.image || '';
    const popup = `
      <div style="width:180px;font-family:system-ui,sans-serif">
        <img src="${img}" alt="${name}"
             style="width:100%;height:90px;object-fit:cover;border-radius:6px;margin-bottom:6px;display:block"
             onerror="this.style.display='none'">
        <strong style="font-size:13px;line-height:1.3;display:block">${name}</strong>
        <span style="color:#64748b;font-size:12px">📍 ${loc}</span>
      </div>`;
    const marker = L.marker(coords).bindPopup(popup, { maxWidth: 210 }).addTo(_map);
    _mapMarkers.push({ marker, dest });
    validCoords.push(coords);
  });

  if (validCoords.length > 1) _map.fitBounds(validCoords, { padding: [40, 40] });
  else if (validCoords.length === 1) _map.setView(validCoords[0], 10);
  else _map.setView(center, zoom);
}

function filterMap(sub) {
  if (!_map) return;
  const visible = [];
  _mapMarkers.forEach(({ marker, dest }) => {
    const show = sub === 'all' || !dest.subdivision || dest.subdivision === sub;
    if (show) { if (!_map.hasLayer(marker)) marker.addTo(_map); const c = destCoords(dest.id); if (c) visible.push(c); }
    else       { if (_map.hasLayer(marker)) _map.removeLayer(marker); }
  });
  if (visible.length > 1) _map.fitBounds(visible, { padding: [40, 40] });
  else if (visible.length === 1) _map.setView(visible[0], 10);
}

// ── World map ──────────────────────────────────────────
let _worldMap = null;

function fixAntimeridian(geojson) {
  function fixCoord(c) { while (c[0] > 180) c[0] -= 360; while (c[0] < -180) c[0] += 360; }
  function fixRing(r) { r.forEach(fixCoord); }
  function fixGeom(g) {
    if (!g) return;
    if (g.type === 'Polygon') g.coordinates.forEach(fixRing);
    else if (g.type === 'MultiPolygon') g.coordinates.forEach(p => p.forEach(fixRing));
  }
  (geojson.features || []).forEach(f => fixGeom(f.geometry));
  return geojson;
}

async function buildWorldMap(containerId) {
  const el = document.getElementById(containerId);
  if (!el || !window.L) return;

  if (!window.topojson) {
    el.innerHTML = `<div class="empty" style="padding:3rem">
      ${LANG==='zh'
        ? '世界地图库加载失败，请检查网络连接后刷新页面'
        : 'World map library failed to load — check your connection and refresh'}
    </div>`;
    return;
  }

  _worldMap = L.map(containerId, {
    center: [20, 0], zoom: 2,
    minZoom: 1, maxZoom: 6,
    scrollWheelZoom: true,
    zoomControl: true,
    worldCopyJump: false,
    renderer: L.svg(),
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
    opacity: 0.35,
  }).addTo(_worldMap);

  const { isoMap, countries: countriesMeta } = idx();

  const S_COVERED = { color: '#1d4ed8', weight: 1, fillColor: '#3b82f6', fillOpacity: 0.5 };
  const S_HOVER   = { color: '#1e3a8a', weight: 2, fillColor: '#1d4ed8', fillOpacity: 0.75 };

  let worldData;
  try {
    worldData = await fetchJSON('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
  } catch {
    el.innerHTML = `<div class="empty" style="padding:3rem">${LANG==='zh'?'世界地图需要网络连接':'World map requires network access'}</div>`;
    return;
  }

  // Only render our covered countries — avoids all antimeridian artifacts from
  // Russia, Fiji, etc. whose polygons cross ±180° and produce horizontal lines
  // in Leaflet. The OSM tile layer already shows uncovered countries.
  const allFeatures = topojson.feature(worldData, worldData.objects.countries);
  const coveredFeatures = {
    type: 'FeatureCollection',
    features: allFeatures.features.filter(f => isoMap[String(f.id)])
  };

  L.geoJSON(coveredFeatures, {
    style: () => S_COVERED,
    onEachFeature: (f, layer) => {
      const cid = isoMap[String(f.id)];
      const meta = countriesMeta[cid];

      layer.on('mouseover', e => {
        layer.setStyle(S_HOVER);
        layer.bindTooltip(`${meta.flag || ''} ${tx(meta.name)}`, {
          sticky: true, className: 'world-tooltip', direction: 'top'
        }).openTooltip(e.latlng);
      });
      layer.on('mouseout', () => {
        layer.setStyle(S_COVERED);
        layer.closeTooltip();
      });
      layer.on('click', () => {
        window.location.href = `country.html?id=${cid}`;
      });

      layer.options.className = 'covered-country';
    }
  }).addTo(_worldMap);
}

// ── Page: World ────────────────────────────────────────
async function initWorld() {
  const root = document.getElementById('root');
  root.innerHTML = `
    <section class="hero hero-small">
      <img class="hero-img" src="https://picsum.photos/seed/world-map-hero/1600/600" alt=""
           onerror="this.style.background='linear-gradient(135deg,#1e3a8a,#1d4ed8)'">
      <div class="hero-content">
        <h1>${t('nav_world')}</h1>
        <p>${t('world_map_hint')}</p>
      </div>
    </section>
    <div class="world-page-wrap">
      <div id="world-map" class="world-page-map"></div>
    </div>`;
  await buildWorldMap('world-map');
}

// ── Search ─────────────────────────────────────────────
function getSearchResults(query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results = [];
  const { continents, countries } = idx();

  for (const c of (continents || [])) {
    const hay = `${c.name.zh} ${c.name.en}`.toLowerCase();
    if (hay.includes(q)) {
      results.push({
        type: 'continent',
        icon: '🌍',
        primary: tx(c.name),
        secondary: t('continent_label'),
        href: `continent.html?id=${c.id}`
      });
    }
  }
  for (const [id, c] of Object.entries(countries || {})) {
    const hay = `${c.name.zh} ${c.name.en} ${c.capital?.zh||''} ${c.capital?.en||''}`.toLowerCase();
    if (hay.includes(q)) {
      results.push({
        type: 'country',
        icon: c.flag || '🏳️',
        primary: tx(c.name),
        secondary: `${t('country_label')} · ${c.continent}`,
        href: `country.html?id=${id}`
      });
    }
  }
  return results.slice(0, 8);
}

function renderDropdown(results, dropEl) {
  if (!results.length) {
    dropEl.innerHTML = `<div class="search-no-result">${t('search_no')}</div>`;
    dropEl.classList.add('open');
    return;
  }
  dropEl.innerHTML = results.map(r => `
    <a class="search-item" href="${r.href}">
      <span class="search-icon">${r.icon}</span>
      <span class="search-text">
        <span class="search-primary">${r.primary}</span>
        <span class="search-secondary">${r.secondary}</span>
      </span>
    </a>`).join('');
  dropEl.classList.add('open');
}

function wireSearch(inputId, dropId) {
  const input = document.getElementById(inputId);
  const drop  = document.getElementById(dropId);
  if (!input || !drop) return;

  input.addEventListener('input', () => {
    const q = input.value;
    if (!q.trim()) { drop.classList.remove('open'); drop.innerHTML = ''; return; }
    renderDropdown(getSearchResults(q), drop);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const first = drop.querySelector('.search-item');
      if (first) window.location.href = first.getAttribute('href');
    }
    if (e.key === 'Escape') { drop.classList.remove('open'); input.blur(); }
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !drop.contains(e.target)) {
      drop.classList.remove('open');
    }
  });
}

// ── Header / Footer builders ───────────────────────────
function buildHeader() {
  const links = [
    { href: 'index.html',     key: 'nav_home' },
    { href: 'world.html',     key: 'nav_world' },
    { href: 'continent.html', key: 'nav_continents' },
    { href: 'about.html',     key: 'nav_about' },
  ];
  return `
    <header class="site-header">
      <nav class="nav-inner">
        <a class="nav-logo" href="index.html">
          <span class="logo-icon">🌍</span>
          <span>${t('site_name')}</span>
        </a>
        <ul class="nav-links">
          ${links.map(p => `<li><a href="${p.href}">${t(p.key)}</a></li>`).join('')}
        </ul>
        <div class="nav-search">
          <div class="search-wrap">
            <input class="search-input" id="navSearch" type="text"
                   placeholder="${t('search_ph')}" autocomplete="off" spellcheck="false">
            <div class="search-drop" id="navDrop"></div>
          </div>
        </div>
        <div class="nav-actions">
          <button class="lang-btn" id="langBtn">${t('lang_toggle')}</button>
        </div>
      </nav>
    </header>`;
}

function buildFooter() {
  return `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-links">
          <a href="index.html">${t('footer_home')}</a>
          <a href="about.html">${t('footer_about')}</a>
        </div>
        <p>${t('cc_notice')}</p>
      </div>
    </footer>`;
}

function buildBreadcrumb(items) {
  return `<div class="breadcrumb">${items.map((it, i) =>
    i < items.length - 1
      ? `<a href="${it.href}">${it.label}</a><span class="sep">/</span>`
      : `<span>${it.label}</span>`
  ).join('')}</div>`;
}

function buildLoading() {
  return `<div class="loading"><div class="spinner"></div><span>${t('loading')}</span></div>`;
}

// ── Card builders ──────────────────────────────────────
function buildContinentCard(c) {
  const { continents: _, countries: ctrs } = idx();
  const count = (c.countries || []).filter(id => ctrs[id]).length;
  return `
    <a class="card" href="${buildUrl('continent.html', { id: c.id })}">
      <img class="card-img" src="${c.image}" alt="${tx(c.name)}" loading="lazy"
           onerror="this.src='https://picsum.photos/seed/${c.id}/800/400'">
      <div class="card-body">
        <div class="card-title">${tx(c.name)}</div>
        <div class="card-desc">${tx(c.description)}</div>
        <div class="card-stats">
          <span class="stat-badge">${count} ${t('countries')}</span>
          <span class="stat-badge">${tx(c.stats.population)}</span>
        </div>
      </div>
      <div class="card-footer">
        <span>${t('explore')}</span><span class="arrow">→</span>
      </div>
    </a>`;
}

function buildCountryCard(id, meta) {
  return `
    <div class="card">
      <img class="card-img" src="${meta.coverImage}" alt="${tx(meta.name)}" loading="lazy"
           onerror="this.src='https://picsum.photos/seed/${id}/800/400'">
      <div class="card-body">
        <div class="card-title">${meta.flag} ${tx(meta.name)}</div>
        <div class="card-subtitle">${t('fact_cap')}: ${tx(meta.capital)}</div>
        <div class="card-desc">${tx(meta.brief)}</div>
      </div>
      <div class="card-footer">
        <a href="${buildUrl('country.html', { id })}" style="color:inherit">${t('view_country')}</a>
        <a href="${buildUrl('destinations.html', { id })}" style="color:inherit">${t('view_dest')}</a>
      </div>
    </div>`;
}

function buildDestCard(d) {
  const tags = (d.tags ? (d.tags[LANG] || d.tags.zh || []) : [])
    .map(tag => `<span class="tag">${tag}</span>`).join('');
  return `
    <div class="dest-card">
      <img class="dest-img" src="${d.image}" alt="${tx(d.name)}" loading="lazy"
           onerror="this.src='https://picsum.photos/seed/${d.id}/800/500'">
      <div class="dest-body">
        <div class="dest-title">${tx(d.name)}</div>
        <div class="dest-location">📍 ${tx(d.location)}</div>
        <div class="dest-desc">${tx(d.description)}</div>
        <div class="dest-tags">${tags}</div>
      </div>
    </div>`;
}

function renderDests(dests, sub) {
  const filtered = sub === 'all' ? dests : dests.filter(d => !d.subdivision || d.subdivision === sub);
  if (!filtered.length) return `<div class="empty">${t('no_dest')}</div>`;
  return `<div class="grid grid-3">${filtered.map(buildDestCard).join('')}</div>`;
}

// ── Language toggle ────────────────────────────────────
function wireLangToggle() {
  const btn = document.getElementById('langBtn');
  if (btn) btn.addEventListener('click', () => {
    setLang(LANG === 'zh' ? 'en' : 'zh');
    location.reload();
  });
}

// ── Page: Index ────────────────────────────────────────
function initIndex() {
  const root = document.getElementById('root');
  const { continents, countries } = idx();
  const totalCountries = Object.keys(countries).length;
  const totalContinents = continents.length;

  root.innerHTML = `
    <section class="hero">
      <img class="hero-img" src="https://picsum.photos/seed/world-hero/1600/700" alt="world"
           onerror="this.style.background='linear-gradient(135deg,#1e3a8a,#1d4ed8)'">
      <div class="hero-content">
        <h1>${t('hero_sub')}</h1>
        <p>${t('hero_desc')}</p>
        <div class="hero-search-wrap">
          <div class="search-wrap hero-search">
            <input class="search-input" id="heroSearch" type="text"
                   placeholder="${t('search_ph')}" autocomplete="off" spellcheck="false">
            <div class="search-drop" id="heroDrop"></div>
          </div>
        </div>
      </div>
    </section>

    <div class="stats-strip">
      <div class="stats-inner">
        <div class="stat-item"><div class="num">${totalContinents}</div><div class="lbl">${t('stats_cont')}</div></div>
        <div class="stat-item"><div class="num">${totalCountries}</div><div class="lbl">${t('stats_countries')}</div></div>
        <div class="stat-item"><div class="num">83</div><div class="lbl">${t('stats_dest')}</div></div>
      </div>
    </div>

    <div class="container">
      <section class="section">
        <h2 class="section-title">${t('browse_cont')}</h2>
        <p class="text-muted mb-3">${t('continent_intro')}</p>
        <div class="entry-cards">
          <a class="entry-card" href="world.html">
            <div class="entry-card-icon">🗺️</div>
            <div class="entry-card-body">
              <div class="entry-card-title">${t('enter_world_map')}</div>
              <div class="entry-card-desc">${t('world_map_hint')}</div>
            </div>
            <span class="entry-card-arrow">→</span>
          </a>
          <a class="entry-card" href="continent.html">
            <div class="entry-card-icon">🌍</div>
            <div class="entry-card-body">
              <div class="entry-card-title">${t('enter_continents')}</div>
              <div class="entry-card-desc">${t('continent_intro')}</div>
            </div>
            <span class="entry-card-arrow">→</span>
          </a>
        </div>
      </section>
    </div>`;

  wireSearch('heroSearch', 'heroDrop');
}

// ── Continent map ──────────────────────────────────────
function buildContinentMap(contId, containerId) {
  if (!window.L) return;
  const el = document.getElementById(containerId);
  if (!el) return;

  const meta = window.DB_COORDS?.continents?.[contId] || { center: [20, 0], zoom: 2 };
  const { continents, countries } = idx();
  const cont = continents.find(c => c.id === contId);

  const cmap = L.map(containerId, { scrollWheelZoom: false });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(cmap);
  cmap.setView(meta.center, meta.zoom);

  (cont?.countries || []).forEach(cid => {
    const cm = countries[cid];
    const coords = window.DB_COORDS?.countries?.[cid];
    if (!cm || !coords) return;
    const popup = `
      <div style="text-align:center;font-family:system-ui,sans-serif;min-width:110px">
        <div style="font-size:1.8rem;line-height:1.3">${cm.flag}</div>
        <strong style="font-size:13px;display:block;margin:.3rem 0">${tx(cm.name)}</strong>
        <a href="country.html?id=${cid}"
           style="font-size:11px;color:#1d4ed8;font-weight:600">${t('view_country')}</a>
      </div>`;
    L.marker(coords.center).bindPopup(popup, { maxWidth: 160 }).addTo(cmap);
  });
}

// ── Page: Continent ────────────────────────────────────
function initContinent() {
  const id   = getParam('id');
  const root = document.getElementById('root');
  const { continents, countries } = idx();

  if (!id) {
    root.innerHTML = `
      <section class="hero hero-small">
        <img class="hero-img" src="https://picsum.photos/seed/continents-page/1600/600" alt="">
        <div class="hero-content"><h1>${t('nav_continents')}</h1></div>
      </section>
      <div class="container"><div class="section">
        <div class="grid grid-3">${continents.map(buildContinentCard).join('')}</div>
      </div></div>`;
    return;
  }

  const cont = continents.find(c => c.id === id);
  if (!cont) { root.innerHTML = `<div class="empty">${t('not_found')}</div>`; return; }

  const countryList = (cont.countries || []).map(cid => ({ id: cid, meta: countries[cid] })).filter(x => x.meta);

  root.innerHTML = `
    <section class="hero hero-small">
      <img class="hero-img" src="${cont.image}" alt="${tx(cont.name)}"
           onerror="this.src='https://picsum.photos/seed/${cont.id}/1600/600'">
      <div class="hero-content">
        <h1>${tx(cont.name)}</h1>
        <p>${tx(cont.description).slice(0, 120)}…</p>
      </div>
    </section>
    <div class="container">
      ${buildBreadcrumb([
        { href: 'index.html',     label: t('nav_home') },
        { href: 'continent.html', label: t('nav_continents') },
        { href: '#',              label: tx(cont.name) },
      ])}
      <section class="section" style="padding-bottom:0">
        <h2 class="section-title">${t('cont_map_title')}</h2>
        <div id="continent-map" class="continent-map-container"></div>
      </section>
      <section class="section">
        <h2 class="section-title">${tx(cont.name)} — ${t('countries_in')}: ${countryList.length}</h2>
        ${countryList.length
          ? `<div class="grid grid-3">${countryList.map(({ id, meta }) => buildCountryCard(id, meta)).join('')}</div>`
          : `<div class="empty">${t('no_countries')}</div>`}
      </section>
    </div>`;

  buildContinentMap(id, 'continent-map');
}

// ── Page: Country ──────────────────────────────────────
async function initCountry() {
  const id   = getParam('id');
  const root = document.getElementById('root');
  const { countries } = idx();
  const meta = countries[id];

  if (!meta) { root.innerHTML = `<div class="empty">${t('not_found')}</div>`; return; }

  // Show hero immediately with slim index data
  root.innerHTML = `
    <section class="hero hero-small">
      <img class="hero-img" src="${meta.coverImage}" alt="${tx(meta.name)}"
           onerror="this.src='https://picsum.photos/seed/${id}/1600/500'">
      <div class="hero-content">
        <div style="font-size:3.5rem;line-height:1">${meta.flag}</div>
        <h1>${tx(meta.name)}</h1>
        <p>${t('fact_cap')}: ${tx(meta.capital)}</p>
      </div>
    </section>
    <div class="container">
      ${buildBreadcrumb([
        { href: 'index.html', label: t('nav_home') },
        { href: buildUrl('continent.html', { id: meta.continent }), label: meta.continent },
        { href: '#', label: tx(meta.name) },
      ])}
      <div id="country-detail">${buildLoading()}</div>
    </div>`;

  // Fetch full country data
  let detail;
  try {
    detail = await fetchJSON(`data/countries/${id}.json`);
  } catch (e) {
    document.getElementById('country-detail').innerHTML = buildFetchError(e);
    return;
  }

  const tabs = [
    { key: 'tab_geo', field: 'geography'  },
    { key: 'tab_his', field: 'history'    },
    { key: 'tab_eco', field: 'economy'    },
    { key: 'tab_pop', field: 'population' },
    { key: 'tab_cul', field: 'culture'    },
  ];

  const subSection = meta.isLarge && meta.subdivisions ? `
    <section class="section">
      <h2 class="section-title">${t('subdivisions')}</h2>
      <div class="subdivision-grid">
        ${Object.entries(meta.subdivisions).map(([sid, s]) => `
          <a class="sub-card" href="${buildUrl('destinations.html', { id, sub: sid })}">
            <span class="emoji">${s.emoji || '📍'}</span>
            <span class="sub-name">${tx(s.name)}</span>
          </a>`).join('')}
      </div>
    </section>` : '';

  document.getElementById('country-detail').innerHTML = `
    <div class="quick-facts">
      ${[
        [t('fact_area'), tx(detail.quickFacts?.area)],
        [t('fact_pop'),  tx(detail.quickFacts?.population)],
        [t('fact_lang'), tx(detail.quickFacts?.language)],
        [t('fact_cur'),  tx(detail.quickFacts?.currency)],
        [t('fact_tz'),   detail.quickFacts?.timezone || ''],
        [t('fact_cap'),  tx(meta.capital)],
      ].map(([lbl, val]) => `
        <div class="fact-item">
          <div class="fact-label">${lbl}</div>
          <div class="fact-value">${val}</div>
        </div>`).join('')}
    </div>

    <div class="section" style="padding-top:0;padding-bottom:1rem">
      <a class="btn btn-accent" href="${buildUrl('destinations.html', { id })}">
        ${t('dest_btn')}
      </a>
    </div>

    <section class="section" style="padding-top:0">
      <div class="tabs" id="tabBar">
        ${tabs.map((tb, i) =>
          `<button class="tab-btn${i===0?' active':''}" data-tab="${tb.field}">${t(tb.key)}</button>`
        ).join('')}
      </div>
      ${tabs.map((tb, i) =>
        `<div class="tab-panel${i===0?' active':''}" id="panel-${tb.field}">
           <p class="info-text">${tx(detail.info?.[tb.field])}</p>
         </div>`
      ).join('')}
    </section>

    <section class="section map-section" style="padding-top:0">
      <h2 class="section-title">${t('map_title')}</h2>
      <div id="leaflet-map" class="map-container"></div>
    </section>

    ${subSection}`;

  // Wire tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('panel-' + btn.dataset.tab)?.classList.add('active');
    });
  });

  // Load destinations for the map
  try {
    let dests = [];
    if (meta.isLarge && meta.subdivisions) {
      const subs = Object.keys(meta.subdivisions);
      const results = await Promise.all(
        subs.map(s => fetchJSON(`data/destinations/${id}-${s}.json`).catch(() => []))
      );
      dests = results.flat();
    } else {
      dests = await fetchJSON(`data/destinations/${id}.json`).catch(() => []);
    }
    const mapMeta = countryMapMeta(id);
    buildMap('leaflet-map', dests, mapMeta.center, mapMeta.zoom);
  } catch { /* map fails silently */ }
}

// ── Page: Destinations ─────────────────────────────────
async function initDestinations() {
  const id   = getParam('id');
  const sub  = getParam('sub');
  const root = document.getElementById('root');
  const { countries } = idx();
  const meta = countries[id];

  if (!meta) { root.innerHTML = `<div class="empty">${t('not_found')}</div>`; return; }

  const activeSub = sub || 'all';
  const heroTitle = (sub && meta.subdivisions?.[sub])
    ? `${meta.flag} ${tx(meta.subdivisions[sub].name)}`
    : `${meta.flag} ${tx(meta.name)}`;

  // Build filter bar for large countries
  let filterBar = '';
  if (meta.isLarge && meta.subdivisions) {
    const btns = [
      `<button class="filter-btn${activeSub==='all'?' active':''}" data-sub="all">${t('filter_all')}</button>`,
      ...Object.entries(meta.subdivisions).map(([sid, s]) =>
        `<button class="filter-btn${activeSub===sid?' active':''}" data-sub="${sid}">${tx(s.name)}</button>`)
    ].join('');
    filterBar = `<div class="filter-bar" id="filterBar">${btns}</div>`;
  }

  root.innerHTML = `
    <section class="hero hero-small">
      <img class="hero-img"
           src="https://picsum.photos/seed/${id}${sub?'-'+sub:''}/1600/500"
           alt="${heroTitle}"
           onerror="this.src='${meta.coverImage}'">
      <div class="hero-content">
        <h1>${heroTitle}</h1>
        <p>${t('dest_title')}</p>
      </div>
    </section>
    <div class="container">
      ${buildBreadcrumb([
        { href: 'index.html', label: t('nav_home') },
        { href: buildUrl('continent.html', { id: meta.continent }), label: meta.continent },
        { href: buildUrl('country.html', { id }), label: tx(meta.name) },
        { href: '#', label: t('dest_title') },
      ])}
      ${filterBar}
      <section class="section map-section" style="padding-top:${filterBar?'0':'2rem'}">
        <h2 class="section-title">${t('map_title')}</h2>
        <div id="leaflet-map" class="map-container"></div>
      </section>
      <div id="destGrid">${buildLoading()}</div>
    </div>`;

  // Load all destination data
  let allDests = [];
  try {
    if (meta.isLarge && meta.subdivisions) {
      const subs = Object.keys(meta.subdivisions);
      const results = await Promise.all(
        subs.map(s => fetchJSON(`data/destinations/${id}-${s}.json`).catch(() => []))
      );
      allDests = results.flat();
    } else {
      allDests = await fetchJSON(`data/destinations/${id}.json`);
    }
  } catch (e) {
    document.getElementById('destGrid').innerHTML = buildFetchError(e);
    return;
  }

  // Render destination grid
  document.getElementById('destGrid').innerHTML = renderDests(allDests, activeSub);

  // Build map
  const mapMeta = sub ? subMapMeta(id, sub) : countryMapMeta(id);
  const initDests = activeSub === 'all' ? allDests
    : allDests.filter(d => !d.subdivision || d.subdivision === activeSub);
  buildMap('leaflet-map', initDests, mapMeta.center, mapMeta.zoom);

  // Wire filter buttons
  if (meta.isLarge) {
    document.querySelectorAll('#filterBar .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#filterBar .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const s = btn.dataset.sub;
        document.getElementById('destGrid').innerHTML = renderDests(allDests, s);
        filterMap(s);
        if (s !== 'all') {
          const sm = subMapMeta(id, s);
          _map && _map.setView(sm.center, sm.zoom);
        }
      });
    });
  }
}

// ── Bootstrap ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setLang(LANG);

  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) { headerEl.insertAdjacentHTML('afterend', buildHeader()); headerEl.remove(); }
  if (footerEl) { footerEl.insertAdjacentHTML('afterend', buildFooter()); footerEl.remove(); }

  wireLangToggle();
  wireSearch('navSearch', 'navDrop');

  const page = document.body.dataset.page;
  if (page === 'index')        initIndex();
  if (page === 'world')        initWorld();
  if (page === 'continent')    initContinent();
  if (page === 'country')      initCountry();
  if (page === 'destinations') initDestinations();
});
