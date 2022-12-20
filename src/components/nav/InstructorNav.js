import { useState, useEffect } from "react";
import React from "react";
import Link from "antd/es/typography/Link";

const InstructorNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills">
      <Link href="/user/instructor">
        <a className={`nav-link ${current === "/user/instructor" && "active"}`}>
          Dashboard
        </a>
      </Link>
      <Link href="/user/instructor/course/create">
        <a
          className={`nav-link ${
            current === "/user/instructor/course/create" && "active"
          }`}
        >
          Course Create
        </a>
      </Link>
    </div>
  );
};

export default InstructorNav;