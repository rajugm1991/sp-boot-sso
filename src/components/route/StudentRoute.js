import { Fragment, useEffect, useState } from "react";
import React from "react";
import { SyncOutlined } from "@ant-design/icons";

const StudentRoute = ({ children, showNav = true }) => {
  // state
  const [ok, setOk] = useState(false);
  // router

  useEffect(() => {
    setOk(true)
  }, []);



  return (
    <Fragment>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <div className="container-fluid">{children}</div>
      )}
    </Fragment>
  );
};

export default StudentRoute;