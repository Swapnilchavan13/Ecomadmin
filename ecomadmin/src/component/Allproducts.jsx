import React, { useState, useEffect } from 'react';
import '../styles/allproducts.css'

export const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:3005/allproducts')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

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
      const response = await fetch(`http://localhost:3005/deleteproduct/${productId}`, {
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

  return (
    <>
      <h2 className="product-list-title">All Products</h2>
      <div className="filter-container">
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
        {filteredProducts.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.productimage} alt={product.productname} className="product-image" />
            <div className="product-details">
              <p className="product-name">Name: {product.productname}</p>
              <p className="product-info">Type: {product.producttype}</p>
              <p className="product-info">Price: Rs.{product.productprice}</p>
              <p className="product-info">Discount: {product.productdiscount}%</p>
              <p className="product-info">Quantity: {product.productquantity || 'N/A'}</p>
              <button className="delete-button" onClick={() => handleDelete(product._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};