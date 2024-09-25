
import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import { FiMoreHorizontal } from 'react-icons/fi'; // Import the icon

const  OrderDtailsUser= () => {
    const token = Cookie.get("token");
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null); // State to hold user details

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:3002/users/order/deatils', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setOrder(data.orderDetails || []);
            } catch (error) {
                console.error("Error fetching order details:", error);
                setError("Failed to fetch order details.");
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchOrderDetails();
        } else {
            setLoading(false);
        }
    }, [token]);

    const handleProductClick = (product, user) => {
        setSelectedProduct(product);
        setSelectedUser(user); // Store the selected user's details
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setSelectedUser(null); // Clear user details on modal close
    };

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Order Details</h1>
            {order.length === 0 ? (
                <p className="text-center text-gray-500">No orders found.</p>
            ) : (
                <ul className="space-y-4">
                    {order.map((orderItem) => (
                        <li key={orderItem._id} className="border border-gray-300 p-4 rounded-lg shadow-md w-full">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-lg font-semibold">Total: ₹ {orderItem.totalPrice}</p>
                                <p className={`px-2 py-1 text-sm font-semibold rounded ${orderItem.paymentStatus === 'completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                    {orderItem.paymentStatus}
                                </p>
                            </div>
                            <p className="text-sm mb-2"><strong>Purchase Date:</strong> {new Date(orderItem.purchaseDate).toLocaleDateString()}</p>
                            <h3 className="font-semibold mt-2">Products:</h3>
                            <ul className="ml-4">
                                {orderItem.products.map((product) => (
                                    <li key={product._id} className="flex items-center mb-2">
                                        <img src={product.productId.image} alt={product.productId.name} className="w-20 h-20 mr-2" />
                                        <span className="flex-1">{product.productId.name}</span>
                                        <FiMoreHorizontal
                                            className="cursor-pointer"
                                            onClick={() => handleProductClick(product, orderItem.userId)} // Send user details
                                        />
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
            {selectedProduct && selectedUser && (
                <Modal product={selectedProduct} user={selectedUser} onClose={closeModal} />
            )}
        </div>
    );
};

const Modal = ({ product, user, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-2">{product.productId.name}</h2>
                <img src={product.productId.image} alt={product.productId.name} className="w-full h-48 object-cover mb-2" />
                <p><strong>Price:</strong> ₹ {product.productId.price}</p>
                <p><strong>Description:</strong> {product.productId.description}</p>
                
                <hr className="my-4" />
                
                <h3 className="text-lg font-bold">User Details</h3>
                <p><strong>User Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                
                <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
            </div>
        </div>
    );
};

export default OrderDtailsUser;
