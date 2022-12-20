import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { ACCESS_TOKEN } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import { connect } from 'react-redux';
import {fetchCurrentlyLoadedUser} from '../store/auth-action';
import {authActions} from '../store/auth-slice'
import Dashboard from '../components/user/Dashboard';
import BecomeInstructor from '../components/instructor/BecomeInstructor';
import stripeCallback from '../components/stripe/callback';
import "../public/css/style.css";
import InstructorIndex from '../components/instructor/create';

//todo
import "bootstrap/dist/css/bootstrap.min.css";
import CreateCourse from '../components/instructor/create/create';



class App extends Component {

  constructor(props){
    super(props);
    this.handleLogout=this.handleLogout.bind(this);
  }
  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.props.handleLogout();
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.props.loadCurrentlyLoggedInUser();
  }

  render() {
    if(this.props.loading) {
      return <LoadingIndicator />
    }

    return (
      <div className='app'>
        <div className="app-top-box">
          <AppHeader authenticated={this.props.authenticated} onLogout={this.handleLogout} />
        </div>
        <div className='app-body'>
          <Switch>
            <Route exact path="/" component={Home}></Route>   
            <PrivateRoute path="/profile" authenticated={this.props.authenticated} currentUser={this.props.currentUser}
              component={Profile}></PrivateRoute>
             <PrivateRoute path="/user/dashboard" authenticated={ this.props.authenticated} component={Dashboard} /> 
             <PrivateRoute path="/user/becomeinstructor" authenticated={ this.props.authenticated} component={BecomeInstructor} /> 
             <PrivateRoute path="/stripe/callback" authenticated={this.props.authenticated} component={stripeCallback}/>
             <PrivateRoute path="/user/instructor/course/create" authenticated={this.props.authenticated} component={CreateCourse}/>
             <PrivateRoute path="/user/instructor" authenticated={this.props.authenticated} component={InstructorIndex} />
            <Route path="/login"
              render={(props) => <Login authenticated={this.props.authenticated} onLogin={this.props.loadCurrentlyLoggedInUser} {...props} />}></Route>
            <Route path="/signup"
              render={(props) => <Signup authenticated={this.props.authenticated} {...props} />}></Route>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>  
            <Route component={NotFound}></Route>
          </Switch>
        <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
          </div>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    currentUser: state.auth.currentUser,
    authenticated: state.auth.authenticated,
    loading: state.auth.loading
  };

}

const mapDispatchToProps=(dispatch)=>{
  return {
    loadCurrentlyLoggedInUser:()=>dispatch(fetchCurrentlyLoadedUser()),
    handleLogout:()=>dispatch(authActions.handleLogout())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
