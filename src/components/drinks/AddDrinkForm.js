import React, { Component } from "react";

export default class AddDrinkForm extends Component {
  state = {
    drinkName: "",
    drinkNote: "",
    margin: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // this.props.addDrink(this.state);
    this.setState({
      drinkName: "",
      drinkNote: "",
      margin: ""
    });
  };
  render() {
    return (
      <div class="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="col">
              <input
                className="form-control"
                type="text"
                name="drinkName"
                placeholder="Drink Name"
                value={this.state.drinkName}
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="text"
                name="drinkNote"
                placeholder="Notes"
                value={this.state.drinkNote}
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="text"
                name="margin"
                placeholder="Margin"
                value={this.state.margin}
                onChange={this.handleChange}
              />
            </div>
            <button className="btn btn-primary">Add drink</button>
          </div>
        </form>
      </div>
    );
  }
}
