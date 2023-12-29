import React, { useEffect, useState } from 'react';
import '../styles/adminsidepage.css';

export const Adminsidepage = () => {

  const [uploadCompleted, setUploadCompleted] = useState(false);

  useEffect(() => {
    const uploadStatus = localStorage.getItem('uploadCompleted') === 'true';
    setUploadCompleted(uploadStatus);
  }, []);


  const [formData, setFormData] = useState({
    image_one: '',
    image_two: '',
    image_three: '',
    image_four: '',
    image_five: '',
    video_one: '',
    video_two: '',
    video_three: '',
    video_four: '',
    video_five: '',
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

      const data = await response.json();

if (response.ok) {
  console.log(data);
  localStorage.setItem('uploadedData', JSON.stringify(data));
  alert("Product Images Added")
  
  localStorage.setItem('uploadCompleted', 'true'); // Save upload status to local storage
  window.location.reload();

} else {
  console.error('Error response from server:', data);
  alert("Product Images Not uploaded Refresh the page")
}

if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
}

    } catch (error) {
      console.error('Error uploading data:', error);
    }

  };

  const renderImagePreview = (imageField) => {
    if (formData[imageField]) {
      return <img src={URL.createObjectURL(formData[imageField])} alt="Preview" width="100" />;
    }
    return null;
  };

  const storedData = localStorage.getItem('uploadedData') || [];
  const allimgnvid = JSON.parse(storedData);
  console.log(allimgnvid.image_one);
  
  const [productData, setProductData] = useState({
    mercahntid: 'adminupload',
    producttype: '',
    productname: '',
    image_one: allimgnvid.image_one,
    image_two: allimgnvid.image_two,
    image_three: allimgnvid.image_three,
    image_four: allimgnvid.image_four,
    image_five: allimgnvid.image_five,
    video_one: allimgnvid.video_one,
    video_two: allimgnvid.video_two,
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

          image_one: allimgnvid.image_one,
          image_two: allimgnvid.image_two,
          image_three: allimgnvid.image_three,
          image_four: allimgnvid.image_four,
          image_five: allimgnvid.image_five,
          video_one: allimgnvid.video_one,
          video_two: allimgnvid.video_two,
          
          productdescription: '',
          productdeliveryDate: '',
          productoffer: '',
          productblock: false,
        });

        localStorage.setItem('uploadCompleted', 'false'); // Reset upload status to local storage
        setUploadCompleted(false);
        window.location.reload();

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

      <div>
      <h1>Upload Data</h1>
      <h2>Images of Products</h2>
      <input type="file" onChange={(e) => handleFileChange(e, 'image_one')} />
      {renderImagePreview('image_one')}
      <br />

      <input type="file" onChange={(e) => handleFileChange(e, 'image_two')} />
      {renderImagePreview('image_two')}
      <br />


      <input type="file" onChange={(e) => handleFileChange(e, 'image_three')} />
      {renderImagePreview('image_three')}
      <br />


      <input type="file" onChange={(e) => handleFileChange(e, 'image_four')} />
      {renderImagePreview('image_four')}
      <br />

      <input type="file" onChange={(e) => handleFileChange(e, 'image_five')} />
      {renderImagePreview('image_five')}
      <br />

      <h2>Videos of Products</h2>
      <input type="file" onChange={(e) => handleFileChange(e, 'video_one')} />
      <br />

      <input type="file" onChange={(e) => handleFileChange(e, 'video_two')} />
      <br />

      {/* <input type="file" onChange={(e) => handleFileChange(e, 'video_three')} /> */}
      {/* <input type="file" onChange={(e) => handleFileChange(e, 'video_four')} /> */}
      {/* <input type="file" onChange={(e) => handleFileChange(e, 'video_five')} /> */}

      <button onClick={handleSubmitimg}>Upload Data</button>
    </div>


    {uploadCompleted && (

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
          )}

    </div>
  );
};