import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useRedirectLoggedOut from '../../components/customHook/useRedirectLoggedOut.component';
import Loader from '../../components/loader/Loader.component';
import ProductList from '../../components/productList/ProductList.component';
import { selectIsLoggedIn } from '../../redux/slices/auth/authSlice';
import { asyncGetProductHandler, CALC_STORE_VALUE, selectTotalStoreValue } from '../../redux/slices/product/productSlice';

const Dashboard = () => {
  useRedirectLoggedOut("/login")
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { products, isError, isLoading, message } = useSelector(state => state.product)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(asyncGetProductHandler())
    }
    if (isError) {
      console.log(message)
    }
  
  }, [isLoggedIn, isError, message, dispatch])
  useEffect(() => { 
    dispatch(CALC_STORE_VALUE(products))
  },[dispatch,products])
  
 

  return (
  
    <div>
      {isLoading && <Loader />}
      <ProductList products={products}/>
    </div>
  )
}

export default Dashboard