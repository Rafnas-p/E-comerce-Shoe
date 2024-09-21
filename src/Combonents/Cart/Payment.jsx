import React from 'react';
import { ShopContext } from '../../Context/Shop-contex';
import { useContext } from 'react';

function Payment(props) {
const {getTotalCartAmount}=useContext(ShopContext)

  const { totlprice } = props;
console.log(props,'props');
  
  console.log('Payment totalprice:', totlprice);

  

  return (
    <div>
      <h3>Payment Details</h3>
      <p>Total Price: ₹{totlprice}</p>
    
    </div>
  );
}

export default Payment;
