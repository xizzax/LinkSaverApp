//this file has the slices and stuff
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  setDoc,
  arrayUnion,
} from 'firebase/firestore';

//getting the firebase config
import {app} from '../firebase/config';
import { getAuth } from 'firebase/auth';

const db = getFirestore(app);
const auth = getAuth();

// const linksDB = collection(db, "links");

export const getLinksFromFireStore = createAsyncThunk(
  'links/getLinksFromFireStore',
  async () => {
    //current user's email
    const userEmail = auth.currentUser.email;

    //getting the user's document
    const docRef = doc(db, 'users', userEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      const links = docSnap.data().links;
      return links;
    } else {
      // doc.data() will be undefined in this case
      console.warn('No such document!');
    }
    // const query = await getDocs(collection(db, 'users'));
    // let links = [];
    // query.forEach(doc => {
    //   links.push(doc.data());
    // });
    // return links;
  },
);

export const addLinkAction = createAsyncThunk(
  'links/addLinkAction',
  async linkObj => {
    // getting the current user's email
    const userEmail = auth.currentUser.email;
    // console.log(userEmail);
    const docRef = doc(db, 'users', userEmail.toString());
    // console.log(docRef);
    await setDoc(docRef, {
      links: arrayUnion(linkObj),
    }, {merge: true});
    console.log('Document written with ID: ', docRef.id);
    // await setDoc(doc(db, 'users', userEmail), {
    //   name: linkObj.name,
    //   link: linkObj.link,
    //   key: linkObj.key,
    // });
    return linkObj;
  },
);

export const linkSlice = createSlice({
  name: 'links', // name of the slice
  initialState: {
    // the initial state
    user: null, //storing the user email
    links: [],
    isLoaded: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.log(state.user);
    },
    removeUser:(state)=>{
      state.user = null;
    }
  },
  extraReducers: {
    [getLinksFromFireStore.fulfilled]: (state, action) => {
      state.links = action.payload;
      state.isLoaded = true;
    },
    [addLinkAction.fulfilled]: (state, action) => {
      state.links.push(action.payload);
      getLinksFromFireStore();
    },
  },
});

export const {setUser} = linkSlice.actions;

export default linkSlice.reducer;
