import React from 'react';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className='navdiv'>
      <Link to={'/'}>
        <h3>All Products</h3>
      </Link>
      <Link to={'/admin'}>
        <h3>Add Products</h3>
      </Link>
      <Link to={'/orders'}>
        <h3>Orders</h3>
      </Link>
      <Link to={'/users'}>
        <h3>All Users</h3>
      </Link>
    </div>
  )
}