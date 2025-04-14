import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { 
  getAuth, 
  signOut, 
  signInAnonymously, 
  setPersistence, 
  browserLocalPersistence, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

import firebaseConfig from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();

function setAuthListeners(onLogin, onLogout) {
  onAuthStateChanged(auth, user => {
    if (user) {
      onLogin();
    } else {
      onLogout();
    }
  });
}

async function signIn() {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const user = await signInAnonymously(auth);
    console.log('Signed in as:', user.uid);
  } catch (e) {
    console.error('Error signing in:', e);
  }
}

async function logout() {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

onAuthStateChanged(auth, (user) => {
  console.log("Auth state changed:", user);
});

export { auth, setAuthListeners, signIn, logout };