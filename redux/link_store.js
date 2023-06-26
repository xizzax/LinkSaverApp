import { configureStore } from "@reduxjs/toolkit";
import linkReducer from './link_manager';

export default configureStore({
    reducer: {
        links: linkReducer
    }
})