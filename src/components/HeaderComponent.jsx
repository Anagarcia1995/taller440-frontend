import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';

const HeaderComponent = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('adminToken'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdmin(!!localStorage.getItem('adminToken'));
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('storageChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storageChange', handleStorageChange);
    };
  }, []);

  const handleHomeClick = () => navigate('/');
  const handleAdminClick = () => navigate('/admin/panel');
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.dispatchEvent(new Event('storageChange'));
    navigate('/');
  };

  return (
    <header>
      {/* Logo + Nombre */}
      <div className="header-left" onClick={handleHomeClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 200 200">
          <rect width="200" height="200" fill="black" />
          <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="16" fill="none" />
          <path d="M50,100 Q100,50 150,100" stroke="white" strokeWidth="12" fill="none" />
        </svg>
        <h1>Taller440</h1>
      </div>

      {/* Botones admin + logout */}
      {isAdmin && (
        <div className="header-right">
          {/* ADMIN como <p> */}
          <p
            className="admin-text"
            onClick={handleAdminClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleAdminClick()}
          >
            ADMIN
          </p>

          {/* Logout */}
          <button onClick={handleLogout} className="logout" title="Cerrar sesión">
            <img
              src="https://img.icons8.com/?size=100&id=2445&format=png&color=FFFFFF"
              alt="logout"
              className="logout-icon"
            />
          </button>
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;
