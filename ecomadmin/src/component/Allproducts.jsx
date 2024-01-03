import React, { useState, useEffect } from 'react';
import '../styles/allproducts.css';

export const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [merchantNames, setMerchantNames] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState('All');

  useEffect(() => {
    // Fetch data for merchant names from the API
    fetch('http://62.72.59.146:3008/allmerchants')
      .then(response => response.json())
      .then(data => setMerchantNames(data))
      .catch(error => console.error('Error fetching merchant names:', error));
  }, []);

  useEffect(() => {
    fetch(selectedMerchant === 'All' ? 'http://62.72.59.146:3008/allproducts' : `http://62.72.59.146:3008/allproducts/${selectedMerchant}`)
      .then(response => response.json())
      .then(data => {
        // Check if the response is an array, otherwise set an empty array
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setProducts([]); // Set to empty array in case of error
      });
  }, [selectedMerchant]);
  

  useEffect(() => {
    // Apply filtering when the selected type changes
    if (selectedType === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.producttype === selectedType));
    }
  }, [selectedType, products]);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://62.72.59.146:3008/deleteproduct/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the state to remove the deleted product
        setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        console.log('Product deleted successfully');
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


   // New function to handle toggling 'blok' status
   const handleToggleBlok = async (productId, currentBlokStatus) => {
    try {
      // Make a PATCH request to update 'block' status
      const response = await fetch(`http://62.72.59.146:3008/updateproductblock/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productblock: !currentBlokStatus }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the state to reflect the changes
      setFilteredProducts(filteredProducts.map(product => 
        product._id === productId ? { ...product, productblock: !currentBlokStatus } : product
      ));
    } catch (error) {
      console.error('Error updating product block status:', error);
    }
  };


  return (
    <>
      <h2 className="product-list-title">All Products</h2>
      <div className="filter-container">
        <label htmlFor="merchantFilter">Filter by Merchant:</label>
        <select
          id="merchantFilter"
          value={selectedMerchant}
          onChange={(e) => setSelectedMerchant(e.target.value)}
        >
          <option value="All">All Merchants</option>
          {merchantNames.map(merchant => (
            <option key={merchant._id} value={merchant._id}>
              {merchant.businessName}
            </option>
          ))}
        </select>
  
        <label htmlFor="productTypeFilter">Filter by Type:</label>
        <select
          id="productTypeFilter"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Toys">Toys</option>
          <option value="Furniture">Furniture</option>
          <option value="Other">Other</option>
          {/* Add more options based on your product types */}
        </select>
      </div>
      <div className="product-list-container">
        {filteredProducts.length === 0 ? (
          <p className="no-products-message">No products added for the selected merchant.</p>
        ) : (
          filteredProducts.map(product => (
            <div key={product._id} className="product-card" style={{ backgroundColor: product.productblock ? '#f68585' : 'white' }}>
              <img src={product.image_one} alt={product.productname} className="product-image" />
              <div className="product-details">
                <p className="product-name">Name: {product.productname}</p>
                <p className="product-info">Type: {product.producttype}</p>
                <p className="product-info">Price: Rs.{product.productprice}</p>
                <p className="product-info">Discount: {product.productdiscount}%</p>
                <p className="product-info">Quantity: {product.productquantity || 'N/A'}</p>
                <button className="delete-button" onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
  
                <p className="product-blok">Status: {product.productblock ? 'Blocked' : 'Unblocked'}</p>
                <button
                  className="toggle-blok-button"
                  onClick={() => handleToggleBlok(product._id, product.productblock)}
                >
                  Toggle Block
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}  
