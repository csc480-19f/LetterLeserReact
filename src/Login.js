import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import config from "./config.json";
import Dashboard from "./Dashboard";
import "./Login.css";
import { sign } from "crypto";
import JSEncrypt from "jsencrypt";

const URL = "ws://pi.cs.oswego.edu:10120/LetterLeser/engine";
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
      error: null,
      statusMessage: null,
      key: null
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
        console.error(error);
      }
      if (json.messagetype == "error") {
        this.setState({
          error: json.message,
          statusMessage: null
        });
      }
      if (json.messagetype == "statusupdate") {
        if (json.message == "establising connection") {
          this.setState({
            statusMessage: "Connecting...",
            error: null, 
            errorMessage: null
          });
        }
        if (json.message == "established connection") {
          this.setState({
            statusMessage: "Connecting...",
            errorMessage: null,
            error: null
          });
        }
        if (json.message == "Pulling folders and emails") {
          this.setState({
            statusMessage: "Loading in emails...",
            errorMessage: null,
            error: null
          });
        }
        if (json.message.includes("waiting for connection to open")) {
          this.setState({
            statusMessage: "Connecting...",
            error: null,
            errorMessage: null
          });
        }
        if (json.message == "invalid credentials") {
          this.setState({
            errorMessage: true,
            error: null,
            statusMessage: null
          });
        }
      } else if (json.messagetype == "logininfo") {
        var isValidJSON = this.checkRecievedPacketForValidity(json);
        if (isValidJSON == true) {
          this.setState({
            direct: true
          });
        } else {
          // try re-sending previous request
          this.signup();
        }
      }
      else if (json.messagetype == "key") {
      this.setState({
        key: json.message
      })
      }
    };

    this.ws.onclose = () => {
      console.log("disconnected");
      this.reconnect();
    };
    
  }

  reconnect = () => {
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey(this.state.key);
    let emailencryp = encrypt.encrypt(this.state.username);
    let socket = this.ws;
    setTimeout(function() {
      socket.onopen = () => {
        console.log("connected");
        let json = `{
          "messagetype":"reconnect", 
          "email":"`+ emailencryp + `" 
        }`;
        socket.send(json);
      };
    }, 1000);
  }

  checkRecievedPacketForValidity = json => {
    if (json.foldername == null) {
      return false;
    } else if (json.favoritename == null) {
      return false;
    } else {
      console.log(json)
      this.folders = json.foldername;
      this.favorites = json.favoritename;
      return true;
    }
  };

  handleUsername = event => {
    this.setState({
      username: event.target.value
    });
  };

  handlePassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      this.signup();
    }
  }

  signup = () => {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(this.state.key);
  let emailencryp = encrypt.encrypt(this.state.username);
  let passencryp = encrypt.encrypt(this.state.password);
    let jsonObj = {
      messagetype: "login",
      email: emailencryp,
      pass: passencryp
    };

    localStorage.setItem("unencrypemail", this.state.username);
    localStorage.setItem("email", emailencryp);

    this.ws.send(JSON.stringify(jsonObj));
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
            <span className="logo-login">
              <img src="LetterLeser-Green.svg"></img>
            </span>
            <div className="googleLoginBtn">
              <input
                type="email"
                className="creds"
                placeholder="Email Address"
                onChange={this.handleUsername}
              ></input>
              <br></br> <br></br>
              <input
                type="password"
                className="creds"
                placeholder="Password"
                onChange={this.handlePassword}
                onKeyPress={this.enterPressed.bind(this)}
              ></input>
              <br></br>
              <br></br>
              <button className="loginBtn" onClick={this.signup}>
                <b>Login</b>
              </button>
              {this.state.statusMessage != null ? (
                <div className="statusContainer">
                  <br></br>
                  <span className="loaderLogin"></span>
                  <span className="statusMsg">{this.state.statusMessage}</span>
                </div>
              ) : null}
              {this.state.errorMessage == true ? (
                <div className="errorMessage">
                  <br></br>
                  <br></br>
                  <div>Unable to connect to email.</div>
                </div>
              ) : null}
              {this.state.error != true ? (
                <div className="errorMessage">
                  <br></br>
                  <br></br>
                  <div>{this.state.error}</div>
                </div>
              ) : null}
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
