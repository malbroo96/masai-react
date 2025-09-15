import { createContext, useReducer, useContext } from "react";

const AuthContext = createContext();

const initialState = { isAuthenticated: false, user: null };

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return initialState;
    default:
      throw new Error("Invalid action type");
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
