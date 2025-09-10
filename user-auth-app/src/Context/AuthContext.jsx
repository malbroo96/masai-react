import { createContext, useState } from "react";

// Create authentication context
export const AuthContext = createContext();

// Provider to wrap app and provide auth state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default: logged out

  // Toggle login/logout
  const toggleAuth = () => setIsLoggedIn(prev => !prev);

  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
