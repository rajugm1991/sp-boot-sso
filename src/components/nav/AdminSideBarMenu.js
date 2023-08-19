import React, { useState } from "react";

import {
  DesktopOutlined,
  FileOutlined,
  LockOutlined,
  PieChartOutlined,
  PoweroffOutlined,
  SolutionOutlined,
  TeamOutlined,
  TranslationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PrivateRoute from "../../common/PrivateRoute";
import { authActions } from "../../store/auth-slice";
import InstructorIndex from "../instructor/create";
import CourseList from "../instructor/create/CourseList";
import CourseView from "../instructor/create/CourseView";
import CreateCourse from "../instructor/create/CreateCourse";
import AdminRoute from "../route/AdminRoute";
import UserRole from "../admin/UserRole";
import UserAdminList from "../admin/UsersAdminList";
import CourseLessonForm from "../course_lesson/CourseLessonAdd";
import WidgetMenu from "./WidgetMenu";
import AntSideBar from "./AntSideBar";
import AntHeader from "./AntHeader";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Home", "/user/instructor/dashboard", <PieChartOutlined />),
  getItem("Course", "/user/instructor/course", <DesktopOutlined />),
  getItem("User-Management", "sub1", <UserOutlined />, [
    getItem("Users", "/user/instructor/users"),
    getItem("Roles", "/user/instructor/roles"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Logout", "/logout", <FileOutlined />),
];

const AdminSideBarMenu = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const user = useSelector((state) => state.auth);

  const [collapsed, setCollapsed] = useState(false);




  return (
    <AdminRoute>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <AntSideBar collapsed={collapsed} setCollapsed={setCollapsed} items={items}/>
        <Layout className="site-layout">
         <AntHeader/>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <PrivateRoute
                exact
                path="/user/instructor/course/edit"
                authenticated={user.authenticated}
                component={CreateCourse}
              />
              <PrivateRoute
                exact
                path="/user/instructor/course/view"
                authenticated={user.authenticated}
                component={CourseView}
              />
              <PrivateRoute
                exact
                path="/user/instructor/course/create"
                authenticated={user.authenticated}
                component={CreateCourse}
              />
              <PrivateRoute
                exact
                path="/user/instructor/lesson/:id"
                authenticated={user.authenticated}
                component={CourseLessonForm}
              />
              <PrivateRoute
                exact
                path="/user/instructor/course"
                authenticated={user.authenticated}
                component={CourseList}
              />
              <PrivateRoute
                path="/user/instructor/dashboard"
                authenticated={user.authenticated}
                component={InstructorIndex}
              />
              <PrivateRoute
                exact
                path="/user/instructor/roles"
                authenticated={user.authenticated}
                component={UserRole}
              />
              <PrivateRoute
                exact
                path="/user/instructor/users"
                authenticated={user.authenticated}
                component={UserAdminList}
              />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </AdminRoute>
  );
};

export default AdminSideBarMenu;
