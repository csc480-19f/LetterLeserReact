import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import config from "./config.json";
import Dashboard from './Dashboard';
import './Login.css';

const URL = "ws://localhost:3030";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direct: false,
      return: "",
    };
  }
  ws = new WebSocket(URL);
  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
    };
    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      //   const message = JSON.parse(evt.data);
      console.log("Recieved:", evt.data);
      //   this.addMessage(message);
    };
    this.ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL)
      });
    };
  }
  //   addMessage = message => {
  //     this.setState(state => ({ return: message }));
  //     console.log(this.state.return);
  //   };

  signup = res => {
    const { direct, data } = this.state;
    console.log("Sent:", res.Zi);
    // store the clientId for logout later
    localStorage.setItem("clientId", res.Zi.access_token);
    this.setState({
      direct: true, 
    });
    this.ws.send(JSON.stringify(res.Zi));
  };
  render() {
    const { direct } = this.state;
    const responseGoogle = response => {
      this.signup(response);
    };
    return (
      <div className="background">
        {direct ? (
          <Dashboard />
        ) : (
            <div className="card">
              <h2 className="titlefont">LetterLeser</h2>
              <div className="googleLoginBtn">
                <GoogleLogin
                  clientId={config.GOOGLE_CLIENT_ID}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  render={({ onClick, disabled }) => (
                    <button className="loginBtn" onClick={onClick} disabled={disabled}><b>Login</b></button>
                  )}
                />
              </div>
            </div>
          )}
      </div>
    );
  }
}
export default Login;
