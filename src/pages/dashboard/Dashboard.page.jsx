import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useRedirectLoggedOut from '../../components/customHook/useRedirectLoggedOut.component';
import Loader from '../../components/loader/Loader.component';
import ProductList from '../../components/productList/ProductList.component';
import { selectIsLoggedIn } from '../../redux/slices/auth/authSlice';
import {
  asyncGetProductHandler,
  CALC_INVENTORY_PRODUCT_QUANTITY,
  CALC_INVENTORY_QUANTITY,
  CALC_STORE_VALUE,
} from '../../redux/slices/product/productSlice';
import { GiMoneyStack } from 'react-icons/gi';
import { MdOutlineInventory2 } from 'react-icons/md';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  useRedirectLoggedOut('/login');
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const {
    products,
    isError,
    isLoading,
    message,
    totalStoreValue,
    totalQuantity,
    totalProductQuantity,
  } = useSelector((state) => state.product);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(asyncGetProductHandler());
    }
    if (isError) {
      toast.error(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
  }, [dispatch, products]);
  useEffect(() => {
    dispatch(CALC_INVENTORY_PRODUCT_QUANTITY(products));
  }, [dispatch, products]);
  useEffect(() => {
    dispatch(CALC_INVENTORY_QUANTITY());
  }, [dispatch, products]);

  return (
    <div className='py-5 h-fit'>
      {isLoading && <Loader />}
      <div className='flex gap-2 mx-auto flex-col lg:flex-row'>
        <div className='flex gap-2  bg-green-400  hover:bg-green-600 justify-center items-center  p-5 rounded-md text-white font-bold'>
          <div className='flex justify-center items-center p-2 bg-green-700 rounded-full'>
            <GiMoneyStack size={30} />
          </div>

          <div className='flex flex-col'>
            <h1>Total Inventory Worth</h1>
            <span>{totalStoreValue}</span>
          </div>
        </div>
        <div className='flex gap-2  bg-red-400  hover:bg-red-600 justify-center items-center  p-5 rounded-md text-white font-bold'>
          <div className='flex justify-center items-center p-2 bg-red-700 rounded-full'>
            <MdOutlineInventory2 size={30} />
          </div>

          <div className='flex flex-col'>
            <h1>Total product variant</h1>
            <span>{totalQuantity}</span>
          </div>
        </div>
        <div className='flex gap-2  bg-blue-400 hover:bg-blue-600 justify-center items-center  p-5 rounded-md text-white font-bold'>
          <div className='flex justify-center items-center p-2 bg-blue-700 rounded-full'>
            <AiOutlineOrderedList size={30} />
          </div>

          <div className='flex flex-col'>
            <h1>Total product quantity</h1>
            <span>{totalProductQuantity}</span>
          </div>
        </div>
      </div>

      <ProductList products={products} />
    </div>
  );
};

export default Dashboard;
