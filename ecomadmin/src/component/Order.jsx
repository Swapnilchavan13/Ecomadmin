import React, { useState, useEffect } from 'react';
import '../styles/order.css';

export const Order = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch orders data
        const ordersResponse = await fetch('http://localhost:3005/allorders');
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);

        // Fetch users data
        const usersResponse = await fetch('http://localhost:3005/allusers');
        const usersData = await usersResponse.json();
        setUsers(usersData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOrders();
  }, []);

  // Function to get username based on userId
  const getUsernameById = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.username : 'Unknown User';
  };

  // Function to delete an order
  const handleDelete = async (orderId) => {
    try {
      // Make a DELETE request to your API endpoint for deleting orders
      await fetch(`http://localhost:3005/allorders/${orderId}`, {
        method: 'DELETE',
      });

      // Update the local state to remove the deleted order
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  // Filter orders based on search term
  const filteredOrders = orders.filter((order) =>
    getUsernameById(order.userId).toLowerCase().includes(searchTerm.toLowerCase())
  );
 

// Function to update order status
const handleStatusChange = async (orderId) => {
  try {
    // Fetch the current order to get its existing status
    const response = await fetch(`http://localhost:3005/allorders/${orderId}`);
    const existingOrder = await response.json();

    // Toggle the status (true to false or false to true)
    const newStatus = !existingOrder.status;

    console.log(newStatus);

    // Make a PATCH request to your API endpoint for updating order status
    await fetch(`http://localhost:3005/updateorderstatus/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    // Update the local state to reflect the updated status
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );

  } catch (error) {
    console.error('Error updating order status:', error);
  }
};

   
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
            <tr key={order._id} className={`order-row-${order.status ? 'true' : 'false'}`}
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
