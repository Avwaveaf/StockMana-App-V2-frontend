import toast from 'react-hot-toast';
import axios from 'axios'

export const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/api/products`;


// create new proudct
export const CreateProduct = async (payload) => { 
        const res = await axios.post(`${BACKEND_URL}`,payload)
        return res
};
// create new proudct
export const GetAllProduct = async () => { 
        const res = await axios.get(`${BACKEND_URL}`)
        return res
};