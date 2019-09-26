import React from 'react';
import { GoogleLogout } from "react-google-login";
import './ContextMenu.css';

class ContextMenu extends React.Component {

    state = {
        logout: false,
    };

    logout = () => {
        localStorage.removeItem("clientId");
        this.setState({
            logout: true
        })
        this.props.handler(true);
    }

    render() {
        var clientId = localStorage.getItem("clientId");
        return (
            <div>
                <div class="dropdown-content">
                    <a>Reload Emails</a> <hr></hr>
                    <a>Settings</a> <hr></hr>
                    <a>Credits</a> <hr></hr>
                    <GoogleLogout
                        clientId = {clientId}
                        buttonText="Logout"
                        onLogoutSuccess={this.logout}
                        render={({ onClick, disabled }) => (
                            <a onClick={onClick} disabled={disabled}>Logout</a>
                        )}
                    >
                    </GoogleLogout>
                    
                    {/* TODO: https://github.com/anthonyjgrove/react-google-login/pull/110 */}
                </div>
            </div>
        );
    }

}

export default ContextMenu;