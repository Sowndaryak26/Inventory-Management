import { useEffect } from "react";
import Login from "../components/Login";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const {
    login,
    isLoading,
    error,
    isAuthenticated,
  } = useAuth();

  // Login successful ஆனதும் App-ஐ refresh செய்து
  // Inventory Dashboard-க்கு செல்லும்
  useEffect(() => {
    if (isAuthenticated) {
      window.location.reload();
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <Login
        onLogin={login}
        isLoading={isLoading}
        error={error}
      />

    </div>
  );
};

export default LoginPage;