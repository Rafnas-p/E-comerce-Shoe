import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/Shop-contex';

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
      <div className='auth-form-container'>
        <form className='login-form' onSubmit={handleSubmit}>
          <h3>Welcome to Wano</h3>
          <label htmlFor="email">Enter Your Email:</label>
          <input
            type="email"
            placeholder='Enter Your Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id='email'
            name='email'
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='******'
            id='password'
            name='password'
            required
          />
          <br />
          <button className='btn-login' type="submit">Login</button>
        </form>
        <button className='link-btn' onClick={() => props.onFormSwitch('Registration')}>
          Don't have an account? Register here
        </button>
      </div>
      {loginSuccess && (
        <div className='success-message'>
          <p>Login Successful! Redirecting...</p>
        </div>
      )}
    </>
  );
}

export default Login;






