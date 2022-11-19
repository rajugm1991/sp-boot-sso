import React from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchCurrentlyLoadedUser } from "./store/auth-action"



const Dummy=(props)=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchCurrentlyLoadedUser())
    },[])

    return (
        <div>
            
        </div>
    ) 
}

export default Dummy;