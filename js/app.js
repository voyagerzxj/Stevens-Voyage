/* =====================================================
   app.js — Steven Voyage v2
   Index data : window.DB_INDEX (data/index.js, sync)
   Detail data: fetch()         (data/countries/*.json)
   Dest data  : fetch()         (data/destinations/*.json)
   World map  : Leaflet + world-atlas TopoJSON (index page)
   Search     : navbar + hero   (filters DB_INDEX)
   ===================================================== */

// ── Language ───────────────────────────────────────────
const I18N = {
  zh: {
    site_name:       'Steven环球旅行',
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
    nav_journal:     '游记',
    journal_subtitle:'记录每一段旅途',
    journal_empty:   '暂无游记，敬请期待',
    journal_read:    '阅读全文',
    tip_label:       '旅行贴士',
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
    cc_notice:       '© 2026 Steven. 本站原创内容采用 CC BY-NC-SA 4.0 协议进行许可。未经授权，禁止用于商业用途。',
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
    modal_highlights:'亮点',
    modal_admission: '门票',
    modal_duration:  '建议游览时长',
    modal_tips:      '旅行小贴士',
    nav_footprint:   '足迹',
    footprint_title: '旅行足迹',
    footprint_visited:'已到访',
    footprint_wish:  '心愿单',
    footprint_stats: '已踏上 {c} 个国家 · {n} 个大洲',
    share_title:     '分享',
    share_copy:      '复制链接',
    share_copied:    '已复制！',
    share_weibo:     '微博',
    share_wechat:    '微信',
    share_xhs:       '小红书',
    share_wechat_tip:'用微信扫一扫分享此页面',
    share_xhs_copied:'链接已复制！打开小红书 → 发布笔记 → 粘贴链接',
    cuisine_title:   '特色美食',
    besttime_title:  '最佳旅游时间',
    besttime_opt:    '最佳',
    besttime_good:   '适合',
    besttime_avoid:  '避免',
    comment_title:   '评论',
    months_short:    ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    search_journal:  '游记',
    search_dest:     '景点',
    theme_settings:  '主题设置',
    theme_brightness:'亮暗模式',
    theme_light:     '☀️ 浅色',
    theme_dark:      '🌙 深色',
    theme_system:    '💻 随系统',
    theme_palette:   '配色方案',
    palette_blue:    '深蓝',
    palette_green:   '翠绿',
    palette_purple:  '紫色',
    palette_rose:    '玫红',
    palette_amber:   '暖橙',
    footer_privacy:  '隐私政策',
    cookie_notice:   '本站使用 Cookie 进行流量统计（Google Analytics）及评论功能（Giscus）。继续浏览即表示同意。详见',
    cookie_policy_link: '隐私政策',
    cookie_accept:   '同意',
    cookie_dismiss:  '知道了',
    nav_risk:        '风险地图',
    risk_title:      '旅行风险地图',
    risk_extreme:    '极高风险',
    risk_high:       '高风险',
    risk_medium:     '中等风险',
    risk_low:        '低风险',
    risk_unknown:    '暂无数据',
    risk_disclaimer: '风险评级仅供参考，出行前请务必查阅目的地的官方旅行建议',
    risk_none:       '此风险等级暂无收录国家',
    nav_top:         '精选',
    top_title:       '值得一生必去的地方',
    top_subtitle:    '精心挑选的全球最令人叹为观止的目的地，每一处都令人难以忘怀',
    top_empty:       '暂无精选景点',
  },
  en: {
    site_name:       'Steven World Travel',
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
    nav_world:       'World',
    nav_journal:     'Journal',
    journal_subtitle:'Stories from the road',
    journal_empty:   'No posts yet — check back soon',
    journal_read:    'Read More',
    tip_label:       'Travel Tip',
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
    cc_notice:       '© 2026 Steven. Original content licensed under CC BY-NC-SA 4.0. Commercial use prohibited.',
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
    modal_highlights:'Highlights',
    modal_admission: 'Admission',
    modal_duration:  'Suggested Duration',
    modal_tips:      'Travel Tips',
    nav_footprint:   'Footprint',
    footprint_title: 'Travel Footprint',
    footprint_visited:'Visited',
    footprint_wish:  'Wishlist',
    footprint_stats: '{c} countries visited · {n} continents',
    share_title:     'Share',
    share_copy:      'Copy Link',
    share_copied:    'Copied!',
    share_weibo:     'Weibo',
    share_wechat:    'WeChat',
    share_xhs:       'Xiaohongshu',
    share_wechat_tip:'Scan with WeChat to share this page',
    share_xhs_copied:'Link copied! Open Xiaohongshu → New Post → Paste link',
    cuisine_title:   'Local Cuisine',
    besttime_title:  'Best Time to Visit',
    besttime_opt:    'Best',
    besttime_good:   'Good',
    besttime_avoid:  'Avoid',
    comment_title:   'Comments',
    months_short:    ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    search_journal:  'Journal',
    search_dest:     'Destination',
    theme_settings:  'Theme',
    theme_brightness:'Brightness',
    theme_light:     '☀️ Light',
    theme_dark:      '🌙 Dark',
    theme_system:    '💻 System',
    theme_palette:   'Color Palette',
    palette_blue:    'Blue',
    palette_green:   'Green',
    palette_purple:  'Purple',
    palette_rose:    'Rose',
    palette_amber:   'Amber',
    footer_privacy:  'Privacy',
    cookie_notice:   'This site uses cookies for analytics (Google Analytics) and comments (Giscus). By continuing you agree. See our',
    cookie_policy_link: 'Privacy Policy',
    cookie_accept:   'Accept',
    cookie_dismiss:  'Dismiss',
    nav_risk:        'Risk Map',
    risk_title:      'Travel Risk Map',
    risk_extreme:    'Extreme Risk',
    risk_high:       'High Risk',
    risk_medium:     'Medium Risk',
    risk_low:        'Low Risk',
    risk_unknown:    'No Data',
    risk_disclaimer: 'Risk ratings are for reference only. Always check official travel advisories before departure.',
    risk_none:       'No countries listed at this risk level',
    nav_top:         'Top Picks',
    top_title:       'Places Worth a Lifetime',
    top_subtitle:    'A handpicked collection of the world\'s most breathtaking destinations — each one unforgettable',
    top_empty:       'No picks yet',
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

// ── Theme ──────────────────────────────────────────────
let THEME   = localStorage.getItem('sv-theme')   || 'system';
let PALETTE = localStorage.getItem('sv-palette') || 'blue';

const PALETTES = [
  { id: 'blue',   color: '#1d4ed8' },
  { id: 'green',  color: '#059669' },
  { id: 'purple', color: '#7c3aed' },
  { id: 'rose',   color: '#e11d48' },
  { id: 'amber',  color: '#d97706' },
];

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function applyTheme(mode) {
  const resolved = mode === 'system' ? getSystemTheme() : mode;
  document.documentElement.setAttribute('data-theme', resolved);
}
function applyPalette(palette) {
  if (!palette || palette === 'blue') {
    document.documentElement.removeAttribute('data-palette');
  } else {
    document.documentElement.setAttribute('data-palette', palette);
  }
}
function setTheme(mode) {
  THEME = mode;
  localStorage.setItem('sv-theme', mode);
  applyTheme(mode);
  _updatePanel();
}
function setPalette(palette) {
  PALETTE = palette;
  localStorage.setItem('sv-palette', palette);
  applyPalette(palette);
  _updatePanel();
}
function _updatePanel() {
  document.querySelectorAll('.theme-mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.themeVal === THEME);
  });
  document.querySelectorAll('.palette-swatch').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.paletteVal === PALETTE);
  });
}
function initTheme() {
  applyTheme(THEME);
  applyPalette(PALETTE);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (THEME === 'system') applyTheme('system');
  });
}
function buildThemePanel() {
  if (document.getElementById('sv-theme-panel')) return;
  const panel = document.createElement('div');
  panel.id = 'sv-theme-panel';
  panel.className = 'theme-panel';
  panel.innerHTML = `
    <div class="theme-panel-hd">
      <span class="theme-panel-title">🎨 ${t('theme_settings')}</span>
      <button class="theme-panel-close" id="themePanelClose">✕</button>
    </div>
    <div class="theme-panel-sec">
      <div class="theme-panel-lbl">${t('theme_brightness')}</div>
      <div class="theme-mode-row">
        <button class="theme-mode-btn" data-theme-val="light">${t('theme_light')}</button>
        <button class="theme-mode-btn" data-theme-val="system">${t('theme_system')}</button>
        <button class="theme-mode-btn" data-theme-val="dark">${t('theme_dark')}</button>
      </div>
    </div>
    <div class="theme-panel-sec">
      <div class="theme-panel-lbl">${t('theme_palette')}</div>
      <div class="palette-row">
        ${PALETTES.map(p => `
          <div style="display:flex;flex-direction:column;align-items:center;gap:0">
            <button class="palette-swatch" data-palette-val="${p.id}"
                    style="background:${p.color}"
                    title="${t('palette_' + p.id)}"></button>
            <span class="palette-label">${t('palette_' + p.id)}</span>
          </div>`).join('')}
      </div>
    </div>`;
  document.body.appendChild(panel);

  document.getElementById('themePanelClose').addEventListener('click', () => panel.classList.remove('open'));
  panel.querySelectorAll('.theme-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => setTheme(btn.dataset.themeVal));
  });
  panel.querySelectorAll('.palette-swatch').forEach(btn => {
    btn.addEventListener('click', () => setPalette(btn.dataset.paletteVal));
  });
  _updatePanel();
}
function wireThemeToggle() {
  buildThemePanel();
  const trigger = document.getElementById('themeSettingsBtn');
  const panel   = document.getElementById('sv-theme-panel');
  if (trigger && panel) {
    trigger.addEventListener('click', e => {
      e.stopPropagation();
      panel.classList.toggle('open');
    });
  }
  document.addEventListener('click', e => {
    const p = document.getElementById('sv-theme-panel');
    if (p?.classList.contains('open') && !p.contains(e.target) && e.target.id !== 'themeSettingsBtn') {
      p.classList.remove('open');
    }
  });
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

  _map = L.map(containerId, {
    scrollWheelZoom: false,
    minZoom: 3,
    maxZoom: 16,
    maxBounds: [[-85, -180], [85, 180]],
    maxBoundsViscosity: 1.0,
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(_map);

  const validCoords = [];
  dests.forEach(dest => {
    const coords = destCoords(dest.id);
    if (!coords) return;
    const name = tx(dest.name), loc = tx(dest.location), img = dest.image || '';
    const scrollLabel = LANG === 'zh' ? '↓ 查看详情' : '↓ View Details';
    const popup = `
      <div style="width:180px;font-family:system-ui,sans-serif">
        <img src="${img}" alt="${name}"
             style="width:100%;height:90px;object-fit:cover;border-radius:6px;margin-bottom:6px;display:block"
             onerror="this.style.display='none'">
        <strong style="font-size:13px;line-height:1.3;display:block">${name}</strong>
        <span style="color:#64748b;font-size:12px">📍 ${loc}</span>
        <a href="#${dest.id}"
           onclick="document.getElementById('${dest.id}')?.scrollIntoView({behavior:'smooth',block:'start'});return false;"
           style="display:block;margin-top:6px;font-size:12px;color:var(--primary,#1d4ed8);font-weight:600">${scrollLabel}</a>
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
let _worldTopoCache = null;

// Unwrap coordinates that cross ±180° by adjusting each lon relative to its
// predecessor, eliminating the horizontal-line artifact Leaflet draws when a
// polygon ring jumps from +179° to -179° (e.g. Russia, Fiji).
function fixAntimeridian(feature) {
  const g = feature.geometry;
  if (!g) return feature;
  function fixRing(ring) {
    if (!ring.length) return ring;
    const out = [[...ring[0]]];
    for (let i = 1; i < ring.length; i++) {
      let lon = ring[i][0];
      const prev = out[i - 1][0];
      while (lon - prev >  180) lon -= 360;
      while (prev - lon >  180) lon += 360;
      out.push([lon, ring[i][1]]);
    }
    return out;
  }
  const fix = poly => poly.map(fixRing);
  const coords = g.type === 'MultiPolygon'
    ? g.coordinates.map(fix)
    : g.type === 'Polygon'
    ? fix(g.coordinates)
    : g.coordinates;
  return { ...feature, geometry: { ...g, coordinates: coords } };
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
    maxBounds: [[-85, -180], [85, 180]],
    maxBoundsViscosity: 1.0,
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
let _journalSearchCache = null;

async function preloadJournalIndex() {
  if (_journalSearchCache) return;
  try {
    _journalSearchCache = (await MD.fetch('data/journal/index.md')).meta;
  } catch { _journalSearchCache = []; }
}

function getSearchResults(query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results = [];
  const { continents, countries } = idx();

  for (const c of (continents || [])) {
    const hay = `${c.name.zh} ${c.name.en}`.toLowerCase();
    if (hay.includes(q)) {
      results.push({
        type: 'continent', icon: '🌍',
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
        type: 'country', icon: c.flag || '🏳️',
        primary: tx(c.name),
        secondary: `${t('country_label')} · ${c.continent}`,
        href: `country.html?id=${id}`
      });
    }
  }
  for (const p of (_journalSearchCache || [])) {
    const hay = `${p.title?.zh||''} ${p.title?.en||''} ${(p.tags?.zh||[]).join(' ')} ${(p.tags?.en||[]).join(' ')}`.toLowerCase();
    if (hay.includes(q)) {
      results.push({
        type: 'journal', icon: '📖',
        primary: tx(p.title),
        secondary: `${t('search_journal')} · ${p.date}`,
        href: `journal.html?id=${p.id}`
      });
    }
  }
  return results.slice(0, 10);
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

  input.addEventListener('focus', () => preloadJournalIndex(), { once: true });

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
    { href: 'index.html',      key: 'nav_home' },
    { href: 'world.html',      key: 'nav_world' },
    { href: 'continent.html',  key: 'nav_continents' },
    { href: 'top.html',        key: 'nav_top' },
    { href: 'journal.html',    key: 'nav_journal' },
    { href: 'footprint.html',  key: 'nav_footprint' },
    { href: 'risk.html',       key: 'nav_risk' },
    { href: 'about.html',      key: 'nav_about' },
  ];
  const linkItems = links.map(p => `<li><a href="${p.href}">${t(p.key)}</a></li>`).join('');
  const mobileLinkItems = links.map(p => `<li><a href="${p.href}">${t(p.key)}</a></li>`).join('');
  return `
    <header class="site-header">
      <nav class="nav-inner">
        <a class="nav-logo" href="index.html">
          <span class="nav-logo-text">STEVEN'S TRAVELS</span>
          <span class="nav-logo-slogan">晓看世界 骏行千里</span>
        </a>
        <ul class="nav-links">${linkItems}</ul>
        <div class="nav-search">
          <div class="search-wrap">
            <input class="search-input" id="navSearch" type="text"
                   placeholder="${t('search_ph')}" autocomplete="off" spellcheck="false">
            <div class="search-drop" id="navDrop"></div>
          </div>
        </div>
        <div class="nav-actions">
          <button class="theme-settings-btn" id="themeSettingsBtn" title="${t('theme_settings')}">🎨</button>
          <button class="lang-btn" id="langBtn">${t('lang_toggle')}</button>
          <button class="nav-hamburger" id="navHamburger" aria-label="Menu" aria-expanded="false">☰</button>
        </div>
      </nav>
      <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-search">
          <div class="search-wrap">
            <input class="search-input" id="mobileSearch" type="text"
                   placeholder="${t('search_ph')}" autocomplete="off" spellcheck="false">
            <div class="search-drop" id="mobileDrop"></div>
          </div>
        </div>
        <ul class="mobile-menu-links">${mobileLinkItems}</ul>
      </div>
    </header>`;
}

function buildFooter() {
  return `
    <footer class="site-footer">
      <div class="footer-inner">
        <img class="footer-logo" src="images/logo-vertical.png" alt="STEVEN'S TRAVELS">
        <div class="footer-links">
          <a href="index.html">${t('footer_home')}</a>
          <a href="about.html">${t('footer_about')}</a>
          <a href="privacy.html">${t('footer_privacy')}</a>
        </div>
        <p>${t('cc_notice')}</p>
      </div>
    </footer>`;
}

function initCookieBanner() {
  if (localStorage.getItem('sv-cookie-ok')) return;
  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.id = 'cookieBanner';
  banner.innerHTML = `
    <div class="cookie-banner-text">
      🍪 ${t('cookie_notice')} <a href="privacy.html">${t('cookie_policy_link')}</a>
    </div>
    <div class="cookie-banner-actions">
      <button class="cookie-accept-btn" id="cookieAccept">${t('cookie_accept')}</button>
      <button class="cookie-dismiss-btn" id="cookieDismiss">${t('cookie_dismiss')}</button>
    </div>`;
  document.body.appendChild(banner);
  const dismiss = () => {
    localStorage.setItem('sv-cookie-ok', '1');
    banner.style.animation = 'slideUpBanner .25s ease reverse';
    setTimeout(() => banner.remove(), 260);
  };
  document.getElementById('cookieAccept').addEventListener('click', dismiss);
  document.getElementById('cookieDismiss').addEventListener('click', dismiss);
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

// ── Destination modal ──────────────────────────────────
function ensureDestModal() {
  if (document.getElementById('dest-modal')) return;
  const el = document.createElement('div');
  el.id = 'dest-modal';
  el.className = 'dest-modal-overlay';
  el.innerHTML = `
    <div class="dest-modal" id="destModalBox">
      <button class="dest-modal-close" id="destModalClose" aria-label="Close">✕</button>
      <img class="dest-modal-img" id="destModalImg" src="" alt="">
      <div class="dest-modal-body">
        <div class="dest-modal-title" id="destModalTitle"></div>
        <div class="dest-modal-loc"   id="destModalLoc"></div>
        <div class="dest-modal-desc"  id="destModalDesc"></div>
        <div id="destModalExtra"></div>
        <div class="dest-modal-tags"  id="destModalTags"></div>
      </div>
    </div>`;
  document.body.appendChild(el);
  el.addEventListener('click', e => { if (e.target === el) closeDestModal(); });
  document.getElementById('destModalClose').addEventListener('click', closeDestModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDestModal(); });
}

function showDestModal(d) {
  ensureDestModal();
  const tags = (d.tags ? (d.tags[LANG] || d.tags.zh || []) : [])
    .map(tag => `<span class="tag">${tag}</span>`).join('');
  document.getElementById('destModalImg').src       = d.image || '';
  document.getElementById('destModalImg').alt       = tx(d.name);
  document.getElementById('destModalTitle').textContent = tx(d.name);
  document.getElementById('destModalLoc').innerHTML = `📍 ${tx(d.location)}`;
  document.getElementById('destModalDesc').textContent  = tx(d.description);

  // Build extra enriched content
  let extra = '';
  if (d.highlights) {
    const items = tx(d.highlights);
    if (Array.isArray(items) && items.length) {
      extra += `<div class="dest-modal-section">
        <div class="dest-modal-section-label">${t('modal_highlights')}</div>
        <ul class="dest-modal-hl">${items.map(h => `<li>${h}</li>`).join('')}</ul>
      </div>`;
    }
  }
  if (d.admission || d.duration) {
    extra += `<div class="dest-modal-facts">`;
    if (d.admission) extra += `<div class="dest-modal-fact"><span class="dest-modal-fact-label">🎟 ${t('modal_admission')}</span><span>${tx(d.admission)}</span></div>`;
    if (d.duration)  extra += `<div class="dest-modal-fact"><span class="dest-modal-fact-label">⏱ ${t('modal_duration')}</span><span>${tx(d.duration)}</span></div>`;
    extra += `</div>`;
  }
  if (d.tips) {
    extra += `<div class="dest-modal-tip-box">
      <div class="dest-modal-tip-label">💡 ${t('modal_tips')}</div>
      <div>${tx(d.tips)}</div>
    </div>`;
  }
  document.getElementById('destModalExtra').innerHTML = extra;

  document.getElementById('destModalTags').innerHTML    = tags;
  document.getElementById('destModalBox').scrollTop     = 0;
  document.getElementById('dest-modal').style.display   = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeDestModal() {
  const el = document.getElementById('dest-modal');
  if (el) el.style.display = 'none';
  document.body.style.overflow = '';
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
    <a class="card" href="${buildUrl('country.html', { id })}">
      <img class="card-img" src="${meta.coverImage}" alt="${tx(meta.name)}" loading="lazy"
           onerror="this.src='https://picsum.photos/seed/${id}/800/400'">
      <div class="card-body">
        <div class="card-title">${meta.flag} ${tx(meta.name)}</div>
        <div class="card-subtitle">${t('fact_cap')}: ${tx(meta.capital)}</div>
        <div class="card-desc">${tx(meta.brief)}</div>
      </div>
    </a>`;
}

function renderStars(rating) {
  if (!rating || rating < 1 || rating > 5) return '';
  const n = Math.round(rating);
  return `<div class="dest-rating" title="${n}/5">${'★'.repeat(n)}${'☆'.repeat(5 - n)}</div>`;
}

function buildDestEntry(d) {
  const tags = (d.tags ? (d.tags[LANG] || d.tags.zh || []) : [])
    .map(tag => `<span class="tag">${tag}</span>`).join('');

  let highlights = '';
  if (d.highlights) {
    const items = tx(d.highlights);
    if (Array.isArray(items) && items.length) {
      highlights = `<div class="dest-entry-section">
        <div class="dest-entry-section-label">${t('modal_highlights')}</div>
        <ul class="dest-entry-hl">${items.map(h => `<li>${h}</li>`).join('')}</ul>
      </div>`;
    }
  }

  let facts = '';
  if (d.admission || d.duration) {
    facts = `<div class="dest-entry-facts">
      ${d.admission ? `<span><strong>🎟 ${t('modal_admission')}</strong> ${tx(d.admission)}</span>` : ''}
      ${d.duration  ? `<span><strong>⏱ ${t('modal_duration')}</strong> ${tx(d.duration)}</span>`  : ''}
    </div>`;
  }

  const tips = d.tips ? `<div class="dest-entry-tip">💡 ${tx(d.tips)}</div>` : '';

  return `
    <div class="dest-entry" id="${d.id}">
      <div class="dest-entry-inner">
        <img class="dest-entry-img" src="${d.image || ''}" alt="${tx(d.name)}" loading="lazy"
             onerror="this.src='https://picsum.photos/seed/${d.id}/800/500'">
        <div class="dest-entry-content">
          <h2 class="dest-entry-title">${tx(d.name)}</h2>
          ${renderStars(d.rating)}
          <div class="dest-entry-meta">
            <span class="dest-entry-loc">📍 ${tx(d.location)}</span>
            ${tags}
          </div>
          <p class="dest-entry-desc">${tx(d.description)}</p>
          ${highlights}
          ${facts}
          ${tips}
        </div>
      </div>
    </div>`;
}

function renderDests(dests, sub) {
  const filtered = sub === 'all' ? dests : dests.filter(d => !d.subdivision || d.subdivision === sub);
  if (!filtered.length) return `<div class="empty">${t('no_dest')}</div>`;
  return `<div class="dest-list">${filtered.map(buildDestEntry).join('')}</div>`;
}

// ── Language toggle ────────────────────────────────────
function wireLangToggle() {
  const btn = document.getElementById('langBtn');
  if (btn) btn.addEventListener('click', () => {
    setLang(LANG === 'zh' ? 'en' : 'zh');
    location.reload();
  });
}

function wireMobileMenu() {
  const hamburger = document.getElementById('navHamburger');
  const menu      = document.getElementById('mobileMenu');
  if (!hamburger || !menu) return;

  hamburger.addEventListener('click', e => {
    e.stopPropagation();
    const open = menu.classList.toggle('open');
    hamburger.textContent = open ? '✕' : '☰';
    hamburger.setAttribute('aria-expanded', open);
  });

  document.addEventListener('click', e => {
    if (menu.classList.contains('open') &&
        !menu.contains(e.target) &&
        e.target !== hamburger) {
      menu.classList.remove('open');
      hamburger.textContent = '☰';
      hamburger.setAttribute('aria-expanded', false);
    }
  });

  wireSearch('mobileSearch', 'mobileDrop');
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
async function buildContinentMap(contId, containerId) {
  if (!window.L) return;
  const el = document.getElementById(containerId);
  if (!el) return;

  const meta = window.DB_COORDS?.continents?.[contId] || { center: [20, 0], zoom: 2 };
  const { continents, countries, isoMap } = idx();
  const cont = continents.find(c => c.id === contId);
  const contCountrySet = new Set(cont?.countries || []);

  const cmap = L.map(containerId, {
    scrollWheelZoom: false,
    zoomControl: true,
    minZoom: 2,
    maxZoom: 10,
    maxBounds: [[-85, -180], [85, 180]],
    maxBoundsViscosity: 1.0,
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
    opacity: 0.5,
  }).addTo(cmap);
  cmap.setView(meta.center, meta.zoom);

  if (!window.topojson) {
    _addContinentMarkers(cmap, cont, countries);
    return;
  }

  try {
    if (!_worldTopoCache) {
      _worldTopoCache = await fetchJSON('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    }

    const primary   = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()    || '#1d4ed8';
    const primaryDk = getComputedStyle(document.documentElement).getPropertyValue('--primary-dk').trim() || '#1e3a8a';

    const S_DEFAULT = { fillColor: primary,   fillOpacity: 0.55, color: '#fff', weight: 1.5 };
    const S_HOVER   = { fillColor: primaryDk, fillOpacity: 0.85, color: '#fff', weight: 2   };

    const allFeatures = topojson.feature(_worldTopoCache, _worldTopoCache.objects.countries);

    const layer = L.geoJSON(
      {
        type: 'FeatureCollection',
        features: allFeatures.features.filter(f => contCountrySet.has(isoMap?.[String(f.id)]))
      },
      {
        style: () => ({ ...S_DEFAULT }),
        onEachFeature(feature, lyr) {
          const cid = isoMap?.[String(feature.id)];
          const cm  = cid ? countries[cid] : null;
          if (!cm) return;
          lyr.bindTooltip(`${cm.flag || ''} ${tx(cm.name)}`, {
            sticky: true, className: 'world-tooltip', direction: 'top'
          });
          lyr.on('mouseover', e => { lyr.setStyle(S_HOVER); lyr.openTooltip(e.latlng); });
          lyr.on('mouseout',  () => { lyr.setStyle(S_DEFAULT); lyr.closeTooltip(); });
          lyr.on('click', () => { window.location.href = `country.html?id=${cid}`; });
        }
      }
    ).addTo(cmap);

    const bounds = layer.getBounds();
    if (bounds.isValid()) cmap.fitBounds(bounds, { padding: [30, 30] });
  } catch {
    _addContinentMarkers(cmap, cont, countries);
  }
}

function _addContinentMarkers(cmap, cont, countries) {
  (cont?.countries || []).forEach(cid => {
    const cm     = countries[cid];
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
  const { countries, continents } = idx();
  const meta = countries[id];

  if (!meta) { root.innerHTML = `<div class="empty">${t('not_found')}</div>`; return; }

  const contMeta = continents.find(c => c.id === meta.continent);
  const contLabel = contMeta ? tx(contMeta.name) : meta.continent;

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
        { href: buildUrl('continent.html', { id: meta.continent }), label: contLabel },
        { href: '#', label: tx(meta.name) },
      ])}
      <div id="country-detail">${buildLoading()}</div>
    </div>`;

  // Fetch full country data (markdown — rendered live)
  let detail;
  try {
    const doc = await MD.fetch(`data/countries/${id}.md`);
    const halves = MD.splitLang(doc.body);
    const zhSecs = MD.sections(halves.zh);
    const enSecs = MD.sections(halves.en);
    const info = {};
    ['geography', 'history', 'economy', 'population', 'culture'].forEach(f => {
      info[f] = { zh: MD.render(zhSecs[f] || ''), en: MD.render(enSecs[f] || '') };
    });
    detail = {
      quickFacts: doc.meta.quickFacts,
      cuisine: doc.meta.cuisine,
      bestTime: doc.meta.bestTime,
      info,
    };
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
           <div class="info-text">${tx(detail.info?.[tb.field])}</div>
         </div>`
      ).join('')}
    </section>

    ${buildCuisineSection(detail.cuisine)}
    ${buildBestTimeSection(detail.bestTime)}
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
}

// ── Page: Destinations ─────────────────────────────────
async function initDestinations() {
  const id   = getParam('id');
  const sub  = getParam('sub');
  const root = document.getElementById('root');
  const { countries, continents } = idx();
  const meta = countries[id];

  if (!meta) { root.innerHTML = `<div class="empty">${t('not_found')}</div>`; return; }

  const contMeta2 = continents.find(c => c.id === meta.continent);
  const contLabel2 = contMeta2 ? tx(contMeta2.name) : meta.continent;

  const isLargeOverview = !!(meta.isLarge && meta.subdivisions && !sub);
  const heroTitle = (sub && meta.subdivisions?.[sub])
    ? `${meta.flag} ${tx(meta.subdivisions[sub].name)}`
    : `${meta.flag} ${tx(meta.name)}`;

  // Filter bar: large country with a subdivision selected → navigation pills
  let filterBar = '';
  if (meta.isLarge && meta.subdivisions && sub) {
    const btns = Object.entries(meta.subdivisions).map(([sid, s]) =>
      `<button class="filter-btn${sub === sid ? ' active' : ''}" data-sub="${sid}">${tx(s.name)}</button>`)
      .join('');
    filterBar = `<div class="filter-bar" id="filterBar">${btns}</div>`;
  }

  // Breadcrumb — add subdivision level when a sub is selected
  const crumbs = [
    { href: 'index.html', label: t('nav_home') },
    { href: buildUrl('continent.html', { id: meta.continent }), label: contLabel2 },
    { href: buildUrl('country.html', { id }), label: tx(meta.name) },
  ];
  if (meta.isLarge && sub) {
    crumbs.push({ href: buildUrl('destinations.html', { id }), label: t('dest_title') });
    crumbs.push({ href: '#', label: tx(meta.subdivisions?.[sub]?.name) });
  } else {
    crumbs.push({ href: '#', label: t('dest_title') });
  }

  root.innerHTML = `
    <section class="hero hero-small">
      <img class="hero-img"
           src="https://picsum.photos/seed/${id}${sub ? '-' + sub : ''}/1600/500"
           alt="${heroTitle}"
           onerror="this.src='${meta.coverImage}'">
      <div class="hero-content">
        <h1>${heroTitle}</h1>
        <p>${t('dest_title')}</p>
      </div>
    </section>
    <div class="container">
      ${buildBreadcrumb(crumbs)}
      ${filterBar}
      ${isLargeOverview ? '' : `
        <section class="section map-section" style="padding-top:${filterBar ? '0' : '2rem'}">
          <h2 class="section-title">${t('map_title')}</h2>
          <div id="leaflet-map" class="map-container"></div>
        </section>`}
      <div id="destGrid">${isLargeOverview ? '' : buildLoading()}</div>
    </div>`;

  // Large-country overview: show subdivision grid, no data fetch needed
  if (isLargeOverview) {
    document.getElementById('destGrid').innerHTML = `
      <section class="section" style="padding-top:1.5rem">
        <h2 class="section-title">${t('subdivisions')}</h2>
        <div class="subdivision-grid">
          ${Object.entries(meta.subdivisions).map(([sid, s]) => `
            <a class="sub-card" href="${buildUrl('destinations.html', { id, sub: sid })}">
              <span class="emoji">${s.emoji || '📍'}</span>
              <span class="sub-name">${tx(s.name)}</span>
            </a>`).join('')}
        </div>
      </section>`;
    return;
  }

  // Load destination data for the selected subdivision (or full file for small countries)
  let allDests = [];
  try {
    if (meta.isLarge && sub) {
      allDests = (await MD.fetch(`data/destinations/${id}-${sub}.md`)).meta;
    } else {
      allDests = (await MD.fetch(`data/destinations/${id}.md`)).meta;
    }
  } catch (e) {
    document.getElementById('destGrid').innerHTML = buildFetchError(e);
    return;
  }

  // Render destination entries
  document.getElementById('destGrid').innerHTML = renderDests(allDests, 'all');

  // Build map
  const mapMeta = sub ? subMapMeta(id, sub) : countryMapMeta(id);
  buildMap('leaflet-map', allDests, mapMeta.center, mapMeta.zoom);

  // Wire filter buttons → navigate to the selected subdivision page
  if (meta.isLarge && sub) {
    document.querySelectorAll('#filterBar .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        window.location.href = buildUrl('destinations.html', { id, sub: btn.dataset.sub });
      });
    });
  }
}

// ── Journal helpers ────────────────────────────────────
function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(
    LANG === 'zh' ? 'zh-CN' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
}

function buildJournalCard(p) {
  const countryMeta = idx().countries[p.country];
  const tags = ((p.tags || {})[LANG] || (p.tags || {}).zh || []).slice(0, 3)
    .map(tag => `<span class="journal-tag">${tag}</span>`).join('');
  return `
    <a class="journal-card" href="${buildUrl('journal.html', { id: p.id })}">
      <img class="journal-card-img" src="${p.coverImage}" alt="${tx(p.title)}" loading="lazy"
           onerror="this.src='https://picsum.photos/seed/${p.id}/800/400'">
      <div class="journal-card-body">
        <div class="journal-card-meta">
          <span>📅 ${fmtDate(p.date)}</span>
          ${countryMeta ? `<span>${countryMeta.flag} ${tx(countryMeta.name)}</span>` : ''}
        </div>
        <div class="journal-card-title">${tx(p.title)}</div>
        <div class="journal-card-excerpt">${tx(p.excerpt)}</div>
        <div class="journal-tags">${tags}</div>
        <div class="journal-read-more">${t('journal_read')} →</div>
      </div>
    </a>`;
}

function renderSection(s) {
  switch (s.type) {
    case 'text':
      return `<p class="post-text">${tx(s.content)}</p>`;
    case 'image':
      return `
        <figure class="post-image">
          <img src="${s.src}" alt="${tx(s.caption)}" loading="lazy"
               onerror="this.style.display='none'">
          ${s.caption ? `<figcaption>${tx(s.caption)}</figcaption>` : ''}
        </figure>`;
    case 'gallery':
      return `
        <div class="post-gallery">
          ${(s.images || []).map(img => `
            <figure>
              <img src="${img.src}" alt="${tx(img.caption)}" loading="lazy"
                   onerror="this.style.display='none'">
              ${img.caption ? `<figcaption>${tx(img.caption)}</figcaption>` : ''}
            </figure>`).join('')}
        </div>`;
    case 'tip':
      return `
        <div class="post-tip">
          <div class="post-tip-label">💡 ${t('tip_label')}</div>
          <p>${tx(s.content)}</p>
        </div>`;
    case 'quote':
      return `<blockquote class="post-quote">${tx(s.content).replace(/\n/g, '<br>')}</blockquote>`;
    default:
      return '';
  }
}

// ── Page: Journal ──────────────────────────────────────
async function initJournal() {
  const id   = getParam('id');
  const root = document.getElementById('root');

  // ── List view ──
  if (!id) {
    root.innerHTML = `
      <section class="hero hero-small">
        <img class="hero-img" src="https://picsum.photos/seed/journal-hero/1600/600" alt=""
             onerror="this.style.background='linear-gradient(135deg,#1e3a8a,#1d4ed8)'">
        <div class="hero-content">
          <h1>${t('nav_journal')}</h1>
          <p>${t('journal_subtitle')}</p>
        </div>
      </section>
      <div class="container">
        <div class="section" id="journal-list">${buildLoading()}</div>
      </div>`;

    let posts;
    try {
      posts = (await MD.fetch('data/journal/index.md')).meta;
    } catch (e) {
      document.getElementById('journal-list').innerHTML = buildFetchError(e);
      return;
    }

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    document.getElementById('journal-list').innerHTML = posts.length
      ? `<div class="journal-grid">${posts.map(buildJournalCard).join('')}</div>`
      : `<div class="empty">${t('journal_empty')}</div>`;
    return;
  }

  // ── Post detail view ──
  root.innerHTML = `<div class="container" style="padding-top:2rem">${buildLoading()}</div>`;

  let post, postBodyHtml;
  try {
    const doc = await MD.fetch(`data/journal/${id}.md`);
    post = doc.meta;
    const halves = MD.splitLang(doc.body);
    postBodyHtml = MD.renderPost(halves[LANG] || halves.zh, t('tip_label'));
  } catch (e) {
    root.innerHTML = `<div class="container" style="padding-top:2rem">${buildFetchError(e)}</div>`;
    return;
  }

  const countryMeta = idx().countries[post.country];
  const tags = ((post.tags || {})[LANG] || (post.tags || {}).zh || [])
    .map(tag => `<span class="journal-tag">${tag}</span>`).join('');

  root.innerHTML = `
    <section class="hero hero-small">
      <img class="hero-img" src="${post.coverImage}" alt="${tx(post.title)}"
           onerror="this.src='https://picsum.photos/seed/${post.id}/1600/500'">
      <div class="hero-content">
        <h1>${tx(post.title)}</h1>
        <div class="post-hero-meta">
          <span>📅 ${fmtDate(post.date)}</span>
          ${countryMeta
            ? `<span>${countryMeta.flag}
               <a href="country.html?id=${post.country}" style="color:inherit">
                 ${tx(countryMeta.name)}
               </a></span>`
            : ''}
        </div>
      </div>
    </section>
    <div class="container">
      ${buildBreadcrumb([
        { href: 'index.html',   label: t('nav_home') },
        { href: 'journal.html', label: t('nav_journal') },
        { href: '#',            label: tx(post.title) },
      ])}
      <div class="post-tags">${tags}</div>
      <article class="post-body">
        ${postBodyHtml}
      </article>
      ${buildShareBar(tx(post.title))}
      <div class="section comment-section">
        <h2 class="section-title">💬 ${t('comment_title')}</h2>
        <div id="giscus-container"></div>
      </div>
    </div>`;
}

// ── Share bar ──────────────────────────────────────────
function showWechatQR() {
  const existing = document.getElementById('wechat-qr-modal');
  if (existing) { existing.style.display = 'flex'; return; }
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(location.href)}`;
  const el = document.createElement('div');
  el.id = 'wechat-qr-modal';
  el.className = 'share-modal-overlay';
  el.innerHTML = `
    <div class="share-modal">
      <button class="share-modal-close" onclick="document.getElementById('wechat-qr-modal').style.display='none'">✕</button>
      <div class="share-modal-icon">💚</div>
      <div class="share-modal-title">${t('share_wechat')}</div>
      <img class="share-modal-qr" src="${qrUrl}" alt="QR Code">
      <div class="share-modal-tip">${t('share_wechat_tip')}</div>
    </div>`;
  el.addEventListener('click', e => { if (e.target === el) el.style.display = 'none'; });
  document.body.appendChild(el);
}

function shareToXHS(title) {
  const text = `${title}\n${location.href}`;
  navigator.clipboard.writeText(text).then(() => {
    const existing = document.getElementById('xhs-modal');
    if (existing) { existing.style.display = 'flex'; return; }
    const el = document.createElement('div');
    el.id = 'xhs-modal';
    el.className = 'share-modal-overlay';
    el.innerHTML = `
      <div class="share-modal">
        <button class="share-modal-close" onclick="document.getElementById('xhs-modal').style.display='none'">✕</button>
        <div class="share-modal-icon">📕</div>
        <div class="share-modal-title">${t('share_xhs')}</div>
        <div class="share-modal-tip" style="font-size:.95rem;line-height:1.7">${t('share_xhs_copied')}</div>
      </div>`;
    el.addEventListener('click', e => { if (e.target === el) el.style.display = 'none'; });
    document.body.appendChild(el);
  });
}

function buildShareBar(title) {
  const url = encodeURIComponent(location.href);
  const txt = encodeURIComponent(title);
  return `
    <div class="share-bar">
      <span class="share-label">🔗 ${t('share_title')}</span>
      <button class="share-btn share-wechat" onclick="showWechatQR()">${t('share_wechat')}</button>
      <button class="share-btn share-xhs"    onclick="shareToXHS(${JSON.stringify(title)})">${t('share_xhs')}</button>
      <a class="share-btn share-weibo" target="_blank" rel="noopener"
         href="https://service.weibo.com/share/share.php?url=${url}&title=${txt}">
         ${t('share_weibo')}
      </a>
      <a class="share-btn share-x" target="_blank" rel="noopener"
         href="https://x.com/intent/tweet?url=${url}&text=${txt}">
         X
      </a>
      <button class="share-btn share-copy" onclick="
        navigator.clipboard.writeText(location.href).then(()=>{
          this.textContent='${t('share_copied')}';
          setTimeout(()=>this.textContent='${t('share_copy')}',2000);
        });
      ">${t('share_copy')}</button>
    </div>`;
}

// ── Back to top ────────────────────────────────────────
function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'backToTop';
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '↑';
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 320);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Footprint map ──────────────────────────────────────
async function initFootprint() {
  const root = document.getElementById('root');
  if (!root) return;

  let fp;
  try { fp = window.FOOTPRINT || await fetchJSON('data/footprint.json'); }
  catch { fp = { visited: [], wishlist: [] }; }

  const visited  = new Set(fp.visited  || []);
  const wishlist = new Set(fp.wishlist || []);
  const { countries, continents } = idx();

  const visitedConts = new Set(
    [...visited].map(id => countries[id]?.continent).filter(Boolean)
  );

  const statsText = t('footprint_stats')
    .replace('{c}', visited.size)
    .replace('{n}', visitedConts.size);

  root.innerHTML = `
    <section class="hero hero-small">
      <img class="hero-img" src="https://picsum.photos/seed/travel-footprint/1600/700" alt="${t('footprint_title')}"
           onerror="this.style.cssText='position:absolute;inset:0;width:100%;height:100%;background:linear-gradient(135deg,#1e3a8a,#0f4c75,#1d4ed8)'">
      <div class="hero-content">
        <h1>🗺️ ${t('footprint_title')}</h1>
        <p>${statsText}</p>
      </div>
    </section>
    <div class="container">
      ${buildBreadcrumb([
        { href: 'index.html', label: t('nav_home') },
        { href: '#',          label: t('footprint_title') },
      ])}
      <div class="section" style="padding-top:1rem">
        <div id="fp-map" class="world-map-container"></div>
      </div>
      <div class="section">
        <h2 class="section-title">✅ ${t('footprint_visited')} (${visited.size})</h2>
        <div class="fp-country-grid">
          ${[...visited].map(id => {
            const m = countries[id];
            return m ? `<a class="fp-country-chip visited" href="country.html?id=${id}">${m.flag} ${tx(m.name)}</a>` : '';
          }).join('')}
        </div>
      </div>
      ${wishlist.size ? `
      <div class="section">
        <h2 class="section-title">⭐ ${t('footprint_wish')} (${wishlist.size})</h2>
        <div class="fp-country-grid">
          ${[...wishlist].map(id => {
            const m = countries[id];
            return m ? `<a class="fp-country-chip wishlist" href="country.html?id=${id}">${m.flag} ${tx(m.name)}</a>` : '';
          }).join('')}
        </div>
      </div>` : ''}
    </div>`;

  if (!window.L || !window.topojson) return;
  try {
    const worldData = await fetchJSON('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    const map = L.map('fp-map', {
      zoomControl: true,
      scrollWheelZoom: false,
      minZoom: 2,
      maxZoom: 6,
      maxBounds: [[-85, -180], [85, 180]],
      maxBoundsViscosity: 1.0,
    }).setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors', maxZoom: 6
    }).addTo(map);

    const { isoMap } = idx();   // ← was incorrectly `window`
    const all = topojson.feature(worldData, worldData.objects.countries);

    const styleFor = (fillColor, fillOpacity) => ({
      fillColor, fillOpacity, color: '#fff', weight: 1.2
    });
    const hoverStyle = { fillOpacity: .9, weight: 2 };

    function addLayer(features, fill, opacity, labelSet) {
      return L.geoJSON(
        { type: 'FeatureCollection', features: features.filter(f => labelSet.has(isoMap?.[String(f.id)])) },
        {
          style: () => styleFor(fill, opacity),
          onEachFeature(feature, layer) {
            const id   = isoMap?.[String(feature.id)];
            const meta = id ? countries[id] : null;
            const name = meta ? tx(meta.name) : '';
            if (name) layer.bindTooltip(name, { sticky: true, className: 'world-tooltip' });
            layer.on('mouseover', () => layer.setStyle(hoverStyle));
            layer.on('mouseout',  () => layer.resetStyle());
          }
        }
      ).addTo(map);
    }

    addLayer(all.features, '#1d4ed8', .7, visited);
    addLayer(all.features, '#f59e0b', .6, wishlist);

    // Legend
    const legend = L.control({ position: 'bottomleft' });
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'fp-map-legend');
      div.innerHTML = `
        <span><i style="background:#1d4ed8"></i>${t('footprint_visited')}</span>
        <span><i style="background:#f59e0b"></i>${t('footprint_wish')}</span>`;
      return div;
    };
    legend.addTo(map);
  } catch { /* map fails silently */ }
}

// ── Top Picks ──────────────────────────────────────────
function initTop() {
  const root = document.getElementById('root');
  if (!root) return;

  const picks = window.TOP_PICKS || [];
  const { countries, continents } = idx();

  // Build continent id→name lookup from existing index data
  const contNameMap = {};
  continents.forEach(c => { contNameMap[c.id] = c.name; });

  const usedConts = [...new Set(picks.map(p => p.continent).filter(Boolean))];

  function buildCard(p, i) {
    const name    = tx(p.name);
    const desc    = tx(p.description);
    const cName   = tx(p.countryName || { zh: '', en: '' });
    const href    = p.country && countries[p.country] ? `country.html?id=${p.country}` : '#';
    const tags    = (p.tags || []).slice(0, 3).map(tag => `<span class="top-card-tag">${tag}</span>`).join('');
    return `
      <a class="top-card" href="${href}" data-cont="${p.continent || ''}">
        <img class="top-card-img" src="${p.image}" alt="${name}" loading="lazy"
             onerror="this.src='https://picsum.photos/seed/${p.id}/800/500'">
        <div class="top-card-overlay"></div>
        <div class="top-card-badge">${p.flag || ''} ${cName}</div>
        <span class="top-card-rank">${i + 1}</span>
        <div class="top-card-body">
          <div class="top-card-title">${name}</div>
          <div class="top-card-desc">${desc}</div>
          ${tags ? `<div class="top-card-tags">${tags}</div>` : ''}
        </div>
      </a>`;
  }

  root.innerHTML = `
    <section class="hero hero-small">
      <img class="hero-img" src="https://picsum.photos/seed/top-picks-world/1600/700" alt="${t('top_title')}"
           onerror="this.style.cssText='position:absolute;inset:0;width:100%;height:100%;background:linear-gradient(135deg,#0f172a,#1e3a8a,#1d4ed8)'">
      <div class="hero-content">
        <h1>✨ ${t('top_title')}</h1>
        <p>${t('top_subtitle')}</p>
      </div>
    </section>
    <div class="container">
      ${buildBreadcrumb([
        { href: 'index.html', label: t('nav_home') },
        { href: '#',          label: t('nav_top') },
      ])}
      <div class="section" style="padding-bottom:.5rem">
        <div class="top-filters">
          <button class="top-filter-btn active" data-cont="">${t('filter_all')} (${picks.length})</button>
          ${usedConts.map(c => {
            const label = contNameMap[c] ? tx(contNameMap[c]) : c;
            const cnt   = picks.filter(p => p.continent === c).length;
            return `<button class="top-filter-btn" data-cont="${c}">${label} (${cnt})</button>`;
          }).join('')}
        </div>
      </div>
      <div class="section" style="padding-top:0">
        <div class="top-grid" id="top-grid">
          ${picks.length
            ? picks.map((p, i) => buildCard(p, i)).join('')
            : `<div class="empty">${t('top_empty')}</div>`}
        </div>
      </div>
    </div>`;

  root.querySelectorAll('.top-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      root.querySelectorAll('.top-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cont = btn.dataset.cont;
      root.querySelectorAll('.top-card').forEach(card => {
        card.style.display = (!cont || card.dataset.cont === cont) ? '' : 'none';
      });
    });
  });
}

// ── Risk Map ───────────────────────────────────────────
async function initRisk() {
  const root = document.getElementById('root');
  if (!root) return;

  const riskData = window.TRAVEL_RISK || {};
  const riskMeta = window.RISK_META   || {};
  const { countries } = idx();

  const RISK_LEVELS = ['extreme', 'high', 'medium', 'low'];
  const RISK_COLORS = { extreme: '#dc2626', high: '#ea580c', medium: '#ca8a04', low: '#16a34a' };

  const byLevel = {};
  RISK_LEVELS.forEach(l => { byLevel[l] = []; });
  for (const [id, level] of Object.entries(riskData)) {
    if (byLevel[level] && (countries[id] || riskMeta[id])) byLevel[level].push(id);
  }

  root.innerHTML = `
    <section class="hero hero-small">
      <img class="hero-img" src="https://picsum.photos/seed/travel-risk-map/1600/700" alt="${t('risk_title')}"
           onerror="this.style.cssText='position:absolute;inset:0;width:100%;height:100%;background:linear-gradient(135deg,#7f1d1d,#991b1b,#b91c1c)'">
      <div class="hero-content">
        <h1>⚠️ ${t('risk_title')}</h1>
        <p>${t('risk_disclaimer')}</p>
      </div>
    </section>
    <div class="container">
      ${buildBreadcrumb([
        { href: 'index.html', label: t('nav_home') },
        { href: '#',          label: t('risk_title') },
      ])}
      <div class="section" style="padding-top:1rem">
        <div id="risk-map" class="world-map-container"></div>
      </div>
      <div class="section">
        ${RISK_LEVELS.map(level => {
          const ids = byLevel[level];
          return `
            <div style="margin-bottom:2rem">
              <h2 class="section-title" style="display:flex;align-items:center;gap:.5rem">
                <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${RISK_COLORS[level]};flex-shrink:0"></span>
                ${t('risk_' + level)} (${ids.length})
              </h2>
              ${ids.length
                ? `<div class="fp-country-grid">
                    ${ids.map(id => {
                      const m = countries[id] || riskMeta[id];
                      if (!m) return '';
                      return countries[id]
                        ? `<a class="fp-country-chip risk-chip risk-chip-${level}" href="country.html?id=${id}">${m.flag || ''} ${tx(m.name)}</a>`
                        : `<span class="fp-country-chip risk-chip risk-chip-${level}">${m.flag || ''} ${tx(m.name)}</span>`;
                    }).join('')}
                  </div>`
                : `<p style="color:var(--text-muted);font-size:.9rem">${t('risk_none')}</p>`}
            </div>`;
        }).join('')}
      </div>
    </div>`;

  if (!window.L || !window.topojson) return;
  try {
    if (!_worldTopoCache) {
      _worldTopoCache = await fetchJSON('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    }

    // Restrict pan and zoom so the map doesn't scroll infinitely
    const map = L.map('risk-map', {
      zoomControl: true,
      scrollWheelZoom: false,
      minZoom: 2,
      maxZoom: 6,
      maxBounds: [[-85, -180], [85, 180]],
      maxBoundsViscosity: 1.0,
    }).setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors', maxZoom: 6, opacity: 0.55
    }).addTo(map);

    const { isoMap } = idx();
    const all = topojson.feature(_worldTopoCache, _worldTopoCache.objects.countries);

    // Draw every country. Rated ones get a risk colour; unrated ones get a
    // subtle gray so the world map is fully visible.  Apply fixAntimeridian to
    // all features — it's a no-op for countries that don't cross ±180°.
    const processedFeatures = all.features.map(fixAntimeridian);

    L.geoJSON(
      { type: 'FeatureCollection', features: processedFeatures },
      {
        style: feature => {
          const slug  = isoMap?.[String(feature.id)];
          const level = slug ? riskData[slug] : null;
          return level
            ? { fillColor: RISK_COLORS[level], fillOpacity: 0.65, color: '#fff', weight: 0.9 }
            : { fillColor: '#9ca3af',           fillOpacity: 0.25, color: '#fff', weight: 0.5 };
        },
        onEachFeature(feature, layer) {
          const slug  = isoMap?.[String(feature.id)];
          const cm    = slug ? (countries[slug] || riskMeta[slug]) : null;
          const level = slug ? riskData[slug] : null;
          if (cm) {
            layer.bindTooltip(
              `<strong>${cm.flag || ''} ${tx(cm.name)}</strong>` +
              (level ? `<br><span style="color:${RISK_COLORS[level]}">${t('risk_' + level)}</span>` : ''),
              { sticky: true, className: 'world-tooltip' }
            );
          }
          layer.on('mouseover', () => layer.setStyle({ fillOpacity: level ? 0.9 : 0.45 }));
          layer.on('mouseout',  () => layer.resetStyle());
          if (countries[slug]) {
            layer.on('click', () => { window.location.href = `country.html?id=${slug}`; });
          }
        }
      }
    ).addTo(map);

    // Legend
    const usedLevels = RISK_LEVELS.filter(l => byLevel[l].length > 0);
    {
      const legend = L.control({ position: 'bottomleft' });
      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'fp-map-legend');
        div.innerHTML = [
          ...usedLevels.map(l => `<span><i style="background:${RISK_COLORS[l]}"></i>${t('risk_' + l)}</span>`),
          `<span><i style="background:#9ca3af;opacity:.6"></i>${LANG === 'zh' ? '其他' : 'Other'}</span>`
        ].join('');
        return div;
      };
      legend.addTo(map);
    }
  } catch { /* silent */ }
}

// ── Giscus comments ────────────────────────────────────
function loadGiscus() {
  const container = document.getElementById('giscus-container');
  if (!container) return;
  const s = document.createElement('script');
  s.src = 'https://giscus.app/client.js';
  s.setAttribute('data-repo',              'voyagerzxj/Stevens-Voyage');
  s.setAttribute('data-repo-id',           'R_kgDOSXW30g');
  s.setAttribute('data-category',          'General');
  s.setAttribute('data-category-id',       'DIC_kwDOSXW30s4C8nS2');
  s.setAttribute('data-mapping',           'pathname');
  s.setAttribute('data-strict',            '0');
  s.setAttribute('data-reactions-enabled', '1');
  s.setAttribute('data-emit-metadata',     '0');
  s.setAttribute('data-input-position',    'bottom');
  s.setAttribute('data-theme',             'preferred_color_scheme');
  s.setAttribute('data-lang',              LANG === 'zh' ? 'zh-CN' : 'en');
  s.crossOrigin = 'anonymous';
  s.async = true;
  container.appendChild(s);
}

// ── Cuisine & Best-time helpers ────────────────────────
function buildCuisineSection(cuisine) {
  if (!cuisine || !cuisine.length) return '';
  return `
    <section class="section" style="padding-top:0">
      <h2 class="section-title">🍜 ${t('cuisine_title')}</h2>
      <div class="cuisine-grid">
        ${cuisine.map(c => `
          <div class="cuisine-card">
            <div class="cuisine-emoji">${c.emoji || '🍽️'}</div>
            <div class="cuisine-name">${tx(c.name)}</div>
            <div class="cuisine-desc">${tx(c.description)}</div>
          </div>`).join('')}
      </div>
    </section>`;
}

function buildBestTimeSection(bt) {
  if (!bt) return '';
  const months = t('months_short');
  const optimal = new Set(bt.optimal || []);
  const good    = new Set(bt.good    || []);
  const avoid   = new Set(bt.avoid   || []);
  const cls = i => optimal.has(i+1) ? 'bt-opt' : good.has(i+1) ? 'bt-good' : avoid.has(i+1) ? 'bt-avoid' : 'bt-neutral';
  return `
    <section class="section" style="padding-top:0">
      <h2 class="section-title">📅 ${t('besttime_title')}</h2>
      <div class="besttime-grid">
        ${months.map((m, i) => `<div class="besttime-month ${cls(i)}"><span class="bt-m">${m}</span></div>`).join('')}
      </div>
      <div class="besttime-legend">
        <span class="bt-dot bt-opt"></span>${t('besttime_opt')}
        <span class="bt-dot bt-good"></span>${t('besttime_good')}
        <span class="bt-dot bt-avoid"></span>${t('besttime_avoid')}
      </div>
      ${bt.note ? `<p class="besttime-note">${tx(bt.note)}</p>` : ''}
    </section>`;
}

// ── Bootstrap ──────────────────────────────────────────
// Apply theme immediately when script loads (before DOMContentLoaded) to minimise flash
initTheme();

document.addEventListener('DOMContentLoaded', () => {
  setLang(LANG);

  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) { headerEl.insertAdjacentHTML('afterend', buildHeader()); headerEl.remove(); }
  if (footerEl) { footerEl.insertAdjacentHTML('afterend', buildFooter()); footerEl.remove(); }

  wireLangToggle();
  wireThemeToggle();
  wireMobileMenu();
  wireSearch('navSearch', 'navDrop');
  initBackToTop();

  const page = document.body.dataset.page;
  if (page === 'index')        initIndex();
  if (page === 'world')        initWorld();
  if (page === 'journal')      { initJournal().then(() => { if (getParam('id')) loadGiscus(); }); }
  if (page === 'continent')    initContinent();
  if (page === 'country')      initCountry();
  if (page === 'destinations') initDestinations();
  if (page === 'top')          initTop();
  if (page === 'footprint')    initFootprint();
  if (page === 'risk')         initRisk();
  initCookieBanner();
});
