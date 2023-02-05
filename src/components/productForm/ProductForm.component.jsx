import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div>
      <form onSubmit={saveProduct}>
        <input
          type='file'
          name='image'
              
          onChange={(e) => handleImageChange(e)}
        />

        {imagePreview !== null ? (
          <div>
            <img src={imagePreview} alt='product' />
          </div>
        ) : (
          <p>No image set for this proudct</p>
              )}
              
              <input type="text" name="name" value={product.name } placeholder="Product Name" onChange={handleInputChange}/>
              <input type="text" name="category" value={product.category } placeholder="Product Category" onChange={handleInputChange}/>
              <input type="text" name="price" value={product.price } placeholder="Product Price" onChange={handleInputChange}/>
              <input type="text" name="quantity" value={product.quantity } placeholder="Product Quantity" onChange={handleInputChange}/>
              <ReactQuill theme="snow" value={description} onChange={setDescription} />
              <button type="submit"> save Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
