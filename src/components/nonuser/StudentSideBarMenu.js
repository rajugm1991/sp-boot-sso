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

    let history=useHistory();

    const dispatch=useDispatch();

    const widgetMenu = (
      <Menu mode="horizontal" theme="light" className="flex-setting" style={{display:'block'}}>
      <SubMenu icon={<UserOutlined />} title={user.currentUser.name} key={user.currentUser.id} style={{float:'right'}} >
          <Menu.Item>
  <SolutionOutlined className="icon" style={{minWidth:'25px'}} />
  Profile
  </Menu.Item>
  <Menu.Item>
  <LockOutlined className="icon" style={{minWidth:'25px'}} />
              <a href={() => false}  onClick={()=>dispatch(authActions.handleLogout())}>Signout</a>
  </Menu.Item>
  <Menu.Item>
  <TranslationOutlined className="icon" style={{minWidth:'25px'}}/>
  change language
  </Menu.Item>
  <Menu.Item>
  <PoweroffOutlined className="icon"  style={{minWidth:'25px'}}/>
  sign out
  </Menu.Item>
      </SubMenu>
    </Menu>
    );

    const onClick= (e) => {
        console.log('click ', e);
        if(e.key!=='/logout'){
        history.push(e.key);
        }
        if(e.key==='/logout')
        dispatch(authActions.handleLogout());
      };
    return (
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <Sider     collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div
          style={{
            height: 32,
            margin: 16,
            color:'white'
          }}
        >
          <h5 onClick={()=>{history.push('/')}}>{user.currentUser.name}</h5>
          </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onClick}/>
          </Sider>
          <Layout className="site-layout">
          <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
 <div className="logo" />
         {widgetMenu}
          </Header>
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
  