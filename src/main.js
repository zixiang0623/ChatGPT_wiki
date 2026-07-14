const themes = [
  { id: 'pearl', label: 'Pearl', desc: '白磁と淡い影', hue: 210 },
  { id: 'sakura', label: 'Sakura', desc: '桜色の余白', hue: 345 },
  { id: 'forest', label: 'Forest', desc: '緑の集中感', hue: 150 },
  { id: 'aurora', label: 'Aurora', desc: '青紫の奥行き', hue: 260 },
];

const articles = [
  { title: '人工知能', category: 'Technology', minutes: 9, summary: '人工知能は、学習・推論・認識など人間の知的活動を計算機上で実現しようとする研究分野です。', hero: 'AI', sections: [['概要', '人工知能（AI）は、知識表現、探索、機械学習、自然言語処理、ロボティクスなどの領域を横断する技術体系です。近年は大規模なデータと計算資源を活用した深層学習が発展し、文章生成、画像認識、翻訳、推薦など多様な応用が広がっています。'], ['歴史', '1950年代に研究分野として成立して以降、期待と停滞を繰り返しながら発展してきました。エキスパートシステム、統計的機械学習、ニューラルネットワークの再評価を経て、現在は基盤モデルを中心に社会実装が進んでいます。'], ['応用', '医療、教育、製造、金融、行政、創作支援などで利用されます。透明性、説明可能性、プライバシー、バイアス、安全性といった課題への配慮も重要です。']] },
  { title: '富士山', category: 'Geography', minutes: 6, summary: '富士山は日本最高峰の成層火山で、信仰・芸術・観光に深く結びついています。', hero: '富士', sections: [['地理', '山梨県と静岡県にまたがり、標高は3,776メートルです。均整の取れた円錐形の山容は日本の象徴として広く知られています。'], ['文化', '古くから信仰の対象となり、浮世絵や文学にも繰り返し描かれてきました。世界文化遺産として、周辺の湖沼や神社、登山道なども一体的に評価されています。'], ['自然', '標高差に応じた植生の変化、火山地形、湧水など多様な自然環境を持ちます。登山シーズンには安全な計画と装備が求められます。']] },
  { title: 'ルネサンス', category: 'History', minutes: 8, summary: 'ルネサンスは古典文化の再発見を軸に、芸術・科学・思想が大きく展開した時代です。', hero: 'R', sections: [['背景', '中世末期の都市経済の発展、印刷技術、古典文献への関心が重なり、イタリアを中心に新しい知の運動が起こりました。'], ['芸術', '遠近法、人体表現、自然観察が洗練され、レオナルド・ダ・ヴィンチやミケランジェロなど多くの芸術家が活躍しました。'], ['影響', '人文主義、科学的探究、宗教改革などと相互に関係し、近代ヨーロッパの形成に大きな影響を与えました。']] },
];

const icons = { layers: '▰', search: '⌕', palette: '◐', type: 'T', sparkles: '✦', clock: '◷', book: '□', wand: '✧', moon: '☾', compass: '⌖' };
const state = { theme: themes[0], article: articles[0], density: 'comfort', fontScale: 1, focus: false };
const app = document.querySelector('#app');

function render() {
  app.className = `app ${state.theme.id} density-${state.density} ${state.focus ? 'focus' : ''}`;
  app.style.setProperty('--hue', state.theme.hue);
  app.style.setProperty('--font-scale', state.fontScale);
  app.innerHTML = `
    <aside class="sidebar layer-card">
      <div class="brand"><div class="brand-mark">${icons.layers}</div><div><strong>WikiLayer</strong><span>Reader Studio</span></div></div>
      <label class="search"><span>${icons.search}</span><input placeholder="Wikipediaを検索" /></label>
      <nav class="article-list" aria-label="記事一覧">${articles.map(item => `<button data-article="${item.title}" class="${item.title === state.article.title ? 'active' : ''}"><span>${item.category}</span><b>${item.title}</b><i>›</i></button>`).join('')}</nav>
      <section class="control-panel">
        <h2>${icons.palette} テイスト</h2>
        <div class="theme-grid">${themes.map(item => `<button data-theme="${item.id}" class="${state.theme.id === item.id ? 'selected' : ''}"><i style="background:hsl(${item.hue} 86% 72%)"></i><b>${item.label}</b><span>${item.desc}</span></button>`).join('')}</div>
        <h2>${icons.type} 読み心地</h2>
        <div class="segmented">${['compact','comfort','wide'].map((id, i) => `<button data-density="${id}" class="${state.density === id ? 'selected' : ''}">${['密','標準','広'][i]}</button>`).join('')}</div>
        <input type="range" min="0.9" max="1.18" step="0.02" value="${state.fontScale}" aria-label="文字サイズ" data-font />
      </section>
    </aside>
    <section class="reader-shell">
      <header class="topbar layer-card"><div><span class="eyebrow">${icons.sparkles} 崩れないカスタムUI</span><h1>最高のWikipediaリーダー</h1></div><button data-focus>⛶ ${state.focus ? '通常表示' : '集中モード'}</button></header>
      <article class="article-card layer-card">
        <div class="hero-orb"><span>${state.article.hero}</span></div>
        <div class="article-meta"><span>${icons.compass} ${state.article.category}</span><span>${icons.clock} ${state.article.minutes} min read</span><span>${icons.book} Wikipedia style</span></div>
        <h2>${state.article.title}</h2><p class="lead">${state.article.summary}</p>
        <div class="quick-tools"><button>${icons.wand} 要約</button><button>${icons.moon} 夜間プレビュー</button><button>${icons.layers} レイヤー固定</button></div>
        ${state.article.sections.map(([heading, body]) => `<section class="article-section" id="${heading}"><h3>${heading}</h3><p>${body}</p></section>`).join('')}
      </article>
    </section>
    <aside class="toc layer-card"><h2>目次</h2>${state.article.sections.map(([heading], i) => `<a href="#${heading}"><span>${String(i + 1).padStart(2, '0')}</span>${heading}</a>`).join('')}<div class="stat"><b>98%</b><span>可読性スコア</span></div></aside>`;
}

app.addEventListener('click', (event) => {
  const target = event.target.closest('button');
  if (!target) return;
  if (target.dataset.article) state.article = articles.find(item => item.title === target.dataset.article);
  if (target.dataset.theme) state.theme = themes.find(item => item.id === target.dataset.theme);
  if (target.dataset.density) state.density = target.dataset.density;
  if (target.dataset.focus !== undefined) state.focus = !state.focus;
  render();
});

app.addEventListener('input', (event) => {
  if (event.target.matches('[data-font]')) {
    state.fontScale = event.target.value;
    app.style.setProperty('--font-scale', state.fontScale);
  }
});

render();
