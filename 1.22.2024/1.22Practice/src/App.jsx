import { useState } from 'react'
import './Button'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Button count={count} setCount={setCount} />
      </div>
  );
}





export default App
