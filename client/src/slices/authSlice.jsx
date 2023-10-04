import { createSlice } from "@reduxjs/toolkit";

const initialState ={userInfo: localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")): null}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        saveCredentials: (state,action)=>{
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));

            const expirationTime = new Date().getTime() + 10*24*60*60*1000;
            localStorage.setItem("expirationTime", expirationTime);
        },
        logout: (state,action)=>{
            state.userInfo = null;
            localStorage.clear();
        }
    }
})

export const {saveCredentials, logout} = authSlice.actions;

export default authSlice.reducer;