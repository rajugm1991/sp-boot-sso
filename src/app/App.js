import "antd/dist/reset.css";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch
} from 'react-router-dom';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-default.css';
import AppHeader from '../common/AppHeader';
import LoadingIndicator from '../common/LoadingIndicator';
import NotFound from '../common/NotFound';
import PrivateRoute from '../common/PrivateRoute';
import BecomeInstructor from '../components/instructor/BecomeInstructor';
import stripeCallback from '../components/stripe/callback';
import Dashboard from '../components/user/Dashboard';
import { ACCESS_TOKEN } from '../constants';
import Home from '../home/Home';
import "../public/css/style.css";
import { fetchCurrentlyLoadedUser } from '../store/auth-action';
import { authActions } from '../store/auth-slice';
import Login from '../user/login/Login';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import Profile from '../user/profile/Profile';
import Signup from '../user/signup/Signup';
import './App.css';

//todo
import "bootstrap/dist/css/bootstrap.min.css";
import SideBarMenu from '../components/nav/SideBarManu';
import SingleCourse from "../pages/nonuser/course/SingleCourseView";
import StripeCancel from "../pages/stripe/Cancel";
import StripeSuccess from "../pages/stripe/Success";
import StudentSideBarMenu from "../components/nonuser/StudentSideBarMenu";
import UserCourseView from "../pages/nonuser/course/UserCourseViewPage";



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
     <React.Fragment>
          {!this.props.authenticated && <AppHeader authenticated={this.props.authenticated} onLogout={this.handleLogout} /> }
          <Switch>
            <Route exact path="/" component={Home}></Route>   
            <PrivateRoute path="/profile" authenticated={this.props.authenticated} currentUser={this.props.currentUser}
              component={Profile}></PrivateRoute>
              <PrivateRoute exact path="/user/courseView" authenticated={this.props.authenticated}  component={SingleCourse}/>


              <PrivateRoute exact path="/user/user-course/:id" authenticated={this.props.authenticated}  component={UserCourseView}/>

             <PrivateRoute path="/user/dashboard" authenticated={ this.props.authenticated} component={Dashboard} /> 
             <PrivateRoute path="/user/becomeinstructor" authenticated={ this.props.authenticated} component={BecomeInstructor} /> 
             <PrivateRoute path="/stripe/callback" authenticated={this.props.authenticated} component={stripeCallback}/>
             <PrivateRoute path="/stripe/cancel" authenticated={this.props.authenticated} component={StripeCancel}/>
             <PrivateRoute exact path="/stripe/success/:id" authenticated={this.props.authenticated} component={StripeSuccess}/>
             {/* <PrivateRoute path="/user/instructor/course/create" authenticated={this.props.authenticated} component={CreateCourse}/> */}
             <PrivateRoute path="/user/instructor" authenticated={this.props.authenticated} component={SideBarMenu} />
             <PrivateRoute path="/user/student/course" authenticated={this.props.authenticated} component={StudentSideBarMenu} />

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
      </React.Fragment>
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
