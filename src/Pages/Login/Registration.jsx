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
    <div>
      <div className="w-full max-w-sm sm:max-w-md bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <div className="flex items-center justify-center mb-6">
          <h6 className="text-2xl sm:text-3xl font-bold text-black hover:text-blue-600">
            WAN<span className="text-red-600">O</span>SHOE
          </h6>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center">{error}</p>}
          
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
              Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Full Name"
              id="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter Your Email"
              id="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="******"
              id="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>

        <button
          className="w-full mt-4 text-blue-500 hover:underline focus:outline-none"
          onClick={() => props.onFormSwitch('login')}
        >
          Already have an account? Login here
        </button>
      </div>
    </div>
  );
}

export default Registration;
