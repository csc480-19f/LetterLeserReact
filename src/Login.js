import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import config from "./config.json";
import Dashboard from './Dashboard';
import './Login.css';

const URL = "ws://localhost:10120/LetterLeser/engine";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      direct: false,
      return: "",
      errorMessage: false
    };
  }
  ws = new WebSocket(URL);
  componentDidMount() {
    this.ws.onopen = () => {
      console.log("connected");
    };
    this.ws.onmessage = evt => {
      console.log("Recieved:", evt.data);
      var json = JSON.parse(evt.data);
      if (json.messagetype == "statusupdate") {
        if (json.message == "connected") {
          this.setState({
            direct: true,
          });
        }
        if (json.message == "didnt connect") {
          this.setState({
            errorMessage: true
          });
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

  signup = res => {

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
          />
        ) : (
            <div className="card">
              <span className="logo-login"><img src="LetterLeser-Green.svg" ></img></span>
              <div className="googleLoginBtn">
                <input className="creds" placeholder="Email Address" onChange={this.handleUsername}></input>
                <br></br> <br></br>
                <input type="password" className="creds" placeholder="Password" onChange={this.handlePassword}></input>
                <br></br>
                <br></br>
                <button className="loginBtn" onClick={this.signup}><b>Login</b></button>
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
