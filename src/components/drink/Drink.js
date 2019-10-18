import React from "react";
import DrinkCard from "./DrinkCard";

export default function Drink(props) {
  const products = props.products.map(product => (
    <DrinkCard product={product} />
  ));

  return <div>{products}</div>;
}
