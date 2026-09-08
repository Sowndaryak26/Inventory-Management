import { useState } from "react";
import { loginApi } from "../services/authApi";

const AUTH_TOKEN_KEY = "inventory_auth_token";
const USERNAME_KEY = "inventory_username";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem(AUTH_TOKEN_KEY));
  });

  const login = async (
    username: string,
    password: string
  ): Promise<void> => {
    setIsLoading(true);
    setError("");

    try {
      const response = await loginApi(username, password);

      if (!response.success || !response.token) {
        setError(response.message || "Login failed");
        return;
      }

      localStorage.setItem(AUTH_TOKEN_KEY, response.token);
      localStorage.setItem(
        USERNAME_KEY,
        response.username || username
      );

      setIsAuthenticated(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);

    setIsAuthenticated(false);
    setError("");
  };

  const username = localStorage.getItem(USERNAME_KEY);

  return {
    isAuthenticated,
    isLoading,
    error,
    username,
    login,
    logout,
  };
};