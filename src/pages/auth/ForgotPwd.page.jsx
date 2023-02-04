import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import AuthForm from '../../components/authForm/AuthForm.component';
import Loader from '../../components/loader/Loader.component';
import { ForgotPassword } from '../../services/auth.services';

const initialState = {
  email: '',

};

const ForgotPwd = () => {
  const [isLoading,setIsLoading] = useState(false) 
  const navigate= useNavigate()
    const forgotPwdHandler = async(e, formData) => {
      e.preventDefault()
      if ( !formData.email ) {
        return toast.error("All fields are required")
      }
      setIsLoading(true)
    try {
      const res = await ForgotPassword(formData)
      setIsLoading(false)
      
      toast.success(res.message)
      navigate('/forgot-password')
    } catch (error) {
      setIsLoading(false)
     
    }
  };

  return (
    <>
    { isLoading && <Loader/>}
 
    <AuthForm
      emailInput={true}
      onSubmitHandler={forgotPwdHandler}
      description="No problem! Just type in your email address to reset your password. Please note that the password reset link we send you may end up in your spam folder, so be sure to check there after submitting your request. Also, keep in mind that the reset link is only valid for 30 minutes, so be sure to use it promptly. If you have any issues, don't hesitate to reach out for assistance."
      formName='Forgot Password'
      initialState={initialState}
      additionalRouteDescription="Go back?"
      additionalRouteName='login'
      submitButtonName='Send Reset Link'

      />
      </>
  );
};

export default ForgotPwd;
