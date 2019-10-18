import React, { Component } from "react";
import axios from "axios";

export default class Menus extends Component {
  state = {
    menus: [],
    selectedMenu: null
  };
  showMenus = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .get(`http://localhost:3000/bars/${this.props.selectedBar}/menus`, config)
      .then(response => {
        this.setState({ menus: response.data });
      });
  };
  componentDidMount() {
    this.showMenus();
  }

  render() {
    return (
      <div>
        <h1>Menus</h1>
        {this.state.menus.map(menu => (
          <>
            <h2>{menu.menuName}</h2>
            <h4>{menu.menuNote}</h4>
          </>
        ))}
      </div>
    );
  }
}
