import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import AuthForm from '../../components/authForm/AuthForm.component';
import Loader from '../../components/loader/Loader.component';
import { ResetPassword } from '../../services/auth.services';

const initialState = {
  password: '',
    confirmPassword:"",
};

const ResetPwd = () => {
  const [isLoading, setIsLoading] = useState(false) 
  const navigate = useNavigate()
  const {resetToken} = useParams()
  const resetPasswordHandler = async(e, formData) => {
    const { password,confirmPassword} = formData
        e.preventDefault()
        if (password !== confirmPassword) { 
          return toast.error("Your password didn't match")
    }
    const userData = { password }
    setIsLoading(true)
    try {
      const res = await ResetPassword(userData,resetToken)
 
      navigate('/login')
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
      passwordInput={true}
          confirmPasswordInput={true }
      onSubmitHandler={resetPasswordHandler}
      formName='Reset Password'
      initialState={initialState}
      additionalRouteDescription="Done with Password reset?"
      additionalRouteName='login'
      submitButtonName='Reset Password'
      additionalRouteName_2='home'
      additionalRouteDescription_2="Go back?"
      />
      </>
  );
};

export default ResetPwd;
