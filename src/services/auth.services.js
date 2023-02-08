import toast from 'react-hot-toast';
import axios from 'axios'

export const BACKEND_URL =`${process.env.REACT_APP_BACKEND_URL}/api/users` 

// register new user
export const RegisterUser = async (payload) => { 
    try {
        const res = await axios.post(`${BACKEND_URL}/register`,payload)
        return res.data
    } catch (error) {
        return toast.error(error.response.data.message)
    }
};

// login user
export const LoginUser = async (payload) => { 
    try {
        const res = await axios.post(`${BACKEND_URL}/login`, payload)
        
        return res.data
    } catch (error) {
        
        return toast.error(error.response.data.message)
    }
};

// Forgot password
export const ForgotPassword = async (payload) => { 
    try {
        const res = await axios.post(`${BACKEND_URL}/forgot-password`,payload)
        return res.data
    } catch (error) {
        return toast.error(error.response.data.message)
    }
};

// Reset password
export const ResetPassword = async (payload,resetToken) => { 
    try {
        const res = await axios.put(`${BACKEND_URL}/reset-password/${resetToken}`,payload)
        return res.data
    } catch (error) {
        
        return toast.error(error.response.data.message)
    }
};

// Logout user
export const LogoutUser = async () => { 
    try {
        const res = await axios.get(`${BACKEND_URL}/log-out`)
        return res.data
    } catch (error) {
        return toast.error(error.response.data.message)
    }
};
// getLoggin status
export const GetLoginStatus = async () => { 
    try {
        const res = await axios.get(`${BACKEND_URL}/login-status`)
        return res.data
    } catch (error) {
        return toast.error(error.response.data.message)
    }
};
// get user data
export const GetUserData = async () => { 
    try {
        const res = await axios.get(`${BACKEND_URL}/get-user`)
        return res.data
    } catch (error) {
        return toast.error(error.response.data.message)
    }
};