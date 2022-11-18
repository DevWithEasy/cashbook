import { combineReducers } from "@reduxjs/toolkit";
import bookSlice  from "./slice/bookSlice";
import authSlice  from "./slice/authSlice";

const rootReducer =combineReducers({
    auth : authSlice,
    book : bookSlice
})

export default rootReducer;
