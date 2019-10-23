import React, { Component } from "react";
import axios from "axios";
import AddDrinkForm from "./AddDrinkForm";
import Drink from "../drink/Drink";
import "./Drinks.css";
import EditDrinkForm from "./EditDrinkForm";

export default class Drinks extends Component {
  state = {
    drinks: [],
    selectedDrink: null,
    drink: [],
    products: [],
    drinkCost: 0,
    drinkName: "",
    showDrink: false,
    margin: 0,
    drinkNote: "",
    products_drinks: []
  };

  showDrink = drinkId => {
    this.setState({
      products: [],
      drinkName: "",
      drinkCost: 0,
      selectedDrink: null,
      showDrink: false,
      margin: 0,
      drinkNote: "",
      products_drinks: []
    });
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/menus/${this.props.selectedMenu}/drinks/${drinkId}`,
        config
      )
      .then(response => {
        setTimeout(() => {
          this.setState({
            products: response.data.products,
            products_drinks: response.data.products_drinks,
            drinkName: response.data.drinkName,
            drinkCost: 0,
            selectedDrink: response.data.id,
            showDrink: true,
            margin: response.data.margin,
            drinkNote: response.data.drinkNote
          });
        });
      });
  };

  deleteDrink = drink => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/menus/${this.props.selectedMenu}/drinks/${drink}`,
        config
      )
      .then(() => this.props.showDrinks());
  };

  editDrink = (drink, id) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/menus/${this.props.selectedMenu}/drinks/${id}`,
        drink,
        config
      )
      .then(() => this.showDrink());
  };

  drinkCost = cost => {
    this.setState({
      drinkCost: this.state.drinkCost + parseFloat(cost)
    });
  };

  render() {
    return (
      <div className="drinks-container">
        <h1>{this.props.menuName}</h1>
        {this.props.drinks.length === 0 ? (
          <button
            onClick={() => this.props.deleteMenu(this.props.selectedMenu)}
          >
            delete menu
          </button>
        ) : null}
        <AddDrinkForm addDrink={this.props.addDrink} />
        <div className="drinks-group">
          {this.props.drinks.map(drink => (
            <div key={drink.id} className="drink-container">
              <h2>{drink.drinkName}</h2>
              <h3>{drink.drinkNote}</h3>
              <button onClick={() => this.showDrink(drink.id)}>Details</button>
            </div>
          ))}
        </div>
        {this.state.showDrink ? (
          <EditDrinkForm
            editDrink={this.editDrink}
            drinkName={this.state.drinkName}
            drinkNote={this.state.drinkNote}
            margin={this.state.margin}
            selectedDrink={this.state.selectedDrink}
          />
        ) : null}
        {this.state.showDrink ? (
          <Drink
            drinkName={this.state.drinkName}
            addCost={this.drinkCost}
            products={this.state.products}
            drinkCost={this.state.drinkCost}
            selectedDrink={this.state.selectedDrink}
            auth={this.props.auth}
            selectedBar={this.props.selectedBar}
            selectedMenu={this.props.selectedMenu}
            showDrink={this.showDrink}
            margin={this.state.margin}
            drinkNote={this.state.drinkNote}
            products_drinks={this.state.products_drinks}
            deleteDrink={this.deleteDrink}
          />
        ) : null}{" "}
        {/* {console.log(this.props.products_drinks)} */}
      </div>
    );
  }
}
