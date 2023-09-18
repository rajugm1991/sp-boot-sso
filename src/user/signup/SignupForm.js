import React,{Component, Fragment} from "react";
import './Signup.css';
import { signup } from '../../util/APIUtils';
import {SyncOutlined} from '@ant-design/icons'
import { message ,Alert, Space} from "antd";
import { Notification } from "../../common/Notification";

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            formLoading: false,
            error:false,
            errorMessage:'',
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
        formLoading:true,
        error:false
     })
        const signUpRequest = Object.assign({}, this.state);
        signup(signUpRequest)
        .then(response => {
            Notification("You're successfully registered. Please login to continue!");
            this.setState({
                formLoading:false
             })
            this.props.history.push("/login");
        }).catch(error => {
           // message.error(error.message);     
            this.setState({
                formLoading:false,
                error:true,
                errorMessage:error.message
             })       
        });
    }

    render() {
        return (
            <Fragment>
                  <Space direction="vertical" style={{ width: '100%' }}>
            {this.state.error&&  <Alert
      message={this.state.errorMessage}
      type="error"
      showIcon
      closable
    />}
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
                    <input type="password" name="password" pattern=".{6,}"   required title="minimum 6 charcter required!"
                        className="form-control" placeholder="Password"
                        value={this.state.password} onChange={this.handleInputChange} />
                </div>
                <div className="form-item">
                    <button type="submit" disabled={this.state.formLoading} className="btn btn-block btn-primary" >
                        {this.state.formLoading ? <SyncOutlined spin/>:' Sign Up'}
                       </button>
                </div>
            </form>         
            </Space>
            </Fragment>           

        );
    }
}

export default SignupForm;