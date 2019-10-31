import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './navbar.css';
class Nav extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      session: [],
      logged:''
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getSession();
  }
  handleLogout=()=> {
    console.log("sdfa");
    fetch('/logout')
      .then(token => {
        console.log(token.status)
        if (token.status === 200 ) {
          this.props.history.push("/");
          this.getSession()
        }
      })
  };
  // Retrieves the list of items from the Express app
  getSession = () => {
    fetch('/session')
      .then(res => res.json())
      .then(session => this.setState({ session }))
      .catch(function (error) {
        console.error(error);
      })
  }

  render() {
    const { session } = this.state;
    console.log("bruva", session);
    if (session ) {
      return (
        <nav>
          <img id="logo" src='/images/flavorhub.png' />
          <div className="nav-left">
            <ul>
              <li><a id="first" href={"/products"}>Browse</a></li>
            </ul>
          </div>
          <div class="nav-right">
            <ul>
              <li><a href={"/cart"}>ENG</a></li>
              <li><a onClick={this.handleLogout}>Logout</a></li>
              <button class="button"><a id="button" href={"/profile"}>Dashboard</a></button>
            </ul>
          </div>
          <div id="retainer">
            <ul>
              <div class="dropdown">
                <li><a>&#9776;</a></li>
                <div class="dropdown-content">
                  <a >Home</a>
                  <a >Our programs</a>
                  <a>Contact</a>
                </div>
                <button class="button" ><a id="button">Let's Cooperate</a></button>
              </div>
            </ul>
          </div>
        </nav>
      )
    }
    if (!session) {
      return (
        <div>
          <nav>
            <div class="nav-left">
              <img id="logo" src='/images/flavorhub.png' />

              <ul>

                <li><a id="first" href={"/products"}>Browse</a></li>
              </ul>
            </div>
            <div class="nav-right">
              <ul>
                <li><a href={"/shopping_cart"}>ENG</a></li>
                <li><a href={"/signup"}>Sign up</a></li>
                <li><a href={"/login"}>Login</a></li>
              </ul>
            </div>
            <div id="retainer">
              <ul>
                <div class="dropdown">
                  <li><a>&#9776;</a></li>
                  <div class="dropdown-content">
                    <a >Home</a>
                    <a >Our programs</a>
                    <a>Contact</a>
                  </div>
                  <button class="button" ><a id="button">Let's Cooperate</a></button>
                </div>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
  }
}
export default withRouter(Nav);
