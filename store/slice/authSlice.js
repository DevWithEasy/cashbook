import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth : false,
        user:{},
    },
    reducers: {
        login:(state,action)=>{
            state.isAuth = true
            state.user = action.payload
        },
        logout:(state,action)=>{
            state.isAuth = false
            state.user = {}
        }
    }
})
export const {login, logout} = authSlice.actions
export default authSlice.reducer
