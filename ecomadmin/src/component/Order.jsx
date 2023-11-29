import React, { useState, useEffect } from 'react';

export const Order = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [deliveredStatus, setDeliveredStatus] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersResponse = await fetch('http://localhost:3005/allorders');
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);

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

  // Function to handle delivered status
  const handleDelivered = (orderId) => {
    setDeliveredStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: true, // Mark the order as delivered
    }));
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

  return (
    <div>
      <h3>Orders List</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Name</th>
            <th>Address</th>
            <th>Payment Method</th>
            <th>Total</th>
            <th>Products</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              style={{
                backgroundColor: deliveredStatus[order._id] ? 'lightgreen' : 'white',
              }}
            >
              <td>{order._id}</td>
              <td>{getUsernameById(order.userId)}</td>
              <td>{order.address}</td>
              <td>{order.paymentMethod}</td>
              <td>₹ {order.total}</td>
              <td>
                <ul>
                  {order.products.map((product) => (
                    <li key={product._id}>
                      <strong>Product ID:</strong> {product._id},{' '}
                      <strong>Quantity:</strong> {product.quantity}, <strong>Price:</strong> {product.price}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <button onClick={() => handleDelivered(order._id)}>Delivered</button>
                <br />
                <button onClick={() => handleDelete(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
