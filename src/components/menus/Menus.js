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
    menu: [],
    drinks: [],
    displayDrinks: false
  };

  showMenus = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/menus`,
        config
      )
      .then(response => {
        this.setState({ menus: response.data });
      });
  };

  componentDidMount() {
    this.showMenus();
  }

  showDrinks = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/menus/${this.state.selectedMenu}/`,
        config
      )
      .then(response => {
        console.log(response.data.drinks);
        this.setState({ drinks: response.data.drinks });
      });
  };

  addDrink = drink => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/menus/${this.state.selectedMenu}/drinks`,
        drink,
        config
      )
      .then(() => this.showDrinks());
  };

  addMenu = menu => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/menus`,
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
    // this.props.toggleShowMenus();
    this.setState({
      selectedMenu: menu.id
    });
    setTimeout(() => {
      this.showDrinks();
    }, 100);
  };

  render() {
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
            <div key={menu.id} className="menu-container">
              <h2>{menu.menuName}</h2>
              <h4>{menu.menuNote}</h4>

              <button
                onClick={() => {
                  this.setMenu(menu);
                }}
              >
                View Menu
              </button>
            </div>
          ))}
        </div>
        {this.state.selectedMenu ? (
          <Drinks
            addDrink={this.addDrink}
            selectedBar={this.props.selectedBar}
            selectedMenu={this.state.selectedMenu}
            drinks={this.state.drinks}
            auth={this.props.auth}
            showDrinks={this.showDrinks}
          />
        ) : null}
      </div>
    );
  }
}
