import React, { useContext } from "react";
import { ProductData } from "../Products/Prodects";
import { ShopContext } from "../../Context/Shop-contex";
import CartItem from "./Cartitem";
import "./cart.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

 

  return (
    <>
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cartItems">
        {ProductData.map((product) => {
          if (cartItems[product.id] !== 0 && cartItems[product.id]  ) {
            return <CartItem key={product.id} iteme={product} /> ;
          }
          return null;
        })}
        {totalAmount > 0 ? (
          <div className="checkout">
            <p>Subtotal: ₹{totalAmount}</p>
            <button onClick={() => navigate("/")}>Continue Shopping</button>
           <Link to={'/payment'} state={{totalAmount}}> <button >Checkout</button></Link>
          
            
          </div>
        ) : (
          <h1>Your Cart Is Empty</h1>
        )}
      </div>

    </div>
    
     </>
  );
}

export default Cart;
