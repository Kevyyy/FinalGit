import React, { Component } from 'react';
import "./jumbotron.css"
import Slider from "react-slick";
//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";

class Jumbotron extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <Slider {...settings}>
                <div>
                    <h3><img src='/images/truffletartar.png'/></h3>
                </div>
                <div>
                    <h3><img/></h3>
                </div>
                <div>
                    <h3><img/></h3>
                </div>
            </Slider>
            );
    }
}

export default Jumbotron;