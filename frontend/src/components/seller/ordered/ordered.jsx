import React, { Component } from 'react';
import './ordered.css'

class Ordered extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('/seller',{
            credentials: "include" })
            .then(res => res.json())
            .then(data => this.setState({ data }, function () {
                console.log("wtf", data)
            }))
            .catch(function (error) {
                console.error(error);
            })
    }
    postMultipleOrders(orderId){
        fetch('seller/ship/'+orderId)
        .then(res => res.json())
        .then()
    }
    render() {
        const { data } = this.state
        let singleOrders = data.singleOrders || [];
        let multipleOrders = data.multipleOrders || [];
        console.log("huhuhu", data.singleOrders);
        return (
            <div id="container-ordered">
                <div class='backdrop-ordered'>

                    <div id='orders-ordered'>
                        <div>
                            <table>
                                <div id="title-ordered"><a >Please Ship the following products</a></div>
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
                                    {multipleOrders.map((item,i) => {
                                        return(
                                            <tr>
                                       
                                            {item.map((innerItem) =>{
                                                console.log(innerItem)
                                            return (
                                                        <div>
                                                        <th>{innerItem.transaction_id}</th>
                                                        <th>{innerItem.transaction_id}</th>
                                                        <th>{innerItem.id}</th>
                                                        </div>

                                            )})}
                                            <input type="button"
                                            onClick= {()=>this.postMultipleOrders(item[0].transaction_id)}
                                            value={item[0].transaction_id} />
                                            </tr>
                                            )})}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div >
        );
    }
}

export default Ordered;