import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import ReactModal from "react-modal"

export default class ShapeModal extends Component {
    constructor(props) {
        super(props)

        this.modalStyles = {
            content: {
                padding: "0px",
                backgroundColor: "#767676",
                border: "none",
                width: "19vw",
                height: "85.9vh",
                marginTop: "13vh",
                marginLeft: ".5vw",
                borderRadius: "7px",
                position: "0px",
                textAlign: "center"
            },
            overlay: {
                backgroundColor: "rgba(1, 1, 1, 0)"
            }
        }
    }

    render() {
        return (
            <div>
                <ReactModal isOpen={(this.props.modal[0] && this.props.modal[1] === "settings") ? true : false} onRequestClose={() => { this.props.closeModal() }} style={this.modalStyles}>
                    <div className='top-card'>
                        <h1>Settings</h1>
                    </div>
                    <div className='settings'>
                    <h3 className="set" onClick={() => this.props.resetState()}>Reset State</h3>
                    <h3 className='set' onClick={() => this.props.logout()}>Logout</h3>
                    <h3 className='set' onClick={() => this.props.deleteUser()}>Delete Profile</h3>
                    </div>
                </ReactModal>
            </div>
        )
    }
}