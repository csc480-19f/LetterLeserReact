import React from 'react';
import { GoogleLogout } from "react-google-login";
import './ContextMenu.css';

class ContextMenu extends React.Component {

    ws = null;

    state = {
        logout: false,
    };

    constructor(props) {
        super(props);
        this.ws = props.webSocket;
    }

    refresh = () => {
        var jsonObj = `
        { "messagetype":"refresh"}`;
        this.ws.send(JSON.stringify(jsonObj));
    }

    logout = () => {
        // localStorage.removeItem("clientId");
        this.setState({
            logout: true
        })
        this.props.handler(true);
    }

    render() {
        //var clientId = localStorage.getItem("clientId");
        return (
            <div>
                <div class="dropdown-content">
                    <a onClick={this.refresh}><img class="menu-icon" src="Refresh-Dark.svg"></img>Refresh</a> <hr></hr>
                    {/* <a><img class="menu-icon" src="Settings-Dark.svg"></img>Settings</a> <hr></hr> */}
                    <a><img class="menu-icon" src="Credits-Dark.svg"></img>Credits</a> <hr></hr>
                    <a onClick={this.logout}><img class="menu-icon" src="Logout-Dark.svg"></img>Logout</a>
                    {/* <GoogleLogout
                        clientId = {clientId}
                        buttonText="Logout"
                        onLogoutSuccess={this.logout}
                        render={({ onClick, disabled }) => (
                            <a onClick={onClick} disabled={disabled}>Logout</a>
                        )}
                    >
                    </GoogleLogout> */}
                    
                    {/* TODO: https://github.com/anthonyjgrove/react-google-login/pull/110 */}
                </div>
            </div>
        );
    }

}

export default ContextMenu;