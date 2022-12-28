import { SyncOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postRequest } from "../../util/APIUtils";



const stripeCallback=()=>{

    const user=useSelector(state=>state.auth);

    const history=useHistory();

    useEffect(()=>{
        if(user.authenticated&& user.currentUser.id){
            postRequest('/user/api/stripe/get-account-status',{userId:user.currentUser.id}).then((res)=>{
                window.location.href="/user/instructor";
            }).catch(err=> history.push("/"));
        }

    },[user])

    return (
        <SyncOutlined spin className="d-flex justify-content-center display-1 text-danger p-5"/>
    )
}

export default stripeCallback;