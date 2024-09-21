import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductData } from '../Products/Prodects';
import SearchBar from '../Search/SearchBar';
import { CiLogin, CiShoppingCart } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { ShopContext } from '../../Context/Shop-contex';
import { FiMenu, FiX, FiHeart } from 'react-icons/fi';
import Cookie from 'js-cookie';

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { clearCart, dependency ,getwihlist} = useContext(ShopContext);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  // Check if a token exists in cookies to determine if a user is logged in
  const token = Cookie.get('token');
  const isLoggedIn = !!token; 
  const userId = Cookie.get('user'); 

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!isLoggedIn) return; // Only fetch if logged in
      try {
        const response = await fetch('http://localhost:3002/users/getCartItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        });
        const data = await response.json();
        setCount(data.length);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, [dependency, userId, isLoggedIn]); // Include isLoggedIn as dependency

  // useEffect(() => {
  //   const fetchWishlist = async () => {
  //     if (!isLoggedIn) return; // Only fetch if logged in
  //     try {
  //       await getwihlist(); // Ensure this function doesn't create a loop
  //     } catch (error) {
  //       console.error('Error fetching wishlist:', error);
  //     }
  //   };
  //   fetchWishlist();
  // }, [isLoggedIn]); // Only fetch when isLoggedIn changes

  const handleLogout = () => {
    Cookie.remove('token'); // Remove token from cookies
    Cookie.remove('isLogged'); // Remove token from cookies
    Cookie.remove('user'); // Remove user from cookies

    clearCart();
    navigate('/');
  };

  return (
    <div>
      <nav className="bg-gray-400 text-center py-0"> 
        <Link className="text-sm font-small text-white no-underline" to="">
          Free Express Shipping on all orders with all duties included
        </Link>
      </nav>

      <nav className="bg-white shadow-md">
        <div className="flex justify-between items-center px-4 py-2">
          {/* Logo */}
          <div className="flex items-center">
            <Link className="text-xl font-bold no-underline text-black hover:text-blue-600" to="/">
              WAN<span className="text-red-600">O</span>SHOE
            </Link>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex items-center space-x-6">
            <Link className="text-lg font-medium no-underline text-gray-800 hover:text-blue-500 transition-colors duration-300" to="men">
              MEN
            </Link>
            <Link className="text-lg font-medium no-underline text-gray-800 hover:text-blue-500 transition-colors duration-300" to="women">
              WOMEN
            </Link>
            <Link className="text-lg font-medium no-underline text-gray-800 hover:text-blue-500 transition-colors duration-300" to="collections">
              COLLECTION
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:flex-grow md:block">
              <SearchBar 
                data={ProductData}
                className="border-none outline-none focus:ring-0 w-full max-w-xs text-gray-700"
              />
            </div>

            {/* Wishlist Icon */}
            <Link to="Wishlist" className="text-gray-700 hover:text-gray-900 relative" onClick={()=>getwihlist()}>
              <FiHeart size={24} />
              <span className="absolute top-0 right-0 text-xs bg-pink-200 text-pink-700 rounded-full w-4 h-4 flex justify-center items-center border border-white-700">
                {/* Wishlist count placeholder */}
                0
              </span>
            </Link>

            {/* Cart Icon */}
            <Link to="cart" className="text-red-700 hover:text-red-900 relative">
              <CiShoppingCart size={24} />
              <span className="absolute top-0 right-0 text-xs bg-red-200 text-red-700 rounded-full w-4 h-4 flex justify-center items-center border border-white-700">
                {isLoggedIn ? count : 0}
              </span>
            </Link>

            {/* Login/Logout Icon */}
            {isLoggedIn ? (
              <CiLogin onClick={handleLogout} className="text-gray-700 hover:text-gray-900 cursor-pointer" size={24} />
            ) : (
              <Link to="login">
                <BsPerson className="text-gray-700 hover:text-gray-900" size={24} />
              </Link>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center space-x-2">
            <SearchBar 
              data={ProductData}
              className="border-none outline-none focus:ring-0 w-full max-w-xs text-gray-700"
            />
            <button
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Hidden by Default */}
        {isMenuOpen && (
          <div className="md:hidden px-4 pb-2">
            <ul className="flex flex-col space-y-2">
              <li>
                <Link className="text-gray-700 hover:text-gray-900" to="men">MEN</Link>
              </li>
              <li>
                <Link className="text-gray-700 hover:text-gray-900" to="women">WOMEN</Link>
              </li>
              <li>
                <Link className="text-gray-700 hover:text-gray-900" to="collections">COLLECTIONS</Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Nav;
