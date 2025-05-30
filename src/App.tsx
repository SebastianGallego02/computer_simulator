import { useState } from 'react'
import './App.css'
import SimulatorPage from './pages/SimulatorPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SimulatorPage />
    </>
  )
}

export default App
