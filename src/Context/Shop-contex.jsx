import React, { createContext, useState, useEffect } from 'react';
import { ProductData } from '../Combonents/Products/Prodects';
import { useNavigate } from 'react-router';
export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i <= ProductData.length; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [products, setProducts] = useState(ProductData);
  
  const navigate=useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      const storedCart = JSON.parse(localStorage.getItem(`cartItems_${loggedInUser.email}`));
      if (storedCart) {
        setCartItems(storedCart);
      }
    }
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser && !Object.values(cartItems).every(value => value === 0)) {
      localStorage.setItem(`cartItems_${loggedInUser.email}`, JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (id) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [id]: (prevItems[id] || 0) + 1,
    }));
    navigate('/cart')
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };
      if (newItems[id] > 1) {
        newItems[id]--;
      } else {
        newItems[id] = 0; 
      }
      return newItems;
    });
  };
  const Removebtn = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[id];
      return updatedItems;
    });
  };
  const clearCart = () => {

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setCartItems(getDefaultCart());
      localStorage.removeItem(`cartItems_${loggedInUser.email}`);
    }
  };

  const logout = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setCartItems(getDefaultCart());
      localStorage.removeItem(`cartItems_${loggedInUser.email}`);
      localStorage.removeItem('loggedInUser');
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const id in cartItems) {
      if (cartItems[id] > 0) {
        let itemInfo = ProductData.find((product) => product.id === Number(id));
        totalAmount += cartItems[id] * itemInfo.price;
        
      }
    }
    return totalAmount;
  };

  const getTotalCartItemsCount = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    Removebtn,
    logout,
    getTotalCartAmount,
    getTotalCartItemsCount,
    setCartItems,products,setProducts
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;

