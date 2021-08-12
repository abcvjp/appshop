import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDqoLUYQhW7NlH57EfBO63D4KRqi3IgE78',
  authDomain: 'webshop-e2f76.firebaseapp.com',
  projectId: 'webshop-e2f76',
  storageBucket: 'webshop-e2f76.appspot.com',
  messagingSenderId: '1057783220542',
  appId: '1:1057783220542:web:14904508fb92f27adcc46f',
  measurementId: 'G-BC1C3M52TZ'
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
