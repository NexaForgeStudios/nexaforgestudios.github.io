/*************************
 * Smooth anchors (original)
 *************************/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/*************************
 * Scroll animations (original)
 *************************/
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, observerOptions);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/*************************
 * Header scroll effect (original)
 *************************/
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) header.style.background = 'rgba(0, 0, 0, 0.95)';
    else header.style.background = 'rgba(0, 0, 0, 0.9)';
});

/*************************
 * Hamburger menu
 *************************/
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('active');
});

/*************************
 * Carousel logic + indicators
 *************************/
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const indicatorsWrapper = document.getElementById('carousel-indicators');
let current = 0;
let autoPlayTimer = null;
// create indicators
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'indicator' + (i === 0 ? ' active' : '');
    dot.setAttribute('data-index', String(i));
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', 'Aller à la diapositive ' + (i + 1));
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
 * Auth modal + Firebase integration
 * Remplace les valeurs firebaseConfig par les tiennes dans la console Firebase.
 *************************/
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    OAuthProvider,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// --- REMPLACEZ ICI AVEC VOS CLÉS FIREBASE ---
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM
const openAuth = document.getElementById('open-auth');
const authModal = document.getElementById('auth-modal');
const authClose = document.getElementById('auth-close');
const authEmail = document.getElementById('auth-email');
const authPassword = document.getElementById('auth-password');
const authAction = document.getElementById('auth-action');
const toggleAuthMode = document.getElementById('toggle-auth-mode');
const authMessage = document.getElementById('auth-message');

let mode = 'login'; // 'login' or 'signup'

function openModal() { authModal.style.display = 'flex'; authModal.setAttribute('aria-hidden', 'false'); authMessage.style.display = 'none'; }
function closeModal() { authModal.style.display = 'none'; authModal.setAttribute('aria-hidden', 'true'); }

openAuth.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
authClose.addEventListener('click', closeModal);
window.addEventListener('click', (e) => { if (e.target === authModal) closeModal(); });

toggleAuthMode.addEventListener('click', () => {
    if (mode === 'login') {
        mode = 'signup';
        authAction.textContent = "Sign Up";
        toggleAuthMode.textContent = "I already have an account · Login";
    } else {
        mode = 'login';
        authAction.textContent = "Login";
        toggleAuthMode.textContent = "I do not have an account · Register";
    }
    authMessage.style.display = 'none';
});

authAction.addEventListener('click', async () => {
    const email = authEmail.value.trim();
    const password = authPassword.value;
    authMessage.style.display = 'none';

    if (!email || !password) {
        authMessage.textContent = "Email and password required.";
        authMessage.style.display = 'block';
        return;
    }

    if (mode === 'login') {
        try {
            const credential = await signInWithEmailAndPassword(auth, email, password);
            onLoginSuccess(credential.user.email);
        } catch (err) {
            authMessage.textContent = "Login error : " + (err.message || err);
            authMessage.style.display = 'block';
        }
    } else {
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", userCred.user.uid), {
                email: userCred.user.email,
                createdAt: new Date().toISOString()
            });
            onLoginSuccess(userCred.user.email, true);
        } catch (err) {
            authMessage.textContent = "Sign Up error : " + (err.message || err);
            authMessage.style.display = 'block';
        }
    }
});

// Social logins
document.getElementById('btn-google').addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        await setDoc(doc(db, 'users', result.user.uid), { email: result.user.email, provider: 'google' }, { merge: true });
        onLoginSuccess(result.user.email);
    } catch (err) { authMessage.textContent = 'Google error: ' + (err.message || err); authMessage.style.display = 'block'; }
});

document.getElementById('btn-apple').addEventListener('click', async () => {
    const provider = new OAuthProvider('apple.com');
    try {
        const result = await signInWithPopup(auth, provider);
        await setDoc(doc(db, 'users', result.user.uid), { email: result.user.email || null, provider: 'apple' }, { merge: true });
        onLoginSuccess(result.user.email || 'Utilisateur Apple');
    } catch (err) { authMessage.textContent = 'Apple error: ' + (err.message || err); authMessage.style.display = 'block'; }
});

document.getElementById('btn-epic').addEventListener('click', async () => {
    // Epic Games requiert configuration OAuth côté Firebase / Epic dev portal.
    const provider = new OAuthProvider('epicgames.com');
    try {
        const result = await signInWithPopup(auth, provider);
        await setDoc(doc(db, 'users', result.user.uid), { email: result.user.email || null, provider: 'epic' }, { merge: true });
        onLoginSuccess(result.user.email || 'Utilisateur Epic');
    } catch (err) { authMessage.textContent = 'Epic Games error: ' + (err.message || err); authMessage.style.display = 'block'; }
});

document.getElementById('btn-xbox').addEventListener('click', async () => {
    // Utiliser Microsoft provider pour Xbox / Live
    const provider = new OAuthProvider('microsoft.com');
    try {
        const result = await signInWithPopup(auth, provider);
        await setDoc(doc(db, 'users', result.user.uid), { email: result.user.email || null, provider: 'microsoft' }, { merge: true });
        onLoginSuccess(result.user.email || 'Utilisateur Microsoft');
    } catch (err) { authMessage.textContent = 'Xbox/Microsoft error: ' + (err.message || err); authMessage.style.display = 'block'; }
});

document.getElementById('btn-ps').addEventListener('click', () => {
    // PlayStation : nécessite OAuth côté Sony + configuration serveur / Firebase custom provider
    authMessage.textContent = "PlayStation requires OAuth configuration on the Sony portal. See Firebase console.";
    authMessage.style.display = 'block';
});

// Post-login UI update
function onLoginSuccess(email, isNew = false) {
    closeModal();
    const openAuthLink = document.getElementById('open-auth');
    openAuthLink.textContent = email.split('@')[0] || 'Mon compte';
    // Add logout option if not already
    if (!document.getElementById('logout-link')) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = "#";
        a.id = "logout-link";
        a.textContent = "Logout";
        a.addEventListener('click', async (e) => {
            e.preventDefault();
            await signOut(auth);
            openAuthLink.textContent = "Login";
            a.parentElement.remove();
        });
        document.querySelector('.nav-menu').appendChild(li).appendChild(a);
    }
    // Optionally store or show message
    console.log((isNew ? 'Sign Up' : 'Login') + ' réussie pour', email);
}

// Listen to auth state changes (optional safety)
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
onAuthStateChanged(auth, user => {
    if (user) {
        const openAuthLink = document.getElementById('open-auth');
        openAuthLink.textContent = user.email ? user.email.split('@')[0] : 'My account';
    }
});
