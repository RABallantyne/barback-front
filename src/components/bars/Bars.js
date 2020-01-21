import React, { Component } from "react";
import axios from "axios";
import AddBarForm from "./AddBarForm";
import Products from "../products/Products";
import Menus from "../menus/Menus";
import "./Bars.css";
import Auth from "../../Auth";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";

export default class Bars extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);

    this.state = {
      bars: [],
      displayBars: [],
      selectedBar: null,
      showMenus: false,
      bar: [],
      showProducts: false
    };
  }

  showBars = () => {
    let config = {
      headers: {
        "Content-Type": "application/json"
        // Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .get("https://serene-hollows-86823.herokuapp.com/bars", config)
      .then(response => {
        this.setState({ bars: response.data });
      });
  };

  showBar = () => {
    let config = {
      headers: {
        "Content-Type": "application/json"
        // Authorization: `Bearer ${this.props.auth.getAccessToken()}`
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
        "Content-Type": "application/json"
        // Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/bars`, bar, config)
      .then(() => this.showBars());
  };

  deleteBar = id => {
    let config = {
      headers: {
        "Content-Type": "application/json"
        // Authorization: `Bearer ${this.props.auth.getAccessToken()}`
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
        {/* <NavBar auth={this.auth} /> */}
        {this.state.selectedBar ? null : (
          <div className="bars-selection">
            <h1>Your Bars</h1>

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
            <AddBarForm addBar={this.addBar} />
          </div>
        )}
        {this.state.selectedBar ? (
          <div className="nav-buttons-container">
            <Link className="homebutton" to="/bars">
              BarBack
            </Link>
            <div className="navish">
              <p className="navbutton" onClick={() => this.toggleShowMenus()}>
                MENUS
              </p>

              <p
                className="navbutton"
                onClick={() => this.toggleShowProducts()}
              >
                PRODUCTS
              </p>
            </div>
          </div>
        ) : null}

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
