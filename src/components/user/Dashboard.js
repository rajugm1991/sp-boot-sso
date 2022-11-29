import React, {  Fragment } from "react";
import SideBarMenu from "../nav/SideBarManu";


const Dashboard =(props)=>{

    return (
       <div className="container-fluid">
        <div className="row">
         <div className="col-md-2">
            <SideBarMenu/>
         </div>
         <div></div>
        </div>
       </div>

    )
}

export default Dashboard;