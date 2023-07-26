import { CarryOutOutlined, CoffeeOutlined, LogoutOutlined, TeamOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';


const { Item, SubMenu } = Menu;

const Search=()=>{

    return(
      
        <div className="">
          <input
            className="m-1 p-2 w-80 h-10 border border-gray-100 rounded-r-lg bg-gray-100"
            placeholder="🔍 Search"
           ></input>
         <button className='bg-slate-100 m-2 p-2 rounded-lg'>Search</button>
        </div>
      
    )
}


const Logo = () => {
    return (
      <div className="">
       <Link to={'/'}> <img
          alt="linkedin"
          className="h-14 "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGIkr1yzfRvazNCCECkX7i7P3SL2K7cyi_2g&usqp=CAU"
        ></img></Link>
      </div>
    );
  };

const AppHeader = (props) => {

    const user = useSelector(state => state.auth)

    return (

        <header className="bg-white border-t flex w-full justify-center p-1 shadow-md sticky top-0" >
                <div className="app-branding">
                    <Link to="/" className="app-title"><Logo/></Link>
                </div>
                <Search/>
               
                <div className="app-options">

                    {props.authenticated ? (

                        <Menu key={user.currentUser.id}>
                            <SubMenu key={user.currentUser.id} icon={<CoffeeOutlined />} title={user.currentUser.name} className="float-right">
                                <Item key='profile'>
                                    <NavLink to='/profile'>
                                        Profile
                                    </NavLink>
                                </Item>
                                <Item key='/dashboard'>
                                    <NavLink to='/user/dashboard'>
                                        Admin Dashboard
                                    </NavLink>

                                </Item>

                                <Item key='/student'>
                                    <NavLink to='/user/student/course/dashboard'>
                                        Student Dashboard
                                    </NavLink>

                                </Item>

                                {user.currentUser.adminUser ? <Item key='create_course' icon={<CarryOutOutlined />} className="float-right">
                                    <NavLink to='/user/createinstructor'>
                                        Create Course
                                    </NavLink>
                                </Item> :
                                    <Item key='Become_instructor' icon={<TeamOutlined />} className="float-right">
                                        <NavLink to='/user/becomeinstructor'>
                                            Become instructor
                                        </NavLink>
                                    </Item>
                                }
                                <Item key='logout' onClick={props.onLogout} icon={<LogoutOutlined />} className="float-right">
                                    Logout
                                </Item>

                            </SubMenu>
                        </Menu>

                    ) : (
                        <nav className="app-nav">
                            <ul>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/signup">Signup</NavLink>
                                </li>
                            </ul>
                        </nav>)}

                </div>
           
        </header>
    )

}



export default AppHeader;