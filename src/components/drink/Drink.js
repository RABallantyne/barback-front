import React from "react";
import IngredientCard from "./IngredientCard";

export default function Drink(props) {
  const products = props.products.map(product => (
    <IngredientCard product={product} addCost={props.addCost} />
  ));

  return (
    <div>
      {products}
      <h2>${props.drinkCost}</h2>
    </div>
  );
}
