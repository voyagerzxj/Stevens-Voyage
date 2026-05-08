# -*- coding: utf-8 -*-
"""Add highlights, tips, admission, duration to every destination."""
import json, os, glob

EXTRA = {
  # ── Albania ───────────────────────────────────────────────────────────────
  "berat": {
    "highlights": {"zh": ["UNESCO世界遗产，2008年列入", "「千窗之城」奥斯曼建筑群", "俯瞰奥苏米河谷的山顶城堡"],
                   "en": ["UNESCO World Heritage Site since 2008", "'City of a Thousand Windows' Ottoman quarter", "Hilltop castle with sweeping river valley views"]},
    "admission": {"zh": "城堡区约200列克（约1.5欧元）", "en": "Castle area ~200 ALL (~€1.50)"},
    "duration": {"zh": "半天至一天", "en": "Half to full day"},
    "tips": {"zh": "清晨或傍晚光线最美，避开正午强光；城堡内的拜占庭教堂不容错过。",
             "en": "Visit at dawn or dusk for the best light. Don't miss the Byzantine churches inside the castle walls."}
  },
  "gjirokaster": {
    "highlights": {"zh": ["联合国教科文组织世界遗产", "奥斯曼时期石板屋顶老城", "收藏美式战机的城堡博物馆"],
                   "en": ["UNESCO World Heritage Site", "Ottoman stone-roofed old city", "Castle museum with a captured US spy plane"]},
    "admission": {"zh": "城堡门票约200列克", "en": "Castle entry ~200 ALL"},
    "duration": {"zh": "3—5小时", "en": "3–5 hours"},
    "tips": {"zh": "石板路陡峭，建议穿防滑鞋。伊斯梅尔·卡达莱故居值得一看。",
             "en": "Cobblestones are steep — wear grippy shoes. The birthplace of novelist Ismail Kadare is open to visitors."}
  },
  "butrint": {
    "highlights": {"zh": ["希腊、罗马、拜占庭多层次文明叠加", "泻湖边的如画自然风光", "保存完好的古代剧场和城墙"],
                   "en": ["Layered Greek, Roman and Byzantine remains", "Scenic setting beside a lagoon", "Well-preserved ancient theatre and city walls"]},
    "admission": {"zh": "约700列克（约6欧元）", "en": "~700 ALL (~€6)"},
    "duration": {"zh": "2—3小时", "en": "2–3 hours"},
    "tips": {"zh": "建议与萨兰达或克萨米尔一日联游，配合导览讲解效果更好。",
             "en": "Pair with nearby Saranda or Ksamil for a day trip. A guided tour adds considerable context."}
  },
  "albanian-riviera": {
    "highlights": {"zh": ["地中海最纯净的海水之一", "德尔米、希马尔等未开发海湾", "悬崖与沙滩交替的壮观海岸线"],
                   "en": ["Some of the clearest water in the Mediterranean", "Unspoiled bays at Dhermi and Himara", "Dramatic coastline alternating cliffs and beaches"]},
    "admission": {"zh": "海滩免费", "en": "Beaches free"},
    "duration": {"zh": "2—5天", "en": "2–5 days"},
    "tips": {"zh": "6—9月最佳，7—8月人最多。租车是最自由的出行方式，各海湾之间公共交通不便。",
             "en": "Best June–September; most crowded in July–August. Renting a car is the most flexible option — public transport between bays is sparse."}
  },
  "theth": {
    "highlights": {"zh": ["阿尔巴尼亚阿尔卑斯山最壮观的峡谷徒步", "传统Kulla荣誉塔楼", "格鲁纳斯蓝色瀑布"],
                   "en": ["Spectacular gorge hiking in the Albanian Alps", "Traditional Kulla honour towers", "Grunas waterfall and the Blue Eye of Theth"]},
    "admission": {"zh": "部分景点收取少量维护费", "en": "Small maintenance fee at some sites"},
    "duration": {"zh": "1—3天", "en": "1–3 days"},
    "tips": {"zh": "从斯库台出发，山路崎岖建议乘坐当地越野车。7—9月是最佳徒步季。",
             "en": "Access from Shkoder by local 4WD — the mountain road is rough. Best hiking season is July–September."}
  },
  "blue-eye": {
    "highlights": {"zh": ["深达50米的神秘地下泉眼", "从深蓝到碧绿的渐变水色", "周边原始森林与自然保护区"],
                   "en": ["Mysterious spring from over 50 m underground", "Water graduating from deep blue to emerald green", "Surrounding old-growth forest and nature reserve"]},
    "admission": {"zh": "约100列克（约1欧元）", "en": "~100 ALL (~€1)"},
    "duration": {"zh": "1—2小时", "en": "1–2 hours"},
    "tips": {"zh": "禁止入水游泳，泉水约10°C且水流湍急。可与吉诺卡斯特安排一日联游。",
             "en": "Swimming is prohibited — the current is strong and water stays ~10°C. Easily combined with a Gjirokaster day trip."}
  },
  "apollonia": {
    "highlights": {"zh": ["公元前6世纪希腊殖民地遗址", "凯撒、奥古斯都曾在此学习", "保存完好的廊柱与古代剧场"],
                   "en": ["Greek colonial city founded 6th century BC", "Where Caesar and Augustus once studied", "Intact colonnades and an ancient theatre"]},
    "admission": {"zh": "约400列克（约3.5欧元）", "en": "~400 ALL (~€3.50)"},
    "duration": {"zh": "2—3小时", "en": "2–3 hours"},
    "tips": {"zh": "地拉那驾车约2小时可达，可与贝拉特安排一日联游。馆内设有精品博物馆。",
             "en": "About 2 hours' drive from Tirana; easily paired with Berat. The on-site museum is surprisingly well-curated."}
  },
  "ksamil": {
    "highlights": {"zh": ["多处白沙滩与外海岛屿", "爱奥尼亚海水晶般的能见度", "毗邻布特林特国家公园"],
                   "en": ["Several white-sand beaches and offshore islets", "Crystal visibility in the Ionian Sea", "Adjacent to Butrint National Park"]},
    "admission": {"zh": "海滩免费，泳椅出租约5—10欧元", "en": "Beaches free; sun lounger hire ~€5–10"},
    "duration": {"zh": "半天至一天", "en": "Half to full day"},
    "tips": {"zh": "7—8月非常拥挤，建议6月初或9月前往。可与布特林特遗址安排同日游览。",
             "en": "Very crowded in July–August; early June or September is quieter. Combine with Butrint on the same day."}
  },

  # ── China ─────────────────────────────────────────────────────────────────
  "great-wall": {
    "highlights": {"zh": ["世界最长的人工建筑，总长逾2万公里", "慕田峪、司马台等段落风景各异", "山脊上蜿蜒的视觉冲击无与伦比"],
                   "en": ["World's longest man-made structure, over 20,000 km", "Scenic sections at Mutianyu, Simatai and more", "Unmatched visual drama along the mountain ridgeline"]},
    "admission": {"zh": "慕田峪约40—65元人民币", "en": "Mutianyu section ~¥40–65"},
    "duration": {"zh": "3—5小时", "en": "3–5 hours"},
    "tips": {"zh": "避开八达岭拥挤人潮，选择慕田峪或司马台段，体验更真实；秋季红叶时节景色最美。",
             "en": "Skip the crowded Badaling and opt for Mutianyu or Simatai for a more authentic experience. Autumn foliage season is spectacular."}
  },
  "forbidden-city": {
    "highlights": {"zh": ["世界最大的宫殿建筑群，故宫博物院", "明清两朝24位皇帝的居所", "收藏超过180万件文物"],
                   "en": ["World's largest palace complex and premier museum", "Home to 24 emperors across the Ming and Qing dynasties", "Over 1.8 million artefacts in the collection"]},
    "admission": {"zh": "旺季60元，淡季40元（需网上预约）", "en": "Peak ¥60, off-peak ¥40 (online booking required)"},
    "duration": {"zh": "3—5小时", "en": "3–5 hours"},
    "tips": {"zh": "门票必须提前在官网预约，现场不售票。建议早上开门时入场避开人流。",
             "en": "Tickets must be booked on the official website in advance — no on-the-day sales. Arrive at opening time to beat the crowds."}
  },
  "west-lake": {
    "highlights": {"zh": ["西湖十景，四季皆有主题胜景", "苏堤春晓、断桥残雪等千年诗意", "湖区免费开放，周边寺庙众多"],
                   "en": ["Ten classic West Lake views, each season unique", "Su Causeway and Broken Bridge immortalised in poetry", "Lakeside area free; numerous temples nearby"]},
    "admission": {"zh": "湖区免费，景区内部分景点另收费", "en": "Lakeside free; some inner attractions charge separately"},
    "duration": {"zh": "半天至一天", "en": "Half to full day"},
    "tips": {"zh": "可租用自行车或乘游船游览，清晨湖面薄雾弥漫，景色最为迷人。",
             "en": "Rent a bicycle or take a cruise boat. Early morning mist on the lake makes for the most atmospheric experience."}
  },
  "jiuzhaigou": {
    "highlights": {"zh": ["五花海、五彩池等108个彩色湖泊", "镜海的倒影清晰到仿佛两个世界重叠", "列入UNESCO世界遗产和生物圈保护区"],
                   "en": ["108 multi-coloured lakes including Five-Flower Lake", "Mirror-like reflections that seem to double the world", "UNESCO World Heritage Site and Biosphere Reserve"]},
    "admission": {"zh": "旺季约220元（含景区车票）", "en": "Peak season ~¥220 (including shuttle bus)"},
    "duration": {"zh": "1—2天", "en": "1–2 days"},
    "tips": {"zh": "秋季（10月）色彩最为绚烂，但人极多；建议淡季工作日前往。海拔约2000—3000米，注意高原反应。",
             "en": "Autumn (October) offers the most vivid colours but massive crowds; try a weekday in the shoulder season. Altitude ranges 2,000–3,000 m — acclimatise gradually."}
  },
  "rice-terraces": {
    "highlights": {"zh": ["元阳哈尼梯田，千年稻作文化遗产", "日出时金色梯田倒映云海", "联合国教科文组织文化景观遗产"],
                   "en": ["Yuanyang Hani Rice Terraces, 1,300 years of cultivation", "Sunrise over golden terraces reflected in still water", "UNESCO Cultural Landscape since 2013"]},
    "admission": {"zh": "多依树等观景台联票约100元", "en": "Combined viewpoint ticket ~¥100"},
    "duration": {"zh": "1—2天", "en": "1–2 days"},
    "tips": {"zh": "最佳观景时间是11月至次年4月灌水期，日出前1小时到达观景台占位。",
             "en": "Best November–April when terraces are flooded. Arrive at the viewpoints at least an hour before sunrise to secure a spot."}
  },
  "zhangjiajie": {
    "highlights": {"zh": ["《阿凡达》灵感来源地，石英砂岩峰林", "袁家界悬浮大陆，天门山玻璃栈道", "世界自然遗产，峰林景观独一无二"],
                   "en": ["Inspiration for Avatar's floating mountains", "Yuanjiajie floating plateau and Tianmen Mountain glass walkway", "UNESCO Natural Heritage; unique sandstone pillar landscape"]},
    "admission": {"zh": "张家界国家森林公园约248元（4日票）", "en": "~¥248 for a 4-day park pass"},
    "duration": {"zh": "2—3天", "en": "2–3 days"},
    "tips": {"zh": "景区很大，建议乘观光车和索道结合徒步。云雾天气反而更有仙境感，不必强求晴天。",
             "en": "The park is vast — combine shuttle buses, cable cars and hiking. Misty days create an ethereal atmosphere; don't despair if it's not sunny."}
  },

  # ── Japan ─────────────────────────────────────────────────────────────────
  "mount-fuji": {
    "highlights": {"zh": ["日本最高峰，3,776米完美锥形火山", "7—8月登顶开放，四季各有湖边绝景", "列入UNESCO世界遗产（2013年）"],
                   "en": ["Japan's highest peak — perfect 3,776 m cone", "Summit open July–August; iconic lake views year-round", "UNESCO World Heritage Site since 2013"]},
    "admission": {"zh": "登山保全协力金2,000日元（含山梨县侧）", "en": "¥2,000 conservation fee (Yamanashi side)"},
    "duration": {"zh": "观景半天，登顶需10—15小时", "en": "Sightseeing half-day; summit hike 10–15 hrs"},
    "tips": {"zh": "不登顶也值得来，富士山本宫浅间大社和忍野八海周边风景极佳。登顶建议雇佣向导。",
             "en": "Worth visiting even without climbing — Fujisan Hongu Sengen Shrine and Oshino Hakkai offer beautiful close-up views. Hire a guide if summiting."}
  },
  "kyoto-temples": {
    "highlights": {"zh": ["1,600余座寺庙，17处UNESCO遗产建筑", "四季主题：春樱、夏绿、秋枫、冬雪", "金阁寺、清水寺、岚山竹林各具特色"],
                   "en": ["1,600+ temples including 17 UNESCO-listed structures", "Seasonal beauty: cherry blossoms, green summer, autumn foliage, winter snow", "Kinkaku-ji, Kiyomizu-dera and Arashiyama each unmissable"]},
    "admission": {"zh": "各寺庙单独收费，一般500—1,000日元", "en": "Each temple charges separately, typically ¥500–1,000"},
    "duration": {"zh": "2—4天", "en": "2–4 days"},
    "tips": {"zh": "花见（3月底—4月初）和红叶（11月中）期间人极多，住宿需提前3个月预订。",
             "en": "Cherry blossom (late March–early April) and autumn foliage (mid-November) bring enormous crowds; book accommodation 3 months ahead."}
  },
  "tokyo-shibuya": {
    "highlights": {"zh": ["日均逾100万人次的涩谷十字路口", "忠犬八公像，东京最著名的集合地点", "涩谷Sky展望台360°俯瞰东京夜景"],
                   "en": ["Shibuya Crossing sees over 1 million people daily", "Hachiko statue — Tokyo's most famous meeting spot", "Shibuya Sky observation deck with 360° night views"]},
    "admission": {"zh": "街区免费，涩谷Sky展望台约2,000日元", "en": "Street free; Shibuya Sky observation deck ~¥2,000"},
    "duration": {"zh": "半天至一天", "en": "Half to full day"},
    "tips": {"zh": "涩谷十字路口最佳观景点是涩谷站二楼星巴克或对面的 Mag's Park 观景台，无需消费。",
             "en": "The best free vantage point for the crossing is the second-floor Starbucks in Shibuya Station or the Mag's Park terrace opposite."}
  },
  "hiroshima-miyajima": {
    "highlights": {"zh": ["广岛和平纪念馆：原爆穹顶UNESCO遗产", "宫岛严岛神社海中大鸟居", "退潮可步行至鸟居脚下近距离观看"],
                   "en": ["Hiroshima Peace Memorial and A-Bomb Dome UNESCO site", "Itsukushima Shrine's torii gate rising from the sea", "At low tide you can walk right up to the gate"]},
    "admission": {"zh": "和平纪念馆200日元，宫岛神社免费", "en": "Peace Museum ¥200; Miyajima Shrine free"},
    "duration": {"zh": "一天（含宫岛半日）", "en": "Full day (including half-day Miyajima)"},
    "tips": {"zh": "出发前查看宫岛潮汐表，退潮时段才能走到鸟居旁边。牡蛎和枫叶馒头是当地必尝美食。",
             "en": "Check tide tables before going — only at low tide can you approach the torii on foot. Try the local oysters and momiji manju (maple-leaf cakes)."}
  },
  "osaka-castle": {
    "highlights": {"zh": ["1583年丰臣秀吉始建，日本最著名城堡之一", "天守阁内日本统一历史博物馆", "护城河外约600棵樱花树春季盛开"],
                   "en": ["Built 1583 by Toyotomi Hideyoshi; Japan's most iconic castle", "Museum inside the keep chronicles Japan's unification", "~600 cherry trees in the outer grounds bloom each spring"]},
    "admission": {"zh": "天守阁600日元，外围公园免费", "en": "Castle keep ¥600; outer park free"},
    "duration": {"zh": "2—3小时", "en": "2–3 hours"},
    "tips": {"zh": "城堡公园本身免费开放，樱花季节在外围野餐非常惬意，无需进入天守阁。",
             "en": "The castle park itself is free. During cherry blossom season, a picnic in the outer grounds is the quintessential experience — no need to enter the keep."}
  },

  # ── India ─────────────────────────────────────────────────────────────────
  "taj-mahal": {
    "highlights": {"zh": ["莫卧儿帝国爱情宫殿，世界新七大奇迹之一", "白色大理石在不同光线下呈现不同色彩", "波斯、印度、伊斯兰建筑艺术的完美融合"],
                   "en": ["Mughal love monument and one of the New Seven Wonders", "White marble shifts colour from gold at dawn to pearlescent at dusk", "Perfect synthesis of Persian, Indian and Islamic architecture"]},
    "admission": {"zh": "外国游客约1,100卢比（约92元）", "en": "Foreign visitors ~₹1,100 (~US$13)"},
    "duration": {"zh": "2—3小时", "en": "2–3 hours"},
    "tips": {"zh": "日出时分光线最美人最少，建议购买提前预约票。周五全天关闭，注意错开。",
             "en": "Sunrise is the most beautiful and least crowded time. Book tickets online in advance. Closed all day Friday."}
  },
  "varanasi": {
    "highlights": {"zh": ["印度最古老的城市之一，恒河边最神圣的朝圣地", "日出时恒河沐浴仪式与晨祷", "夜晚的恒河火供仪式（Ganga Aarti）震撼人心"],
                   "en": ["One of the world's oldest cities; holiest Hindu pilgrimage site", "Dawn bathing rituals and prayers on the Ganges ghats", "Nightly Ganga Aarti fire ceremony on the riverbank"]},
    "admission": {"zh": "大多数区域免费", "en": "Most areas free"},
    "duration": {"zh": "2—3天", "en": "2–3 days"},
    "tips": {"zh": "乘坐晨间船只游览各大ghats是必选项目；尊重当地宗教习俗，着装保守，拍照前征得同意。",
             "en": "An early-morning boat ride along the ghats is essential. Dress modestly and always ask permission before photographing cremation sites or rituals."}
  },
  "kerala-backwaters": {
    "highlights": {"zh": ["超过900公里的内陆水网、湖泊与运河", "传统双层柚木游船（Kettuvallam）住宿体验", "椰林掩映的宁静水道，与世隔绝"],
                   "en": ["Over 900 km of inland waterways, lakes and canals", "Overnight stays on traditional teak houseboats (kettuvallam)", "Palm-fringed backwaters offering complete tranquillity"]},
    "admission": {"zh": "船屋通常按天计费，约3,000—8,000卢比/天/船", "en": "Houseboats typically ₹3,000–8,000/day per boat"},
    "duration": {"zh": "1—2天（船屋体验）", "en": "1–2 days (houseboat experience)"},
    "tips": {"zh": "阿莱皮（Alleppey）是预订船屋最方便的出发点，10—3月气候最宜人，避开季风季节。",
             "en": "Alleppey (Alappuzha) is the best base for booking houseboats. October–March is the most pleasant season; avoid the monsoon."}
  },
  "jaipur-pink-city": {
    "highlights": {"zh": ["粉红城市，整座旧城建筑统一刷成陶土粉色", "风之宫殿（Hawa Mahal）953个蜂窝状格窗", "琥珀堡（Amber Fort）雄踞山顶，壮观无比"],
                   "en": ["The 'Pink City' — entire old town uniformly painted terracotta pink", "Hawa Mahal's 953 honeycombed lattice windows", "Amber Fort dramatically crowning the hilltop"]},
    "admission": {"zh": "琥珀堡约500卢比，风之宫殿约200卢比", "en": "Amber Fort ~₹500; Hawa Mahal ~₹200"},
    "duration": {"zh": "一天", "en": "Full day"},
    "tips": {"zh": "斋普尔是「黄金三角」（德里—阿格拉—斋普尔）的一角，三城联游最为经济高效。",
             "en": "Jaipur forms one point of the 'Golden Triangle' with Delhi and Agra — the three cities together make a highly efficient itinerary."}
  },
  "goa-beaches": {
    "highlights": {"zh": ["北果阿的葡式殖民建筑与夜市文化", "南果阿帕洛莱姆等宁静原始海湾", "果阿独特的印葡融合美食"],
                   "en": ["North Goa's Portuguese colonial architecture and night markets", "Quieter, pristine beaches in South Goa like Palolem", "Unique Indo-Portuguese fusion cuisine"]},
    "admission": {"zh": "海滩免费", "en": "Beaches free"},
    "duration": {"zh": "3—7天", "en": "3–7 days"},
    "tips": {"zh": "11月至2月是旺季，气候最宜人；6—9月季风大雨，大多数度假村关闭。",
             "en": "November–February is the ideal season; June–September brings heavy monsoon rains and most resorts close."}
  },

  # ── France ────────────────────────────────────────────────────────────────
  "eiffel-tower": {
    "highlights": {"zh": ["高324米，1889年世博会建成，巴黎最高建筑", "三层观景台，夜晚整点闪灯10分钟", "每年吸引逾700万游客，全球参观人数最多的收费景点"],
                   "en": ["324 m tall, built for the 1889 World's Fair", "Three observation decks; light show every hour after dark", "Over 7 million visitors/year — world's most visited paid monument"]},
    "admission": {"zh": "步行至二楼约11欧元，电梯至顶约29欧元", "en": "Stairs to 2nd floor ~€11; lift to summit ~€29"},
    "duration": {"zh": "1.5—3小时", "en": "1.5–3 hours"},
    "tips": {"zh": "提前在官网预约时段票，现场排队可能超过2小时。从战神广场对面欣赏铁塔全景完全免费。",
             "en": "Book timed entry tickets on the official website — walk-up queues can exceed 2 hours. The view from Champ-de-Mars across the Seine is free and equally stunning."}
  },
  "louvre": {
    "highlights": {"zh": ["世界最大博物馆，馆藏超35,000件展品", "《蒙娜丽莎》《米洛的维纳斯》《胜利女神》三件镇馆之宝", "拿破仑三世精美华宴厅等非艺术展区同样值得一看"],
                   "en": ["World's largest museum; over 35,000 works on display", "Mona Lisa, Venus de Milo and Winged Victory in one building", "Napoleon III's opulent apartments worth seeing beyond the art"]},
    "admission": {"zh": "22欧元（网上预约）", "en": "€22 (online booking recommended)"},
    "duration": {"zh": "3—5小时（看完需数日）", "en": "3–5 hrs (the full collection takes days)"},
    "tips": {"zh": "优先用Richelieu翼或Denon翼入口，绕开玻璃金字塔的长队。周五至22点，晚间人较少。",
             "en": "Enter via the Richelieu or Denon wings to avoid the pyramid queue. Open until 22:00 on Fridays — evenings are significantly less crowded."}
  },
  "mont-saint-michel": {
    "highlights": {"zh": ["诺曼底潮汐岛修道院，中世纪奇迹之一", "涨潮时四面环海，退潮时可步行而至", "列入UNESCO世界遗产，年访客逾300万"],
                   "en": ["Normandy tidal island and abbey — a medieval wonder", "Surrounded by sea at high tide; walkable at low tide", "UNESCO World Heritage Site; over 3 million visitors/year"]},
    "admission": {"zh": "修道院约13欧元，岛屿本身免费", "en": "Abbey ~€13; the island itself is free"},
    "duration": {"zh": "半天至一天", "en": "Half to full day"},
    "tips": {"zh": "出发前查看潮汐时刻表；住在岛上一夜可体验游客散去后的寂静，体验截然不同。",
             "en": "Check tide times before visiting. Staying overnight on the island lets you experience it after the day-trippers leave — a completely different atmosphere."}
  },
  "chateau-loire": {
    "highlights": {"zh": ["卢瓦尔河谷拥有逾300座城堡，法国城堡最密集地区", "香波尔城堡双螺旋楼梯据传由达芬奇设计", "列入UNESCO世界遗产的「法国花园」"],
                   "en": ["Over 300 châteaux in the Loire Valley — France's castle heartland", "Chambord's double-helix staircase attributed to Leonardo da Vinci", "UNESCO-listed 'Garden of France' landscape"]},
    "admission": {"zh": "香波尔城堡约14.5欧元，各城堡单独收费", "en": "Chambord ~€14.50; each château charges separately"},
    "duration": {"zh": "2—4天（游览多个城堡）", "en": "2–4 days (to cover several châteaux)"},
    "tips": {"zh": "骑自行车是游览城堡群最惬意的方式，卢瓦河畔设有完善的骑行道。",
             "en": "Cycling between châteaux along the Loire à Vélo cycling route is the most pleasurable way to explore the valley."}
  },
  "provence-lavender": {
    "highlights": {"zh": ["6—7月薰衣草盛开，瓦朗索勒高原一望无际", "塞农克修道院是最经典的薰衣草取景地", "普罗旺斯集市、橄榄油和葛朗克峡谷"],
                   "en": ["Lavender peaks June–July across the Valensole plateau", "Sénanque Abbey — the most photographed lavender scene", "Provençal markets, olive oil and the Gorges du Verdon"]},
    "admission": {"zh": "薰衣草田免费观赏，修道院约5欧元", "en": "Lavender fields free to view; abbey ~€5"},
    "duration": {"zh": "2—4天", "en": "2–4 days"},
    "tips": {"zh": "薰衣草花期因年份和地点而异，出发前可查看当地农场实时开花状况。避开7月14日国庆节的拥堵。",
             "en": "Bloom timing varies by year and location — check farm websites for real-time flowering status. Avoid the traffic around Bastille Day (14 July)."}
  },

  # ── Italy ─────────────────────────────────────────────────────────────────
  "colosseum": {
    "highlights": {"zh": ["公元72年建成，古罗马最大角斗场，可容纳5万观众", "俯瞰罗马广场和帕拉蒂尼山的完整古罗马景观", "意大利参观人数最多的景点，每年超700万人"],
                   "en": ["Built AD 72; ancient Rome's largest amphitheatre, seating 50,000", "Sweeping views over the Roman Forum and Palatine Hill", "Italy's most visited monument; over 7 million/year"]},
    "admission": {"zh": "联票（含罗马广场）约18欧元，强烈建议网上预约", "en": "Combined ticket with Forum ~€18; online booking strongly recommended"},
    "duration": {"zh": "2—3小时", "en": "2–3 hours"},
    "tips": {"zh": "预约跳队必须，现场排队可达2—3小时。清晨或傍晚光线最美，拍摄效果最好。",
             "en": "Pre-booking is essential — walk-up queues can reach 2–3 hours. Early morning and golden hour light offer the best photography conditions."}
  },
  "venice-canals": {
    "highlights": {"zh": ["世界唯一以运河为街道的历史城市", "贡多拉、水上公共汽车（vaporetto）等独特交通方式", "圣马可广场、叹息桥、里亚托桥等地标建筑"],
                   "en": ["The world's only historic city built on canals", "Gondolas and vaporetto water buses as urban transport", "St Mark's Basilica, Bridge of Sighs and Rialto Bridge"]},
    "admission": {"zh": "旺季游客需缴纳日间入场费（约5欧元）", "en": "Day-tripper access fee ~€5 during peak periods"},
    "duration": {"zh": "1—3天", "en": "1–3 days"},
    "tips": {"zh": "尽量住在岛内，深夜潮水退去后的威尼斯最为迷人。避开8月高温和高水位（Acqua Alta）季节。",
             "en": "Stay overnight on the island if possible. Venice at midnight, after day-trippers leave, is magical. Avoid August heat and the Acqua Alta flooding season (Oct–Jan)."}
  },
  "amalfi-coast": {
    "highlights": {"zh": ["联合国教科文组织世界遗产悬崖海岸线", "波西塔诺彩色渔村，全球摄影最多的度假地之一", "SS163海岸公路是欧洲最壮观的驾车路线之一"],
                   "en": ["UNESCO World Heritage coastal cliffscape", "Positano's pastel fishing village — among the world's most photographed", "SS163 coast road — one of Europe's most spectacular drives"]},
    "admission": {"zh": "海滩免费，部分私人沙滩收费", "en": "Public beaches free; private beach clubs charge"},
    "duration": {"zh": "2—3天", "en": "2–3 days"},
    "tips": {"zh": "7—8月路窄车多，极度拥堵；建议乘渡轮代替自驾，或选择5月/9月前往。",
             "en": "July–August is severely congested on the narrow coast road; take ferries between towns instead of driving, or visit in May or September."}
  },
  "tuscany-landscape": {
    "highlights": {"zh": ["鳞次栉比的柏树、葡萄园和石砌农庄构成世界最美乡村之一", "锡耶纳、圣吉米尼亚诺等中世纪UNESCO小城", "基安蒂产区世界级葡萄酒品鉴"],
                   "en": ["Cypress rows, vineyards and stone farmhouses — one of Earth's most beautiful rural landscapes", "Siena and San Gimignano, medieval UNESCO hill towns", "World-class Chianti wine tasting in the heartland"]},
    "admission": {"zh": "乡村景区免费，城镇景点单独收费", "en": "Countryside free; town attractions charge separately"},
    "duration": {"zh": "3—5天", "en": "3–5 days"},
    "tips": {"zh": "租车是游览托斯卡纳的最佳方式，可以自由进入那些无法通达的小山村。春季（4—5月）和秋季（9—10月）最美。",
             "en": "A rental car is essential for reaching hilltop villages off the beaten track. Spring (April–May) and autumn (September–October) offer the best landscapes and temperatures."}
  },
  "cinque-terre": {
    "highlights": {"zh": ["五座彩色悬崖渔村组成的UNESCO海岸遗产", "村落间的滨海步道（Sentiero Azzurro）徒步", "马纳罗拉和韦尔纳扎是最上镜的两个村庄"],
                   "en": ["Five colourful clifftop fishing villages; UNESCO World Heritage Coast", "Coastal hiking trail (Sentiero Azzurro) linking the villages", "Manarola and Vernazza the most photogenic of the five"]},
    "admission": {"zh": "Cinque Terre Card约7.5欧元/天（含徒步道通行证）", "en": "Cinque Terre Card ~€7.50/day (includes trail access)"},
    "duration": {"zh": "1—2天", "en": "1–2 days"},
    "tips": {"zh": "旺季（6—9月）部分步道因超负荷临时关闭；7月极为拥挤，建议淡季前往。La Spezia是性价比最高的住宿基地。",
             "en": "Some trails close temporarily in peak season due to overcrowding. July is extremely busy; shoulder season is far more pleasant. La Spezia makes a good and cheaper base."}
  },

  # ── Greece ────────────────────────────────────────────────────────────────
  "acropolis": {
    "highlights": {"zh": ["帕台农神庙，公元前447年建成，古典建筑巅峰之作", "俯瞰雅典全城的制高点", "卫城博物馆收藏大量原件雕塑"],
                   "en": ["Parthenon, built 447 BC — the pinnacle of classical architecture", "Commanding hilltop views over all of Athens", "Acropolis Museum houses many original sculptures"]},
    "admission": {"zh": "旺季约30欧元（含周边遗址联票）", "en": "Peak season ~€30 (combined with surrounding sites)"},
    "duration": {"zh": "2—3小时", "en": "2–3 hours"},
    "tips": {"zh": "清晨开门时人最少，7—8月中午高温酷热。参观当日凭票也可进入古代市集等其他遗址。",
             "en": "Arrive at opening time to beat the crowds. July–August midday heat is intense — go early or late. Your ticket also grants access to the Ancient Agora and other sites on the same day."}
  },
  "santorini": {
    "highlights": {"zh": ["火山岛特有的黑色、红色火山沙滩", "伊亚（Oia）日落，全球最著名落日景观之一", "卡特里（Fira）悬崖边的白蓝建筑群"],
                   "en": ["Unique volcanic black and red sand beaches", "Oia sunset — one of the world's most famous", "Fira's clifftop white-and-blue architecture"]},
    "admission": {"zh": "岛屿免费，古塞拉遗址等景点单独收费", "en": "Island free; ancient sites like Akrotiri charge separately"},
    "duration": {"zh": "2—4天", "en": "2–4 days"},
    "tips": {"zh": "6月初或9月中是最佳时机，避开7—8月的顶级旺季。伊亚日落一定要提前1小时占位。",
             "en": "Early June or mid-September is ideal — July–August is peak and very crowded. Arrive at least an hour early for a good spot for the Oia sunset."}
  },
  "meteora": {
    "highlights": {"zh": ["巨大砂岩岩柱顶端建有6座东正教修道院，气势磅礴", "拜占庭时期修士为逃避迫害在此隐居", "列入UNESCO世界遗产"],
                   "en": ["Six Eastern Orthodox monasteries perched atop enormous sandstone pillars", "Byzantine monks settled here to escape persecution", "UNESCO World Heritage Site"]},
    "admission": {"zh": "每座修道院约3欧元（共6座，通常一天可游4—5座）", "en": "~€3 per monastery (6 total; 4–5 doable in a day)"},
    "duration": {"zh": "一天", "en": "Full day"},
    "tips": {"zh": "进入修道院须着长裤/长裙，女性需遮头。日出时从卡兰巴卡镇向上望，光线最为壮观。",
             "en": "Modest dress required — long trousers/skirts and head coverings for women. The view from Kalambaka town at sunrise is as dramatic as the monasteries themselves."}
  },
  "crete-island": {
    "highlights": {"zh": ["希腊最大岛屿，米诺斯文明的摇篮", "克诺索斯宫殿遗址，欧洲最古老的文明中心之一", "萨马里亚峡谷，欧洲最长峡谷徒步路线"],
                   "en": ["Greece's largest island; cradle of Minoan civilisation", "Palace of Knossos — one of Europe's oldest centres of civilisation", "Samaria Gorge — Europe's longest gorge hike"]},
    "admission": {"zh": "克诺索斯宫殿约15欧元，萨马里亚峡谷约5欧元", "en": "Knossos ~€15; Samaria Gorge ~€5"},
    "duration": {"zh": "3—7天", "en": "3–7 days"},
    "tips": {"zh": "克里特岛非常大，东、西、南海岸各有特色，建议租车游览。伊拉克利翁考古博物馆不容错过。",
             "en": "Crete is large — the east, west and south coasts all have distinct character. Rent a car. Don't miss the Heraklion Archaeological Museum."}
  },

  # ── USA ───────────────────────────────────────────────────────────────────
  "statue-of-liberty": {
    "highlights": {"zh": ["1886年法国赠送美国的自由女神像，高93米", "可登上皇冠内部俯瞰纽约港（需提前数月预订）", "埃利斯岛移民博物馆同票可进"],
                   "en": ["France's 1886 gift to America; 93 m total height", "Crown access gives panoramic views of NY Harbour (book months ahead)", "Combined entry includes Ellis Island Immigration Museum"]},
    "admission": {"zh": "渡轮+观景台约25美元，皇冠门票须提前数月预订", "en": "Ferry + grounds ~US$25; crown tickets sell out months in advance"},
    "duration": {"zh": "3—5小时（含往返渡轮）", "en": "3–5 hours (including ferry)"},
    "tips": {"zh": "皇冠门票需提前至少3个月预订；仅参观底座和露台也非常值得，无需皇冠票。",
             "en": "Crown tickets must be reserved at least 3 months ahead. The pedestal and grounds alone are well worth the trip without crown access."}
  },
  "times-square": {
    "highlights": {"zh": ["曼哈顿中心，全球最繁忙的广场之一，每年逾5,000万人次", "百老汇剧院区入口，霓虹灯彻夜不息", "新年倒计时「水晶球降落」地点"],
                   "en": ["Midtown Manhattan's heart; over 50 million visitors/year", "Gateway to Broadway theatre district; neon signs 24/7", "Site of the New Year's Eve ball drop"]},
    "admission": {"zh": "免费", "en": "Free"},
    "duration": {"zh": "1—2小时", "en": "1–2 hours"},
    "tips": {"zh": "夜晚霓虹灯全亮时最为震撼；百老汇演出建议提前在官网购买折扣票（TKTS售亭可获当日折扣票）。",
             "en": "Most impressive after dark when all the neon is blazing. For Broadway shows, buy discounted tickets at the TKTS booth or online in advance."}
  },
  "golden-gate": {
    "highlights": {"zh": ["1937年完工，全长2.7公里的悬索大桥", "旧金山最具标志性的地标，橙红色设计举世无双", "可步行或骑行穿越，俯瞰旧金山湾全景"],
                   "en": ["Completed 1937; 2.7 km suspension bridge", "San Francisco's most iconic landmark in its distinctive 'International Orange'", "Walk or cycle across for panoramic views of the bay"]},
    "admission": {"zh": "步行/骑行免费，驾车通行收费", "en": "Free to walk or cycle; toll for drivers"},
    "duration": {"zh": "1—2小时（步行过桥约30分钟）", "en": "1–2 hours (30-min walk across)"},
    "tips": {"zh": "大桥经常被晨雾遮盖，反而增添神秘感；下午雾气渐散，Marin Headlands对岸视角最佳。",
             "en": "Morning fog often partially shrouds the bridge — romantic rather than disappointing. The Marin Headlands viewpoint across the bay offers the best full-bridge perspective in the afternoon."}
  },
  "yellowstone": {
    "highlights": {"zh": ["世界上最大的地热区，拥有超过10,000处地热奇观", "老忠实喷泉（Old Faithful）每90分钟喷发一次", "野牛、灰熊、狼等大型野生动物自由漫步"],
                   "en": ["World's largest geothermal area with over 10,000 hydrothermal features", "Old Faithful geyser erupts roughly every 90 minutes", "Bison, grizzly bears and wolves roam freely"]},
    "admission": {"zh": "约35美元/车（7日通行证）", "en": "~US$35/vehicle (7-day pass)"},
    "duration": {"zh": "2—4天", "en": "2–4 days"},
    "tips": {"zh": "5—9月最适合游览，7—8月道路拥挤需提前预订住宿；黄石湖畔的日出和大棱镜彩泉是必访之地。",
             "en": "May–September is best; July–August is very busy so book lodging far ahead. The Grand Prismatic Spring and Yellowstone Lake sunrise are unmissable."}
  },
  "grand-canyon": {
    "highlights": {"zh": ["深达1,800米、长446公里的世界级峡谷", "南缘全年开放，北缘仅夏季开放", "日出日落时峡谷色彩瞬息万变"],
                   "en": ["1,800 m deep and 446 km long — a geological marvel", "South Rim open year-round; North Rim summer only", "Sunrise and sunset transform the canyon's colours by the minute"]},
    "admission": {"zh": "约35美元/车（7日通行证）", "en": "~US$35/vehicle (7-day pass)"},
    "duration": {"zh": "1—3天", "en": "1–3 days"},
    "tips": {"zh": "步行进入峡谷比想象中难得多，夏季切勿独自下谷；必须携带充足饮水和食物。",
             "en": "Hiking into the canyon is far harder than it looks. Never hike below the rim in summer midday heat; carry much more water than you think you'll need."}
  },
  "hawaii-volcanoes": {
    "highlights": {"zh": ["世界上少数可以近距离观察活跃熔岩流的地点之一", "基拉韦厄火山是地球上最活跃的盾状火山", "火山口附近的夜间红光是独一无二的自然奇观"],
                   "en": ["One of the few places to safely observe active lava flows", "Kilauea is Earth's most continuously active shield volcano", "Glow from the summit lava lake at night is otherworldly"]},
    "admission": {"zh": "约35美元/车（7日通行证）", "en": "~US$35/vehicle (7-day pass)"},
    "duration": {"zh": "一天", "en": "Full day"},
    "tips": {"zh": "火山活动状态每天都在变化，出发前查看公园官网确认当前可访问区域。熔岩气体有害健康，呼吸系统敏感者需注意。",
             "en": "Volcanic activity changes daily — check the park website before visiting. Volcanic smog (vog) can irritate lungs; those with respiratory conditions should take precautions."}
  },
  "miami-beach": {
    "highlights": {"zh": ["南海滩（South Beach）是全美最著名的城市海滩之一", "奥歇尔区Art Deco建筑群，粉白色调独树一帜", "科勒尔盖布尔斯、温伍德涂鸦艺术区"],
                   "en": ["South Beach — one of America's most famous urban beaches", "Art Deco Historic District in pastel pinks and whites", "Wynwood Walls street art district and Coral Gables"]},
    "admission": {"zh": "海滩免费，Art Deco博物馆约5美元", "en": "Beach free; Art Deco Museum ~US$5"},
    "duration": {"zh": "2—4天", "en": "2–4 days"},
    "tips": {"zh": "11月至4月是旺季，气候宜人；6—10月高温潮湿，偶有飓风。停车昂贵，推荐使用共享单车。",
             "en": "November–April is peak season with ideal weather. June–October is hot, humid and hurricane-prone. Parking is expensive — rent a bike or use rideshare."}
  },

  # ── Canada ────────────────────────────────────────────────────────────────
  "niagara-falls": {
    "highlights": {"zh": ["北美最大瀑布群，落差超50米，年水量约567亿升", "「雾中少女号」游船深入瀑布水雾", "美加两侧各有观景角度，加拿大侧视角更优"],
                   "en": ["North America's greatest waterfall; drop over 50 m", "Hornblower/Maid of the Mist boat rides into the mist", "Canadian side offers a wider, superior panoramic view"]},
    "admission": {"zh": "景区免费，游船约约30加元", "en": "Park free; boat ride ~CAD$30"},
    "duration": {"zh": "半天至一天", "en": "Half to full day"},
    "tips": {"zh": "加拿大侧（安大略省）视角远优于美国侧。夜晚灯光秀免费观赏，非常壮观。",
             "en": "The Canadian (Ontario) side has a far better panoramic view. The free nightly illumination show is spectacular and easy to see from the promenade."}
  },
  "banff": {
    "highlights": {"zh": ["班夫国家公园，加拿大最古老的国家公园", "路易斯湖冰川翡翠色湖水，全球最美高山湖之一", "弓河瀑布和磺磺山缆车等经典景观"],
                   "en": ["Canada's oldest national park in the Rockies", "Lake Louise — glacier-fed emerald water; one of the world's most beautiful mountain lakes", "Bow Falls, Sulphur Mountain gondola and Icefields Parkway"]},
    "admission": {"zh": "约21加元/人/天（国家公园通行证）", "en": "~CAD$21/person/day (national park pass)"},
    "duration": {"zh": "2—5天", "en": "2–5 days"},
    "tips": {"zh": "7—8月路易斯湖停车位极为紧张，建议搭乘免费公园班车。6月或9月可避开拥挤且价格更低。",
             "en": "Lake Louise parking fills by 7 a.m. in July–August — take the free park shuttle. June and September offer far fewer crowds and lower accommodation prices."}
  },
  "quebec-city": {
    "highlights": {"zh": ["北美唯一仍有完整城墙的大城市", "Old Quebec（下城和上城）UNESCO世界遗产", "冬季嘉年华和芳提纳城堡是标志性体验"],
                   "en": ["Only walled city north of Mexico", "Old Quebec (Lower and Upper Town) — UNESCO World Heritage", "Winter Carnival and Château Frontenac are iconic experiences"]},
    "admission": {"zh": "旧城区免费，城墙博物馆约16加元", "en": "Old town free; fortification museum ~CAD$16"},
    "duration": {"zh": "2—3天", "en": "2–3 days"},
    "tips": {"zh": "冬季（1—2月）嘉年华期间虽然寒冷但气氛极佳；7月热闹宜人，6月末价格更亲民。",
             "en": "The Winter Carnival (January–February) is cold but exhilarating. July is lively and pleasant; late June offers better prices before peak season."}
  },

  # ── Mexico ────────────────────────────────────────────────────────────────
  "chichen-itza": {
    "highlights": {"zh": ["玛雅文明最重要的古城遗址，世界新七大奇迹", "库库尔坎金字塔，春秋分日出现蛇影奇观", "列入UNESCO世界遗产"],
                   "en": ["Most important Maya city ruin and one of the New Seven Wonders", "El Castillo pyramid — serpent shadow phenomenon at equinox", "UNESCO World Heritage Site"]},
    "admission": {"zh": "约581比索（约34美元），门票含税", "en": "~595 MXN (~US$34 including state tax)"},
    "duration": {"zh": "3—4小时", "en": "3–4 hours"},
    "tips": {"zh": "清晨开园时前往，中午极为酷热。从坎昆或梅里达都有一日游，梅里达出发体验更好。",
             "en": "Arrive at opening time — midday heat is brutal. Day trips run from Cancún or Mérida; departing from Mérida gives more time and a better experience."}
  },
  "cancun": {
    "highlights": {"zh": ["加勒比海透明度极高的碧绿海水和白沙滩", "岛礁浮潜与深潜，海洋生态丰富", "尼尔赛克雷托水下博物馆（MUSA）"],
                   "en": ["Caribbean water of extraordinary clarity; white-sand beaches", "Excellent snorkelling and diving on offshore reefs", "MUSA underwater museum of submerged sculptures"]},
    "admission": {"zh": "海滩免费，浮潜团约30—60美元", "en": "Beaches free; snorkel tours ~US$30–60"},
    "duration": {"zh": "3—7天", "en": "3–7 days"},
    "tips": {"zh": "12月至4月旱季气候最佳；6—10月雨季偶有飓风。酒店区（Zona Hotelera）价格较贵，Downtown性价比更高。",
             "en": "December–April is the dry season with ideal weather. June–October is hurricane season. Downtown Cancún is significantly cheaper than the Hotel Zone."}
  },
  "mexico-city-historic": {
    "highlights": {"zh": ["墨西哥城历史中心，阿兹特克文明遗址上建起的殖民城市", "宪法广场（Zócalo）是全美洲最大的广场之一", "人类学博物馆馆藏世界上最重要的前哥伦布文明文物"],
                   "en": ["Historic centre built atop the Aztec capital Tenochtitlán", "Zócalo — one of the Americas' largest plazas", "National Museum of Anthropology — world's finest pre-Columbian collection"]},
    "admission": {"zh": "历史中心免费，人类学博物馆约90比索（约5美元）", "en": "Historic centre free; Anthropology Museum ~MXN$90 (~US$5)"},
    "duration": {"zh": "2—3天", "en": "2–3 days"},
    "tips": {"zh": "乘坐地铁是最快捷经济的市内交通方式。海拔2,240米，初来者需注意高原反应。",
             "en": "The Metro is the fastest and cheapest way to get around. At 2,240 m altitude, allow a day to acclimatise on arrival."}
  },

  # ── Brazil ────────────────────────────────────────────────────────────────
  "christ-redeemer": {
    "highlights": {"zh": ["高38米（含底座98米），里约热内卢最著名地标", "张开双臂俯瞰瓜纳巴拉湾全景", "世界新七大奇迹之一"],
                   "en": ["38 m tall statue (98 m including pedestal); Rio's defining landmark", "Arms-outstretched figure overlooking Guanabara Bay", "One of the New Seven Wonders of the World"]},
    "admission": {"zh": "约98巴西雷亚尔（含齿轨电车或小巴）", "en": "~BRL$98 (including cog railway or minibus)"},
    "duration": {"zh": "2—3小时", "en": "2–3 hours"},
    "tips": {"zh": "提前网上预约门票；雾天视野差，晴天出行。可选择步行2小时山路减少等待，但较为耗体力。",
             "en": "Book tickets online in advance. Go on a clear day — fog can obscure the statue and views entirely. The 2-hour hike up avoids queues but is strenuous."}
  },
  "amazon-rainforest": {
    "highlights": {"zh": ["世界上最大的热带雨林，占地550万平方公里", "全球物种多样性最丰富的地区，有超过40,000种植物", "亚马逊河是世界流量最大的河流"],
                   "en": ["World's largest tropical rainforest; 5.5 million km²", "Earth's most biodiverse region with over 40,000 plant species", "Amazon River carries more water than any other river on Earth"]},
    "admission": {"zh": "自助游需导游，费用因线路而异（约500—2,000美元/人/周）", "en": "Self-guided not recommended; guided tours ~US$500–2,000/person/week"},
    "duration": {"zh": "3—7天", "en": "3–7 days"},
    "tips": {"zh": "马瑙斯（Manaus）是深入亚马逊最便捷的出发地；7—10月（旱季）陆路探险更容易，11—6月洪水期则以船游为主。",
             "en": "Manaus is the most accessible gateway. July–October (dry season) is better for land-based exploration; the flood season (November–June) means boat-based touring."}
  },
  "iguazu-falls": {
    "highlights": {"zh": ["世界最宽瀑布群，宽约2,700米，拥有275条瀑布", "巴西侧可俯瞰全景，阿根廷侧可走入瀑布中间", "「恶魔的咽喉」（Devil's Throat）是最壮观的单条瀑布"],
                   "en": ["World's widest waterfall system; ~2,700 m wide with 275 falls", "Brazil side for the panorama; Argentina side to walk among the falls", "Devil's Throat — the most thunderous single cascade"]},
    "admission": {"zh": "巴西侧约75巴西雷亚尔，阿根廷侧约5,000阿根廷比索", "en": "Brazil side ~BRL$75; Argentina side ~ARS$5,000"},
    "duration": {"zh": "1—2天（两侧各一天最好）", "en": "1–2 days (ideally one day each side)"},
    "tips": {"zh": "两侧都值得游览，多数人选择住在巴西的福斯-杜伊瓜苏或阿根廷的伊瓜苏港，跨境便捷。",
             "en": "Visit both sides if possible — each offers a completely different perspective. Foz do Iguaçu (Brazil) or Puerto Iguazú (Argentina) are the main bases, with easy border crossings."}
  },
  "rio-carnival": {
    "highlights": {"zh": ["全球最大的狂欢节，每年逾200万人涌入街头", "桑巴舞校在桑巴馆的表演堪称艺术巅峰", "里约科帕卡巴纳和伊帕内玛海滩是狂欢中心"],
                   "en": ["World's largest carnival; over 2 million people in the streets daily", "Samba school parades at the Sambadrome — a peak of artistic spectacle", "Copacabana and Ipanema beaches are the centre of the street party"]},
    "admission": {"zh": "桑巴馆门票约120—2,000美元（视位置而定）", "en": "Sambadrome tickets ~US$120–2,000 depending on section"},
    "duration": {"zh": "4—7天（嘉年华期间）", "en": "4–7 days (during Carnival)"},
    "tips": {"zh": "狂欢节通常在2月或3月举行（复活节前40天），机票和酒店须提前至少6个月预订。",
             "en": "Carnival falls in February or March (40 days before Easter). Book flights and hotels at least 6 months in advance — prices and demand are extreme during the event."}
  },

  # ── Peru ─────────────────────────────────────────────────────────────────
  "machu-picchu": {
    "highlights": {"zh": ["15世纪印加文明最完整的城市遗址，「失落的天空之城」", "云雾环绕的安第斯山峰之间，壮观程度超乎想象", "世界新七大奇迹，UNESCO世界遗产"],
                   "en": ["Most complete Inca city ruin; the 'Lost City in the Clouds'", "Cloud-wreathed Andean setting that exceeds all expectations", "New Seven Wonders and UNESCO World Heritage Site"]},
    "admission": {"zh": "约152美元（含华纳比丘山）", "en": "~US$152 (including Huayna Picchu mountain)"},
    "duration": {"zh": "半天至一天", "en": "Half to full day"},
    "tips": {"zh": "门票必须提前在官网预约，每日限额；从库斯科乘火车到阿瓜斯卡连特斯（印加热水城）再转巴士是标准路线。",
             "en": "Timed tickets must be booked well in advance on the official website — daily visitor numbers are strictly capped. Train from Cusco to Aguas Calientes, then bus up, is the standard route."}
  },
  "lake-titicaca": {
    "highlights": {"zh": ["海拔3,812米，世界上海拔最高的可通航湖泊", "乌罗斯浮岛：印第安人用芦苇编织的人工岛屿", "太阳岛（Isla del Sol）是印加神话的发源地"],
                   "en": ["At 3,812 m, the world's highest navigable lake", "Uros Floating Islands — handmade reed islands inhabited for centuries", "Isla del Sol — birthplace of the Inca sun god in mythology"]},
    "admission": {"zh": "湖区游船约30—50美元", "en": "Lake tours ~US$30–50"},
    "duration": {"zh": "1—2天", "en": "1–2 days"},
    "tips": {"zh": "普诺（Puno）是游览的最佳出发地。海拔极高，建议在库斯科适应一天后再前往，备好高山病药物。",
             "en": "Puno is the best base. Altitude (3,812 m) is significant — spend a day acclimatising in Cusco first and carry altitude sickness medication."}
  },
  "nazca-lines": {
    "highlights": {"zh": ["公元1—700年间刻在沙漠地面上的巨型地画，只能从空中辨认", "蜂鸟、猴子、宇航员等200余个图形，最大达370米", "仍是人类历史之谜，无法解释其目的"],
                   "en": ["Geoglyphs etched into desert 1–700 AD, only fully visible from the air", "Over 200 figures including a hummingbird, monkey and 'astronaut'; largest 370 m across", "Purpose remains one of history's great unsolved mysteries"]},
    "admission": {"zh": "飞机观览约130—250美元/人（30分钟航班）", "en": "Scenic flight ~US$130–250/person (30-min flight)"},
    "duration": {"zh": "半天", "en": "Half day"},
    "tips": {"zh": "飞行观览前避免进食，有不少游客因小型飞机颠簸而感到不适。地面瞭望台仅能看到两条地画，不建议作为唯一方式。",
             "en": "Avoid eating before the flight — the small planes are bumpy and motion sickness is common. The ground viewpoint tower shows only two lines and is not a substitute for the flight."}
  },
  "amazon-peru": {
    "highlights": {"zh": ["伊基托斯（Iquitos）是全球最大的无公路连接城市", "亚马逊盆地秘鲁段生物多样性极为丰富", "马努国家公园是世界生物多样性最密集的保护区之一"],
                   "en": ["Iquitos is the world's largest city inaccessible by road", "Peru's Amazon basin is among the world's richest in biodiversity", "Manu National Park — one of the world's most biodiverse protected areas"]},
    "admission": {"zh": "含导游的丛林徒步营地约400—1,500美元/周/人", "en": "Guided jungle lodge packages ~US$400–1,500/person/week"},
    "duration": {"zh": "3—7天", "en": "3–7 days"},
    "tips": {"zh": "只能乘飞机或坐船到达，建议选择信誉良好的生态旅游营地；6—11月（旱季）水位较低，陆上徒步更容易。",
             "en": "Accessible only by plane or boat. Choose a reputable eco-lodge. June–November (dry season) means lower water levels and easier land-based exploration."}
  },

  # ── Argentina ─────────────────────────────────────────────────────────────
  "iguazu-argentina": {
    "highlights": {"zh": ["可在瀑布中间行走的栈道系统，近距离体验水流冲击", "「恶魔的咽喉」可步行到达的U形瀑布峡谷", "园内野生动物众多，包括貌似的鼠负鼠（coati）"],
                   "en": ["Walkway system lets you stand in the middle of the falls", "Devil's Throat — a U-shaped gorge walkable by boardwalk", "Rich wildlife including coatis, toucans and butterflies in the park"]},
    "admission": {"zh": "约5,000阿根廷比索", "en": "~ARS$5,000"},
    "duration": {"zh": "一天", "en": "Full day"},
    "tips": {"zh": "阿根廷侧瀑布更多、可体验性更强，建议与巴西侧搭配游览，两侧各用一天。",
             "en": "The Argentina side has more trails and a more immersive experience; combine with the Brazil side over two days for the complete perspective."}
  },
  "patagonia": {
    "highlights": {"zh": ["百内国家公园（Torres del Paine）的三座花岗岩塔峰", "冰川国家公园莫雷诺冰川，南美洲最壮观的冰川之一", "世界尽头之感：广袤草原、安第斯山和巴塔哥尼亚风"],
                   "en": ["Torres del Paine's iconic three granite towers", "Perito Moreno Glacier in Los Glaciares National Park", "End-of-the-world atmosphere: vast steppes, Andes and Patagonian wind"]},
    "admission": {"zh": "百内国家公园约35美元（11—3月）", "en": "Torres del Paine ~US$35 (November–March)"},
    "duration": {"zh": "5—10天", "en": "5–10 days"},
    "tips": {"zh": "最佳游览季节是11月至3月（南半球夏季），4—10月天气恶劣不建议徒步。提前6个月预订W形或O形徒步路线的营地。",
             "en": "Visit November–March (southern summer). April–October is too harsh for trekking. Book campsites for the W or O trek 6 months ahead — they sell out completely."}
  },
  "buenos-aires": {
    "highlights": {"zh": ["博卡区（La Boca）彩色锌房子与探戈起源地", "圣特尔莫周日集市，古董与街头艺术的天堂", "世界三大牛排之都，肉食天堂"],
                   "en": ["La Boca's colourful zinc houses; birthplace of tango", "San Telmo Sunday market — antiques, street art and atmosphere", "One of the world's great steak capitals"]},
    "admission": {"zh": "大多数街区和博物馆免费或低价", "en": "Most neighbourhoods and many museums free or low cost"},
    "duration": {"zh": "3—5天", "en": "3–5 days"},
    "tips": {"zh": "布宜诺斯艾利斯作息晚，晚餐通常10点以后才开始，探戈演出午夜后进入高潮。可乘坐地铁（Subte）游览各区。",
             "en": "Buenos Aires runs late — dinner rarely starts before 10 p.m. and tango shows peak after midnight. The Subte (metro) connects the main neighbourhoods efficiently."}
  },

  # ── Egypt ─────────────────────────────────────────────────────────────────
  "pyramids-giza": {
    "highlights": {"zh": ["古代世界七大奇迹中唯一现存的建筑", "胡夫大金字塔高146米，建于公元前2560年", "狮身人面像（斯芬克斯）守护在金字塔旁"],
                   "en": ["The only surviving structure of the Seven Wonders of the Ancient World", "Great Pyramid of Khufu — 146 m; built ~2560 BC", "Great Sphinx guards the complex"]},
    "admission": {"zh": "景区门票约160埃及镑，内部参观另收费", "en": "Site entry ~EGP$160; interior entry charged separately"},
    "duration": {"zh": "3—5小时", "en": "3–5 hours"},
    "tips": {"zh": "骑骆驼或马车拍摄角度极佳，但价格需提前谈好。清晨是拍摄金字塔的最佳时机，光线柔和人也少。",
             "en": "Camel rides offer excellent photo angles — agree on the price before mounting. Early morning gives the softest light and smallest crowds; heat is brutal by midday."}
  },
  "luxor-temples": {
    "highlights": {"zh": ["卡纳克神庙：全球最大的宗教建筑群之一", "帝王谷：藏有图坦卡蒙等法老的60余座墓穴", "卢克索神庙夜间灯光效果震撼人心"],
                   "en": ["Karnak Temple — one of the world's largest religious complexes", "Valley of the Kings — over 60 royal tombs including Tutankhamun's", "Luxor Temple lit up at night is magnificent"]},
    "admission": {"zh": "帝王谷约240埃及镑（含3座墓穴），卡纳克约150埃及镑", "en": "Valley of the Kings ~EGP$240 (3 tombs); Karnak ~EGP$150"},
    "duration": {"zh": "一天（西岸）加一天（东岸神庙）", "en": "1 day (west bank) + 1 day (east bank temples)"},
    "tips": {"zh": "租自行车游览西岸最为灵活惬意；帝王谷内图坦卡蒙墓需另付费，王后谷门票另计。",
             "en": "Renting a bicycle to explore the west bank is the most enjoyable option. Tutankhamun's tomb requires an extra ticket inside the Valley of the Kings."}
  },
  "nile-cruise": {
    "highlights": {"zh": ["世界最长河流（约6,650公里）的千年文明走廊", "三天或四天经典路线：卢克索—孔翁博—阿斯旺", "沿岸神庙、农田和当地市集的真实埃及风情"],
                   "en": ["Corridor of ancient civilisation along the world's longest river (~6,650 km)", "Classic 3–4 night cruise: Luxor – Kom Ombo – Aswan", "Riverside temples, farmland and local market towns"]},
    "admission": {"zh": "3晚游轮含全餐约200—600美元/人", "en": "3-night cruise with meals ~US$200–600/person"},
    "duration": {"zh": "3—7天", "en": "3–7 days"},
    "tips": {"zh": "10月至4月气候宜人是最佳时节；6—9月高温超过40度，夏季价格较低。选择持有执照导游的游轮。",
             "en": "October–April is the most pleasant season; summer can exceed 40°C (though prices drop). Choose a licensed cruise operator with qualified guides."}
  },
  "abu-simbel": {
    "highlights": {"zh": ["拉美西斯二世下令建造的4尊20米高巨型坐像", "1968年为修建阿斯旺水坝，整座神庙被切割搬迁至今址", "2月22日和10月22日，阳光精准穿入神庙深处照亮内殿"],
                   "en": ["Four 20-m colossi of Ramesses II carved from solid rock", "Entire temple relocated in 1968 to save it from the Aswan Dam reservoir", "On 22 Feb and 22 Oct, sunlight penetrates to illuminate the inner sanctuary"]},
    "admission": {"zh": "约240埃及镑", "en": "~EGP$240"},
    "duration": {"zh": "2—3小时", "en": "2–3 hours"},
    "tips": {"zh": "从阿斯旺驱车约4小时（或乘早班飞机）可达；太阳节（2月22日）门票需提前数月预订。",
             "en": "About 4 hours' drive from Aswan (or a short flight). Sun Festival tickets (22 Feb) must be reserved months ahead — it's a once-in-a-lifetime spectacle."}
  },
  "cairo-museum": {
    "highlights": {"zh": ["埃及考古博物馆：全球最重要的古埃及文物收藏", "图坦卡蒙的黄金面具和约5,000件随葬品原件", "超过120,000件文物，需数日才能全部参观"],
                   "en": ["Egyptian Museum: the world's most important collection of ancient Egyptian artefacts", "Tutankhamun's gold death mask and ~5,000 original tomb objects", "Over 120,000 pieces — days needed to see it all"]},
    "admission": {"zh": "约200埃及镑（图坦卡蒙馆另收约100埃及镑）", "en": "~EGP$200 (Tutankhamun gallery ~EGP$100 extra)"},
    "duration": {"zh": "3—5小时", "en": "3–5 hours"},
    "tips": {"zh": "强烈建议雇佣持证讲解员，否则大量文物缺乏背景知识很难理解其意义。开罗解放广场旁，交通便捷。",
             "en": "A licensed guide makes an enormous difference — without context, many artefacts lose their significance. Located on Tahrir Square, very central."}
  },

  # ── Kenya ─────────────────────────────────────────────────────────────────
  "masai-mara": {
    "highlights": {"zh": ["非洲最著名的野生动物保护区，非洲五大兽全部可见", "7—10月角马大迁徙，穿越马拉河的场景震撼人心", "世界上最好的夜晚星空观测地点之一"],
                   "en": ["Africa's most celebrated reserve; all Big Five seen here", "July–October Great Migration; wildebeest river crossings are breathtaking", "One of Africa's best night-sky viewing locations"]},
    "admission": {"zh": "非肯尼亚居民约100美元/天", "en": "~US$100/day (non-resident)"},
    "duration": {"zh": "2—4天（含游猎）", "en": "2–4 days (safari)"},
    "tips": {"zh": "清晨和傍晚游猎动物活动最活跃；建议选择全包型营地，节约时间精力。7月底至10月是大迁徙高峰，价格也是全年最高。",
             "en": "Dawn and dusk game drives yield the most wildlife activity. An all-inclusive camp saves significant logistical effort. Late July–October is peak Migration season — and peak prices."}
  },
  "amboseli": {
    "highlights": {"zh": ["以乞力马扎罗雪山为背景拍摄大象的绝佳场所", "非洲象群密度极高，可近距离观察家族群体行为", "超过400种鸟类"],
                   "en": ["Finest backdrop in Africa: elephants with Kilimanjaro behind", "Very high elephant density; excellent for studying family behaviour up close", "Over 400 bird species"]},
    "admission": {"zh": "非肯尼亚居民约90美元/天", "en": "~US$90/day (non-resident)"},
    "duration": {"zh": "1—2天", "en": "1–2 days"},
    "tips": {"zh": "早晨乞力马扎罗山云层最少，景色最清晰；从内罗毕驾车约4小时或乘飞机30分钟。",
             "en": "Kilimanjaro is most visible in the early morning before clouds build. About 4 hours from Nairobi by road, or 30 minutes by light aircraft."}
  },
  "diani-beach": {
    "highlights": {"zh": ["全球50大最美海滩之一，细白珊瑚沙滩绵延数公里", "印度洋海水清澈温暖，珊瑚礁丰富多彩", "周边有猴子森林和猎豹保护中心"],
                   "en": ["One of the world's top 50 beaches; kilometres of powdery white coral sand", "Warm, clear Indian Ocean water with vibrant coral reefs", "Colobus monkey forest and cheetah conservation centre nearby"]},
    "admission": {"zh": "海滩免费", "en": "Beach free"},
    "duration": {"zh": "2—5天", "en": "2–5 days"},
    "tips": {"zh": "12月至3月和7月至8月是旺季，海风宜人；4—6月有短雨季。从蒙巴萨机场约30分钟车程。",
             "en": "December–March and July–August are peak seasons with pleasant sea breezes. April–June sees short rains. About 30 minutes from Mombasa airport."}
  },
  "nairobi-national-park": {
    "highlights": {"zh": ["世界上唯一与首都毗邻的国家公园，距市中心仅7公里", "可以狮子和犀牛为前景拍摄内罗毕摩天大楼", "配套长颈鹿中心、孤儿象保护区易于联游"],
                   "en": ["World's only national park adjacent to a capital city, just 7 km from downtown", "Photograph lions and rhinos against the Nairobi skyline", "Easy to pair with the Giraffe Centre and David Sheldrick Elephant Orphanage"]},
    "admission": {"zh": "非肯尼亚居民约52美元/天", "en": "~US$52/day (non-resident)"},
    "duration": {"zh": "半天至一天", "en": "Half to full day"},
    "tips": {"zh": "清晨游猎最佳，也可作为到马赛马拉前的热身体验。内罗毕本身也有丰富的美食和文化场景值得探索。",
             "en": "Best at dawn for a game drive. Ideal as a warm-up before heading to the Maasai Mara. Nairobi itself also has a thriving food and arts scene worth exploring."}
  },

  # ── Morocco ───────────────────────────────────────────────────────────────
  "marrakech-medina": {
    "highlights": {"zh": ["联合国教科文组织世界遗产麦地那（旧城区）", "德吉玛广场：蛇舞者、水卖者、露天餐厅的热闹集市", "萨阿迪王朝陵墓和巴伊亚宫殿的精美伊斯兰装饰"],
                   "en": ["UNESCO-listed medina (old city)", "Djemaa el-Fna square — snake charmers, water sellers and open-air food stalls", "Saadian Tombs and Bahia Palace — exquisite Islamic ornamentation"]},
    "admission": {"zh": "麦地那免费进入，各宫殿景点10—70迪拉姆不等", "en": "Medina free to enter; palaces/tombs 10–70 MAD each"},
    "duration": {"zh": "2—3天", "en": "2–3 days"},
    "tips": {"zh": "进入麦地那窄巷极易迷路，建议下载离线地图。摩托车在小巷内快速穿行，注意安全；与摊贩砍价是常态。",
             "en": "It's easy to get lost in the medina — download offline maps. Motorbikes move fast through alleys, so stay alert. Bargaining is expected at market stalls."}
  },
  "sahara-merzouga": {
    "highlights": {"zh": ["撒哈拉沙漠东大门，埃尔格-谢比沙丘高达150米", "骑骆驼入沙漠、夜宿帐篷营地、沙海中看日落日出", "晴空万里的星空是北非最壮观的天文体验之一"],
                   "en": ["Gateway to the Sahara; Erg Chebbi dunes reach 150 m", "Camel trekking, desert camp overnight, sunrise and sunset in the dunes", "One of North Africa's finest stargazing experiences under clear desert skies"]},
    "admission": {"zh": "沙漠骑驼+营地体验约500—1,500摩洛哥迪拉姆/人", "en": "Camel trek + camp ~MAD$500–1,500/person"},
    "duration": {"zh": "1—2天", "en": "1–2 days"},
    "tips": {"zh": "从菲斯驾车约8小时或从马拉喀什约10小时；10月至4月气候宜人，7—8月白天极热（可超45°C）。",
             "en": "About 8 hours from Fez or 10 from Marrakech. October–April is ideal; July–August daytime heat can exceed 45°C — stick to dawn and dusk activities."}
  },
  "chefchaouen": {
    "highlights": {"zh": ["「蓝色之城」，旧城街道和房屋全部刷成深浅不一的蓝色", "利夫山区（Rif Mountains）中的宁静山城", "手工艺集市以当地羊毛织物和皮革制品著称"],
                   "en": ["The 'Blue City' — medina streets and buildings painted in every shade of blue", "Tranquil mountain town in the Rif Mountains", "Craft market renowned for local wool textiles and leather goods"]},
    "admission": {"zh": "免费", "en": "Free"},
    "duration": {"zh": "1—2天", "en": "1–2 days"},
    "tips": {"zh": "清晨7点前光线柔和且游客极少，是拍摄蓝色街道的最佳时机；从非斯或丹吉尔驾车约3小时可达。",
             "en": "Before 7 a.m., the light is soft and the streets nearly empty — the best time to photograph. About 3 hours from Fez or Tangier by car."}
  },

  # ── Australia ────────────────────────────────────────────────────────────
  "great-barrier-reef": {
    "highlights": {"zh": ["世界上最大的珊瑚礁系统，绵延2,300公里", "约1,500种鱼类和4,000种软体动物的家园", "从太空中清晰可见，联合国教科文组织世界遗产"],
                   "en": ["World's largest coral reef system; 2,300 km long", "Home to ~1,500 fish species and 4,000 mollusc species", "Visible from space; UNESCO World Heritage Site"]},
    "admission": {"zh": "浮潜日游约150—250澳元（含船票和装备）", "en": "Snorkel day trip ~AUD$150–250 (boat + gear)"},
    "duration": {"zh": "一天（日游）或2—3天（船宿）", "en": "1 day (day trip) or 2–3 days (liveaboard)"},
    "tips": {"zh": "6—10月水母较少、能见度最佳；使用珊瑚礁安全型防晒霜，普通防晒霜会破坏珊瑚。",
             "en": "June–October has the fewest jellyfish and best visibility. Use reef-safe sunscreen — conventional oxybenzone-based products harm coral."}
  },
  "sydney-opera-house": {
    "highlights": {"zh": ["约恩·乌松设计，1973年开幕，20世纪最杰出建筑之一", "帆形屋顶由超过100万片瑞典瓷砖拼成", "每年举办超过1,500场演出，澳大利亚文化地标"],
                   "en": ["Designed by Jørn Utzon; opened 1973 — one of the 20th century's greatest buildings", "Shell-shaped roofs tiled with over 1 million Swedish tiles", "Hosts 1,500+ performances/year; Australia's cultural icon"]},
    "admission": {"zh": "建筑外观免费参观，导览约40澳元，演出票另计", "en": "Exterior free; guided tour ~AUD$40; performance tickets vary"},
    "duration": {"zh": "1—2小时（参观）", "en": "1–2 hours (sightseeing)"},
    "tips": {"zh": "从环形码头（Circular Quay）步行可达，清晨日出时金色光线打在白色帆顶极为壮观。参加内部导览可进入通常不对外开放的区域。",
             "en": "An easy walk from Circular Quay. At sunrise, golden light on the white shells is spectacular. The guided tour accesses areas not otherwise open to the public."}
  },
  "uluru": {
    "highlights": {"zh": ["海拔348米的巨型砂岩岩层，周长9.4公里", "对原住民阿南古人（Anangu）具有极为重要的神圣意义", "日出日落时颜色从橙红到深紫连续变幻"],
                   "en": ["348 m sandstone monolith with a 9.4 km circumference", "Of profound sacred significance to the Anangu Traditional Owners", "Colour shifts continuously from orange-red to deep purple at sunrise and sunset"]},
    "admission": {"zh": "约38澳元（3日园区通行证）", "en": "~AUD$38 (3-day park pass)"},
    "duration": {"zh": "1—2天", "en": "1–2 days"},
    "tips": {"zh": "攀爬乌鲁鲁已于2019年正式禁止，请尊重原住民文化。导览徒步、文化中心和日落观景台是推荐体验。",
             "en": "Climbing Uluru has been permanently prohibited since 2019 in respect of Anangu culture. Guided walking tours, the Cultural Centre and the sunset viewing area are the recommended experiences."}
  },
  "whitsundays": {
    "highlights": {"zh": ["74座岛屿组成的群岛，大堡礁南端明珠", "白天堂海滩（Whitehaven Beach）以99%纯净石英沙著称", "帆船游览是最受欢迎的体验方式"],
                   "en": ["74-island archipelago at the southern end of the Great Barrier Reef", "Whitehaven Beach — 99% pure silica sand, one of Australia's finest", "Sailing charter is the classic way to explore"]},
    "admission": {"zh": "岛屿需乘船前往，游船约120—300澳元/天", "en": "Island access by boat; day cruises ~AUD$120–300"},
    "duration": {"zh": "2—4天", "en": "2–4 days"},
    "tips": {"zh": "艾尔利比奇（Airlie Beach）是出发基地；2—3天帆船包船是最值得体验的方式，可在海湾中停泊过夜。",
             "en": "Airlie Beach is the main gateway. A 2–3 night bareboat or crewed sailing charter is the quintessential Whitsundays experience — anchoring in secluded bays overnight."}
  },
  "blue-mountains": {
    "highlights": {"zh": ["三姐妹岩（Three Sisters）是最著名的砂岩侵蚀地貌", "从悉尼出发仅2小时，是最近的世界遗产体验", "詹诺兰洞穴（Jenolan Caves）是澳大利亚最古老的洞穴系统"],
                   "en": ["Three Sisters — most famous sandstone erosion formation", "Just 2 hours from Sydney; the closest World Heritage experience from the city", "Jenolan Caves — Australia's oldest cave system"]},
    "admission": {"zh": "景区免费，部分活动另收费", "en": "Scenic lookouts free; some activities charge"},
    "duration": {"zh": "一天（日归）", "en": "Full day (day trip)"},
    "tips": {"zh": "租车比乘火车更灵活，可访问偏远步道；早晨蓝色薄雾从山谷升腾，是最美丽的时刻。",
             "en": "Renting a car is more flexible than the train — you can reach less-visited trails. The famous blue haze from eucalyptus oil is most vivid in the cool morning air."}
  },

  # ── New Zealand ──────────────────────────────────────────────────────────
  "milford-sound": {
    "highlights": {"zh": ["米尔福德峡湾：被称为「世界第八大奇迹」", "迈特峰（Mitre Peak）垂直从海面升起1,692米", "全年降雨量极高，峡湾内有无数临时瀑布"],
                   "en": ["Called the 'Eighth Wonder of the World'", "Mitre Peak rises 1,692 m vertically from the fjord", "Year-round high rainfall creates hundreds of temporary waterfalls after rain"]},
    "admission": {"zh": "游船约75—100新西兰元", "en": "Cruise ~NZD$75–100"},
    "duration": {"zh": "一天（含奥克兰/皇后镇驾车）", "en": "Full day (including drive from Queenstown)"},
    "tips": {"zh": "下雨天反而是峡湾最美的时候，瀑布数量倍增。从皇后镇驾车约4小时，建议清晨出发。",
             "en": "Rain actually makes Milford Sound more spectacular — waterfalls multiply dramatically. Drive from Queenstown (about 4 hours) — leave at dawn for the best experience."}
  },
  "hobbiton": {
    "highlights": {"zh": ["《指环王》和《霍比特人》电影取景地，完全按比例建造的霍比特人村", "37个霍比特人洞穴门、磨坊和绿龙酒馆一应俱全", "位于怀托摩附近的私人农场，只能通过官方导览参观"],
                   "en": ["Filming location for The Lord of the Rings and The Hobbit trilogies", "37 Hobbit holes, a mill, the Green Dragon Inn — all full-scale", "Private farm near Matamata; accessible only by official guided tour"]},
    "admission": {"zh": "约约99新西兰元（导览约2小时）", "en": "~NZD$99 (guided tour ~2 hours)"},
    "duration": {"zh": "2—3小时", "en": "2–3 hours"},
    "tips": {"zh": "必须提前在官网预约，经常售罄；可在奥克兰和怀托摩萤火虫洞之间安排为一日联游。",
             "en": "Book in advance on the official website — tours sell out. Easily combined with Auckland and the Waitomo Glowworm Caves in a single day trip."}
  },
  "queenstown": {
    "highlights": {"zh": ["世界冒险运动之都：蹦极、跳伞、急流泛舟一应俱全", "瓦卡提普湖（Lake Wakatipu）和雷马克布尔山（Remarkables）的壮美风景", "周边通往峡湾国家公园、阿斯帕林山的徒步路线"],
                   "en": ["World adventure capital: bungy jumping, skydiving and whitewater rafting", "Lake Wakatipu and The Remarkables mountain range — spectacular scenery", "Gateway to Fiordland National Park and Mount Aspiring treks"]},
    "admission": {"zh": "城区免费，冒险项目约100—300新西兰元", "en": "Town free; adventure activities ~NZD$100–300"},
    "duration": {"zh": "2—5天", "en": "2–5 days"},
    "tips": {"zh": "皇后镇全年可游，夏（12—2月）徒步、冬（6—8月）滑雪；餐厅价格较贵，可自购超市食品节省开支。",
             "en": "Queenstown is good year-round: summer (Dec–Feb) for hiking, winter (Jun–Aug) for skiing. Restaurants are pricey; buying groceries cuts costs significantly."}
  },
  "bay-of-islands": {
    "highlights": {"zh": ["144座岛屿组成的海湾，新西兰最重要的历史地区之一", "威唐伊条约地（Waitangi Treaty Grounds）是新西兰建国的象征", "海豚共游、深海钓鱼和独木舟是当地主要活动"],
                   "en": ["Bay dotted with 144 islands; one of New Zealand's most historically significant regions", "Waitangi Treaty Grounds — where the nation was founded in 1840", "Dolphin swimming, game fishing and kayaking the main activities"]},
    "admission": {"zh": "威唐伊条约地约35新西兰元", "en": "Waitangi Treaty Grounds ~NZD$35"},
    "duration": {"zh": "1—3天", "en": "1–3 days"},
    "tips": {"zh": "从奥克兰驾车约3小时，是北岛最佳的周末度假目的地；2月份的威唐伊日（新西兰国庆日）有特别庆典活动。",
             "en": "About 3 hours' drive from Auckland — a classic North Island weekend getaway. Waitangi Day (6 February) brings special ceremonies and cultural performances."}
  },
}

def enrich(filepath):
    with open(filepath, encoding='utf-8') as f:
        dests = json.load(f)
    changed = False
    for d in dests:
        extra = EXTRA.get(d['id'])
        if extra:
            for k, v in extra.items():
                d[k] = v
            changed = True
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(dests, f, ensure_ascii=False, indent=2)
        print(f"Updated: {filepath}")
    else:
        print(f"No match: {filepath}")

for p in glob.glob('data/destinations/*.json'):
    enrich(p)

print("Done.")
