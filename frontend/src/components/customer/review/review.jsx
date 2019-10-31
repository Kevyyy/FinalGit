import React, { Component } from 'react';
import Seller from '../../seller/seller';

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewMessage: '',
            Seller:'',
        }
    }
    handleChange = (e) => this.setState({
        [e.target.name]: e.target.value
    })


    postReview = (e) => {
        e.preventdefault()
        fetch('/sendreview', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reviewMessage: this.state.reviewMessage,
            })
        })
    }
    render() {
        return (
            <div id="padding">
                <form action={this.postReview}>
                    <input type='text' name='reviewMessage' onChange={this.handleChange}>
                    </input>
                    <button type='submit'>
                    </button>
                </form>
            </div>
        );
    }
}

export default Review;