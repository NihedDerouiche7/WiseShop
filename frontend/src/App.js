import React from 'react';
import { BrowserRouter as Router ,Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import {Container } from 'react-bootstrap'
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PayementScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/orderScreen';
import UserListScreen from './Screens/UserListScreen';
import UserEditScrenn from './Screens/UserEditScreen';
import ProductListScreen from './Screens/ProductListScreen';
import ProductEditScreen from './Screens/ProductEditScreen';
import OrderListScreen from './Screens/OrderListScreen';

const App = () => {
  return (
    <Router>
    <div>

      <Header/>
      <main className='py-3'>
        <Container>
        <Routes>
       <Route path='/' element={<HomeScreen/>}  exact />
       <Route path='/product/:id' element={<ProductScreen/>}   />
       <Route path="/cart/:productId" element={<CartScreen/>}   />
       <Route path="/cart/" element={<CartScreen/>}   />
       <Route path="/login/" element={<LoginScreen/>}   />
       <Route path="/register/" element={<RegisterScreen/>}   />
       <Route path="/profile/" element={<ProfileScreen/>}   />
       <Route path="/shipping/" element={<ShippingScreen/>}   />
       <Route path="/login/shipping/" element={<ShippingScreen/>}   />
       <Route path="/payment" element={<PaymentScreen/>}   />
       <Route path="/placeorder" element={<PlaceOrderScreen/>}   />
       <Route path="/order/:orderId" element={<OrderScreen/>}   />
       <Route path="/admin/userlist" element={<UserListScreen/>}   />
       <Route path="/admin/user/:userId/edit" element={<UserEditScrenn/>}   /> 
       <Route path="/admin/productlist" element={<ProductListScreen/>}   />
       <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen/>} exact  />
       <Route path="/admin/product/:productId/edit" element={<ProductEditScreen/>}   /> 
       <Route path="/admin/orderlist" element={<OrderListScreen/>}   />
       <Route path='/search/:keyword' element={<HomeScreen/>}  exact />
       <Route path='/page/:pageNumber' element={<HomeScreen/>}  exact />
       <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen/>}  exact />
        </Routes>
        </Container>
        
        
      </main>
      
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
