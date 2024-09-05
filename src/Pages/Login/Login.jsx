

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/Shop-contex';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setEmail(loggedInUser.email);
      setPassword(loggedInUser.password);
      setLoginSuccess(true);
      const storedCart = JSON.parse(localStorage.getItem(`cartItems_${loggedInUser.email}`));
      if (storedCart) {
        setCartItems(storedCart);
      }
  
      navigate('/');
    }
  }, [navigate, setCartItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.find(u => u.email === email && u.password === password);

    if (!userExists) {
      alert('Invalid email or password');
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');

    const storedCart = JSON.parse(localStorage.getItem(`cartItems_${email}`));
    if (storedCart) {
      setCartItems(storedCart);
    }

    setLoginSuccess(true);

    // Check if the email is the admin's email
    if (email === 'admin@example.com' && password === "26242624") {
      setTimeout(() => {
        navigate('/admin/adminhome');
      }, 2000);
    } else {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  return (
    <>
      <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
        <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-8'>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <h3 className='text-2xl font-bold mb-4 text-center'>Welcome to Wano</h3>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>Enter Your Email:</label>
              <input
                type='email'
                placeholder='Enter Your Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id='email'
                name='email'
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='block text-gray-700 font-semibold mb-2'>Password:</label>
              <input
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder='******'
                id='password'
                name='password'
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <button
              type='submit'
              className='w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Login
            </button>
          </form>
          <button
            className='w-full mt-4 text-blue-500 hover:underline focus:outline-none'
            onClick={() => props.onFormSwitch('Registration')}
          >
            Don't have an account? Register here
          </button>
        </div>
      </div>
      {loginSuccess && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
          <div className='bg-white p-4 rounded-lg shadow-lg'>
            <p className='text-center text-gray-700'>Login Successful! Redirecting...</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;





