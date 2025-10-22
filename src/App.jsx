import React from "react";
import {Routes, Route} from "react-router-dom"

import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

import HomePage from "./pages/HomePage"
import EventDetailPage from "./pages/EventDetailPage"
import AdminLoginPage from "./pages/AdminLoginPage"
import AdminPanelPage from "./pages/AdminPanelPage"


function App() {

  return (
    <>
    <HeaderComponent/>
    <hr />
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/event/:id" element={<EventDetailPage/>}/>
      <Route path="/admin/login" element={<AdminLoginPage/>}/>
      <Route path="/admin/panel" element={<AdminPanelPage/>}/>
    </Routes>
    <hr />
    <FooterComponent/>
    </>
  )
}

export default App
