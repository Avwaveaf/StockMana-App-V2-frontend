import React, { useState } from 'react';
import AuthForm from '../../components/authForm/AuthForm.component';
import toast from 'react-hot-toast';
import { RegisterUser } from '../../services/auth.services';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux'
import { SET_LOGIN, SET_USERNAME } from '../../redux/slices/auth/authSlice';
import Loader from '../../components/loader/Loader.component';
import useRedirectLogin from '../../components/customHook/useRedirectLogin';

const initialState = {
  username:"",
  email: '',
  password: '',
  confirmPassword:""
};

const Register = () => {
  useRedirectLogin("/dashboard")
  const [isLoading,setIsLoading] = useState(false) 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerHandler = async(e,formData) => {
    e.preventDefault()
    //client form validation
    const { username,email,password,confirmPassword} = formData
    if (!username || !email || !password || !confirmPassword) {
      return toast.error("All fields are required")
    }
    if (password.length <6 ) { 
      return toast.error("Password must up to 6 Characters")
    }
    if (password !== confirmPassword) { 
      return toast.error("Your password didn't match")
    }
    const userData = { username, email, password }
    setIsLoading(true)
    try {
      const res = await RegisterUser(userData)
 
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
    usernameInput={ true}
    confirmPasswordInput={ true}
    passwordInput={true}
    onSubmitHandler={registerHandler}
    formName='Register'
    initialState={initialState}
    additionalRouteDescription="Already have an account?"
    additionalRouteName='login'
    submitButtonName='Register Now!'
  />
    
    </>

  );
};

export default Register;
