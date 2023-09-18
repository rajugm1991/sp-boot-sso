
import { notification,Typography } from "antd";
import React from "react";
import img from "../public/images/notify.svg";
const { Text } = Typography;



export function Notification (message){
 return notification.open({
        message: <Text strong ><img src={img}/>{"   "} Notification</Text>,
        description:
        message,
        
      });
}
