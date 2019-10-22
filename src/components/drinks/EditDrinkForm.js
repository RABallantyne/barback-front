import React, { Component } from "react";

export default class EditDrinkForm extends Component {
  state = {
    drinkName: "",
    drinkNote: "",
    margin: ""
  };

  componentDidMount() {
    this.setState({
      drinkName: this.props.drinkName,
      drinkNote: this.props.drinkNote,
      margin: this.props.margin
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedDrink.id !== prevProps.selectedDrink.id) {
      this.setState({
        drinkName: this.props.drinkName,
        drinkNote: this.props.drinkNote,
        margin: this.props.margin
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
    this.props.editDrink(this.state, this.props.selectedDrink);
  };
  render() {
    return (
      <div className="container">
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
            <button className="btn btn-primary">Edit drink</button>
          </div>
        </form>
      </div>
    );
  }
}
