import React, { useEffect, useState } from 'react';
import './user.css';
import { BsPerson } from "react-icons/bs";
import { Link } from 'react-router-dom';
import AdminNav from '../AdminNav';
import Cookie from 'js-cookie'
 const RegisteredUser=()=> {
  const [users,setUsers]=useState([])
  useEffect(()=>{
    const fetchUsers= async()=>{
      try {

        const token = Cookie.get('token'); // Ensure token is fetched correctly
        if (!token) {
          console.log('User is not logged in');
          return;
        }
        
        const isLogged=Cookie.get('isLogged')
        const response= await fetch('http://localhost:3002/admin/viewAllUsers',{
          method:'GET',
    headers:{  "Content-Type": "application/json",
      Authorization: `Bearer ${token}`},
      
        })
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users); // Ensure you use `data.users`

          console.log('fetch users',users);
          
        } else {
          console.log("Failed to fetch users");
        }
      } catch (error) {
        console.log('Error fetching users:', error);
      }
      
    }
    fetchUsers()
  },[])
  console.log('Users:', users);
  
  return (
    <>
    <AdminNav/>
    <div className="users-container">
      {users.map((user, index) => (
        <div key={index} className="user-card">
          <BsPerson />
          <p className="user-name">{user.username}</p>
          <p className="user-email">{user.email}</p>
          <Link to={`/admin/registerduser/${user._id}`}>details</Link>  
        </div>
      ))}
    </div>
    </>
  );
}

export default RegisteredUser;

