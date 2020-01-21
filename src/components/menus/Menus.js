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
    displayDrinks: false,
    displayMenus: false,
    menuName: "",
    config: {
      headers: {
        "Content-Type": "application/json"
        // Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    }
  };

  showMenus = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/menus`,
        this.state.config
      )
      .then(response => {
        this.setState({ menus: response.data, displayMenus: true });
      });
  };

  componentDidMount() {
    this.showMenus();
  }

  showDrinks = () => {
    let config = {
      headers: {
        "Content-Type": "application/json"
        // Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/menus/${this.state.selectedMenu}/`,
        config
      )
      .then(response => {
        this.setState({ drinks: response.data.drinks });
      });
  };

  addDrink = drink => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/menus/${this.state.selectedMenu}/drinks`,
        drink,
        this.state.config
      )
      .then(() => this.showDrinks());
  };

  addMenu = menu => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/menus`,
        menu,
        this.state.config
      )
      // .then(result => console.log(result))
      .then(() => this.showMenus())
      .then(() => this.setState({ showAddMenus: false }));
  };

  deleteMenu = menu => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/menus/${menu}`,
        this.state.config
      )
      .then(() => this.showMenus())
      .then(() => this.setState({ selectedMenu: null, displayMenus: true }));
    // .then(() => this.setState({ displayMenus: true }));
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
      selectedMenu: menu.id,
      displayMenus: false,
      menuName: menu.menuName
    });
    setTimeout(() => {
      this.showDrinks();
    }, 100);
  };

  render() {
    return (
      <div>
        {this.state.displayMenus ? (
          <div>
            <h1>Menus</h1>
            <button onClick={() => this.toggleAddMenu()}>New Menu</button>
            {this.state.showAddMenus ? (
              <AddMenuForm
                addMenu={this.addMenu}
                selectedBar={this.props.selectedBar}
              />
            ) : null}
          </div>
        ) : null}
        {this.state.displayMenus ? (
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
        ) : null}
        {this.state.selectedMenu ? (
          <Drinks
            addDrink={this.addDrink}
            selectedBar={this.props.selectedBar}
            selectedMenu={this.state.selectedMenu}
            drinks={this.state.drinks}
            auth={this.props.auth}
            showDrinks={this.showDrinks}
            deleteMenu={this.deleteMenu}
            menuName={this.state.menuName}
          />
        ) : null}
      </div>
    );
  }
}
