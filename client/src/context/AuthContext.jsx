import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "admin@ypxstudios.com";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem("ypx-auth");
    return saved === "true";
  });

  const login = async ({ email, password }) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Authentication failed.");
    }

    localStorage.setItem("ypx-auth", "true");
    localStorage.setItem("ypx-token", data.token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("ypx-auth");
    localStorage.removeItem("ypx-token");
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      adminEmail,
    }),
    [isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
