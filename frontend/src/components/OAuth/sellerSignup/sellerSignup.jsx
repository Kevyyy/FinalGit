import React, { Component } from 'react';
import './sellerSignup.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Signup extends Component {
    constructor(props) {  
        super(props);
        this.state = {
            fistName: '',
            lastName: '',
            username: '',
            password: '',
            businessName: '',
            city: '',
            phoneNumber: '',
            street: '',
            streetNumber: '',
            state: '',
            postCode: '',
            Country: ''
        }
        this.changeHandler = this.changeHandler.bind(this)
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
        const { fistName,
            lastName,
            username,
            password,
            businessName,
            city,
            phoneNumber,
            street,
            streetNumber,
            state,
            postCode,
            Country: Country } = this.state;

        fetch('/login-seller', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fistName: fistName,
                lastName: lastName,
                username: username,
                password: password,
                businessName: businessName,
                city: city,
                phoneNumber: phoneNumber,
                street: street,
                streetNumber: streetNumber,
                state: state,
                postCode: postCode,
                Country: Country
            })
        })

    }
    changeHandler(e) {
        this.Slider.slickGoTo(e)
        }
    render() {
        var settings = {
            dots: null,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows:true,
            accessibility:true,
            arrows:false
        };

        return (
            <div id="wrapper">
                <form action="/distributor_signup" method="post">
                    <Slider ref={slider => (this.slider = slider)} {...settings}>
                        <div id="slide1-SellerSignup">
                            <div id="names">
                                <div class="name-wrapper">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="firstName"
                                        maxlength="40"
                                        onChange={e => this.onChange(e)} />
                                </div>
                                <div class="name-wrapper2">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="lastName"
                                        maxlength="40"
                                        onChange={e => this.onChange(e)} />
                                </div>
                                <div>
                                    <label>Business Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="businessName"
                                        maxlength="40"
                                        onChange={e => this.onChange(e)} />
                                </div>
                                <div>
                                    <label>City</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="city"
                                        maxlength="40"
                                        onChange={e => this.onChange(e)} />
                                </div>
                            </div>
                            <div onClick={()=>this.slider.slickGoTo(1)}>Next</div>
                        </div>
                        <div>
                            <div id="contact">
                                <div class="name-wrapper">
                                    <label>Business Email</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="username"
                                        maxlength="40"
                                        onChange={e => this.onChange(e)} />
                                </div>
                                <div>
                                    <label>Business Number</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="phoneNumber"
                                        maxlength="40"
                                        onChange={e => this.onChange(e)} />
                                </div>
                            </div>
                            <div onClick={()=>this.slider.slickGoTo(0)}>Prev</div>
                            <div onClick={()=>this.slider.slickGoTo(2)}>Next</div>
                        </div>
                        <div>
                            <div id="address">
                                <div class="address-wrapper">
                                    <label>street</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="street"
                                        maxlength="40"
                                        onChange={e => this.onChange(e)} />
                                </div>
                                <div class="address-wrapper">
                                    <label>streetNumber</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="streetNumber"
                                        maxlength="40"
                                        onChange={e => this.onChange(e)} />
                                </div>
                                <div class="address-wrapper">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="state"
                                        maxlength="40"
                                        onChange={e => this.onChange(e)} />
                                </div>
                                <div class="address-wrapper3">
                                    <label>Post Code</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="postCode"
                                        maxlength="40"
                                        onChange={e => this.onChange(e)} />
                                </div>
                            </div>
                            <div id="localSignup-container">
                                <div id='country-wrapper'>
                                    <label>Country</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="Country"
                                        maxlength="40"
                                        onChange={e => this.onChange(e)} />
                                </div>
                                <div id='password-wrapper'>
                                    <div>
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            class="form-control"
                                            name="password"
                                            maxlength="100"
                                            onChange={e => this.onChange(e)} />
                                    </div>
                                    <div>
                                        <label>Password confirm</label>
                                        <input
                                            type="password"
                                            class="form-control"
                                            name="password1"
                                            maxlength="100"
                                            onChange={e => this.onChange(e)} />
                                    </div>
                                </div>
                                <div onClick={()=>this.slider.slickGoTo(1)}>Prev</div>
                                <button type="submit" class="btn btn-succcess btn-lg">login</button>

                            </div>
                        </div>
                    </Slider>
                </form>
            </div>
        );
    }
}

export default Signup;