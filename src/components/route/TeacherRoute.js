import { SyncOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getRequest } from "../../util/APIUtils";

const TeacherRoute = ({children}) => {
  const history = useHistory();

  const [ok, setOk] = useState(false);

  useEffect(() => {
    fetchInstructor();
  }, []);

  const fetchInstructor = async () => {
    try {
      await getRequest("/user/teacher/me");
      setOk(true);
    } catch (err) {
      setOk(false);
      history.push("/");
    }
  };

  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <div className="test">{children}</div>
      )}
    </>
  );
};

export default TeacherRoute;
