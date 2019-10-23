import React from "react";
import "./Products.css";

export default function ProductsTable(props) {
  const {
    products,
    handleEditProductClick,
    deleteProduct
    // selectedProduct
  } = props;
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
                <button onClick={() => handleEditProductClick(product)}>
                  Edit
                </button>

                <button onClick={() => deleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
