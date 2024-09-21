import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../Context/Shop-contex';
import { FiTrash } from 'react-icons/fi';
import Cookie from 'js-cookie';

function Wishlist() {
  const { wishlist, getwihlist, removeWishlist, addWishlistItem, setWishlist } = useContext(ShopContext);
  const [showConfirm, setShowConfirm] = useState(null); // To track which item is being deleted
  const [wishlistFetched, setWishlistFetched] = useState(false); // Track if wishlist is already fetched
  const isLogged = Cookie.get('token');

  // Fetch wishlist only once when user is logged in
  useEffect(() => {
    if (isLogged && !wishlistFetched) {
      getwihlist(); // Fetch wishlist from backend
      setWishlistFetched(true); // Mark as fetched
    }
  }, [isLogged, wishlistFetched, getwihlist]);

  const handleDeleteClick = (itemId) => {
    setShowConfirm(itemId); // Set the ID of the item to show confirmation
  };

 

  const handleConfirmDelete = async (itemId) => {
    const success = await removeWishlist(itemId); // Call the remove function to update backend
    if (success) {
      // Only update local state if removal was successful
      setWishlist(prevWishlist => prevWishlist.filter(item => item._id !== itemId));
    } else {
      // Handle any error scenario (e.g., show a message)
      console.error("Failed to remove item from wishlist");
    }
    setShowConfirm(null); // Hide the confirmation
  };
  

  const handleCancelDelete = () => {
    setShowConfirm(null); // Hide the confirmation
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      {Array.isArray(wishlist) && wishlist.length === 0 ? (
        <p className="text-lg">Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.isArray(wishlist) && wishlist.map((item) => (
            <div
              key={item._id}
              className="border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105 relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover mb-4"
              />
              <p className="text-xl font-semibold mb-2">{item.name}</p>
              <p className="text-lg text-gray-600">₹{item.price}</p>

              {/* Trash Icon for Deleting */}
              <FiTrash
                size={24}
                className="absolute top-4 right-4 text-pink cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                onClick={() => handleDeleteClick(item._id)}
              />

              {/* Confirmation Dialog */}
              {showConfirm === item._id && (
                <div className="absolute inset-x-1/4 top-1/4 w-2/3 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
                  <p className="mb-4 text-center">Are you sure you want to remove this item?</p>
                  <div className="flex justify-center space-x-4">
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded"
                      onClick={() => handleConfirmDelete(item._id)}
                    >
                      Remove
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-300 rounded"
                      onClick={handleCancelDelete}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
