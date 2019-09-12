import React, { Component } from "react";
import { Link } from "react-router-dom";

import API from "../../API";

class UserLoginNew extends Component {
  state = {
    email: "",
    password: ""
  };

  loginUser = credentials => {
    API.login(credentials).then(authData => {
      if (authData.error) {
        alert("Wrong username or password");
      } else {
        localStorage.setItem("token", authData.jwt);
        this.props.history.push("/movies");
        API.getCurrentUser(authData.jwt).then(
          this.props.getCurrentUser(authData.jwt)
        );
      }
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.loginUser(this.state);
  };

  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h3 className="active"> Log in </h3>
          <Link to="/signup">
            <h3 className="inactive underlineHover">Sign Up </h3>
          </Link>
          <form onSubmit={this.handleSubmit}>
            <input
              type="email"
              id="email"
              className="fadeIn first"
              name="email"
              placeholder="email"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <input
              type="password"
              id="password"
              className="fadeIn second"
              name="password"
              placeholder="password"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <input type="submit" className="fadeIn third" value="Log In" />
          </form>
          <div id="formFooter">
            MyFlix
            {/* <a className="underlineHover" href="/">Forgot Password?</a> */}
          </div>
        </div>
      </div>
    );
  }
}

export default UserLoginNew;
