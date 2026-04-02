const titleInput = document.getElementById('titleInput');
const baseUrlInput = document.getElementById('baseUrlInput');
const convertBtn = document.getElementById('convertBtn');
const slugOutput = document.getElementById('slugOutput');
const urlOutput = document.getElementById('urlOutput');
const copySlugBtn = document.getElementById('copySlugBtn');
const copyUrlBtn = document.getElementById('copyUrlBtn');
const statusEl = document.getElementById('status');

function slugify(text) {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function buildFullUrl(baseUrl, slug) {
  if (!baseUrl) return slug;
  return `${baseUrl.replace(/\/+$/, '')}/${slug}`;
}

function showStatus(message) {
  statusEl.textContent = message;
  if (!message) return;
  setTimeout(() => {
    if (statusEl.textContent === message) statusEl.textContent = '';
  }, 1800);
}

function convert() {
  const slug = slugify(titleInput.value);
  const baseUrl = baseUrlInput.value.trim();

  slugOutput.value = slug;
  urlOutput.value = slug ? buildFullUrl(baseUrl, slug) : '';

  if (!slug && titleInput.value.trim()) {
    showStatus('No valid letters/numbers left after cleanup.');
  }
}

async function copyFrom(inputEl, successMessage) {
  if (!inputEl.value) {
    showStatus('Nothing to copy yet.');
    return;
  }

  try {
    await navigator.clipboard.writeText(inputEl.value);
    showStatus(successMessage);
  } catch {
    inputEl.select();
    document.execCommand('copy');
    showStatus(successMessage);
  }
}

convertBtn.addEventListener('click', convert);
titleInput.addEventListener('input', convert);
baseUrlInput.addEventListener('input', convert);
copySlugBtn.addEventListener('click', () => copyFrom(slugOutput, 'Slug copied.'));
copyUrlBtn.addEventListener('click', () => copyFrom(urlOutput, 'URL copied.'));

convert();
