import  { useEffect } from 'react'

import { useDispatch,  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  SET_LOGIN } from '../../redux/slices/auth/authSlice';
import { GetLoginStatus } from '../../services/auth.services';

const useRedirectLogin = (path) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
 
    useEffect(() => { 
        const redirectLoggedOutUser = async () => {
            const isLoggedIn = await GetLoginStatus()
            if (isLoggedIn) { 
                dispatch(SET_LOGIN(isLoggedIn))
                navigate(path)
            }
       
        }
        redirectLoggedOutUser()
    },[navigate,path,dispatch])
}

export default useRedirectLogin