import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../Context/Shop-contex';
import Cookie from 'js-cookie';   
import { useNavigate } from 'react-router-dom'; 

const SearchProduct = () => {
  const { _id } = useParams(); 
  console.log('undfin',_id);
  // Use _id to get the product ID from the URL
  const { addToCart, cartItems, products } = useContext(ShopContext);
  const isLogged = Cookie.get('token');
  const navigate = useNavigate();

  // Find the product based on the ID from useParams
  const product = products.find((item) => item._id === _id);
  const cartItemAmount = cartItems[product?._id] || 0; // Use _id to get cart amount

  // If product is not found, display an error message
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="mb-8 mx-auto max-w-sm p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative mb-4">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-64 object-cover rounded-lg cursor-pointer" 
        />
      </div>

      {/* Product Info */}
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">{product.title}</h2>
        <p className="text-gray-500 mb-2">{product.name}</p>
        <p className="text-gray-700 mb-4">{product.type}</p>
        <p className="text-lg font-semibold text-black-600">₹{product.price}</p>
      </div>

    
      <div className="flex justify-center mt-4">
      <button
          className="bg-black text-white py-2 px-6 rounded-lg transition-transform duration-200 hover:bg-gray-800"
          onClick={() => isLogged ? addToCart(product._id) : (alert('Please Login'), navigate('/login'))}
        >
          Add to Cart {cartItemAmount > 0 && `(${cartItemAmount})`}
        </button>
      </div>
    </div>
  );
};

export default SearchProduct;
