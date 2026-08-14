// Pré-remplir la destination et/ou le service si présents dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const destinationParam = urlParams.get('destination');
const serviceParam = urlParams.get('service');

if (destinationParam) {
  const destinationField = document.getElementById('destination');
  if (destinationField) {
    destinationField.value = destinationParam;
  }
}

if (serviceParam) {
  const serviceField = document.getElementById('service');
  if (serviceField) {
    serviceField.value = serviceParam;
  }
}

// ===== RÉSERVATION =====

const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const message = document.getElementById('message').value;
    const messageEl = document.getElementById('bookingMessage');

    const currentUser = auth.currentUser;
    const userId = currentUser ? currentUser.uid : null;

    db.collection('reservations').add({
      nom: nom,
      email: email,
      service: service,
      destination: destination,
      dateVoyage: date,
      message: message,
      dateReservation: new Date(),
      statut: "en attente",
      userId: userId
    })
    .then(() => {
      messageEl.textContent = "✅ Merci ! Votre réservation a bien été envoyée.";
      messageEl.style.color = "green";
      bookingForm.reset();
    })
    .catch((error) => {
      messageEl.textContent = "❌ Erreur : " + error.message;
      messageEl.style.color = "red";
    });
  });
}