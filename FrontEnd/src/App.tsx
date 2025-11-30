import './App.css'
import Nav from './components/Nav/Nav'
import Hero from './components/Heru/Hero'
import Footer from './components/Footer/Footer'

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
