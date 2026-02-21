import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className = "app-background">
        <h1 style ={{ color: '#fdfdfd' }}>Welcome to The Sisterhood</h1>
        <p style ={{ color: '#fdfdfd' }}>Information</p>
        <p style ={{ color: '#fdfdfd' }}>Healthcare Map</p>
        </div>
    </>
  )
}

export default App
