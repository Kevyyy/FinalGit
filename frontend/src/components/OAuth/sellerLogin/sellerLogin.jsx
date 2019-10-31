import React, { Component } from 'react';
import './sellerLogin.css'
var validator = require("email-validator");


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        }
    }
    componentDidMount() {
        fetch('')
    }
    onChange = (e) => {
          this.setState({
            [e.target.name]: e.target.value});
        }
    handleSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state;
        fetch('/login-seller', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            })
          }).then(this.props.history.push('/seller'))
          .then(window.location.reload())
       
    }
    render() {
        return (
        <div id="wrapperLoginSeller">
            <div id='titleWrappersellerLogin'>
                <a id='titlesellerLogin'>Welcome back to flavorhub</a>
            </div>
            <form onSubmit={this.handleSubmit}>
                <div >
                    <label id="labelLoginSeller">Email</label>
                    <input 
                    type="text" 
                    class="form-control" 
                    name="username"
                    id="usernameLoginSeller"
                    onChange={e => this.onChange(e)} />
                </div>
                <div>
                    <label id="labelLoginSeller">Password</label>
                    <input 
                    name="myname" 
                    type="text" 
                    class="form-control"
                    name="password"
                    id="usernameLoginSeller"
                    onChange={e => this.onChange(e)}/>
                </div>
                <div>
                    <input 
                    type="hidden" 
                    name="csrf" />
                </div>
                <div>
                </div>
                <div id='buttonWrapperSellerLogin'>
                <button type="submit" id="buttonLoginSeller"class="">Login</button>
                </div>
            </form>
        </div>);
    }
}

export default Login;