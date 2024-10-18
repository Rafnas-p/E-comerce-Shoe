import React, { useEffect, useState } from "react";
import AdminNav from "../AdminNav";
import Cookie from 'js-cookie';
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { _id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    const token = Cookie.get('token');

    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://serversid-user.onrender.com/admin/getUser/${_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data.user);
        }
      } catch (error) {
        console.log('Error fetching user details:', error);
      }
    };

    // Fetch user orders
    const fetchUserOrders = async () => {
      try {
        const response = await fetch(`https://serversid-user.onrender.com/admin/orderDeatailsByUser/${_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserOrders(data);
        }
      } catch (error) {
        console.log('Error fetching user orders:', error);
      }
    };

    if (_id) {
      fetchUserDetails();
      fetchUserOrders();
    }
  }, [_id]);

  if (!userDetails || !userOrders) {
    return <div className="text-center text-xl text-gray-500">Loading...</div>;
  }


  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-4">User Details</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">Personal Information</h2>
          <p className="text-gray-700"><span className="font-semibold">Name:</span> {userDetails.username}</p>
          <p className="text-gray-700"><span className="font-semibold">Email:</span> {userDetails.email}</p>
          <p className="text-gray-700"><span className="font-semibold">ID:</span> {userDetails._id}</p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">User Orders</h2>
        {userOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userOrders.map(order => (
              <div key={order._id} className="bg-white shadow-md rounded-lg p-6">
                <p className="text-lg font-bold mb-2">Order ID: {order.orderId}</p>
                <p className="text-gray-700 mb-1"><span className="font-semibold">Total Price:</span> ₹{order.totalPrice}</p>
                <p className="text-gray-700 mb-4"><span className="font-semibold">Payment Status:</span> {order.paymentStatus}</p>

                <h3 className="font-semibold mb-2">Products</h3>
                {order.products.map(product => (
                  <div key={product.productId._id} className="flex items-center mb-4">
                    <img className="w-16 h-16 object-cover mr-4" src={product.productId.image} alt={product.productId.name} />
                    <div>
                      <p className="text-gray-700"><span className="font-semibold">Quantity:</span> {product.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No orders found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;

