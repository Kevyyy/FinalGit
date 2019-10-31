import React, { Component } from 'react';
import './customerLogin.css'
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors:null
        }
    }
    componentDidMount() {

    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state;
        fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        .then((response)=>{
            if(response!==302){
            this.setState({errors:response})
            }
            if(response==302){
            this.props.history.push('/products')
            window.location.reload()
        }
        })
    }
    ErrorMessaging = ()=>{
        if(!this.state.errors)
        console.log("sdafds",this.state.errors)
        return(
            <div>
                {this.state.error.map((item)=>{
                    return(
                        <div>ef</div>
                    )
                })}
            </div>
        )
    }
    render() {
        
        return (
        <div id="wrapper-customerLogin">
            {this.ErrorMessaging}
            <div id='titleWrapper-customerLogin'>
                <a id='title-customerLogin'>Welcome back to flavorhub</a>
            </div>
            <form onSubmit={this.handleSubmit}>
                <div >
                    <label id="label-customerLogin">Email</label>
                    <input
                        type="text"
                        class="form-control"
                        name="username"
                        id="username-customerLogin"
                        placeholder="youremail@example.com"
                        onChange={e => this.onChange(e)} />
                </div>
                <div>
                    <label id="label-customerLogin">Password</label>
                    <input
                        type="text"
                        class="form-control"
                        name="password"
                        id="password-customerLogin"
                        onChange={e => this.onChange(e)} />
                </div>
                <div>
                    <input
                        type="hidden"
                        name="csrf" />
                </div>
                <div>
                </div>
                <div id="buttonWrapper-customerLogin">
                <button id="loginButton-customerLogin" class="">Login</button>
                </div>
            </form>
        </div>);
    }
}

export default withRouter(Login);