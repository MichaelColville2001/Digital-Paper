import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import ReactModal from "react-modal"

import RichTextEditor from '../helpers/RTE'

export default class Func extends Component {
    constructor(props) {
        super(props)

        this.modalStyles = {
            content: {
                padding: "0px",
                backgroundColor: "#white",
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
        return(
            <div>
                <ReactModal isOpen={(this.props.modal[0] && this.props.modal[1] === "text") ? true : false} onRequestClose={() => { this.props.closeModal() }} style={this.modalStyles}>
                    <RichTextEditor modal={this.props.modal} handleRTEC={this.handleRTEC}/>
                </ReactModal>
            </div>
        )
    }
}