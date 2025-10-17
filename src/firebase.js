
import { getFirestore } from 'firebase/firestore'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAuCjtlYUc9jbTmFgJQ-uFSVDNCrtuwmcY",
  authDomain: "healingtones-1cee9.firebaseapp.com",
  projectId: "healingtones-1cee9",
  storageBucket: "healingtones-1cee9.firebasestorage.app",
  messagingSenderId: "924581245755",
  appId: "1:924581245755:web:25e9faa1f96d40515a3d1e",
  measurementId: "G-TQ1TF0L2TK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app) 
const analytics = getAnalytics(app);