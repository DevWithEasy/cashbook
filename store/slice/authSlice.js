import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth : false,
        user:{},
        random : 0
    },
    reducers: {
        login:(state,action)=>{
            state.isAuth = true
            state.user = action.payload
        },
        reload:(state,action)=>{
            state.random = action.payload
        },
        logout:(state,action)=>{
            state.isAuth = false
            state.user = {}
        },
    }
})
export const {login, logout,reload} = authSlice.actions
export default authSlice.reducer
