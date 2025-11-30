import './App.css'
import Hero from './Pages/Heru/Hero'
import { Route, Routes } from 'react-router-dom'
import Feature from './Pages/Features/Feature'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/feature" element={<Feature />} />
    </Routes>
  )
}

export default App
