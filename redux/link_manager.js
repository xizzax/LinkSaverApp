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
    const query = await getDocs(collection(db, state.user));
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
    await addDoc(collection(db, state.user), {
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
    user: null, //we can use the user email to create a collection for each user
    links: [],
    isLoaded: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
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

export const  { setUser } = linkSlice.actions;

export default linkSlice.reducer;
