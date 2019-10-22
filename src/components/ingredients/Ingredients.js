import React, { Component } from "react";
import axios from "axios";

import IngredientTable from "./IngredientTable";

export default class Ingredients extends Component {
  state = {
    products: [],
    displayProducts: [],

    selectedProduct: null
  };

  showProducts = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };

    axios
      .get(
        `http://localhost:3000/bars/${this.props.selectedBar}/products`,
        config
      )
      .then(response => {
        this.setState(
          {
            products: response.data,
            displayProducts: response.data
          },
          () => this.sortProducts()
        );
      });
  };

  componentDidMount() {
    this.showProducts();
  }

  // componentDidUpdate() {
  //   this.showProducts();
  // }

  sortProducts = () => {
    let sortedProducts = [];
    sortedProducts = this.state.displayProducts.sort((a, b) =>
      a.productName > b.productName ? 1 : -1
    );
    this.setState({ displayProducts: sortedProducts });
  };

  handleEditProductClick = product => {
    this.setState({
      selectedProduct: product,
      showEditForm: true
    });
  };

  render() {
    return (
      <div className="container">
        {this.state.displayProducts.length === 0 && <p>add products...</p>}
        <IngredientTable
          products={this.state.displayProducts}
          selectedProduct={this.state.selectedProduct}
          addToDrink={this.props.addToDrink}
        />
      </div>
    );
  }
}
