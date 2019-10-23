import React, { Component } from "react";

export default class ProductSearch extends Component {
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            className="form-item"
            type="text"
            name="input"
            placeholder="Search by Product Name"
            value={this.state.input}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}
