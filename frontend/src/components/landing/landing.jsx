import React, { Component } from 'react';
import './landing.css'
class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <div id="slide1">
                    <div id="Main-title">
                        <img id="prawns" src="/images/prawns.png" />
                        <a><p class="title1">Fresh specialty ingredients</p>
                            <p class="subtitle1">Delivered straight to your hands </p></a>
                        <p><button className='button-subsciption'>Get started</button></p>
                    </div>
                </div>
                <div id="slide2">
                    <div id="Main-title2">
                        <a><p class="title2">A Cheaper, Simpler, Faster, Better Service</p></a>
                        <div class="row">
                            <div class="columnslide2">
                                <p class="Bestprices">
                                    <br/>Price<br/></p>
                                <p class="dollarsign">-30%</p>
                                <p class="DescriptionPrices"><br />Price reduction on an<br />Average Consultation<br /></p>

                            </div>
                        </div>
                        <div class="columnslide2">
                            <p class="Bestprices">
                                <br/>Fresher<br/></p>
                            <p class="dollarsign">Direct</p>
                            <p class="DescriptionPrices"><br />Ingrdients shipped straight from the supplier<br /></p>
                        </div>
                        <div class="columnslide2">
                            <p class="Bestprices">
                                <br />Best Selections></p>
                            <p class="dollarsign">500+</p>
                            <p class="DescriptionPrices"><br />Largest Selection of specialty ingredients</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;