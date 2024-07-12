import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now().toString(), 
      name,
      email,
      password,
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.email === email);

    if (userExists) {
      alert('User already exists with this email');
      return;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    navigate(props.onFormSwitch('login'));
  };

  return (
    <div className='auth-form-container'>
      <form className='register-form' onSubmit={handleSubmit}>
        <label htmlFor='name'>Full name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder='Full name'
          id='name'
          required
        />
        <label htmlFor='email'>Enter Your Email:</label>
        <input
          type='email'
          placeholder='Enter Your Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id='email'
          name='email'
          required
        />
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder='******'
          id='password'
          name='password'
          required
        />
        <br />
        <button className='btn-login' type='submit'>Sign Up</button>
      </form>
      <button className='link-btn' onClick={() => props.onFormSwitch('login')}>
        Already have an account? Login here
      </button>
    </div>
  );
}

export default Registration;

