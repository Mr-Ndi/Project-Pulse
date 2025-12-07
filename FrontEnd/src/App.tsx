import './App.css'
import Hero from './Pages/Heru/Hero'
import { Route, Routes, Navigate } from 'react-router-dom'
import Feature from './Pages/Features/Feature'
import Dashboard from './Pages/Dashboard/Dashboard'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Profile from './Pages/Profile/Profile'
import Contact from './Pages/Contact/Contact'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/feature" element={<Feature />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
