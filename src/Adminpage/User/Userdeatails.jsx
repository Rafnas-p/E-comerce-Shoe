import React from "react";
import { useParams } from "react-router";
import './user.css';
import AdminNav from "../AdminNav";

function UserDetails() {
  const { id } = useParams();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(user => user.id === id);

  return (
    <>
    <AdminNav/>
    <div className="user-details">
      <h3>User Details</h3>
      
      <div>
        <p><span>Email:</span> {user.email}</p>
        <p><span>Name:</span> {user.name}</p>
     
      </div>
    </div>
    </>
  );
}

export default UserDetails;

