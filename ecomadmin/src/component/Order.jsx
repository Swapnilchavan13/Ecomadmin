import React, { useState, useEffect } from 'react';
import '../styles/order.css';

export const Order = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [merchants, setMerchants] = useState([]); // New state for merchants
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState(''); // New state for selected business

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders data
        const ordersResponse = await fetch('http://62.72.59.146:3008/allorders');
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);

        // Fetch users data
        const usersResponse = await fetch('http://62.72.59.146:3008/allusers');
        const usersData = await usersResponse.json();
        setUsers(usersData);

        // Fetch merchants data
        const merchantsResponse = await fetch('http://62.72.59.146:3008/allmerchants');
        const merchantsData = await merchantsResponse.json();
        console.log(merchantsData)
        setMerchants(merchantsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getUsernameById = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.username : 'Unknown User';
  };

  const getBusinessNameById = (merchantId) => {
    const merchant = merchants.find((el) => el._id === merchantId);
    return merchant ? merchant.businessName : 'Unknown Business';
  };



  const handleDelete = async (orderId) => {
    try {
      await fetch(`http://62.72.59.146:3008/allorders/${orderId}`, {
        method: 'DELETE',
      });

      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleStatusChange = async (orderId) => {
    try {
      const response = await fetch(`http://62.72.59.146:3008/allorders/${orderId}`);
      const existingOrder = await response.json();

      const newStatus = !existingOrder.status;

      await fetch(`http://62.72.59.146:3008/updateorderstatus/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };


  const filteredOrders = orders
    .filter((order) =>
      getUsernameById(order.userId).toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((order) => selectedBusiness ? order.products.some(product => product.merchantId === selectedBusiness) : true);

  return (
    <div className="orders-container">
      <h3>Orders List</h3>
      <div>
        <label>Search by Username: </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <label>Filter by Business Name: </label>
        <select
          value={selectedBusiness}
          onChange={(e) => setSelectedBusiness(e.target.value)}
        >
          <option value="">All</option>
          {merchants.map((merchant) => (
            <option key={merchant._id} value={merchant._id}>
              {merchant.businessName}
            </option>
          ))}
        </select>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date and Time</th>
            <th>User Name</th>
            <th>Address</th>
            <th>Payment Method</th>
            <th>Total</th>
            <th>Products</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.slice().reverse().map((order) => (
            <tr
              key={order._id}
              className={`order-row-${order.status ? 'true' : 'false'}`}
            >
              <td>{order._id}</td>
              <td>{order.orderdate}</td>
              <td>{getUsernameById(order.userId)}</td>
              <td>{order.address}</td>
              <td>{order.paymentMethod}</td>
              <td>₹ {order.total}</td>
              <td>
                <ul>
                  {order.products.map((product) => (
                    <div className='pdata' key={product._id}>
                      <strong>Product ID:</strong> {product._id},{' '}
                      <br />
                      <strong>Product Name:</strong> {product.productName},{' '}
                      <br />
                      <strong>Quantity:</strong> {product.quantity},
                      <br />
                      <strong>Price:</strong> {product.price}
                      <br />
                      <br />
                      <img width="50px" src={product.productImage} alt="" />
                    </div>
                  ))}
                </ul>
              </td>
              <td>
                <button onClick={() => handleDelete(order._id)}>Delete</button>
                <button onClick={() => handleStatusChange(order._id)}>Delivered</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
