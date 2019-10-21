import React, { Component } from "react";

export default class DrinkCard extends Component {
  state = {
    value: 0,
    margin: 0
  };

  componentDidMount() {
    const { product } = this.props;

    let productSize;

    switch (product.size) {
      case "375ml":
        productSize = 12.6803;
        break;
      case "750ml":
        productSize = 25.3605;
        break;
      case "1L":
        productSize = 33.814;
        break;
      case "1.75L":
        productSize = 59.17454;
        break;
      case "5.5 oz":
        productSize = 5.5;
        break;
      case "12 oz":
        productSize = 12;
        break;
      case "32 oz":
        productSize = 32;
        break;
      case "1 gal":
        productSize = 128;
        break;

      default:
        productSize = 1;
    }

    let proportion;

    switch (product.quantity) {
      case "2.5 oz":
        proportion = 2.5;
        break;
      case "2.25 oz":
        proportion = 2.25;
        break;
      case "2 oz":
        proportion = 2;
        break;
      case "1.75 oz":
        proportion = 1.75;
        break;
      case "1.5 oz":
        proportion = 1.5;
        break;
      case "1.25 oz":
        proportion = 1.25;
        break;
      case "1 oz":
        proportion = 1;
        break;
      case ".75 oz":
        proportion = 0.75;
        break;
      case ".5 oz":
        proportion = 0.5;
        break;
      case ".25 oz":
        proportion = 0.25;
        break;
      case "dash":
        proportion = 0.025;
        break;

      default:
        proportion = 0;
    }

    const value = parseFloat(
      (product.price / productSize) * proportion
    ).toFixed(2);

    this.setState({
      value: value
    });

    this.props.addCost(value);
  }
  render() {
    return (
      <div>
        <p>
          {this.props.product.quantity} {this.props.product.productName}{" "}
          <span className="ing-cost">cost: ${this.state.value}</span>{" "}
        </p>
      </div>
    );
  }
}
