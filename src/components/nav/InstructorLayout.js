import React, { useState } from "react";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useSelector } from "react-redux";
import PrivateRoute from "../../common/PrivateRoute";
import AntSideBar from "./AntSideBar";
import AntHeader from "./AntHeader";
import AntFooter from "./AntFooter";
import TeacherRoute from "../route/TeacherRoute";
import Dashboard from "../teacher/Dashboard";
import ManageCourse from "../teacher/ManageCourse";
import CommonBodyLayout from "./CommonBodyLayout";
import CreateCourse from "../instructor/create/CreateCourse";
import CourseView from "../public/CourseView";
import CourseLessonForm from "../course_lesson/CourseLessonAdd";
import CourseList from "../public/CourseList";
import InstructorIndex from "../instructor/create";
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
  getItem("Logout", "/logout", <FileOutlined />),
];


const InstructorLayout = (props) => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
  
  const user = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);

  return( 
    <TeacherRoute>
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
           
           <CommonBodyLayout/>

            </div>
          </Content>
         <AntFooter/>
        </Layout>
      </Layout>
    </TeacherRoute>
  
   );
};

export default InstructorLayout;
