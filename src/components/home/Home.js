import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default class Home extends Component {
  render() {
    const { isAuthenticated, login } = this.props.auth;
    return (
      <div className="home-main">
        {/* {isAuthenticated() ? ( */}
        <>
          <h1>Welcome to BarBack!</h1>

          <h2>For demonstration purposes, auth has been disabled.</h2>
          <Link to="/bars">
            <h2>Log In</h2>
          </Link>
        </>
        {/* ) : ( */}
        {/* <>
            <h1>Welcome to BarBack!</h1>
            <h2>Please Log in.</h2>
            <button onClick={login}>Log in</button>
          </>
        )} */}
      </div>
    );
  }
}
