import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    try {
      const response = await fetch(
        "http://localhost:3000/profile",
        {
          credentials: "include"
        }
      );

      if (!response.ok) {
        setUser(null);
        return null;
      }

      const data = await response.json();
      setUser(data);
      return data;

    } catch (error) {
      setUser(null);
      return null;
    }
  }

  useEffect(() => {
    async function checkAuth() {
      await refreshUser();
      setLoading(false);
    }

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}