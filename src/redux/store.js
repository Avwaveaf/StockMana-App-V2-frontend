import authReducer from "./slices/auth/authSlice";
import productReducer from "./slices/product/productSlice"

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer
    }
});

export default store