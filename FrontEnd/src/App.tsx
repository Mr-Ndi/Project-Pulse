import './App.css'
import Hero from './Pages/Heru/Hero'
import { Route, Routes } from 'react-router-dom'
import Feature from './Pages/Features/Feature'
import Dashboard from './Pages/Dashboard/Dashboard'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Profile from './Pages/Profile/Profile'
import Contact from './Pages/Contact/Contact'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/feature" element={<Feature />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/contact" element={<Contact/>} />
    </Routes>
  )
}

export default App
