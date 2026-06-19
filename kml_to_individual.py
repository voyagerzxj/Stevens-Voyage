#!/usr/bin/env python3
"""
kml_to_individual.py
Parse 人工搜集的资料/日本.kml and write individual destination entries.
Run from project root: python kml_to_individual.py
"""
import xml.etree.ElementTree as ET
import json, re, os, unicodedata

KML_FILE  = "人工搜集的资料/日本.kml"
DEST_DIR  = "data/destinations"
COORDS_JS = "data/coords.js"
NS = {"k": "http://www.opengis.net/kml/2.2"}

# ── Chinese name lookup ──────────────────────────────────────────────────────
ZH_NAMES = {
    "Starbucks Coffee - Shibuya Tsutaya":   "星巴克咖啡 涩谷蔦屋店",
    "Toyosu Market":                         "丰洲市场",
    "Tokyo National Museum":                 "东京国立博物馆",
    "Sensō-ji":                              "浅草寺",
    "Imperial Palace":                       "皇居",
    "Ginza":                                 "银座",
    "Roppongi":                              "六本木",
    "Mori Art Museum":                       "森美术馆",
    "Ikebukuro":                             "池袋",
    "Akihabara Electric Town":               "秋叶原电器城",
    "Shinjuku Gyoen National Garden":        "新宿御苑",
    "Tokyo Tower":                           "东京铁塔",
    "Harajuku":                              "原宿",
    "Takeshita Street":                      "竹下通",
    "Omote-Sando Avenue":                    "表参道",
    "Aoyama-dori Avenue":                    "青山大道",
    "Shibuya":                               "涩谷",
    "Shibuya Hikarie":                       "涩谷Hikarie",
    "Machida Squirrel Garden":               "町田松鼠花园",
    "Tokyo Disneyland":                      "东京迪士尼乐园",
    "Tokyo DisneySea":                       "东京迪士尼海洋",
    "Kichijōji":                             "吉祥寺",
    "Ghibli Museum":                         "吉卜力美术馆",
    "Mitsumine Shrine":                      "三峯神社",
    "Shinagawa Shrine":                      "品川神社",
    "Shirokanedai":                          "白金台",
    "Sengaku-ji":                            "泉岳寺",
    "Meguro Parasitological Museum":         "目黑寄生虫馆",
    "Ōtori-jinja Shrine":                    "大鸟神社",
    "National Diet Building":                "国会议事堂",
    "Akasaka Sacas":                         "赤坂Sacas",
    "Tokyo Midtown":                         "东京中城",
    "21_21 Design Sight":                    "21_21 Design Sight",
    "Maman by Louise Bourgeois":             "蜘蛛（路易斯·布尔乔亚雕塑）",
    "Roppongi Hills - Tokyo City View":      "六本木之丘东京城市观景台",
    "Mōri Garden":                           "毛利庭园",
    "Shibakoen":                             "芝公园",
    "Kyū Shiba-rikyū Gardens":              "旧芝离宫恩赐庭园",
    "Hamarikyu Gardens":                     "滨离宫恩赐庭园",
    "Kiyosumi Gardens":                      "清澄庭园",
    "Museum of Contemporary Art Tokyo (MOT)":"东京都现代美术馆",
    "Fukagawa Edo Museum":                   "深川江户资料馆",
    "Tomioka Hachiman Shrine":               "富冈八幡宫",
    "Edo-Tokyo Museum":                      "江户东京博物馆",
    "Sumō Museum":                           "相扑博物馆",
    "The Sumida Hokusai Museum":             "墨田北斋美术馆",
    "Former Yasuda Garden":                  "旧安田庭园",
    "Kanda Jinbocho":                        "神田神保町",
    "Akihabara Gachapon Hall":               "秋叶原扭蛋会馆",
    "Mandarake Complex":                     "漫画王国综合店",
    "Super Potato Akihabara Branch":         "Super Potato秋叶原店",
    "Akihabara Gamers":                      "Gamers秋叶原本店",
    "Kyū-Iwasaki-tei Gardens":              "旧岩崎邸庭园",
    "Marishiten Tokudaiji Temple":           "摩利支天德大寺",
    "Yushima Tenjin Shrine":                 "汤岛天满宫",
    "Ueno Zoo":                              "上野动物园",
    "Shinobazu no Ike Bentendō":            "不忍池辩天堂",
    "Kiyomizu Kannon-dō Temple":            "清水观音堂",
    "Tokyo Metropolitan Art Museum":         "东京都美术馆",
    "Kanei-ji Temple":                       "宽永寺",
    "Cafe Neko-e-mon":                       "猫右卫门猫咖",
    "Kannon-ji":                             "观音寺",
    "Isetatsu":                              "伊势辰（传统千代纸店）",
    "Nezu Shrine":                           "根津神社",
    "Nakamise Shopping Street":              "仲见世商店街",
    "Kappabashi Kitchen Supply Town":        "合羽桥道具街",
    "Hoppy Street":                          "Hoppy街",
    "Rikugien Gardens":                      "六义园",
    "Kyu-Furukawa Gardens":                  "旧古河庭园",
    "Chiikawa Park":                         "ちいかわパーク池袋",
    "SUNSHINE 60 OBSERVATORY TENBOU-PARK":   "阳光60展望台天空公园",
    "Pokémon Center Mega Tokyo & Pikachu Sweets": "精灵宝可梦中心Mega东京",
    "animate Ikebukuro Flagship Store":      "animate池袋本店",
    "Tokyu Kabukicho Tower":                 "东急歌舞伎町塔",
    "Cross Shinjuku Vision":                 "新宿Cross Vision（3D猫广告牌）",
    "Shinjuku Toho Building":                "新宿东宝大厦（哥斯拉）",
    "2 Chome":                               "新宿二丁目",
    "Kabukicho":                             "歌舞伎町",
    "Tokyo Metropolitan Government Building No.1": "东京都厅第一本厅舍",
    "Shimokitazawa":                         "下北泽",
    "Kagurazaka":                            "神乐坂",
    "Zenkoku-ji Temple":                     "善国寺（毘沙门天）",
    "Sangenjaya":                            "三轩茶屋",
    "Jiyugaoka":                             "自由之丘",
    "Jiyūgaoka Kumano-jinja Shrine":        "自由之丘熊野神社",
    "Meguro River":                          "目黑川",
    "Kyu Asakura House":                     "旧朝仓家住宅",
    "Daikanyamacho":                         "代官山",
    "Yebisu Brewery Tokyo":                  "惠比寿啤酒纪念馆",
    "Yebisu Garden Place":                   "惠比寿花园广场",
    "Mitsukoshi Ginza":                      "银座三越",
    "Matsuya Ginza":                         "松屋银座",
    "Ginza Wako":                            "银座和光",
    "Kabuki-za":                             "歌舞伎座",
    "Nihonbashi":                            "日本桥",
    "Tokyo Station Marunouchi Building":     "东京站丸之内大楼",
    "The Tokyo Station Hotel":               "东京站大饭店",
    "KITTE Marunouchi":                      "KITTE丸之内",
    "Marunouchi Building":                   "丸之内大厦",
    "Shin-Marunouchi Building":              "新丸之内大厦",
    "Mitsubishi Ichigokan Museum":           "三菱一号馆美术馆",
    "Suitengu Shrine":                       "水天宫",
    "NTV Tower":                             "日本电视台大楼（大时钟）",
    "Fuji Television Network, Inc.":         "富士电视台",
    "TOKYO TRICK ART MUSEUM":               "东京幻视艺术馆",
    "DiverCity Tokyo Plaza":                 "台场DiverCity东京广场",
    "Museum of Emerging Science and Innovation": "日本科学未来馆",
    "TOYOTA ARENA TOKYO":                    "丰田多用途展示中心",
    "Hachiko Statue":                        "忠犬八公铜像",
    "NHK Studio Park":                       "NHK放送博物馆",
    "Shibuya Chuo-Gai":                      "涩谷Center-Gai（中央街）",
    "Loft":                                  "Loft涩谷店",
    "Shibuya Crossing":                      "涩谷十字路口",
    "Shibuya Parco":                         "涩谷PARCO",
    "Miyashita Park":                        "宫下公园",
    "Shibuya Sky":                           "涩谷Sky展望台",
    "MAGNET by SHIBUYA109":                  "MAGNET by SHIBUYA109",
    "SEIBU Shibuya Store":                   "西武涩谷店",
    "Hands Shibuya":                         "Hands涩谷店",
    "Yoyogi Park":                           "代代木公园",
    "Nezu Museum":                           "根津美术馆",
    "Meiji no Mori Takao Quasi-National Park": "明治之森高尾国定公园",
    "Takaosan Yakuōin Yūkiji Temple":       "高尾山薬王院有喜寺",
    "十三州大見晴台":                         "十三州大见晴台",
    "Okutama":                               "奥多摩",
    "Jindaiji Temple":                       "深大寺",
    "Kokyo Gaien National Garden":           "皇居外苑",
    "The National Museum of the Imperial Collections, Sannomaru Shozokan": "宫内厅三之丸尚藏馆",
    "Imperial Palace East National Gardens": "皇居东御苑",
    "Ginza Sony Park":                       "银座索尼公园",
    "Ad Museum Tokyo":                       "广告博物馆东京",
    "Panasonic Living Showroom Tokyo":       "松下生活展示中心东京",
    "TOTO Tokyo Center Show Room":           "TOTO东京中心展示厅",
    "Tokyo Metropolitan Government Building | North Observation Deck": "东京都厅北展望室",
    "The Gundam Base Tokyo":                 "高达基地东京",
    "Snoopy Museum Tokyo":                   "史努比博物馆东京",
    "Tokyo Skytree Observation Deck":        "东京晴空塔展望台",
    "World Trade Center Building, Inc.":     "世界贸易中心大厦展望台",
    "Shiba Park":                            "芝公园",
    "Roppongi Keyakizaka":                   "六本木欅坂",
    "Fish Market Tsukiji Outer Market":      "筑地场外市场",
    "Edo Kōji":                             "江户小路",
    "Tokyo Pop Town":                        "东京Pop Town（羽田机场）",
    "屋内展望フロア「FLIGHT DECK TOKYO」":   "室内展望台 FLIGHT DECK TOKYO",
    "Nakagin Capsule Tower":                 "中银胶囊塔",
    "Tokyo Daijingu Shrine":                 "东京大神宫",
    "Kotai Jingu (Ise Jingu Naiku, Inner Sanctuary)": "皇大神宫（伊势神宫内宫）",
    "Sanrio Puroland":                       "三丽鸥彩虹乐园",
    "Echigotsumaari Daichinogeijutsusai Kiyotsukyo Tunnel Information Center": "清津峡隧道（越后妻有大地艺术祭）",
    "Hikan Inari-jinja Shrine":              "被官稻荷神社",
    "Kabuki Inari Shrine":                   "歌舞伎稻荷神社",
    "Fushimi Inari Taisha":                  "伏见稻荷大社",
    "Senbon Torii (Thousand Torii Gates)":   "千本鸟居（伏见稻荷）",
    "Toyokawa Inari (Myōgon-ji Temple)":    "丰川稲荷（妙严寺）",
    "Yūtoku Inari Shrine":                  "祐德稻荷神社",
    "Kasama Inari Shrine":                   "笠间稻荷神社",
    "Seimei Shrine":                         "晴明神社",
    "Dazaifu Tenmangu Shrine":               "太宰府天满宫",
    "Tenkai Inari Shrine":                   "天开稻荷神社",
    "Zaō Fox Village":                       "蔵王狐狸村",
    "Okama":                                 "御釜（蔵王火口湖）",
    "Tonogayato Garden":                     "殿谷户庭园",
    "Yanaka Cemetery":                       "谷中灵园",
    "Bunkyo City Office":                    "文京区役所（展望台）",
    "Inokashira Park":                       "井之头恩赐公园",
    "Yurakucho":                             "有乐町",
    "2k540 Aki-Oka Artisan":                 "2k540 秋叶原工艺市集",
    "East Ikebukuro Central Park":           "东池袋中央公园",
    "National Museum of Nature and Science": "国立科学博物馆",
    "Fujiko · F · Fujio Museum":            "哆啦A梦博物馆",
    "Kamakura High School":                  "镰仓高等学校",
    "Kamakurakōkō-Mae Station":             "镰仓高校前站",
    "Hakone-Yumoto Station":                 "箱根汤本站",
    "Imperial Theatre":                      "帝国剧场",
    "Ginza Itoya":                           "银座伊东屋",
    "Imado Shrine":                          "今户神社",
    "Togo Shrine":                           "东郷神社",
    "Kokuryo Shrine":                        "国领神社",
    "First Avenue Tokyo Station":            "东京站一番街",
    "Hatsushima":                            "初岛",
    "Kinugawa Onsen":                        "鬼怒川温泉",
    "Nikkō Tōshōgū":                        "日光东照宫",
    "二荒山神社 社標":                        "二荒山神社社标",
    "Lake Chūzenji":                         "中禅寺湖",
    "Kegon Waterfalls":                      "华严瀑布",
    "Edo Wonderland Nikko Edomura":          "日光江户村",
    "Tobu World Square":                     "东武世界广场",
    "Yokohama Chinatown":                    "横滨中华街",
    "Motomachi":                             "横滨元町",
    "Yamatecho":                             "横滨山手町",
    "Yokohama Red Brick Warehouse":          "横滨红砖仓库",
    "Yokohama Bay Bridge":                   "横滨海湾大桥",
    "YOKOHAMA AIR CABIN Sakuragicho Station": "横滨空中缆车樱木町站",
    "Hase Temple":                           "长谷寺",
    "Houkokuji":                             "报国寺",
    "Kotoku-in":                             "高德院（镰仓大佛）",
    "Meigetsu-in":                           "明月院",
    "Kenchō-ji":                             "建长寺",
    "Engaku-ji":                             "圆觉寺",
    "Tsurugaoka Hachimangu":                 "鹤冈八幡宫",
    "Enoshima":                              "江之岛",
    "Enoshima Shrine Hetsumiya":             "江岛神社边津宫",
    "Kawagoe":                               "川越",
    "Lake Okutama":                          "奥多摩湖",
    "Akigawa Valley":                        "秋川溪谷",
    "Mount Mitake":                          "御岳山",
    "Fussa Base Side Street":                "福生基地通（美国村）",
    "Showa Kinen Park":                      "昭和纪念公园",
    "Tamon":                                 "多闻",
    "Ganso Food Sample Shop Kappabashi Showroom": "元祖食品样品屋合羽桥展示室",
    "Little Museum of Glass Art Books":      "玻璃艺术图书小博物馆",
    "Sumida Edo Kiriko Museum":              "墨田江户切子博物馆",
    "Shinohara Furin Honpo":                 "篠原风铃本铺",
    "National Engei Hall":                   "国立演艺场",
    "Tokyo Metropolitan Theatre":            "东京都剧场",
    "Sukiyabashi Jiro":                      "数寄屋桥次郎（本店）",
    "Nodaiwa Azabu Iikura Honten":           "野田岩麻布饭仓本店",
    "Mikawa Zezankyo":                       "三河是善居",
    "Amezaiku Yoshihara Sendagi Main Store": "飴细工吉原千驮木本店",
    "Wakabado":                              "若叶堂",
    "Ozu Washi":                             "小津和纸",
    "染の里おちあい":                         "染之里落合",
    "Sogetsu Foundation":                    "草月流本部（草月会馆）",
    "Origami Museum":                        "折纸会馆",
    "Kancha":                                "神茶（谷中茶摊）",
}

# ── Slug overrides for non-ASCII names ──────────────────────────────────────
SLUG_OVERRIDES = {
    "十三州大見晴台":                          "jusan-shu-miharashi-dai",
    "二荒山神社 社標":                         "futarasan-shrine-sign",
    "染の里おちあい":                           "some-no-sato-ochiai",
    "屋内展望フロア「FLIGHT DECK TOKYO」":      "flight-deck-tokyo",
}

# ── Prefecture assignment ────────────────────────────────────────────────────
PREF_OVERRIDES = {
    "Snoopy Museum Tokyo":        "tokyo",
    "Machida Squirrel Garden":    "tokyo",
    "Fujiko · F · Fujio Museum": "kanagawa",
    "Hatsushima":                 "shizuoka",
}

def assign_pref(name, lon, lat):
    if name in PREF_OVERRIDES:
        return PREF_OVERRIDES[name]
    if lat > 37.5:                                return "miyagi"
    if lat > 36.8 and lon < 139.5:               return "niigata"
    if lat > 36.4:                                return "tochigi"
    if lat > 36.0 and lon > 139.9:               return "ibaraki"
    if lat > 35.85 and 138.7 < lon < 139.65:     return "saitama"
    if lon < 131.5:
        return "fukuoka" if lat > 33.3 else "saga"
    if lon < 136.5:                               return "kyoto"
    if lon < 137.0:
        return "mie" if lat < 35.0 else "aichi"
    if lon < 138.0:                               return "aichi"
    if lat < 35.1:                                return "shizuoka"
    if lon > 139.87 and lat > 35.55:             return "chiba"
    if lat < 35.50:                               return "kanagawa"
    if lat < 35.65 and lon < 139.60:             return "kanagawa"
    return "tokyo"

# ── Slug generation ──────────────────────────────────────────────────────────
def make_slug(name):
    if name in SLUG_OVERRIDES:
        return SLUG_OVERRIDES[name]
    s = unicodedata.normalize("NFKD", name)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.lower()
    s = s.replace("&", "and").replace("+", "plus")
    s = re.sub(r"[^\w\s-]", " ", s)
    s = re.sub(r"[\s_]+", "-", s)
    s = re.sub(r"-+", "-", s)
    return s.strip("-")

# ── Category detection ───────────────────────────────────────────────────────
def detect_cat(name):
    n = name.lower()
    if any(w in n for w in ["onsen", "kinugawa"]):
        return "onsen"
    if any(w in n for w in ["disneyland", "disneysea", "puroland", "zoo",
                              "squirrel garden", "trick art", "fox village",
                              "chiikawa", "gundam base", "pokemon center"]):
        return "entertainment"
    if any(w in n for w in ["observatory", "skytree", "observation deck",
                              "tenbou-park", "shibuya sky", "flight deck",
                              "world trade center", "north observation deck",
                              "city view", "sunshine 60"]):
        return "observation"
    if any(w in n for w in ["shrine", "jinja", "taisha", "hachiman", "tenmangu",
                              "inari", "benten", "tenjin", "seimei", "suitengu",
                              "togo shrine", "imado", "kokuryo", "hikan inari",
                              "kabuki inari", "tokyo daijingu"]):
        return "shrine"
    if any(w in n for w in ["temple", "-ji", "dera", "marishiten",
                              "kiyomizu kannon", "zenkoku-ji", "hase temple",
                              "kotoku-in", "houkokuji", "kenchō", "engaku",
                              "kanei-ji", "sengaku-ji", "kannon-ji", "jindaiji"]):
        return "temple"
    if any(w in n for w in ["garden", "gardens", "park", "koen", "gaien",
                              "rikugien", "hamarikyu", "kiyosumi", "inokashira",
                              "meguro river", "yoyogi", "showa kinen",
                              "tonogayato", "yanaka", "kyu-furukawa",
                              "kyu shiba", "mori garden", "former yasuda",
                              "kokyo gaien", "imperial palace east"]):
        return "garden"
    if any(w in n for w in ["museum", "hokusai", "edo-tokyo museum",
                              "fukagawa edo", "ichigokan", "ad museum",
                              "origami museum", "glass art books",
                              "kiriko museum", "parasitological",
                              "sumo museum", "national museum of nature",
                              "sannomaru shozokan", "nhk studio"]):
        return "museum"
    if any(w in n for w in ["starbucks", "cafe neko", "coffee"]):
        return "cafe"
    if any(w in n for w in ["jiro", "nodaiwa", "mikawa zezankyo",
                              "sukiyabashi"]):
        return "food"
    if any(w in n for w in ["washi", "furin", "amezaiku", "sogetsu",
                              "wakabado", "isetatsu", "kiriko museum",
                              "染", "ganso food sample", "2k540"]):
        return "craft"
    if any(w in n for w in ["lake", "mountain", "valley", "falls",
                              "waterfall", "island", "gorge",
                              "okutama", "hatsushima", "okama",
                              "fox village", "akigawa", "mount mitake",
                              "meiji no mori", "takao"]):
        return "nature"
    if any(w in n for w in ["market", "tsukiji", "kappabashi", "nakamise",
                              "hoppy street", "jinbocho", "food sample",
                              "toyosu", "first avenue"]):
        return "shopping"
    if any(w in n for w in ["shibuya", "ginza", "roppongi", "harajuku",
                              "akihabara", "ikebukuro", "shimokitazawa",
                              "kagurazaka", "jiyugaoka", "sangenjaya",
                              "daikanyama", "kabukicho", "marunouchi",
                              "nihonbashi", "yurakucho", "kichijoji",
                              "shinjuku", "aoyama", "2 chome"]):
        return "district"
    if any(w in n for w in ["store", "shop", "parco", "seibu", "hands ",
                              "loft", "mitsukoshi", "matsuya", "wako",
                              "kitte", "itoya", "super potato", "mandarake",
                              "gamers", "gachapon", "magnet by", "animate",
                              "pop town", "sacas", "midtown", "chiikawa"]):
        return "shopping"
    return "landmark"

# ── Location strings ─────────────────────────────────────────────────────────
PREF_LOC = {
    "tokyo":    ("东京都", "Tokyo"),
    "kanagawa": ("神奈川县", "Kanagawa Prefecture"),
    "chiba":    ("千叶县", "Chiba Prefecture"),
    "saitama":  ("埼玉县", "Saitama Prefecture"),
    "ibaraki":  ("茨城县", "Ibaraki Prefecture"),
    "tochigi":  ("栃木县", "Tochigi Prefecture"),
    "miyagi":   ("宫城县", "Miyagi Prefecture"),
    "niigata":  ("新潟县", "Niigata Prefecture"),
    "kyoto":    ("京都府", "Kyoto"),
    "fukuoka":  ("福冈县", "Fukuoka Prefecture"),
    "saga":     ("佐贺县", "Saga Prefecture"),
    "mie":      ("三重县", "Mie Prefecture"),
    "aichi":    ("爱知县", "Aichi Prefecture"),
    "shizuoka": ("静冈县", "Shizuoka Prefecture"),
}

# ── Content templates ────────────────────────────────────────────────────────
TEMPLATES = {
    "shrine": {
        "zh_desc": "{zh}是{loc_zh}的著名神社，香火旺盛，供奉着独特的神明，是当地重要的精神文化场所，每逢节日前来参拜的信众与游客络绎不绝。",
        "en_desc": "{en} is a celebrated Shinto shrine in {loc_en}, dedicated to its enshrined deity. The shrine serves as an important spiritual and cultural landmark, drawing worshippers and visitors especially during festivals.",
        "zh_tags": ["神社", "神道", "日本信仰"],
        "en_tags": ["Shrine", "Shinto", "Japanese Spirituality"],
        "zh_hl": ["社殿建筑：精心维护的神社建筑群，体现日本传统神道建筑之美",
                  "参道与鸟居：通往正殿的参道营造出庄严肃穆的神圣氛围",
                  "御守与绘马：购买祈愿御守或悬挂祈福绘马，感受日本信仰文化"],
        "en_hl": ["Shrine buildings: beautifully maintained structures reflecting traditional Shinto architectural aesthetics",
                  "Approach and torii: the path to the main hall creates a solemn sacred atmosphere",
                  "Omamori and ema: buy protective charms or hang a prayer plaque to experience Japanese spiritual culture"],
        "zh_adm": "参拜免费；部分宝物殿另收费",
        "en_adm": "Shrine worship free; some treasure halls charge entry",
        "zh_dur": "30分钟—1小时",
        "en_dur": "30 minutes–1 hour",
        "zh_tip": "建议清晨或傍晚参拜，人少且气氛更加清幽。",
        "en_tip": "Visit early morning or late afternoon for fewer crowds and a more atmospheric experience.",
    },
    "temple": {
        "zh_desc": "{zh}是{loc_zh}的著名寺庙，历史悠久，建筑风格独特，是欣赏日本传统佛教文化与寺院建筑的重要场所。",
        "en_desc": "{en} is a celebrated Buddhist temple in {loc_en} with a distinguished history and characteristic architecture, offering visitors an immersive experience of Japan's temple culture.",
        "zh_tags": ["寺庙", "佛教", "历史"],
        "en_tags": ["Temple", "Buddhism", "Historic"],
        "zh_hl": ["本堂：供奉本尊的核心建筑，历史悠久，建筑气势恢宏",
                  "寺院庭园：精心营造的禅意园林，四季皆有不同景致",
                  "御守与朱印：集御朱印或购买专属御守留作纪念"],
        "en_hl": ["Main hall: the principal sanctuary enshrining the temple's deity — historic and impressive",
                  "Temple garden: a carefully composed garden offering different scenery through the seasons",
                  "Goshuin and omamori: collect a temple seal stamp or buy a protective charm as a memento"],
        "zh_adm": "因寺庙而异，约300—1,000日元",
        "en_adm": "Varies by temple; typically ¥300–1,000",
        "zh_dur": "30分钟—1.5小时",
        "en_dur": "30 minutes–1.5 hours",
        "zh_tip": "注意寺庙的开放时间，大多数寺庙在傍晚4—5点关闭。",
        "en_tip": "Check closing times — most temples close at 4–5 pm.",
    },
    "garden": {
        "zh_desc": "{zh}是{loc_zh}的一处优美园林，巧妙融合了日本传统造园艺术，四季景色各异，是都市中难得的清幽休憩之地。",
        "en_desc": "{en} is a fine garden in {loc_en} that elegantly incorporates traditional Japanese landscape design. The grounds transform with each season, offering a peaceful urban retreat.",
        "zh_tags": ["庭园", "日式造园", "自然"],
        "en_tags": ["Garden", "Japanese Landscaping", "Nature"],
        "zh_hl": ["四季景观：春樱夏绿秋枫冬雪，每个季节皆有迥异的园林之美",
                  "日式造园艺术：假山、石灯笼、锦鲤池等传统造园元素的精妙运用",
                  "都市绿洲：繁忙城市中难得的清幽空间，可静享片刻宁静"],
        "en_hl": ["Seasonal scenery: cherry blossoms in spring, greenery in summer, foliage in autumn and snow in winter",
                  "Japanese landscaping: artful use of rock arrangements, stone lanterns and koi ponds",
                  "Urban oasis: a rare tranquil retreat amid the busy city, ideal for a moment of calm"],
        "zh_adm": "约150—600日元（各园不同）",
        "en_adm": "Typically ¥150–600 depending on the garden",
        "zh_dur": "1—2小时",
        "en_dur": "1–2 hours",
        "zh_tip": "春季赏樱（3月底—4月初）和秋季赏枫（11月中旬）是最佳游览季节。",
        "en_tip": "Cherry blossom (late March–early April) and autumn foliage (mid-November) are the most rewarding seasons.",
    },
    "museum": {
        "zh_desc": "{zh}是{loc_zh}的著名博物馆，以其丰富的馆藏和精心的展陈方式著称，是了解相关历史文化与艺术的重要窗口。",
        "en_desc": "{en} is a celebrated museum in {loc_en}, renowned for its impressive collections and thoughtful exhibitions, providing an important window into history, culture and art.",
        "zh_tags": ["博物馆", "展览", "文化"],
        "en_tags": ["Museum", "Exhibition", "Culture"],
        "zh_hl": ["核心展览：精选馆藏精品，深入展现相关主题的历史脉络与文化内涵",
                  "建筑空间：博物馆建筑本身亦是值得欣赏的设计作品",
                  "特别展览：定期举办高水准的临时特展，为常规馆藏带来新的维度"],
        "en_hl": ["Core collection: carefully curated highlights tracing the historical and cultural threads of the museum's theme",
                  "Architecture: the museum building itself is often a significant design achievement worth appreciating",
                  "Special exhibitions: periodic high-quality temporary shows add new dimensions to the permanent collection"],
        "zh_adm": "约500—2,000日元（各馆不同）",
        "en_adm": "Typically ¥500–2,000 depending on the museum",
        "zh_dur": "1—3小时",
        "en_dur": "1–3 hours",
        "zh_tip": "提前在官网确认开放时间与特别展览信息，部分博物馆周一闭馆。",
        "en_tip": "Check the official website for opening hours and special exhibitions — many museums close on Mondays.",
    },
    "cafe": {
        "zh_desc": "{zh}是{loc_zh}的人气咖啡馆，以其独特的地理位置或别致的店内设计而广受游客青睐，是东京不可错过的打卡咖啡体验。",
        "en_desc": "{en} is a popular café in {loc_en}, celebrated for its prime location or distinctive interior — one of Tokyo's most sought-after café experiences for visitors.",
        "zh_tags": ["咖啡馆", "打卡", "东京"],
        "en_tags": ["Café", "Photo Spot", "Tokyo"],
        "zh_hl": ["绝佳视野：可俯瞰著名地标或繁忙街景的绝佳观察点",
                  "特色饮品：精心调制的咖啡与特色饮料，品质有保证",
                  "打卡价值：窗边座位与特色饮品皆是难忘的记忆"],
        "en_hl": ["Prime vantage: a strategic position overlooking a famous landmark or vibrant street scene",
                  "Signature drinks: carefully crafted coffees and specialty beverages",
                  "Photo opportunities: window seats and signature drinks both make for memorable photographs"],
        "zh_adm": "饮品约600—1,500日元",
        "en_adm": "Drinks typically ¥600–1,500",
        "zh_dur": "30分钟—1小时",
        "en_dur": "30 minutes–1 hour",
        "zh_tip": "热门时段人流量大，建议开门时或平日上午前往以避开高峰。",
        "en_tip": "Can be very busy at peak hours — visit at opening time or on a weekday morning.",
    },
    "shopping": {
        "zh_desc": "{zh}是{loc_zh}的知名购物商业地标，汇聚了各类特色店铺与餐饮，是体验日本都市消费文化的热门目的地。",
        "en_desc": "{en} is a well-known shopping and commercial landmark in {loc_en}, offering a diverse mix of specialty stores and dining — a popular destination for experiencing Japan's urban retail culture.",
        "zh_tags": ["购物", "商业", "都市"],
        "en_tags": ["Shopping", "Retail", "Urban"],
        "zh_hl": ["特色店铺：从传统工艺品到前卫时尚品牌，应有尽有",
                  "美食选择：街区内餐厅与咖啡馆林立，提供丰富用餐选择",
                  "购物氛围：逛街本身就是体验日本商业文化与活力的过程"],
        "en_hl": ["Specialty stores: from traditional crafts to cutting-edge fashion, a rich variety of shops",
                  "Dining options: plentiful restaurants and cafés for meals or a break between shops",
                  "Retail atmosphere: the act of strolling here is itself an enjoyable Tokyo experience"],
        "zh_adm": "免费进入，购物消费另计",
        "en_adm": "Free to enter; individual shop prices vary",
        "zh_dur": "1—3小时",
        "en_dur": "1–3 hours",
        "zh_tip": "平日人较少，周末及节假日人流量大，建议错峰前往。",
        "en_tip": "Weekdays are less crowded; avoid peak weekend and holiday periods if possible.",
    },
    "observation": {
        "zh_desc": "{zh}是{loc_zh}的著名展望设施，可将城市全景尽收眼底，无论白天还是夜晚都是欣赏都市风光的绝佳场所。",
        "en_desc": "{en} is a celebrated observation facility in {loc_en}, offering sweeping panoramic views across the city both by day and after dark.",
        "zh_tags": ["展望台", "全景", "地标"],
        "en_tags": ["Observatory", "Panoramic View", "Landmark"],
        "zh_hl": ["全景视野：360度或广角俯瞰城市天际线，可一览城市全貌",
                  "昼夜景观：晴天可能看到富士山，夜间璀璨夜景同样令人难忘",
                  "建筑体验：展望台所在建筑本身亦是令人印象深刻的地标"],
        "en_hl": ["Panoramic views: 360° or wide-angle vista over the city skyline",
                  "Day and night: clear days may offer a view of Mt Fuji; the evening city lights are spectacular",
                  "The building itself: the structure housing the observation deck is often an architectural landmark"],
        "zh_adm": "约1,000—2,500日元",
        "en_adm": "Typically ¥1,000–2,500",
        "zh_dur": "30分钟—1小时",
        "en_dur": "30 minutes–1 hour",
        "zh_tip": "日落时分（黄昏）是兼顾白天景色与夜景的最佳观赏时机。",
        "en_tip": "Sunset (dusk) is ideal for combining daytime views with the onset of city lights.",
    },
    "entertainment": {
        "zh_desc": "{zh}是{loc_zh}的人气娱乐设施，深受各年龄层游客喜爱，融合了沉浸式体验、互动游乐与主题文化于一体。",
        "en_desc": "{en} is a popular entertainment destination in {loc_en}, beloved by visitors of all ages, combining immersive experiences, interactive attractions and themed culture.",
        "zh_tags": ["娱乐", "主题乐园", "亲子"],
        "en_tags": ["Entertainment", "Theme Park", "Family"],
        "zh_hl": ["核心体验：沉浸式的娱乐设施与互动体验，让每一位访客都能全情投入",
                  "主题特色：独特的主题设计贯穿整个园区，打造完整的沉浸式世界",
                  "周边商品：丰富的主题商品与限定纪念品，是难忘旅程的绝佳纪念"],
        "en_hl": ["Core experience: immersive attractions and interactive facilities that fully engage visitors",
                  "Themed design: a distinctive theme permeates the entire venue, creating a complete immersive world",
                  "Merchandise: themed goods and limited souvenirs make for memorable mementos"],
        "zh_adm": "因场馆而异，约1,000—9,000日元",
        "en_adm": "Varies widely; typically ¥1,000–9,000",
        "zh_dur": "2—5小时",
        "en_dur": "2–5 hours",
        "zh_tip": "热门设施建议提前网上预约，节假日与周末人流量较大。",
        "en_tip": "Advance online booking is recommended for popular attractions, especially on weekends and holidays.",
    },
    "district": {
        "zh_desc": "{zh}是{loc_zh}极具代表性的特色街区，拥有鲜明的文化个性与丰富的商业、餐饮资源，是感受日本都市生活方式的绝佳去处。",
        "en_desc": "{en} is one of {loc_en}'s most distinctive neighborhoods, with a strong cultural identity and rich commercial and dining offerings — a great place to experience Japan's urban lifestyle.",
        "zh_tags": ["街区", "文化", "都市"],
        "en_tags": ["District", "Urban Culture", "Neighborhood"],
        "zh_hl": ["街区氛围：鲜明的街区个性与文化特色，是城市多样性的缩影",
                  "餐饮选择：街区内聚集了各具特色的餐厅、酒吧与咖啡馆",
                  "购物与探索：从知名品牌到个性小店，随意走走总有惊喜发现"],
        "en_hl": ["Neighborhood character: the area's strong personality and cultural identity capture the city's urban diversity",
                  "Dining and drinks: a dense cluster of distinctive restaurants, bars and cafés",
                  "Shopping and exploring: from well-known brands to indie stores, discoveries await around every corner"],
        "zh_adm": "街区免费探索",
        "en_adm": "Free to explore",
        "zh_dur": "1—3小时",
        "en_dur": "1–3 hours",
        "zh_tip": "傍晚至夜间是感受街区活力的最佳时机，白天则更适合购物与参观。",
        "en_tip": "Evening is the most vibrant time; daytime is better for shopping and sightseeing.",
    },
    "nature": {
        "zh_desc": "{zh}是{loc_zh}的壮美自然景观，以其独特的地理风貌与四季变换的自然之美而著称，是亲近大自然、享受户外体验的理想目的地。",
        "en_desc": "{en} is a magnificent natural landscape in {loc_en}, celebrated for its distinctive geographical features and seasonal beauty — an ideal destination for nature-lovers and outdoor enthusiasts.",
        "zh_tags": ["自然景观", "户外", "风景"],
        "en_tags": ["Nature", "Outdoor", "Scenic"],
        "zh_hl": ["壮美景观：无论山川湖泊还是峡谷瀑布，皆令人叹为观止",
                  "户外活动：远足、骑行、垂钓等户外体验，让人与自然亲密接触",
                  "四季之美：随着季节更迭，自然景观呈现出迥然不同的色彩与氛围"],
        "en_hl": ["Breathtaking scenery: mountains, lakes, canyons or waterfalls that command awe",
                  "Outdoor activities: hiking, cycling, fishing and other experiences that bring visitors close to nature",
                  "Seasonal changes: the landscape transforms dramatically with each season"],
        "zh_adm": "免费或小额入场费",
        "en_adm": "Free or small admission fee",
        "zh_dur": "半天至一天",
        "en_dur": "Half to full day",
        "zh_tip": "出发前查询天气预报，并准备合适的户外装备。",
        "en_tip": "Check the weather forecast before heading out and bring appropriate outdoor gear.",
    },
    "food": {
        "zh_desc": "{zh}是{loc_zh}的知名餐厅，以其精湛的料理技艺和严选食材闻名，代表了日本饮食文化中的精华。",
        "en_desc": "{en} is a celebrated restaurant in {loc_en}, renowned for its culinary excellence and carefully sourced ingredients — a representative gem of Japanese food culture.",
        "zh_tags": ["美食", "餐厅", "日本料理"],
        "en_tags": ["Fine Dining", "Restaurant", "Japanese Cuisine"],
        "zh_hl": ["招牌料理：以精选食材和代代相传的烹饪技艺呈现的精致料理",
                  "用餐环境：精心营造的用餐氛围，与料理本身相得益彰",
                  "文化体验：用餐本身就是深入了解日本饮食文化哲学的绝佳机会"],
        "en_hl": ["Signature dishes: refined cuisine showcasing carefully selected ingredients and time-honoured techniques",
                  "Dining environment: a carefully crafted atmosphere that perfectly complements the food",
                  "Cultural experience: dining here is itself a deep dive into Japanese culinary philosophy"],
        "zh_adm": "人均约3,000—30,000日元（视餐厅而定）",
        "en_adm": "Typically ¥3,000–30,000 per person depending on the restaurant",
        "zh_dur": "1—2小时",
        "en_dur": "1–2 hours",
        "zh_tip": "顶级餐厅通常需要提前数周至数月预约，请务必提前规划。",
        "en_tip": "Top-tier restaurants typically require reservations weeks to months in advance — plan well ahead.",
    },
    "craft": {
        "zh_desc": "{zh}是{loc_zh}传承日本传统工艺的专门店或工房，以精湛的手工技艺与深厚的文化底蕴吸引对日本传统文化感兴趣的访客。",
        "en_desc": "{en} is a specialist craft studio or shop in {loc_en} that preserves traditional Japanese artisan techniques, drawing visitors interested in Japan's rich handcraft culture.",
        "zh_tags": ["工艺", "传统文化", "手工"],
        "en_tags": ["Craft", "Traditional Culture", "Artisan"],
        "zh_hl": ["工艺展示：亲眼目睹匠人精湛的传统工艺技术，感受手作之美",
                  "产品选购：精心制作的工艺品既是实用物件，也是独一无二的艺术收藏",
                  "工坊体验：部分场所提供亲手体验工艺制作的机会"],
        "en_hl": ["Craft demonstrations: witness skilled artisans practising their traditional techniques",
                  "Products for purchase: carefully crafted items that are both functional objects and unique works of art",
                  "Workshop experience: some venues offer hands-on sessions where visitors can try making their own piece"],
        "zh_adm": "参观免费；体验工坊约1,000—3,000日元",
        "en_adm": "Browsing free; workshop experiences typically ¥1,000–3,000",
        "zh_dur": "30分钟—2小时",
        "en_dur": "30 minutes–2 hours",
        "zh_tip": "提前致电或查询官网确认营业时间与工坊预约事宜。",
        "en_tip": "Call ahead or check the official website to confirm opening hours and workshop reservations.",
    },
    "landmark": {
        "zh_desc": "{zh}是{loc_zh}的著名地标，以其独特的建筑风格、历史文化意义或在城市生活中的重要地位而广为人知。",
        "en_desc": "{en} is a well-known landmark in {loc_en}, distinguished by its unique architecture, historical significance or important role in the city's daily life.",
        "zh_tags": ["地标", "建筑", "文化"],
        "en_tags": ["Landmark", "Architecture", "Culture"],
        "zh_hl": ["建筑外观：独具匠心的建筑立面与设计，是城市天际线的重要组成部分",
                  "历史文化意义：建筑背后承载着丰富的历史故事与文化内涵",
                  "周边探索：地标周边通常聚集了丰富的餐饮、购物与文化资源"],
        "en_hl": ["Architecture: a distinctive facade and design that contributes to the city skyline",
                  "Historical and cultural significance: the landmark carries a rich history and cultural story",
                  "Surroundings: the area around the landmark typically offers plentiful dining, shopping and cultural resources"],
        "zh_adm": "外观参观免费；内部设施视情况而定",
        "en_adm": "Exterior viewing free; interior facilities vary",
        "zh_dur": "30分钟—1小时",
        "en_dur": "30 minutes–1 hour",
        "zh_tip": "结合周边其他景点规划行程，可大幅提高游览效率。",
        "en_tip": "Combine with nearby sights for an efficient itinerary.",
    },
    "onsen": {
        "zh_desc": "{zh}是{loc_zh}著名的温泉胜地，天然温泉水质优良，融入壮美的自然山水之中，是放松身心、体验日本温泉文化的绝佳去处。",
        "en_desc": "{en} is a celebrated hot-spring resort in {loc_en}, where high-quality natural onsen waters meet scenic mountain landscapes — an ideal destination for relaxation and experiencing Japanese bath culture.",
        "zh_tags": ["温泉", "放松", "日本文化"],
        "en_tags": ["Hot Spring", "Onsen", "Relaxation"],
        "zh_hl": ["温泉浴场：多种成分与温度的天然温泉，适合不同喜好的泡汤体验",
                  "自然美景：温泉区周边的山川峡谷风光，与泡汤体验完美结合",
                  "传统旅馆：选择入住温泉旅馆，体验日式款待（おもてなし）的极致"],
        "en_hl": ["Hot spring baths: natural onsen pools of varying mineral compositions and temperatures",
                  "Scenic surroundings: mountain and gorge scenery perfectly complements the bathing experience",
                  "Traditional ryokan: staying at a hot-spring inn delivers the ultimate Japanese hospitality (omotenashi) experience"],
        "zh_adm": "日归浴场约500—3,000日元；住宿另计",
        "en_adm": "Day-use baths ~¥500–3,000; accommodation extra",
        "zh_dur": "半天至一天（住宿则更长）",
        "en_dur": "Half-day to full day (longer if staying overnight)",
        "zh_tip": "傍晚浸泡温泉最为惬意。建议提前查询各浴场的纹身限制政策。",
        "en_tip": "Evening is the most relaxing time for a soak. Check in advance regarding tattoo restrictions.",
    },
}

# ── KML parsing ──────────────────────────────────────────────────────────────
def parse_kml():
    tree = ET.parse(KML_FILE)
    root = tree.getroot()
    results = []
    for pm in root.findall(".//k:Placemark", NS):
        name_el = pm.find("k:name", NS)
        coords_el = pm.find(".//k:coordinates", NS)
        if name_el is None or coords_el is None:
            continue
        raw = (name_el.text or "").strip()
        # Strip CDATA if ElementTree didn't handle it
        raw = re.sub(r"<!\[CDATA\[(.+?)\]\]>", r"\1", raw, flags=re.DOTALL).strip()
        coords_text = (coords_el.text or "").strip()
        parts = coords_text.split(",")
        if len(parts) < 2:
            continue
        try:
            lon, lat = float(parts[0].strip()), float(parts[1].strip())
        except ValueError:
            continue
        results.append({"name": raw, "lon": lon, "lat": lat})
    return results


def deduplicate(placemarks):
    seen = set()
    out = []
    for pm in placemarks:
        key = (pm["name"], round(pm["lon"], 5), round(pm["lat"], 5))
        if key not in seen:
            seen.add(key)
            out.append(pm)
    return out


def is_japan(lon, lat):
    return 129 <= lon <= 146 and 30 <= lat <= 46

# ── Entry generation ─────────────────────────────────────────────────────────
def make_entry(name, lon, lat):
    pref = assign_pref(name, lon, lat)
    zh   = ZH_NAMES.get(name, name)
    sid  = make_slug(name)
    cat  = detect_cat(name)
    loc_zh, loc_en = PREF_LOC.get(pref, ("日本", "Japan"))
    tmpl = TEMPLATES[cat]

    def f(s):
        return s.replace("{zh}", zh).replace("{en}", name)\
                .replace("{loc_zh}", loc_zh).replace("{loc_en}", loc_en)

    return {
        "id": sid,
        "name": {"zh": zh, "en": name},
        "description": {"zh": f(tmpl["zh_desc"]), "en": f(tmpl["en_desc"])},
        "image": f"https://picsum.photos/seed/{sid}-japan/800/500",
        "tags": {"zh": list(tmpl["zh_tags"]), "en": list(tmpl["en_tags"])},
        "location": {"zh": loc_zh, "en": loc_en},
        "subdivision": pref,
        "highlights": {"zh": list(tmpl["zh_hl"]), "en": list(tmpl["en_hl"])},
        "admission": {"zh": tmpl["zh_adm"], "en": tmpl["en_adm"]},
        "duration": {"zh": tmpl["zh_dur"], "en": tmpl["en_dur"]},
        "tips": {"zh": tmpl["zh_tip"], "en": tmpl["en_tip"]},
    }

# ── Preserved (non-KML) entries ──────────────────────────────────────────────
PRESERVED_IDS = {
    "tokyo":   {"tokyo-shibuya", "ogasawara", "national-museum-western-art"},
    "kyoto":   {"kyoto-temples"},
    "fukuoka": {"okinoshima"},
    "niigata": {"sado-gold-mines", "itoigawa-geopark"},
}

def read_preserved(pref, ids):
    path = os.path.join(DEST_DIR, f"japan-{pref}.json")
    if not os.path.exists(path):
        return []
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    return [e for e in data if e.get("id") in ids]

# ── coords.js update ─────────────────────────────────────────────────────────
START_MARKER = "    /* Japan — Tokyo */"
END_MARKER   = "    /* Japan — existing UNESCO"

def build_coords_block(by_pref):
    lines = []
    for pref in sorted(by_pref):
        label = PREF_LOC.get(pref, (pref, pref))[1]
        lines.append(f"\n    /* Japan — {label} */")
        for entry, lon, lat in by_pref[pref]:
            sid = entry["id"]
            lines.append(f'    "{sid}":{" " * max(1, 44 - len(sid))}[{round(lat,4)}, {round(lon,4)}],')
    return "\n".join(lines) + "\n\n"

def update_coords_js(by_pref):
    with open(COORDS_JS, encoding="utf-8") as f:
        text = f.read()

    idx_start = text.find(START_MARKER)
    idx_end   = text.find(END_MARKER)
    if idx_start < 0 or idx_end < 0:
        print("WARNING: coords.js markers not found — skipping coords update")
        return

    new_block = build_coords_block(by_pref)
    text = text[:idx_start] + new_block + text[idx_end:]

    with open(COORDS_JS, "w", encoding="utf-8") as f:
        f.write(text)
    print("Updated coords.js")

# ── Main ─────────────────────────────────────────────────────────────────────
def main():
    # 1. Parse and clean KML
    raw = parse_kml()
    unique = deduplicate(raw)
    japan = [p for p in unique if is_japan(p["lon"], p["lat"])]
    print(f"Placemarks: {len(raw)} raw -> {len(unique)} unique -> {len(japan)} in Japan")

    # 2. Generate entries grouped by prefecture
    by_pref = {}  # pref → [(entry, lon, lat)]
    for pm in japan:
        entry = make_entry(pm["name"], pm["lon"], pm["lat"])
        pref = entry["subdivision"]
        by_pref.setdefault(pref, []).append((entry, pm["lon"], pm["lat"]))

    # 3. Write per-prefecture JSON files (preserved entries first)
    os.makedirs(DEST_DIR, exist_ok=True)
    all_prefs = set(by_pref) | set(PRESERVED_IDS)
    for pref in sorted(all_prefs):
        preserved = read_preserved(pref, PRESERVED_IDS.get(pref, set()))
        kml_entries = [e for e, _, _ in by_pref.get(pref, [])]

        # Preserve IDs that exist in preserved list (avoid duplication)
        preserved_ids_set = {e["id"] for e in preserved}
        kml_entries = [e for e in kml_entries if e["id"] not in preserved_ids_set]

        combined = preserved + kml_entries
        if not combined:
            continue

        path = os.path.join(DEST_DIR, f"japan-{pref}.json")
        with open(path, "w", encoding="utf-8") as f:
            json.dump(combined, f, ensure_ascii=False, indent=2)
        print(f"  japan-{pref}.json -> {len(combined)} entries ({len(preserved)} preserved + {len(kml_entries)} KML)")

    # 4. Update coords.js
    update_coords_js(by_pref)

    # 5. Summary
    total = sum(len(v) for v in by_pref.values())
    print(f"\nDone. {total} individual KML entries written across {len(by_pref)} prefectures.")

if __name__ == "__main__":
    main()
