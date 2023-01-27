import React,{Component} from "react";
import { connect } from "react-redux";
import { ACCESS_TOKEN } from "../../constants";
import { fetchCurrentlyLoadedUser } from "../../store/auth-action";
import { login } from '../../util/APIUtils';
import Alert from 'react-s-alert';
import { SyncOutlined } from "@ant-design/icons";
import { Notification } from "../../common/Notification";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formLoading:false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
    }

    handleSubmit(event) {
        this.setState({formLoading:true});
        event.preventDefault();   
        const loginRequest = Object.assign({}, this.state);
        login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            Notification("You're successfully logged in!");
            this.props.loadCurrentlyLoggedInUser();
            this.setState({formLoading:false});
            this.props.history.push("/");
        }).catch(error => {
            this.setState({formLoading:false});
            Alert.error((error && error.error) || 'Oops! Something went wrong. Please try again!');
        });
        
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="email" name="email" 
                        className="form-control" placeholder="Email"
                        value={this.state.email} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="password" name="password" 
                        className="form-control" placeholder="Password"
                        value={this.state.password} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary" disabled={this.state.formLoading}>
                        {this.state.formLoading ? <SyncOutlined spin/> :'Login'}
                        </button>
                </div>
            </form>                    
        );
    }
}
  
const mapDispatchToProps=(dispatch)=>{
    return {
        loadCurrentlyLoggedInUser:()=>dispatch(fetchCurrentlyLoadedUser()),
    }
}

export default connect(null,mapDispatchToProps)(LoginForm);