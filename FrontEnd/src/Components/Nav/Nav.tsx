import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setOpen(false);
  };

  return (
    <div className="bg-white shadow-md py-4 sticky top-0 z-50">
      <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="text-blue-700 font-bold text-xl md:text-2xl hover:text-blue-800">
            Project Pulse
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 items-center">
          <li>
            <Link to="/" className="text-gray-700 hover:text-blue-700 font-medium transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/feature" className="text-gray-700 hover:text-blue-700 font-medium transition">
              Features
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-700 hover:text-blue-700 font-medium transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-700 hover:text-blue-700 font-medium transition">
              Contact
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-700 font-medium transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/users" className="text-gray-700 hover:text-blue-700 font-medium transition">
                  Users
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  className="text-gray-700 hover:text-blue-700 transition"
                  title="Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition font-medium"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link 
                to="/login"
                className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition font-medium"
              >
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            ref={buttonRef}
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Mobile Menu */}
          {open && (
            <div
              id="mobile-menu"
              ref={menuRef}
              className="absolute right-4 top-full mt-2 w-56 bg-white rounded-lg shadow-lg z-50 overflow-hidden border border-gray-200"
            >
              <div className="flex flex-col">
                <Link 
                  to="/" 
                  className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/feature" 
                  className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition border-t"
                  onClick={() => setOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  to="/about" 
                  className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition border-t"
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition border-t"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition border-t"
                      onClick={() => setOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/users" 
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition border-t"
                      onClick={() => setOpen(false)}
                    >
                      Users
                    </Link>
                    <Link 
                      to="/profile" 
                      className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition border-t flex items-center gap-2"
                      onClick={() => setOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="px-4 py-3 text-left text-white bg-blue-700 hover:bg-blue-800 transition border-t font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login"
                    className="px-4 py-3 text-left text-white bg-blue-700 hover:bg-blue-800 transition border-t font-medium"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
