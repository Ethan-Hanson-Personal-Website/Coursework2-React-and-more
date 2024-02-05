import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  return (
    <>
      <div>
       <Navbar user={user}>
        <main>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/registration" element={<h1>Registration</h1>} />
          <Route path="/profilepage" element={<h1>Profile Page</h1>} />
        </Routes>
        </main>
        </Navbar>
      </div>
    </>
  )
}

export default App
