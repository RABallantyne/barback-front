import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/home/Home";
import Bars from "./components/bars/Bars";
import Auth from "./Auth";
import Callback from "./Callback";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  render() {
    return (
      <div className="App">
        {/* <NavBar auth={this.auth} /> */}
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact
              render={props => <Home auth={this.auth} {...props} />}
            />

            <Route
              path="/callback"
              render={props => <Callback auth={this.auth} {...props} />}
            />
            <Route
              path="/bars"
              render={
                props => (
                  // this.auth.isAuthenticated() ? (
                  <Bars key={Math.random()} auth={this.auth} {...props} />
                )
                // ) : (
                // this.auth.login()
                // )
              }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
  r;
}

export default App;
