import React from "react";
import { useLocation,useNavigate } from "react-router";
import './cheakfile.css';
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { ShopContext } from "../../Context/Shop-contex";

function Cheakfil() {
 const{ clearCart} = useContext(ShopContext)
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate()

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));


  const eventBuyclick= () => {
     if (loggedInUser){
      clearCart()
     alert('Purchase completed successfully!')
    }else{
      alert('pleas login');
       navigate('/login');
    }
  };
 
  return (
    <div className="container1">
      <div className="card1">
        <div className="card1-content">
          <h2>Customer Information</h2>
          <input type="text" className="input-field" placeholder="Username or Email Address" />
          
          <h1>Billing Details</h1>
          <div className="billing-details">
            <input type="text" className="input-field half-width" placeholder="First Name" />
            <input type="text" className="input-field half-width" placeholder="Last Name" />
          </div>
          
          <h1>Country Checklist</h1>
          <input type="text" id="searchInput" className="input-field" placeholder="Search countries..." />
          <label htmlFor="countrySelect">Select a Country or Region:</label>
          <select id="countrySelect" className="input-field">
            <option value="india">India</option>
            <option value="england">England</option>
            <option value="australia">Australia</option>
          </select>
          
          <div className="address-section">
            <input type="text" className="input-field" placeholder="House number and street name" />
            <div className="address-subsection">
              <input type="text" className="input-field half-width" placeholder="Town/city" />
              <input type="text" className="input-field half-width" placeholder="Zip code" />
            </div>
          </div>
          
          <h2>Additional Information</h2>
          <textarea id="message" className="input-field" name="message" rows="4" cols="50" placeholder="Notes about your order..."></textarea>
          <input type="text" className="input-field" placeholder="Have a coupon?" />
        </div>
      </div>

      <div className="card2">
        <h3>Payment Details</h3>
        <p>Total Price: ₹{state.totalAmount}</p>
       <Button onClick={eventBuyclick}>Buy</Button>
      </div>
    </div>
  );
}

export default Cheakfil;
