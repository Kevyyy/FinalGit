import React, { Component } from 'react';
import style from './presentation.css'
import ReactDOM from 'react-dom';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class PresentationSeller extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        fetch('seller/presentation/13')
            .then(res => res.json())
            .then(data => this.setState({ data }))
            .catch(function (error) {
                console.error(error);
            })
    }
    render() {
        const { data } = this.state

        return (

            <div>


                <div>
                    <div id='description-box-presentation-setting'>
                            <input value="" />
                    </div>
                </div>
                            


            </div>
        )


    }
}



export default PresentationSeller;

