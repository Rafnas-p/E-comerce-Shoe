import React, { useState, useEffect } from 'react';
import './admin.css';

function Edditprodect({ product, onUpdateProduct, onClose, style }) {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  // Update state when the product prop changes (to allow editing a different product)
  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdateProduct(updatedProduct);
    onClose(); // Close the edit form after updating
  };

  return (
    <div className="edit-product-form" style={style}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={updatedProduct.name}
          onChange={handleChange}
        />
        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={updatedProduct.type}
          onChange={handleChange}
        />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={updatedProduct.price}
          onChange={handleChange}
        />
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={updatedProduct.image}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default Edditprodect;
