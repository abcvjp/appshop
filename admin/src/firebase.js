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

export const uploadProductImages = async (images) => {
  try {
    const getDownloadURLs = [];
    const promises = [];
    images.forEach((image, index) => {
      const uploadTask = firebase.storage().ref().child(`/product-images/${image.name}`).put(image.file);
      promises.push(uploadTask);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload image ${index} is ${progress}% done`);
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log(`Upload image ${index} is paused`);
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log(`Upload image ${index} is running`);
              break;
            default:
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

              // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
            default:
              break;
          }
          throw error;
        },
        () => {
          getDownloadURLs[index] = uploadTask.snapshot.ref.getDownloadURL();
        }
      );
    });
    await Promise.all(promises);
    const downloadURLs = await Promise.all(getDownloadURLs);
    return downloadURLs;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
