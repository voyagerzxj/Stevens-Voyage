"""
Adds 'cuisine' and 'bestTime' fields to data/countries/{id}.json files.
"""
import json, os

EXTRA = {
  "albania": {
    "cuisine": [
      {"emoji":"🥧","name":{"zh":"拜雷克","en":"Byrek"},"description":{"zh":"用薄酥皮包裹菠菜、奶酪或肉馅的烤饼，街头随处可见，是阿尔巴尼亚最经典的小吃。","en":"Flaky pastry filled with spinach, cheese or meat — the quintessential Albanian street snack."}},
      {"emoji":"🍲","name":{"zh":"烤羊肉锅","en":"Tavë Kosi"},"description":{"zh":"羊肉配酸奶和鸡蛋烤制而成，是阿尔巴尼亚的国菜，口感浓郁鲜美。","en":"Baked lamb with yoghurt and eggs — considered the national dish, rich and deeply savoury."}},
      {"emoji":"🫕","name":{"zh":"费尔格塞","en":"Fërgesë"},"description":{"zh":"以番茄、辣椒、奶酪和橄榄油炖煮而成的地道家常菜，地拉那风味独特。","en":"Stewed tomatoes, peppers and white cheese in olive oil — a beloved Tirana homestyle dish."}},
      {"emoji":"🍢","name":{"zh":"科夫特肉丸","en":"Qofte"},"description":{"zh":"香料混合牛羊肉制成的烤肉饼或烤肉串，配新鲜蔬菜和酱汁享用。","en":"Spiced minced beef and lamb formed into patties or skewers, grilled and served with fresh salad."}}
    ],
    "bestTime": {
      "optimal": [4,5,6,9,10],
      "good":    [3,7,8,11],
      "avoid":   [1,2,12],
      "note":    {"zh":"4—6月及9—10月天气宜人，海滩和山区均适合游览；7—8月高温且游客众多。","en":"April–June and September–October offer ideal weather for both coast and mountains; July–August is hot and crowded."}
    }
  },
  "china": {
    "cuisine": [
      {"emoji":"🦆","name":{"zh":"北京烤鸭","en":"Peking Duck"},"description":{"zh":"外皮酥脆、肉质鲜嫩，用薄饼卷葱丝和甜面酱食用，是北京最具代表性的美食。","en":"Crispy-skinned, succulent duck rolled in thin pancakes with spring onion and hoisin — Beijing's most iconic dish."}},
      {"emoji":"🫕","name":{"zh":"火锅","en":"Hot Pot"},"description":{"zh":"将各种食材涮入滚烫的汤底，四川麻辣和北方清汤是最受欢迎的两种口味。","en":"Communal cooking in simmering broth — Sichuan mala (numbing-spicy) and northern clear-broth styles are both beloved."}},
      {"emoji":"🥟","name":{"zh":"小笼包","en":"Xiaolongbao"},"description":{"zh":"薄皮内包裹着鲜肉和浓缩汤汁，轻咬一口鲜汤迸出，起源于上海，风靡全国。","en":"Delicate steamed dumplings with minced pork and a burst of soup inside — originated in Shanghai, adored nationwide."}},
      {"emoji":"🍜","name":{"zh":"兰州拉面","en":"Lanzhou Beef Noodles"},"description":{"zh":"手工拉制的筋道面条配清澈牛骨汤，撒上红辣椒油和香菜，是中国最广泛的面食之一。","en":"Hand-pulled noodles in clear beef-bone broth with chilli oil and coriander — one of China's most widespread noodle dishes."}}
    ],
    "bestTime": {
      "optimal": [3,4,5,9,10,11],
      "good":    [6,12],
      "avoid":   [1,2,7,8],
      "note":    {"zh":"春秋两季（3—5月、9—11月）气候最宜人；北京等北方夏季炎热，冬季严寒；南方夏季多雨。","en":"Spring (Mar–May) and autumn (Sep–Nov) are best nationwide; northern winters are harsh and summers oppressively hot."}
    }
  },
  "japan": {
    "cuisine": [
      {"emoji":"🍣","name":{"zh":"寿司","en":"Sushi"},"description":{"zh":"以醋饭为基础，搭配新鲜生鱼或其他食材，是日本饮食文化的象征，从回转寿司到高端料亭均可品尝。","en":"Vinegared rice topped or wrapped with fresh seafood — from kaiten conveyor belts to Michelin-starred omakase counters."}},
      {"emoji":"🍜","name":{"zh":"拉面","en":"Ramen"},"description":{"zh":"浓郁汤底配手制面条，各地风味各异：札幌味噌、博多豚骨、东京酱油，各有千秋。","en":"Rich broth with wheat noodles in regional styles — Sapporo miso, Hakata tonkotsu, Tokyo shoyu each tell a different story."}},
      {"emoji":"🍱","name":{"zh":"天妇罗","en":"Tempura"},"description":{"zh":"裹薄面糊炸至金黄的虾和蔬菜，口感轻盈酥脆，配天汁和萝卜泥食用。","en":"Prawns and vegetables in a light, feather-crisp batter — served with dipping broth and grated daikon."}},
      {"emoji":"🐙","name":{"zh":"章鱼烧","en":"Takoyaki"},"description":{"zh":"大阪街头小吃，球形面糊内包章鱼块，淋上日式酱汁和鲣鱼花，外焦内嫩。","en":"Osaka's beloved street ball — batter pockets stuffed with octopus, brushed with sauce and bonito flakes."}}
    ],
    "bestTime": {
      "optimal": [3,4,10,11],
      "good":    [5,6,9,12],
      "avoid":   [7,8],
      "note":    {"zh":"3—4月赏樱花，10—11月观红叶，均为最佳时节；7—8月高温潮湿，台风多发。","en":"March–April for cherry blossoms, October–November for autumn foliage — both are magical. July–August is hot, humid and typhoon-prone."}
    }
  },
  "india": {
    "cuisine": [
      {"emoji":"🍛","name":{"zh":"玛萨拉咖喱","en":"Chicken Tikka Masala"},"description":{"zh":"烤制的鸡肉块配以浓郁番茄奶油咖喱酱，香料层次丰富，是印度最广为人知的菜肴之一。","en":"Charred chicken in a velvety tomato-cream curry — spiced with garam masala and adored worldwide."}},
      {"emoji":"🫓","name":{"zh":"恰巴提","en":"Chapati"},"description":{"zh":"用全麦面粉制成的薄饼，是印度日常饮食的主食，用于搭配各类咖喱和豆泥。","en":"Unleavened whole-wheat flatbread cooked on a tawa — the everyday staple scooped through curries and dal."}},
      {"emoji":"🥟","name":{"zh":"萨摩萨","en":"Samosa"},"description":{"zh":"三角形酥皮包裹香辣土豆豌豆馅，油炸至金黄，是印度最受欢迎的街头零食。","en":"Crispy triangular pastry stuffed with spiced potato and peas — India's most beloved street snack."}},
      {"emoji":"☕","name":{"zh":"玛萨拉茶","en":"Masala Chai"},"description":{"zh":"红茶与姜、豆蔻、肉桂等香料煮制的奶茶，是印度人每日必不可少的饮品。","en":"Black tea simmered with ginger, cardamom and cinnamon in milk — the rhythm of daily Indian life."}}
    ],
    "bestTime": {
      "optimal": [10,11,12,1,2,3],
      "good":    [9,4],
      "avoid":   [5,6,7,8],
      "note":    {"zh":"10月至次年3月（凉季）是最佳旅游时节，全国气候宜人；6—9月为季风季，雨量充沛但部分地区难以出行。","en":"October–March (cool season) is ideal across most of India; June–September is monsoon season with heavy rain and travel disruptions."}
    }
  },
  "france": {
    "cuisine": [
      {"emoji":"🥐","name":{"zh":"可颂","en":"Croissant"},"description":{"zh":"千层黄油酥皮制成的月牙形面包，外层酥脆、内层柔软，是法国早餐的灵魂。","en":"Buttery, laminated crescents with a shattering exterior and soft interior — the soul of a French breakfast."}},
      {"emoji":"🧀","name":{"zh":"法式奶酪","en":"French Cheese"},"description":{"zh":"法国拥有超过400种奶酪，从卡芒贝尔到布里、罗克福尔，每种都有独特的风味与产地故事。","en":"Over 400 varieties from Camembert to Comté and Roquefort — each with its own terroir and personality."}},
      {"emoji":"🍷","name":{"zh":"勃艮第炖牛肉","en":"Bœuf Bourguignon"},"description":{"zh":"用勃艮第红酒慢炖牛肉、蘑菇和小洋葱，是法式经典家常菜的代表。","en":"Beef slow-braised in Burgundy wine with mushrooms and pearl onions — the definitive French comfort dish."}},
      {"emoji":"🐌","name":{"zh":"法式蜗牛","en":"Escargots"},"description":{"zh":"蜗牛配黄油、大蒜和香草烤制，外表独特却令人难以忘怀，是法国餐厅的经典前菜。","en":"Snails baked in herbed garlic butter — an acquired taste that rewards the adventurous palate."}}
    ],
    "bestTime": {
      "optimal": [4,5,6,9,10],
      "good":    [3,7,8,11],
      "avoid":   [1,2,12],
      "note":    {"zh":"4—6月春意盎然、游人适中；9—10月秋色宜人、葡萄收获；7—8月巴黎拥挤炎热。","en":"April–June brings blooms and manageable crowds; September–October offers harvest season and golden light. July–August in Paris is busy and hot."}
    }
  },
  "italy": {
    "cuisine": [
      {"emoji":"🍕","name":{"zh":"那不勒斯披萨","en":"Neapolitan Pizza"},"description":{"zh":"薄饼底配番茄酱、水牛奶酪和新鲜罗勒，用木柴烤箱高温烤制90秒，已被列入联合国非遗名录。","en":"Thin dough with San Marzano tomato, buffalo mozzarella and basil, baked 90 seconds in a wood-fired oven — UNESCO-listed heritage."}},
      {"emoji":"🍝","name":{"zh":"肉酱意面","en":"Ragù alla Bolognese"},"description":{"zh":"慢炖数小时的牛肉猪肉酱配宽蛋面，正宗博洛尼亚做法不加番茄或大蒜。","en":"Slow-cooked beef and pork sauce on tagliatelle — the authentic Bolognese recipe uses no tomato or garlic."}},
      {"emoji":"🍦","name":{"zh":"意式冰淇淋","en":"Gelato"},"description":{"zh":"比普通冰淇淋密度更高、含气量更少，口感丝滑浓郁，意大利每座小镇都有自己的配方。","en":"Denser and less airy than ice cream, with an intense, silky texture — every Italian town has its own signature flavours."}},
      {"emoji":"☕","name":{"zh":"意式浓缩咖啡","en":"Espresso"},"description":{"zh":"意大利人站在吧台30秒喝完，是每日的仪式感。拿铁和卡布奇诺都源于此，但意大利人只在早餐喝奶咖。","en":"Downed standing at the bar in 30 seconds — a daily ritual. Milky coffees (cappuccino, latte) are strictly breakfast-only."}}
    ],
    "bestTime": {
      "optimal": [4,5,6,9,10],
      "good":    [3,7,8,11],
      "avoid":   [1,2,12],
      "note":    {"zh":"4—6月气候温和、鲜花盛开；9—10月游客减少、气候依旧宜人；7—8月南部极热，景点拥挤。","en":"April–June is temperate with wildflowers; September–October has thinner crowds and warm evenings. Southern Italy in July–August is scorching."}
    }
  },
  "greece": {
    "cuisine": [
      {"emoji":"🥗","name":{"zh":"希腊沙拉","en":"Greek Salad"},"description":{"zh":"番茄、黄瓜、橄榄、菲达奶酪和橄榄油，简单却无比清爽，夏日必备。","en":"Tomatoes, cucumber, olives, feta and olive oil — deceptively simple and endlessly refreshing in the summer heat."}},
      {"emoji":"🍢","name":{"zh":"苏夫拉基","en":"Souvlaki"},"description":{"zh":"腌制猪肉或鸡肉串烤制，配皮塔饼、西红柿、洋葱和酸奶酱（tzatziki），是希腊最受欢迎的街头食品。","en":"Marinated pork or chicken skewers in pita with tomato, onion and tzatziki — Greece's favourite street food."}},
      {"emoji":"🫕","name":{"zh":"木萨卡","en":"Moussaka"},"description":{"zh":"茄子、肉末和贝夏梅酱分层烤制，香浓扎实，是希腊家庭料理的代表作。","en":"Layers of aubergine, spiced minced meat and béchamel baked until golden — the definitive Greek comfort food."}},
      {"emoji":"🍯","name":{"zh":"蜂蜜酥皮糕","en":"Baklava"},"description":{"zh":"薄酥皮夹核桃碎，淋上玫瑰水蜂蜜糖浆，甜而不腻，是奥斯曼遗产留下的精华。","en":"Layers of filo pastry with crushed walnuts soaked in honey syrup — a sweet Ottoman legacy."}}
    ],
    "bestTime": {
      "optimal": [4,5,6,9,10],
      "good":    [3,7,11],
      "avoid":   [1,2,8,12],
      "note":    {"zh":"4—6月和9—10月天气最佳，海水温暖、游客适中；8月是旅游旺季，圣托里尼等岛屿极度拥挤。","en":"April–June and September–October are ideal — warm sea and manageable crowds. August, especially Santorini, is overwhelmingly busy."}
    }
  },
  "usa": {
    "cuisine": [
      {"emoji":"🥩","name":{"zh":"美式BBQ","en":"American BBQ"},"description":{"zh":"德克萨斯慢烤牛胸肉、田纳西猪肋排、卡罗莱纳拉猪肉——各州BBQ流派之争是美国饮食文化的核心。","en":"Texas brisket, Tennessee ribs, Carolina pulled pork — regional BBQ rivalries are central to American food identity."}},
      {"emoji":"🍔","name":{"zh":"汉堡","en":"Burger"},"description":{"zh":"现磨牛肉饼配奶酪、生菜和特制酱汁，从快餐连锁到精品餐厅，各有千秋。","en":"Fresh-ground beef patty with cheese, lettuce and special sauce — from drive-throughs to gourmet gastropubs."}},
      {"emoji":"🦞","name":{"zh":"缅因州龙虾卷","en":"Maine Lobster Roll"},"description":{"zh":"新英格兰特产，新鲜龙虾肉配蛋黄酱夹入烤热狗面包，在缅因海岸边吃最为地道。","en":"Fresh lobster meat with mayo in a buttered, toasted split-top bun — best eaten on the Maine coast."}},
      {"emoji":"🥧","name":{"zh":"纽约芝士蛋糕","en":"New York Cheesecake"},"description":{"zh":"浓郁醇厚的奶油奶酪蛋糕，底部为饼干碎，是纽约美食的标志性符号之一。","en":"Dense, velvety cream cheese cake on a graham cracker base — a New York institution since the early 20th century."}}
    ],
    "bestTime": {
      "optimal": [5,6,9,10],
      "good":    [3,4,7,8,11],
      "avoid":   [1,2,12],
      "note":    {"zh":"美国幅员辽阔，各地气候差异很大。总体而言春秋两季最适合全国旅行；佛罗里达冬季是旺季；阿拉斯加夏季最佳。","en":"The US is vast — climate varies enormously by region. Spring and autumn suit most areas; Florida peaks in winter; Alaska shines in summer."}
    }
  },
  "canada": {
    "cuisine": [
      {"emoji":"🍟","name":{"zh":"普丁","en":"Poutine"},"description":{"zh":"薯条配奶酪凝块和肉汁，发源于魁北克，是加拿大最具辨识度的国民食品。","en":"Fries topped with cheese curds and gravy — born in Quebec and now Canada's most iconic comfort food."}},
      {"emoji":"🍁","name":{"zh":"枫糖浆","en":"Maple Syrup"},"description":{"zh":"加拿大生产全球约70%的枫糖浆，淋在煎饼上是经典吃法，也可配咸肉或冰淇淋。","en":"Canada produces ~70% of the world's supply. Poured over pancakes is classic, but also pairs brilliantly with bacon or ice cream."}},
      {"emoji":"🦞","name":{"zh":"新斯科舍龙虾","en":"Nova Scotia Lobster"},"description":{"zh":"大西洋沿岸盛产新鲜龙虾，清蒸后蘸黄油，是海滨小镇夏日的仪式感美食。","en":"Atlantic lobster steamed whole and dipped in drawn butter — a ritual in every Maritime coastal town in summer."}},
      {"emoji":"🥞","name":{"zh":"比弗尾炸饼","en":"BeaverTail"},"description":{"zh":"形似海狸尾巴的油炸面饼，撒糖或配各种甜蜜馅料，是渥太华冬季溜冰道旁的经典小吃。","en":"Fried dough pastry shaped like a beaver's tail, dusted with cinnamon sugar — a staple on Ottawa's winter skating canal."}}
    ],
    "bestTime": {
      "optimal": [6,7,8,9],
      "good":    [5,10],
      "avoid":   [1,2,3,11,12],
      "note":    {"zh":"6—9月为夏季，气候宜人，适合全国旅行；冬季严寒，但魁北克冬季嘉年华和山地滑雪自有魅力。","en":"June–September is warm and perfect nationwide; winters are brutal but Quebec Winter Carnival and Rockies skiing are world-class."}
    }
  },
  "mexico": {
    "cuisine": [
      {"emoji":"🌮","name":{"zh":"塔可","en":"Tacos"},"description":{"zh":"玉米或面粉薄饼包裹肉馅、洋葱和香菜，从路边推车到高档餐厅均可品尝，是墨西哥饮食文化的核心。","en":"Corn or flour tortillas wrapped around meat, onion and coriander — from street carts to high-end restaurants, tacos are Mexico's soul food."}},
      {"emoji":"🥑","name":{"zh":"瓜卡莫里","en":"Guacamole"},"description":{"zh":"牛油果、番茄、洋葱、辣椒和青柠汁混合而成，配玉米片食用，新鲜现制最佳。","en":"Avocado, tomato, onion, jalapeño and lime — always best made tableside and scooped with totopos."}},
      {"emoji":"🫔","name":{"zh":"恩查拉达","en":"Enchiladas"},"description":{"zh":"玉米饼卷肉馅后浇辣椒酱烤制，是墨西哥家庭最常见的主食之一。","en":"Corn tortillas rolled with filling and smothered in chilli sauce — a Mexican household staple."}},
      {"emoji":"🍫","name":{"zh":"墨西哥巧克力辣酱","en":"Mole"},"description":{"zh":"由数十种食材（含巧克力、辣椒、香料）慢炖数小时制成的浓酱，是墨西哥烹饪艺术的巅峰之作。","en":"A complex sauce of dozens of ingredients including chocolate, chillies and spices slow-cooked for hours — the pinnacle of Mexican culinary art."}}
    ],
    "bestTime": {
      "optimal": [12,1,2,3,4],
      "good":    [11,5],
      "avoid":   [6,7,8,9,10],
      "note":    {"zh":"11月至次年4月为旱季，气候凉爽，是旅游黄金季；6—10月为雨季兼飓风季，部分地区需注意天气。","en":"November–April is the dry season with pleasant temperatures — ideal for travel. June–October brings rains and Atlantic hurricane risk."}
    }
  },
  "brazil": {
    "cuisine": [
      {"emoji":"🥩","name":{"zh":"巴西烤肉","en":"Churrasco"},"description":{"zh":"各种切割的牛肉和猪肉在大型烤架上转烤，由切肉师巡桌服务，是巴西最具代表性的饮食体验。","en":"Various cuts of beef and pork rotisserie-grilled over charcoal, carved tableside by passadores — Brazil's quintessential dining experience."}},
      {"emoji":"🫕","name":{"zh":"黑豆炖肉锅","en":"Feijoada"},"description":{"zh":"黑豆与猪肉各部位慢炖，配白饭、甘蓝菜和橙片，是巴西的国菜，传统上周六享用。","en":"Black beans slow-cooked with pork cuts, served with rice, collard greens and orange slices — the national dish, traditionally eaten on Saturdays."}},
      {"emoji":"🧀","name":{"zh":"奶酪面包球","en":"Pão de Queijo"},"description":{"zh":"木薯粉和奶酪制成的小圆面包，外脆内软有嚼劲，是巴西早餐和零食的首选。","en":"Chewy, cheesy tapioca-flour rolls — the go-to Brazilian breakfast and snack, gluten-free and utterly addictive."}},
      {"emoji":"🍹","name":{"zh":"卡普里尼亚","en":"Caipirinha"},"description":{"zh":"卡莎萨（甘蔗烈酒）配青柠和冰糖，是巴西的国民鸡尾酒，清爽解渴。","en":"Cachaça, lime and sugar over ice — Brazil's national cocktail, potent, refreshing and dangerously drinkable."}}
    ],
    "bestTime": {
      "optimal": [4,5,6,7,8,9],
      "good":    [3,10],
      "avoid":   [11,12,1,2],
      "note":    {"zh":"里约和圣保罗的最佳时节为4—9月（南半球秋冬）；亚马逊热带雨林全年可游，5—9月水位较低，野生动物观察最佳。","en":"Rio and São Paulo are best April–September (austral autumn/winter). The Amazon can be visited year-round; May–September has lower water and better wildlife viewing."}
    }
  },
  "peru": {
    "cuisine": [
      {"emoji":"🐟","name":{"zh":"柠汁腌生鱼","en":"Ceviche"},"description":{"zh":"新鲜海鱼用青柠汁「冷熟」，配红洋葱、香菜和秘鲁黄辣椒，是秘鲁最具代表性的菜肴，也是利马的骄傲。","en":"Raw fish 'cooked' in lime juice with red onion, coriander and ají amarillo — Peru's signature dish and Lima's greatest culinary pride."}},
      {"emoji":"🍗","name":{"zh":"秘鲁烤鸡","en":"Pollo a la Brasa"},"description":{"zh":"用秘鲁香料腌制后在木炭炉上转烤的整鸡，配薯条和绿色辣椒酱，是秘鲁人的最爱。","en":"Whole chicken marinated in Peruvian spices and rotisserie-roasted over wood coals — served with chips and green ají sauce."}},
      {"emoji":"🥔","name":{"zh":"土豆辣酱","en":"Papa a la Huancaína"},"description":{"zh":"煮熟的土豆淋上奶油黄辣椒酱，秘鲁是土豆的故乡，拥有3,000多个品种。","en":"Boiled potato in a creamy yellow chilli sauce — appropriate, since Peru is the ancestral home of the potato with 3,000+ varieties."}},
      {"emoji":"🍺","name":{"zh":"皮斯科酸酒","en":"Pisco Sour"},"description":{"zh":"秘鲁葡萄烈酒配青柠汁、糖浆和蛋清，顶层撒苦精，是秘鲁和智利都宣称发明的国民鸡尾酒。","en":"Grape brandy with lime juice, syrup and egg white, topped with bitters — both Peru and Chile claim to have invented this iconic sour."}}
    ],
    "bestTime": {
      "optimal": [5,6,7,8,9,10],
      "good":    [4,11],
      "avoid":   [12,1,2,3],
      "note":    {"zh":"5—10月为旱季，是游览马丘比丘和徒步印加古道的黄金时节；11月至次年3月为雨季，部分山路封闭。","en":"May–October is the dry season — ideal for Machu Picchu and Inca Trail trekking. November–March brings heavy rain and trail closures."}
    }
  },
  "argentina": {
    "cuisine": [
      {"emoji":"🥩","name":{"zh":"阿根廷烤肉","en":"Asado"},"description":{"zh":"阿根廷烤肉不仅是食物，更是社交仪式。牛肉在铁架上以木炭慢烤，配马尔贝克红酒是绝配。","en":"More than a meal — a social ritual. Beef slow-grilled over hardwood coals, best paired with a glass of Malbec."}},
      {"emoji":"🫔","name":{"zh":"恩帕纳达","en":"Empanadas"},"description":{"zh":"半月形酥皮包裹牛肉、奶酪、火腿或蔬菜馅，烤制或油炸，是阿根廷随处可见的街头美食。","en":"Half-moon pastries stuffed with beef, cheese, ham or vegetables, baked or fried — Argentina's omnipresent street food."}},
      {"emoji":"🍮","name":{"zh":"牛奶焦糖酱","en":"Dulce de Leche"},"description":{"zh":"牛奶和糖慢熬制成的焦糖酱，用于抹面包、夹饼干、做冰淇淋，是阿根廷人的甜蜜执念。","en":"Slow-cooked milk caramel — spread on toast, sandwiched in cookies, scooped in ice cream. Argentina's national obsession."}},
      {"emoji":"🍵","name":{"zh":"马黛茶","en":"Yerba Mate"},"description":{"zh":"用葫芦杯和金属吸管共饮的草本茶，提神醒脑，是阿根廷社交文化的重要组成部分。","en":"Herbal tea sipped through a metal straw from a shared gourd — caffeinated, bitter and central to Argentine social life."}}
    ],
    "bestTime": {
      "optimal": [10,11,3,4],
      "good":    [12,1,2,9],
      "avoid":   [6,7,8],
      "note":    {"zh":"南半球的春（10—11月）和秋（3—4月）气候最宜人；巴塔哥尼亚最佳游览时间为11月至次年2月；布宜诺斯艾利斯全年可游。","en":"Spring (Oct–Nov) and autumn (Mar–Apr) are most pleasant. Patagonia is best November–February. Buenos Aires is enjoyable year-round."}
    }
  },
  "egypt": {
    "cuisine": [
      {"emoji":"🫕","name":{"zh":"科沙里","en":"Koshari"},"description":{"zh":"大米、扁豆、通心粉混合，配番茄酱和炸洋葱，物美价廉，是埃及最受欢迎的国民快餐。","en":"Rice, lentils and macaroni topped with spiced tomato sauce and crispy fried onions — Egypt's beloved budget staple."}},
      {"emoji":"🧆","name":{"zh":"炸豆饼","en":"Falafel"},"description":{"zh":"蚕豆（非鹰嘴豆）制成的炸丸子，配皮塔饼和沙拉，是埃及版本与黎巴嫩版本最大的区别。","en":"Deep-fried fava bean patties (not chickpeas — that's the key difference from Lebanese falafel) in pita with salad."}},
      {"emoji":"🍢","name":{"zh":"科夫塔烤肉","en":"Kofta"},"description":{"zh":"香料混合碎肉制成的长形烤肉串，配米饭、沙拉和大蒜酱，是埃及家庭和餐厅的常见菜。","en":"Spiced minced meat moulded onto skewers and grilled — served with rice, salad and garlic sauce in homes and restaurants alike."}},
      {"emoji":"🫘","name":{"zh":"豆泥","en":"Ful Medames"},"description":{"zh":"慢炖蚕豆配橄榄油、柠檬和香料，是埃及从法老时代流传至今的早餐，已有数千年历史。","en":"Slow-cooked fava beans with olive oil, lemon and cumin — an Egyptian breakfast eaten since Pharaonic times."}}
    ],
    "bestTime": {
      "optimal": [10,11,12,1,2,3],
      "good":    [4,9],
      "avoid":   [5,6,7,8],
      "note":    {"zh":"10月至次年3月气候凉爽，是游览开罗、卢克索和阿斯旺的最佳时节；5—8月埃及极度炎热，不建议长时间户外活动。","en":"October–March is pleasantly cool — ideal for Cairo, Luxor and Aswan. May–August temperatures in Upper Egypt regularly exceed 40°C."}
    }
  },
  "kenya": {
    "cuisine": [
      {"emoji":"🌽","name":{"zh":"乌伽利","en":"Ugali"},"description":{"zh":"玉米粉制成的厚实面团，是肯尼亚饮食的基础主食，用手撕成小块蘸汤或配菜食用。","en":"Stiff maize-flour porridge — Kenya's staple starch, torn into pieces and dipped into stew or relish."}},
      {"emoji":"🥩","name":{"zh":"尼亚马乔马","en":"Nyama Choma"},"description":{"zh":"慢烤山羊肉或牛肉，配卡乔木巴（洋葱番茄沙拉），是肯尼亚社交聚会的核心美食。","en":"Slow-roasted goat or beef served with kachumbari (tomato-onion salad) — the centrepiece of any Kenyan social gathering."}},
      {"emoji":"🍚","name":{"zh":"皮拉伍饭","en":"Pilau"},"description":{"zh":"印度洋香料（肉桂、豆蔻、丁香）与米饭同煮，是肯尼亚海岸斯瓦希里文化的代表性菜肴。","en":"Rice cooked with Indian Ocean spices — cinnamon, cardamom and cloves — a signature of Kenya's Swahili coastal culture."}},
      {"emoji":"🧁","name":{"zh":"曼达齐炸面包","en":"Mandazi"},"description":{"zh":"三角形或圆形的微甜炸面包，配茶或咖啡，是肯尼亚早餐和下午茶的常见选择。","en":"Lightly sweetened fried dough triangles — eaten with tea or coffee for breakfast and at afternoon breaks throughout Kenya."}}
    ],
    "bestTime": {
      "optimal": [7,8,9,10,1,2],
      "good":    [6,11,12],
      "avoid":   [3,4,5],
      "note":    {"zh":"7—10月（旱季）是观看马赛马拉角马大迁徙的最佳时节；1—2月也是旱季，动物聚集水源旁。3—5月长雨季需注意道路泥泞。","en":"July–October is peak safari season in the Masai Mara for the Great Migration. January–February (short dry season) is also excellent. March–May's long rains can make tracks impassable."}
    }
  },
  "morocco": {
    "cuisine": [
      {"emoji":"🫕","name":{"zh":"塔吉锅","en":"Tagine"},"description":{"zh":"用锥形陶锅慢炖的摩洛哥炖菜，鸡肉配柠檬和橄榄，或羊肉配梅干和杏仁，香料层次丰富。","en":"Slow-cooked stew in a conical clay pot — chicken with preserved lemon and olives, or lamb with prunes and almonds, rich with spice."}},
      {"emoji":"🍚","name":{"zh":"古斯古斯","en":"Couscous"},"description":{"zh":"细小的硬粒小麦颗粒蒸制松软，配炖蔬菜和羊肉，是摩洛哥周五家庭聚餐的传统菜肴。","en":"Steamed semolina grains topped with braised vegetables and lamb — the traditional Friday family meal across Morocco."}},
      {"emoji":"🥧","name":{"zh":"巴斯提拉","en":"Bastilla"},"description":{"zh":"薄酥皮包裹鸽子肉（现多用鸡肉）、杏仁和肉桂，甜咸交融，是摩洛哥宴会上的奢华菜肴。","en":"Flaky pastry filled with pigeon (now often chicken), almonds and cinnamon, dusted with icing sugar — a lavish Moroccan banquet showpiece."}},
      {"emoji":"🍵","name":{"zh":"摩洛哥薄荷茶","en":"Mint Tea"},"description":{"zh":"绿茶配新鲜薄荷和大量冰糖，高举茶壶从高处倒入小杯，是摩洛哥待客之道的象征。","en":"Green tea with fresh mint and sugar poured from height — hospitality in liquid form, and refusing it is considered impolite."}}
    ],
    "bestTime": {
      "optimal": [3,4,5,9,10,11],
      "good":    [2,6,12],
      "avoid":   [7,8,1],
      "note":    {"zh":"3—5月春季和9—11月秋季气候最宜人，撒哈拉沙漠避开酷暑；7—8月内陆极热，马拉喀什气温可达40°C以上。","en":"March–May and September–November are ideal — pleasant temperatures for both coast and Sahara. July–August inland can exceed 40°C; Marrakech is brutally hot."}
    }
  },
  "australia": {
    "cuisine": [
      {"emoji":"🥧","name":{"zh":"澳式肉馅派","en":"Meat Pie"},"description":{"zh":"酥皮包裹牛肉和肉汁馅，是澳大利亚体育赛事和街头小吃的国民食品，配番茄酱食用。","en":"Shortcrust and puff pastry filled with minced beef in gravy — the quintessential stadium snack, always with tomato sauce."}},
      {"emoji":"🍫","name":{"zh":"维吉麦吐司","en":"Vegemite on Toast"},"description":{"zh":"深棕色酵母提取物涂抹在黄油吐司上，咸鲜浓郁，是澳大利亚人从小吃到大的早餐，外国人常常难以接受。","en":"Dark yeast extract spread thinly on buttered toast — every Australian grows up on it; most visitors find it challenging."}},
      {"emoji":"🍰","name":{"zh":"帕芙洛娃","en":"Pavlova"},"description":{"zh":"蛋白酥皮（外脆内软）配鲜奶油和各种水果，澳大利亚和新西兰都声称是其发源地。","en":"Crisp meringue with a marshmallow centre, topped with cream and fresh fruit — Australia and New Zealand both claim to have invented it."}},
      {"emoji":"🍪","name":{"zh":"澳新军团饼干","en":"ANZAC Biscuit"},"description":{"zh":"燕麦、椰子和金糖浆制成的硬饼干，起源于一战时期，现已成为澳大利亚标志性零食。","en":"Oats, coconut and golden syrup biscuits — created during WWI and now an iconic Australian treat."}}
    ],
    "bestTime": {
      "optimal": [9,10,11,3,4,5],
      "good":    [6,7,8],
      "avoid":   [12,1,2],
      "note":    {"zh":"澳大利亚幅员辽阔，南北气候相反。南部（悉尼、墨尔本）9—11月春季和3—5月秋季最佳；北部（凯恩斯）旱季（5—10月）最佳；12—2月为南部夏季，炎热且有山火风险。","en":"Australia is vast — north and south have opposite climates. Southern cities (Sydney, Melbourne) are best in spring (Sep–Nov) and autumn (Mar–May). Cairns and the Top End peak in the dry season (May–Oct). December–February is southern summer — hot with bushfire risk."}
    }
  },
  "new-zealand": {
    "cuisine": [
      {"emoji":"🍰","name":{"zh":"帕芙洛娃","en":"Pavlova"},"description":{"zh":"外脆内软的蛋白霜蛋糕，配奶油和猕猴桃，是新西兰圣诞餐桌上必不可少的甜点，与澳大利亚共享发明权之争。","en":"Crisp meringue with a soft centre topped with cream and kiwifruit — New Zealand's Christmas dessert staple and an ongoing rival claim with Australia."}},
      {"emoji":"🍖","name":{"zh":"汉吉烤肉","en":"Hāngī"},"description":{"zh":"毛利传统烹饪方式，将肉和蔬菜放入地坑中用热石蒸烤数小时，烟熏风味独特，是深入体验毛利文化的绝佳方式。","en":"Māori earth oven cooking — meat and vegetables steamed for hours over heated stones in a pit, giving a distinctive smoky flavour."}},
      {"emoji":"🥝","name":{"zh":"猕猴桃","en":"Kiwifruit"},"description":{"zh":"新西兰是猕猴桃的主要产地，这里的猕猴桃个大汁多，是新西兰农业的骄傲。","en":"New Zealand's most famous export — the local kiwifruit is uncommonly large, juicy and sweet."}},
      {"emoji":"🦪","name":{"zh":"布拉夫牡蛎","en":"Bluff Oysters"},"description":{"zh":"产自新西兰最南端的布拉夫，每年3—8月当季，肉质肥美鲜甜，被誉为全球最佳牡蛎之一。","en":"Harvested from the icy waters off Bluff (New Zealand's southernmost point), season March–August — considered among the world's finest oysters."}}
    ],
    "bestTime": {
      "optimal": [12,1,2,3,4],
      "good":    [5,11],
      "avoid":   [6,7,8,9,10],
      "note":    {"zh":"南半球夏季（12—2月）阳光明媚，是旅游旺季；3—4月秋季风景如画，游客较少；6—8月南岛有滑雪，北岛也有些景点不适合旅行。","en":"December–February (austral summer) is peak season with long sunny days. March–April offers golden foliage and thinner crowds. June–August means South Island skiing but cold weather elsewhere."}}
  }
}

def enrich(filepath):
    with open(filepath, encoding='utf-8') as f:
        data = json.load(f)
    country_id = os.path.basename(filepath).replace('.json', '')
    extra = EXTRA.get(country_id)
    if not extra:
        print(f'No match: {filepath}')
        return
    for k, v in extra.items():
        data[k] = v
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'Updated: {filepath}')

import glob as _glob
for p in _glob.glob('data/countries/*.json'):
    enrich(p)
print('Done.')
