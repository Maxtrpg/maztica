/* script.js - 終極修復版 v33.0 (彈窗體驗優化) */

/* ========================================================
   [參數調整區] 遊戲設定與資料
   ======================================================== */
const GAME_CONFIG = {
    // 旁白劇本
    narrative_script: [
        { text: "噓……聽見了嗎？那是叢林的呼吸，還是獵手的腳步？", delay: 1.0 },
        { text: "收起你的舊大陸地圖吧，外鄉人，這裡沒有你熟悉的法則。", delay: 3.5 },
        { text: "在這裡，魔法是羽毛編織的光輝，力量是黑曜石劃過的血痕。", delay: 6.0 },
        { text: "諸神並未遠去，祂們貪婪地注視著每一個跳動的托納利（靈魂）。", delay: 8.5 },
        { text: "從庫塔卡的鹽沼，到內克薩爾的廢墟……", delay: 11.0 },
        { text: "北方的伊茲卡拉沙漠，到南方的遠帕伊特叢林……", delay: 13.5 },
        { text: "這是一個死亡與黃金共舞的世界。", delay: 16.0 },
        { text: "在那扇門後，你的故事將被刻在石碑上，或是消逝在風中。", delay: 18.5 },
        { text: "踏入吧，讓我們的契約開始......", delay: 21.0 }
    ],
    
    // 地圖地標
    map_locations: [
        { id: 'nexal', name: '內克薩爾', x: 40, y: 70, side: 'left', img: 'images/loc_nexal.webp', desc: "「內克薩爾......唉，那是帝國曾經的心臟，也是現在最大的傷疤。它就躺在湖心的人工島上，背後那座札塔爾火山還在日夜噴著黑煙，像是在為死去的王朝默哀。那是個用黃金和鮮血堆出來的奇蹟，有著雙子神廟和無數的財寶。但現在？那是蝰手獸們的樂園了。貪婪的人只看見廢墟裡的黃金，卻沒看見陰影裡的利爪。如果你要去，朋友，記得把遺書寫好，因為那裡是名副其實的『死地』。」" },
        { id: 'kultaka', name: '庫塔卡', x: 45, y: 30, side: 'left', img: 'images/loc_kultaka.webp', desc: "「嘿，聽過庫塔卡嗎？別急著點頭，除非你親眼見過那片無盡的鹽白泥沼。在那裡，城市不是建在土地上，而是像黑色的野獸一樣，直接從泛著苦味的水面和蘆葦叢裡長出來的！那是一座用火山岩堆砌的鐵血要塞，牆頭上插滿了銳利的黑曜石，在烈日下閃著讓人膽寒的光。那裡的空氣又濕又熱，吸一口就像吞了口熱沙。在庫塔卡，沒有詩歌，只有紀律；沒有軟弱，只有像狩豹一樣兇猛的戰士。記住，在那裡，你手裡的黑曜石鋸劍，比你的性命更值錢。」" },
        { id: 'payit', name: '帕伊特', x: 85, y: 20, side: 'right', img: 'images/loc_payit.webp', desc: "「往東走，穿過那些會吃人的藤蔓，你會看到帕伊特。那是個被時間遺忘的地方，白色的金字塔就像巨人的牙齒，從綠色的樹海裡戳向天空。那裡和我們這兒不同，空氣裡飄著花香和古老的魔法。你看過尾巴會發光的鳥嗎？在那裡，羽術師們能用一根羽毛編織出光與風。那裡有清得像鏡子一樣的聖井，還有比這世上任何圖書館都古老的學院。但別被那份寧靜騙了，叢林的深處藏著秘密，而有些秘密......最好讓它永遠沉睡。」" },
        { id: 'pezelac', name: '佩澤拉克', x: 60, y: 75, side: 'right', img: 'images/loc_pezelac.webp', desc: "「歡迎來到佩澤拉克，我們現在腳踩的地方！聽聽外面的聲音，那是金幣碰撞的聲音，是獨木舟劃過運河的聲音。這裡是冒險者的家，也是整片大陸最熱鬧的新興城邦。不管你是半身人還是蜥蜴人，只要你手裡有貨、或者有膽，這裡就有你的位置。看到那個掛著『雄鷹與太陽』旗幟的大房子了嗎？那是我們的公會。去喝一杯吧，在那裡簽下一紙契約，也許明天，你就是這些故事裡的主角了！」" }
    ]
};

// 音效庫定義
const SOUND_LIBRARY = {
    'hover_ui': 'audio/sfx_hover_ui.mp3',      
    'click_ui': 'audio/sfx_click_ui.mp3',      
    'stone_slide': 'audio/sfx_stone_slide.mp3',
    'equip': 'audio/sfx_equip.mp3',            
    'parrot': 'audio/sfx_parrot.mp3'           
};

// 鸚鵡在不同場景的台詞庫
const PARROT_QUOTES = {
    'intro': [ "嘎！又有新的英雄響應號召了嗎！", "別盯著火看，小心把眉毛燒了！", "你有帶可可豆嗎？沒有？那你來幹嘛？", "這片夜空下埋葬了多少英雄...嘎！", "你的托納利（靈魂）聞起來很新鮮！", "準備好進入馬茲提卡了嗎？", "那些光球！是充滿智慧的托納利！", "小心！這裡的蚊子比你的拳頭還大！", "我不吃餅乾，我要吃新鮮的蟲子！", "快點按下按鈕，我等得翅膀都酸了！" ],
    'map': [ "內克薩爾現在全是蝰手獸，除非你活膩了！", "庫塔卡的人脾氣很差，跟他們的黑曜石一樣硬！", "去帕伊特記得帶傘，還有解毒劑！呱！", "別走丟了，馬茲提卡大陸是很危險的！", "佩澤拉克是最安全的地方之一......很多形形色色的人呢！", "遠帕伊特的叢林能把你生吞活剝！", "這張地圖是拿冒險者的皮畫的...開玩笑的！嘎！", "想去沙漠？那裡可是矮人的地盤！你也有可能被蠍人給抓了！", "這世界比你想像的大，也比你想像的危險。", "往東走？那裡可是夸爾特當初離開的地方！" ],
    'character': [ "人類？無聊的選擇。嘎！", "選獵人！我要吃烤肉！", "工匠賺得多，但你的手會長繭！", "豹人？嘿，別以為你是貓我就會怕你！", "羽術比較帥，爪術比較痛！", "你的體力怎麼這麼低？多吃點玉米吧！", "命運之輪轉啊轉，這次又是什麼結果？", "蜥蜴人？記得離我遠點，我不想被當午餐！", "哇，這個組合...祝你好運，你會需要的。", "再轉一次！這次一定是大獎（大概吧）！" ],
    'guild': [ "伊托蒂亞今天心情不好，別惹她！", "簽下去！簽下去！那是賣身契...我是說入會申請！", "那個『溺玉之屋』的任務？去年沒有任何人回來。嘎！", "酒保！給這菜鳥一杯奧克特利(龍舌蘭酒)！", "牆上的懸賞單，那是給新手的！", "我只要可可豆，別拿金幣丟我！", "想接任務？撕下前先仔細看看你擅不擅長！", "看到那個『末路客棧』的任務沒？嘎！聽名字就好不吉利！", "歡迎來到佩澤拉克公會，準備好奉獻你的托納利了嗎！", "入會費繳了嗎？沒錢就去洗盤子！", "『懸旗節』？那可是能夠享用許多供品的好日子！" ]
};

/* ========================================================
   初始化與核心邏輯
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initHeroParallax();
    initIntroOrbs();
    initMapSystem();
    initWheelSystem();
    initParrotGuide();
    initAudioSystem(); 
    initAudioUI(); 
    initRitualParticles(); 
    initGuildHall(); 
});

/* --- 0. 輔助函式：音效播放 --- */
function playSound(type) { 
    if (!SOUND_LIBRARY[type]) return;
    const sfx = new Audio(SOUND_LIBRARY[type]);
    const volumeSlider = document.getElementById('volume-slider');
    const globalVolume = volumeSlider ? parseFloat(volumeSlider.value) : 0.5;
    sfx.volume = Math.min(1, globalVolume + 0.2); 
    sfx.play().catch(e => console.log("Audio play prevented:", e));
}

function switchScene(sceneId) {
    if (sceneId === 'system') { sceneId = 'map'; }
    const scenes = document.querySelectorAll('.game-scene');
    scenes.forEach(scene => scene.classList.remove('active'));
    const target = document.getElementById(sceneId);
    if (target) { target.classList.add('active'); }
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if(btn.dataset.target === sceneId) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    
    // [新增] 切換場景時自動關閉地圖彈窗
    hideLocationPopup();
    
    playSound('click_ui'); 
}

function enterWorld(targetId) { 
    const heroSection = document.getElementById('intro');
    const orbs = document.querySelectorAll('.info-orb');
    orbs.forEach(orb => { orb.classList.add('orb-vanish'); });
    playSound('equip'); 
    heroSection.classList.add('hero-zoom-effect');
    const navTabs = document.querySelector('.nav-tabs');
    if(navTabs) navTabs.classList.add('visible');
    setTimeout(() => {
        switchScene(targetId); 
        heroSection.classList.remove('hero-zoom-effect');
    }, 1200);
}

/* --- 1. 旁白與首頁 --- */
function initHeroParallax() {
    const heroSection = document.getElementById('intro'); 
    const layers = document.querySelectorAll('.parallax-layer');
    const narrativeContainer = document.querySelector('.hero-narrative');

    if (narrativeContainer) {
        narrativeContainer.innerHTML = '';
        const baseDelay = 0.5;
        GAME_CONFIG.narrative_script.forEach((line, index) => {
            const p = document.createElement('p');
            p.innerText = line.text;
            p.style.animation = `textFadeIn 1.5s forwards ${baseDelay + line.delay}s`;
            if(index === GAME_CONFIG.narrative_script.length - 1) p.className = "highlight";
            narrativeContainer.appendChild(p);
        });
    }

    heroSection.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
        layers.forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            const xMove = x * speed * 100; const yMove = y * speed * 50;
            layer.style.transform = `translateX(${-xMove}px) translateY(${-yMove}px)`;
        });
    });
}

/* --- 2. 音訊系統 --- */
function initAudioSystem() {
    const bgm = document.getElementById('bgm-audio');
    const slider = document.getElementById('volume-slider');
    if(slider && bgm) bgm.volume = slider.value;
}

/* --- 3. 地圖互動 --- */
function initMapSystem() {
    const hotspotsLayer = document.getElementById('map-hotspots-layer');
    if (hotspotsLayer) {
        const locations = GAME_CONFIG.map_locations;
        locations.forEach(loc => {
            const pin = document.createElement('div'); 
            pin.className = 'map-pin';
            pin.style.left = `${loc.x}%`; 
            pin.style.top = `${loc.y}%`;
            
            pin.addEventListener('click', (e) => { 
                e.stopPropagation(); 
                showLocationPopup(loc); 
                playSound('click_ui'); 
            });
            pin.addEventListener('mouseenter', () => playSound('hover_ui'));
            hotspotsLayer.appendChild(pin);
        });
    }
}

function showLocationPopup(data) {
    const popup = document.getElementById('location-popup'); 
    const img = document.getElementById('loc-img');
    const name = document.getElementById('loc-name'); 
    const desc = document.getElementById('loc-desc');
    const content = document.querySelector('.popup-content');
    
    if (popup && img && name && desc) { 
        // 1. 如果已經開啟且點擊同一個，則關閉 (Toggle效果)
        if (popup.classList.contains('active') && name.innerText === data.name) {
            hideLocationPopup();
            return;
        }

        // 2. 更新內容
        img.src = data.img; 
        name.innerText = data.name; 
        desc.innerText = data.desc; 
        
        // 3. 設定方向
        popup.classList.remove('side-left', 'side-right');
        if (data.side) {
            popup.classList.add(`side-${data.side}`);
        } else {
            popup.classList.add('side-right');
        }

        // 4. [新增] 重置捲軸位置到最上方
        if (content) content.scrollTop = 0;

        // 5. 顯示彈窗 (使用微小延遲觸發 CSS Transition)
        requestAnimationFrame(() => {
            popup.classList.add('active'); 
        });
    }
}

window.hideLocationPopup = function() { 
    document.getElementById('location-popup').classList.remove('active'); 
}

/* --- 4. 鸚鵡導覽 --- */
window.triggerParrot = function() {
    const parrot = document.querySelector('.guide-parrot');
    if (!parrot) return;

    let currentScene = 'intro';
    const scenes = document.querySelectorAll('.game-scene');
    scenes.forEach(scene => {
        if (scene.classList.contains('active')) {
            currentScene = scene.id;
        }
    });

    const quoteList = PARROT_QUOTES[currentScene] || PARROT_QUOTES['intro'];
    const quote = quoteList[Math.floor(Math.random() * quoteList.length)];

    let bubble = document.querySelector('.speech-bubble');
    if (!bubble) {
        bubble = document.createElement('div'); 
        bubble.className = 'speech-bubble'; 
        document.body.appendChild(bubble);
    }
    
    playSound('parrot');

    bubble.style.transition = 'none';
    bubble.style.opacity = '0';
    bubble.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        bubble.innerText = quote; 
        bubble.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        bubble.style.opacity = '1'; 
        bubble.style.transform = 'translateY(0)'; 
    }, 50);

    if (parrot.hideTimer) clearTimeout(parrot.hideTimer);
    parrot.hideTimer = setTimeout(() => { 
        bubble.style.opacity = '0'; 
        bubble.style.transform = 'translateY(20px)'; 
    }, 4000); 
};

function initParrotGuide() {
    const parrot = document.querySelector('.guide-parrot');
    if (parrot) {
        parrot.addEventListener('click', window.triggerParrot);
    }
}

/* --- 5. 公會大廳 (手風琴邏輯) --- */
function initGuildHall() {
    const cards = document.querySelectorAll('.scenario-card');
    
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            cards.forEach(c => {
                if (c !== card) c.classList.remove('active');
            });
            card.classList.toggle('active');
            playSound('stone_slide'); 
        });
        card.addEventListener('mouseenter', () => playSound('hover_ui'));
    });
}

// 輪盤相關代碼 (保持不變)
const racesData = [
    { id: 'human', name: "人類", img: "images/icon_human.webp", abilities: ["適應力強", "文明霸主"], desc: "在馬茲提卡大陸上，人類是最廣泛分布的族裔，佔了總人口的六至七成。他們的特徵並非強壯的身軀或長壽的血統，而是無與倫比的適應力與堅韌。在荒蕪的高原、潮濕的沼澤、叢林深處或沿海城邦，都能找到人類的身影。他們能與野蠻的野獸搏鬥，也能在嚴苛的環境下建立農田與城邦，靠智慧與團結延續文明。" },
    { id: 'halfling', name: "半身人", img: "images/icon_halfling.webp", abilities: ["動如脫兔", "擅長製毒"], desc: "半身人是一支既神秘又難以忽視的族群。傳說他們源於不朽紀元的女神基爾茲，是祂在大地與叢林間留下的孩子。他們個頭嬌小，卻極為靈活，與茂密的叢林環境融為一體，天生擅長隱蔽與迴避，使他們能在巨獸橫行的荒野中安然生存。" },
    { id: 'elf', name: "精靈", img: "images/icon_elf.webp", abilities: ["神秘優雅", "心如止水"], desc: "在馬茲提卡的傳說與神話中，精靈是一支古老而神秘的族裔。他們擁有修長的耳朵與異於常人的膚色：有些如泥土般溫潤，有些粗糙似樹皮，還有些閃耀著金屬光澤。這些特徵使許多人推測，精靈或許是諸神在創造人類前的「試驗之作」，那些不完整卻帶有神性印記的存在。" },
    { id: 'dwarf', name: "矮人", img: "images/icon_dwarf.webp", abilities: ["非凡工藝", "有仇必報"], desc: "在馬茲提卡，矮人並沒有建立龐大的王國，但他們的足跡遍布大陸最嚴酷的沙漠地帶。最初，他們出現在伊茲卡拉沙漠的邊陲，憑藉堅毅與適應力迅速融入炙熱荒原的生活，並逐漸散布至所有沙漠地區。如今，人口最集中的地方是泰茲卡之家沙漠，當地的矮人部落以「酋長」為領袖，而在荒蕪的峭壁群落中，他們的領袖則被尊稱為「峭壁看守者」。" },
    { id: 'eagle', name: "鷹人", img: "images/icon_eagle.webp", abilities: ["銳眼如炬", "天生羽翼"], desc: "在馬茲提卡的險峻高山與絕壁之巔，棲息著一支古老而罕為人知的族裔——鷹人，又被稱為「奎查達恩」。他們擁有覆滿羽毛的身軀、鋒銳的爪與能張展的雙翼，看似與傳說中的阿拉科克拉相似，但卻自稱是更為尊貴的後裔。據說在遠古時代，太陽與風暴之神夸爾特曾降下恩賜，使他們由脆弱的鳥類化為今日強健而威嚴的姿態。" },
    { id: 'lizard', name: "蜥蜴人", img: "images/icon_lizard.webp", abilities: ["沼澤殺手", "嗜血殘暴"], desc: "在馬茲提卡的沼澤與水域地帶，是蜥蜴人的地盤。沼澤嚴苛的環境塑造了蜥蜴人冷酷而堅毅的性格。他們是天生的掠食者，擅長以耐心與潛伏等待獵物，屏息潛水的天賦更讓他們在水下出沒如影。他們通常避開容易受潮損壞的皮革與金屬，轉而選擇骨牙、石片、甚至火山玻璃打造武器與護具，這些裝備雖粗獷卻極為實用。蜥蜴人以部落為單位活動，能在危險的沼澤裡自給自足，鮮少依賴外界。" },
    { id: 'tabaxi', name: "豹人", img: "images/icon_tabaxi.webp", abilities: ["叢林獵人", "弱肉強食"], desc: "在馬茲提卡幽深的叢林裡，豹人是最令人畏懼也最神秘的族裔之一。他們長久以來守護著高聳的樹冠領地，過著以狩獵為榮的生活。豹人身形敏捷、肌肉結實，眼神如同叢林中最銳利的掠食者，行動無聲卻致命。對他們而言，狩獵不僅是生存，更是一門藝術與信仰。" },
    { id: 'frog', name: "蛙人", img: "images/icon_frog.webp", abilities: ["友善溫和", "跳躍高手"], desc: "在馬茲提卡的水域地帶，除了居住著蜥蜴人之外，還有一群神秘的蛙人。關於蛙人的起源眾說紛紜，但學者們普遍認為是薩滿儀式出錯的意外結果。天性善良的蛙人是蜥蜴人食物之一，兩族之間時常有碰撞與衝突。因此許多蛙人部落為求庇護選擇和人類合作，現在在許多城市裡也能見到蛙人的蹤跡。但在蜥蜴人選擇出來和文明社會交流之後，現在兩族的衝突明顯減少，能較和平的共處。" }
];
const classesData = [
    { id: 'artisan', name: "工匠", img: "images/icon_artisan.webp", portrait: "images/icon_artisan.webp", type: "pluma", stats: [60, 80, 40], abilities: ["鍛造物品", "裝備強化"], desc: "工匠是一群將心血與歲月投注於技藝的人。憑藉雙手與知識，將自然界的材料化為堅固的器具、精美的飾品與實用的武器。工匠們懂得如何挑選最堅韌的黑曜石來製作鋒利的刃片，如何運用玉石、羽毛與金屬，打造出兼具美觀與象徵意義的裝飾品。他們的作品不僅是物質上的創造，更承載了部族與城邦的榮耀。在遠古夸爾特與札爾特克的神戰背景下，善與惡的信徒互相攻伐，而在這場激盪中，誕生了兩種非凡的工匠傳承：羽織工匠與獸刻工匠。" },
    { id: 'hunter', name: "獵人", img: "images/icon_hunter.webp", portrait: "images/icon_hunter.webp", type: "hishna", stats: [70, 90, 30], abilities: ["狙擊高手", "陷阱大師"], desc: "在馬茲提卡廣袤的叢林與山谷之間，獵人是自然的探索者與守望者。他們熟悉林木的氣息、動物的習性，以及隱藏於濃密葉影中的危機。獵人不僅是弓矢與陷阱的能手，更是觀察的專家：一片斷裂的枝葉、一行輕微的足跡，對他們來說就是指引方向的路標。" },
    { id: 'warrior', name: "戰士", img: "images/icon_warrior.webp", portrait: "images/icon_warrior.webp", type: "hishna", stats: [95, 40, 30], abilities: ["武器大師", "主力輸出"], desc: "在馬茲提卡大陸，戰士是社會與城邦的支柱。他們不僅是戰場上的鬥士，更是部族榮耀的象徵。自少年起，戰士便接受嚴格訓練，學習如何在叢林與平原上求生，如何揮舞各式各樣的武器。對馬茲提卡人而言，武勇與榮譽往往決定一個人的地位，而戰士正是這份價值的化身。" },
    { id: 'bard', name: "詩人", img: "images/icon_bard.webp", portrait: "images/icon_bard.webp", type: "tonalli", stats: [50, 60, 80], abilities: ["鼓舞人心", "歌功頌神"], desc: "在馬茲提卡的文明中，詩人並非單純的吟遊者，而是知識的守護者與文化的傳承者。他們被稱為「花與歌之人」，透過詩句、音樂與舞蹈來頌揚神祇、記錄歷史、傳遞智慧。詩人的話語與旋律能凝聚族群的信念，使城邦在動盪與榮耀中維繫共同的記憶。" },
    { id: 'pochteca', name: "旅商", img: "images/icon_pochteca.webp", portrait: "images/icon_pochteca.webp", type: "pluma", stats: [40, 70, 95], abilities: ["能言善道", "情報掮客"], desc: "在馬茲提卡廣袤的大地上，旅商不僅是貨物的搬運者，更是聯繫城邦與部族的關鍵人物。他們走遍叢林、山谷與河道，帶來玉石、黑曜石、可可豆、羽毛、香料與珍貴藥材，用以交換各地的特產。旅商讓資源得以流通，也讓偏遠村落得以接觸外界的繁榮。然而，旅商的價值遠不止於貿易。當他們踏上漫長的旅程時，同時也承擔了情報傳遞的責任。這些情報能決定一場戰爭的走向，或讓一座城邦提前準備防禦。" },
    { id: 'knight', name: "騎士", img: "images/icon_knight.webp", portrait: "images/icon_knight.webp", type: "hishna", stats: [90, 30, 60], abilities: ["隊伍堅盾", "榮耀化身"], desc: "在馬茲提卡的城邦與部族社會中，騎士象徵著最高的榮耀與最沉重的責任。他們不僅是訓練有素的精銳戰士，更是信仰與軍事的代表。成為騎士意味著經歷無數戰役、累積戰功，並獲得城邦與神祇的認可。騎士肩負守護族群、維護秩序的使命，他們的存在不僅是武力的展現，更是榮耀與信仰的化身。在馬茲提卡，主要有兩個騎士團：鷹騎士團 和 豹騎士團" },
    { id: 'rogue', name: "盜賊", img: "images/icon_rogue.webp", portrait: "images/icon_rogue.webp", type: "hishna", stats: [80, 70, 40], abilities: ["潛行偷襲", "迅捷巧手"], desc: "盜賊是行走於陰影與光明之間的人物。他們不如戰士般光榮，也不像詩人般受人讚頌，卻是城邦與荒野中不可或缺的角色。盜賊擅長鑽研陷阱、開鎖與潛行，他們的眼睛總能比別人更快找到隱藏的財寶與秘密。對許多人來說，盜賊雖帶著不光彩的名聲，但在探索古老遺跡、解決危險任務時，他們卻往往是最可靠的同伴。" },
    { id: 'shaman', name: "薩滿", img: "images/icon_shaman.webp", portrait: "images/icon_shaman.webp", type: "tonalli", stats: [60, 50, 40], abilities: ["魔法掌握", "神靈使者"], desc: "在馬茲提卡，大地與諸神的力量並未隨著神祇隱沒而完全消失。薩滿是最接近這股神秘力量的人，他們能觸碰凡人無法理解的能量，並以詩歌、祈禱、舞蹈或獻祭的方式引導魔法流動。薩滿的角色不僅是施術者，更是靈性導師、祭儀主持者與未知奧秘的研究者。

而現今的六大魔法流派，本質上代表了過去眾神之戰的歷史。在這個眾神退去、神聖閥門破碎的第六紀元，舊有的秩序正在崩塌。你必須選擇一條「靈性之道」作為你的力量之源：是延續古老的守護誓言，擁抱以血換血的霸權，還是駕馭新生的野性洪流？" },
    { id: 'farmer', name: "農民", img: "images/icon_farmer.webp", portrait: "images/icon_farmer.webp", type: "elemental", stats: [30, 90, 60], abilities: ["種植烹飪", "生活大師"], desc: "在馬茲提卡這塊大陸，農民並非單純耕作之人，而是最貼近大自然循環的守護者。他們掌握古老的浮田技術，能在湖泊與水道中建造人工小島，種植農作物，同時利用水域的魚群與水草來滋養土壤。農民懂得如何從水域捕撈魚類，如何利用淤泥與水草肥沃土地，也知道哪些植物能作為食物，哪些則是祭品或藥材。他們在日常看似平凡，卻是社會中不可或缺的一環。沒有農民的智慧與辛勤，沒有任何城邦能長久屹立。" },
    { id: 'scholar', name: "學者", img: "images/icon_scholar.webp", portrait: "images/icon_scholar.webp", type: "elemental", stats: [30, 70, 65], abilities: ["隊伍智囊", "律法大師"], desc: "在馬茲提卡的城邦裡，學者代表著知識的傳承與探索。這片大地上的人類社會極為重視教育：兒童在十五歲之前由家長教育，學習基礎的倫理、勞作與信仰，並受公社監督。十五歲後，他們進入城邦學校，接受五年的進階教育。隨著不同族裔與人類的交流加深，學校裡也能看到半身人、矮人，甚至其他族群的學生，共同參與知識的學習。" }
];

let outerAngle = 0; let innerAngle = 0;
let currentClass = classesData[0]; let currentRace = racesData[0];

function initWheelSystem() {
    const outerRing = document.getElementById('calling-ring');
    const innerRing = document.getElementById('lineage-ring');
    if (!outerRing || !innerRing) return;
    createRingItems(outerRing, classesData, 250, 'outer', (index) => { rotateToItem('outer', index, classesData.length); updateCore(classesData[index], null); });
    createRingItems(innerRing, racesData, 150, 'inner', (index) => { rotateToItem('inner', index, racesData.length); updateCore(null, racesData[index]); });
    updateCore(classesData[0], racesData[0]);
    updateActiveItem('calling-ring', 0);
    updateActiveItem('lineage-ring', 0);
}
function createRingItems(ring, data, r, type, cb) {
    const step = 360 / data.length;
    data.forEach((item, i) => {
        const el = document.createElement('div'); el.className = 'wheel-item';
        if (item.type) el.classList.add(`magic-${item.type}`);
        el.innerHTML = `<img src="${item.img}" alt="${item.name}">`;
        const a = i * step - 90;
        el.style.transform = `rotate(${a}deg) translate(${r}px) rotate(${-a}deg)`;
        el.onclick = () => cb(i);
        el.addEventListener('mouseenter', () => playSound('hover_ui'));
        ring.appendChild(el);
    });
}
function rotateToItem(type, index, total) {
    const step = 360 / total; const target = -(index * step);
    let current = (type === 'outer') ? outerAngle : innerAngle;
    let delta = target - (current % 360);
    if (delta > 180) delta -= 360; else if (delta < -180) delta += 360;
    const final = current + delta;
    if (type === 'outer') { outerAngle = final; document.getElementById('calling-ring').style.transform = `rotate(${outerAngle}deg)`; updateItemRotation(document.getElementById('calling-ring'), outerAngle, 250); updateActiveItem('calling-ring', index); }
    else { innerAngle = final; document.getElementById('lineage-ring').style.transform = `rotate(${innerAngle}deg)`; updateItemRotation(document.getElementById('lineage-ring'), innerAngle, 150); updateActiveItem('lineage-ring', index); }
    
    playSound('stone_slide'); 
}
function updateItemRotation(ring, rot, r) {
    const items = ring.querySelectorAll('.wheel-item'); const step = 360 / items.length;
    items.forEach((item, i) => { const a = i * step - 90; item.style.transform = `rotate(${a}deg) translate(${r}px) rotate(${-a - rot}deg)`; });
}
function updateActiveItem(id, idx) {
    document.querySelectorAll(`#${id} .wheel-item`).forEach((item, i) => item.classList.toggle('active', i === idx));
}
function updateCore(cls, race) {
    if (cls) currentClass = cls; if (race) currentRace = race;
    const mainPortrait = document.getElementById('main-portrait');
    if(mainPortrait) {
        mainPortrait.classList.add('loading'); 
        const tempImg = new Image();
        tempImg.onload = () => { mainPortrait.src = tempImg.src; mainPortrait.classList.remove('loading'); };
        tempImg.src = `images/portrait_${currentRace.id}_${currentClass.id}.webp`;
    }
    document.getElementById('race-name').innerText = currentRace.name;
    document.getElementById('race-desc').innerText = currentRace.desc;
    document.getElementById('race-tags').innerHTML = currentRace.abilities.map(a=>`<span class="tag">${a}</span>`).join('');
    document.getElementById('class-name').innerText = currentClass.name;
    document.getElementById('class-desc').innerText = currentClass.desc;
    document.getElementById('class-tags').innerHTML = currentClass.abilities.map(a=>`<span class="tag">${a}</span>`).join('');
    // 更新迷你數值條
    document.getElementById('stat-cbt').style.width = currentClass.stats[0] + "%";
    document.getElementById('stat-exp').style.width = currentClass.stats[1] + "%";
    document.getElementById('stat-soc').style.width = currentClass.stats[2] + "%";
    
    const rim = document.querySelector('.wheel-core-display');
    if (rim) {
        rim.classList.remove('magic-pluma', 'magic-hishna', 'magic-tonalli', 'magic-elemental');
        if (currentClass.type) rim.classList.add(`magic-${currentClass.type}`);
    }
}

// 物理光球
let orbPhysicsEngine = []; 
function initIntroOrbs() {
    const leftZone = document.getElementById('left-orbs-zone');
    const rightZone = document.getElementById('right-orbs-zone');
    if (!leftZone || !rightZone) return;
    orbPhysicsEngine = []; 
    const orbData = [
    { content: "體驗龍與魔的魅力與特色，並享受中美洲阿茲特克文化氛圍。", group: 'left', id: 1 },
    { content: "職業範型不代表生涯方向，只是你的冒險起始包；在冒險過程中可以自由培養你的角色。", group: 'left', id: 3 },
    { content: "冒險者的生活充滿未知與危險，日常的生存也是種考驗，旅行的過程不容馬虎。", group: 'left', id: 5 },
    { content: "和玩家共構整個世界。你們的行動和選擇不僅關乎當下，甚至如蝴蝶效應般影響未來。", group: 'left', id: 7 },
    { content: "起始有八種族裔，十種職業範型可供選擇。", group: 'right', id: 2 },
    { content: "沒有等級概念，每次團務結束進行技能成長；隨著參與的團務愈多，你的角色就會愈強。", group: 'right', id: 4 },
    { content: "戰鬥刺激且瞬息萬變，每個行動關乎你的生死。", group: 'right', id: 6 },
    { content: "體驗冒險者公會，接取任務，招募隊友，提升威望與財富。", group: 'right', id: 8 }
    ];
    orbData.forEach((data) => {
        const orbContainer = document.createElement('div');
        orbContainer.className = 'info-orb';
        const orbVisual = document.createElement('div');
        orbVisual.className = 'orb-visual';
        orbContainer.appendChild(orbVisual);
        const container = (data.group === 'left') ? leftZone : rightZone;
        container.appendChild(orbContainer);
        const bounds = container.getBoundingClientRect();
        const orbObj = {
            element: orbContainer, container: container,
            x: Math.random() * (bounds.width - 120), y: Math.random() * (bounds.height - 120),
            vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8,
            isHovered: false
        };
        orbVisual.style.animationDelay = `${Math.random() * -3}s`;
        orbPhysicsEngine.push(orbObj);
        
        orbContainer.addEventListener('mouseenter', (e) => {
            orbObj.isHovered = true; updateOrbTooltip(e, data.content);
            const cursor = document.getElementById('custom-cursor'); if(cursor) cursor.classList.add('hover');
            playSound('hover_ui');
        });
        orbContainer.addEventListener('mouseleave', () => {
            orbObj.isHovered = false; document.getElementById('orb-tooltip-popup').classList.remove('active');
            const cursor = document.getElementById('custom-cursor'); if(cursor) cursor.classList.remove('hover');
        });
    });
    requestAnimationFrame(updateOrbPhysics);
    document.addEventListener('mousemove', (e) => { updateTooltipPosition(e); });
}
function updateOrbPhysics() {
    orbPhysicsEngine.forEach((orbA) => {
        if (orbA.isHovered || orbA.element.classList.contains('orb-vanish')) return;
        orbA.x += orbA.vx; orbA.y += orbA.vy;
        const parentW = orbA.container.offsetWidth; const parentH = orbA.container.offsetHeight; const orbSize = 120;
        if (orbA.x <= 0) { orbA.x = 0; orbA.vx *= -1; }
        if (orbA.x >= parentW - orbSize) { orbA.x = parentW - orbSize; orbA.vx *= -1; }
        if (orbA.y <= 0) { orbA.y = 0; orbA.vy *= -1; }
        if (orbA.y >= parentH - orbSize) { orbA.y = parentH - orbSize; orbA.vy *= -1; }
        orbA.element.style.transform = `translate3d(${orbA.x}px, ${orbA.y}px, 0)`;
    });
    requestAnimationFrame(updateOrbPhysics);
}
function updateOrbTooltip(e, content) {
    const popup = document.getElementById('orb-tooltip-popup');
    popup.innerHTML = `<strong>可以玩到什麼</strong>${content}`;
    popup.classList.add('active'); updateTooltipPosition(e);
}
function updateTooltipPosition(e) {
    let popup = document.getElementById('orb-tooltip-popup');
    if (popup && popup.classList.contains('active')) {
        const offsetX = 20; const offsetY = 20;
        let left = e.clientX + offsetX; let top = e.clientY + offsetY;
        if (left + popup.offsetWidth > window.innerWidth) { left = e.clientX - popup.offsetWidth - offsetX; }
        if (top + popup.offsetHeight > window.innerHeight) { top = e.clientY - popup.offsetHeight - offsetY; }
        popup.style.left = `${left}px`; popup.style.top = `${top}px`;
    }
}
function initRitualParticles() {
    const container = document.querySelector('.particles');
    if(!container) return;
    for(let i=0; i<30; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember';
        const size = Math.random() * 4 + 2 + 'px';
        ember.style.width = size; ember.style.height = size;
        ember.style.left = Math.random() * 100 + '%';
        ember.style.setProperty('--drift-x', (Math.random() * 200 - 100) + 'px');
        ember.style.animationDuration = Math.random() * 10 + 5 + 's';
        ember.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(ember);
    }
}
function initAudioUI() {
    const bgm = document.getElementById('bgm-audio');
    const playBtn = document.getElementById('play-pause-btn');
    const slider = document.getElementById('volume-slider');
    const iconPlay = document.getElementById('icon-play');
    const iconPause = document.getElementById('icon-pause');
    const muteBtn = document.getElementById('mute-btn');
    const iconVolHigh = document.getElementById('icon-vol-high');
    const iconVolMute = document.getElementById('icon-vol-mute');

    playBtn.addEventListener('click', () => {
        if (bgm.paused) { 
            bgm.play(); 
            iconPlay.classList.add('hidden'); iconPause.classList.remove('hidden'); 
        } else { 
            bgm.pause(); 
            iconPlay.classList.remove('hidden'); iconPause.classList.add('hidden'); 
        }
        playSound('click_ui');
    });
    
    slider.addEventListener('input', (e) => { 
        bgm.volume = parseFloat(e.target.value); 
        if(bgm.volume > 0) { iconVolHigh.classList.remove('hidden'); iconVolMute.classList.add('hidden'); }
        else { iconVolHigh.classList.add('hidden'); iconVolMute.classList.remove('hidden'); }
    });
    
    let lastVol = 0.4;
    muteBtn.addEventListener('click', () => {
        if (bgm.volume > 0) {
            lastVol = bgm.volume; bgm.volume = 0; slider.value = 0;
            iconVolHigh.classList.add('hidden'); iconVolMute.classList.remove('hidden');
        } else {
            bgm.volume = lastVol; slider.value = lastVol;
            iconVolHigh.classList.remove('hidden'); iconVolMute.classList.add('hidden');
        }
        playSound('click_ui');
    });
}
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; });
    document.addEventListener('mousedown', (e) => {
        const ripple = document.createElement('div'); ripple.className = 'cursor-ripple';
        ripple.style.left = e.clientX + 'px'; ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    document.addEventListener('mouseup', () => { cursor.style.transform = 'translate(-50%, -50%) scale(1)'; });
    const interactables = document.querySelectorAll('a, button, input, .map-pin, .wheel-item, .info-orb, .guild-sign, .guide-parrot, .tab-btn, .icon-btn, .scenario-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

}
