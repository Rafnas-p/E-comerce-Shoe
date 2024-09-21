
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
      const response = await fetch('http://localhost:3002/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, email, password }),
      });
      const data = await response.json();
      
      if (response.ok) {
        alert('Registration successful!');
        navigate(props.onFormSwitch('login')); // Redirect to login page
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  //   const newUser = {
  //     id: Date.now().toString(), 
  //     name,
  //     email,
  //     password,
  //   };

  //   let users = JSON.parse(localStorage.getItem('users')) || [];
  //   const userExists = users.find(user => user.email === email);

  //   if (userExists) {
  //     alert('User already exists with this email');
  //     return;
  //   }

  //   users.push(newUser);
  //   localStorage.setItem('users', JSON.stringify(users));
  //   navigate(props.onFormSwitch('login'));
  // };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-8'>
        <form className='space-y-4' onSubmit={handleSubmit} method='POST' action=''>
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


