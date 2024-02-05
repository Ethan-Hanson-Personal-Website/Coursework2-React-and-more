import { useState } from 'react'
import Authenticate from './components/Authenticate'
import SignUpSheet from './components/SignUpForm'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
        <Authenticate />
        <SignUpSheet />
            
    </>
  )
}

export default App
