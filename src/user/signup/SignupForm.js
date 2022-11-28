import React,{Component} from "react";
import './Signup.css';
import { signup } from '../../util/APIUtils';
import Alert from 'react-s-alert';
import {SyncOutlined} from '@ant-design/icons'

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            formLoading: false,
        }
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
        event.preventDefault();   
     this.setState({
        formLoading:true
     })
        const signUpRequest = Object.assign({}, this.state);
        signup(signUpRequest)
        .then(response => {
            Alert.success("You're successfully registered. Please login to continue!");
            this.setState({
                formLoading:false
             })
            this.props.history.push("/login");
        }).catch(error => {
            Alert.error((error && error.error) || 'Oops! Something went wrong. Please try again!');     
            this.setState({
                formLoading:false
             })       
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="text" name="name" 
                        className="form-control" placeholder="Name"
                        value={this.state.name} onChange={this.handleInputChange} required/>
                </div>
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
                    <button type="submit" disabled={this.state.formLoading} className="btn btn-block btn-primary" >
                        {this.state.formLoading ? <SyncOutlined spin/>:' Sign Up'}
                       </button>
                </div>
            </form>                    

        );
    }
}

export default SignupForm;