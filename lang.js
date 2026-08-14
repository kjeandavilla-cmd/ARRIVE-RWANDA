const langToggle = document.getElementById('langToggle');

function applyLanguage(lang) {
  const elements = document.querySelectorAll('[data-en]');

  elements.forEach(el => {
    if (lang === 'en') {
      if (!el.dataset.fr) {
        el.dataset.fr = el.textContent;
      }
      el.textContent = el.dataset.en;
    } else {
      if (el.dataset.fr) {
        el.textContent = el.dataset.fr;
      }
    }
  });

  if (langToggle) {
    langToggle.textContent = lang === 'en' ? 'FR' : 'EN';
  }

  localStorage.setItem('arriveLang', lang);
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    const currentLang = localStorage.getItem('arriveLang') || 'fr';
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    applyLanguage(newLang);
  });
}

// Appliquer la langue mémorisée au chargement
const savedLang = localStorage.getItem('arriveLang') || 'fr';
if (savedLang === 'en') {
  applyLanguage('en');
}