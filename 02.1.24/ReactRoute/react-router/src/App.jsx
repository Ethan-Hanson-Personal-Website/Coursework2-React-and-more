import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import pages from './components/pages'
import Home from './components/home'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div id="container">
        <h1>Hello React Router!</h1>
        <div id="navbar">
          <Link to="/blue">Blue</Link>
          <Link to="/">Home</Link>
          <Link to="/red">Red</Link>
        </div>
        <div id="main-section">
          <Routes>
            <Route path="/blue" element={<pages.Blue />} />
            <Route path="/" element={<Home />} />
            <Route path="/red" element={<pages.Red />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
