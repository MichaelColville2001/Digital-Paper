import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      email: "",
      password: "",
      remember_me: false,
      color: "rgba(0,0,0,0)",
      view: "main",
      validToReset: false,
      newPassword: "1",
      retypePassword: "0"
    };

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.auth = this.auth.bind(this);
    this.noAuth = this.noAuth.bind(this);
    this.remember = this.remember.bind(this);
    this.change = this.change.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.setState({
      email: JSON.parse(localStorage.getItem("remember")).email,
      password: JSON.parse(localStorage.getItem("remember")).password,
      remember_me: JSON.parse(localStorage.getItem("remember")).remember_me,
      color: JSON.parse(localStorage.getItem("remember")).color,
    });
  }
  componentDidUpdate() {
    if (this.state.remember_me) {
      localStorage.setItem("remember", JSON.stringify(this.state));
    } else {
      localStorage.setItem(
        "remember",
        JSON.stringify({
          email: "",
          password: "",
          remember_me: false,
          color: "rgba(0,0,0,0)",
        })
      );
    }
  }

  valid(event) {
    axios
      .post("https://digital-paper-api.herokuapp.com/user/verify", {
        user: {
          email: this.state.email,
          password: this.state.password,
        },
      })
      .then((response) => {
        if (response.data[0] === "true") {
      this.setState({
        validToReset: true,
        id: response.data[1]
      });
    }
  })
  event.preventDefault()
}


  changeView(change) {
    this.setState({
      view: change,
    });
  }

  notValid(view) {
    this.setState({
      view: view,
      validToReset: false
    });
  }

  remember() {
    if (this.state.remember_me) {
      this.setState({
        remember_me: false,
        color: "rgba(0,0,0,0)",
      });
    } else {
      this.setState({
        remember_me: true,
        color: "rgba(33,216,178,.5)",
      });
    }
    return null;
  }

  auth() {
    this.props.login();
  }

  noAuth() {
    this.props.noLogin();
  }

  change(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submit(event) {
    axios
      .post("https://digital-paper-api.herokuapp.com/user/verify", {
        user: {
          email: this.state.email,
          password: this.state.password,
        },
      })
      .then((response) => {
        if (response.data[0] === "true") {
          this.setState({
            id: response.data[1] 
          })
          this.props.setId(response.data[1])
          this.auth();
        } else {
          this.noAuth();
        }
      })
      .catch((error) => {
        console.log(error);
        this.noAuth();
      });
    event.preventDefault();
  }

  createUser(event) {
    if (this.state.email === "" || this.state.password === "") {
      return null;
    }
    axios
      .post("https://digital-paper-api.herokuapp.com/user/add", {
        user: {
          email: this.state.email,
          password: this.state.password,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data === "new user created") {
        }
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  }

  resetPassword(event) {
    if (this.state.newPassword === this.state.retypePassword) {
    axios
    .put(`https://digital-paper-api.herokuapp.com/user/resetpass/${this.state.id}`, {
      user: {
        password: this.state.newPassword,
      },
    })
    .then((response) => {
      console.log(response);
      if (response.data === "password reset") {
      }
    })
    .catch((error) => {
      console.log(error);
    });
  event.preventDefault();
  this.setState({
    validToReset: false
  })
  }
}

  render() {
    return (
      <div>
        {this.state.view === "main" ? (
          <div className="login">
            <div className="title">
              <h1>Digital Paper</h1>
            </div>
            <form className="login-wrapper" onSubmit={this.submit}>
              <input
                className="email-text-field"
                type="text"
                name="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.change}
              />
              <input
                className="password-text-field"
                type="text"
                name="password"
                placeholder="password"
                autoComplete="off"
                style={{ WebkitTextSecurity: "circle" }}
                value={this.state.password}
                onChange={this.change}
              />
              <div className="ect">
                <h2 className="remember-me">
                  Remember Me{" "}
                  <div
                    className="click"
                    onClick={() => this.remember()}
                    style={{
                      backgroundColor: `${this.state.color}`,
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      border: "1px black solid",
                    }}
                  ></div>
                </h2>
                <h2
                  className="reset-pass"
                  onClick={() => this.changeView("reset")}
                >
                  Reset Password
                </h2>
                <h2
                  className="create-user"
                  onClick={() => this.changeView("create")}
                >
                  Create User
                </h2>
              </div>
              <button className="submit-btn" type="submit">
                Login
              </button>
            </form>
          </div>
        ) : this.state.view === "reset" ? (
          !this.state.validToReset ? (
            <div className="create">
              <div className="title">
                <h1>Digital Paper</h1>
              </div>
              <form className="login-wrapper" onSubmit={(event) => this.valid(event)}>
                <div className="two-row">
                  <FontAwesomeIcon
                    icon="xmark"
                    className="icon"
                    onClick={() => this.changeView("main")}
                  />
                  <h1 style={{ margin: "0px" }}>Sign In To Reset</h1>
                </div>
                <input
                  className="email-text-field"
                  type="text"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.change}
                />
                <input
                  className="password-text-field"
                  type="text"
                  name="password"
                  placeholder="password"
                  autoComplete="off"
                  style={{ WebkitTextSecurity: "circle" }}
                  value={this.state.password}
                  onChange={this.change}
                />
                <button className="submit-btn" type="submit">
                  Sign In
                </button>
              </form>
            </div>
          ) : <div className="create">
          <div className="title">
            <h1>Digital Paper</h1>
          </div>
          <form className="login-wrapper" onSubmit={(event) => this.resetPassword(event)}>
            <div className="two-row">
              <FontAwesomeIcon
                icon="xmark"
                className="icon"
                onClick={() => this.notValid("main")}
              />
              <h1 style={{ margin: "0px" }}>Pick New Password</h1>
            </div>
            <input
              className="email-text-field"
              type="text"
              name="newPassword"
              placeholder="new password"
              autoComplete="off"
              value={this.state.newPassword}
              style={{ WebkitTextSecurity: "circle" }}
              onChange={this.change}
            />
            <input
              className="password-text-field"
              type="text"
              name="retypePassword"
              placeholder="retype password"
              autoComplete="off"
              value={this.state.retypePassword}
              style={{ WebkitTextSecurity: "circle" }}
              onChange={this.change}
            />
            <button className="submit-btn" type="submit">
              Reset Password
            </button>
          </form>
        </div>
        ) : this.state.view === "create" ? (
          <div className="create">
            <div className="title">
              <h1>Digital Paper</h1>
            </div>
            <form className="login-wrapper" onSubmit={() => this.createUser()}>
              <div className="two-row">
                <FontAwesomeIcon
                  icon="xmark"
                  className="icon"
                  onClick={() => this.changeView("main")}
                />
                <h1 style={{ margin: "0px" }}>Create User</h1>
              </div>
              <input
                className="email-text-field"
                type="text"
                name="email"
                placeholder="email"
                autoComplete="off"
                value={this.state.email}
                onChange={this.change}
              />
              <input
                className="password-text-field"
                type="text"
                name="password"
                placeholder="password"
                autoComplete="off"
                style={{ WebkitTextSecurity: "circle" }}
                value={this.state.password}
                onChange={this.change}
              />
              <button className="submit-btn" type="submit">
                Create User
              </button>
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}
