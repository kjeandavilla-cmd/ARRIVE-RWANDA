const avisContainer = document.getElementById('avisContainer');

if (avisContainer) {
  db.collection('avis').orderBy('date', 'desc').limit(6).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        avisContainer.innerHTML = "<p style='text-align:center; width:100%;'>Aucun avis pour le moment.</p>";
        return;
      }

      avisContainer.innerHTML = "";

      snapshot.forEach((doc) => {
        const data = doc.data();
        const etoiles = "⭐".repeat(data.note);

        const card = document.createElement('div');
        card.className = "testimonial-card";
        card.innerHTML = `
          <div class="testimonial-stars">${etoiles}</div>
          <p class="testimonial-text">"${data.texte}"</p>
          <p class="testimonial-author">— ${data.nom}</p>
        `;

        avisContainer.appendChild(card);
      });
    })
    .catch((error) => {
      avisContainer.innerHTML = "❌ Erreur de chargement des avis.";
    });
}