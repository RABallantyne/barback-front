import React from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
  const { isAuthenticated, login, logout } = props.auth;
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <ul className="nav">
        {isAuthenticated() && (
          <li className="nav">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
        )}

        <li>
          <button
            className="nav-item"
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
