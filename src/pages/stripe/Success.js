import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { API_COURSE_PAID_STRIPE_CALL_BACK } from "../../constants/URLConstants";
import { postRequest } from "../../util/APIUtils";



const StripeSuccess=()=>{

    const {id}=useParams();

    console.log('id---'+id)

    const history=useHistory();

    useEffect(()=>{
        postRequest(API_COURSE_PAID_STRIPE_CALL_BACK,{courseId:id}).then(()=>{
            history.push({
                pathname:'/learn/'+id,
                state:{
                    id:id,
                    type:'COURSE_VIEW'
                }
            })
        }).catch((er)=>{

        })
    },[id])

    return(
       <h1></h1>
    )
    
}

export default StripeSuccess;