import { CloudSyncOutlined } from "@ant-design/icons";
import React from "react";


const StripeCancel=()=>{


    return (

        <div className="row text-center">
        <div className="col-md-9">
          <CloudSyncOutlined  className="display-1 text-danger p-5" />
          <p className="lead">Payment failed. Try again.</p>
        </div>
        <div className="col-md-3"></div>
      </div>
    )
}


export default StripeCancel;