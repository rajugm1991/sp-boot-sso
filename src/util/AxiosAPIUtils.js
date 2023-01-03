
import React from "react";
import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import axios from "axios";





const requestPost=(url,body,setProgress)=>{
    const headerss = new Headers({
    })

  
  return  axios({
        method: 'post',
        url:url,
        data:body,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        },
        onUploadProgress:(e)=>{
            setProgress(Math.round((100*e.loaded)/e.total));
      }
    });
}


export function axiosPostFormDataRequest(url,formData,setProgress){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return requestPost(
        API_BASE_URL + url,
        formData,
        setProgress
    );
}

