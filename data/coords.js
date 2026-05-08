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
    "usa-alaska":       { center: [ 64.20, -153.37], zoom: 4 }
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
