import React from 'react';
import './user.css';
import { BsPerson } from "react-icons/bs";
import { Link } from 'react-router-dom';
import AdminNav from '../AdminNav';

function RegisteredUser() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return (
    <>
    <AdminNav/>
    <div className="users-container">
      {users.map((user, index) => (
        <div key={index} className="user-card">
          <BsPerson />
          <p className="user-name">{user.name}</p>
          <p className="user-email">{user.email}</p>
          <Link to={`/admin/registerduser/${user.id}`}>details</Link>  
        </div>
      ))}
    </div>
    </>
  );
}

export default RegisteredUser;

