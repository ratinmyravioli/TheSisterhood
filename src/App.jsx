import { useState } from 'react'
import './App.css'
import Chatbot from './chatbot';

import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Information from "./pages/Information";
import Map from "./pages/Map";
import About from "./pages/About";
import Forum from "./pages/Forum";

import logo from "./assets/sisterhood.png";


function App() {
  const gradientStyle = {
    backgroundImage: 'linear-gradient(to top, #ffffff, #fde6e6',
    minHeight: '100vh',
  };

  return (
    <>
    <div className="app-container" style={gradientStyle}>
      {/* testing nav bar */}
      <nav className="navbar">
        <div className="logo-wrap">
          <img src={logo} className="logo-img" />
          <h2 className="logo">The Sisterhood</h2>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/information">Information</Link>
          <Link to="/map">Map</Link>
          <Link to="/forum">Forum</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/information" element={<Information />} />
        <Route path="/map" element={<Map />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/about" element={<About />} />
      </Routes>


      
    </div>  
      
    <Chatbot />
    </>
    
    )
}

export default App