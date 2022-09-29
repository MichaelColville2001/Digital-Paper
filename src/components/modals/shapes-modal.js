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
                <ReactModal isOpen={(this.props.modal[0] && this.props.modal[1] === "shapes") ? true : false} onRequestClose={() => { this.props.closeModal() }} style={this.modalStyles}>
                    <div className='top-card'>
                        <h1>Stuff</h1>
                    </div>
                    <div className='shapes'>
                        <div className='square' onClick={() => {this.props.secondaryChange("square"), this.props.change("square")}}>
                            <FontAwesomeIcon icon="square" className='icon' style={{color:`rgba(${this.props.color.r},${this.props.color.g},${this.props.color.b},${this.props.color.a})`}}/>
                        </div>
                    </div>
                </ReactModal>
            </div>
        )
    }
}