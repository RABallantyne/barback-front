import React, { Component } from "react";

export default class AddMenuForm extends Component {
  state = {
    menuName: "",
    menuNote: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addMenu(this.state);
    this.setState({
      menuName: "",
      menuNote: ""
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
                name="menuName"
                placeholder="Menu Name"
                value={this.state.menuName}
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                type="text"
                name="menuNote"
                placeholder="Notes"
                value={this.state.menuNote}
                onChange={this.handleChange}
              />
            </div>

            <button className="btn btn-primary">Add menu</button>
          </div>
        </form>
      </div>
    );
  }
}
