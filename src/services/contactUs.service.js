import toast from 'react-hot-toast';
import axios from 'axios'

export const BACKEND_URL =`${process.env.REACT_APP_BACKEND_URL}/api/contact-us` 

// register new user
export const ContactUsHandler = async (payload) => { 
    try {
        const res = await axios.post(`${BACKEND_URL}`,payload)
        return res.data
    } catch (error) {
        return toast.error(error.response.data.message)
    }
};
