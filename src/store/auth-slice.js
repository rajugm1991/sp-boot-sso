import { createSlice } from "@reduxjs/toolkit"


const INITIALSTATE={
    currentUser:{

    },
    authenticated:false,
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
            state.currentUser={};
            state.authenticated=false;
            state.loading=false;
        }

    }
})

export const authActions=authSlice.actions;
export default authSlice.reducer;