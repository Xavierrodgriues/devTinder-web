/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice";
import FeedReducer from "../utils/feedSlice";
import connectionReducer from "../utils/connectionSlice";
import requestReducer from "../utils/requestSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: FeedReducer,
        connections: connectionReducer,
        request: requestReducer
    }
});

export default appStore;