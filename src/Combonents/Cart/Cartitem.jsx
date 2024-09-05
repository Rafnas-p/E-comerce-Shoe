import React,{useContext} from 'react';
import { ShopContext } from '../../Context/Shop-contex';
import './cart.css'
function CartItem(props) {
  const { iteme } = props;
  const { id,image, name, price } = iteme;
  const { cartItems, addToCart, removeFromCart,Removebtn } = useContext(ShopContext);

  return (
    <>
    <div className='cartItem'>
      
      <img src={image} alt={name} />
      <div className='description'>
        <p>
          <b>{name}</b>
        </p>
        <p>₹{price}</p>
      
        <div className='countHandler'>
  <button className='btn-cart' onClick={() => removeFromCart(id)}>-</button>
  <input type="text" value={cartItems[id]} readOnly />
  <button className='btn-cart' onClick={() => addToCart(id)}>+</button>
  <button className='remove' onClick={() => Removebtn(id)}>remove</button>
</div>

      </div>
    
    </div>
    
</>
  );
}

export default CartItem;
