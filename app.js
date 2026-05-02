const KEY          = 'preflight-checklist-v1';
const TUTORIAL_KEY = 'preflight-tutorial-seen';
const LANG_KEY     = 'preflight-lang';

let lang = (() => { try { return localStorage.getItem(LANG_KEY) || 'en'; } catch (_) { return 'en'; } })();

const STRINGS = {
  en: {
    subtitle:     'pre-flight checklist',
    counter:      (n, t) => `${n} of ${t} checked`,
    ready:        'Ready to fly! ✈️',
    resetBtn:     'Reset checklist',
    resetConfirm: 'Clear all checked and skipped items and start over?',
    tutorialTitle:'How it works',
    action1: 'Tap once',        result1: 'Mark as packed ✓',
    action2: 'Tap again',       result2: 'Not taking ✕',
    action3: 'Tap once more',   result3: 'Reset to default',
    dismiss: 'Got it',
  },
  tr: {
    subtitle:     'uçuş öncesi kontrol',
    counter:      (n, t) => `${t} öğeden ${n} işaretlendi`,
    ready:        'Uçuşa hazır! ✈️',
    resetBtn:     'Sıfırla',
    resetConfirm: 'Tüm işaretli öğeleri temizleyip baştan başlamak istiyor musun?',
    tutorialTitle:'Nasıl çalışır',
    action1: 'Bir kez dokun',       result1: 'Hazır olarak işaretle ✓',
    action2: 'Tekrar dokun',        result2: 'Almıyorum ✕',
    action3: 'Bir kez daha dokun',  result3: 'Varsayılana sıfırla',
    dismiss: 'Anladım',
  },
};

const LIST = [
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
const TOTAL     = LIST.reduce((n, s) => n + s.items.length, 0);

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

function refreshHeader() {
  const n = LIST.reduce(
    (acc, s) => acc + s.items.filter(i => state[i.id] === 'checked' || state[i.id] === 'skipped').length,
    0
  );
  const s = STRINGS[lang];
  const counter = document.getElementById('counter');
  const done = n === TOTAL;
  counter.textContent = done ? s.ready : s.counter(n, TOTAL);
  counter.classList.toggle('ready', done);
  document.getElementById('progress').style.width = `${(n / TOTAL) * 100}%`;
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
          ${section.title[lang]}
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
  document.querySelectorAll('.lang-flag').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === lang);
  });
  document.getElementById('reset-btn').textContent = s.resetBtn;
  build();
}

document.getElementById('lang-btn').addEventListener('click', () => {
  setLang(lang === 'en' ? 'tr' : 'en');
});

// ── Reset ──
document.getElementById('reset-btn').addEventListener('click', () => {
  if (confirm(STRINGS[lang].resetConfirm)) {
    state = {};
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
  if (e.key === 'Escape') hideTutorial();
});

// ── Init ──
setLang(lang);

try {
  if (!localStorage.getItem(TUTORIAL_KEY)) showTutorial();
} catch (_) {}
