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
      drinkCost: parseFloat(total).toFixed(2)
    });
  };

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
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/menus/${this.props.selectedMenu}/drinks/${this.props.selectedDrink}`,

        { products_id, quantity },
        config
      )

      .then(() => this.props.showDrink(this.props.selectedDrink));
    this.setState({
      showIngredients: false
    });
  };

  removeFromDrink = productDrinkId => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/menus/${this.props.selectedMenu}/drinks/${this.props.selectedDrink}/${productDrinkId}`,
        config
      )
      .then(() => this.props.showDrink(this.props.selectedDrink));
  };

  products = this.props.products.map(product => {
    const productDrinkId = this.props.products_drinks.find(
      productDrink => productDrink.products_id === product.id
    );

    return (
      <IngredientCard
        key={product.id}
        product={product}
        drinkCost={this.drinkCost}
        removeFromDrink={this.removeFromDrink}
        productDrinkId={productDrinkId}
      />
    );
  });

  render() {
    return this.props.selectedDrink != null ? (
      <div className="drink-container">
        <h1>{this.props.drinkName}</h1>
        <h2>{this.props.drinkNote}</h2>
        <h3>Margin: {this.props.margin}%</h3>
        {this.products}
        <h2>Drink Cost: ${this.state.drinkCost}</h2>
        <h2>
          Suggested Price : $
          {parseFloat(this.state.drinkCost / (this.props.margin / 100)).toFixed(
            2
          )}
        </h2>

        <button onClick={() => this.toggleIngredients()}>add ingredient</button>
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
