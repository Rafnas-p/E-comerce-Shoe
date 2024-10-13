import React, { useState, useEffect } from 'react';
import Edditprodect from './Edditprodect';
import Cookie from 'js-cookie';

function ProductFilter({refresh}) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editPosition, setEditPosition] = useState({ top: 0, left: 0 });
  const categories = ['all', 'men', 'women'];
  const token = Cookie.get('token');
 console.log(refresh)

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
  }, [refresh]);

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
        body: JSON.stringify(updatedProduct),
      });
  
      const data = await response.json();
      if (response.ok) {
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product._id === updatedProduct._id ? data.product : product
          )
        );
        alert(data.message);
        setEditingProduct(null);
      } else {
        console.error('Error updating product:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onDeleteProduct = async (productId) => {
    const token = Cookie.get('token');
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
        alert(data.message);
      } else {
        console.error('Error deleting product:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="product-filter-container p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Products</h2>

    
      <div className="flex justify-center mb-8">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-item p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <h6 className="text-gray-600">{product.type}</h6>
            <p className="text-lg font-bold mt-2">Price: ₹{product.price}</p>
            
          
            <div className="mt-4 flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                onClick={() => onDeleteProduct(product._id)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                onClick={(e) => handleEditClick(product, e)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Product Modal */}
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
