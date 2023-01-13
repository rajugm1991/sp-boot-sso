import { getCurrentUser } from "../util/APIUtils";
import { authActions } from "./auth-slice";


export const fetchCurrentlyLoadedUser=()=>{
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