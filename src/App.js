
import React from 'react';
import Home from './Pages/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login1 from './Pages/Login';
import Collection from './Combonents/Products/Collection';
import Women from './Combonents/Products/Women';
import Men from './Combonents/Products/Men';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './Combonents/Cart/Cart';
import ShopContextProvider from './Context/Shop-contex';
import Cheakfil from './Combonents/Checkout/Cheakfil';
import Footer from './Pages/Footer';
import Nav from './Combonents/Navbar/Nav';
import Admin from './Adminpage/Admin';
import ProductFilter from './Adminpage/Prodectfilter';
import RegisterdUser from './Adminpage/User/RegisterdUser';
import UserDetails from './Adminpage/User/Userdeatails';
import AdminHom from './Adminpage/AdminHom';
import ProductDetails from './Combonents/Products/productDeatails'; // Corrected import

export default function App() {
  const location = useLocation();
  const isAdminpath = location.pathname.startsWith('/admin');

  return (
    <div>
      <ShopContextProvider>
        {!isAdminpath && <Nav />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='men' element={<Men />} />
          <Route path='women' element={<Women />} />
          <Route path='login' element={<Login1 />} />
          <Route path='collections' element={<Collection />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='payment' element={<Cheakfil />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/prodect' element={<ProductFilter />} />
          <Route path='admin/registerduser' element={<RegisterdUser />} />
          <Route path='admin/registerduser/:id' element={<UserDetails />} />
          <Route path='/admin/adminhome' element={<AdminHom />} />
          <Route path='/productDetails/:id' element={<ProductDetails />} /> {/* Corrected path */}
        </Routes>

        {!isAdminpath && <Footer />}
      </ShopContextProvider>
    </div>
  );
}
