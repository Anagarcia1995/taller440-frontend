import React from "react";
import { Routes, Route } from "react-router-dom";

import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

import HomePage from "./pages/HomePage";
import EventDetailPage from "./pages/EventDetailPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import CheckoutPage from "./pages/ckeckoutPage";


import './styles/global.css';
import './styles/typography.css';
import './styles/forms.css';
import './styles/layout.css';


function App() {
  return (
    <div className="app-container">
      <HeaderComponent />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/panel" element={<AdminPanelPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
        </Routes>
      </div>

      <FooterComponent />
    </div>
  );
}

export default App;
