import { useState } from 'react'
import Authenticate from './components/Authenticate'
import SignUpSheet from './components/SignUpForm'
import './App.css'

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
        <Authenticate token={token} setToken={setToken}/>
        <SignUpSheet token={token} setToken={setToken}/>
            
    </>
  )
}

export default App
