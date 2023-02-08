import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/slices/auth/authSlice';
import { asyncGetSingleProduct } from '../../redux/slices/product/productSlice';
import useRedirectLoggedOut from '../customHook/useRedirectLoggedOut.component';
import Loader from '../loader/Loader.component';
import DOMPurify from 'dompurify';

const ProductDetail = () => {
  useRedirectLoggedOut('/login');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { id } = useParams();

  const { product, isError, isLoading, message } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(asyncGetSingleProduct(id));
    }
    if (isError) {
      toast.error(message);
      navigate('/dashboard');
    }
  }, [isLoggedIn, isError, message, dispatch, id, navigate]);

  return (
    <>
      {isLoading && <Loader />}
      {product && (
        <section className='text-gray-600 body-font bg-red overflow-hidden'>
          <img
            alt='ecommerce'
            className='lg:w-full  w-full lg:h-auto h-64  object-cover object-center rounded'
            src={product.imageUrl.filePath}
          />
          <div>
            { product.name}
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description),
            }}
          ></div>
        </section>
      )}
    </>
  );
};

export default ProductDetail;
