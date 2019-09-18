import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import config from "./config.json";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direct: false
    };
  }
  signup = res => {
    const { direct } = this.state;
    this.setState({
      direct: true
    });
  };
  render() {
    const { direct } = this.state;
    const responseGoogle = response => {
      console.log(response);
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
