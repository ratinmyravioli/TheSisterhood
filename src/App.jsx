import { useState, useEffect } from 'react'
import './App.css'
import { createClient } from '@supabase/supabase-js';

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
      {/* For displaying else */}
      <div className = "app-background">
        <h1 style ={{ color: '#fdfdfd' }}>Welcome to The Sisterhood</h1>
        <p style ={{ color: '#fdfdfd' }}>Information</p>
        <p style ={{ color: '#fdfdfd' }}>Healthcare Map</p>
      </div>
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
      
      
      
    </>
    
    )
}

export default App