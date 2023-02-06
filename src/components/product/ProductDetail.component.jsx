import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/slices/auth/authSlice';
import { asyncGetSingleProduct } from '../../redux/slices/product/productSlice';
import useRedirectLoggedOut from '../customHook/useRedirectLoggedOut.component';
import Loader from '../loader/Loader.component';

const ProductDetail = () => {
    useRedirectLoggedOut('/login');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { id } = useParams()
    const {
        product,
        isError,
        isLoading,
        message,
    } = useSelector((state) => state.product);
    useEffect(() => {
        if (isLoggedIn) {
          dispatch(asyncGetSingleProduct(id));
        }
        if (isError) {
            toast.error(message);
            navigate("/dashboard")
        }
    }, [isLoggedIn, isError, message, dispatch,id,navigate]);
    console.log(product)
    return (
      <>
            {isLoading && <Loader />}
            <div>ProductDetail</div>
      </>
    
  )
}

export default ProductDetail