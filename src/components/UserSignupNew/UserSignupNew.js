import React, { Component } from "react";
import { Link } from "react-router-dom";

import API from "../../API";

import "./UserSignupNew.sass";

class UserSignupNew extends Component {
  state = {
    name: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: ""
  };

  signupUser = () => {
    if (this.state.password !== this.state.confirmPassword) {
      alert("Passwords are not matching!");
    } else {
      API.createUser(this.state).then(resp => {
        if (resp.jwt === undefined) {
          alert(
            `${Object.keys(resp.error)[0]} ${Object.values(resp.error)[0]}`
          );
          this.props.history.push("/");
        } else {
          localStorage.setItem("token", resp.jwt);
          this.props.history.push("/movies");
          API.getCurrentUser(resp.jwt);
        }
      });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.signupUser(this.state);
  };

  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <Link to="/login">
            <h3 className="inactive underlineHover"> Log In </h3>
          </Link>
          <h3 className="active">Sign Up </h3>
          <form className="input-form" onSubmit={this.handleSubmit}>
            <input
              type="form-text"
              id="name"
              className="fadeIn first"
              name="name"
              placeholder="name"
              required
              value={this.state.name}
              onChange={this.handleChange}
            />
            <input
              type="email"
              id="email"
              className="fadeIn second"
              name="email"
              placeholder="email"
              required
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              type="number"
              min="1"
              id="age"
              className="fadeIn third"
              name="age"
              placeholder="age"
              // required
              value={this.state.age}
              onChange={this.handleChange}
            />
            <input
              type="password"
              id="password"
              className="fadeIn third"
              name="login"
              placeholder="password"
              required
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input
              type="password"
              id="confirmPassword"
              className="fadeIn fourth"
              name="login"
              placeholder="confirm password"
              required
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
            <input type="submit" className="fadeIn fourth" value="Sign Up" />
          </form>
          <div id="formFooter">
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              myFlixDb
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSignupNew;
