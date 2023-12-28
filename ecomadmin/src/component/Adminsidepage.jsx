import React, { useState } from 'react';
import '../styles/adminsidepage.css';

export const Adminsidepage = () => {

  const [formData, setFormData] = useState({
    image_one: null,
    image_two: null,
    image_three: null,
    image_four: null,
    image_five: null,
    video_one: null,
    video_two: null,
    video_three: null,
    video_four: null,
    video_five: null,
  });

  const handleFileChange = (event, field) => {
    const file = event.target.files[0];
    setFormData({ ...formData, [field]: file });
  };

  const handleSubmitimg = async (event) => {
    event.preventDefault();
    const apiUrl = 'http://62.72.59.146:8001/productimage/';

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // Handle the response as needed
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

 








  
  const [productData, setProductData] = useState({
    mercahntid: 'adminupload',
    producttype: '',
    productname: '',
    productimage: '',
    productprice: '',
    productdiscount: '',
    productquantity: '',
    productdescription: '',
    productdeliveryDate: '',
    productoffer: '',
    productblock: false,

    brand: '', // for Electronics
    storage: '', // for Electronics
    operatingSystem: '', // for Electronics
    cellularTechnology: '', // for Electronics
    size: '', // for Clothing and Shoes
    color: '', // for Clothing, Cosmetics, Shoes
    material: '', // for Clothing, Furniture
  });

  const productTypes = ['Electronics', 'Clothing', 'Toys', 'Cosmetics', 'Shoes', 'Other'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setProductData({
      ...productData,
      [name]: newValue,
    });
  };

  const renderAdditionalFields = () => {
    switch (productData.producttype) {
      case 'Electronics':
        return (
          <>
            <label className="form-label">
              Brand:
                className="form-input"
                type="text"
                name="brand"
                value={productData.brand}
              Cellular Technology:
                onChange={handleChange}
              <input
              />
            </label>
            <label className="form-label">
              Storage:
              <input
                className="form-input"
                type="text"
                name="storage"
                value={productData.storage}
                onChange={handleChange}
              />
            </label>
            <label className="form-label">
              Operating System:
              <input
                className="form-input"
                type="text"
                name="operatingSystem"
                value={productData.operatingSystem}
                onChange={handleChange}
              />
            </label>
            <label className="form-label">
              <input
                className="form-input"
                type="text"
                name="cellularTechnology"
                value={productData.cellularTechnology}
                onChange={handleChange}
              />
            </label>
          </>
        );
      case 'Clothing':
      case 'Shoes':
        return (
          <>
            <label className="form-label">
              Size:
              <input
                className="form-input"
                type="text"
                name="size"
                value={productData.size}
                onChange={handleChange}
              />
            </label>
            <label className="form-label">
              Color:
              <input
                className="form-input"
                type="text"
                name="color"
                value={productData.color}
                onChange={handleChange}
              />
            </label>
            {/* Add more fields specific to Clothing and Shoes */}
          </>
        );
      case 'Cosmetics':
        return (
          <>
            <label className="form-label">
              Color:
              <input
                className="form-input"
                type="text"
                name="color"
                value={productData.color}
                onChange={handleChange}
              />
            </label>
            {/* Add more fields specific to Cosmetics */}
          </>
        );
      case 'Furniture':
        return (
          <>
            <label className="form-label">
              Material:
              <input
                className="form-input"
                type="text"
                name="material"
                value={productData.material}
                onChange={handleChange}
              />
            </label>
          </>
        );
      default:
        return null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3008/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Product added successfully');
        // Optionally, you can redirect or update state here

        setProductData({
          mercahntid: 'adminupload',
          producttype: '',
          productname: '',
          productimage: '',
          productprice: '',
          productdiscount: '',
          productquantity: '',
          
          productdescription: '',
          productdeliveryDate: '',
          productoffer: '',
          productblock: false,
        });

      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="form-title">Add Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Product Type:
          <select
            className="form-input"
            name="producttype"
            value={productData.producttype}
            onChange={handleChange}
          >
            <option value="" disabled>Select a product type</option>
            {productTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>

        <label className="form-label">
          Product Name:
          <input
            className="form-input"
            placeholder="Enter Product Name"
            type="text"
            name="productname"
            value={productData.productname}
            onChange={handleChange}
          />
        </label>



        <div>
      <h1>Upload Data</h1>
      {/* Image uploads */}
      <h2>Images of Products</h2>
      <input type="file" onChange={(e) => handleFileChange(e, 'image_one')} />
      <input type="file" onChange={(e) => handleFileChange(e, 'image_two')} />
      <input type="file" onChange={(e) => handleFileChange(e, 'image_three')} />
      <input type="file" onChange={(e) => handleFileChange(e, 'image_four')} />
      <input type="file" onChange={(e) => handleFileChange(e, 'image_five')} />


      {/* Repeat the above line for other image file inputs */}

      <h2>Video of Products</h2>
      {/* Video uploads */}
      <input type="file" onChange={(e) => handleFileChange(e, 'video_one')} />
      <input type="file" onChange={(e) => handleFileChange(e, 'video_two')} />
      <input type="file" onChange={(e) => handleFileChange(e, 'video_three')} />
      <input type="file" onChange={(e) => handleFileChange(e, 'video_four')} />
      <input type="file" onChange={(e) => handleFileChange(e, 'video_five')} />

      {/* Repeat the above line for other video file inputs */}
      
      <button onClick={handleSubmitimg}>Upload Data</button>
    </div>




     

        <label className="form-label">
          Product Image:
          <input
            className="form-input"
            placeholder="Enter Product Image"
            type="text"
            name="productimage"
            value={productData.productimage}
            onChange={handleChange}
          />
        </label>

        <label className="form-label">
          Product Price:
          <input
            className="form-input"
            placeholder="Enter Product Price"
            type="text"
            name="productprice"
            value={productData.productprice}
            onChange={handleChange}
          />
        </label>

        <label className="form-label">
          Product Discount:
          <input
            className="form-input"
            placeholder="Enter Product Discount"
            type="text"
            name="productdiscount"
            value={productData.productdiscount}
            onChange={handleChange}
          />
        </label>

        <label className="form-label">
          Product Quantity:
          <input
            className="form-input"
            placeholder="Enter Product Quantity"
            type="text"
            name="productquantity"
            value={productData.productquantity}
            onChange={handleChange}
          />
        </label>

        <label className="form-label">
          Description:
          <textarea
            className="form-input"
            placeholder="Enter Product Description"
            name="productdescription"
            value={productData.productdescription}
            onChange={handleChange}
          />
        </label>

        <label className="form-label">
          Delivery Date:
          <input
            className="form-input"
            type="number"
            name="productdeliveryDate"
            placeholder='Delivery in Days'
            value={productData.productdeliveryDate}
            onChange={handleChange}
          />
        </label>

        <label className="form-label">
          Offer:
          <input
            className="form-input"
            placeholder="Enter Product Offer"
            type="text"
            name="productoffer"
            value={productData.productoffer}
            onChange={handleChange}
          />
        </label>


        {renderAdditionalFields()}

        <button className="form-button" type="submit">Add Product</button>
      </form>
    </div>
  );
};