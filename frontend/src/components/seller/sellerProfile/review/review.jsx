import React, { Component } from 'react';

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        fetch('/getReview',
        { credentials: "include" })
        .then(res => res.json())
        .then(data => this.setState({ data }, function () {
                console.log("data", data)
            }))
            .catch(function (error) {
                console.error(error);
            })
    }
    
    render() {
        return (
            <div id='reviewWrapper'>
                //review.map
            </div>
        );
    }
}

export default Review;