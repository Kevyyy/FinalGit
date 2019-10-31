import React, { Component } from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postCode: '',
            name: '',
            address: '',
            streetNumber: '',
            city: '',
            state: '',
            country: '',
            key:''
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    componentDidMount() {
        fetch("/checkout")
            .then(res => res.json())
            .then(key => this.setState({key}))
            .catch(function (error) {
                console.error(error);
            })
    }

     handleSubmit = async(e) => {
        e.preventDefault();
        const { postCode, name, address, streetNumber, city, state, country } = this.state;
        let {token} = await this.props.stripe.createToken({name: "Name"});
        await console.log("token:",token)
        fetch('/checkout', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postCode: postCode,
                name: name,
                address: address,
                streetNumber: streetNumber,
                city: city,
                state: state,
                country: country,
            },token.id)
        })
    }


    render() {

        console.log('sup')

        return (
            <div id="Wrapper-checkout">
                <div id="padding-checkout"> </div>
                <div id='container-checkout'>
                    <form action={this.handleSubmit} method="post" id="payment-form">
                        <div class="form-row-checkout">
                            <label for="Address">Postal Code</label>
                            <input
                                type="text"
                                class="form-control"
                                id="postCodeInput-checkout"
                                name="postCode"
                                onChange={e => this.onChange(e)} />
                            <label for="Name">Name</label>
                            <input
                                type="text"
                                class="form-control"
                                id="nameInput-checkout"
                                name="name"
                                onChange={e => this.onChange(e)} />
                            <label for="Address">Street </label>
                            <input
                                type="text"
                                class="form-control"
                                id="addressInput-checkout"
                                name="address"
                                onChange={e => this.onChange(e)} />
                            <label for="Address">Street Number</label>
                            <input
                                type="text"
                                class="form-control"
                                name="streetNumber"
                                id="streetNumber-checkout"
                                onChange={e => this.onChange(e)} />
                            <label for="Name">City</label>
                            <input
                                type="text"
                                class="form-control"
                                name="city"
                                id="city-checkout"
                                onChange={e => this.onChange(e)} />
                            <label for="Address">State/Province</label>
                            <input
                                type="text"
                                class="form-control"
                                name="state"
                                id="state-checkout"
                                onChange={e => this.onChange(e)} />
                            <label for="Address">Country</label>
                            <input
                                type="text"
                                class="form-control"
                                name="country"
                                id="country-checkout"
                                onChange={e => this.onChange(e)} />

                            <label for="card-element">
                                Credit or debit card
                            </label>
                            <CardElement />
            
                        <button type="payment">Submit Payment</button>
                        </div>
                    </form>
                </div>

                <script src="https://js.stripe.com/v3/"></script>
                <script type="text/javascript" src="javascripts/checkout.js"></script>

            </div >
        );
    }
}

export default Checkout;