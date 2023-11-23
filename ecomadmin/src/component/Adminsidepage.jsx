import React, { useState } from 'react';
import '../styles/adminsidepage.css';

export const Adminsidepage = () => {
  const [productData, setProductData] = useState({
    producttype: '',
    productname: '',
    productimage: '',
    productprice: '',
    productdiscount: '',
    productquantity: '',
  });

  const productTypes = ['Electronics', 'Clothing', 'Books', 'Toys', 'Furniture', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3005/addproduct', {
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
            producttype: '',
            productname: '',
            productimage: '',
            productprice: '',
            productdiscount: '',
            productquantity: '',
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
            type="text"
            name="productquantity"
            value={productData.productquantity}
            onChange={handleChange}
          />
        </label>

        <button className="form-button" type="submit">Add Product</button>
      </form>
    </div>
  );
};
