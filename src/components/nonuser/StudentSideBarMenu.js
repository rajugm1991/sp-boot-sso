import React, { useState } from 'react';

import {
  DesktopOutlined,
  FileOutlined,
  LockOutlined,
  PieChartOutlined,
  PoweroffOutlined, SolutionOutlined,
  TranslationOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PrivateRoute from '../../common/PrivateRoute';
import { authActions } from '../../store/auth-slice';
import CourseSubscribedList from '../../pages/nonuser/course/CourseSubscribedList';
import StudentDashBoard from './StudentDashboard';
import AntSideBar from '../nav/AntSideBar';
import AntHeader from '../nav/AntHeader';
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
    getItem('Home', '/user/student/course/dashboard', <PieChartOutlined />),
    getItem('Course List', '/user/student/course/list', <DesktopOutlined />),
    getItem('Logout', '/logout', <FileOutlined />),
  ];

  

  const StudentSideBarMenu=(props)=>{
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    const user=useSelector(state=>state.auth);

    const [collapsed, setCollapsed] = useState(false);




    return (
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
           <AntSideBar collapsed={collapsed} setCollapsed={setCollapsed} items={items}/>
          <Layout className="site-layout">
          <AntHeader/>
            <Content
              style={{
                margin: '0 16px'
              }}
            >
              <Breadcrumb
                style={{
                  margin: '16px 0',
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
                <PrivateRoute exact path="/user/student/course/dashboard" authenticated={user.authenticated} component={StudentDashBoard}/>
                <PrivateRoute exact path="/user/student/course/list" authenticated={user.authenticated} component={CourseSubscribedList}/>
              </div>
            </Content>
            <Footer
              style={{
                textAlign: 'center',
              }}
            >
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
       
      );
    };

    export default StudentSideBarMenu;
  