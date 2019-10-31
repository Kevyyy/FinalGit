import React, { Component } from 'react';
import Chat from '/Users/KevinYan/Desktop/Personnal_Projects/Flavorhub/888/frontend/src/components/chat/chatcontacts.jsx'
import Jumbotron from '/Users/KevinYan/Desktop/Personnal_Projects/Flavorhub/888/frontend/src/components/products/productBrowser/Jumbotron/jumbotron.jsx'
import "./products.css"
class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts = () => {
        fetch('/products')
            .then(res => res.json())
            .then(products => this.setState({ products }))
            .catch(function (error) {
                console.error(error);
            })
    }
    render() {
        const { products } = this.state
        console.log("bruva", products);
        return (
                <div id="padding-products">
                <Jumbotron/>
                <a id="seasonal-products-title">Products in season</a>
                <div id="container-products">
                    <Chat />
                    {products.map((item) => {
                        return (
                            item.map((innerarray, i) => {
                                return (
                                    <div id="productWrapper">
                                        <div key={i}>
                                        <div class="product-thumbnail-background">
                                            <div class="thumbnail-products">
                                                <a href={'/products/' + innerarray.link}>
                                                    <img src={innerarray.imagePath} alt="..." />
                                                </a>
                                        </div>
                                            </div>
                                            <h3 id="title">{innerarray.title}</h3>
                                            <a>average price</a><br/>
                                            <a>stock count</a>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }

                    )}
                </div>
            </div>
        );
    }
}

export default Products;