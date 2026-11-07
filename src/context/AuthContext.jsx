
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { apiRequest } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore logged-in user when application opens
  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("mindease_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await apiRequest("/auth/me");
        setUser(response.user);
      } catch (error) {
        console.error("Session restoration failed:", error);
        localStorage.removeItem("mindease_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  // Register a new user
  const register = async (name, email, password) => {
    const response = await apiRequest("/auth/register", {
      method: "POST",
      body: { name, email, password },
    });

    localStorage.setItem("mindease_token", response.token);
    setUser(response.user);

    return response;
  };

  // Login an existing user
  const login = async (email, password) => {
    const response = await apiRequest("/auth/login", {
      method: "POST",
      body: { email, password },
    });

    localStorage.setItem("mindease_token", response.token);
    setUser(response.user);

    return response;
  };

  // Update user information throughout the application
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("mindease_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
