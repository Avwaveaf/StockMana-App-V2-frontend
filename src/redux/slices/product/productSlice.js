import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import {
  CreateProduct,
  DeleteSingleProduct,
  GetAllProduct,
  GetSingleProduct,
} from '../../../services/product.services';

const initialState = {
  product: null,
  products: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  totalStoreValue: 0,
  totalQuantity:0,
  totalProductQuantity:0
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
//delete single product
export const asyncDeleteSingleProduct = createAsyncThunk(
  'products/deleteSingleProduct',
  async (id, thunkAPI) => {
    try {
      return await DeleteSingleProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
//get single product
export const asyncGetSingleProduct = createAsyncThunk(
  'products/getSingleProduct',
  async (id, thunkAPI) => {
    try {
      return await GetSingleProduct(id);
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

      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
      });

      state.totalStoreValue = formatter.format(totalValue);
    },
    CALC_INVENTORY_PRODUCT_QUANTITY(state, action) { 
      const products = action.payload;
      const array = [];
      products.map((item) => {
        const {  quantity } = item;
        const productQuantity = Number(quantity);
        return array.push(productQuantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalProductQuantity = totalQuantity;
    },
    CALC_INVENTORY_QUANTITY(state) { 
      state.totalQuantity =state.products.length
    }
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
      })
      .addCase(asyncGetProductHandler.rejected, (state, action) => {
        // get product thunk
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(asyncDeleteSingleProduct.pending, (state) => {
        // delete single product thunk
        state.isLoading = true;
      })
      .addCase(asyncDeleteSingleProduct.fulfilled, (state, { payload }) => {
        // delete single product thunk
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Product Deleted successfully');
      })
      .addCase(asyncDeleteSingleProduct.rejected, (state, action) => {
        // delete single product thunk
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
      .addCase(asyncGetSingleProduct.pending, (state) => {
        // get single product thunk
        state.isLoading = true;
      })
      .addCase(asyncGetSingleProduct.fulfilled, (state, { payload }) => {
        // get single product thunk
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = payload.data.data
      })
      .addCase(asyncGetSingleProduct.rejected, (state, action) => {
        // get single product thunk
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload);
      })
});

export const { CALC_STORE_VALUE,CALC_INVENTORY_PRODUCT_QUANTITY,CALC_INVENTORY_QUANTITY } = productSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;
export const selectTotalStoreValue = (state) => state.product.totalStoreValue;
export const selectTotaQuantity = (state) => state.product.totalQuantity;
export const selectTotalProductQuantity = (state) => state.product.totalProductQuantity;

export default productSlice.reducer;
