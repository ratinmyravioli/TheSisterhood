import { useState, useEffect } from 'react'
import './App.css'
import Chatbot from './chatbot';
import { createClient } from '@supabase/supabase-js';

import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Information from "./pages/Information";
import Map from "./pages/Map";
import About from "./pages/About";
import Forum from "./pages/Forum";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

function App() {

  const [post, setPost] = useState([])

  // EXAMPLE QUERY: this block of text just retrieves stuff from the database, does not show it.
  useEffect(() => {
    const fetchPost = async () => {
      const {data, error } = await supabase
      .from('forum_posts')
      .select('id, title, body') // select all columns from database

      if (error) {
        console.log('Error fetching data:', error)
      } else {
        setPost(data)
      }
    }
    fetchPost()
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


      {/* For displaying forum database */}
      <div style={{padding: '2rem'}}> 
        <h1>Forum</h1>
        {post.map((item) => (
          <div key = {item.id} style={{border: '1px solid #ccc', marginBottom: '1rem', padding: '0.5rem'}}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </div>  
      
    <Chatbot />
    </>
    
    )
}

export default App