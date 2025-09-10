import { createContext, useState } from "react";

// Create a context for user data
export const UserContext = createContext();

// Context provider to wrap the app
export const UserProvider = ({ children }) => {
  // Initial mock user data
  const [user, setUser] = useState({
    name: "Akhil Joseph",
    email: "akhil@example.com"
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
