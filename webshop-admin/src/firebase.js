import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyDqoLUYQhW7NlH57EfBO63D4KRqi3IgE78',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'webshop-e2f76.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'webshop-e2f76',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'webshop-e2f76.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '1057783220542',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:1057783220542:web:14904508fb92f27adcc46f',
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || 'G-BC1C3M52TZ'
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
