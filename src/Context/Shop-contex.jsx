import React, { createContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useNavigate } from "react-router";

// Create context
export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
  let cart = {};
  if (products.length > 0) {
    products.forEach((product) => {
      cart[product._id] = 0;
    });
  }
  return cart;
};

const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [cartproduct, setCartproduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getCart, setGetCart] = useState([]);
  const [error, setError] = useState(null);
  const [dependency, setDependency] = useState();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  console.log("wishlist", wishlist);

  const [itemIn, setItemIn] = useState([]);

  // Fetch products from the backend when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://serversid-user.onrender.com/users/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
        setCartItems(getDefaultCart(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Add to Cart function
  const addToCart = async (id) => {
    try {
      const token = Cookie.get("token");
      const response = await fetch("https://serversid-user.onrender.com/users/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      const data = await response.json();
      setCartproduct(data);
      setDependency(true);
      setCartItems((prevItems) => ({
        ...prevItems,
        [id]: (prevItems[id] || 0) + 1,
      }));

      navigate("/cart");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchCartItems = async (userId) => {
    console.log('84',userId);
    
    try {
      const token = Cookie.get("token");
      const response = await fetch("https://serversid-user.onrender.com/users/getCartItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      setGetCart(data || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError(error.message);
    }
  };

  const updateCartItemQuantityIncrement = async (productId) => {
    try {
      const token = Cookie.get("token");
      const response = await fetch(
        "https://serversid-user.onrender.com/users/updateCartItemQuantity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, quantity: 1 }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update cart item quantity");
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };
  const updateCartItemQuantityDecrement = async (productId) => {
    try {
      const token = Cookie.get("token");
      const response = await fetch(
        "https://serversid-user.onrender.com/users/updateCartItemQuantity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, quantity: -1 }), // Send productId and new quantity
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update cart item quantity");
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  const incrementQuantity = (productId) => {
    setCartItems((prevCartItems) => {
      const newQuantity = prevCartItems[productId] + 1;

      updateCartItemQuantityIncrement(productId);
      setDependency(newQuantity);

      return {
        ...prevCartItems,
        [productId]: newQuantity,
      };
    });
  };

  const decrementQuantity = (productId) => {
    setCartItems((prevCartItems) => {
      const newQuantity = prevCartItems[productId] - 1;

      updateCartItemQuantityDecrement(productId);
      setDependency(newQuantity);
      return {
        ...prevCartItems,
        [productId]: newQuantity,
      };
    });
  };

  const removeItemFromCart = async (id) => {
    try {
      const token = Cookie.get("token");
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      const response = await fetch(
        `https://serversid-user.onrender.com/users/removeCartitem/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove product from cart");
      }

      setDependency(id);

      setCartItems((prevItems) => {
        const updatedItems = { ...prevItems };
        delete updatedItems[id];
        return updatedItems;
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems(getDefaultCart(products));
    Cookie.remove("cartItems");
  };

  const getTotalCartAmount = () => {
    if (!Array.isArray(getCart) || getCart.length === 0) {
      return 0;
    }

    const totalAmount = getCart.reduce((accumulator, cartItem) => {
      const productPrice = cartItem.productId.price;
      const quantity = cartItem.quantity;

      return accumulator + productPrice * quantity;
    }, 0);

    return totalAmount;
  };

  //whislist
  const addwishlist = async (id) => {
    try {
      const token = Cookie.get("token");
      const response = await fetch("https://serversid-user.onrender.com/users/wishlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: id }),
      });
      const data = await response.json();
      setItemIn(data);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  //getwishlist

  const getwihlist = async () => {
    try {
      const token = Cookie.get("token");
      const response = await fetch("https://serversid-user.onrender.com/users/gettwishlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setWishlist(data);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeWishlist = async (id) => {
    try {
      const token = Cookie.get("token");
      const response = await fetch(
        `https://serversid-user.onrender.com/users/removewishlist/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let filter = wishlist.filter((item) => item._id != id);
      setWishlist(filter);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const contextValue = {
    cartItems,
    addToCart,
    getCart,
    setGetCart,
    clearCart,
    getTotalCartAmount,
    products,
    cartproduct,
    loading,
    fetchCartItems,
    error,
    removeItemFromCart,
    incrementQuantity,
    decrementQuantity,
    dependency,
    wishlist,
    addwishlist,
    getwihlist,
    itemIn,
    removeWishlist,
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error}</p>;

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopProvider;
