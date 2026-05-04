const KEY          = 'preflight-checklist-v1';
const LIST_KEY     = 'preflight-list-v1';
const TUTORIAL_KEY = 'preflight-tutorial-seen';
const LANG_KEY     = 'preflight-lang';
const CUSTOM_SECTION_ID = 'custom';
const EMOJI_PICKS = ['🧳', '👕', '🧼', '📷', '🎧', '💊', '🕶️', '📚', '🔋', '🧸', '🪒', '🍫'];

let lang = (() => { try { return localStorage.getItem(LANG_KEY) || (navigator.language.startsWith('tr') ? 'tr' : 'en'); } catch (_) { return 'en'; } })();

const STRINGS = {
  en: {
    subtitle:     'pre-flight checklist',
    counter:      (n, t) => `${n} of ${t} checked`,
    empty:        'No items',
    ready:        'Ready to fly! ✈️',
    addTitle:     'Add item',
    addSubtitle:  'Pick a name and emoji',
    addFormTitle: 'New checklist item',
    addBtn:       'Add',
    nameLabel:    'Name',
    namePlaceholder: 'Sunglasses',
    emojiLabel:   'Emoji',
    removeItem:   'Remove item',
    clearBtn:     'Clear',
    clearConfirm: 'Clear all checked and skipped items?',
    resetBtn:     'Reset',
    resetConfirm: 'Reset the checklist to the default items?',
    customTitle:  'Your Items',
    tutorialTitle:'How it works',
    action1: 'Tap once',        result1: 'Mark as packed ✓',
    action2: 'Tap again',       result2: 'Not taking ✕',
    action3: 'Tap once more',   result3: 'Reset to default',
    action4: 'Tap +',           result4: 'Add your own item',
    dismiss: 'Got it',
  },
  tr: {
    subtitle:     'uçuş öncesi kontrol',
    counter:      (n, t) => `${t} öğeden ${n} işaretlendi`,
    empty:        'Öğe yok',
    ready:        'Uçuşa hazır! ✈️',
    addTitle:     'Öğe ekle',
    addSubtitle:  'Bir ad ve emoji seç',
    addFormTitle: 'Yeni kontrol öğesi',
    addBtn:       'Ekle',
    nameLabel:    'Ad',
    namePlaceholder: 'Güneş gözlüğü',
    emojiLabel:   'Emoji',
    removeItem:   'Öğeyi sil',
    clearBtn:     'Temizle',
    clearConfirm: 'Tüm işaretli ve atlanan öğeler temizlensin mi?',
    resetBtn:     'Sıfırla',
    resetConfirm: 'Listeyi varsayılan öğelere döndürmek istiyor musun?',
    customTitle:  'Senin Öğelerin',
    tutorialTitle:'Nasıl çalışır',
    action1: 'Bir kez dokun',       result1: 'Hazır olarak işaretle ✓',
    action2: 'Tekrar dokun',        result2: 'Almıyorum ✕',
    action3: 'Bir kez daha dokun',  result3: 'Varsayılana sıfırla',
    action4: '+ düğmesine dokun',   result4: 'Kendi öğeni ekle',
    dismiss: 'Anladım',
  },
};

const DEFAULT_LIST = [
  {
    id: 'documents',
    title: { en: 'Travel Documents',       tr: 'Seyahat Belgeleri' },
    items: [
      { id: 'passport',           emoji: '🛂', label: { en: 'Passport',          tr: 'Pasaport' } },
      { id: 'visa',               emoji: '📋', label: { en: 'Visa / Permit',      tr: 'Vize / İzin' } },
      { id: 'boarding_pass',      emoji: '🎫', label: { en: 'Boarding Pass',      tr: 'Biniş Kartı' } },
      { id: 'national_id',        emoji: '🪪', label: { en: 'National ID',        tr: 'Kimlik' } },
      { id: 'travel_insurance',   emoji: '🏥', label: { en: 'Travel Insurance',   tr: 'Seyahat Sigortası' } },
      { id: 'hotel_confirm',      emoji: '🏨', label: { en: 'Hotel Confirm',      tr: 'Otel Onayı' } },
      { id: 'emergency_contacts', emoji: '📞', label: { en: 'Emergency Contacts', tr: 'Acil Kişiler' } },
    ],
  },
  {
    id: 'money',
    title: { en: 'Money & Payment', tr: 'Para & Ödeme' },
    items: [
      { id: 'primary_card',   emoji: '💼', label: { en: 'Wallet', tr: 'Cüzdan' } },
      { id: 'local_currency', emoji: '💰', label: { en: 'Cash',   tr: 'Nakit' } },
    ],
  },
  {
    id: 'electronics',
    title: { en: 'Electronics & Chargers', tr: 'Elektronik & Şarj Aletleri' },
    items: [
      { id: 'phone_charged',  emoji: '📱', label: { en: 'Phone',         tr: 'Telefon' } },
      { id: 'laptop',         emoji: '💻', label: { en: 'Laptop',        tr: 'Laptop' } },
      { id: 'phone_charger',  emoji: '⚡', label: { en: 'Phone Charger', tr: 'Telefon Şarjı' } },
      { id: 'laptop_charger', emoji: '🔌', label: { en: 'Laptop Charger',tr: 'Laptop Şarjı' } },
      { id: 'power_bank',     emoji: '🔋', label: { en: 'Power Bank',    tr: 'Powerbank' } },
      { id: 'headphones',     emoji: '🎧', label: { en: 'Headphones',    tr: 'Kulaklık' } },
      { id: 'travel_adapter', emoji: '🔌', label: { en: 'Plug Adapter',  tr: 'Adaptör' } },
      { id: 'tablet',         emoji: '📖', label: { en: 'Tablet',        tr: 'Tablet' } },
      { id: 'camera',         emoji: '📷', label: { en: 'Camera',        tr: 'Fotoğraf Makinesi' } },
    ],
  },
  {
    id: 'health',
    title: { en: 'Health & Toiletries', tr: 'Sağlık & Bakım' },
    items: [
      { id: 'medications',    emoji: '💊', label: { en: 'Medications',    tr: 'İlaçlar' } },
      { id: 'cosmetics',      emoji: '🧴', label: { en: 'Cosmetics',      tr: 'Kozmetik' } },
      { id: 'toothbrush',     emoji: '🪥', label: { en: 'Toothbrush',     tr: 'Diş Fırçası' } },
      { id: 'toothpaste',     emoji: '🦷', label: { en: 'Toothpaste',     tr: 'Diş Macunu' } },
      { id: 'deodorant',      emoji: '🌿', label: { en: 'Deodorant',      tr: 'Deodorant' } },
      { id: 'perfume',        emoji: '💨', label: { en: 'Perfume',        tr: 'Parfüm' } },
      { id: 'sunscreen',      emoji: '☀️',  label: { en: 'Sunscreen',     tr: 'Güneş Kremi' } },
      { id: 'contacts',       emoji: '👁️',  label: { en: 'Contacts',      tr: 'Lens' } },
      { id: 'glasses',        emoji: '👓', label: { en: 'Glasses',        tr: 'Gözlük' } },
      { id: 'hand_sanitizer', emoji: '🧼', label: { en: 'Hand Sanitizer', tr: 'El Dezenfektanı' } },
    ],
  },
  {
    id: 'clothing',
    title: { en: 'Clothing', tr: 'Kıyafet' },
    items: [
      { id: 'main_clothes', emoji: '👕', label: { en: 'Clothes',     tr: 'Kıyafet' } },
      { id: 'socks',        emoji: '🧦', label: { en: 'Socks',       tr: 'Çorap' } },
      { id: 'slippers',     emoji: '🩴', label: { en: 'Slippers',    tr: 'Terlik' } },
      { id: 'underwear',    emoji: '🩲', label: { en: 'Underwear',   tr: 'İç Çamaşırı' } },
      { id: 'swimwear',     emoji: '👙', label: { en: 'Swimwear',    tr: 'Mayo / Bikini' } },
      { id: 'sunglasses',   emoji: '🕶️', label: { en: 'Sunglasses', tr: 'Güneş Gözlüğü' } },
      { id: 'hat',          emoji: '👒', label: { en: 'Hat',         tr: 'Şapka' } },
    ],
  },
  {
    id: 'miscellaneous',
    title: { en: 'Miscellaneous', tr: 'Çeşitli' },
    items: [
      { id: 'books',        emoji: '📚', label: { en: 'Books',        tr: 'Kitaplar' } },
      { id: 'water_bottle', emoji: '💧', label: { en: 'Water Bottle', tr: 'Su Şişesi' } },
      { id: 'neck_pillow',  emoji: '☁️', label: { en: 'Neck Pillow',  tr: 'Boyun Yastığı' } },
    ],
  },
];

const CYCLE     = { default: 'checked', checked: 'skipped', skipped: 'default' };
const DOT_LABEL = { checked: '✓', skipped: '✕' };

function cloneList(list) {
  return JSON.parse(JSON.stringify(list));
}

function isValidSection(section) {
  return section && typeof section.id === 'string' && section.title && Array.isArray(section.items);
}

function loadList() {
  try {
    const raw = JSON.parse(localStorage.getItem(LIST_KEY));
    if (!Array.isArray(raw) || !raw.every(isValidSection)) return cloneList(DEFAULT_LIST);
    return raw;
  } catch (_) {
    return cloneList(DEFAULT_LIST);
  }
}

function saveList(list) {
  try { localStorage.setItem(LIST_KEY, JSON.stringify(list)); } catch (_) {}
}

function totalItems() {
  return LIST.reduce((n, s) => n + s.items.length, 0);
}

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY)) || {};
    const out = {};
    for (const [k, v] of Object.entries(raw)) {
      if (v === 'checked' || v === 'skipped') out[k] = v;
      else if (v === true) out[k] = 'checked';
    }
    return out;
  } catch (_) { return {}; }
}

function saveState(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (_) {}
}

let state = loadState();
let LIST = loadList();

function refreshHeader() {
  const n = LIST.reduce(
    (acc, s) => acc + s.items.filter(i => state[i.id] === 'checked' || state[i.id] === 'skipped').length,
    0
  );
  const total = totalItems();
  const s = STRINGS[lang];
  const counter = document.getElementById('counter');
  const done = total > 0 && n === total;
  counter.textContent = total === 0 ? s.empty : done ? s.ready : s.counter(n, total);
  counter.classList.toggle('ready', done);
  document.getElementById('progress').style.width = total ? `${(n / total) * 100}%` : '0%';
}

function refreshBadge(sectionId, items) {
  const el = document.getElementById('badge-' + sectionId);
  if (!el) return;
  const checked = items.filter(i => state[i.id] === 'checked').length;
  const skipped = items.filter(i => state[i.id] === 'skipped').length;
  const done = checked + skipped === items.length;
  el.textContent = `${checked + skipped}/${items.length}`;
  el.className = 'badge' + (done ? ' done' : '');
}

function applyState(card, dot, itemId) {
  const s = state[itemId] || 'default';
  card.dataset.state = s === 'default' ? '' : s;
  dot.textContent = DOT_LABEL[s] || '';
  card.setAttribute('aria-label', `${card.dataset.label} — ${s}`);
}

function build() {
  const root = document.getElementById('sections');
  root.innerHTML = '';

  LIST.forEach(section => {
    const checked = section.items.filter(i => state[i.id] === 'checked').length;
    const skipped = section.items.filter(i => state[i.id] === 'skipped').length;
    const done    = checked + skipped === section.items.length;

    const det = document.createElement('details');
    det.className = 'section';
    det.open = true;

    det.innerHTML = `
      <summary>
        <span class="summary-inner">
          <svg class="chevron" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 2.5l4.5 4.5L5 11.5" stroke="currentColor" stroke-width="1.75"
              stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${section.title[lang] || section.title.en}
        </span>
        <span class="badge${done ? ' done' : ''}" id="badge-${section.id}">${checked + skipped}/${section.items.length}</span>
      </summary>
      <div class="items" id="items-${section.id}"></div>
    `;

    const itemsEl = det.querySelector('.items');

    section.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'item';
      card.tabIndex = 0;
      card.role = 'button';
      card.dataset.label = item.label[lang];

      const emoji = document.createElement('span');
      emoji.className = 'item-emoji';
      emoji.setAttribute('aria-hidden', 'true');
      emoji.textContent = item.emoji;

      const txt = document.createElement('span');
      txt.className = 'item-label';
      txt.textContent = item.label[lang];

      const dot = document.createElement('span');
      dot.className = 'item-dot';

      card.append(emoji, txt, dot);

      if (item.custom) {
        const remove = document.createElement('button');
        remove.className = 'remove-item';
        remove.type = 'button';
        remove.textContent = '×';
        remove.setAttribute('aria-label', STRINGS[lang].removeItem);
        remove.addEventListener('click', e => {
          e.stopPropagation();
          removeItem(section.id, item.id);
        });
        card.appendChild(remove);
      }

      applyState(card, dot, item.id);

      function advance() {
        const cur  = state[item.id] || 'default';
        const next = CYCLE[cur];
        if (next === 'default') delete state[item.id];
        else state[item.id] = next;
        applyState(card, dot, item.id);
        saveState(state);
        refreshHeader();
        refreshBadge(section.id, section.items);
      }

      card.addEventListener('click', advance);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); advance(); }
      });

      itemsEl.appendChild(card);
    });

    root.appendChild(det);
  });

  refreshHeader();
}

function firstEmoji(value) {
  const trimmed = value.trim();
  if (!trimmed) return EMOJI_PICKS[0];
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    const first = segmenter.segment(trimmed)[Symbol.iterator]().next().value;
    if (first && first.segment) return first.segment;
  }
  return Array.from(trimmed)[0] || EMOJI_PICKS[0];
}

function customSection() {
  let section = LIST.find(s => s.id === CUSTOM_SECTION_ID);
  if (!section) {
    section = {
      id: CUSTOM_SECTION_ID,
      title: { en: STRINGS.en.customTitle, tr: STRINGS.tr.customTitle },
      items: [],
    };
    LIST.push(section);
  }
  return section;
}

function addItem() {
  const nameEl = document.getElementById('item-name');
  const emojiEl = document.getElementById('item-emoji');
  const name = nameEl.value.trim().replace(/\s+/g, ' ');
  if (!name) {
    nameEl.focus();
    return;
  }

  const item = {
    id: `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    emoji: firstEmoji(emojiEl.value),
    label: { en: name, tr: name },
    custom: true,
  };

  customSection().items.push(item);
  saveList(LIST);
  nameEl.value = '';
  emojiEl.value = item.emoji;
  hideAddSheet();
  build();
}

function removeItem(sectionId, itemId) {
  const section = LIST.find(s => s.id === sectionId);
  if (!section) return;
  section.items = section.items.filter(item => item.id !== itemId);
  if (section.id === CUSTOM_SECTION_ID && section.items.length === 0) {
    LIST = LIST.filter(s => s.id !== CUSTOM_SECTION_ID);
  }
  delete state[itemId];
  saveState(state);
  saveList(LIST);
  build();
}

function buildEmojiPicks() {
  const root = document.getElementById('emoji-picks');
  const input = document.getElementById('item-emoji');
  root.innerHTML = '';
  EMOJI_PICKS.forEach(emoji => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'emoji-pick';
    btn.textContent = emoji;
    btn.setAttribute('aria-label', emoji);
    btn.addEventListener('click', () => {
      input.value = emoji;
      document.querySelectorAll('.emoji-pick').forEach(el => el.classList.toggle('active', el === btn));
    });
    root.appendChild(btn);
  });
  input.value = EMOJI_PICKS[0];
  root.firstElementChild.classList.add('active');
}

// ── Language ──
function setLang(newLang) {
  lang = newLang;
  try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}
  document.documentElement.lang = lang;

  const s = STRINGS[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (typeof s[key] === 'string') el.textContent = s[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (typeof s[key] === 'string') el.placeholder = s[key];
  });
  document.querySelectorAll('.lang-flag').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === lang);
  });
  document.getElementById('clear-btn').textContent = s.clearBtn;
  document.getElementById('reset-btn').textContent = s.resetBtn;
  build();
}

document.getElementById('lang-btn').addEventListener('click', () => {
  setLang(lang === 'en' ? 'tr' : 'en');
});

// ── Add / List controls ──
const addOverlay = document.getElementById('add-overlay');

function showAddSheet() {
  addOverlay.classList.remove('hidden');
  requestAnimationFrame(() => document.getElementById('item-name').focus());
}

function hideAddSheet() {
  addOverlay.classList.add('hidden');
}

document.getElementById('add-fab').addEventListener('click', showAddSheet);
document.getElementById('add-close').addEventListener('click', hideAddSheet);
addOverlay.addEventListener('click', e => {
  if (e.target === addOverlay) hideAddSheet();
});
document.getElementById('add-submit').addEventListener('click', addItem);
document.getElementById('item-name').addEventListener('keydown', e => {
  if (e.key === 'Enter') addItem();
});
document.getElementById('item-emoji').addEventListener('input', e => {
  e.target.value = firstEmoji(e.target.value);
  document.querySelectorAll('.emoji-pick').forEach(el => {
    el.classList.toggle('active', el.textContent === e.target.value);
  });
});

document.getElementById('clear-btn').addEventListener('click', () => {
  if (confirm(STRINGS[lang].clearConfirm)) {
    state = {};
    saveState(state);
    build();
  }
});

document.getElementById('reset-btn').addEventListener('click', () => {
  if (confirm(STRINGS[lang].resetConfirm)) {
    LIST = cloneList(DEFAULT_LIST);
    state = {};
    saveList(LIST);
    saveState(state);
    build();
  }
});

// ── Tutorial ──
const overlay = document.getElementById('overlay');

function showTutorial() {
  overlay.classList.remove('hidden');
}

function hideTutorial() {
  overlay.classList.add('hidden');
  try { localStorage.setItem(TUTORIAL_KEY, '1'); } catch (_) {}
}

document.getElementById('help-btn').addEventListener('click', showTutorial);
document.getElementById('tutorial-dismiss').addEventListener('click', hideTutorial);

overlay.addEventListener('click', e => {
  if (e.target === overlay) hideTutorial();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    hideTutorial();
    hideAddSheet();
  }
});

// ── Init ──
buildEmojiPicks();
setLang(lang);

try {
  if (!localStorage.getItem(TUTORIAL_KEY)) showTutorial();
} catch (_) {}
