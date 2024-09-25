import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import AdminNav from './AdminNav';
async function fetchOrderDetails(token) {
  const response = await fetch('http://localhost:3002/admin/OrderDetails', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

function OrderDetails() {
  const token = Cookie.get('token');
  const [oders, setOrders] = useState([]);

  useEffect(() => {
    const getOrderDetails = async () => {
      if (token) {
        const data = await fetchOrderDetails(token);
        setOrders(data);
      }
    };

    getOrderDetails();
  }, [token]); 


  
  return (
    <div className="container mx-auto p-4">
      <AdminNav />
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      {oders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border border-gray-200 px-4 py-2">Order ID</th>
                <th className="border border-gray-200 px-4 py-2">Customer Name</th>
                <th className="border border-gray-200 px-4 py-2">Total Amount</th>
                <th className="border border-gray-200 px-4 py-2">Status</th>
                <th className="border border-gray-200 px-4 py-2">Order Date</th>
              </tr>
            </thead>
            <tbody>
              {oders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">{order._id}</td>
                  <td className="border border-gray-200 px-4 py-2">{order.userDetails.name}</td>
                  <td className="border border-gray-200 px-4 py-2">{order.totalPrice}</td>
                  <td className="border border-gray-200 px-4 py-2">{order.status}</td>
                  <td className="border border-gray-200 px-4 py-2">{new Date(order.purchaseDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2 className="text-lg text-gray-500">No Orders Found</h2>
      )}
    </div>
  );
}

export default OrderDetails;
