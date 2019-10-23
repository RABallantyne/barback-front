import React, { Component } from "react";
import axios from "axios";
import IngredientSearch from "./IngredientSearch";
import IngredientFilter from "./IngredientFilter";
import IngredientTable from "./IngredientTable";

export default class Ingredients extends Component {
  state = {
    products: [],
    displayProducts: [],
    searchFilter: "",
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
        `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/products`,
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

  filterByCategory = category => {
    if (category !== "All") {
      this.setState({
        displayProducts: this.state.products.filter(
          prod => prod.category === category
        )
      });
    } else {
      this.setState({
        displayProducts: this.state.products
      });
    }
  };

  setSearchFilter = searchFilter => {
    this.setState(
      {
        searchFilter: searchFilter
      },
      () => {
        this.search();
      }
    );
  };

  search = () => {
    let displayProducts = this.state.products.filter(prod => {
      return prod.productName
        .toLowerCase()
        .includes(this.state.searchFilter.toLowerCase());
    });
    this.setState({ displayProducts });
  };

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
        <div>
          <IngredientFilter filter={this.filterByCategory} />
          <IngredientSearch search={this.setSearchFilter} />
        </div>
        <IngredientTable
          products={this.state.displayProducts}
          selectedProduct={this.state.selectedProduct}
          addToDrink={this.props.addToDrink}
        />
      </div>
    );
  }
}
