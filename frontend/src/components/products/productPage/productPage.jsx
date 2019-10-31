import React, { Component } from 'react';
import './productPage.css'
import io from 'socket.io-client';
import Chat from '/Users/KevinYan/Desktop/Personnal_Projects/Flavorhub/888/frontend/src/components/chat/chatcontacts.jsx'
class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.match.params.name,
            productsInfo: [],
            a: [],
            room:[]
        }
        this.addCart = this.addCart.bind(this);
    }
    componentDidMount() {
        console.log('/products/' + this.state.name);
        this.getProducts();
    }

    getProducts = () => {
        fetch('/products/' + this.state.name)
            .then(res => res.json())
            .then(productsInfo => this.setState({ productsInfo }))
            .catch(function (error) {
                console.error(error);
            })
    }
    addCart(id) {
        fetch('/addcart/' + id)
            .then(res => res.text())
            .then(a => console.log(a))
            .catch(function (error) {
                console.error(error);
            })
    }
    async messageSeller(id) {
        var socket = io('http://localhost:3001');
        await console.log('test', localStorage.getItem("connect.sid"));

        await fetch(
            'http://localhost:3001/messageRoom/' + id,
        {credentials: "include"})
            .then(res => res.json())
            .then(room => this.setState({ room }))
             socket.emit('send', this.state.room);
    }
    render() {
        const { productsInfo } = this.state
        var itemInfo = productsInfo.productInfo || [];
        var itemStock = productsInfo.productsStock || [];
        console.log("ddddd", itemInfo)
        return (
            <div id="container-productPage">
                 <Chat/>
                {itemInfo.map(function (item, id) {

                    return (
                        <div id="textDescriptionWrapper">
                            <div id="picture">
                                <img id="img" src={item.imagePath} />
                            </div>
                            <div id="descriptionBox">
                                <h1>{item.title}</h1>
                                <a id="description">{item.description}</a>
                            </div>
                        </div>
                    )
                })}
                <div id="tableBox">
                    <table>
                        <thead>
                            <tr>
                                <th>seller</th>
                                <th>Savings</th>
                                <th>Month</th>
                                <th>Savings</th>
                                <th>Month</th>
                                <th>Buy Now</th>
                                <th> Now</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemStock.map((item, i) => {
                                console.log(item)
                                return (
                                    <div>
                                        <tr>
                                            <th><input
                                                type ="button"
                                                onClick={() => this.messageSeller(item.seller_id)}
                                                value="messageSeller" />
                                            </th>
                                            <th><a>{item.price}</a></th>
                                            <th><input 
                                            type="button" 
                                            onClick={() => this.addCart(item.id)} 
                                            value="Add cart" />
                                            </th>
                                        </tr>
                                    </div>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ProductPage;