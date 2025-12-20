import { useState } from 'react'
import PostCard from './component/post-card'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ background: "#0b1220" }}>
      < PostCard title="this is a title!" content="some content" />
      This is a page
      <button onClick={() => setCount(count + 1)}> count = {count} </button >
    </div >
  )
}

export default App
