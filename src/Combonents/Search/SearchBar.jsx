import React, { useState, useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom'; 
import { ShopContext } from '../../Context/Shop-contex';

function SearchBar() {
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart, cartItems, products } = useContext(ShopContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setSearchTerm(searchWord);

    if (searchWord.trim() === '') {
      setFilteredData([]);
    } else {
      const newFilteredData = products.filter((value) =>
        value.name.toLowerCase().includes(searchWord.toLowerCase())
      );
      setFilteredData(newFilteredData);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredData([]);
  };

  const handleProductClick = (_id) => {
    clearSearch();
    
    console.log('_id',_id);
    
    navigate(`SearchProduct/${_id}`);
    
    // Navigate to the product page using the correct ID
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="flex items-center border-b border-gray-300 py-2">
        <input
          type="text"
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleFilter}
        />
        <div className="flex items-center">
          {filteredData.length === 0 && <SearchIcon className="text-gray-400" />}
          {searchTerm && <CloseIcon className="text-gray-400 cursor-pointer" onClick={clearSearch} />}
        </div>
      </div>

      {/* Display Search Results */}
      {filteredData.length !== 0 && (
        <div className="absolute w-full bg-white shadow-lg max-h-60 overflow-y-auto mt-1 rounded-lg z-10">
          {filteredData.slice(0, 4).map((value) => {
            const cartItemAmount = cartItems[value._id] || 0; // Access cart items using _id
            return (
              <div
                key={value._id} // Use _id as the key
                className="p-2 hover:bg-gray-100 flex justify-between items-center cursor-pointer"
                onClick={() => handleProductClick(value._id)} // Navigate to the product page
              >
                <div>
                  <p className="text-sm font-medium">{value.title}</p>
                  <p className="text-xs text-gray-500">{value.name}</p>
                </div>
                <button
                  className="bg-blue-500 text-white text-xs py-1 px-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigating when clicking "Add to Cart"
                    addToCart(value._id); // Ensure adding to cart with _id
                  }}
                >
                  Add to Cart {cartItemAmount > 0 && `(${cartItemAmount})`}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;


