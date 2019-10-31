import React, { Component } from 'react';

class BoughtItems extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        //fetch some stuff
    }
    render() {
        return (<div>
            <div id="container">
                <div id="orders">
                    <div id="orders-header">
                        <div class="headers-details">
                            <a></a>
                        </div>
                        <div class="headers-details">
                            <a></a>
                        </div>
                        <div class="headers-details">
                            <a>((Item arrival date))</a>
                        </div>
                    </div>
                    <p id="item"></p>
                    <p id="price"></p>
                </div>
            </div>
        </div>
        );
        if (true) {
            return (
                <div>
                    <div class="row">
                        <div class="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
                            <h2>No Items in Cart</h2>
                        </div>
                    </div>
                </div>
            )
        }


    }
}

export default BoughtItems;