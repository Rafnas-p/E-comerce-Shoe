// import React,{useContext} from 'react';
// import { ShopContext } from '../../Context/Shop-contex';
// import './cart.css'
// function CartItem(props) {
//   const { iteme } = props;
//   const { _id,image, name, price, } = iteme;
//   const { cartItems, addToCart, removeFromCart,Removebtn,removeItemFromCart } = useContext(ShopContext);
//   console.log('cartItem',cartItems);
  

//   return (
//     <>
//     <div className='cartItem'>
      
//       <img src={image} alt={name} />
//       <div className='description'>
//         <p>
//           <b>{name}</b>
//         </p>
//         <p>₹{price}</p>
      
//         <div className='countHandler'>
//   <button className='btn-cart' onClick={() => removeFromCart(_id)}>-</button>
//   <input type="text" value={cartItems[_id]} readOnly />
//   <button className='btn-cart' onClick={() => addToCart(_id)}>+</button>
//   <button className='remove' onClick={() => removeItemFromCart(_id)}>remove</button>
// </div>

//       </div>
    
//     </div>
    
// </>
//   );
// }

// export default CartItem;
