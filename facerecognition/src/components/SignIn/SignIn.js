import React, { Component } from "react";
import "./SignIn.css";

import Email from "../Inputs/email";
import Password from "../Inputs/password";

import Button from "../Button/button";
import CustomButton from "../Button/customButton";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signInEmail: "",
      signInPassword: "",
      error: ""
    };
  }

  onEmailChange = event => {
    this.setState({
      signInEmail: event.target.value
    });
  };

  onPasswordChange = event => {
    this.setState({
      signInPassword: event.target.value
    });
  };

  onSubmitSignIn = e => {
    e.preventDefault();
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        console.log("user: ", user);
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          this.setState({
            error: user
          });
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <div className="signIn  br3 z-1 b--black-10 mv6 shadow-5 w-100 w-50-m w-25-l mw6 center">
        <form onSubmit={this.onSubmitSignIn} className="pa4 black-80">
          <div className="measure z-1">
            <div id="sign_in" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>

              <Email onEmailChange={this.onEmailChange} />
              <Password onPasswordChange={this.onPasswordChange} />
            </div>

            <Button onSubmit={this.onSubmitSignIn} name={"Sign In"} />
            <CustomButton name={"Register"} onRouteChange={onRouteChange} />
          </div>
          <p className="error">{this.state.error}</p>
        </form>
      </div>
    );
  }
}

export default SignIn;
