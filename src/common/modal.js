import React from 'react';
import './modal.css';

class Modal extends React.Component {

    state = {
        show: false, 
        input: "",
        favoritesList: [],
        favoriteError: false
    }

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.setState({ 
            show: props.show,
            favoritesList: props.favorites
        });
    }

    handleInputChange = event => {
        this.setState({
            input: event.target.value
        })
    }

    handleClose = () => {
        this.setState({
            show: false,
            input: "", 
            favoriteError: false
        })
    }

    handleSave = () => {
        var oldInput = this.state.input;
        var favoriteExists = false;
        for (var i in this.state.favoritesList) {
            if (this.state.favoritesList[i] == oldInput) {
                favoriteExists = true;
            }
        }
        if (favoriteExists == false) {
            this.setState({
                show: false,
                input: "",
                favoriteError: false
              }, () => {
                  this.props.onSaveFavorite(oldInput)
            });
        } else {
            this.setState({
                favoriteError: true
            })
        }
    }

    render() {
        return (
            <div style={this.state.show ? {display:"block"} : {display:"none"}}>
                <section className='modal-main'>
                    Name of Favorite:
                    <br></br> <br></br>
                    <input onChange={this.handleInputChange} value={this.state.input}></input>
                    <br></br><br></br>
                    <button className="btn" onClick={this.handleSave}>Save</button>
                    <button className="btn-close" onClick={this.handleClose}>Cancel</button>
                    <br></br>
                    <span 
                    className="errorMsg"
                    style={this.state.favoriteError ? {display: 'block'} : {display: 'none'}}>
                        Favorite name must be unique.
                    </span>
                </section>
            </div>
        )
    }
}

export default Modal;