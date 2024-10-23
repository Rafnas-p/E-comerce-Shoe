import React, { useState } from "react";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    place: "",
    phone: "",
    address: "",
  });

  const handleCreateOrder = async () => {
    const token = Cookie.get("token");
  
    try {
      const response = await fetch("https://serversid-user.onrender.com/users/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include", // Allows cookies if needed
        body: JSON.stringify(userDetails),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Handle error response
        throw new Error(errorData.message || "Error creating order");
      }
  
      const data = await response.json();
      console.log("Order created:", data);
  
      // Proceed with Razorpay payment
      const { order } = data;
      openRazorpay(order);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  
  const openRazorpay = (order) => {
    const options = {
      key: "rzp_test_J7pYF1oyqUCqDx",
      amount: order.totalPrice * 100,
      currency: "INR",
      name: "WanoShoe",
      description: "Thank you for buying",
      order_id: order.orderId,
      handler: function (response) {
        verifyPayment(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature
        );
      },
      prefill: {
        name: userDetails.name,
        email: "customer@example.com",
        contact: userDetails.phone,
      },
      theme: {
        color: "#F37254",
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  
  
  const verifyPayment = async (
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature
  ) => {
    const token = Cookie.get("token");

    try {
      const response = await fetch("https://serversid-user.onrender.com/users/order/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error verifying payment");
      }

      console.log("Payment verified:", data);
      
      navigate("/OrderDtailsUser");
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Checkout</h2>
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
