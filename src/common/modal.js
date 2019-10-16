import React from 'react';
import './modal.css';

class Modal extends React.Component {

    state = {
        show: false, 
        input: ""
    }

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.setState({ 
            show: props.show 
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
            input: ""
        })
    }

    handleSave = () => {
        var oldInput = this.state.input;
        this.setState({
            show: false,
            input: ""
          }, () => {
              this.props.onSaveFavorite(oldInput)
        });
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
                    <button className="btn" onClick={this.handleClose}>Cancel</button>
                </section>
            </div>
        )
    }
}

export default Modal;