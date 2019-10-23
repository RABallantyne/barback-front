import React, { Component } from "react";

export default class IngredientSearch extends Component {
  state = {
    input: ""
  };

  handleChange = event => {
    this.setState({ input: event.target.value }, () => {
      this.props.search(this.state.input);
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.search(this.state.input);
  };
  render() {
    return (
      <div className="search-bar">
        <h5>Search by product name:</h5>
        <form onSubmit={this.handleSubmit}>
          <input
            className="form-item"
            type="text"
            name="input"
            placeholder="Search"
            value={this.state.input}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}
