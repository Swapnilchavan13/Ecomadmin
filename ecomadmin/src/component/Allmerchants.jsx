// Allmerchants.jsx

import React, { useState, useEffect } from 'react';
import '../styles/allmerchants.css'; // Import the SCSS file

export const Allmerchants = () => {
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await fetch('http://localhost:3008/allmerchants');
        const merchantsData = await response.json();
        setMerchants(merchantsData);
      } catch (error) {
        console.error('Error fetching merchants:', error);
      }
    };

    fetchMerchants();
  }, []);

  const handleDelete = async (merchantId) => {
    try {
      await fetch(`http://localhost:3008/allmerchants/${merchantId}`, {
        method: 'DELETE',
      });

      // Update the merchant list after deletion
      const updatedMerchants = merchants.filter((merchant) => merchant._id !== merchantId);
      setMerchants(updatedMerchants);
    } catch (error) {
      console.error('Error deleting merchant:', error);
    }
  };

  return (
    <>
      <h1>All Merchants</h1>
      <div className="all-merchants-container">
        {merchants.map((merchant) => (
          <div key={merchant._id} className="merchant-details">
            <h5>Business Name: {merchant.businessName}</h5>
            <p>Business Type: {merchant.businessType}</p>
            <p>Location: {merchant.loaction}</p>
            <p>Business Address: {merchant.businessAddress}</p>
            <p>Business Phone: {merchant.businessPhone}</p>
            <p>Business Email: {merchant.businessEmail}</p>
            <p>Owner Name: {merchant.ownerName}</p>
            <p>Owner Phone: {merchant.ownerPhone}</p>
            <button className="delete-button" onClick={() => handleDelete(merchant._id)}>
              Delete
            </button>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};
