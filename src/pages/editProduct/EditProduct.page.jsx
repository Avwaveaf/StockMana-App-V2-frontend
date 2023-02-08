import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader.component';
import ProductForm from '../../components/productForm/ProductForm.component';
import { selectIsLoggedIn } from '../../redux/slices/auth/authSlice';
import { asyncGetSingleProduct, asyncUpdataSingleProduct, selectIsError, selectIsLoading, selectMessage, selectSingleProduct } from '../../redux/slices/product/productSlice';

const EditProduct = () => {
    const {id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const tempUpdateProduct = useSelector(selectSingleProduct)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const message = useSelector(selectMessage)
    const isError = useSelector(selectIsError)
    const isLoading = useSelector(selectIsLoading);

    const [product, setProduct] = useState({});
    const [productImage, setProductImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState('');


    useEffect(() => {
        if (isLoggedIn) {
       
          dispatch(asyncGetSingleProduct(id));
        }
        if (isError) {
          toast.error(message);
          navigate('/dashboard');
        }
    }, [isLoggedIn, isError, message, dispatch, id, navigate]);

    useEffect(() => {
        if (tempUpdateProduct) {
            setProduct(tempUpdateProduct)
            setImagePreview(tempUpdateProduct && tempUpdateProduct.imageUrl.filePath?tempUpdateProduct.imageUrl.filePath :null)
            setDescription(tempUpdateProduct && tempUpdateProduct.description?tempUpdateProduct.description:"")
         }

     },[tempUpdateProduct])
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
      };
    
      const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
      };
    

      const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('category', product.category);
        formData.append('quantity', product.quantity);
        formData.append('price', product.price);
        formData.append('description', description);
          if (productImage) {
            formData.append('imageUrl', productImage);
           }

    
        await dispatch(asyncUpdataSingleProduct({id,formData}));
        await dispatch(asyncGetSingleProduct(id))
        navigate('/dashboard');
      };
  return (
    <div>
    {isLoading && <Loader/> }
<h1>Edit Product</h1>
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
  )
}

export default EditProduct