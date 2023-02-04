import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/authForm/AuthForm.component';
import toast from 'react-hot-toast';
import { LoginUser } from '../../services/auth.services';
import { SET_LOGIN, SET_USERNAME } from '../../redux/slices/auth/authSlice';
import Loader from '../../components/loader/Loader.component';
import useRedirectLogin from '../../components/customHook/useRedirectLogin';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  useRedirectLogin("/dashboard")
  const [isLoading,setIsLoading] = useState(false) 
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const loginHandler = async(e, formData) => {
      e.preventDefault()
      const { email, password } = formData
      
      if ( !email || !password) {
        return toast.error("All fields are required")
      }
      setIsLoading(true)
    try {
      const res = await LoginUser(formData)

        await dispatch(SET_LOGIN(true))
        await dispatch(SET_USERNAME(res.data.name))
        navigate('/dashboard')

      setIsLoading(false)
      toast.success(res.message)
      
    } catch (error) {
   
      setIsLoading(false)
      
    }
  };

  return (
    <>
    { isLoading && <Loader/>}
    <AuthForm
      emailInput={true}
      description="Welcome to our login page! Please enter your email and password to access your account. If you have forgotten your password, simply click on the 'Forgot Password' link and follow the instructions to reset it. Thank you for choosing our service and enjoy your experience."
      passwordInput={true}
      onSubmitHandler={loginHandler}
      formName='Login'
      initialState={initialState}
      additionalRouteDescription="Don't have and account?"
      additionalRouteName='register'
      submitButtonName='Login'
      additionalRouteName_2='forgot-password'
      additionalRouteDescription_2="Couldn't Login?"
      />
      </>
  );
};

export default Login;
