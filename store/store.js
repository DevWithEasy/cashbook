import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import storage from "redux-persist/lib/storage";
import {persistReducer,persistStore} from "redux-persist";
import  rootReducer  from "./rootReducer";

const persistConfig ={
  key : "root",
  storage
}

const persistedReducer = persistReducer (persistConfig,rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck : false}),
    devTools: process.env.NODE_ENV !== 'production'
})
export const persistor = persistStore (store)
export default store;

// .concat(logger)