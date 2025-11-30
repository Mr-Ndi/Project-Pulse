import './App.css'
import Hero from './Pages/Heru/Hero'
import { Route, Routes } from 'react-router-dom'
import Feature from './Pages/Features/Feature'
import Dashboard from './Pages/Dashboard/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/feature" element={<Feature />} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  )
}

export default App
