import React, { useState } from 'react';
import './admin.css';

function Addproduct({ onAddProduct }) {
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    type: '',
    price: '',
    image: ''
  });
  
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct({ ...newProduct, id: Date.now() });
    setNewProduct({
      id: '',
      name: '',
      type: '',
      price: '',
      image: ''
    });
    setShowForm(false); 
  };

  return (
    <div>
      <button className='btn-dlt' onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Product'}
      </button>
      {showForm && (
        <div className="add-product-form">
          <h2 >Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Type:
              <input
                type="text"
                name="type"
                value={newProduct.type}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="image"
                value={newProduct.image}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit">Add Product</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Addproduct;
