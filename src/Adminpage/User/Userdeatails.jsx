import React, { useEffect, useState } from "react";
import './user.css';
import AdminNav from "../AdminNav";
import Cookie from 'js-cookie';
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { _id } = useParams();  // Ensure that the param is correct (should be userId)
  const [userDetails, setUserDetails] = useState(null);  // Start with `null` to handle loading state

  useEffect(() => {
    const token = Cookie.get('token');
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3002/admin/getUser/${_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data.user);  // Match the key `user` from the backend
        }
      } catch (error) {
        console.log('Error fetching user details:', error);
      }
    };

    if (_id) {
      fetchUserDetails();
    }
  }, [_id]);

  if (!userDetails) {
    return <div>Loading...</div>;  // Render a loading state if the data is not yet available
  }

  return (
    <>
      <AdminNav />
      <div>
        <h1>User Details</h1>
        {/* Display user details here */}
        <p>Name: {userDetails.username}</p>
        <p>Email: {userDetails.email}</p>
        <p>ID: {userDetails._id}</p>
        {/* Add more fields as needed */}
      </div>
    </>
  );
}

export default UserDetails;
