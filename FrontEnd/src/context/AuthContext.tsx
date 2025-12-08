import { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Re-export for use in hooks
export { AuthContext };
export type { AuthContextType };

// Helper function to decode JWT and check role
function checkAdminRole(token: string): boolean {
  try {
    if (!token) return false;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const decoded = JSON.parse(jsonPayload);

    // Check for 'roles' or 'role'
    const role = decoded.roles || decoded.role;
    if (!role) return false;

    const normalizedRole = String(role).toLowerCase();
    // Handle "admin", "UserRole.ADMIN", "ADMIN", etc.
    return normalizedRole === 'admin' || normalizedRole.includes('admin');
  } catch {
    return false;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Initialize from localStorage on mount
    const token = localStorage.getItem('token');
    queueMicrotask(() => {
      if (token) {
        setIsAuthenticated(true);
        setIsAdmin(checkAdminRole(token));
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
      setIsLoading(false);
    });
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setIsAdmin(checkAdminRole(token));
  };
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
