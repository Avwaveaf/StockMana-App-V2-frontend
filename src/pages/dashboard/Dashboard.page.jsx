import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useRedirectLoggedOut from '../../components/customHook/useRedirectLoggedOut.component';
import Loader from '../../components/loader/Loader.component';
import { selectIsLoggedIn } from '../../redux/slices/auth/authSlice';
import MyChart from '../../components/chart/Chart.component';
import {
  asyncGetProductHandler,
  CALC_INVENTORY_PRODUCT_QUANTITY,
  CALC_INVENTORY_QUANTITY,
  CALC_PERCENTAGE_SOLD,
  CALC_PRODUCT_SOLD,
  CALC_STORE_VALUE,
} from '../../redux/slices/product/productSlice';
import { GiMoneyStack } from 'react-icons/gi';
import { MdOutlineInventory2 } from 'react-icons/md';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

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
    productSold,
    percentageSold,
  } = useSelector((state) => state.product);
  const [chartData,setChartData] = useState([])

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(asyncGetProductHandler());
    }
    if (isError) {
      toast.error(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  useMemo(() => {
    dispatch(CALC_STORE_VALUE(products));

    dispatch(CALC_INVENTORY_PRODUCT_QUANTITY(products));
    dispatch(CALC_INVENTORY_QUANTITY());
    dispatch(CALC_PRODUCT_SOLD(products));
    dispatch(CALC_PERCENTAGE_SOLD());
  }, [dispatch, products])
  
  useMemo(() => { 
    const data = products.reduce((currArr, product) => {
      return [...currArr, {name:product.name,quantity:product.quantity,sold:product.soldCount}]
    }, [])
    setChartData(data)
  }, [products])


  return (
    <div className='py-5  w-full  h-fit'>
      {isLoading && <Loader />}
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }} >
        <Masonry className='py-5'>
          <div className='p-1'>
          <div className='flex gap-2  lg:h-40 bg-green-400  hover:bg-green-600 justify-center items-center  p-5 rounded-md text-white font-bold'>
          <div className='flex justify-center items-center p-2 bg-green-700 rounded-full'>
            <GiMoneyStack size={30} />
          </div>

          <div className='flex flex-col'>
            <h1>Total Inventory Worth</h1>
            <span>{totalStoreValue}</span>
          </div>
        </div>
          </div>
          <div className='p-1'>
          <div className='flex gap-2  lg:h-20 bg-red-400  hover:bg-red-600 justify-center items-center  p-5 rounded-md text-white font-bold'>
          <div className='flex justify-center items-center p-2 bg-red-700 rounded-full'>
            <MdOutlineInventory2 size={30} />
          </div>

          <div className='flex flex-col'>
            <h1>Total product variant</h1>
            <span>{totalQuantity}</span>
          </div>
        </div>
          </div>
          <div className='p-1'>
          <div className='flex gap-2 lg:h-[248px] bg-orange-400 hover:bg-orange-600 justify-center items-center  p-5 rounded-md text-white font-bold'>
          <div className='flex justify-center items-center p-2 bg-orange-700 rounded-full'>
            <AiOutlineOrderedList size={30} />
          </div>

          <div className='flex flex-col'>
            <h1>Total product sold</h1>
            <span>{productSold}</span>
          </div>
        </div>
          </div>
          <div className='p-1'>
          
          <div className='flex gap-2 lg:h-20 bg-blue-400 hover:bg-blue-600 justify-center items-center  p-5 rounded-md text-white font-bold'>
          <div className='flex justify-center items-center p-2 bg-blue-700 rounded-full'>
            <AiOutlineOrderedList size={30} />
          </div>
  
          <div className='flex flex-col'>
            <h1>Total product quantity</h1>
            <span>{totalProductQuantity}</span>
          </div>
        </div>
          </div>
          <div className='p-1'>
          <div className='flex gap-2 lg:h-40 bg-yellow-400 hover:bg-yellow-600 justify-center items-center  p-5 rounded-md text-white font-bold'>
          <div className='flex justify-center items-center p-2 bg-yellow-700 rounded-full'>
            <AiOutlineOrderedList size={30} />
          </div>

          <div className='flex flex-col'>
            <h1>Your sale percentage</h1>
            <span>{percentageSold}%</span>
          </div>
        </div>
          </div>

        </Masonry>
      </ResponsiveMasonry>
      <div>
        <MyChart chartData={chartData } />
      </div>

    </div>
  );
};

export default Dashboard;
