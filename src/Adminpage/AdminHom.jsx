import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AdminHom() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [revenueData, setRevenueData] = useState({ totalRevenue: 0, monthly: [] });

  useEffect(() => {
    const token = Cookie.get('token');

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3002/admin/viewAllUsers', {
          method: 'GET',
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          console.log("Failed to fetch users");
        }
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3002/users/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchRevenueData = async () => {
      try {
        const response = await fetch('http://localhost:3002/admin/totalRevenue', {
          method: 'GET',
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setRevenueData(data);
        } else {
          console.log("Failed to fetch revenue");
        }
      } catch (error) {
        console.log('Error fetching revenue data:', error);
      }
    };

    fetchUsers();
    fetchProducts();
    fetchRevenueData();
  }, []);

  
  const chartData = {
    labels: revenueData.monthly.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Revenue',
        data: revenueData.monthly.map(item => item.revenue),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <Link to="/admin/registerduser">
              <h2 className="text-xl font-semibold text-gray-700">Users</h2>
            </Link>
            <p className="text-4xl font-bold text-indigo-600 mt-2">{users.length}</p>
          </div>

         
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700">Total Products</h2>
            <p className="text-4xl font-bold text-indigo-600 mt-2">{products.length}</p>
          </div>

         
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700">Total Revenue</h2>
            <p className="text-4xl font-bold text-red-600 mt-2">₹{revenueData.totalRevenue}</p>
          </div>
        </div>

       
        <div className="mt-10 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Revenue Graph</h2>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}

export default AdminHom;
