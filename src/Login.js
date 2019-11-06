import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import config from "./config.json";
import Dashboard from './Dashboard';
import './Login.css';
import { sign } from "crypto";

const URL = "ws://localhost:10120/LetterLeser/engine";
var favorites = [];
var folders = [];

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      direct: false,
      return: "",
      errorMessage: false,
      statusMessage: null
    };
  }
  ws = new WebSocket(URL);
  componentDidMount() {
    this.ws.onopen = () => {
      console.log("connected");
    };
    this.ws.onmessage = evt => {
      console.log("Recieved:", evt.data);
      var json = null;
      try {
        json = JSON.parse(evt.data);
      } catch (error) {
        console.error(error)
      }
      if (json.messagetype == "statusupdate") {
        if (json.message == "establising connection") {
          this.setState({
            statusMessage: "Connecting..."
          })
        }
        if (json.message == "established connection") {
          this.setState({
            statusMessage: "Connecting...", 
            errorMessage: null
          });
        }
        if (json.message == "invalid credentials") {
          this.setState({
            errorMessage: true,
            statusMessage: null
          });
        }
      } else if (json.messagetype == "logininfo") {
        var isValidJSON = this.checkRecievedPacketForValidity(json);
        if (isValidJSON == true) {
          this.setState({
            direct: true
          })
        } else {
          // try re-sending previous request
          this.signup();
        }
      }
      
    };
    this.ws.onclose = () => {
      console.log("disconnected");
      this.setState({
        ws: new WebSocket(URL)
      });
    };
  }

  checkRecievedPacketForValidity = json => {
    if (json.foldername == null) {
      return false;
    } else if (json.favoritename == null) {
      return false;
    } else {
      this.folders = json.foldername;
      this.favorites = json.favoritename;
      return true;
    }
  }

  handleUsername = event => {
    this.setState({
      username: event.target.value
    })
  }

  handlePassword = event => {
    this.setState({
      password: event.target.value
    })
  }

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) { //13 is the enter keycode
      this.signup();
    } 
}

  signup = () => {

    let jsonObj = {
      messagetype: "login",
      email: this.state.username,
      pass: this.state.password
    }

    localStorage.setItem("email", this.state.username);

    this.ws.send(JSON.stringify(jsonObj));

    //const { direct, data } = this.state;
    //console.log("Sent:", res.Zi);
    // store the clientId for logout later
    //localStorage.setItem("clientId", res.Zi.access_token);
    //this.ws.send(JSON.stringify(res.Zi));
  };

  render() {
    const { direct } = this.state;
    // const responseGoogle = response => {
    //   this.signup(response);
    // };
    return (
      <div className="background">
        {direct ? (
          <Dashboard 
            ws={this.ws}
            favorites={this.favorites}
            folders={this.folders}
          />
        ) : (
            <div className="card">
              <span className="logo-login"><img src="LetterLeser-Green.svg" ></img></span>
              <div className="googleLoginBtn">
                <input className="creds" placeholder="Email Address" onChange={this.handleUsername}></input>
                <br></br> <br></br>
                <input type="password" className="creds" placeholder="Password" onChange={this.handlePassword} onKeyPress={this.enterPressed.bind(this)}></input>
                <br></br>
                <br></br>
                <button className="loginBtn" onClick={this.signup}><b>Login</b></button>
                {this.state.statusMessage != null ? 
                <div className="statusContainer">
                  <br></br>
                  <span className = "loaderLogin"></span>
                  <span className="statusMsg"> 
                    {this.state.statusMessage}
                  </span> 
                </div>
                : null
                }
                {this.state.errorMessage == true ? (
                  <div className="errorMessage">
                  <br></br><br></br>
                  <div>Unable to connect to email.</div>
                </div>
                ) : null }
                
                {/* <GoogleLogin
                  clientId={config.GOOGLE_CLIENT_ID}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  render={({ onClick, disabled }) => (
                    <button className="loginBtn" onClick={onClick} disabled={disabled}><b>Login</b></button>
                  )}
                /> */}
              </div>
            </div>
          )}
      </div>
    );
  }
}
export default Login;
