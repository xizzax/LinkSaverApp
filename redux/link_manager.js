//this file has the slices and stuff
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
} from 'firebase/firestore';

//getting the firebase config
import {app} from '../firebase/config';

const db = getFirestore(app);

// const linksDB = collection(db, "links");

export const getLinksFromFireStore = createAsyncThunk(
  'links/getLinksFromFireStore',
  async () => {
    const query = await getDocs(collection(db, 'links'));
    let links = [];
    query.forEach(doc => {
      links.push(doc.data());
    });
    return links;
  },
);

export const addLinkAction  = createAsyncThunk(
  'links/addLinkAction',
  async (linkObj) =>{
    await addDoc(collection(db, 'links'), {
      name: linkObj.name,
      link: linkObj.link,
      key: linkObj.key,
    });
    return linkObj;
  }
)

export const linkSlice = createSlice({
  name: 'links', // name of the slice
  initialState: {
    // the initial state
    links: [
      // we're storing our links as an array of js objects
      {
        name: 'Google',
        link: 'https://www.google.com',
        key: 'https://www.google.com',
      },
    ],
    isLoaded: false,
  },
  reducers: {
    // addLinkAction: async (state, action) => {
    //   // state.links.push(action.payload) // adding the links to the top
    //   await addDoc(collection(db, 'links'), {
    //     name: action.payload.name,
    //     link: action.payload.link,
    //     key: action.payload.key,
    //   });
    //   console.log('success');
    // },
    // updateLinksAction: state => {
    //     //moved all this code to the thunk
    // //   try {
    // //     const query = await getDocs(collection(db, 'links'));
    // //     let links = [];
    // //     query.forEach(doc => {
    // //       links.push(doc.data());
    // //     });
    // //     state.links = links;
    // //     isLoaded = true;
    // //   } catch (error) {
    // //     console.log(error);
    // //   }

    // },
  },
  extraReducers: {
    [getLinksFromFireStore.fulfilled]: (state, action) => {
      state.links = action.payload;
      state.isLoaded = true;
    },
    [addLinkAction.fulfilled]:(state, action)=>{
      state.links.push(action.payload);
      getLinksFromFireStore()
    }
  },
});

// export const {addLinkAction} = linkSlice.actions;

export default linkSlice.reducer;
