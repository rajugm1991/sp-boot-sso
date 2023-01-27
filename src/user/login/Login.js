import React, { Component } from 'react';
import './Login.css';
import { Link, Redirect } from 'react-router-dom'
import SocialLogin from './SocialLogin';
import Alert from 'react-s-alert';
import LoginForm from './LoginForm';
import { notification,Typography } from 'antd';
import { Notification } from '../../common/Notification';


class Login extends Component {
 
    constructor(props){
        super(props)
        this.props.onLogin()
    }

  
    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                Notification(this.props.location.state.error);
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }
    
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <div className="login-container">
                <div className="login-content">
                    <h1 className="login-title" onClick={()=>this.props.history.push('/')}>Login to SpringSocial</h1>
                    <SocialLogin />
                    <div className="or-separator">
                        <span className="or-text">OR</span>
                    </div>
                    <LoginForm {...this.props} />
                    <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>
                </div>
            </div>
        );
    }
}


export default Login
