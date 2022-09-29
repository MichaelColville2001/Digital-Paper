import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import ReactModal from "react-modal";

export default class FileBrowserModal extends Component {
  constructor(props) {
    super(props);

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
        textAlign: "center",
      },
      overlay: {
        backgroundColor: "rgba(1, 1, 1, 0)",
      },
    };

    this.state = {
      fileList: "",
    };
    this.addFiles = this.addFiles.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.props.getFiles();
  }

  addFiles() {
    const list = new Set(this.list);
    for (let item = 0; item < this.props.fileList.length; item++) {
      list.add(
        <div>
        <h4
          className="file-item"
          key={this.props.fileList[item]["id"]}
          onClick={() => this.props.openFile(this.props.fileList[item]["id"])}
        >
          {this.props.fileList[item]["file_name"]}
        
        </h4>
        <FontAwesomeIcon style={{marginLeft: "10px"}} icon="trash" onClick={() => this.props.deleteFile(this.props.fileList[item]["id"])}/>
        </div>
      );
    }
    this.setState({
      fileList: list,
    });
  }

  render() {
    return (
      <div>
        <ReactModal
          isOpen={
            this.props.modal[0] && this.props.modal[1] === "file_browser"
              ? true
              : false
          }
          onRequestClose={() => {
            this.props.closeModal();
          }}
          style={this.modalStyles}
        >
          <div className="top-card">
            <h1>Files</h1>
          </div>
          <div className="files">{this.state.fileList}</div>
          <h3 className="more-files" onClick={() => this.addFiles()}>
            Browse Files
          </h3>
        </ReactModal>
      </div>
    );
  }
}
