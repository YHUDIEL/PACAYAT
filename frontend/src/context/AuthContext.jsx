import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as apiLogin } from '../api/auth.api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('pacayat_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  const login = useCallback(async (username, password, rol) => {
    const { data } = await apiLogin(username, password, rol);
    const { token: jwt, usuario } = data;
    localStorage.setItem('pacayat_token', jwt);
    localStorage.setItem('pacayat_user', JSON.stringify(usuario));
    setUser(usuario);
    return usuario;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('pacayat_token');
    localStorage.removeItem('pacayat_user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}

export default AuthContext;
