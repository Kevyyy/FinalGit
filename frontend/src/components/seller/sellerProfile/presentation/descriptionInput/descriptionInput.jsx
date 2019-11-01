import React, { Component } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import './descriptionInput.css'
import ContentEditable from 'react-contenteditable'

class DescriptionInput extends Component {
    constructor(props) {
        super(props);
        this.contentEditable = React.createRef();
        this.state = {
            info: [],
            description:'sdaf'

        }
    }
    componentDidMount() {
        fetch('/getInfo',
            { credentials: "include" })
            .then(res => res.json())
            .then(info => this.setState({ info }))
            .catch(function (error) {
                console.error(error);
            })
            .then(
                this.setState({
                    description:"dsfdsafdsafasdfdsfdsafsadfsdafsadf"
                }));

    }

    render() {
        const { description } = this.state.info
        const { info } = this.state
        return (
            <div>
            <OutsideClickHandler
                onOutsideClick={() => {   
                        fetch('/userDescription', {
                            credentials: 'include',
                            method: "POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                description: description,
                            })
                        })
                }}
            >

                <div id='contentEditableDiv'>

                        <ContentEditable
                            onChange={e => this.setState({ description: e.target.value })}
                            type="text"
                            disabled={false}
                            html={this.state.description}
                            tagName='article'
                            className='class'
                        />
                </div>
            </OutsideClickHandler>
            </div>
        );
    }
}

export default DescriptionInput;