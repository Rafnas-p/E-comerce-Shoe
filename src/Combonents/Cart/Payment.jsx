import React from 'react';

function Payment(props) {
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
