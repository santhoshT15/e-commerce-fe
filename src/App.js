import './App.css';
import Adminpage from './components/Admin/AdminPage'
import AddProduct from './components/Admin/AddProduct'
import LandingPage from './components/LandingPage/Landingpage'
import EditProduct from './components/Admin/EditProduct'
import Cart from './components/Cart/Cart'
import Contactus from './components/Contactus/Contactus'
import UserDetails from './components/Admin/UsersDetails'
import UserProvider from './UserProvider'
import Protectedroutes from './components/utils/Protectedroutes';
import Login from './components/Login/Login'
import PrivateRoutes from './components/utils/Privaterotes'
import Registration from './components/Registeration/Registration'
import Order from './components/Order/Order'
import Profile from './components/Profile/Profile'
import Mycontext from './Context';
import Usernav from './components/LandingPage/Usernav';
import Footer from './components/Footer/Footer'
import Category from './components/Category/Category'
import Dashboard from './components/Admin/Dashboard'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { useContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  const {userdata} = useContext(Mycontext)
  const [user, setUser] = useState('')
  const userValue = (item) => {
    setUser(item)
  }
  return (
    <UserProvider>
      <BrowserRouter>
      <div className='main-area'>
        <Usernav />
        <div className='content-area'>
          <Routes>
            <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/category/:category' element={<Category />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/contactus' element={<Contactus />} /> 
          <Route exact path='/register' element={<Registration/>} />
          <Route exact path='/category/:category/:id' element={<ProductDetails />} />


          <Route  element={<Protectedroutes />} >
            <Route exact path='/admin/addproduct' element={<AddProduct />} />
            <Route exact path='/admin/editproduct' element={<EditProduct user={user} />} />
            <Route exact path='/admin/userdetails' element={<UserDetails />} />
            <Route exact path='/admin/Dashboard' element={<Dashboard />} />
            <Route exact path='/admin/category/:category' element={<Adminpage userdata={userValue} />} />
          </Route>
          <Route element={<PrivateRoutes/>}>
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/myorder' element={<Order/>} />
          <Route exact path='/profile' element={<Profile userdata={userdata} />}/>
          </Route>

          </Routes>
        </div>
        <div className='footer-area'>
          <Footer/>
        </div>
      </div>
      </BrowserRouter>
    </UserProvider>
      
    
  );
}

export default App;
