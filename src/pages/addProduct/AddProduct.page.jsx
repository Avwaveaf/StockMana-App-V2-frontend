import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader.component';
import ProductForm from '../../components/productForm/ProductForm.component';
import {
  asyncCreateProductHandler,
  selectIsLoading,
} from '../../redux/slices/product/productSlice';

const initialState = {
  name: '',
  price: '',
  quantity: '',
  category: '',
};

const AddProduct = () => {
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');
  const isLoading = useSelector(selectIsLoading);
  const { name, price, quantity, category } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateProductSKU = (category) => {
    const prodCatSkuLetter = category.slice(0, 3).toUpperCase();
    const skuUniqueNumber = Date.now();
    const productSKU = prodCatSkuLetter + '-' + skuUniqueNumber;
    return productSKU;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sku', generateProductSKU(category));
    formData.append('category', category);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('imageUrl', productImage);

    await dispatch(asyncCreateProductHandler(formData));
    navigate('/dashboard');
  };
  return (
      <div>
          {isLoading && <Loader/> }
      <h1>Add Product</h1>
          <ProductForm
              product={product}
              productImage={ productImage}
              imagePreview={ imagePreview}
              description={ description}
              setDescription={ setDescription}
              handleInputChange={ handleInputChange}
              handleImageChange={ handleImageChange}
              saveProduct={ saveProduct}
          />
    </div>
  );
};

export default AddProduct;
