import React, { Component } from 'react';
import './active.css'

class Active extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            product_types: '',
            grade: '',
            product_weight: '',
            selling_price: ''

        }
    }

    componentDidMount() {
        fetch('/seller',{
         credentials: "include" })
            .then(res => res.json())
            .then(data => this.setState({ data }, function () {
                console.log("wtf", this.state.data)
            }))
            .catch(function (error) {
                console.error(error);
            })
    }
    Handlechange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    SellItem = (e)=>{
        e.preventDefault();
        const { data,product_types,grade,product_weight,selling_price } = this.state;
        fetch('/seller', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data:data,
                product_types:product_types,
                grade:grade,
                product_weight:product_weight,
                selling_price:selling_price
            })
        }).then(window.location.reload())

    }
        render() {
        const { data } = this.state
        let products = data.products || []
        console.log("huhuhu", this.state.data);
        return (
            <div class='backdrop'>
                <div id='item'>
                    <div id='preview'>
                        <div>
                            <table >
                                <div id="title"><a >Your Active Listing</a></div>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Grade</th>
                                        <th>Weight</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {products.map((item) => {
                                    return (
                                        
                                            <tr >
                                                <th >{item.price}</th>
                                                <th >{item.type}</th>
                                                <th >{item.grade}</th>
                                            </tr>
                                        
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id='addition'></div>
                    <form action="/seller" method="post">
                        <div id='product_types_wrapper'>
                            <select name="product_types" class="select-css" onChange={this.Handlechange}>
                                <option value="summer_truffle">summer truffle</option>
                                <option value="winter_truffle">winter truffle</option>
                                <option value="brown_caviar">white truffle</option>
                                <option value="purple_rainbow">prawns</option>
                            </select>

                            <select name="grade" class="select-css" onChange={this.Handlechange}>
                                <option value="grade_A">Grade_A</option>
                                <option value="grade_B">Grade_B</option>
                                <option value="grade_C">Grade_C</option>
                                <option value="grade_D">Grade_D</option>
                            </select>

                            <div>
                                <label id="label">Weight</label>
                                <input type="text" class="form-control" name="product_weight" onChange={this.Handlechange} />
                            </div>
                            <div>
                                <label id="label">Price/g</label>
                                <input type="text" class="form-control" name="selling_price" onChange={this.Handlechange} />
                            </div>
                            <button type="submit" onClick={this.SellItem} class="">Sell</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Active;