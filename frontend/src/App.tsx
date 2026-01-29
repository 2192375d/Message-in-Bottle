// import { useState } from 'react'
import './App.css'
import PostMaker from './component/PostMaker'
import AppRoutes from './routes/AppRoutes'

function App() {
  // const [count, setCount] = useState(0)

  return (

    <div style={{
      display: "flex"
    }}>
      <PostMaker />

      <AppRoutes />
    </div>
  )
}

export default App
