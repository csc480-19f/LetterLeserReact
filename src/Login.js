import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import config from "./config.json";
import Dashboard from './Dashboard';
import './Login.css';

const URL = "ws://localhost:8080/test/websocketendpoint";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null, 
      password: null,
      direct: true,
      return: "",
    };
  }
  ws = new WebSocket(URL);
  componentDidMount() {
    this.ws.onopen = () => {
      console.log("connected");
    };
    this.ws.onmessage = evt => {
      console.log("Recieved:", evt.data);
      //   this.addMessage(message);
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
      email: this.state.username,
      pass: this.state.password
    }

    this.ws.send(JSON.stringify(jsonObj));

    this.setState({
      direct: true, 
    });

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
          <Dashboard />
        ) : (
            <div className="card">
              <h2 className="titlefont">LetterLeser</h2>
              <div className="googleLoginBtn">
              <input className="creds" placeholder="Email Address" onChange={this.handleUsername}></input>
              <br></br> <br></br>
              <input type="password" className="creds" placeholder="Password" onChange={this.handlePassword}></input>
              <br></br>
              <br></br>
              <button className="loginBtn" onClick={this.signup}><b>Login</b></button>
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
