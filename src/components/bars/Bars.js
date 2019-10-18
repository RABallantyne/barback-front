import React, { Component } from "react";
import axios from "axios";
import AddBarForm from "./AddBarForm";
import Products from "../products/Products";
import Menus from "../menus/Menus";
import Drinks from "../drinks/Drinks";

export default class Bars extends Component {
  state = {
    bars: [],
    displayBars: [],
    selectedBar: null
  };
  showBars = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios.get("http://localhost:3000/bars", config).then(response => {
      this.setState({ bars: response.data });
    });
  };

  componentDidMount() {
    this.showBars();
  }

  addBar = bar => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .post("http://localhost:3000/bars", bar, config)
      .then(() => this.showBars());
  };

  deleteBar = id => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios.delete(`http://localhost:3000/bars/${id}`, config);
    const newBars = this.state.bars.filter(bar => bar.id !== id);
    this.setState({
      bars: newBars
    });
  };

  handleBarSelect = bar => {
    this.setState({
      selectedBar: bar.id
    });
  };

  render() {
    // console.log(this.state.selectedBar);
    return (
      <div className="container">
        {this.state.selectedBar ? null : (
          <>
            <h1>Your Bars</h1>
            <AddBarForm addBar={this.addBar} />

            {this.state.bars.length === 0 && <p>Add a bar to continue...</p>}
            {this.state.bars &&
              this.state.bars.map(bar => (
                <>
                  <button
                    onClick={() => this.handleBarSelect(bar)}
                    key={bar.id}
                  >
                    {bar.barName}
                  </button>
                  <button onClick={() => this.deleteBar(bar.id)}>delete</button>
                </>
              ))}
          </>
        )}
        {this.state.selectedBar ? (
          <Menus auth={this.props.auth} selectedBar={this.state.selectedBar} />
        ) : null}
        {this.state.selectedBar ? (
          <Drinks auth={this.props.auth} selectedBar={this.state.selectedBar} />
        ) : null}

        {this.state.selectedBar ? (
          <Products
            auth={this.props.auth}
            selectedBar={this.state.selectedBar}
          />
        ) : null}
      </div>
    );
  }
}
