import './App.css'
import Nav from './Pages/Nav/Nav'
import Hero from './Pages/Heru/Hero'
import Footer from './Pages/Footer/Footer'

function App() {
  return (
    <div className="bg-gradient-to-t from-white-700 to-blue-500 min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}

export default App
