import React, { Component } from "react";
import axios from "axios";
import AddDrinkForm from "./AddDrinkForm";
import Drink from "../drink/Drink";

export default class Drinks extends Component {
  state = {
    drinks: [],
    selectedDrink: null,
    drink: [],
    products: []
  };

  showDrinks = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .get(
        `http://localhost:3000/bars/${this.props.selectedBar}/menus/1/`,
        config
      )
      .then(response => {
        // console.log(response.data);
        this.setState({ drinks: response.data });
      });
  };

  showDrink = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .get(
        `http://localhost:3000/bars/${this.props.selectedBar}/menus/1/drinks/1`,
        config
      )
      .then(response => {
        console.log(response.data);
        this.setState({ products: response.data.products });
      });
  };

  componentDidMount() {
    this.showDrinks();
    this.showDrink();
  }
  render() {
    return (
      <div>
        <h1>Drinks</h1>

        <AddDrinkForm />
        {this.state.drinks.map(drink => (
          <>
            <h2>{drink.drinkName}</h2>
            <h3>{drink.drinkNote}</h3>
            {/* <button onClick={this.showDrink()}>Details</button> */}
          </>
        ))}
        <Drink products={this.state.products} />
      </div>
    );
  }
}
