// ============================================================
// Firebase project config — Dips Easy Learning Store
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCtIa09fwcWYGLTnRbOVQn-GgKf9k8gsrg",
  authDomain: "dips-easy-learning-store.firebaseapp.com",
  projectId: "dips-easy-learning-store",
  storageBucket: "dips-easy-learning-store.firebasestorage.app",
  messagingSenderId: "907898279122",
  appId: "1:907898279122:web:f5c3459268d12fddb5490b"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
