import {
  CarryOutOutlined,
  CoffeeOutlined,
  LogoutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "./AppHeader.css";

const { Item, SubMenu } = Menu;

const Search = () => {
  return (
    <div className="">
      <input
        className="m-1 p-2 w-80 h-10 border border-purple-500  rounded-full bg-white shadow-lg"
        placeholder="🔍 Search"
      ></input>
      <button class="m-1 px-3 h-10 bg-blue-100 hover:bg-purple-200 text-purple-800 font-normal border border-purple-700 rounded">
                    Search
                  </button>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="m-1">
      <Link to={"/"}>
        {" "}
        <img
          alt="linkedin"
          className="h-10 "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGIkr1yzfRvazNCCECkX7i7P3SL2K7cyi_2g&usqp=CAU"
        ></img>
      </Link>
    </div>
  );
};

const AppHeader = (props) => {
  const user = useSelector((state) => state.auth);

  return (
    <header className=" bg-white border-t  w-full p-1 pl-[10rem] shadow-md fixed top-0  ">
      <div className="app-branding flex flex-row px-32 ">
        <Link to="/" className="app-title">
          <Logo />
        </Link>
        <Search />
      </div>
    
      

      <div className="m-1 pr-[10rem] absolute top-0 right-0">
        {(props.authenticated || user.authenticated) ? (
          <Menu key={user.currentUser.id}>
            <SubMenu
              key={user.currentUser.id}
              icon={<CoffeeOutlined />}
              title={user.currentUser.name}
              className="float-right"
            >
              <Item key="profile">
                <NavLink to="/profile">Profile</NavLink>
              </Item>
              <Item key="/dashboard">
                <NavLink to="/user/dashboard">Admin Dashboard</NavLink>
              </Item>

              <Item key="/student">
                <NavLink to="/user/student/course/dashboard">
                  Student Dashboard
                </NavLink>
              </Item>

              {user.currentUser.adminUser ? (
                <Item
                  key="create_course"
                  icon={<CarryOutOutlined />}
                  className="float-right"
                >
                  <NavLink to="/user/createinstructor">Create Course</NavLink>
                </Item>
              ) : (
                <Item
                  key="Become_instructor"
                  icon={<TeamOutlined />}
                  className="float-right"
                >
                  <NavLink to="/user/becomeinstructor">
                    Become instructor
                  </NavLink>
                </Item>
              )}
              <Item
                key="logout"
                onClick={props.onLogout}
                icon={<LogoutOutlined />}
                className="float-right"
              >
                Logout
              </Item>
            </SubMenu>
          </Menu>
        ) : (
          <nav className="app-nav">
            <Link to="/login">
                  {" "}
                  <button class="m-1 px-3 h-10 bg-purple-100 hover:bg-purple-200 text-purple-800 font-normal border border-purple-700 rounded">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  {" "}
                  <button type="button" class="m-1 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
                    Sign Up
                  </button>

                </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
