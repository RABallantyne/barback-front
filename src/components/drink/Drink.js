import React, { Component } from "react";
import IngredientCard from "./IngredientCard";
import "./Drink.css";
import Ingredients from "../ingredients/Ingredients";
import axios from "axios";

export default class Drink extends Component {
  state = {
    showIngredients: false,
    totalCost: [],
    drinkCost: 0
  };

  drinkCost = cost => {
    this.state.totalCost.push(parseFloat(cost));
    const total = this.state.totalCost.reduce(function(acc, currVal) {
      return acc + currVal;
    }, 0);

    this.setState({
      drinkCost: total
    });
  };

  products = this.props.products.map(product => (
    <IngredientCard product={product} drinkCost={this.drinkCost} />
  ));

  toggleIngredients = () => {
    this.state.showIngredients
      ? this.setState({
          showIngredients: false
        })
      : this.setState({
          showIngredients: true
        });
  };

  addToDrink = (products_id, quantity) => {
    console.log(products_id, quantity);
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .post(
        `http://localhost:3000/bars/${this.props.selectedBar}/menus/${this.props.selectedMenu}/drinks/${this.props.selectedDrink}`,

        { products_id, quantity },
        config
      )

      .then(() => this.props.showDrink(this.props.selectedDrink));
    this.setState({
      showIngredients: false
    });
  };

  render() {
    console.log(this.props);
    return this.props.selectedDrink != null ? (
      <div className="drink-container">
        <h1>{this.props.drinkName}</h1>
        {this.products}
        <h2>Drink Cost: ${this.state.drinkCost}</h2>
        <h2>
          Suggested Price: $
          {(this.state.drinkCost * (this.props.margin / 10)) / 1}
        </h2>

        <button onClick={() => this.toggleIngredients()}>
          add ingredients
        </button>
        {this.state.showIngredients ? (
          <Ingredients
            auth={this.props.auth}
            selectedBar={this.props.selectedBar}
            addToDrink={this.addToDrink}
            drinkCost={this.drinkCost}
          />
        ) : null}
      </div>
    ) : null;
  }
}
