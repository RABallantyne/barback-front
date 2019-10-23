import React, { Component } from "react";
import axios from "axios";
import AddBarForm from "./AddBarForm";
import Products from "../products/Products";
import Menus from "../menus/Menus";
import "./Bars.css";

export default class Bars extends Component {
  state = {
    bars: [],
    displayBars: [],
    selectedBar: null,
    showMenus: false,
    bar: [],
    showProducts: false
  };

  showBars = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}/bars`, config)
      .then(response => {
        this.setState({ bars: response.data });
      });
  };

  showBar = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/bars/${this.state.selectedBar}`,
        config
      )
      .then(response => {
        this.setState({ bar: response.data });
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
      .post(`${process.env.REACT_APP_API_URL}/bars`, bar, config)
      .then(() => this.showBars());
  };

  deleteBar = id => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios.delete(`${process.env.REACT_APP_API_URL}/bars/${id}`, config);
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

  toggleShowMenus = () => {
    this.state.showMenus
      ? this.setState({
          showMenus: false
        })
      : this.setState({
          showMenus: true,
          showProducts: false
        });
  };

  toggleShowProducts = () => {
    this.state.showProducts
      ? this.setState({
          showProducts: false
        })
      : this.setState({
          showProducts: true,
          showMenus: false
        });
  };

  render() {
    return (
      <div className="main-container">
        {this.state.selectedBar ? null : (
          <div className="bars-selection">
            <h1>Your Bars</h1>
            <AddBarForm addBar={this.addBar} />

            {this.state.bars.length === 0 && <p>Add a bar to continue...</p>}
            {this.state.bars &&
              this.state.bars.map(bar => (
                <>
                  <button
                    className="barbutton"
                    onClick={() => this.handleBarSelect(bar)}
                    key={bar.id}
                  >
                    {bar.barName}
                  </button>
                  {/* <button onClick={() => this.deleteBar(bar.id)}>delete</button> */}
                </>
              ))}
          </div>
        )}
        <div className="nav-buttons-container">
          {this.state.selectedBar ? (
            <button
              className={"navbutton"}
              onClick={() => this.toggleShowMenus()}
            >
              Menus
            </button>
          ) : null}

          {this.state.selectedBar ? (
            <button
              className={"navbutton"}
              onClick={() => this.toggleShowProducts()}
            >
              Products
            </button>
          ) : null}
        </div>

        <div className="menus-container">
          {this.state.showMenus ? (
            <Menus
              auth={this.props.auth}
              selectedBar={this.state.selectedBar}
              toggleShowMenus={this.toggleShowMenus}
            />
          ) : null}
        </div>
        <div className="products-container">
          {this.state.showProducts ? (
            <Products
              auth={this.props.auth}
              selectedBar={this.state.selectedBar}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
