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
// delete single proudct
export const DeleteSingleProduct = async (id) => { 
        const res = await axios.delete(`${BACKEND_URL}/${id}`)
        return res
};
// get single proudct
export const GetSingleProduct = async (id) => { 
        const res = await axios.get(`${BACKEND_URL}/${id}`)
        return res
};