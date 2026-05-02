const KEY          = 'preflight-checklist-v1';
const TUTORIAL_KEY = 'preflight-tutorial-seen';

const LIST = [
  {
    id: 'documents',
    title: 'Travel Documents',
    items: [
      { id: 'passport',           emoji: '🛂', label: 'Passport' },
      { id: 'visa',               emoji: '📋', label: 'Visa / Permit' },
      { id: 'boarding_pass',      emoji: '🎫', label: 'Boarding Pass' },
      { id: 'national_id',        emoji: '🪪', label: 'National ID' },
      { id: 'travel_insurance',   emoji: '🏥', label: 'Travel Insurance' },
      { id: 'hotel_confirm',      emoji: '🏨', label: 'Hotel Confirm' },
      { id: 'emergency_contacts', emoji: '📞', label: 'Emergency Contacts' },
    ],
  },
  {
    id: 'money',
    title: 'Money & Payment',
    items: [
      { id: 'primary_card',   emoji: '💼', label: 'Wallet' },
      { id: 'local_currency', emoji: '💰', label: 'Cash' },
    ],
  },
  {
    id: 'electronics',
    title: 'Electronics & Chargers',
    items: [
      { id: 'phone_charged',  emoji: '📱', label: 'Phone' },
      { id: 'laptop',         emoji: '💻', label: 'Laptop' },
      { id: 'phone_charger',  emoji: '⚡', label: 'Phone Charger' },
      { id: 'laptop_charger', emoji: '🔌', label: 'Laptop Charger' },
      { id: 'power_bank',     emoji: '🔋', label: 'Power Bank' },
      { id: 'headphones',     emoji: '🎧', label: 'Headphones' },
      { id: 'travel_adapter', emoji: '🔌', label: 'Plug Adapter' },
      { id: 'tablet',         emoji: '📖', label: 'Tablet' },
      { id: 'camera',         emoji: '📷', label: 'Camera' },
    ],
  },
  {
    id: 'health',
    title: 'Health & Toiletries',
    items: [
      { id: 'medications',     emoji: '💊', label: 'Medications' },
      { id: 'cosmetics',       emoji: '🧴', label: 'Cosmetics' },
      { id: 'toothbrush',      emoji: '🪥', label: 'Toothbrush' },
      { id: 'toothpaste',      emoji: '🦷', label: 'Toothpaste' },
      { id: 'deodorant',       emoji: '🌿', label: 'Deodorant' },
      { id: 'perfume',         emoji: '💨', label: 'Perfume' },
      { id: 'sunscreen',       emoji: '☀️',  label: 'Sunscreen' },
      { id: 'contacts',        emoji: '👁️',  label: 'Contacts' },
      { id: 'glasses',         emoji: '👓', label: 'Glasses' },
      { id: 'hand_sanitizer',  emoji: '🧼', label: 'Hand Sanitizer' },
    ],
  },
  {
    id: 'clothing',
    title: 'Clothing',
    items: [
      { id: 'main_clothes', emoji: '👕', label: 'Clothes' },
      { id: 'socks',        emoji: '🧦', label: 'Socks' },
      { id: 'slippers',     emoji: '🩴', label: 'Slippers' },
      { id: 'underwear',    emoji: '🩲', label: 'Underwear' },
      { id: 'swimwear',     emoji: '👙', label: 'Swimwear' },
      { id: 'sunglasses',   emoji: '🕶️', label: 'Sunglasses' },
      { id: 'hat',          emoji: '👒', label: 'Hat' },
    ],
  },
  {
    id: 'miscellaneous',
    title: 'Miscellaneous',
    items: [
      { id: 'books',        emoji: '📚', label: 'Books' },
    { id: 'water_bottle', emoji: '💧', label: 'Water Bottle' },
    { id: 'neck_pillow',  emoji: '☁️', label: 'Neck Pillow' },
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
  document.getElementById('counter').textContent = `${n} of ${TOTAL} checked`;
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
          ${section.title}
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
      card.dataset.label = item.label;

      const emoji = document.createElement('span');
      emoji.className = 'item-emoji';
      emoji.setAttribute('aria-hidden', 'true');
      emoji.textContent = item.emoji;

      const txt = document.createElement('span');
      txt.className = 'item-label';
      txt.textContent = item.label;

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

// ── Reset ──
document.getElementById('reset-btn').addEventListener('click', () => {
  if (confirm('Clear all checked and skipped items and start over?')) {
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
build();

try {
  if (!localStorage.getItem(TUTORIAL_KEY)) showTutorial();
} catch (_) {}
