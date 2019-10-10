import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './SideNav.css';

class SideNav extends React.Component {

    state = {
        startDate: new Date(), 
        endDate: null,
        showFavorites: false, 
        showFolders: false,
        filterInterval: null, 
        flaggedEmail: false,
        attachment: false,
        seen: false,
        favorites: [],
        folders: []
    };

    handleStartChange = date => {
        this.setState({
            startDate: date
        });
    };

    handleEndChange = date => {
        this.setState({
            endDate: date
        });
    };

    handleIntervalBtnClick = event => {
        this.setState({
            filterInterval: event.target.value
        })
    }

    handleToggleFavorites = () => {
        this.setState({
            showFavorites: !this.state.showFavorites
        })
    }

    handleToggleFolders = () => {
        this.setState({
            showFolders: !this.state.showFolders
        })
    }

    handleFlaggedCheckmark = () => {
        this.setState({
            flaggedEmail: !this.state.flaggedEmail
        })
    }

    handleAttachmentCheckmark = () => {
        this.setState({
            attachment: !this.state.attachment
        })
    }

    handleSeenCheckmark = () => {
        this.setState({
            seen: !this.state.seen
        })
    }

    clearFilter = () => {
        this.setState({
            startDate: new Date(), 
            endDate: null,
            filterInterval: null,
            flaggedEmail: false,
            attachment: false,
            seen: false
        })
    }

    render() {
        return (
            <div className="sidenav">
                <a className="alt" onClick={this.handleToggleFavorites}>Favorites
                        <span className="caret"
                        style={this.state.showFavorites ? { display: 'none' } : {}}
                        onClick={this.handleToggleFavorites}>
                    </span>
                    <span className="caret-up"
                        style={!this.state.showFavorites ? { display: 'none' } : {}}
                        onClick={this.handleToggleFavorites}>
                    </span>
                </a>
                <div style={!this.state.showFavorites ? { display: 'none' } : {}}>
                    <ul className="sidenav-lists">
                        {
                            this.state.favorites.map(el => <li value={el}> {el} </li>)
                        }
                    </ul>
                </div>
                <a onClick={this.handleToggleFolders}>Folders
                        <span className="caret"
                        style={this.state.showFolders ? { display: 'none' } : {}}>
                    </span>
                    <span className="caret-up"
                        style={!this.state.showFolders ? { display: 'none' } : {}}>
                    </span>
                </a>
                <div style={!this.state.showFolders ? { display: 'none' } : {}}>
                    <ul className="sidenav-lists">
                        {
                            this.state.folders.map(el => <li value={el}> {el} </li>)
                        }
                    </ul>
                </div>
                <a className="alt">Filters
                        <span className="clearMsg" onClick={this.clearFilter}>Clear Filter</span>
                </a>
                <div className="sidenav-contents">
                    Start Date: <br></br>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleStartChange}
                    />
                    <br></br>
                    <br></br>
                    End Date (Optional): <br></br>
                    <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleEndChange}
                    />
                    <br></br><br></br>
                    Set Interval: <br></br>
                    <div className="btnsGroup">
                        <button className="intervalBtn"
                            value="week"
                            style={"week" === this.state.filterInterval ? { backgroundColor: '#F6BC3D' } : { backgroundColor: 'white' }}
                            onClick={this.handleIntervalBtnClick}>
                            Week
                            </button>
                        <button className="intervalBtn"
                            value="month"
                            style={"month" === this.state.filterInterval ? { backgroundColor: '#F6BC3D' } : { backgroundColor: 'white' }}
                            onClick={this.handleIntervalBtnClick}>
                            Month
                            </button>
                        <button className="intervalBtn"
                            value="year"
                            style={"year" === this.state.filterInterval ? { backgroundColor: '#F6BC3D' } : { backgroundColor: 'white' }}
                            onClick={this.handleIntervalBtnClick}>
                            Year
                        </button>
                    </div>
                    <br></br><br></br>
                    Contains: <br></br>
                    <div className="containsGroup">
                        <label className="container"> Flagged Email
                                <input type="checkbox"
                                checked={this.state.flaggedEmail}
                                onClick={this.handleFlaggedCheckmark}></input>
                            <span className="checkmark"></span>
                        </label>
                        <br></br>
                        <label className="container"> Attachment
                                <input type="checkbox"
                                checked={this.state.attachment}
                                onClick={this.handleAttachmentCheckmark}></input>
                            <span className="checkmark"></span>
                        </label>
                        <br></br>
                        <label className="container"> Seen
                                <input type="checkbox"
                                checked={this.state.seen}
                                onClick={this.handleSeenCheckmark}></input>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }

}

export default SideNav;