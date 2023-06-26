//this file has the slices and stuff
import { createSlice } from "@reduxjs/toolkit";

export const linkSlice = createSlice({
    name: "links", // name of the slice
    initialState: { // the initial state
        links: [ // we're storing our links as an array of js objects
            {
                name: "Google",
                link: "https://www.google.com"
            }
        ]
    },
    reducers:{
        addLink: (linkObj)=>{
            links = [linkObj, ...links] // adding the links to the top
        }
    }
})

export const addLink = linkSlice.actions;

export default linkSlice.reducer;