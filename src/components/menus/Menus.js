import React, { Component } from "react";
import axios from "axios";
import AddMenuForm from "./AddMenuForm";
import Drinks from "../drinks/Drinks";
import "./Menus.css";

export default class Menus extends Component {
  state = {
    menus: [],
    showAddMenus: false,
    selectedMenu: null,
    menu: []
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

  // showMenu = () => {
  //   let config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${this.props.auth.getAccessToken()}`
  //     }
  //   };
  //   axios
  //     .get(
  //       `http://localhost:3000/bars/${this.props.selectedBar}/menus/${this.state.selectedMenu}`,
  //       config
  //     )
  //     // .then(response => console.log(response.data));
  //     .then(response => {
  //       this.setState({ menu: response.data });
  //     });
  // };

  addMenu = menu => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .post(
        `http://localhost:3000/bars/${this.props.selectedBar}/menus`,
        menu,
        config
      )
      // .then(result => console.log(result))
      .then(() => this.showMenus())
      .then(() => this.setState({ showAddMenus: false }));
  };

  toggleAddMenu = () => {
    this.state.showAddMenus
      ? this.setState({
          showAddMenus: false
        })
      : this.setState({
          showAddMenus: true
        });
  };

  setMenu = menu => {
    this.setState({
      selectedMenu: menu.id
    });
  };

  render() {
    // console.log(this.state.selectedMenu);
    return (
      <div>
        <h1>Menus</h1>

        <button onClick={() => this.toggleAddMenu()}>New Menu</button>
        {this.state.showAddMenus ? (
          <AddMenuForm
            addMenu={this.addMenu}
            selectedBar={this.props.selectedBar}
          />
        ) : null}
        <div className="menu-group">
          {this.state.menus.map(menu => (
            <div className="menu-container">
              <h2>{menu.menuName}</h2>
              <h4>{menu.menuNote}</h4>

              <button
                onClick={() => {
                  this.setMenu(menu);
                  // this.showMenu(this.state.selectedMenu);
                }}
              >
                View Menu
              </button>
            </div>
          ))}
        </div>
        {this.state.selectedMenu ? (
          <Drinks
            selectedBar={this.props.selectedBar}
            selectedMenu={this.state.selectedMenu}
            // drinks={this.state.menu.drinks}
            auth={this.props.auth}
          />
        ) : null}

        {console.log(this.state.selectedMenu)}
      </div>
    );
  }
}
