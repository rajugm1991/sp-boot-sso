import { SyncOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getRequest } from "../../util/APIUtils";
import InstructorNav from "../nav/InstructorNav";


const InstructorRoute = ({children})=>{

    const user = useSelector(state => state.auth)

    const history=useHistory();

    const [ok,setOk]=useState(false);

    useEffect(()=>{
        fetchInstructor();
    },[])


    const fetchInstructor=async ()=>{

        try{
            const response=await getRequest('/user/api/stripe/get-active-account');
            setOk(true);
        }catch(err){
            setOk(false);
            history.push("/");
        }
        
    }

    return (
        <React.Fragment>
          {!ok ? (
            <SyncOutlined
              spin
              className="d-flex justify-content-center display-1 text-primary p-5"
            />
          ) : (
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-2">
                  <InstructorNav />
                </div>
                <div className="col-md-10">{children}</div>
              </div>
            </div>
          )}
        </React.Fragment>
      );

}

export default InstructorRoute; 