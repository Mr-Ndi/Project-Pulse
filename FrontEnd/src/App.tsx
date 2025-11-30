import './App.css'
import Hero from './Pages/Heru/Hero'
import { Route, Routes } from 'react-router-dom'
import Feature from './Pages/Features/Feature'
import Dashboard from './Pages/Dashboard/Dashboard'
import Login from './Pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/feature" element={<Feature />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  )
}

export default App
