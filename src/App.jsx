import { useState, useEffect } from 'react'
import './App.css'
import { createClient } from '@supabase/supabase-js';

import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Information from "./pages/Information";
import Map from "./pages/Map";
import About from "./pages/About";

import homeImg from "./assets/homeImage.png";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

function App() {

  const [data, setData] = useState([])

  // EXAMPLE QUERY: this block of text just retrieves stuff from the database, does not show it.
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
      .from('categories')
      .select('name, description') // select all columns from database

      if (error) {
        console.log('Error fetching data:', error)
      } else {
        setData(data)
      }
    }
    fetchData()
  }, [])

  return (
    <>
    <div className="app-container">
      {/* testing nav bar */}
      <nav className="navbar">
        <h2 className="logo">The Sisterhood</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/information">Information</Link>
          <Link to="/map">Map</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/information" element={<Information />} />
        <Route path="/map" element={<Map />} />
        <Route path="/about" element={<About />} />
      </Routes>



      {/* For displaying else */}
      <div className = "app-background">
        <div className="home-box">
          <div className="home-text">
            <h1>Welcome to The Sisterhood</h1>
            <p>Testing</p>
            <p>Healthcare Map</p>
            <button className="home-button">Get Started</button>
          </div>
          <img src={homeImg} alt="" className="home-image"/>
        </div>
      </div>
      {/* For displaying database */}
      <div style={{padding: '2rem'}}> 
        <h1>Data</h1>
        {data.map((item) => (
          <div key = {item.id} style={{border: '1px solid #ccc', marginBottom: '1rem', padding: '0.5rem'}}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>  
      
      
    </>
    
    )
}

export default App