// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyANgmu0qI_PH8_132ZfP91vLWgJDoP-vZI",
  authDomain: "olx-clone-7f7ee.firebaseapp.com",
  projectId: "olx-clone-7f7ee",
  storageBucket: "olx-clone-7f7ee.appspot.com",
  messagingSenderId: "120367913785",
  appId: "1:120367913785:web:a4cf5d5dfcc82f2f85e6e8",
  measurementId: "G-6L0C3W5H5S"
};


const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth service
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)
export { storage,auth,db};



