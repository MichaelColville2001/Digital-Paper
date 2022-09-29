import React, { Component } from "react";

import ColorPicker from "../helpers/color-picker";
import Filebar from "../main/main-four/filebar";
import Favbar from "../main/main-four/favbar";
import Changes from "../main/main-four/changes";
import ShapeModal from "../modals/shapes-modal";
import TextModal from "../modals/text-modal";
import SettingsModal from "../modals/settings-modal";
import FileBrowserModal from "../modals/file-browser";
import axios from "axios";
import { faL } from "@fortawesome/free-solid-svg-icons";

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      file: [<div></div>, <div></div>],
      fileName: "New File",
      fileId: "",
      revertList: [],
      currentRevert: 0,
      modal: [false, "shapes"],
      activeChange: "",
      secondaryChange: "",
      temp: false,
      tempCords: [0, 0],
      color: {
        r: "0",
        g: "0",
        b: "0",
        a: "1",
      },
      pickerOn: false,
      fileList: ""
    };

    this.add = this.add.bind(this);
    this.revert = this.revert.bind(this);
    this.unRevert = this.unRevert.bind(this);
    this.changeModal = this.changeModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.change = this.change.bind(this);
    this.secondaryChange = this.secondaryChange.bind(this);
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.handleRTEC = this.handleRTEC.bind(this);
    this.resetState = this.resetState.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.save = this.save.bind(this);
    this.openFile = this.openFile.bind(this)
    this.getFiles = this. getFiles.bind(this)
    this.deleteFile = this.deleteFile.bind(this)
  }

  UNSAFE_componentWillMount() {
    this.setState({
      id: this.props.id,
    });
    /*this.setState({
      fileId: JSON.parse(localStorage.getItem("state")).fileId,
      fileName: JSON.parse(localStorage.getItem("state")).fileName,
      revertList: JSON.parse(localStorage.getItem("state")).revertList,
      currentRevert: JSON.parse(localStorage.getItem("state")).currentRevert,
      modal: JSON.parse(localStorage.getItem("state")).modal,
      activeChange: JSON.parse(localStorage.getItem("state")).activeChange,
      secondaryChange: JSON.parse(localStorage.getItem("state"))
        .secondaryChange,
      temp: JSON.parse(localStorage.getItem("state")).temp,
      tempCords: JSON.parse(localStorage.getItem("state")).tempCords,
      color: JSON.parse(localStorage.getItem("state")).color,
      pickerOn: JSON.parse(localStorage.getItem("state")).pickerOn,
    });
    const newList = new Set(this.list);
    for (
      let item = 0;
      item < JSON.parse(localStorage.getItem("state")).file.length;
      item++
    ) {
      let newFile = "";
      if (JSON.parse(localStorage.getItem("state")).file[item].type === "div") {
        newFile = (
          <div
            style={
              JSON.parse(localStorage.getItem("state")).file[item].props.style
            }
          >
            {
              JSON.parse(localStorage.getItem("state")).file[item].props
                .childern
            }
          </div>
        );
      }
      newList.add(newFile);
    }
    this.setState({
      file: newList,
    });*/
  }

  componentDidUpdate() {
    /*localStorage.setItem("state", JSON.stringify(this.state));*/
    console.log(this.state)
  }

  save() {
    if (this.state.fileId === "") {
      let name = prompt("Choose A File Name");
      axios.post("https://digital-paper-api.herokuapp.com/file/add", {
        user: {
          file_name: name,
          file: JSON.stringify(this.state.file),
          user_fk: this.state.id,
        },
      });
    } else {
      axios.put(`https://digital-paper-api.herokuapp.com/file/update/${this.state.fileId}`, {
        user: {
          file_name: this.state.fileName,
          file: JSON.stringify(this.state.file),
        },
      });
    }
  }

  openFile(id) {
    this.resetState()
    axios.get(`https://digital-paper-api.herokuapp.com/file/get/${id}`).then((response) => {
      this.setState({
        fileName: response.data.file_name,
        fileId: response.data.id,
      });
      const newList = new Set(this.list);
      for (let item = 0; item < JSON.parse(response.data.file).length; item++) {
        let newFile = "";
        if (JSON.parse(response.data.file)[item].type === "div") {
          newFile = (
            <div
              style={
                JSON.parse(response.data.file)[item].props.style
              }
            >
              {
                JSON.parse(response.data.file)[item].props
                  .childern
              }
            </div>
          );
        }
        newList.add(newFile);
      }
      this.setState({
        file: newList,
      });
    });
  }

  getFiles() {
    axios
    .get(`https://digital-paper-api.herokuapp.com/user/get/${this.state.id}`)
    .then(response => {
      const Data = response.data.files
      this.setState({
        fileList: Data
      })
    })
  }

  deleteFile(id) {
    axios.delete(`https://digital-paper-api.herokuapp.com/file/delete/${id}`);
    this.getFiles()
    this.setState({
      pickerOn: false
    })
  }

  deleteUser() {
    axios.delete(`https://digital-paper-api.herokuapp.com/user/delete/${this.state.id}`);
    this.props.logout();
  }

  resetState() {
    this.setState({
      file: [<div></div>, <div></div>],
      fileName: "New File",
      fileId: "",
      revertList: [[<div></div>, <div></div>]],
      currentRevert: 0,
      modal: [false, "shapes"],
      activeChange: "",
      secondaryChange: "",
      temp: false,
      tempCords: [0, 0],
      color: {
        r: "0",
        g: "0",
        b: "0",
        a: "1",
      },
      pickerOn: false,
    });
  }

  /* Modal Stuff */

  changeModal(type) {
    this.setState({
      modal: [true, `${type}`],
    });
  }

  closeModal() {
    this.setState({
      modal: [false, ""],
    });
  }

  /* Changes */

  change(change) {
    this.setState({
      activeChange: `${change}`,
    });
  }

  secondaryChange(change) {
    this.setState({
      secondaryChange: `${change}`,
    });
  }

  handleRTEC(content) {
    const newFile = new Set(this.state.file);
    newFile.add(content);
    this.setState({ file: newFile });
    this.setState({ revertList: [...this.state.revertList, newFile] });
    this.setState({ temp: false });
  }

  add(event) {
    const x = event.clientX;
    const y = event.clientY;
    /* square event */
    if (this.state.activeChange === "square" && this.state.temp === false) {
      this.setState({ tempCords: [x, y] });
      this.setState({ temp: true });
    } else if (this.state.activeChange === "square" && this.state.temp) {
      const x = event.clientX;
      const y = event.clientY;
      let Width = 0;
      let Height = 0;
      let tempWidth = 0;
      let tempHeight = 0;
      if (x > this.state.tempCords[0]) {
        Width = x - this.state.tempCords[0];
      } else if (x < this.state.tempCords[0]) {
        Width = this.state.tempCords[0] - x;
      }
      if (y > this.state.tempCords[1]) {
        Height = y - this.state.tempCords[1];
        if (x > this.state.tempCords[0]) {
          /* down right */
          tempWidth = -Width;
          tempHeight = -Height;
        } else if (x < this.state.tempCords[0]) {
          /* down left */
          tempWidth = 0;
          tempHeight = -Height;
        }
      } else if (y < this.state.tempCords[1]) {
        Height = this.state.tempCords[1] - y;
        if (x > this.state.tempCords[0]) {
          /* up right */
          tempWidth = -Width;
          tempHeight = 0;
        } else if (x < this.state.tempCords[0]) {
          /* up left */
          tempWidth = 0;
          tempHeight = 0;
        }
      }
      const newFile = new Set(this.state.file);
      newFile.add(
        <div
          className="box"
          style={{
            position: "absolute",
            backgroundColor: `rgba(${this.state.color.r},${this.state.color.g},${this.state.color.b},${this.state.color.a})`,
            width: `${Width}px`,
            height: `${Height}px`,
            marginLeft: x - window.innerWidth * 0.2 + tempWidth,
            marginTop: y - window.innerHeight * 0.13 + tempHeight,
          }}
        ></div>
      );
      const revert = this.state.currentRevert + 1;
      this.setState({ file: newFile });
      this.setState({ currentRevert: revert });
      this.setState({ revertList: [...this.state.revertList, newFile] });
      this.setState({ temp: false });
    }
  }

  /* File Events */

  revert() {
    if (this.state.currentRevert === 0) {
      return null;
    } else {
      const revert = this.state.currentRevert - 1;
      const newList = new Set(this.list);
      for (let item = 0; item < this.state.revertList[revert].length; item++) {
        let newFile = "";
        if (this.state.revertList[revert][item].type === "div") {
          newFile = (
            <div style={this.state.revertList[revert][item].props.style}>
              {this.state.revertList[revert][item].props.childern}
            </div>
          );
        }
        newList.add(newFile);
      }
      this.setState({
        file: newList,
        currentRevert: revert,
      });
    }
  }

  unRevert() {
    if (this.state.currentRevert === this.state.revertList.length - 1) {
      return null;
    } else {
      const revert = this.state.currentRevert + 1;
      const newList = new Set(this.list);
      for (let item = 0; item < this.state.revertList[revert].length; item++) {
        let newFile = "";
        if (this.state.revertList[revert][item].type === "div") {
          newFile = (
            <div style={this.state.revertList[revert][item].props.style}>
              {this.state.revertList[revert][item].props.childern}
            </div>
          );
        }
        newList.add(newFile);
      }
      this.setState({
        file: newList,
        currentRevert: revert,
      });
    }
  }

  /* favbar items */

  toggleColorPicker() {
    if (this.state.pickerOn) {
      this.change(this.state.secondaryChange);
      this.setState({ pickerOn: false });
    } else {
      this.change("");
      this.setState({ pickerOn: true });
    }
  }

  changeColor(color) {
    this.setState({
      color: color.rgb,
    });
  }

  render() {
    return (
      <div className="main-page-wrapper">
        <ShapeModal
          modal={this.state.modal}
          closeModal={this.closeModal}
          secondaryChange={this.secondaryChange}
          change={this.change}
          color={this.state.color}
        />
        <TextModal
          handleRTEC={this.handleRTEC}
          modal={this.state.modal}
          closeModal={this.closeModal}
          secondaryChange={this.secondaryChange}
          change={this.change}
          color={this.state.color}
        />
        <SettingsModal
          modal={this.state.modal}
          closeModal={this.closeModal}
          secondaryChange={this.secondaryChange}
          change={this.change}
          resetState={this.resetState}
          logout={this.props.logout}
          deleteUser={this.deleteUser}
        />
        <FileBrowserModal
          modal={this.state.modal}
          id={this.state.id}
          fileList={this.state.fileList}
          closeModal={this.closeModal}
          changeModal={this.changeModal}
          getFiles={this.getFiles}
          openFile={this.openFile}
          deleteFile={this.deleteFile}
        />
        <div className="top">
          <Filebar changeModal={this.changeModal} />
          <Favbar
            revert={this.revert}
            unRevert={this.unRevert}
            change={this.change}
            secondaryChange={this.secondaryChange}
            toggleColorPicker={this.toggleColorPicker}
            file={this.state.file}
            revertList={this.state.revertList}
            color={this.state.color}
            changeModal={this.changeModal}
            save={this.save}
          />
        </div>
        <div className="bottom">
          <Changes changeModal={this.changeModal} modal={this.state.modal} />
          <div className="view-wrapper">
            <div className="spacer"></div>
            <div className="viewer" onClick={(event) => this.add(event)}>
              {this.state.pickerOn ? (
                <ColorPicker
                  color={this.state.color}
                  changeColor={this.changeColor}
                />
              ) : null}
              {this.state.file}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
