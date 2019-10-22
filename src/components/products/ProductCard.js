import React from "react";

export default function ProductCard(props) {
  const products = props.products.map(product => (
    <tr key={product.id}>
      <td>{product.category}</td>
      <td>{product.productName}</td>
      <td>{product.size}</td>
      <td>${parseFloat(product.price).toFixed(2)}</td>
      <td>
        <button onClick={() => props.handleEditProductClick(product)}>
          Edit
        </button>

        <button onClick={() => props.deleteProduct(product.id)}>Delete</button>
      </td>
    </tr>
  ));
  return <div>{products}</div>;
}
