import {initializeAuth} from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {getReactNativePersistence} from 'firebase/auth';
import firebase from 'firebase/compat';
import * as React from 'react';
import 'firebase/compat/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
firebase.firestore().settings({timestampsInSnapshots: true});
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default firebase;

