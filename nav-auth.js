const isInPagesFolder = window.location.pathname.includes('/pages/');
const pathPrefix = isInPagesFolder ? '' : 'pages/';
const rootPrefix = isInPagesFolder ? '../' : '';

auth.onAuthStateChanged((user) => {
  const navAuthItem = document.getElementById('navAuthItem');
  const navAuthItemMobile = document.getElementById('navAuthItemMobile');
  if (!navAuthItem) return;

  if (user) {
    const initiale = user.email.charAt(0).toUpperCase();

    navAuthItem.innerHTML = `
      <div class="avatar-container">
        <div class="avatar-circle" id="avatarBtn">${initiale}</div>
        <div class="avatar-menu" id="avatarMenu">
          <a href="${pathPrefix}profile.html">Mon profil</a>
          <a href="#" id="logoutBtn">Se déconnecter</a>
        </div>
      </div>
    `;

    if (navAuthItemMobile) navAuthItemMobile.style.display = "none";

    document.getElementById('avatarBtn').addEventListener('click', () => {
      document.getElementById('avatarMenu').classList.toggle('show');
    });

    document.getElementById('logoutBtn').addEventListener('click', (e) => {
      e.preventDefault();
      auth.signOut().then(() => {
        window.location.href = rootPrefix + 'index.html';
      });
    });

  } else {
    navAuthItem.innerHTML = "";
    if (navAuthItemMobile) {
      navAuthItemMobile.style.display = "block";
      navAuthItemMobile.innerHTML = `<a href="${pathPrefix}login.html">Connexion</a>`;
    }
  }
});