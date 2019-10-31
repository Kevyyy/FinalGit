import './chatbox.css';
import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');


class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      chatHandler: [],
      room0: "",
      room1: "",
      room2: "",
      room3: "",
      chat0: [],
      chat1: [],
      chat2: [],
      chat3: [],
      currentMessage0: [],
      currentMessage1: [],
      currentMessage2: [],
      currentMessage3: [],
      oldMessages0: [],
      oldMessages1: [],
      oldMessages2: [],
      oldMessages3: []
    }
  }

  componentDidMount() {
    fetch('/getConversation',
      { credentials: "include" })
      .then(res => res.json())
      .then(oldMessages => this.setState({ oldMessages }))
      .catch(function (error) {
        console.error(error);
      });
    socket.on('incoming-chat-message', (data) => {
      console.log("incoming", data)
      var chat0 = this.state.chat0 || []
      console.log(chat0)
      if (data.id === chat0.seller_id || data.room === chat0.conversationRoom)
        this.setState({
          currentMessage0: this.state.currentMessage0.concat({ id: data.id, message: data.message })
        })
      if (data.id === chat0.customer_id || data.room === chat0.conversationRoom)
        this.setState({
          currentMessage0: this.state.currentMessage0.concat({ id: data.id, message: data.message })
        })

      console.log("asdas", this.state.currentMessage0)
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.chat !== prevState.chatHandler) {
      var chat = this.props.chat || []
      this.setState({ chatHandler: this.props.chat })
      this.setState({ chat0: chat[0] })
      this.setState({ chat1: chat[1] })
      this.setState({ chat2: chat[2] })
      this.setState({ chat3: chat[3] })
      if (chat[0] != null) {
        console.log('this')
        var room0 = chat[0].conversationRoom || null
        this.setState({ room0: room0 })
        socket.emit("joinRoom", { room: room0 });
      }
      if (chat[1] != null) {
        var room1 = chat[1].conversationRoom || null
        this.setState({ room1: room1 })
        socket.emit("joinRoom", { room: room1 });
      }
      if (chat[2] != null) {
        var room2 = chat[2].conversationRoom || null
        this.setState({ room2: room2 })
        socket.emit("joinRoom", { room: room2 });
      }
      if (chat[3] != null) {
        var room3 = chat[3].conversationRoom || null
        this.setState({ room3: room3 })
        socket.emit("joinRoom", { room: room3 });
      }

    }
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  sendMessage = (room, type, id) => {
    var currentMessage = this.state.currentMessage
    socket.emit('send-chat-message', { currentMessage: currentMessage, room: room, type: type, id: id })
    this.setState({
      currentMessage0: this.state.currentMessage0.concat({ id: id, message: currentMessage })
    })
  }
  /*static getDerivedStateFromProps(nextProps, prevState){
     console.log(nextProps.chat!==prevState.chatHandler)
     if(nextProps.chat!==prevState.chatHandler){
       this.setState({chatHandler: nextProps.chat});
    }
    else return null;
  }*/

  render() {
    var chat0 = this.state.chat0 || []
    var chat1 = this.state.chat1 || []
    var chat2 = this.state.chat2 || []
    var oldMessages1 = this.state.oldMessages1 || []
    var currentMessage0 = this.state.currentMessage0 || []
    return (
      <div id="chatBar">
        {Object.keys(chat0).map((item, i) => {
          return (
            <div id={i} class="chatBox">
              <div id="chatForm">
                <div id="chatBanner">
                  <a id='chatBarTitle-chatbox'>Online</a>
                </div>
                <div id="chatBanner-chatbox">
                  <div>{chat0["avatar"]}</div>
                  <div>{chat0["first_name"]}</div>
                </div>
                <div id="chatMessage">
                  {oldMessages1.map((item, i) => {
                    return (<div>
                      {chat0["username"]}
                      {item}
                    </div>)
                  })}
                  {currentMessage0.map((item, i) => {
                    return (
                      <div>
                        {item.id}
                        {item.message}
                      </div>
                    )
                  })}
                </div>
                <div id="sendBarChatBox">
                  <div id='input-ChatBox'>
                    <input
                      id="inputChatbox"
                      type="text"
                      name="currentMessage"
                      //onKeyDown={() => this.sendMessage(chat0["conversationRoom"], chat0["type"], chat0["id"])}
                      onChange={(e) => this.handleChange(e)}/>
                       
                  </div>
                  <div id="sendChat"
                    onClick={() => this.sendMessage(chat0["conversationRoom"], chat0["type"], chat0["id"])}>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {chat1.map((item, i) => {
          return (
            //make 3
            <div id={i} class="chatBox">
              <div id="chatForm">
                <div id="chatBanner">
                  <a>{item.first_name}</a>
                </div>
                <div id="chatMessage">
                  {oldMessages1.map((item, i) => {
                    return (<div>
                      {item}
                    </div>)
                  })}
                </div>
                <div id="sendChat"
                  onClick={() => this.sendMessage(item.conversationRoom)}>
                </div>
                <input
                  type="text"
                  name="currentMessage"
                  onChange={(e) => this.handleChange(e)}></input>
              </div>
            </div>
          );
        })}


        {chat2.map((item, i) => {
          return (
            //make 3
            <div id={i} class="chatBox">
              <div id="chatForm">
                <div id="chatBanner">
                  <a>{item.first_name}</a>
                </div>
                <div id="chatMessage">
                  {oldMessages1.map((item, i) => {
                    return (<div>
                      {item}
                    </div>)
                  })}
                </div>
                <div id="sendChat"
                  onClick={() => this.sendMessage(item.conversationRoom)}>
                </div>
                <input
                  type="text"
                  name="currentMessage"
                  onChange={(e) => this.handleChange(e)}></input>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ChatBox;