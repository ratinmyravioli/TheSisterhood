import { useState, useEffect } from 'react'
import './App.css'
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

function App() {

  const [data, setData] = useState([])

  // EXAMPLE QUERY
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
      <div style={{padding: '2rem'}}>
        <h1>Data</h1>
        {data.map((item) => (
          <div key = {item.id} style={{border: '1px solid #ccc', marginBottom: '1rem', padding: '0.5rem'}}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <div className = "app-background">
        <h1 style ={{ color: '#fdfdfd' }}>Welcome to The Sisterhood</h1>
        <p style ={{ color: '#fdfdfd' }}>Information</p>
        <p style ={{ color: '#fdfdfd' }}>Healthcare Map</p>
      </div>
      
      
    </>
    
    )
}

export default App