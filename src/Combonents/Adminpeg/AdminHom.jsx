import React from 'react';
import AdminNav from './AdminNav';
import './AdminHom.css'; 
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
function AdminHom() {
   const {id} =useParams()
  const users= JSON.parse(localStorage.getItem("users"))||[];
  const prodects= JSON.parse(localStorage.getItem("products"))||[];
  return (
    <div className="admin-dashboard">
      <AdminNav />
      <div className="dashboard-content">
        <div className="section">
       <Link to={`/admin/registerduser`}>  <h2>Users</h2></Link> 
          {<p>{users.length}</p>}
        </div>
        <div className="section">
          <h2>Total prodects</h2>
          {<p>{prodects.length}</p>}
        </div>
       
        </div>
      </div>
    
  );
}

export default AdminHom;
