import React from 'react';
import {useNavigate} from 'react-router-dom';

const HeaderComponent = () => {
  const navigate = useNavigate();

  const isAdmin = !!localStorage.getItem('adminToken');

  const handleAdminClick = () => {
    navigate('/admin/panel')
  }

  const handleHomeClick = () => {
    navigate('/')
  }


  return (
      <header>
        <h1 onClick={handleHomeClick}>Taller 440</h1>

        {isAdmin && (
          <button
          onClick={handleAdminClick}>
            ADMIN
          </button>
        )}
      </header>
  );
};

export default HeaderComponent