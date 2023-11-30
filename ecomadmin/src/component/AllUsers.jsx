import React, { useEffect, useState } from 'react';
import '../styles/allusers.css'

export const AllUsers = () => {
    const [userdata, setUserdata] = useState([])

    useEffect(() => {
        fetch('http://localhost:3005/userdata')
        .then(res => res.json())
        .then(data => setUserdata(data))
        .catch(error => console.error('Error Fetching User Data', error))
    }, [])

  return (
    <div>
        <h1>All Users</h1>
        <div className='userdiv'>
        {userdata.map(el => 
        <div className='allusers'>
            <h3>Name: {el.username}</h3>
            <h4>Mobile: {el.usernumber}</h4>
            <h4>Address: {el.useraddress}</h4>
        </div>
        )}
        </div>       
    </div>
  )
}
