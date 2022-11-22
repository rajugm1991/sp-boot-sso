import { getCurrentUser } from "../util/APIUtils";
import {authActions} from "./auth-slice";


export const fetchCurrentlyLoadedUser=()=>{
    console.log('raju')
    return async dispatch=>{
        try{
            const userData=await getCurrentUser();
            dispatch(authActions.loadCurrentlyLoggedInUser(
                {
                    currentUser:userData,
                    authenticated:true,
                    loading:false
                }
            ))
        }catch(error){
            dispatch(authActions.handleLogout());
        }
    }
}