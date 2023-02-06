import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  asyncDeleteSingleProduct,
  asyncGetProductHandler,
} from '../../redux/slices/product/productSlice';
import QuickViewModal from '../quickViewModal/QuickViewModal';
import SearchBar from '../searchBar/SearchBar.component';

const ProductList = ({ products }) => {
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm,setSearchTerm] = useState('')
  const deleteProducthandler = async (id) => {
    await dispatch(asyncDeleteSingleProduct(id));
    await dispatch(asyncGetProductHandler());
  };


  const onSearchChangeHandler = (e) => {
    setSearchTerm(e.target.value)
  }
  
  useEffect(() => {
    const handleFilterProduct = () => {
      if (!searchTerm) {
        setFilteredProducts	(...products)
      }
      const filterProducts = products.filter(product=>product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
      setFilteredProducts(filterProducts)
    }
    handleFilterProduct()
   },[searchTerm,products])

  const confirmDeleteHandler = (product) => {
    confirmAlert({
      title: 'Are you sure want to delete this?',
      message:
        "This action cannot be undone and will permanently remove the product from our records. If you wish to proceed, please click the 'Delete' button. Otherwise, click 'Cancel' to return to the previous page.",
      buttons: [
        {
          label: 'Delete',
          onClick: () => deleteProducthandler(product._id),
        },
        {
          label: 'Cancel',
          onClick: '',
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
    });
  };

  const handleQuickView = (product) => {
    
    confirmAlert({
      customUI:({ onClose }) => {
        return (
          <div className='custom-ui'>

            <img src={product.imageUrl.filePath } width="600px" height="600px" alt="content"/>
          </div>
        );
      }
    });
   }


  return (
    <section className='text-gray-600 body-font h-fit'>
      <div className='flex flex-col container px-2 py-10 mx-auto'>
        <div className='flex flex-wrap w-full mb-20'>
          <div className='lg:w-1/2 w-full mb-6 lg:mb-0'>
            <h1 className='sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900'>
              Your Inventory
            </h1>
            <div className='h-1 w-20 bg-red-500 rounded'></div>
          </div>
          <SearchBar searchTerm={searchTerm } onSearchChange={ onSearchChangeHandler} />
        </div>
        <div className='grid grid-cols-1 gap-4 w-full lg:grid-cols-5 px-5 h-fit  mx-auto '>
          {filteredProducts.length === 0 && <h1 className='mx-auto w-full p-8'>No product found</h1> }
          {filteredProducts.map((product) => {
            return (
           
              
                  <div className='bg-gray-100  p-6 rounded-lg mx-auto'  key={product._id}>
                    <img
                      className='h-40 rounded w-full object-cover object-center mb-6'
                      src={product.imageUrl.filePath}
                  alt='content'
                  onClick={()=>handleQuickView(product)}
                    />
                    <h3 className='tracking-widest text-indigo-500 text-xs font-medium title-font'>
                      {product.sku}
                    </h3>
                    <h2 className='text-lg text-gray-900 font-medium title-font mb-4'>
                      {product.name}
                    </h2>
                    <p className='leading-relaxed text-base'>{product.desc}</p>
                    <button
                    type='button '
                    onClick={() => confirmDeleteHandler(product)}
                  >
                    delete
                </button>
         
                <Link to={`/products/${product._id}`}>See the detail</Link>
                </div>
     
       
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
