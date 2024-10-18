import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://serversid-user.onrender.com/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        navigate(props.onFormSwitch('login')); 
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
    
      <div className="flex items-center mb-8">
        <h6 className="text-3xl font-bold no-underline text-black hover:text-blue-600" >
          WAN<span className="text-red-600">O</span>SHOE
        </h6>
      </div>

      <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-8'>
        <form className='space-y-4' onSubmit={handleSubmit}>
          {error && <p className='text-red-500 text-center'>{error}</p>} {/* Error message display */}
          <div className='mb-4'>
            <label htmlFor='name' className='block text-gray-700 font-semibold mb-2'>Full name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Full name'
              id='name'
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
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
            Sign Up
          </button>
        </form>
        <button
          className='w-full mt-4 text-blue-500 hover:underline focus:outline-none'
          onClick={() => props.onFormSwitch('login')}
        >
          Already have an account? Login here
        </button>
      </div>
    </div>
  );
}

export default Registration;
