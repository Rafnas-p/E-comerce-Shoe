import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../Context/Shop-contex';
import './cart.css';
import { useNavigate } from 'react-router';
import Cookie from 'js-cookie';
import { Link } from 'react-router-dom';

function Cart() {
  const {
    
    getCart,
    fetchCartItems,
    removeItemFromCart,
    getTotalCartAmount,
    incrementQuantity,
    decrementQuantity,
    dependency,
  } = useContext(ShopContext);

  const totalAmount = getTotalCartAmount();
  console.log('total2',totalAmount);
  
  const navigate = useNavigate();
  const userId = Cookie.get('user'); 

  console.log('get', getCart);
  

  useEffect(() => {
    if (userId) {
      fetchCartItems(userId); 
    }
  }, [dependency]);

  
  const handleRemove = (productId) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      removeItemFromCart(productId);
    }
  };
  console.log(getCart);
  

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cartItems">
        {getCart?.length > 0 ? (
          getCart?.map((product) => {
            
              return (
                <div key={product?.productId?._id} className="cartItem">
                  <img src={product?.productId?.image} alt={product?.productId?.name} />
                  <div className="description">
                    <p><b>{product?.productId?.name}</b></p>
                    <p>₹{product?.productId?.price}</p>
                    <div className="countHandler">
                    <button className='btn-cart' onClick={() => decrementQuantity(product.productId._id)}>-</button>
                      <input type="text" value={product?.quantity} readOnly />
                      <button className="btn-cart" onClick={() => incrementQuantity(product?.productId?._id)}>+</button>
                      <button className="remove" onClick={() => handleRemove(product?.productId?._id)}>Remove</button>
                    </div>
                  </div>
                </div>
              );
            
          })
        ) : (
          <div className="empty-cart">
            <p>Your cart is currently empty. Add some items!</p>
          </div>
        )}
        {totalAmount > 0 && (
          <div className="checkout">
            <p>Subtotal: ₹{totalAmount ? totalAmount : 0}</p>
            <button onClick={() => navigate("/")}>Continue Shopping</button>
            <Link to={'/payment'} state={{ totalAmount }}>
              <button>Checkout</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
