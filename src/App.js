import React,{} from 'react'
import Home from './Combonents/Home'
import { Route,Routes,useLocation} from 'react-router-dom'
import Login1 from './Combonents/Login'
import Collection from './Combonents/Products/Collection'
import Women from './Combonents/Products/Women'
import Men from './Combonents/Products/Men'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './Combonents/Context/Cart/Cart'
import ShopContextProvider from './Combonents/Context/Shop-contex'
import Cheakfil from './Combonents/Checkout/Cheakfil'
import Footer from './Combonents/Footer'
import Nav from './Combonents/Nav'
import Admin from './Combonents/Adminpeg/Admin'
import ProductFilter from './Combonents/Adminpeg/Prodectfilter'
import RegisterdUser from './Combonents/Adminpeg/User/RegisterdUser'
import UserDetails from './Combonents/Adminpeg/User/Userdeatails'
import AdminHom from './Combonents/Adminpeg/AdminHom'

export default function App() {
  const location = useLocation();
const isAdminpath= location.pathname.startsWith('/admin');

  return (
    
    <div>
<ShopContextProvider>
 { !isAdminpath && <Nav/>}
     <Routes>
 <Route path='men'element={<Men/>}/>
 <Route path='women'element={<Women/>}/>
 <Route path='login'element={<Login1/>}/>
 <Route path='/' element={<Home/>}></Route>
 <Route path='collections'element={<Collection/>}></Route>
<Route path='/cart'element={<Cart/>}></Route>
<Route path='payment' element={<Cheakfil/>}></Route>
<Route path='/admin' element={<Admin/>}></Route>
<Route path='/admin/prodect' element={<ProductFilter/>}></Route>
<Route path='admin/registerduser' element={<RegisterdUser/>}></Route>
<Route path='admin/registerduser/:id' element={<UserDetails/>}></Route>
<Route path='/admin/adminhome' element={<AdminHom/>}></Route>
     </Routes>
     
   { !isAdminpath &&<Footer/> }
     </ShopContextProvider>
    
    </div>
  
  )
}
