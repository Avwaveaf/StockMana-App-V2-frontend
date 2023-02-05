import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout.component';
import ForgotPwd from './pages/auth/ForgotPwd.page';
import Login from './pages/auth/Login.page';
import Register from './pages/auth/Register.page';
import ResetPwd from './pages/auth/ResetPwd.page';
import Dashboard from './pages/dashboard/Dashboard.page';
import Home from './pages/home/Home.page';
import axios from 'axios'
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {  SET_LOGIN } from './redux/slices/auth/authSlice';
import { useEffect, useState } from 'react';
import { GetLoginStatus } from './services/auth.services';
import Loader from './components/loader/Loader.component';
import AddProduct from './pages/addProduct/AddProduct.page';

axios.defaults.withCredentials = true

function App() {
  const [isLoading,setIsLoading] = useState(false) 
  const dispatch = useDispatch();
  
  useEffect(() => { 
    const getLoginStatus = async () => {

      setIsLoading(true)
      try {
        const isLoggedIn = await GetLoginStatus()
        await dispatch(SET_LOGIN(isLoggedIn))
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
    
      }
    }
    getLoginStatus()
  }, [dispatch])
  
  return (
    <BrowserRouter>
    { isLoading && <Loader/>}
    <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPwd />} />
        <Route path='/reset-password/:resetToken' element={<ResetPwd />} />
        <Route
          path='/dashboard'
          element={
         
              <Layout>
                <Dashboard />
              </Layout>
        
          }
        />
        <Route
          path='/add-product'
          element={
         
              <Layout>
                <AddProduct />
              </Layout>
        
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
