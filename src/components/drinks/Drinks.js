import React, { Component } from "react";
import axios from "axios";
import AddDrinkForm from "./AddDrinkForm";
import Drink from "../drink/Drink";
import "./Drinks.css";

export default class Drinks extends Component {
  state = {
    drinks: [],
    selectedDrink: null,
    drink: [],
    products: [],
    drinkCost: 0,
    drinkName: "",
    showDrink: false,
    margin: 0
  };

  showDrink = drinkId => {
    this.setState({
      products: [],
      drinkName: "",
      drinkCost: 0,
      selectedDrink: null,
      showDrink: false,
      margin: 0
    });
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .get(
        `http://localhost:3000/bars/${this.props.selectedBar}/menus/${this.props.selectedMenu}/drinks/${drinkId}`,
        config
      )
      .then(response => {
        console.log(response.data);
        setTimeout(() => {
          this.setState({
            products: response.data.products,
            drinkName: response.data.drinkName,
            drinkCost: 0,
            selectedDrink: response.data.id,
            showDrink: true,
            margin: response.data.margin
          });
        });
      });
  };

  drinkCost = cost => {
    this.setState({
      drinkCost: this.state.drinkCost + parseFloat(cost)
    });
  };

  render() {
    return (
      <div>
        <h1>Drinks</h1>
        <AddDrinkForm addDrink={this.props.addDrink} />
        <div className="drinks-group">
          {this.props.drinks.map(drink => (
            <div className="drinks-container">
              <h2>{drink.drinkName}</h2>
              <h3>{drink.drinkNote}</h3>
              <button onClick={() => this.showDrink(drink.id)}>Details</button>
            </div>
          ))}
        </div>
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
          />
        ) : null}{" "}
        {console.log(this.props.products_drinks)}
      </div>
    );
  }
}
