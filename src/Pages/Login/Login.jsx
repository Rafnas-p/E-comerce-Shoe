import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import { ShopContext } from '../../Context/Shop-contex';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const { fetchCartItems } = useContext(ShopContext);

  const userId = Cookie.get('user');

  useEffect(() => {
    if (userId) {
      fetchCartItems(userId);
    }
  }, [userId, fetchCartItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isAdmin = email === 'admin@gmail.com';
    const url = isAdmin
      ? 'https://serversid-user.onrender.com/admin/adminlogin'
      : 'https://serversid-user.onrender.com/users/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (isAdmin) Cookie.set('role', 'admin');
      else Cookie.set('role', 'user');

      if (response.ok) {
        Cookie.set('token', data.token);
        Cookie.set('isLogged', true);
        Cookie.set('user', data.user.id);

        setLoginSuccess(true);
        setTimeout(() => {
          navigate(isAdmin ? '/admin/adminhome' : '/');
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 sm:p-8">
          <div className="flex justify-center mb-6">
            <h6 className="text-3xl font-bold text-black hover:text-blue-600">
              WAN<span className="text-red-600">O</span>SHOE
            </h6>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Welcome to Wano
            </h3>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </form>

          <button
            className="w-full mt-4 text-blue-500 text-sm hover:underline"
            onClick={() => props.onFormSwitch('Registration')}
          >
            Don't have an account? Register here
          </button>
        </div>
      </div>

      {loginSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 text-center">Login Successful! Redirecting...</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
