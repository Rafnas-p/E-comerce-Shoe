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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCreateOrder = async () => {
    const token = Cookie.get("token");

    try {
      const response = await fetch("http://localhost:3002/users/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error creating order");
      }

      const { order } = data;
      const orderId = order.orderId;

      const options = {
        key: "rzp_test_J7pYF1oyqUCqDx",
        amount: order.totalPrice * 100,
        currency: "INR",
        name: "WanoShoe",
        description: "Thank you for buying",
        order_id: orderId,
        handler: function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
          verifyPayment(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
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
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const verifyPayment = async (
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature
  ) => {
    const token = Cookie.get("token");

    try {
      const response = await fetch("http://localhost:3002/users/order/verify", {
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
