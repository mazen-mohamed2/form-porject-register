// import React from 'react';
import TableComponent from '../../components/common/TableComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserTable = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Assuming you store your token in localStorage
      const token = localStorage.getItem('token');
      
      await axios.post('http://192.168.1.46:8000/api/dashboard/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Clear user token and other relevant details from localStorage
      localStorage.removeItem('token');
      localStorage.setItem('isLoggedIn', 'false');

      // Navigate to login page or home page after logout
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
      // Handle logout error (e.g., display an error message)
    }
  };

  // Render the TableComponent with the columns and data
  return (
    <div className='mt-5'>
         <button onClick={handleLogout} className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
      Logout
    </button>
      {/* <h1>My Data Table</h1> */}
      <TableComponent  />
    </div>
  );
};

export default UserTable;
