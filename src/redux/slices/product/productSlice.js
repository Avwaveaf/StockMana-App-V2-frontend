import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import {
  CreateProduct,
  GetAllProduct,
} from '../../../services/product.services';

const initialState = {
  product: null,
  products: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  totalStoreValue: 0,
};

//create new product
export const asyncCreateProductHandler = createAsyncThunk(
  'products/create',
  async (formData, thunkAPI) => {
    try {
      return await CreateProduct(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
//Get all product
export const asyncGetProductHandler = createAsyncThunk(
  'products/getAllProduct',
  async (thunkAPI) => {
    try {
      return await GetAllProduct();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const products = action.payload;
      const array = [];
      products.map((item) => {
        const { price, quantity } = item;
        const productValue = Number(price) * Number(quantity);
        return array.push(productValue);
      });
      const totalValue = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalStoreValue = totalValue;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(asyncCreateProductHandler.pending, (state) => {
        // add product thunk
        state.isLoading = true;
      })
      .addCase(asyncCreateProductHandler.fulfilled, (state, { payload }) => {
        // add product thunk
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products.push(payload.data.data);
        toast.success('Product added successfully');
      })
      .addCase(asyncCreateProductHandler.rejected, (state, action) => {
        // add product thunk
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(asyncGetProductHandler.pending, (state) => {
        // get product thunk
        state.isLoading = true;
      })
      .addCase(asyncGetProductHandler.fulfilled, (state, { payload }) => {
        // get product thunk
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = payload.data.data;
        toast.success('Products Loaded successfully');
      })
      .addCase(asyncGetProductHandler.rejected, (state, action) => {
        // get product thunk
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      }),
});

export const { CALC_STORE_VALUE } = productSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;
export const selectTotalStoreValue = (state) => state.product.totalStoreValue;

export default productSlice.reducer;
