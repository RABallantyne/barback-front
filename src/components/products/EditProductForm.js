import React, { Component } from "react";

export default class EditProductForm extends Component {
  state = {
    category: "",
    productName: "",
    size: "",
    price: 0
  };

  componentDidMount() {
    this.setState({
      productName: this.props.selectedProduct.productName,
      size: this.props.selectedProduct.size,
      price: this.props.selectedProduct.price,
      category: this.props.selectedProduct.category
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedProduct.id !== prevProps.selectedProduct.id) {
      this.setState({
        productName: this.props.selectedProduct.productName,
        size: this.props.selectedProduct.size,
        price: this.props.selectedProduct.price,
        category: this.props.selectedProduct.category
      });
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.editProduct(this.state, this.props.selectedProduct.id);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="col">
              <select
                className="form-control"
                name="category"
                value={this.state.category}
                onChange={this.handleChange}
              >
                <option value="nocat">Category</option>
                <option value="Agave">Agave</option>
                <option value="Gin">Gin</option>
                <option value="Whiskey">Whiskey</option>
                <option value="Vodka">Vodka</option>
                <option value="Rum">Rum</option>
                <option value="Liqueur">Liqueur</option>
                <option value="Non Alcoholic">Non Alcoholic</option>
                <option value="Bitter">Bitter</option>
              </select>
            </div>
            <div className="col">
              <input
                className="form-control"
                type="text"
                name="productName"
                placeholder="name"
                value={this.state.productName}
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <select
                className="form-control"
                name="size"
                value={this.state.size}
                onChange={this.handleChange}
              >
                <option value="nosize">Bottle Size</option>
                <option value="375ml">375ml</option>
                <option value="750ml">750ml</option>
                <option value="1L">1L</option>
                <option value="1.75L">1.75L</option>
                <option value="5.5 oz">5.5 oz</option>
                <option value="12 oz">12 oz</option>
                <option value="32oz">32 oz</option>
                <option value="1 gal">1 gal</option>
              </select>
            </div>

            <div className="col">
              <input
                className="form-control"
                type="text"
                name="price"
                placeholder="Price Paid"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>

            <button className="btn btn-primary">Edit Product</button>
          </div>
        </form>
      </div>
    );
  }
}
