import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductData } from './Products/Prodects';
import './Home.css';
import SearchBar from './SearchBar';
import { ShopContext } from './Context/Shop-contex';
import { CiLogin } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
function Nav() {
  const { getTotalCartItemsCount, clearCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem('loggedInUser')
    localStorage.removeItem('isLoggedIn')
   
    navigate('/')
  };

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const isLoggedIn = loggedInUser && localStorage.getItem('isLoggedIn') === 'true';

  const total = isLoggedIn ? getTotalCartItemsCount() : clearCart()

  return (
    <div>
      <nav className='nav0'>
        <Link className='nav0-1' to="">
          Free Express Shipping on all orders with all duties included
        </Link>
      </nav>

      <nav className='navbar'>
        <ul className='navbar-left'>
          <li className='link-home-head'>
            <Link to="/">WANOSHOE</Link>
          </li>
          <li>
            <Link to="men">MEN</Link>
          </li>
          <li>
            <Link to="women">WOMEN</Link>
          </li>
          <li>
            <Link to="collections">COLLECTIONS</Link>
          </li>
        </ul>
        <span><SearchBar data={ProductData} /></span>
        <ul className='navbar-right'>
          <li>
            <Link to="cart">
              {/* <img src='./images.png' alt='' className='logimg' /> */}
              <CiShoppingCart  className='logimg  mt-0' size={52} />
            </Link>
          </li>
          <div className='nav-cart-count'>{total}</div>
          {isLoggedIn ? (
            <li className='btn'>
              {/* <button onClick={handleLogout} className='logout-btn'><img src="./logout.png" alt="" className='logout-img' /></button> */}
              <CiLogin onClick={handleLogout} className='mt-1 text-white' size={32}/>
            </li>


          ) : (
            <li>
              <Link to="login">
                {/* <img src="./logo512.png" alt="" className='logimg' /> */}
                <BsPerson    className='mt-2' size={32}/>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;

