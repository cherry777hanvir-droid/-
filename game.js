/* 一纸之间：课堂互动剧情。史实锚点与虚构分支在画面中分别标注。 */
const ASSET = 'assets/';
const STORAGE_KEY = 'shen-anna-story-v2';
const INITIAL = Object.freeze({ pressure: 28, exposure: 18, mission: 38 });
const LIMIT = 100;
const GOAL = 75;

const chapters = [
  {
    date: '1946 年 1 月 · 重庆政治协商会议',
    title: '会场里的熟悉身影',
    eyebrow: '第一章 / 一瞬的克制',
    scene: 'conference_1946.png', after: 'conference_after.png',
    fact: '沈安娜在重庆政治协商会议期间从事速记。公开叙述记载，她见到熟悉的中共代表时克制情绪，继续完成工作。',
    source: '据小组研究文档 [4][5]',
    setup: [
      '会场座位渐满。你将速记本摊开，笔尖停在第一页的边缘。一个熟悉的身影从门口走进来，脚步声短暂地盖过交谈。',
      '你知道自己此刻应当是“会场速记员”。可是那几秒里，想确认彼此平安的冲动，也同样真实。'
    ],
    prompt: '有人朝你这边看了一眼。你怎样度过这几秒？',
    options: {
      a: { title: '借递交记录的动作，极短地致意', caption: '保住情绪的支点，也让动作多一层被误读的可能。', delta: {pressure:-6, exposure:24, mission:8},
        outcome: '那一瞬的回应让你稳住了呼吸。记录继续往下走，但旁边的同事记住了你停顿的片刻。', reflection: '情感不是错误；身处公开岗位时，细小举动也会改变之后的处境。' },
      b: { title: '把注意力留在发言上，继续速记', caption: '尽量维持岗位节奏，却把激动留给自己承受。', delta: {pressure:14, exposure:4, mission:13},
        outcome: '笔下的记录没有断。你几乎没有抬头，直到一页写满，才发现握笔的手比平时更紧。', reflection: '职业表现守住了工作连续性；克制带来的压力也需要被看见。' },
      c: { title: '请同事短暂接替，让自己缓一口气', caption: '照顾眼前状态，但记录的衔接要由别人承担。', delta: {pressure:-10, exposure:8, mission:-4},
        outcome: '你在走廊里把呼吸放慢。回来时，页面已有另一种笔迹，几处转折还需要重新核对。', reflection: '暂时离开可能帮助恢复判断，也会给任务留下需要补齐的空档。' }
    }
  },
  {
    date: '1946 年春 · 一页未定稿',
    title: '送出之前',
    eyebrow: '第二章 / 速度与准确',
    scene: 'chongqing_records_room.png', after: 'dispatch_after.png',
    fact: '公开党史材料记载，沈安娜曾提供国民党军事部署、兵力配备等重要情报。以下“记录疑句”是教学虚构。',
    source: '据小组研究文档 [5][6]',
    setup: [
      '一份刚整理好的记录压在桌角。部署的关键段落已经核清，但有一句涉及调动的速记，主语仍不明。',
      '外面有人催问下一轮整理何时交。等得越久，材料越可能失去时效；交得越急，含混的一句也可能被当成确定消息。'
    ],
    prompt: '你怎样处理这份有时间压力的材料？',
    options: {
      a: { title: '先交已核实段落，疑句原样留白', caption: '守住时效与信息边界，但这次接触较醒目。', delta: {pressure:9, exposure:20, mission:18},
        outcome: '已核实的部分赶上了时点。空白明确提醒接收者：这里还不能下结论。你也察觉到，这次交接比平日更容易被记住。', reflection: '留白不是隐瞒，它让推测与事实保持距离；时效仍有它自己的风险。' },
      b: { title: '再核一次上下文，交完整摘要', caption: '提高完整度，代价是继续承担临近时限的压力。', delta: {pressure:23, exposure:6, mission:22},
        outcome: '摘要更完整，措辞也更稳妥。走出房间时你却发现，自己已经把疲惫压在判断之后很久。', reflection: '谨慎可以减少疑点，却不等于可以无限消耗人的注意力。' },
      c: { title: '要点先交，疑句单列，之后补送出处', caption: '让接收者先判断，但需要两次材料接触。', delta: {pressure:16, exposure:33, mission:27},
        outcome: '第一份要点及时送出，随后补充的出处也保住了证据层次。然而第二次接触，让这条路径更接近风险上限。', reflection: '信息更充分，并不保证过程更安全。' }
    }
  },
  {
    date: '1947 年 · 档案室的灯',
    title: '不只一种声音',
    eyebrow: '第三章 / 复杂的局势',
    scene: 'records_1947.png', after: 'analysis_after.png',
    fact: '相关研究提到，她提供的材料涉及重要会议文件、军事报告以及国民党内部矛盾。下列报告取舍为教学推演。',
    source: '据小组研究文档 [5]',
    setup: [
      '三叠材料摊在灯下：一叠是已核对的会议记录，一叠是对方自己的形势估计，另一叠则与前两者互有抵牾。',
      '你可以让报告更快、更完整或更谨慎，却很难同时做到三者。真正棘手的部分，是怎样让接收者看见材料之间的差别。'
    ],
    prompt: '这一轮，你怎样组织报告？',
    options: {
      a: { title: '保留各类材料的原貌，并逐条注明来源', caption: '信息丰富，但整理与接触时间都会增加。', delta: {pressure:18, exposure:24, mission:22},
        outcome: '报告没有抹平矛盾。接收者能看到哪些是记录，哪些只是对方的估计；你为这份完整性付出了额外的时间。', reflection: '尊重复杂性，有时比给出一个整齐的答案更有价值。' },
      b: { title: '先写可核实的短摘要，另附来源层级', caption: '便于快速研判，也要求你承担更集中的整理工作。', delta: {pressure:22, exposure:12, mission:19},
        outcome: '短摘要先抓住可靠部分，附页交代不同来源的可信边界。这是一份能用的报告，也是一轮高强度判断。', reflection: '摘要必须保留证据边界，否则“清楚”可能只是删掉了疑点。' },
      c: { title: '先按来源强弱归档，暂不写总体判断', caption: '减少贸然推断，但关键结论可能来得太晚。', delta: {pressure:8, exposure:8, mission:8},
        outcome: '档案变得整齐，材料性质也更分明。接收者暂时没有拿到完整的综合判断，只能先依据已有部分行动。', reflection: '不轻率下结论是负责；同样需要考虑信息何时仍有价值。' }
    }
  },
  {
    date: '1949 年春 · 长久工作之后',
    title: '最后一段路',
    eyebrow: '第四章 / 收尾与协作',
    scene: 'corridor_1949.png', after: 'handover_after.png',
    fact: '公开资料概括，沈安娜在国民党中央机关的秘密工作延续至 1949 年。这里不复原某一项具体撤离命令。',
    source: '据小组研究文档 [2]',
    setup: [
      '走廊里的文件少了一摞，又多了一摞。局势正在变化，很多人盼望这一切尽快结束；桌上需要整理的材料却还在。',
      '你无法知道哪一天才真正是“最后一天”。眼前能决定的，是怎样处理仍未完成的工作，并顾及相关人员。'
    ],
    prompt: '你会把最后的精力放在哪里？',
    options: {
      a: { title: '照原有节奏完成材料与工作交接', caption: '保持连续性，但可能把自己推入更高压力。', delta: {pressure:19, exposure:12, mission:17},
        outcome: '材料按既有节奏一项项收拢，衔接没有突然中断。你明白，稳定的外表之下，自己的余力已经不多。', reflection: '完成收尾不只看最后一份材料，也看人能否持续作出可靠判断。' },
      b: { title: '先减少活动，保住人员，再等下一步安排', caption: '让风险和压力回落，但有些工作会延后。', delta: {pressure:-8, exposure:-14, mission:-7},
        outcome: '活动收紧之后，周围人的处境安稳了一些；仍有材料停在桌上，下一步需要重新安排。', reflection: '保护协作条件本身有价值，同时要正视未完成部分。' },
      c: { title: '把待交材料集中在一次处理完', caption: '推进最快，也会形成更醒目的行动。', delta: {pressure:15, exposure:30, mission:25},
        outcome: '一批材料迅速处理完毕。效率有了，动作的集中性也让风险抬头。', reflection: '一次做完看似干脆，未必总能给长期工作留下安全余地。' }
    }
  }
];

function copyState(state) { return { pressure:state.pressure, exposure:state.exposure, mission:state.mission }; }
function applyChoice(index, key, before, priorHistory) {
  const choice = chapters[index].options[key];
  if (!choice) throw new Error('Invalid choice');
  const delta = {...choice.delta};
  const notes = [];
  if (index === 1 && key === 'c' && priorHistory[0] === 'a') {
    delta.exposure += 12;
    notes.push('前一次会场的短暂停顿，让这次多一步接触更容易引起注意：暴露风险额外 +12。');
  }
  if (index === 2 && key === 'b' && priorHistory[1] === 'b') {
    delta.pressure += 12;
    notes.push('连续两轮高强度核查使压力累积：压力额外 +12。');
  }
  if (index === 2 && key === 'a' && priorHistory[1] === 'c') {
    delta.exposure += 10;
    notes.push('上轮已经有两次材料接触，本轮再延长整理过程：暴露风险额外 +10。');
  }
  if (index === 3 && key === 'a' && before.pressure >= 75) {
    delta.pressure += 10;
    notes.push('进入收尾时压力已偏高，继续维持原节奏更吃力：压力额外 +10。');
  }
  if (index === 3 && key === 'c' && before.exposure >= 70) {
    delta.exposure += 10;
    notes.push('此前暴露风险已偏高，集中处理材料更醒目：暴露风险额外 +10。');
  }
  return {
    delta, notes,
    state: {
      pressure: Math.max(0, before.pressure + delta.pressure),
      exposure: Math.max(0, before.exposure + delta.exposure),
      mission: Math.max(0, before.mission + delta.mission)
    }
  };
}

// 逐层重放选择记录。回溯时截断记录，再递归重放剩余选择，避免旧分支数值残留。
function replayPath(path, index = 0, state = copyState(INITIAL)) {
  if (index >= path.length) return state;
  const next = applyChoice(index, path[index], state, path.slice(0, index)).state;
  return replayPath(path, index + 1, next);
}

function readSave() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!value || !Array.isArray(value.history) || value.history.length > chapters.length) return null;
    if (!value.history.every((key, i) => Object.hasOwn(chapters[i].options, key))) return null;
    if (!['cover','choice','result','ending'].includes(value.phase)) return null;
    return value;
  } catch { return null; }
}
const saved = readSave();
let history = saved ? [...saved.history] : [];
let phase = saved ? saved.phase : 'cover';
let soundOn = saved ? saved.soundOn !== false : true;
let audioContext = null;

function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({history,phase,soundOn})); } catch {}
}
function playSound(kind = 'click') {
  if (!soundOn) return;
  try {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return;
    audioContext ||= new Context();
    if (audioContext.state === 'suspended') audioContext.resume();
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = kind === 'fail' ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(kind === 'fail' ? 340 : kind === 'choose' ? 610 : 520, now);
    osc.frequency.exponentialRampToValueAtTime(kind === 'fail' ? 190 : kind === 'choose' ? 420 : 380, now + .09);
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.045, now + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, now + .12);
    osc.connect(gain); gain.connect(audioContext.destination);
    osc.start(now); osc.stop(now + .13);
  } catch { /* 音频不可用时，游戏照常运行。 */ }
}
function getFailure(state) {
  const reasons = [];
  if (state.pressure >= LIMIT) reasons.push('压力达到 100：本轮已难以保持稳定判断。');
  if (state.exposure >= LIMIT) reasons.push('暴露风险达到 100：本轮工作需要中止。');
  return reasons;
}
function getContext(index) {
  if (index === 1) {
    if (history[0] === 'a') return '你仍记得会场里那一瞬的致意。那位同事的目光似乎也停留得比平时久。';
    if (history[0] === 'c') return '短暂离席后留下的记录空档已补过一遍。此刻你更在意材料里哪些地方仍需要核实。';
    return '会场记录保持了连续，但那份压在心里的紧绷感没有立刻散去。';
  }
  if (index === 2) {
    if (history[1] === 'a') return '上一份材料留下的空白提醒你：一份报告可以明确写出自己不知道什么。';
    if (history[1] === 'b') return '上次反复核查换来了更完整的摘要；这次你已经熟悉那种把疑点一一拎出来的疲惫。';
    return '上次分两步处理的材料终于齐了；你也更清楚，每多一次接触，就多一层代价。';
  }
  if (index === 3) {
    if (history[2] === 'a') return '此前完整呈现材料的做法，让协作者能看清分歧；现在更需要把最后的工作衔接好。';
    if (history[2] === 'b') return '短摘要发挥了作用，但集中整理的压力还留在身上。';
    return '材料已按来源归整，仍有一些总体判断等待补上；眼前的局势却不给人太多从容。';
  }
  return '';
}

const $ = id => document.getElementById(id);
function percent(value) { return Math.min(100, Math.max(0, value)); }
function setScene(file, quiet = false) {
  $('scene-image').style.backgroundImage = `url("${ASSET}${file}")`;
  $('protagonist').classList.toggle('quiet', quiet);
}
function updateHud(state) {
  $('hud').hidden = phase === 'cover';
  for (const key of ['pressure','exposure','mission']) {
    $(`${key}-number`).textContent = Math.min(100, state[key]);
    $(`${key}-bar`).style.width = percent(state[key]) + '%';
    const element = document.querySelector(`.meter.${key}`);
    element.classList.toggle('warning', key === 'mission' ? state[key] < GOAL : state[key] >= 75);
  }
}
function renderNav() {
  let current = phase === 'choice' ? history.length : phase === 'result' ? history.length - 1 : phase === 'ending' ? 4 : -1;
  $('chapter-nav').innerHTML = chapters.map((chapter, i) => {
    const disabled = phase === 'cover' || (phase === 'choice' ? i > history.length : i >= history.length);
    return `${i ? '<span class="nav-line" aria-hidden="true"></span>' : ''}<button class="nav-dot ${i === current ? 'current' : ''} ${i < history.length ? 'done' : ''}" type="button" data-rewind="${i}" aria-label="回到第 ${i+1} 章：${chapter.title}" ${disabled ? 'disabled' : ''}>${i+1}</button>`;
  }).join('');
  $('sound-button').setAttribute('aria-pressed', String(soundOn));
  $('sound-button').innerHTML = soundOn ? '♪ <span>音效开</span>' : '♩ <span>音效关</span>';
}
function renderCover() {
  setScene(chapters[0].scene);
  $('story').innerHTML = `
    <span class="overline">INTERACTIVE STORY · 1946—1949</span>
    <h1>一纸之间</h1><p class="date-line">沈安娜 · 隐蔽战线互动剧情</p>
    <p class="story-copy">每一次落笔，都要顾及事实、时效与身边的人。你将经过四个真实年代背景下的教学情境；看似合理的选择，会把压力、暴露风险和任务完成度推向不同方向。</p>
    <p class="story-copy">有些决定的代价当下可见，有些要等到下一次选择才显现。你可以回到走过的节点重新判断。</p>
    <div class="line"></div>
    <p class="story-copy small"><span class="label fact">史实背景</span>沈安娜长期从事地下情报工作，曾在国民党中央机关担任机要速记。游戏中的具体困境、对白、数值和结局均为教学推演。</p>
    <p class="subtle">建议戴耳机体验轻微点击音效；右上角可随时关闭。选择可用数字键 1、2、3。</p>
    <button class="main-button" type="button" data-action="start">开始阅读 <span aria-hidden="true">→</span></button>`;
}
function renderChoice(index) {
  const chapter = chapters[index];
  setScene(chapter.scene);
  const context = getContext(index);
  $('story').innerHTML = `
    <span class="overline">${chapter.eyebrow}</span>
    <h1>${chapter.title}</h1><p class="date-line">${chapter.date}</p>
    ${context ? `<p class="story-copy italic">${context}</p>` : ''}
    ${chapter.setup.map((p, i) => `<p class="story-copy">${i === 0 ? '<span class="label">教学推演</span>' : ''}${p}</p>`).join('')}
    <p class="question">${chapter.prompt}</p>
    <div class="choices">${Object.entries(chapter.options).map(([key, option], i) => `<button class="choice-button" type="button" data-choice="${key}"><span class="choice-key">0${i+1}</span><span class="choice-title">${option.title}</span><span class="choice-caption">${option.caption}</span></button>`).join('')}</div>
    <p class="subtle">后果数值在选择后揭示。没有一个选项保证现实中的结果。</p>`;
}
function formatDelta(label, value, badWhenPositive = true) {
  const sign = value > 0 ? '+' : '';
  const bad = badWhenPositive ? value > 0 : value < 0;
  return `<span class="delta-pill ${bad ? 'bad' : ''}">${label}<em>${sign}${value}</em></span>`;
}
function renderResult(index) {
  const chapter = chapters[index];
  const key = history[index];
  const before = replayPath(history.slice(0, index));
  const applied = applyChoice(index, key, before, history.slice(0, index));
  const failed = getFailure(applied.state);
  const choice = chapter.options[key];
  setScene(chapter.after, true);
  $('story').innerHTML = `
    <span class="overline">${chapter.eyebrow} / 回响</span>
    <h1>${failed.length ? '这一轮需要停下' : '选择之后'}</h1>
    <p class="date-line">${chapter.date} · 选项 ${key.toUpperCase()}</p>
    <div class="result-card ${failed.length ? 'failed' : ''}"><h2>${choice.title}</h2>
      <p>${choice.outcome}</p>
      ${failed.length ? `<p class="warning-copy">${failed.join(' ')}</p>` : '<p>任务仍在继续，但这次的代价会跟着你进入下一章。</p>'}</div>
    <div class="delta-row">${formatDelta('压力', applied.delta.pressure)}${formatDelta('风险', applied.delta.exposure)}${formatDelta('任务', applied.delta.mission, false)}</div>
    ${applied.notes.map(note => `<p class="subtle warning-copy">连锁影响：${note}</p>`).join('')}
    <div class="reflection"><p><span class="label">复盘</span>${choice.reflection}</p>
      <p><span class="label fact">史实对照</span>${chapter.fact} <small>${chapter.source}</small></p>
      <p>上面的即时后果是课堂推演，不代表沈安娜真实经历过这次选择或因此改变历史。</p></div>
    <div class="button-row">${failed.length ? '' : `<button class="main-button" type="button" data-action="continue">${index === chapters.length-1 ? '查看结局' : '进入下一章'} <span aria-hidden="true">→</span></button>`}
      <button class="secondary-button" type="button" data-action="undo">撤回这次选择</button></div>`;
}
function endingType(state) {
  if (state.mission < GOAL) return { title:'尚待完成的工作', lead:'你保住了一些条件，却有部分材料和判断没有在这段教学情境里形成可用结果。', failed:true };
  if (state.pressure >= 80) return { title:'高压下的完成', lead:'任务完成了，但持续的压力几乎耗尽了判断余地。', failed:false };
  if (state.exposure >= 80) return { title:'险线之内', lead:'材料发挥了作用，暴露风险也一路伴随。', failed:false };
  if (state.mission >= 95) return { title:'兼顾整体', lead:'你在时效、信息边界与协作之间找到了一条相对稳妥的路。', failed:false };
  return { title:'有限而真实的完成', lead:'你保住了任务的关键部分，也留下值得复盘的取舍。', failed:false };
}
function renderEnding(state) {
  setScene('dawn_epilogue.png', true);
  const ending = endingType(state);
  $('story').innerHTML = `
    <span class="overline">EPILOGUE / 1949 年春</span>
    <h1>${ending.title}</h1><p class="date-line">四次选择之后 · 教学结局</p>
    <p class="story-copy">${ending.lead}</p>
    <p class="story-copy">故事停在这里，是为了回看判断的过程。数值结局只描述这条虚构路径；真实历史中的沈安娜以长期隐蔽工作作出贡献，不能由玩家的四次选择重新裁决。</p>
    <div class="ending-stats"><span>压力值 <b>${Math.min(100,state.pressure)}</b></span><span>暴露风险值 <b>${Math.min(100,state.exposure)}</b></span><span>任务完成值 <b>${Math.min(100,state.mission)}</b></span></div>
    ${ending.failed ? '<p class="warning-copy">任务完成值低于 75。可以回溯到任一节点，尝试另一种取舍。</p>' : '<p class="subtle">你走完了这条分支；换一种选择，后续文字和数值也会改变。</p>'}
    <div class="line"></div><span class="overline">YOUR PATH / 你的路线</span>
    <ol class="route-list">${history.map((key,i)=>`<li><b>0${i+1}</b>${chapters[i].title}：${chapters[i].options[key].title}</li>`).join('')}</ol>
    <div class="theory"><div class="theory-item"><strong>实事求是</strong>区分已经核实的材料、对方的判断和仍有疑点的句子。</div>
      <div class="theory-item"><strong>组织纪律与协作</strong>长期工作需要连续的岗位表现，也需要顾及身边的人。</div>
      <div class="theory-item"><strong>个人与整体</strong>情报提供参考，历史进程来自更广泛的组织与人民努力。</div></div>
    <p class="reflection"><span class="label fact">史实边界</span>四个情境、所有选项、数值门槛和本页结局均为教学设计；史实锚点据用户提供的《沈安娜毛概互动剧情研究.docx》整理。</p>
    <div class="button-row"><button class="main-button" type="button" data-action="timeline">回溯一个节点 <span aria-hidden="true">↶</span></button><button class="secondary-button" type="button" data-action="restart">重新开始</button></div>`;
}

function render() {
  if (phase === 'result' && history.length === 0) phase = 'choice';
  if (phase === 'choice' && history.length >= chapters.length) phase = 'ending';
  if (phase === 'ending' && history.length < chapters.length) phase = 'choice';
  const state = replayPath(history);
  updateHud(state);
  renderNav();
  if (phase === 'cover') renderCover();
  else if (phase === 'choice') renderChoice(history.length);
  else if (phase === 'result') renderResult(history.length - 1);
  else renderEnding(state);
  persist();
  window.scrollTo({top:0,behavior:'instant'});
}
function selectChoice(key) {
  if (phase !== 'choice' || !Object.hasOwn(chapters[history.length].options, key)) return;
  const before = replayPath(history);
  const after = applyChoice(history.length, key, before, history).state;
  history.push(key); phase = 'result';
  playSound(getFailure(after).length ? 'fail' : 'choose');
  render();
}
function rewindTo(index) {
  if (!Number.isInteger(index) || index < 0 || index > history.length || index >= chapters.length) return;
  if (phase !== 'choice' && index >= history.length) return;
  history = history.slice(0,index); phase = 'choice';
  closeTimeline(); playSound('click'); render();
}
function openTimeline() {
  $('timeline-list').innerHTML = chapters.map((chapter, i) => {
    const done = i < history.length;
    const current = i === history.length && phase === 'choice';
    const disabled = phase === 'cover' || (phase === 'choice' ? i > history.length : i >= history.length);
    return `<button class="timeline-item" type="button" data-rewind="${i}" ${disabled ? 'disabled' : ''}><b>0${i+1}</b>${chapter.title}<span>${done ? '已选：' + chapter.options[history[i]].title + ' · 点击重选' : current ? '正在进行的节点' : '尚未到达'}</span></button>`;
  }).join('');
  $('timeline-modal').hidden = false;
  $('timeline-modal').querySelector('[data-action="close-timeline"]').focus();
}
function closeTimeline() { $('timeline-modal').hidden = true; }

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) {
    if (event.target === $('timeline-modal')) closeTimeline();
    return;
  }
  if (button.dataset.choice) { selectChoice(button.dataset.choice); return; }
  if (button.dataset.rewind !== undefined) { rewindTo(Number(button.dataset.rewind)); return; }
  const action = button.dataset.action;
  if (action === 'sound') { soundOn = !soundOn; if (soundOn) playSound(); renderNav(); persist(); }
  if (action === 'timeline') { playSound(); openTimeline(); }
  if (action === 'close-timeline') closeTimeline();
  if (action === 'start') { playSound(); phase = 'choice'; render(); }
  if (action === 'continue') {
    if (phase !== 'result' || getFailure(replayPath(history)).length) return;
    playSound(); phase = history.length === chapters.length ? 'ending' : 'choice'; render();
  }
  if (action === 'undo') rewindTo(history.length - 1);
  if (action === 'restart') { playSound(); history = []; phase = 'cover'; closeTimeline(); render(); }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !$('timeline-modal').hidden) { closeTimeline(); return; }
  if (!$('timeline-modal').hidden || phase !== 'choice' || /input|textarea/i.test(document.activeElement?.tagName || '')) return;
  const key = {'1':'a','2':'b','3':'c'}[event.key];
  if (key) selectChoice(key);
});

for (const chapter of chapters) {
  for (const file of [chapter.scene, chapter.after]) { const image = new Image(); image.src = ASSET + file; }
}
{ const image = new Image(); image.src = ASSET + 'dawn_epilogue.png'; }
render();
