auth.onAuthStateChanged((user) => {
  if (!user) {
    // Pas connecté : redirection vers login
    window.location.href = "login.html";
    return;
  }

  // Afficher les infos de base
  document.getElementById('profileEmail').textContent = "📧 " + user.email;

  // Récupérer le nom depuis Firestore
  db.collection('users').doc(user.uid).get()
    .then((doc) => {
      if (doc.exists) {
        document.getElementById('profileNom').textContent = "👤 " + doc.data().nom;
      }
    });

  // Récupérer les réservations de cet utilisateur
  const listEl = document.getElementById('myReservationsList');
  listEl.innerHTML = "Chargement de vos réservations...";

  db.collection('reservations').where('userId', '==', user.uid).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        listEl.innerHTML = "<p>Vous n'avez pas encore de réservation.</p>";
        return;
      }

      listEl.innerHTML = "";

      snapshot.forEach((doc) => {
        const data = doc.data();
        const card = document.createElement('div');
        card.className = "card";
        card.style.textAlign = "left";
        card.style.marginBottom = "20px";

        card.innerHTML = `
          <h3>${data.service} — ${data.destination}</h3>
          <p><strong>Date du voyage :</strong> ${data.dateVoyage}</p>
          <p><strong>Statut :</strong> ${data.statut}</p>
        `;

        listEl.appendChild(card);
      });
    })
    .catch((error) => {
      listEl.innerHTML = "❌ Erreur : " + error.message;
    });

  // ===== FORMULAIRE D'AVIS =====
  const avisForm = document.getElementById('avisForm');

  if (avisForm) {
    avisForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const note = document.getElementById('avisNote').value;
      const texte = document.getElementById('avisTexte').value;
      const avisMessageEl = document.getElementById('avisMessage');

      db.collection('users').doc(user.uid).get()
        .then((doc) => {
          const nom = doc.exists ? doc.data().nom : "Client ARRIVE";

          return db.collection('avis').add({
            userId: user.uid,
            nom: nom,
            note: parseInt(note),
            texte: texte,
            date: new Date()
          });
        })
        .then(() => {
          avisMessageEl.textContent = "✅ Merci pour votre avis !";
          avisMessageEl.style.color = "green";
          avisForm.reset();
        })
        .catch((error) => {
          avisMessageEl.textContent = "❌ Erreur : " + error.message;
          avisMessageEl.style.color = "red";
        });
    });
  }
});