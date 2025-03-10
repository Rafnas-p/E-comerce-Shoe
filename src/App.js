import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Login1 from './Pages/Login';
import Cart from './Combonents/Cart/Cart';
import ShopContextProvider from './Context/Shop-contex';
import Checkout from './Combonents/Checkout/Checkout';
import Nav from './Combonents/Navbar/Nav';
import Admin from './Adminpage/Admin';
import ProductFilter from './Adminpage/Prodectfilter';
import RegisterdUser from './Adminpage/User/RegisterdUser';
import UserDetails from './Adminpage/User/Userdeatails';
import AdminHom from './Adminpage/AdminHom';
import ProductDetails from './Combonents/Products/productDeatails';
import Wishlist from './Combonents/Products/Wishlist';
import OrderDetails from './Adminpage/OrderDetails';
import OrderDtailsUser from './Combonents/Cart/OrderDtailsUser';
import SearchProduct from './Combonents/Search/SearchProduct';
import ProtectedRoute from './Combonents/protectRouter/ProtectedRoute';

const Collection = lazy(() => import('./Combonents/Products/Collection'));
const Women = lazy(() => import('./Combonents/Products/Women'));
const Men = lazy(() => import('./Combonents/Products/Men'));
const Footer = lazy(() => import('./Pages/Footer'));

export default function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  const isFooterVisible = !isAdminPath && location.pathname !== '/cart' && location.pathname !== '/Wishlist';

  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ShopContextProvider>
      <div className="flex flex-col min-h-screen">
        {!isAdminPath && <Nav />}
        
        {/* Main Content Wrapper */}
        <div className="flex-grow">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='men' element={<Suspense fallback={<div>Loading...</div>}><Men /></Suspense>} />
            <Route path='women' element={<Suspense fallback={<div>Loading...</div>}><Women /></Suspense>} />
            <Route path='login' element={<Login1 />} />
            <Route path='collections' element={<Suspense fallback={<div>Loading...</div>}><Collection /></Suspense>} />
            <Route path='/cart' element={<Cart />} />
            <Route path='payment' element={<Checkout />} />
            <Route path='/admin' element={<ProtectedRoute><Admin/></ProtectedRoute>} />
            <Route path='/admin/prodect' element={<ProtectedRoute><ProductFilter/></ProtectedRoute>} />
            <Route path='admin/registerduser' element={<ProtectedRoute><RegisterdUser /></ProtectedRoute>} />
            <Route path='admin/registerduser/:_id' element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
            <Route path='/admin/adminhome' element={<ProtectedRoute><AdminHom/></ProtectedRoute>} />
            <Route path='/productDetails/:id' element={<ProductDetails />} /> 
            <Route path='/Wishlist' element={<Wishlist />} /> 
            <Route path='admin/OrderDetails' element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} /> 
            <Route path='/OrderDtailsUser' element={<OrderDtailsUser />} /> 
            <Route path="/SearchProduct/:_id" element={<SearchProduct />} />
          </Routes>
        </div>

        {/* Footer */}
        {isFooterVisible && showFooter && (
          <Suspense fallback={<div>Loading Footer...</div>}>
            <Footer />
          </Suspense>
        )}
      </div>
    </ShopContextProvider>
  );
}
