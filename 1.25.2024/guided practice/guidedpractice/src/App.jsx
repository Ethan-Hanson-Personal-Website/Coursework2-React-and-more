import { useState, useEffect } from 'react'
import "./app.css";

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("hello from useEffect")
  }, [count]);
  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>Count is</button>
    </>
  );
}