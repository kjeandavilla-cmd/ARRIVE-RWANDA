// ===== INSCRIPTION (version debug) =====

const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("1. Formulaire soumis");

    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const messageEl = document.getElementById('registerMessage');

    if (password !== confirmPassword) {
      messageEl.textContent = "❌ Les mots de passe ne correspondent pas.";
      messageEl.style.color = "red";
      return;
    }

    alert("2. Avant appel Firebase");

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("3. Compte créé dans Firebase Auth !");
        const user = userCredential.user;

        return db.collection('users').doc(user.uid).set({
          nom: nom,
          email: email,
          dateCreation: new Date()
        });
      })
      .then(() => {
        alert("4. Données sauvegardées dans Firestore !");
        messageEl.textContent = "✅ Compte créé avec succès ! Redirection...";
        messageEl.style.color = "green";

        setTimeout(() => {
          window.location.href = "login.html";
        }, 1500);
      })
      .catch((error) => {
        alert("ERREUR : " + error.message);
        messageEl.textContent = "❌ Erreur : " + error.message;
        messageEl.style.color = "red";
      });
  });
}
// ===== CONNEXION =====

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('loginMessage');

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        messageEl.textContent = "✅ Connexion réussie ! Redirection...";
        messageEl.style.color = "green";

        setTimeout(() => {
          window.location.href = "../index.html";
        }, 1500);
      })
      .catch((error) => {
        messageEl.textContent = "❌ Erreur : " + error.message;
        messageEl.style.color = "red";
      });
  });
}