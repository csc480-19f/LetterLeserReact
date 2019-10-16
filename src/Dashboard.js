import React from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Login from './Login';
import SideNav from './SideNav';
import Modal from './common/modal';
import ContextMenu from './ContextMenu';
import Sentiment from './charts/sentiment';
import SentAndReceived from './charts/sent-and-recieved';
import EmailsByDomain from './charts/emails-by-domain';
import EmailsByFolder from './charts/emails-by-folder';
import NumberOfEmails from './charts/number-of-emails';
import TimeBetweenReplies from './charts/time-between-replies';

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this)
    }

    handler(state) {
        this.setState({
            logout: state
        })
    }

    state = {
        showContextMenu: false,
        logout: false,
        message: null,
        showModal: false,
        saveFavorite: false
    };

    handleHamburgerClick = () => {
        this.setState({
            showContextMenu: !this.state.showContextMenu
        })
    };

    handleShowModal = (boolean) => {
        this.setState({
            showModal: true
        });
    }

    handleSaveFavorite = (favoriteName) => {
        this.setState({
            saveFavorite: favoriteName,
            showModal: false
        })
    }

    render() {
        return (
            <div>
                {this.state.logout ? (<Login />) : (
                    <div>
                        <Modal 
                            show={this.state.showModal}
                            onSaveFavorite={this.handleSaveFavorite}>
                        </Modal>
                        <div className="topnav">
                            <span className="navTitle"><b>LetterLeser</b></span>
                            <span className="favorite"><FontAwesomeIcon icon={faStar} /></span>
                            <span className="navBars" onClick={this.handleHamburgerClick}>
                                <FontAwesomeIcon icon={faBars} />
                            </span>
                            <span className="logo"><img src="oswego_logo.png" height="50"></img></span>
                        </div>
                        <div className="contextMenu">
                            {this.state.showContextMenu ? <ContextMenu handler={this.handler} /> : null}
                        </div>
                        <div className="sidenav">
                            <SideNav 
                                saveFavorite={this.state.saveFavorite}
                                onAddFavorite={this.handleShowModal}></SideNav>
                        </div>
                        <div className="dashboardBody">
                            <Sentiment></Sentiment>
                            <div className="chart-right">
                                <SentAndReceived></SentAndReceived>
                            </div>
                            <br></br>
                            <EmailsByDomain></EmailsByDomain>
                            <div className="chart-right">
                                <NumberOfEmails></NumberOfEmails>
                            </div>
                            <EmailsByFolder></EmailsByFolder>
                            <div className="chart-right time">
                                <TimeBetweenReplies></TimeBetweenReplies>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Dashboard;