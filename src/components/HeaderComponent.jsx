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

    // Escucha tanto cambios globales como nuestro evento personalizado
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
    window.dispatchEvent(new Event('storageChange')); // 🔔 avisar al header
    navigate('/');
  };

  return (
    <header>
      <div className="header-left" onClick={handleHomeClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 200 200">
          <rect width="200" height="200" fill="black" />
          <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="16" fill="none" />
          <path d="M50,100 Q100,50 150,100" stroke="white" strokeWidth="12" fill="none" />
        </svg>
        <h1>Taller440</h1>
      </div>

      {isAdmin && (
        <div className="header-right">
          <button onClick={handleAdminClick} className="admin-btn">
            ADMIN
          </button>
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
