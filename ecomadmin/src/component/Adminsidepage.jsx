import React, { useState } from 'react';
import '../styles/adminsidepage.css';

export const Adminsidepage = () => {
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
              <input
                className="form-input"
                type="text"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
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
              Cellular Technology:
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
            {/* Add more fields specific to Furniture */}
          </>
        );
      // Add cases for other product types as needed
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