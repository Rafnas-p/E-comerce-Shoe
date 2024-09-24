import React, { useState } from 'react';
import './admin.css';
import Cookie from 'js-cookie';

const Addproduct = () => {
  const token = Cookie.get('token');
  console.log("Token:", token); // Log the token to ensure it's available

  // State to manage form visibility and new product details
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: '',
    price: '',
    image: '',
    description: '' // Correctly handle description
  });

  // Function to handle input changes
  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Submitting product:", newProduct); // Log the form data before submission

    try {
      const response = await fetch('http://localhost:3002/admin/creatProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newProduct) // Send product details from form
      });

      const data = await response.json();
      console.log("Product added response:", data); // Log the response from backend
      
      // Optionally, you can reset the form fields after submission
      setNewProduct({
        name: '',
        type: '',
        price: '',
        image: '',
        description: '' // Reset description field
      });
    } catch (error) {
      console.error('Error adding product:', error); // Log frontend error
    }
  };

  return (
    <>
      <button className='btn-dlt' onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Product'}
      </button>

      {showForm && (
        <div className="add-product-form">
          <h2>Add New Product</h2>
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
              Description:
              <input
                type="text" // Correct type for description
                name="description" // Correct name for description
                value={newProduct.description}
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
    </>
  );
};

export default Addproduct;
