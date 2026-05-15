/**
 * data/coords.js
 * Map center / zoom for countries and subdivisions,
 * plus [lat, lng] for every tourist destination.
 * Edit this file to adjust map positions.
 */
window.DB_COORDS = {

  /* ── Continent default map view ──────────────────── */
  continents: {
    "asia":          { center: [35,  105],  zoom: 3 },
    "europe":        { center: [54,   15],  zoom: 3 },
    "north-america": { center: [50,  -95],  zoom: 3 },
    "south-america": { center: [-15, -60],  zoom: 3 },
    "africa":        { center: [  5,  20],  zoom: 3 },
    "oceania":       { center: [-27, 140],  zoom: 3 },
    "antarctica":    { center: [-80,   0],  zoom: 2 }
  },

  /* ── Country default map view ────────────────────── */
  countries: {
    "albania":     { center: [41.15,   20.17], zoom: 7 },
    "china":       { center: [35.86,  104.19], zoom: 4 },
    "japan":       { center: [36.20,  138.25], zoom: 5 },
    "india":       { center: [20.59,   78.96], zoom: 4 },
    "france":      { center: [46.23,    2.21], zoom: 5 },
    "italy":       { center: [41.87,   12.57], zoom: 5 },
    "greece":      { center: [39.07,   21.82], zoom: 6 },
    "usa":         { center: [37.09,  -95.71], zoom: 3 },
    "canada":      { center: [56.13, -106.35], zoom: 3 },
    "mexico":      { center: [23.63, -102.55], zoom: 4 },
    "brazil":      { center: [-14.24, -51.93], zoom: 3 },
    "peru":        { center: [ -9.19, -75.02], zoom: 4 },
    "argentina":   { center: [-38.42, -63.62], zoom: 3 },
    "egypt":       { center: [ 26.82,  30.80], zoom: 5 },
    "kenya":       { center: [  0.02,  37.91], zoom: 5 },
    "morocco":     { center: [ 31.79,  -7.09], zoom: 5 },
    "australia":   { center: [-25.27, 133.78], zoom: 4 },
    "new-zealand": { center: [-40.90, 174.89], zoom: 5 }
  },

  /* ── Subdivision map views (for large countries) ─── */
  subdivisions: {
    "china-beijing":    { center: [39.90, 116.41], zoom: 9 },
    "china-shanghai":   { center: [31.22, 121.47], zoom: 9 },
    "china-sichuan":    { center: [30.57, 104.06], zoom: 6 },
    "china-yunnan":     { center: [25.05, 102.71], zoom: 6 },
    "china-guangdong":  { center: [23.13, 113.26], zoom: 7 },

    "usa-new-york":     { center: [ 40.71,  -74.01], zoom: 7 },
    "usa-california":   { center: [ 36.78, -119.42], zoom: 5 },
    "usa-hawaii":       { center: [ 20.80, -156.33], zoom: 6 },
    "usa-florida":      { center: [ 27.66,  -81.52], zoom: 6 },
    "usa-alaska":       { center: [ 64.20, -153.37], zoom: 4 },

    "japan-hokkaido":   { center: [ 43.46,  142.95], zoom: 7 },
    "japan-aomori":     { center: [ 40.82,  140.74], zoom: 8 },
    "japan-iwate":      { center: [ 39.70,  141.13], zoom: 8 },
    "japan-miyagi":     { center: [ 38.27,  140.87], zoom: 8 },
    "japan-akita":      { center: [ 39.72,  140.10], zoom: 8 },
    "japan-yamagata":   { center: [ 38.24,  140.36], zoom: 8 },
    "japan-fukushima":  { center: [ 37.75,  140.47], zoom: 8 },
    "japan-ibaraki":    { center: [ 36.34,  140.45], zoom: 9 },
    "japan-tochigi":    { center: [ 36.57,  139.88], zoom: 8 },
    "japan-gunma":      { center: [ 36.39,  139.06], zoom: 8 },
    "japan-saitama":    { center: [ 35.86,  139.65], zoom: 9 },
    "japan-chiba":      { center: [ 35.61,  140.12], zoom: 9 },
    "japan-tokyo":      { center: [ 35.69,  139.69], zoom: 11 },
    "japan-kanagawa":   { center: [ 35.45,  139.64], zoom: 9 },
    "japan-niigata":    { center: [ 37.47,  138.85], zoom: 8 },
    "japan-toyama":     { center: [ 36.70,  137.21], zoom: 9 },
    "japan-ishikawa":   { center: [ 36.59,  136.63], zoom: 9 },
    "japan-fukui":      { center: [ 35.99,  136.22], zoom: 9 },
    "japan-yamanashi":  { center: [ 35.66,  138.57], zoom: 9 },
    "japan-nagano":     { center: [ 36.65,  138.18], zoom: 8 },
    "japan-gifu":       { center: [ 35.79,  136.72], zoom: 8 },
    "japan-shizuoka":   { center: [ 34.98,  138.38], zoom: 8 },
    "japan-aichi":      { center: [ 35.18,  137.10], zoom: 9 },
    "japan-mie":        { center: [ 34.51,  136.50], zoom: 8 },
    "japan-shiga":      { center: [ 35.18,  136.22], zoom: 9 },
    "japan-kyoto":      { center: [ 35.02,  135.76], zoom: 10 },
    "japan-osaka":      { center: [ 34.69,  135.50], zoom: 11 },
    "japan-hyogo":      { center: [ 34.91,  134.80], zoom: 9 },
    "japan-nara":       { center: [ 34.39,  135.84], zoom: 9 },
    "japan-wakayama":   { center: [ 33.94,  135.37], zoom: 9 },
    "japan-tottori":    { center: [ 35.36,  133.54], zoom: 9 },
    "japan-shimane":    { center: [ 35.47,  133.05], zoom: 9 },
    "japan-okayama":    { center: [ 34.66,  133.94], zoom: 9 },
    "japan-hiroshima":  { center: [ 34.40,  132.46], zoom: 9 },
    "japan-yamaguchi":  { center: [ 34.19,  131.47], zoom: 9 },
    "japan-tokushima":  { center: [ 33.97,  134.55], zoom: 9 },
    "japan-kagawa":     { center: [ 34.34,  134.04], zoom: 9 },
    "japan-ehime":      { center: [ 33.84,  132.77], zoom: 9 },
    "japan-kochi":      { center: [ 33.56,  133.53], zoom: 9 },
    "japan-fukuoka":    { center: [ 33.61,  130.42], zoom: 9 },
    "japan-saga":       { center: [ 33.24,  130.30], zoom: 9 },
    "japan-nagasaki":   { center: [ 32.74,  129.87], zoom: 9 },
    "japan-kumamoto":   { center: [ 32.79,  130.74], zoom: 9 },
    "japan-oita":       { center: [ 33.24,  131.61], zoom: 9 },
    "japan-miyazaki":   { center: [ 31.91,  131.42], zoom: 9 },
    "japan-kagoshima":  { center: [ 31.56,  130.56], zoom: 9 },
    "japan-okinawa":    { center: [ 26.21,  127.68], zoom: 9 }
  },

  /* ── Destination pin coordinates [lat, lng] ──────── */
  destinations: {
    /* Albania */
    "berat":             [40.706,  19.952],
    "gjirokaster":       [40.075,  20.139],
    "butrint":           [39.745,  20.023],
    "albanian-riviera":  [40.099,  19.742],
    "theth":             [42.379,  19.786],
    "blue-eye":          [39.895,  20.183],
    "apollonia":         [40.718,  19.472],
    "ksamil":            [39.767,  20.010],

    /* China */
    "great-wall":      [40.431,  116.570],
    "forbidden-city":  [39.916,  116.397],
    "west-lake":       [30.259,  120.148],
    "jiuzhaigou":      [33.260,  103.917],
    "rice-terraces":   [23.172,  102.775],
    "zhangjiajie":     [29.318,  110.520],

    /* Japan */
    "mount-fuji":         [35.361,  138.731],
    "kyoto-temples":      [35.011,  135.768],
    "tokyo-shibuya":      [35.659,  139.700],
    "hiroshima-miyajima": [34.295,  132.320],
    "osaka-castle":       [34.687,  135.526],

    /* Japan — Tokyo */
    "asakusa":               [35.7148, 139.7967],
    "ueno":                  [35.7151, 139.7733],
    "shinjuku":              [35.6896, 139.7006],
    "harajuku-omotesando":   [35.6699, 139.7060],
    "akihabara-electric-town":[35.6996, 139.7713],
    "roppongi":              [35.6605, 139.7293],
    "ginza-tsukiji":         [35.6713, 139.7658],
    "tokyo-imperial-palace": [35.6852, 139.7528],
    "odaiba":                [35.6270, 139.7758],
    "ikebukuro":             [35.7291, 139.7187],
    "ghibli-kichijoji":      [35.6962, 139.5704],
    "mount-takao":           [35.6259, 139.2435],
    "tokyo-skytree":         [35.7102, 139.8107],

    /* Japan — Kanagawa */
    "yokohama":              [35.4437, 139.6380],
    "kamakura":              [35.3198, 139.5502],
    "enoshima-island":       [35.2991, 139.4809],
    "hakone":                [35.2332, 139.1050],

    /* Japan — Chiba */
    "tokyo-disney-resort":   [35.6329, 139.8804],

    /* Japan — Saitama */
    "kawagoe":               [35.9251, 139.4858],
    "mitsumine-shrine":      [35.9255, 138.9305],

    /* Japan — Miyagi */
    "zao-fox-village":       [38.0408, 140.5304],
    "okama-crater-lake":     [38.1362, 140.4496],

    /* Japan — Niigata */
    "echigo-tsumari":        [36.9737, 138.7500],

    /* Japan — Kyoto */
    "fushimi-inari":         [34.9677, 135.7792],

    /* Japan — Mie */
    "ise-jingu":             [34.4552, 136.7252],

    /* Japan — Aichi */
    "toyokawa-inari":        [34.8246, 137.3920],

    /* Japan — Fukuoka */
    "dazaifu-tenmangu":      [33.5214, 130.5348],

    /* Japan — Saga */
    "yutoku-inari":          [33.0738, 130.1079],

    /* Japan — Ibaraki */
    "kasama-inari":          [36.3862, 140.2542],

    /* Japan — existing UNESCO & Geopark destinations (from japan.json split) */
    "himeji-castle":              [34.8394, 134.6939],
    "horyu-ji":                   [34.6148, 135.7344],
    "shirakawa-go":               [36.2566, 136.9059],
    "nara-monuments":             [34.6887, 135.8399],
    "nikko-shrines":              [36.7580, 139.5988],
    "gusuku-ryukyu":              [26.2167, 127.7197],
    "kii-pilgrimage":             [33.8333, 135.7667],
    "shiretoko":                  [44.0778, 145.1261],
    "iwami-ginzan":               [35.0983, 132.4268],
    "hiraizumi":                  [38.9847, 141.1168],
    "ogasawara":                  [27.0944, 142.1868],
    "tomioka-silk-mill":          [36.2572, 138.8891],
    "meiji-industrial-revolution":[33.4703, 130.4407],
    "national-museum-western-art":[35.7157, 139.7714],
    "okinoshima":                 [34.2339, 130.0972],
    "nagasaki-hidden-christian":  [32.7448, 129.8769],
    "mozu-furuichi-kofun":        [34.5620, 135.4897],
    "amami-ryukyu-islands":       [28.3768, 129.4956],
    "jomon-prehistoric-sites":    [40.8363, 140.7316],
    "sado-gold-mines":            [38.0485, 138.2830],
    "aso-geopark":                [32.8849, 131.1042],
    "toya-usu-geopark":           [42.5439, 140.8382],
    "itoigawa-geopark":           [37.0374, 137.8607],
    "izu-geopark":                [34.9014, 138.9388],
    "sanin-kaigan-geopark":       [35.6303, 134.2895],
    "unzen-geopark":              [32.7414, 130.2784],
    "oki-islands-geopark":        [36.2729, 133.2221],
    "muroto-geopark":             [33.2882, 134.1553],
    "mt-apoi-geopark":            [42.1026, 142.8716],
    "hakusan-tedorigawa-geopark": [36.1534, 136.7743],
    "mine-akiyoshidai-geopark":   [34.2103, 131.2854],

    /* India */
    "taj-mahal":         [27.175,  78.042],
    "varanasi":          [25.317,  83.013],
    "kerala-backwaters": [ 9.498,  76.316],
    "jaipur-pink-city":  [26.912,  75.787],
    "goa-beaches":       [15.298,  73.916],

    /* France */
    "eiffel-tower":      [48.858,   2.295],
    "louvre":            [48.861,   2.336],
    "mont-saint-michel": [48.636,  -1.511],
    "chateau-loire":     [47.517,   1.327],
    "provence-lavender": [43.836,   5.612],

    /* Italy */
    "colosseum":        [41.890,  12.492],
    "venice-canals":    [45.437,  12.335],
    "amalfi-coast":     [40.634,  14.602],
    "tuscany-landscape":[43.468,  11.157],
    "cinque-terre":     [44.127,   9.712],

    /* Greece */
    "acropolis":    [37.972,  23.726],
    "santorini":    [36.394,  25.461],
    "meteora":      [39.722,  21.630],
    "crete-island": [35.239,  24.809],

    /* USA */
    "statue-of-liberty": [40.690, -74.045],
    "times-square":      [40.758, -73.985],
    "golden-gate":       [37.820,-122.478],
    "yellowstone":       [44.428,-110.589],
    "grand-canyon":      [36.107,-112.113],
    "hawaii-volcanoes":  [19.432,-155.258],
    "miami-beach":       [25.790, -80.130],

    /* Canada */
    "niagara-falls": [43.084, -79.071],
    "banff":         [51.179,-115.572],
    "quebec-city":   [46.813, -71.208],

    /* Mexico */
    "chichen-itza":          [20.683, -88.569],
    "cancun":                [21.161, -86.851],
    "mexico-city-historic":  [19.432, -99.133],

    /* Brazil */
    "christ-redeemer":  [-22.952, -43.211],
    "amazon-rainforest":[ -3.470, -60.024],
    "iguazu-falls":     [-25.695, -54.437],
    "rio-carnival":     [-22.906, -43.173],

    /* Peru */
    "machu-picchu":  [-13.163, -72.545],
    "lake-titicaca": [-15.840, -70.024],
    "nazca-lines":   [-14.743, -75.130],
    "amazon-peru":   [-12.005, -71.505],

    /* Argentina */
    "iguazu-argentina": [-25.686, -54.444],
    "patagonia":        [-50.943, -73.408],
    "buenos-aires":     [-34.614, -58.440],

    /* Egypt */
    "pyramids-giza":  [29.979,  31.134],
    "luxor-temples":  [25.700,  32.639],
    "nile-cruise":    [24.090,  32.905],
    "abu-simbel":     [22.337,  31.625],
    "cairo-museum":   [29.975,  31.130],

    /* Kenya */
    "masai-mara":           [-1.515,  35.143],
    "amboseli":             [-2.652,  37.274],
    "diani-beach":          [-4.319,  39.566],
    "nairobi-national-park":[-1.376,  36.820],

    /* Morocco */
    "marrakech-medina": [31.628,  -8.009],
    "sahara-merzouga":  [31.100,  -4.015],
    "chefchaouen":      [35.171,  -5.269],

    /* Australia */
    "great-barrier-reef":  [-18.286, 147.700],
    "sydney-opera-house":  [-33.857, 151.215],
    "uluru":               [-25.345, 131.036],
    "whitsundays":         [-20.277, 148.715],
    "blue-mountains":      [-33.724, 150.316],

    /* New Zealand */
    "milford-sound": [-44.671, 167.932],
    "hobbiton":      [-37.872, 175.682],
    "queenstown":    [-45.032, 168.662],
    "bay-of-islands":[-35.249, 174.097]
  }
};
