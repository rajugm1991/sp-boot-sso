import { SyncOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getRequest } from "../../util/APIUtils";


const AdminRoute = ({children})=>{

    const history=useHistory();

    const [ok,setOk]=useState(false);

    useEffect(()=>{
        fetchInstructor();
    },[])


    const fetchInstructor=async ()=>{

        try{
            await getRequest('/user/admin/me');
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
            // <div className="container-fluid">
            //   <div className="row">
            //     <div className="col-md-2">
            //       <InstructorNav />
            //     </div>
                <div className="test">{children}</div>
            //   </div>
            // </div>
          )}
        </React.Fragment>
      );

}

export default AdminRoute; 