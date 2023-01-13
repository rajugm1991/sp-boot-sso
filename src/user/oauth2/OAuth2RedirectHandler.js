import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchCurrentlyLoadedUser } from '../../store/auth-action';

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        // eslint-disable-next-line
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {        
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        if(token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            this.props.loadCurrentlyLoggedInUser();
            return <Redirect to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>; 
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: { 
                    from: this.props.location,
                    error: error 
                }
            }}/>; 
        }
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        loadCurrentlyLoggedInUser:()=>dispatch(fetchCurrentlyLoadedUser())
    }
}
export default  connect(null,mapDispatchToProps)(OAuth2RedirectHandler);