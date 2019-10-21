import React from "react";
import Drinks from "../drinks/Drinks";

export default function Menu(props) {
  const drinks = props.drinks.map(drink => <Drinks />);
  return (
    <div>
      <h1>{drinks}</h1>
    </div>
  );
}
