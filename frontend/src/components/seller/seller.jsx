import React, { Component } from 'react';
import Ordered from './ordered/ordered.jsx'
//import Shipped from './shipped/shipped.jsx'
import Active from './active/active.jsx'
import Shipped from './shipped/shipped.jsx'
import './seller.css'

class Seller extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        //this.getInfo
    }
    getInfo = () => {

    }
    render() {
        return (
            <div id="sellerDashboard">
                <div >
                    <Ordered />
                </div>
                <div>
                    <Active />
                </div>
                <div>
                    <Shipped />
                </div>

            </div>
        );
    }
}

export default Seller;