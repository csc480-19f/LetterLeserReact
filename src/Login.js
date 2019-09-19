import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import config from "./config.json";

const URL = "ws://localhost:3030";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direct: false,
      return: ""
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
    this.setState({
      direct: true
    });
    this.ws.send(JSON.stringify(res.Zi));
  };
  render() {
    const { direct } = this.state;
    const responseGoogle = response => {
      this.signup(response);
    };
    return (
      <div>
        {direct ? (
          <h1>Logged in</h1>
        ) : (
          <div>
            <h2>Login</h2>
            <GoogleLogin
              clientId={config.GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </div>
        )}
      </div>
    );
  }
}
export default Login;
