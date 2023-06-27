import firebase from 'firebase/compat';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAVTgMOWQYKhELSkus3FqcveyrBuKMysOc',
  authDomain: 'link-saver-30e56.firebaseapp.com',
  projectId: 'link-saver-30e56',
  storageBucket: 'link-saver-30e56.appspot.com',
  messagingSenderId: '220934435935',
  appId: '1:220934435935:web:968cbb463143d53c1817ea',
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig); 
firebase.firestore().settings({ timestampsInSnapshots: true })



export default firebase;