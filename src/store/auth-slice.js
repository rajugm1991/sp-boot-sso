import { createSlice } from "@reduxjs/toolkit"
import { ACCESS_TOKEN } from "../constants";


const INITIALSTATE={
    currentUser:{

    },
    authenticated:(localStorage.getItem('accessToken')!==''),
    loading:false
}

const authSlice=createSlice({
    name:'auth',
    initialState:INITIALSTATE,
    reducers:{
        loadCurrentlyLoggedInUser(state,action){
            state.currentUser=action.payload.currentUser;
            state.authenticated=action.payload.authenticated;
            state.loading=action.payload.loading;
        },
        handleLogout(state,action){
            localStorage.removeItem(ACCESS_TOKEN);
            state.currentUser={};
            state.authenticated=false;
            state.loading=false;
        }

    }
})

export const authActions=authSlice.actions;
export default authSlice.reducer;