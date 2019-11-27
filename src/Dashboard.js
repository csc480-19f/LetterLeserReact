import React from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Login from './Login';
import SideNav from './SideNav';
import Modal from './common/modal';
import Credits from './credits';
import ContextMenu from './ContextMenu';
import Sentiment from './charts/sentiment';
import SentAndReceived from './charts/sent-and-recieved';
import EmailsByDomain from './charts/emails-by-domain';
import EmailsByFolder from './charts/emails-by-folder';
import NumberOfEmails from './charts/number-of-emails';
import TimeBetweenReplies from './charts/time-between-replies';
import JSEncrypt from "jsencrypt";

const URL = "ws://localhost:10120/LetterLeser/engine";


class Dashboard extends React.Component {

    ws = null;
    foldersList = [];
    favoritesList = [];

    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this);
        this.ws = props.ws;
        this.foldersList = props.folders;
        this.favoritesList = props.favorites;
    }

    componentDidMount() {
        this.ws.onmessage = evt => {
            console.log("Recieved:", evt.data);
            var json = null;
            try {
                json = JSON.parse(evt.data);
            } catch (error) {
                console.error(error);
            }
            if (json != null) {
                this.handleMessageReceive(json);
            }

        };
        this.ws.onclose = () => {
            console.log("disconnected");
            this.reconnect();
        };
        console.log(this.foldersList)
        console.log(this.favoritesList)
        this.setState({
            favoritesList: this.favoritesList,
            foldersList: this.foldersList
        })
    }

    reconnect = () => {
        let socket = this.ws;
        setTimeout(function () {
            socket.onopen = () => {
                console.log("connected");
                let json = `{
                    "messagetype":"reconnect",
                    "email": "` + localStorage.getItem("email") + `"
                  }`;
                socket.send(json);
            };
        }, 1000);
    }

    handleMessageReceive = (msg) => {
        console.log(msg)
        if (msg.messagetype == 'statusupdate') {
            if (msg.message != 'Favorite has been added'
                && msg.message != 'Favorite has been removed'
                && msg.message != "finished validating"
                && !msg.message.includes("No emails obtained with current filter")) {
                this.setState({
                    status: msg.message,
                    error: null
                })
            } else {
                if (msg.message == "finished validating") {
                    this.setState({
                        status: null,
                        error: null
                    })
                }
                if (msg.message.includes("No emails obtained with current filter")) {
                    this.setState({
                        status: null,
                        error: "No emails obtained with current filter", 
                        isFreshDashboard: false
                    })
                    let domainEmpty = [
                        {
                        "domainobj" : {
                            "domainparent" : "0",
                            "id" : "1",
                            "domainname" : 'No Emails',
                            "contribution" : "1"
                        }}
                    ];
                    let sentReceivedEmpty = {
                        "SentEmails" : "[0,0,0,0,0,0,0]",
                        "ReceivedEmails" : "[0,0,0,0,0,0,0]"
                    };
                    let numEmailsEmpty = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],
                        [0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];

                    let timeRepliesEmpty =  {
                        "SentEmails" : "[0,0,0,0,0,0,0]",
                        "ReceivedEmails" : "[0,0,0,0,0,0,0]"
                    };

                    this.setState({
                        score: 0,
                        domain: domainEmpty,
                        folder: domainEmpty,
                        sentReceived: sentReceivedEmpty,
                        numEmails: numEmailsEmpty,
                        timeReplies: timeRepliesEmpty,
                        disableAnalyzeBtn: false
                    })
                }
            }
        }
        if (msg.messagetype == 'error') {
            this.setState({
                selectedFavorite: null,
                score: 0,
                sentReceived: [],
                numEmails: [],
                timeReplies: [],
                domain: [],
                folder: [],
                status: null,
                error: "We have encountered an error. Logging out..."
            })
            var that = this;
            setTimeout(function () {
                that.handler(true);
            }, 3000);
        }
        if (msg.messagetype == 'graphs') {
            this.setState({
                status: null,
                error: null,
                isFreshDashboard: false,
                disableAnalyzeBtn: false,
                showCredits: false
            })
            this.setState({
                score: msg.graphs.sentimentscore
            })
            this.setState({
                domain: msg.graphs.emailbydomain
            })
            this.setState({
                folder: msg.graphs.emailbyfolder
            })
            this.setState({
                sentReceived: msg.graphs.emailssentandrecieved
            })
            this.setState({
                numEmails: msg.graphs.numberofemails
            })
            this.setState({
                timeReplies: msg.graphs.timebetweenreplies
            })
            this.setState({
                disableAnalyzeBtn: null
            });
        }
        if (msg.favoritename) {
            this.setState({
                status: null,
                error: null
            })
            this.favoritesList = msg.favoritename;
            this.setState({
                favoritesList: this.favoritesList
            })
        }
        if (msg.foldername) {
            this.setState({
                status: null,
                error: null
            })
            this.foldersList = msg.foldername;
            this.setState({
                foldersList: this.foldersList
            })
        }
        if (msg.messagetype == "key") {
            let encrypt = new JSEncrypt();
            encrypt.setPublicKey(msg.message);
            let email = localStorage.getItem("unencrypemail");
            let emailencryp = encrypt.encrypt(email);
            localStorage.setItem("email", emailencryp);
        }
    }

    handler(logout, credits) {
        this.setState({
            logout: logout, 
            showCredits: credits
        })
    }

    state = {
        isFreshDashboard: true,
        showContextMenu: false,
        logout: false,
        message: null,
        showModal: false,
        saveFavorite: false,
        showFavoriteData: false,
        selectedFavorite: null,
        favoritesList: [],
        foldersList: [],
        score: 0,
        sentReceived: [],
        numEmails: [],
        timeReplies: [],
        domain: [],
        folder: [],
        status: null,
        error: null,
        disableAnalyzeBtn: null,
        showCredits: false
    };

    handleHamburgerClick = () => {
        this.setState({
            showContextMenu: !this.state.showContextMenu,
            showModal: false
        });
    }

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

    handleShowFavorite = (favorite) => {
        this.setState({
            showFavoriteData: true,
            selectedFavorite: favorite[0]
        })
    }

    handleHideFavorite = () => {
        this.setState({
            showFavoriteData: false,
            selectedFavorite: null
        })
    }

    render() {
        return (
            <div>
                {this.state.logout ? (<Login />) : (
                    <div>
                        <Modal
                            favorites={this.state.favoritesList}
                            show={this.state.showModal}
                            onSaveFavorite={this.handleSaveFavorite}>
                        </Modal>
                        <div className="topnav">
                            <span className="logo-letter"><img src="LetterLeser.svg" height="40"></img></span>
                            <span className="favorite"> {this.state.showFavoriteData ?
                                <span className="favText">
                                    <FontAwesomeIcon className="favicon" icon={faStar} />
                                    &nbsp;
                                    {this.state.selectedFavorite}
                                </span>
                                : null
                            }
                            </span>
                            <span className="navBars" onClick={this.handleHamburgerClick}>
                                <FontAwesomeIcon icon={faBars} />
                            </span>
                            <span className="logo"><img src="Oswego Logo.svg" height="40"></img></span>
                            <span className="status">
                                <i>{this.state.error}</i>
                                <i>{this.state.status}</i>
                            </span>
                            {this.state.status != null ?
                                <span className="loader"></span> : null
                            }
                        </div>
                        <div className="contextMenu">
                            {this.state.showContextMenu ? <ContextMenu
                                webSocket={this.ws}
                                handler={this.handler} /> : null}
                        </div>
                        <div className="sidenav-container">
                            <div className="sidenav">
                                <SideNav
                                    folders={this.state.foldersList}
                                    favorites={this.state.favoritesList}
                                    disableAnalyzeBtn={this.state.disableAnalyzeBtn}
                                    webSocket={this.ws}
                                    saveFavorite={this.state.saveFavorite}
                                    onClearFavorite={this.handleHideFavorite}
                                    onSelectFavorite={this.handleShowFavorite}
                                    onAddFavorite={this.handleShowModal}></SideNav>
                            </div>
                        </div>

                        <div className="dashboardBody">
                            {this.state.showCredits ? (<div><Credits></Credits></div>) : null }
                            {!this.state.showCredits && !this.state.isFreshDashboard  ? (
                                <div>
                                    <Sentiment
                                        score={this.state.score}
                                    ></Sentiment>
                                    <div className="chart-right">
                                        <SentAndReceived
                                            data={this.state.sentReceived}></SentAndReceived>
                                    </div>
                                    <br></br>
                                    <EmailsByDomain
                                        data={this.state.domain}
                                    ></EmailsByDomain>
                                    <div className="chart-right">
                                        <NumberOfEmails data={this.state.numEmails}></NumberOfEmails>
                                    </div>
                                    <EmailsByFolder
                                        data={this.state.folder}
                                    ></EmailsByFolder>
                                    <div className="chart-right time">
                                        <TimeBetweenReplies data={this.state.timeReplies}></TimeBetweenReplies>
                                    </div>
                                </div>
                            ) : 
                            !this.state.showCredits ? (
                            <div className="pleaseSelectFilter">
                                <h4>Please select a folder to view email analysis.</h4>
                            </div>) : null}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Dashboard;