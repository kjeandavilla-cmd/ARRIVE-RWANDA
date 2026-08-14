const adminLoginForm = document.getElementById('adminLoginForm');
const adminLoginSection = document.getElementById('adminLoginSection');
const adminPanel = document.getElementById('adminPanel');
const reservationsList = document.getElementById('reservationsList');

const ADMIN_EMAIL = "kjeandavilla@gmail.com";

if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const messageEl = document.getElementById('adminLoginMessage');

    if (email !== ADMIN_EMAIL) {
      messageEl.textContent = "❌ Accès refusé : ce n'est pas un compte administrateur.";
      messageEl.style.color = "red";
      return;
    }

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        adminLoginSection.style.display = "none";
        adminPanel.style.display = "block";
        chargerReservations();
      })
      .catch((error) => {
        messageEl.textContent = "❌ Erreur : " + error.message;
        messageEl.style.color = "red";
      });
  });
}

function chargerReservations() {
  reservationsList.innerHTML = "Chargement...";

  db.collection('reservations').orderBy('dateReservation', 'desc').get()
    .then((snapshot) => {
      if (snapshot.empty) {
        reservationsList.innerHTML = "<p>Aucune réservation pour l'instant.</p>";
        return;
      }

      reservationsList.innerHTML = "";

      snapshot.forEach((doc) => {
        const data = doc.data();
        const card = document.createElement('div');
        card.className = "card";
        card.style.textAlign = "left";
        card.style.marginBottom = "20px";

        card.innerHTML = `
          <h3>👤 ${data.nom}</h3>
          <p><strong>Email :</strong> ${data.email}</p>
          <p><strong>Service :</strong> ${data.service}</p>
          <p><strong>Destination :</strong> ${data.destination}</p>
          <p><strong>Date du voyage :</strong> ${data.dateVoyage}</p>
          <p><strong>Message :</strong> ${data.message || "—"}</p>
          <p><strong>Statut :</strong> ${data.statut}</p>
        `;

        reservationsList.appendChild(card);
      });
    })
    .catch((error) => {
      reservationsList.innerHTML = "❌ Erreur : " + error.message;
    });
}