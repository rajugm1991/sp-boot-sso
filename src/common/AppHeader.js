import { CoffeeOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';


const  {Item,SubMenu}  =Menu;

const AppHeader =(props)=>{

    const user =useSelector(state=> state.auth)

    return (

        <header className="app-header">
        <div className="container">
            <div className="app-branding">
                <Link to="/" className="app-title">Spring Social</Link>
            </div>
            <div className="app-options">
                
                        { props.authenticated ? (

                          <Menu key={user.currentUser.id}>
                            <SubMenu key={user.currentUser.id} icon={ <CoffeeOutlined/>} title={user.currentUser.name} className="float-right">
                                 <Item key='profile'>
                                <NavLink to='/profile'>
                                Profile
                                </NavLink> 
                                </Item> 
                                <Item key='/dashboard'>
                                    <NavLink to='/dashboard'>
                                     Dashboard
                                    </NavLink>

                                </Item>
                                <Item key='logout' onClick={props.onLogout} icon={<LogoutOutlined/>} className="float-right">
                                    Logout
                                </Item>
                            </SubMenu>
                            </Menu>
                         
                        ): (
                            <nav className="app-nav">
                            <ul>
                                <li>
                                    <NavLink to="/login">Login</NavLink>        
                                </li>
                                <li>
                                    <NavLink to="/signup">Signup</NavLink>        
                                </li>
                            </ul>
                            </nav> )}
               
            </div>
        </div>
    </header>
    )

}



export default AppHeader;