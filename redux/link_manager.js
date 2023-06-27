//this file has the slices and stuff
import { createSlice } from "@reduxjs/toolkit";

import { getFirestore, collection, doc, addDoc } from "firebase/firestore";

//getting the firebase config
import { app } from "../firebase/config";

const db = getFirestore(app);

// const linksDB = collection(db, "links");

export const linkSlice = createSlice({
    name: "links", // name of the slice
    initialState: { // the initial state
        links: [ // we're storing our links as an array of js objects
            {
                name: "Google",
                link: "https://www.google.com",
                key: "https://www.google.com"
            }
        ]
    },
    reducers:{
        addLinkAction: (state, action)=>{
            state.links.push(action.payload) // adding the links to the top
            addDoc(doc(db, "links"),{
                name: action.payload.name,
                link: action.payload.link,
                key: action.payload.key
            });
            console.log("success");
        }
    }
})

export const { addLinkAction } = linkSlice.actions;

export default linkSlice.reducer;