

import { LockOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import SubMenu from 'antd/es/menu/SubMenu'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/auth-slice'

const WidgetMenu = () => {
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();

  return (
    <>
     <Menu
      mode="horizontal"
      theme="light"
      className="flex-setting"
      style={{ display: "block" }}
    >
      <SubMenu
        icon={<UserOutlined />}
        title={user.currentUser.name}
        key={user.currentUser.id}
        style={{ float: "right" }}
      >
        <Menu.Item>
          <SolutionOutlined className="icon" style={{ minWidth: "25px" }} />
          Profile
        </Menu.Item>
        <Menu.Item>
          <LockOutlined className="icon" style={{ minWidth: "25px" }} />
          <a
            href={() => false}
            onClick={() => dispatch(authActions.handleLogout())}
          >
            Signout
          </a>
        </Menu.Item>
      </SubMenu>
    </Menu>
    </>
  )
}

export default WidgetMenu