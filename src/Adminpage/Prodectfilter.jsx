import React, { useState, useEffect, useContext } from 'react';
import './admin.css';
import Edditprodect from './Edditprodect';

function ProductFilter({ products, onAddProduct, onDeleteProduct, onUpdateProduct }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editPosition, setEditPosition] = useState({ top: 0, left: 0 });
  const categories = ['all', 'men', 'women'];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.type === selectedCategory);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleEditClick = (product, event) => {
    const rect = event.target.getBoundingClientRect();
    setEditPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    setEditingProduct(product);
  };

  return (
<>

    <div className="product-filter-container">
      <h2>Products</h2>
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <h6>{product.type}</h6>
            <p>Price: ₹{product.price}</p>
            <button className='btn-dlt' onClick={() => onDeleteProduct(product.id)}>Delete</button>
            <button className='btn-edit' onClick={(e) => handleEditClick(product, e)}>Edit</button>
          </div>
        ))}
      </div>
      {editingProduct && (
        <Edditprodect
          product={editingProduct}
          onUpdateProduct={onUpdateProduct}
          onClose={() => setEditingProduct(null)}
          style={{ top: editPosition.top, left: editPosition.left }}
        />
      )}
    </div>
    </>
  );
}

export default ProductFilter;

