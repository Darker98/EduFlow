import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import { roomSlice } from "./features/roomSlice";
import { loadingSlice } from "./features/loadingSlice";
import { sessionSlice } from "./features/sessionSlice";
import { assignmentSlice } from "./features/assignmentSlice";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootReducer = combineReducers ({
    user: userSlice.reducer,
    loading: loadingSlice.reducer,
    room: roomSlice.reducer,
    session: sessionSlice.reducer,
    assignment: assignmentSlice.reducer
})

const persistConfig = {
    key:'root',
    storage,
    version:1
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }), 
});

export const persistor = persistStore(store);