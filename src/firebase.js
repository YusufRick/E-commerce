// src/firebase.js

// 1️⃣ Imports
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// 2️⃣ Config (declare first!)
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  
};

// src/firebase.js
console.log('🔥 Loaded ENV:', {
  apiKey:      import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:  import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:   import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storage:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:       import.meta.env.VITE_FIREBASE_APP_ID,
  measId:      import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
});



// 3️⃣ Initialize (or reuse) your app
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();


// 5️⃣ Quick Firestore “ping” test
(async () => {
  try {
    const db   = getFirestore(app);
    const snap = await getDoc(doc(db, 'ping', 'pong'));
    console.log('🔥 Firestore ping:', snap.exists());
  } catch (e) {
    console.error('❌ Firestore ping error:', e);
  }
})();

// 6️⃣ Export what you need
export { app};
