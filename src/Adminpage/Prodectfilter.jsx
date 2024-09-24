import React, { useState, useEffect } from 'react';
import './admin.css';
import Edditprodect from './Edditprodect';
import Cookie from 'js-cookie';

function ProductFilter({  }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editPosition, setEditPosition] = useState({ top: 0, left: 0 });
  const categories = ['all', 'men', 'women'];
  const token = Cookie.get('token');

  // Fetch products from the backend when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3002/users/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.type === selectedCategory);

  const handleEditClick = (product, event) => {
    const rect = event.target.getBoundingClientRect();
    setEditPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    setEditingProduct(product);
  };
  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:3002/admin/updateproduct/${updatedProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProduct), // Make sure you're sending the entire product object
      });
  
      const data = await response.json();
      if (response.ok) {
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product._id === updatedProduct._id ? data.product : product
          )
        );
        alert(data.message); // Notify success
        setEditingProduct(null); // Close the edit form
      } else {
        console.error('Error updating product:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onDeleteProduct = async (productId) => {
    const token = Cookie.get('token'); // Ensure token is available for authorization
    try {
      const response = await fetch(`http://localhost:3002/admin/deleatProduct/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      if (response.ok) {
        setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        alert(data.message); // Notify success
      } else {
        console.error('Error deleting product:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  return (
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
          <div key={product._id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <h6>{product.type}</h6>
            <p>Price: ₹{product.price}</p>
            <button className='btn-dlt' onClick={() => onDeleteProduct(product._id)}>Delete</button>
            <button className='btn-edit' onClick={(e) => handleEditClick(product, e)}>Edit</button>
          </div>
        ))}
      </div>
      {editingProduct && (
        <Edditprodect
          product={editingProduct}
          onUpdateProduct={handleUpdateProduct}
          onClose={() => setEditingProduct(null)}
          style={{ position: 'absolute', top: editPosition.top, left: editPosition.left }}
        />
      )}
    </div>
  );
}

export default ProductFilter;
