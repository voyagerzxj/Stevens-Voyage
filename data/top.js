/**
 * data/top.js — Curated "Top Picks" destinations
 *
 * Fields:
 *   id          – unique slug
 *   name        – { zh, en }
 *   country     – country slug matching data/index.js (null if uncovered)
 *   flag        – flag emoji
 *   countryName – { zh, en }
 *   continent   – continent id (asia / europe / north-america / south-america / africa / oceania)
 *   image       – photo URL (replace picsum placeholders with real photos)
 *   description – { zh, en } personal reason this place is worth visiting
 *   tags        – up to 3 short labels shown as chips on the card
 *
 * Order in this array = ranking order (1, 2, 3 … shown as badge on each card).
 * Edit freely — add, remove, reorder, change descriptions.
 */
window.TOP_PICKS = [

  /* ── Asia ─────────────────────────────────────────────────────── */
  {
    id: "great-wall",
    name: { zh: "中国长城", en: "Great Wall of China" },
    country: "china",
    flag: "🇨🇳",
    countryName: { zh: "中国", en: "China" },
    continent: "asia",
    image: "https://picsum.photos/seed/great-wall-china/800/500",
    description: {
      zh: "蜿蜒万里的长城是人类意志的不朽象征，站在烽燧之上远望连绵山脉，那种震撼让人沉默。",
      en: "Winding across mountains for thousands of miles, the Great Wall is an enduring symbol of human will — standing on it silences everything else."
    },
    tags: ["历史", "UNESCO", "建筑"]
  },
  {
    id: "zhangjiajie",
    name: { zh: "张家界", en: "Zhangjiajie" },
    country: "china",
    flag: "🇨🇳",
    countryName: { zh: "中国", en: "China" },
    continent: "asia",
    image: "https://picsum.photos/seed/zhangjiajie-china/800/500",
    description: {
      zh: "擎天石柱从云雾中拔地而起，宛若仙境。《阿凡达》的外星世界正是从这里获得灵感，置身其中才明白那种震撼绝非夸张。",
      en: "Towering sandstone pillars rising from the mist — Avatar's alien world was inspired by this. Standing among them makes the fantasy feel real."
    },
    tags: ["自然", "壮景", "奇观"]
  },
  {
    id: "kyoto",
    name: { zh: "京都", en: "Kyoto" },
    country: "japan",
    flag: "🇯🇵",
    countryName: { zh: "日本", en: "Japan" },
    continent: "asia",
    image: "https://picsum.photos/seed/kyoto-temples-japan/800/500",
    description: {
      zh: "千年古都，保存着日本最完整的传统文化与建筑。伏见稻荷的朱红鸟居、岚山的竹林、清水寺的木造舞台——每一处都是一首诗。",
      en: "Japan's ancient imperial capital, where 1,600 temples and immaculate gardens preserve traditions unchanged for centuries. Every corner is poetry."
    },
    tags: ["文化", "历史", "UNESCO"]
  },
  {
    id: "taj-mahal",
    name: { zh: "泰姬陵", en: "Taj Mahal" },
    country: "india",
    flag: "🇮🇳",
    countryName: { zh: "印度", en: "India" },
    continent: "asia",
    image: "https://picsum.photos/seed/taj-mahal-india/800/500",
    description: {
      zh: "莫卧儿皇帝为爱妃所建的纯白陵墓，日出时分倒映在水池中，美得令人动容。世界七大奇迹绝非虚名。",
      en: "Built by a Mughal emperor for his beloved, reflected in the pool at sunrise — the Seven Wonders designation is fully earned."
    },
    tags: ["历史", "UNESCO", "建筑"]
  },

  /* ── Europe ────────────────────────────────────────────────────── */
  {
    id: "santorini",
    name: { zh: "圣托里尼", en: "Santorini" },
    country: "greece",
    flag: "🇬🇷",
    countryName: { zh: "希腊", en: "Greece" },
    continent: "europe",
    image: "https://picsum.photos/seed/santorini-greece/800/500",
    description: {
      zh: "爱琴海火山岛上的白墙蓝顶小屋，日落时天空燃成火红，倒映在深蓝海面。这里的黄昏是世界上最不真实的美景之一。",
      en: "Whitewashed houses perched on volcanic cliffs above the Aegean. The sunset here — sky ablaze over deep blue water — is among the world's most surreal sights."
    },
    tags: ["自然", "浪漫", "海岛"]
  },
  {
    id: "amalfi-coast",
    name: { zh: "阿马尔菲海岸", en: "Amalfi Coast" },
    country: "italy",
    flag: "🇮🇹",
    countryName: { zh: "意大利", en: "Italy" },
    continent: "europe",
    image: "https://picsum.photos/seed/amalfi-coast-italy/800/500",
    description: {
      zh: "悬崖小镇、柠檬树、碧蓝地中海——意大利南部最令人窒息的风景线，沿盘山公路驾车而行本身就是一种享受。",
      en: "Clifftop villages, lemon groves and Mediterranean blue — driving the corniche road here is an experience in itself, before you even stop to look."
    },
    tags: ["自然", "UNESCO", "海岸"]
  },
  {
    id: "paris",
    name: { zh: "巴黎", en: "Paris" },
    country: "france",
    flag: "🇫🇷",
    countryName: { zh: "法国", en: "France" },
    continent: "europe",
    image: "https://picsum.photos/seed/paris-seine-eiffel/800/500",
    description: {
      zh: "铁塔在夜幕下闪烁，卢浮宫收藏了人类最伟大的艺术，塞纳河边的露天咖啡馆让时间慢下来。巴黎是一种生活方式。",
      en: "The Eiffel Tower sparkling at night, the Louvre's unrivalled art, café terraces by the Seine. Paris is not just a city — it's a way of living."
    },
    tags: ["文化", "艺术", "城市"]
  },

  /* ── North America ─────────────────────────────────────────────── */
  {
    id: "grand-canyon",
    name: { zh: "科罗拉多大峡谷", en: "Grand Canyon" },
    country: "usa",
    flag: "🇺🇸",
    countryName: { zh: "美国", en: "USA" },
    continent: "north-america",
    image: "https://picsum.photos/seed/grand-canyon-usa/800/500",
    description: {
      zh: "大自然历经数百万年雕刻的鬼斧神工，深1.6公里，长446公里。站在崖边向下俯瞰，才真正理解地球的尺度。",
      en: "1.6 km deep, 446 km long — carved over millions of years. Standing at the rim and looking down recalibrates your sense of Earth's scale entirely."
    },
    tags: ["自然", "UNESCO", "壮景"]
  },
  {
    id: "banff",
    name: { zh: "班夫国家公园", en: "Banff National Park" },
    country: "canada",
    flag: "🇨🇦",
    countryName: { zh: "加拿大", en: "Canada" },
    continent: "north-america",
    image: "https://picsum.photos/seed/banff-canada-rockies/800/500",
    description: {
      zh: "加拿大洛基山脉心脏地带，路易斯湖的翡翠绿冰川湖水倒映雪山，这幅画面让无数人第一次真正理解"震撼"二字。",
      en: "Lake Louise's turquoise glacial water reflecting snow-capped peaks — one of those scenes where photos look fake, but the real thing is even better."
    },
    tags: ["自然", "UNESCO", "冰川"]
  },
  {
    id: "chichen-itza",
    name: { zh: "奇琴伊察", en: "Chichen Itza" },
    country: "mexico",
    flag: "🇲🇽",
    countryName: { zh: "墨西哥", en: "Mexico" },
    continent: "north-america",
    image: "https://picsum.photos/seed/chichen-itza-mexico/800/500",
    description: {
      zh: "玛雅文明最辉煌的城邦遗址，库库尔坎神庙每年春分秋分都会呈现蛇形光影奇观，是古代天文学的绝妙杰作。",
      en: "The Mayan civilization's greatest city — the Kukulcán pyramid casts a serpent shadow on the equinox, a feat of ancient astronomical engineering."
    },
    tags: ["历史", "UNESCO", "古迹"]
  },

  /* ── South America ─────────────────────────────────────────────── */
  {
    id: "machu-picchu",
    name: { zh: "马丘比丘", en: "Machu Picchu" },
    country: "peru",
    flag: "🇵🇪",
    countryName: { zh: "秘鲁", en: "Peru" },
    continent: "south-america",
    image: "https://picsum.photos/seed/machu-picchu-peru/800/500",
    description: {
      zh: "隐匿于安第斯山云雾深处的印加古城，消失数百年后被世界重新发现。那种跨越时空的神秘感，是任何其他地方都给不了的。",
      en: "The lost Inca city hidden in Andean clouds, rediscovered after centuries of silence. The sense of crossing time — of standing where a vanished civilization stood — is irreplaceable."
    },
    tags: ["历史", "UNESCO", "冒险"]
  },
  {
    id: "iguazu-falls",
    name: { zh: "伊瓜苏瀑布", en: "Iguazu Falls" },
    country: "argentina",
    flag: "🇦🇷",
    countryName: { zh: "阿根廷", en: "Argentina" },
    continent: "south-america",
    image: "https://picsum.photos/seed/iguazu-falls-argentina/800/500",
    description: {
      zh: "275条瀑布在亚热带丛林中轰鸣而下，彩虹架于水雾之间。据说罗斯福总统见到尼亚加拉大瀑布后说：'我的瀑布真可怜。'",
      en: "275 cascades thundering through subtropical jungle, rainbows in the mist. Eleanor Roosevelt reportedly said 'Poor Niagara' upon seeing this."
    },
    tags: ["自然", "UNESCO", "壮景"]
  },

  /* ── Africa ────────────────────────────────────────────────────── */
  {
    id: "pyramids",
    name: { zh: "吉萨金字塔", en: "Pyramids of Giza" },
    country: "egypt",
    flag: "🇪🇬",
    countryName: { zh: "埃及", en: "Egypt" },
    continent: "africa",
    image: "https://picsum.photos/seed/pyramids-giza-egypt/800/500",
    description: {
      zh: "4500年前建成，至今巍然屹立，是古代七大奇迹中唯一留存的。任何照片都无法真正传达它的体量——必须亲眼见到。",
      en: "Built 4,500 years ago and still standing — the last of the Seven Ancient Wonders. No photo conveys the scale. You have to stand in front of one."
    },
    tags: ["历史", "UNESCO", "古迹"]
  },
  {
    id: "serengeti",
    name: { zh: "塞伦盖蒂动物大迁徙", en: "Serengeti Migration" },
    country: "kenya",
    flag: "🇰🇪",
    countryName: { zh: "肯尼亚", en: "Kenya" },
    continent: "africa",
    image: "https://picsum.photos/seed/serengeti-kenya/800/500",
    description: {
      zh: "每年超过百万头角马、数十万斑马在辽阔草原上迁徙，这是地球上规模最壮观的野生动物奇观，人类有幸目睹的最震撼景象之一。",
      en: "Over a million wildebeest and hundreds of thousands of zebras crossing the African savannah — the greatest wildlife spectacle on Earth."
    },
    tags: ["自然", "野生动物", "Safari"]
  },
  {
    id: "sahara",
    name: { zh: "撒哈拉沙漠", en: "Sahara Desert" },
    country: "morocco",
    flag: "🇲🇦",
    countryName: { zh: "摩洛哥", en: "Morocco" },
    continent: "africa",
    image: "https://picsum.photos/seed/sahara-morocco-dunes/800/500",
    description: {
      zh: "在撒哈拉沙丘上等候日出，骑骆驼穿越金色沙海，夜晚在无光污染的旷野中仰望满天繁星——这是对心灵的彻底洗涤。",
      en: "Watching sunrise from the dunes, riding camels into a golden sea of sand, stargazing under a sky with zero light pollution — a complete reset for the soul."
    },
    tags: ["自然", "冒险", "沙漠"]
  },

  /* ── Oceania ───────────────────────────────────────────────────── */
  {
    id: "great-barrier-reef",
    name: { zh: "大堡礁", en: "Great Barrier Reef" },
    country: "australia",
    flag: "🇦🇺",
    countryName: { zh: "澳大利亚", en: "Australia" },
    continent: "oceania",
    image: "https://picsum.photos/seed/great-barrier-reef/800/500",
    description: {
      zh: "世界最大的珊瑚礁系统，从太空都可以看见，水下是令人叹为观止的生命世界。趁还来得及，它正在因气候变化而消失。",
      en: "The world's largest coral reef — visible from space. Beneath lies breathtaking biodiversity. Go while you still can: climate change is bleaching it away."
    },
    tags: ["自然", "UNESCO", "海洋"]
  },
  {
    id: "milford-sound",
    name: { zh: "米尔福德峡湾", en: "Milford Sound" },
    country: "new-zealand",
    flag: "🇳🇿",
    countryName: { zh: "新西兰", en: "New Zealand" },
    continent: "oceania",
    image: "https://picsum.photos/seed/milford-sound-nz/800/500",
    description: {
      zh: "被称为"世界第八大奇迹"，垂直峭壁从镜面海水中拔起千米，瀑布从四面八方倾泻。雨后薄雾弥漫，宛若仙境。",
      en: "Called the 'eighth wonder of the world' — vertical cliffs rising from mirror-calm water, waterfalls cascading from every direction. After rain, mist transforms it into another realm."
    },
    tags: ["自然", "壮景", "峡湾"]
  },

];
