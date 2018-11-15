import React, { Component } from "react";
import "./Register.css";

import Email from "../Inputs/email";
import Name from "../Inputs/name";
import Password from "../Inputs/password";

import Button from "../Button/button";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
      error: ""
    };
  }

  onEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  onPasswordChange = event => {
    console.log("eventPassword: ", event.target.value);
    this.setState({
      password: event.target.value
    });
  };

  onNameChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  onRegister = e => {
    e.preventDefault();
    const { email, password, name } = this.state;
    if (email === "" || password === "" || name === "") {
      this.setState({ error: "Please fill out all the input fields" });
    } else {
      fetch("http://localhost:3000/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name
        })
      })
        .then(response => response.json())
        .then(user => {
          console.log("register", user);
          if (user) {
            this.props.loadUser(user);
            this.props.onRouteChange("home");
          } else {
            console.log(user);
          }
        });
    }
  };

  render() {
    return (
      <form
        onSubmit={this.onRegister}
        className="register  br3 z-1 b--black-10 mv6 shadow-5 w-100 w-50-m w-25-l mw6 center"
      >
        <div className="pa4 black-80">
          <div className="measure z-1">
            <div id="sign_in" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>

              <Name onNameChange={this.onNameChange} />
              <Email onEmailChange={this.onEmailChange} />
              <Password onPasswordChange={this.onPasswordChange} />
            </div>

            <Button onSubmit={this.onRegister} name={"Register"} />
          </div>
          <p>{this.state.error}</p>
        </div>
      </form>
    );
  }
}

export default Register;
