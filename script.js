// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', e => { if (e.target.tagName === 'A') nav.classList.remove('open'); });

// Category filter + search
const cards = document.querySelectorAll('.card');
const search = document.getElementById('search');
const chips = document.querySelectorAll('.chip');
const empty = document.getElementById('empty');
let category = 'all';

function applyFilters() {
  const term = search.value.trim().toLowerCase();
  let shown = 0;
  cards.forEach(card => {
    const matchCat = category === 'all' || card.dataset.cat === category;
    const matchText = card.textContent.toLowerCase().includes(term);
    const visible = matchCat && matchText;
    card.hidden = !visible;
    if (visible) shown++;
  });
  empty.hidden = shown !== 0;
}

chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  category = chip.dataset.cat;
  applyFilters();
}));
search.addEventListener('input', applyFilters);

// Contact form validation
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const msg = form.msg.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || !msg) {
    formMsg.className = 'err';
    formMsg.textContent = 'Please enter your name, a valid email and a message.';
    return;
  }
  formMsg.className = 'ok';
  formMsg.textContent = 'Thanks, ' + name + '. Your message has been sent.';
  form.reset();
});
