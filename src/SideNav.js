import React from 'react';
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import "react-datepicker/dist/react-datepicker.css";
import './SideNav.css';

class SideNav extends React.Component {

    initDate = new Date();
    thisMonth = this.initDate.getMonth();

    state = {
        startDate: new Date(this.initDate.setMonth(this.thisMonth - 1)),
        showFavorites: true,
        showFolders: true,
        filterInterval: "month",
        attachment: false,
        seen: true,
        favorites: [],
        folders: [],
        selectedFavorite: null,
        selectedFolder: null,
        newFavoriteName: null,
        showDeleteFavorites: false,
        disableAnalyzeBtn: false
    };

    ws = null;

    email = null;

    constructor(props) {
        super(props);
        this.ws = props.webSocket;
        this.email = localStorage.getItem("email");
    }
        

    componentWillReceiveProps(props) {
        this.setState({
            newFavoriteName: props.saveFavorite,
            favorites: props.favorites,
            folders: props.folders,
        });
        if (props.disableAnalyzeBtn != null) {
            this.setState({
                disableAnalyzeBtn: props.disableAnalyzeBtn
            });
        }
        if (props.folders.length > 0 && this.state.selectedFolder == null) {
            this.setState({
                selectedFolder: props.folders[0]
            })
        }
        if (this.state.newFavoriteName != null && props.saveFavorite != false) {
            if (this.state.newFavoriteName != props.saveFavorite) {
                this.handleSaveFavorite(props.saveFavorite);
            }
        }
    }

    handleStartChange = date => {
        this.setState({
            startDate: date
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

    handleSelectFavorite = event => {
        this.setState({
            selectedFavorite: event.target.innerText
        })
        var jsonObj = `
        { 
            "email":"` + this.email + `",
            "messagetype":"callfavorite",
	        "favoritename": "` + event.target.innerText + `" 
        }`;
        var favObj = [event.target.innerText];
        this.props.onSelectFavorite(favObj);
        this.ws.send(jsonObj);
    }

    handleAddFavorite = () => {
        this.props.onAddFavorite(true);
    }

    handleSaveFavorite = (favoriteName) => {
        if (this.state.selectedFolder != null) {
            if (this.state.filterInterval != null) {
                let month = this.state.startDate.getMonth() + 1;
                let day = this.state.startDate.getDate();
                let year = this.state.startDate.getFullYear();
                let dateString = year + "/" + month + "/" + day + " 00:00:00";
                var jsonObj = `
                    {"email":"` + this.email + `",
                    "messagetype":"addfavorite",
                        "favoritename": "` + favoriteName + `" ,
                        "filter": {
                            "foldername": "` + this.state.selectedFolder + `",
                            "date": "` + dateString + `",
                            "interval": "` + this.state.filterInterval + `",
                            "attachment":"` + this.state.attachment + `",
                            "seen":"` + this.state.seen + `"
                        }
                    }`;
                this.setState({
                    newFavoriteName: null
                })
                this.ws.send(jsonObj);
            } else {
                alert("Please select an interval value.")
            }
        } else {
            alert("Please select a folder to analyze.")
        }

    }

    handleToggleFolders = () => {
        this.setState({
            showFolders: !this.state.showFolders
        })
    }

    handleSelectFolder = event => {
        this.setState({
            selectedFolder: event.target.innerText
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

    handleEditFavorites = () => {
        this.setState({
            showDeleteFavorites: true
        })
    }

    doneEditingFavorites = () => {
        this.setState({
            showDeleteFavorites: false
        })
    }

    deleteFavorite = (event) => {
        var fav = event.target.parentElement.id;
        let jsonObj =
            `{
                "email":"` + this.email + `",
                "messagetype": "removefavorite",
                "favoritename":"` + fav + `"
            }`;
        this.ws.send(jsonObj);
    }

    clearFilter = () => {
        this.setState({
            startDate: new Date(this.initDate.setMonth(this.thisMonth - 1)),
            filterInterval: "month",
            flaggedEmail: false,
            attachment: false,
            seen: true
        })
    }

    clearFavoriteSelection = () => {
        this.setState({
            selectedFavorite: null
        })
        this.props.onClearFavorite(true);
    }

    sendFilter = () => {
        if (this.state.selectedFolder != null) {
            if (this.state.filterInterval != null) {
                let month = this.state.startDate.getMonth() + 1;
                let day = this.state.startDate.getDate();
                let year = this.state.startDate.getFullYear();
                let dateString = year + "/" + month + "/" + day + " 00:00:00";
                let jsonObj =
                    `{
                    "email":"` + this.email + `",
                    "messagetype": "filter",
                    "filter": {
                        "foldername": "` + this.state.selectedFolder + `",
                        "date": "` + dateString + `",
                        "interval": "` + this.state.filterInterval + `",
                        "attachment": "` + this.state.attachment + `",
                        "seen": "` + this.state.seen + `"
                    }
                }`;
                this.ws.send(jsonObj);
                this.setState({
                    disableAnalyzeBtn: true
                })
            } else {
                alert("Please select an interval value.")
            }
        } else {
            alert("Please select a folder to analyze.")
        }
    }

    render() {
        return (
            <div className="sidenav">
                {/* <a className="alt">Favorites
                        <span className="caret"
                        style={this.state.showFavorites ? { display: 'none' } : {}}
                        onClick={this.handleToggleFavorites}>
                    </span>
                    <span className="caret-up"
                        style={!this.state.showFavorites ? { display: 'none' } : {}}
                        onClick={this.handleToggleFavorites}>
                    </span>
                    <span className="space" >&nbsp; &nbsp;</span>
                    <span className="clearMsg" onClick={this.clearFavoriteSelection}>Clear Selection</span>
                </a> */}
                {/* <div style={!this.state.showFavorites ? { display: 'none' } : {}}>
                    <ul className="sidenav-lists">
                        {   this.state.favorites ? (
                            this.state.favorites.map(el =>
                                <li value={el}
                                    className="item"
                                    style={el === this.state.selectedFavorite ? { color: '#f8ce74' } : { color: 'white' }}>
                                    <span className="deleteIcon"
                                        onClick={this.deleteFavorite}
                                        id={el}
                                        style={this.state.showDeleteFavorites ? { display: 'inline' } : { display: 'none' }}>
                                        <FontAwesomeIcon
                                            id={el}
                                            onClick={this.deleteFavorite}
                                            icon={faMinusCircle} />
                                        &nbsp; &nbsp;
                                    </span>
                                    <span onClick={this.handleSelectFavorite}>
                                        {el}
                                    </span>
                                </li>
                            ) ) : null
                        }
                    </ul>
                    {this.state.favorites && this.state.favorites.length != 0 ?
                        <button
                            style={!this.state.showDeleteFavorites ? { display: 'inline' } : { display: 'none' }}
                            className="editBtn" onClick={this.handleEditFavorites}>
                            Edit Favorites
                    </button> : null}
                    <button
                        style={this.state.showDeleteFavorites ? { display: 'inline' } : { display: 'none' }}
                        className="editBtn" onClick={this.doneEditingFavorites}>
                        Done
                    </button>
                </div> */}
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
                            this.state.folders != null ? (
                                this.state.folders.map(el =>
                                    <li value={el}
                                        className="item"
                                        style={el === this.state.selectedFolder ? { color: '#f8ce74' } : { color: 'white' }}
                                        onClick={this.handleSelectFolder}> {el}
                                    </li>)) : null
                        }
                    </ul>
                    
                    
                </div>
                <br></br>
                <button className="intervalBtn-Apply" onClick={this.sendFilter} disabled={this.state.disableAnalyzeBtn}>
                        Analyze
                </button>

                {/* <a className="alt">Filters
                        <b><span className="clearMsg" onClick={this.clearFilter}>Clear Filter</span></b>
                </a>
                <div className="sidenav-contents">
                    <div class="filter-title">Start Date:</div>
                    <DatePicker className="selector"
                        selected={this.state.startDate}
                        onChange={this.handleStartChange}
                    />
                    <div class="filter-title">Set Interval:</div>
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
                    <div class="filter-title">Contains:</div>
                    <div className="containsGroup">
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
                    <div>
                        <br></br>
                        <button className="intervalBtn-Apply" onClick={this.sendFilter}>
                            Apply Filters
                        </button>
                        <button className="intervalBtn-Favorite" onClick={this.handleAddFavorite}>
                            Add Favorite
                        </button>
                    </div>
                    <br></br><br></br>
                </div> */}
            </div>
        );
    }
}

export default SideNav;