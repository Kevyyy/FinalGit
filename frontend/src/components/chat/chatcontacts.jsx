import './chatcontacts.css';
import Chatbox from './chatbox/chatbox.jsx'
import React, { Component } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

class ChatContacts extends Component {
    constructor(props) {
        super(props);
        this.pushchat = this.pushchat.bind(this);
        this.state = {
            list: [],
            conversationBox: []
        }
    }
    componentDidMount() {
        fetch('/getContact',
        {credentials: "include"})
            .then(res => res.json())
            .then(list => this.setState({ list }))
            .catch(function (error) {
                console.error(error);
            });

    }
    createChatbox(id, type) {
        //map the columns something from the array where type and id match with array
        var contactingId = id
        var contactingType = type;
        var NewConvo = this.state.list.reduce(function (box, row) {
            if (row.id === contactingId && row.type === contactingType)
                return row
        }, {});
        this.pushchat(NewConvo);
    }
    pushchat = (Convo) =>{
        var conversationBox = [].concat(this.state.conversationBox)
        conversationBox.push(Convo);
        this.setState({conversationBox: conversationBox},function(){
            console.log("fddf",this.state.conversationBox);
        });

    };
    render() {
        return (
            <div id="chatContacts">
                <div id="chatContactsHeader">
                    <a id='chatContacts-title'>Chat</a>
                </div>
                {this.state.list.map((item, i) => {
                    var id = item.id;
                    var type = item.type;
                    return (
                    <div id="contacts" 
                         key={i} onClick={() => this.createChatbox(id, type)}>
                             <div id="contacts-wrapper-chatcontacts">
                                <div id="avatar-chatcontacts">{item.avatar}<img/></div>
                                <div id="firstName-chatcontacts">{item.first_name}</div>
                             </div>
                    </div>


                )})}
                <Chatbox chat={this.state.conversationBox} c={11}/>
            </div>
        );
    }
}

export default ChatContacts;