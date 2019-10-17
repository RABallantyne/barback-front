import React, { Component } from "react";

export default class AddBarForm extends Component {
  state = {
    barName: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addBar(this.state);
    this.setState({
      barName: ""
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="col">
              <input
                className="form-control"
                type="text"
                name="barName"
                placeholder="Bar Name"
                value={this.state.barName}
                onChange={this.handleChange}
              />
            </div>
            <button className="btn btn-primary">Add New Bar</button>
          </div>
        </form>
      </div>
    );
  }
}
