import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

function NavBar(props) {
  const { isAuthenticated, login, logout } = props.auth;
  return (
    <nav className="navigation navbar navbar-dark bg-primary fixed-top">
      <a className="navbar-brand" href="/">
        <h4 className="title">BarBack</h4>
      </a>
      <ul className="nav">
        {isAuthenticated() && (
          <li className="nav">
            <Link className="nav-link" to="/">
              <h5>Home</h5>
            </Link>
          </li>
        )}

        {isAuthenticated() && (
          <li className="nav">
            <Link className="nav-link" to="/bars">
              <h5>Bars</h5>
            </Link>
          </li>
        )}

        {/* {isAuthenticated() && (
          <li className="nav">
            <Link className="nav-link" to="/products">
              Products
            </Link>
          </li>
        )} */}

        <li className="navbar-right">
          <button
            className="button"
            onClick={isAuthenticated() ? logout : login}
          >
            {isAuthenticated() ? "Log Out" : "Log In"}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
