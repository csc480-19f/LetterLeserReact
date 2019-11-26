import React, { Component } from "react";
import "./credits.css";

class Credits extends Component {
    render() {
        return (
            <div className="creditsBody">
                <h1>Credits</h1>
                <br></br><br></br>
                <h2>Resources</h2>
                <ul className="sidenav-lists">
                    <li>Charting: <a href="https://www.highcharts.com/" target="_blank"> Highcharts</a></li>
                    <li>Sentiment Calculator: 
                        <a href="http://www.nltk.org/ " target="_blank"> Python NLTK</a>
                    </li>
                    <li>Color Palette: <a href="https://color.adobe.com/create" target="_blank"> Adobe Color</a></li>
                </ul>
                <br></br><br></br>
                <h2>Team Members</h2>
                <ul className="sidenav-lists">
                    <li>Phoenix Boisnier • Emma Brunell • Priyanka De Silva</li>
                    <li>Charles Domicolo • Mike Doran • Daniel Hufnal</li>
                    <li>Theo Johnson • Jasmine Hundal • Kierstan Leaf</li>
                    <li>Alexander Lawrence • Jimmy Nguyen • Eian Prinsen</li>
                    <li>Bastian Tenbergen • Christopher Wypyski</li>
                </ul>
            </div>
        )
    }
}

export default Credits;