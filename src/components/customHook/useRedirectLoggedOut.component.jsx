import  { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUsername, SET_LOGIN } from '../../redux/slices/auth/authSlice';
import { GetLoginStatus } from '../../services/auth.services';

const useRedirectLoggedOut = (path) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const username = useSelector(selectUsername)
    useEffect(() => { 
        const redirectLoggedOutUser = async () => {
            const isLoggedIn = await GetLoginStatus()
           
            dispatch(SET_LOGIN(isLoggedIn))
            if (!isLoggedIn) { 
                if (!username) {
                    toast.error("You are not authorized, please login first...");
                    navigate(path);
                } else { 
                    toast("Session Expired. Please login to continue...")
                    navigate(path)
                }
            
            }
        }
        redirectLoggedOutUser()
    },[navigate,path,dispatch,username])
}

export default useRedirectLoggedOut