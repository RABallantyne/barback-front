import React from "react";

export default function IngredientTable(props) {
  const {
    products

    // selectedProduct
  } = props;
  let quantity = 0;
  const getQuant = quant => {
    quantity = quant;
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Category</th>
          <th scope="col">Name</th>
          <th scope="col">Size</th>
          <th scope="col">Price</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody>
        {products &&
          products.map(product => (
            <tr key={product.id}>
              <td>{product.category}</td>
              <td>{product.productName}</td>
              <td>{product.size}</td>
              <td>${parseFloat(product.price).toFixed(2)}</td>
              <td>
                <select onChange={event => getQuant(event.target.value)}>
                  <option>quantity</option>
                  <option value="2.5 oz">2.5 oz</option>
                  <option value="2.25 oz">2.25 oz</option>
                  <option value="2 oz">2 oz</option>
                  <option value="1.75 oz">1.75 oz</option>
                  <option value="1.5 oz">1.5 oz</option>
                  <option value="1.25 oz">1.25 oz</option>
                  <option value="1 oz">1 oz</option>
                  <option value=".75 oz">.75 oz</option>
                  <option value=".5 oz">.5 oz</option>
                  <option value=".25 oz">.25 oz</option>
                  <option value="dash">dash</option>
                </select>
                <button onClick={() => props.addToDrink(product.id, quantity)}>
                  Add
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
