import React, { Component } from 'react';
import './shipped.css'

class Shipped extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('/seller')
            .then(res => res.json())
            .then(data => this.setState({ data }, function () {
                console.log("wtf", data)
            }))
            .catch(function (error) {
                console.error(error);
            })
    }

    render() {
        const { data } = this.state
        let singleOrders = data.singleOrders || []
        console.log("huhuhu", data.singleOrders);
        return (
                <div class='backdrop'>
                    <div id='orders'>
                        <div>
                            <table>
                                <div id="title"><a >Please Ship the following products</a></div>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Grade</th>
                                        <th>transaction_Item_Id</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {singleOrders.map((item) => {
                                        return (
                                            <div>
                                                <tr>
                                                    <th>{item.id}</th>
                                                    <th>{item.type}</th>
                                                    <th>{item.grade}</th>
                                                </tr>
                                                <tr>
                                                    <th><input
                                                        type="button"
                                                        onclick="location.href='/seller/ship/{{this.transaction_id}}';"
                                                        value="{{this.transaction_id}}Ship it" />
                                                    </th>
                                                </tr>
                                            </div>
                                        )
                                    })}
                                        <tr>
                                        <th>{}</th>
                                        <th>{}</th>
                                        <th>{}</th>
                                    </tr>
                                    <tr>
                                        <th><input type="button"
                                            onclick="location.href='/seller/ship/{{this.0.transaction_id}}';"
                                            value="{{this.0.transaction_id}}Ship them" /></th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
        );
    }
}

export default Shipped;