import React, { useState,useEffect } from "react";
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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
      const response = await fetch("https://serversid-user.onrender.com/users/order", {
        method: "POST",
        credentials: "include", // Allow sending cookies
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();
      console.log('data',data);
      
      if (!response.ok || !data?.order?.orderId) {
        throw new Error(data.message || "Error creating order");
      }

      const { orderId, totalPrice } = data.order;

      const options = {
        key: data.razorpayKeyId,
        amount: totalPrice * 100, 
        currency: "INR",
        name: "WanoShoe",
        description: "Thank you for buying",
        order_id: orderId,
        handler: async function (response) {
          try {
            await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
              totalPrice
            );
          } catch (error) {
            console.error("Payment verification failed:", error);
          }
        },
        prefill: {
          name: userDetails.name,
          email: "customer@example.com",
          contact: userDetails.phone,
        },
        theme: { color: "#F37254" },
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
    razorpaySignature,
    amount
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
          amount,
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-20">
    <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Checkout</h2>
  
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={userDetails.name}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="place"
          placeholder="City / Place"
          value={userDetails.place}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={userDetails.phone}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="address"
          placeholder="Complete Address"
          value={userDetails.address}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>
  
      <button
        onClick={handleCreateOrder}
        className="w-full mt-6 p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Pay Now
      </button>
    </div>
  </div>
  
  );
};

export default Checkout;
