import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authActions } from "../../store/auth-slice";
import { useDispatch } from "react-redux";

const AntSideBar = ({collapsed,setCollapsed,items}) => {

    let history = useHistory();
    const dispatch = useDispatch();

    const onClick = (e) => {
        console.log("click ", e);
        if (e.key !== "/logout") {
          history.push(e.key);
        }
        if (e.key === "/logout") {
            dispatch(authActions.handleLogout())
            history.push('/login');
        };
      };

  return (
    <>
      <Sider
        width={220}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            color: "white",
          }}
        >
          <h5
            onClick={() => {
              history.push("/");
            }}
          >
            Admin
          </h5>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={onClick}
        />
      </Sider>
    </>
  );
};

export default AntSideBar;
