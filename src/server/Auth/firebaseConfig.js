import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuk3wdh9upGF25uR5PC3Pv_y7hOLKWCe4",
  authDomain: "imscience-1c1f2.firebaseapp.com",
  projectId: "imscience-1c1f2",
  storageBucket: "imscience-1c1f2.firebasestorage.app",
  messagingSenderId: "441667471584",
  appId: "1:441667471584:web:f7b732cdf0bd7194dca885"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);