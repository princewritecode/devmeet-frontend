import { configureStore } from "@reduxjs/toolkit";
import feedReducer from './feedslice';
import userReducer from './userslice';
import connectionReducer from './connectionSlice';
import requestReducer from './requestSlice';
const appStore = configureStore({
    reducer: {
        userStore: userReducer,
        feedUsers: feedReducer,
        connections: connectionReducer,
        request: requestReducer
    }
});

export default appStore;