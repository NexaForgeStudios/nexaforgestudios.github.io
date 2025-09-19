
/*************************
 * Translations system
 *************************/
const translations = {
  "fr": {
    "nav": {
      "games": "Jeux",
      "news": "Actualités",
      "support": "Support",
      "shop": "Boutique",
      "login": "Connexion",
      "logout": "Déconnexion",
      "myAccount": "Mon compte"
    },
    "hero": {
      "discoverGame": "Découvrir le jeu",
      "discord": "Discord",
      "deadlineProtocolDesc": "Un jeu où vous incarnez un jeune lycéen qui doit accomplir des missions données par un étrange scientifique afin de rembourser les dettes de sa mère."
    },
    "sections": {
      "games": "JEUX",
      "news": "ACTUALITÉS"
    },
    "games": {
      "deadlineProtocol": "Deadline Protocol",
      "inDevelopment": "En développement...",
      "findOutMore": "En savoir plus",
      "nothing": "Rien"
    },
    "news": {
      "nothing": "Rien"
    },
    "footer": {
      "games": "Jeux",
      "services": "Services",
      "enterprise": "Entreprise",
      "community": "Communauté",
      "about": "À propos",
      "careers": "Carrières",
      "contact": "Contact",
      "twitter": "Twitter",
      "youtube": "YouTube",
      "discord": "Discord",
      "copyright": "© 2025 NexaForge Studios, Inc. Tous droits réservés."
    },
    "auth": {
      "loginSignup": "Connexion / Inscription",
      "email": "Email",
      "password": "Mot de passe",
      "login": "Connexion",
      "signup": "S'inscrire",
      "noAccount": "Je n'ai pas de compte · S'inscrire",
      "hasAccount": "J'ai déjà un compte · Se connecter",
      "connectWith": "ou se connecter avec",
      "google": "Google",
      "apple": "Apple",
      "epic": "Epic Games",
      "xbox": "Xbox / Microsoft",
      "playstation": "PlayStation",
      "emailPasswordRequired": "Email et mot de passe requis.",
      "loginError": "Erreur de connexion : ",
      "signupError": "Erreur d'inscription : ",
      "googleError": "Erreur Google : ",
      "appleError": "Erreur Apple : ",
      "epicError": "L'authentification Epic Games nécessite une configuration OAuth personnalisée. Veuillez contacter le support.",
      "xboxError": "Erreur Xbox/Microsoft : ",
      "psError": "L'authentification PlayStation nécessite une configuration OAuth personnalisée. Veuillez contacter le support.",
      "loginSuccess": "Connexion réussie pour",
      "signupSuccess": "Inscription réussie pour"
    },
    "carousel": {
      "goToSlide": "Aller à la diapositive"
    }
  },
  "de": {
    "nav": {
      "games": "Spiele",
      "news": "Nachrichten",
      "support": "Support",
      "shop": "Shop",
      "login": "Anmelden",
      "logout": "Abmelden",
      "myAccount": "Mein Konto"
    },
    "hero": {
      "discoverGame": "Spiel entdecken",
      "discord": "Discord",
      "deadlineProtocolDesc": "Ein Spiel, in dem Sie einen jungen Oberschüler spielen, der Missionen eines seltsamen Wissenschaftlers erfüllen muss, um die Schulden seiner Mutter zu begleichen."
    },
    "sections": {
      "games": "SPIELE",
      "news": "NACHRICHTEN"
    },
    "games": {
      "deadlineProtocol": "Deadline Protocol",
      "inDevelopment": "In Entwicklung...",
      "findOutMore": "Mehr erfahren",
      "nothing": "Nichts"
    },
    "news": {
      "nothing": "Nichts"
    },
    "footer": {
      "games": "Spiele",
      "services": "Dienste",
      "enterprise": "Unternehmen",
      "community": "Gemeinschaft",
      "about": "Über uns",
      "careers": "Karriere",
      "contact": "Kontakt",
      "twitter": "Twitter",
      "youtube": "YouTube",
      "discord": "Discord",
      "copyright": "© 2025 NexaForge Studios, Inc. Alle Rechte vorbehalten."
    },
    "auth": {
      "loginSignup": "Anmelden / Registrieren",
      "email": "E-Mail",
      "password": "Passwort",
      "login": "Anmelden",
      "signup": "Registrieren",
      "noAccount": "Ich habe kein Konto · Registrieren",
      "hasAccount": "Ich habe bereits ein Konto · Anmelden",
      "connectWith": "oder verbinden mit",
      "google": "Google",
      "apple": "Apple",
      "epic": "Epic Games",
      "xbox": "Xbox / Microsoft",
      "playstation": "PlayStation",
      "emailPasswordRequired": "E-Mail und Passwort erforderlich.",
      "loginError": "Anmeldefehler: ",
      "signupError": "Registrierungsfehler: ",
      "googleError": "Google-Fehler: ",
      "appleError": "Apple-Fehler: ",
      "epicError": "Epic Games-Authentifizierung erfordert benutzerdefinierte OAuth-Einrichtung. Bitte wenden Sie sich an den Support.",
      "xboxError": "Xbox/Microsoft-Fehler: ",
      "psError": "PlayStation-Authentifizierung erfordert benutzerdefinierte OAuth-Einrichtung. Bitte wenden Sie sich an den Support.",
      "loginSuccess": "Anmeldung erfolgreich für",
      "signupSuccess": "Registrierung erfolgreich für"
    },
    "carousel": {
      "goToSlide": "Zur Folie gehen"
    }
  }
};

// Get translation by key path
function getTranslation(key, lang = currentLanguage) {
  const keys = key.split('.');
  let value = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
}

// Current language (default to French)
let currentLanguage = 'fr';

// Apply translations to all elements
function applyTranslations() {
  // Translate text content
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    element.textContent = getTranslation(key);
  });

  // Translate placeholders
  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.getAttribute('data-translate-placeholder');
    element.placeholder = getTranslation(key);
  });

  // Update carousel indicators aria-labels
  document.querySelectorAll('.indicator').forEach((indicator, index) => {
    indicator.setAttribute('aria-label', getTranslation('carousel.goToSlide') + ' ' + (index + 1));
  });
}

// Language selector event
document.getElementById('language-select').addEventListener('change', (e) => {
  currentLanguage = e.target.value;
  applyTranslations();
});

/*************************
 * Basic functionality
 *************************/
// Smooth anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, observerOptions);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) header.style.background = 'rgba(0, 0, 0, 0.95)';
  else header.style.background = 'rgba(0, 0, 0, 0.9)';
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('active');
});

/*************************
 * Carousel logic
 *************************/
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const indicatorsWrapper = document.getElementById('carousel-indicators');
let current = 0;
let autoPlayTimer = null;

// Create indicators
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'indicator' + (i === 0 ? ' active' : '');
  dot.setAttribute('data-index', String(i));
  dot.setAttribute('role', 'button');
  dot.setAttribute('aria-label', getTranslation('carousel.goToSlide') + ' ' + (i + 1));
  indicatorsWrapper.appendChild(dot);
});
const indicators = Array.from(indicatorsWrapper.children);

function goToSlide(n) {
  if (n === current) return;
  slides.forEach((s, i) => {
    s.classList.remove('active', 'prev');
    if (i < n) s.classList.add('prev');
  });
  slides[current].classList.remove('active');
  slides[n].classList.add('active');
  indicators.forEach(d => d.classList.remove('active'));
  indicators[n].classList.add('active');
  current = n;
}

indicators.forEach(dot => dot.addEventListener('click', (e) => {
  const idx = Number(dot.getAttribute('data-index'));
  goToSlide(idx);
  restartAutoPlay();
}));

function nextSlide() { goToSlide((current + 1) % slides.length); }
function restartAutoPlay() {
  if (autoPlayTimer) clearInterval(autoPlayTimer);
  autoPlayTimer = setInterval(nextSlide, 5000);
}
restartAutoPlay();

/*************************
 * Firebase Authentication
 *************************/
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmose-4Yja2ZIxjKXV9oWInF9dKFcYvYM",
  authDomain: "nexaforge-studios-66fbe.firebaseapp.com",
  projectId: "nexaforge-studios-66fbe",
  storageBucket: "nexaforge-studios-66fbe.firebasestorage.app",
  messagingSenderId: "296882687491",
  appId: "1:296882687491:web:4aeb4ef4557b61daf58836",
  measurementId: "G-7GJXYPMSZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM elements
const openAuth = document.getElementById('open-auth');
const authModal = document.getElementById('auth-modal');
const authClose = document.getElementById('auth-close');
const authEmail = document.getElementById('auth-email');
const authPassword = document.getElementById('auth-password');
const authAction = document.getElementById('auth-action');
const toggleAuthMode = document.getElementById('toggle-auth-mode');
const authMessage = document.getElementById('auth-message');

let mode = 'login'; // 'login' or 'signup'

function openModal() {
  authModal.style.display = 'flex';
  authModal.setAttribute('aria-hidden', 'false');
  authMessage.style.display = 'none';
}
function closeModal() {
  authModal.style.display = 'none';
  authModal.setAttribute('aria-hidden', 'true');
}

openAuth.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
authClose.addEventListener('click', closeModal);
window.addEventListener('click', (e) => { if (e.target === authModal) closeModal(); });

toggleAuthMode.addEventListener('click', () => {
  if (mode === 'login') {
    mode = 'signup';
    authAction.textContent = getTranslation("auth.signup");
    toggleAuthMode.textContent = getTranslation("auth.hasAccount");
  } else {
    mode = 'login';
    authAction.textContent = getTranslation("auth.login");
    toggleAuthMode.textContent = getTranslation("auth.noAccount");
  }
  authMessage.style.display = 'none';
});

// Email/Password authentication
authAction.addEventListener('click', async () => {
  const email = authEmail.value.trim();
  const password = authPassword.value;
  authMessage.style.display = 'none';

  if (!email || !password) {
    authMessage.textContent = getTranslation("auth.emailPasswordRequired");
    authMessage.style.display = 'block';
    return;
  }

  try {
    let userCredential;
    if (mode === 'login') {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    } else {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Save user data to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        createdAt: new Date().toISOString()
      });
    }
    onLoginSuccess(userCredential.user.email, mode === 'signup');
  } catch (err) {
    const errorKey = mode === 'login' ? 'auth.loginError' : 'auth.signupError';
    authMessage.textContent = getTranslation(errorKey) + (err.message || err);
    authMessage.style.display = 'block';
    console.error('Auth Error:', err);
  }
});

// Google Authentication
document.getElementById('btn-google').addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');

  try {
    const result = await signInWithPopup(auth, provider);

    // Save user data to Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      email: result.user.email,
      displayName: result.user.displayName,
      provider: 'google',
      lastLogin: new Date().toISOString()
    }, { merge: true });

    onLoginSuccess(result.user.email || result.user.displayName);
  } catch (err) {
    console.error('Google Auth Error:', err);
    authMessage.textContent = getTranslation("auth.googleError") + (err.message || err);
    authMessage.style.display = 'block';
  }
});

// Other social logins (placeholders for now)
document.getElementById('btn-apple').addEventListener('click', () => {
  authMessage.textContent = "Apple authentication coming soon!";
  authMessage.style.display = 'block';
});

document.getElementById('btn-epic').addEventListener('click', () => {
  authMessage.textContent = getTranslation("auth.epicError");
  authMessage.style.display = 'block';
});

document.getElementById('btn-xbox').addEventListener('click', () => {
  authMessage.textContent = "Xbox/Microsoft authentication coming soon!";
  authMessage.style.display = 'block';
});

document.getElementById('btn-ps').addEventListener('click', () => {
  authMessage.textContent = getTranslation("auth.psError");
  authMessage.style.display = 'block';
});

// Post-login UI update
function onLoginSuccess(email, isNew = false) {
  closeModal();
  const openAuthLink = document.getElementById('open-auth');
  openAuthLink.textContent = email ? (email.split('@')[0] || getTranslation('nav.myAccount')) : getTranslation('nav.myAccount');

  // Add logout option if not already present
  if (!document.getElementById('logout-link')) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = "#";
    a.id = "logout-link";
    a.textContent = getTranslation('nav.logout');
    a.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await signOut(auth);
        openAuthLink.textContent = getTranslation('nav.login');
        a.parentElement.remove();
        console.log('User logged out successfully');
      } catch (error) {
        console.error('Logout error:', error);
      }
    });
    document.querySelector('.nav-menu').appendChild(li).appendChild(a);
  }

  console.log((isNew ? getTranslation('auth.signupSuccess') : getTranslation('auth.loginSuccess')), email);
}

// Listen to auth state changes
onAuthStateChanged(auth, user => {
  const openAuthLink = document.getElementById('open-auth');

  if (user) {
    openAuthLink.textContent = user.email ? user.email.split('@')[0] : (user.displayName || getTranslation('nav.myAccount'));

    // Add logout button if user is logged in and button doesn't exist
    if (!document.getElementById('logout-link')) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = "#";
      a.id = "logout-link";
      a.textContent = getTranslation('nav.logout');
      a.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          await signOut(auth);
          openAuthLink.textContent = getTranslation('nav.login');
          a.parentElement.remove();
        } catch (error) {
          console.error('Logout error:', error);
        }
      });
      document.querySelector('.nav-menu').appendChild(li).appendChild(a);
    }
  } else {
    // User is signed out
    openAuthLink.textContent = getTranslation('nav.login');

    // Remove logout button if it exists
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
      logoutLink.parentElement.remove();
    }
  }
});

// Apply initial translations
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
});

// Apply translations immediately
applyTranslations();