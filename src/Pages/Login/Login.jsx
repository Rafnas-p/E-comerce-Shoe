
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie'; // For handling cookies
import { ShopContext } from '../../Context/Shop-contex';
function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
const {fetchCartItems}=useContext(ShopContext)

const userId=Cookie.get('user')
console.log("userId",userId);
useEffect(() => {
  if (userId) {
    fetchCartItems(userId); // Fetch cart items from the backend
  }
}, [userId]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine whether to hit admin or user login API based on email
    const isAdmin = email === 'admin@gmail.com';
    const url = isAdmin ? 'http://localhost:3002/admin/adminlogin' : 'http://localhost:3002/users/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log(data);
      
      console.log(data.user.id);

      if (response.ok) {
        // Store the token in cookies
        Cookie.set('token', data.token);
        Cookie.set('isLogged', true);
        Cookie.set('user',data.user.id)        
        

        // Handle success: Redirect to the appropriate page
        setLoginSuccess(true);
        setTimeout(() => {
          navigate(isAdmin ? '/admin/adminhome' : '/');
        }, 2000);
      } else {
        setError(data.message); // Show error message if login fails
      }
 
    } catch (error) {
      setError('An error occurred while logging in. Please try again.');
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
            {error && <p className='text-red-500'>{error}</p>}
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
