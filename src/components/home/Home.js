import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    const { isAuthenticated, login } = this.props.auth;
    return (
      <div>
        <h1>Welcome to BarBack!</h1>
        {isAuthenticated() ? (
          <Link to="/bars">View Bars</Link>
        ) : (
          <button onClick={login}>Log in</button>
        )}
      </div>
    );
  }
}
