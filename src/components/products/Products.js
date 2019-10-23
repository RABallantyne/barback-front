import React, { Component } from "react";
import axios from "axios";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";
import ProductsTable from "./ProductsTable";
import ProductFilter from "./ProductFilter";
import ProductSearch from "./ProductSearch";
import "./Products.css";

export default class Products extends Component {
  state = {
    products: [],
    displayProducts: [],
    showAddForm: false,
    showEditForm: false,
    selectedProduct: null,
    searchFilter: ""
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

  addProduct = product => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/products`,
        product,
        config
      )
      // .then(result => console.log(result))
      .then(() => this.showProducts())
      .then(() => this.setState({ showAddForm: false }));
  };

  editProduct = (product, id) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/products/${id}`,
        product,
        config
      )

      .then(() => this.showProducts())
      .then(() => this.setState({ showEditForm: false }));
  };

  deleteProduct = id => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios.delete(
      `${process.env.REACT_APP_API_URL}/bars/${this.props.selectedBar}/products/${id}`,
      config
    );
    const newProducts = this.state.displayProducts.filter(
      product => product.id !== id
    );
    this.setState({
      displayProducts: newProducts
    });
  };

  toggleAddForm = () => {
    this.state.showAddForm
      ? this.setState({
          showAddForm: false
        })
      : this.setState({
          showAddForm: true
        });
  };

  handleEditProductClick = product => {
    this.setState({
      selectedProduct: product,
      showEditForm: true
    });
  };

  render() {
    return (
      <div className="products-container">
        <h1>Product Inventory</h1>
        <div>
          <ProductFilter filter={this.filterByCategory} />
          <ProductSearch search={this.setSearchFilter} />
        </div>
        <button onClick={() => this.toggleAddForm()}>Add Product</button>
        {this.state.showAddForm ? (
          <AddProductForm addProduct={this.addProduct} />
        ) : null}
        {this.state.showEditForm ? (
          <EditProductForm
            editProduct={this.editProduct}
            selectedProduct={this.state.selectedProduct}
          />
        ) : null}

        {this.state.displayProducts.length === 0 && <p>add products...</p>}
        <ProductsTable
          products={this.state.displayProducts}
          selectedProduct={this.state.selectedProduct}
          handleEditProductClick={this.handleEditProductClick}
          deleteProduct={this.deleteProduct}
        />
      </div>
    );
  }
}
