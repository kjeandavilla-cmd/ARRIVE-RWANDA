// Configuration Firebase du projet ARRIVE
const firebaseConfig = {
  apiKey: "AIzaSyAA1Vy3guwQxKOHc_VpYnzKMDFjlB7mByw",
  authDomain: "arrive-21f3a.firebaseapp.com",
  projectId: "arrive-21f3a",
  storageBucket: "arrive-21f3a.firebasestorage.app",
  messagingSenderId: "1070270572519",
  appId: "1:1070270572519:web:cdf1eba455999cfe8f7f42",
  measurementId: "G-6DWNV9DYJS"
};

// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);

// Références réutilisables dans tout le site
const auth = firebase.auth();
const db = firebase.firestore();