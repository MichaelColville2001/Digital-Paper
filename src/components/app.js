import React, { Component } from "react";


import Main from "./pages/main";
import Icons from "./helpers/icons";
import Login from "./pages/login";

export default class App extends Component {
  constructor() {
    super();

    Icons();

    this.state = {
      login_status: false,
      id: ""
    }

    this.login = this.login.bind(this)
    this.noLogin = this.noLogin.bind(this)
    this.logout = this.logout.bind(this)
    this.setId = this.setId.bind(this)
  }

  setId(id) {
    this.setState({
      id: id
    })
  }

  login() {
    this.setState({
      login_status: true
    })
  }

  logout() {
    this.setState({
      login_status: false
    })
  }

  noLogin() {
    this.setState({
      login_status: false
    })
  }

  render() {
    return (
      <div className="app-wrapper">
            {this.state.login_status ? <Main id={this.state.id} logout={this.logout}/> : <Login login={this.login} noLogin={this.noLogin} setId={this.setId}/>}
      </div>
    );
  }
}
