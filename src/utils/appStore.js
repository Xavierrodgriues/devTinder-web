/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice";
import FeedReducer from "../utils/feedSlice";


const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: FeedReducer
    }
});

export default appStore;