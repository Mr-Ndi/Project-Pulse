import './App.css'
import Hero from './Pages/Heru/Hero'
import { Route, Routes, Navigate } from 'react-router-dom'
import Feature from './Pages/Features/Feature'
import Dashboard from './Pages/Dashboard/Dashboard'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Profile from './Pages/Profile/Profile'
import Contact from './Pages/Contact/Contact'
import { createContext, useContext, useState, useEffect } from 'react'

// Simple Auth Context
const AuthContext = createContext({
  isAuthenticated: false,
  login: (token: string) => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage for token
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/feature" element={<Feature />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
