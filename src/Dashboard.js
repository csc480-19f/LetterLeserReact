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

const URL = "ws://localhost:10120/LetterLeser/engine";


class Dashboard extends React.Component {

    ws = null;

    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this)
        this.ws = props.ws;
        this.setState({
            foldersList: props.folders,
            favoritesList: props.favorites
        })
    }

    componentDidMount() {
        this.ws.onmessage = evt => {
            console.log("Recieved:", evt.data);
            this.handleMessageReceive(JSON.parse(evt.data));
        };
        this.ws.onclose = () => {
            console.log("disconnected");
            this.setState({
                ws: new WebSocket(URL)
            });
        };
    }

    handleMessageReceive = (msg) => {
        console.log(msg)
        if (msg.messagetype == 'statusupdate') {
            if (msg.message != 'Favorite has been added' 
                && msg.message != 'Favorite has been removed') {
                this.setState({
                    status: msg.message,
                    error: null
                })
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
                error: "We have encountered an error. Please try again."
            })
        }
        if (msg.messagetype == 'graphs') {
            this.setState({
                status: null,
                error: null
            })
            var score = msg.sentimentscore.sentimentscore;
            this.setState({
                score: score
            })
            this.setState({
                domain: msg.emailbydomain
            })
            this.setState({
                folder: msg.emailbyfolder
            })
            this.setState({
                sentReceived: msg.emailssentandrecieved
            })
            this.setState({
                numEmails: msg.numberofemails
            })
            this.setState({
                timeReplies: msg.timebetweenreplies
            })
        }
        if (msg.favoritename) {
            this.setState({
                status: null,
                error: null
            })
            var favorites = msg.favoritename;
            this.setState({
                favoritesList: favorites
            })
        }
        if (msg.foldername) {
            this.setState({
                status: null,
                error: null
            })
            var folders = msg.foldername;
            this.setState({
                foldersList: folders
            })
        }
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
        error: null
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
                                    webSocket={this.ws}
                                    saveFavorite={this.state.saveFavorite}
                                    onClearFavorite={this.handleHideFavorite}
                                    onSelectFavorite={this.handleShowFavorite}
                                    onAddFavorite={this.handleShowModal}></SideNav>
                            </div>
                        </div>

                        <div className="dashboardBody">
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
                    </div>
                )}
            </div>
        );
    }
}

export default Dashboard;