import React, { Component } from 'react';
class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        }

    }
    componentDidMount() {
        fetch("/shopping-cart")
            .then(res => res.json())
            .then(cart => this.setState({ cart }))
            .catch(function (error) {
                console.error(error);
            })
    }
    render() {
        const { cart } = this.state
        console.log()
        var totalPrice = cart.totalPrice||[];
        var products = cart.products||[];
        return (

            <div id="container">
                <div id="border">
                    <ul>

                        {products.map(function (item) {
                            return(<li class="list-group-item"><a>{item.qty}${item.price}{item.type}</a></li>
                        )})}
                        <li><a href="/reduce/{{this.id}}">Reduce by 1</a></li>
                        <li><a href="/remove/{{this.id}}">Remove All</a>
                        </li>
                    </ul>
                </div >

                <div class="row">
                    <strong>Total: {totalPrice}</strong>
                </div>

                <div class="row">

                    <a href="/checkout" type="button" class="btn btn-success">Checkout</a>
                </div>


                <div class="row">
                    <div class="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
                        <h2>No Items in Cart</h2>
                    </div>
                </div>
            </div >


        );
    }
}

export default ShoppingCart;