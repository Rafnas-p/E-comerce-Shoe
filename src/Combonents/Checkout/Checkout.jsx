// import React from "react";
// import { useLocation,useNavigate } from "react-router";
// import './cheakfile.css';
// import { Button } from "react-bootstrap";
// import { useContext } from "react";
// import { ShopContext } from "../../Context/Shop-contex";

// function Cheakfil() {
//  const{ clearCart} = useContext(ShopContext)
//   const location = useLocation();
//   const { state } = location;
//   const navigate = useNavigate()

//   const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));


//   const eventBuyclick= () => {
//      if (loggedInUser){
//       clearCart()
//      alert('Purchase completed successfully!')
//     }else{
//       alert('pleas login');
//        navigate('/login');
//     }
//   };
 
//   return (
//     <div className="container1">
//       <div className="card1">
//         <div className="card1-content">
//           <h2>Customer Information</h2>
//           <input type="text" className="input-field" placeholder="Username or Email Address" />
          
//           <h1>Billing Details</h1>
//           <div className="billing-details">
//             <input type="text" className="input-field half-width" placeholder="First Name" />
//             <input type="text" className="input-field half-width" placeholder="Last Name" />
//           </div>
          
//           <h1>Country Checklist</h1>
//           <input type="text" id="searchInput" className="input-field" placeholder="Search countries..." />
//           <label htmlFor="countrySelect">Select a Country or Region:</label>
//           <select id="countrySelect" className="input-field">
//             <option value="india">India</option>
//             <option value="england">England</option>
//             <option value="australia">Australia</option>
//           </select>
          
//           <div className="address-section">
//             <input type="text" className="input-field" placeholder="House number and street name" />
//             <div className="address-subsection">
//               <input type="text" className="input-field half-width" placeholder="Town/city" />
//               <input type="text" className="input-field half-width" placeholder="Zip code" />
//             </div>
//           </div>
          
//           <h2>Additional Information</h2>
//           <textarea id="message" className="input-field" name="message" rows="4" cols="50" placeholder="Notes about your order..."></textarea>
//           <input type="text" className="input-field" placeholder="Have a coupon?" />
//         </div>
//       </div>

//       <div className="card2">
//         <h3>Payment Details</h3>
//         <p>Total Price: ₹{state.totalAmount}</p>
//        <Button onClick={eventBuyclick}>Buy</Button>
//       </div>
//     </div>
//   );
// }

// export default Cheakfil;
import React, { useState } from 'react';
import Cookie from 'js-cookie';

const Checkout = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    place: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCreateOrder = async () => {
    const token = Cookie.get('token'); // Get user token from cookies

    try {
      const response = await fetch('http://localhost:3002/users/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Send the token for authentication
        },
        body: JSON.stringify(userDetails), // Send user details as JSON
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error creating order');
      }

      const { order } = data; // Get the order from the response
      const orderId = order.orderId;

      // Initialize Razorpay payment
      const options = {
        key: 'rzp_test_J7pYF1oyqUCqDx', // Your Razorpay key ID as a string
        amount: order.totalPrice * 100, // Amount in smallest currency unit
        currency: 'INR',
        name: 'WanoShoe',
        description: 'Thank you for buying',
        order_id: orderId, // Use the order ID returned from the backend
        handler: function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
          verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);
        },
        prefill: {
          name: userDetails.name,
          email: 'customer@example.com', // You can use a user's email if available
          contact: userDetails.phone,
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const verifyPayment = async (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
    const token = Cookie.get('token'); // Get user token from cookies
  
    try {
      const response = await fetch('http://localhost:3002/users/order/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
        body: JSON.stringify({ razorpayOrderId, razorpayPaymentId, razorpaySignature }), // Send all three IDs
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error verifying payment');
      }
  
      console.log('Payment verified:', data);
      // Handle successful payment verification (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={userDetails.name}
        onChange={handleInputChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      />
      <input
        type="text"
        name="place"
        placeholder="Place"
        value={userDetails.place}
        onChange={handleInputChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={userDetails.phone}
        onChange={handleInputChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={userDetails.address}
        onChange={handleInputChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      />
      <button
        onClick={handleCreateOrder}
        className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-200"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
