import React, { Component } from 'react';
import './customerSignup.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',

        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { username, password, firstName, lastName } = this.state;
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
            })
        })

    }
    render() {
        return (
            <div id="wrapper-customerSignup">
                <form action="/signup" method="post">

                    <div id="localSignup-container-customerSignup">
                        <div id="names">
                            <div class="name-wrapper-customerSignup">

                                <label>First Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="firstName"
                                    id="inputCustomerSignup"
                                    maxlength="40"
                                    onChange={e => this.onChange(e)} />
                            </div>
                            <div >
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name="lastName"
                                    id="inputCustomerSignup"
                                    maxlength="40"
                                    onChange={e => this.onChange(e)} />
                            </div>
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type="text"
                                class="form-control"
                                name="username"
                                id="inputCustomerSignup"
                                maxlength="40"
                                onChange={e => this.onChange(e)} />
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                class="form-control"
                                name="password"
                                id="inputCustomerSignup"
                                maxlength="100"
                                onChange={e => this.onChange(e)} />
                        </div>
                        <div id="buttonWrapper-customerSignup">
                            <button type="submit" id="buttonLoginSeller-customerSignup" class="btn btn-succcess btn-lg">Signup</button>
                        </div>
                    </div>
                    <div id="checkbox-customerSignup">
                    <input type="checkbox" /> <a id="text-customerSignup">Notify me when products are availble</a> <br />
                    <a href='/signupSeller' id="text-customerSignup">Seller?</a>
                    </div>
                </form>



                <div id="loginDivider-container">
                </div>
                <div id="mediaLogin">
                    <div id="">
                        <input type="button" name="facebookInput" id="facebookButton" onclick="location.href='/addcart/{{this._id}}';" value="Continue with Facebook" />
                        <input type="button" name="gmailInput" id="gmailButton" onclick="location.href='/addcart/{{this._id}}';" value="Continue with google" />
                    </div>
                </div>
            </div >


        );
    }
}

export default Login;