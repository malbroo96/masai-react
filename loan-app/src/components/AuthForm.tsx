import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading } from "../features/authSlice";
import { signup, login } from "../firebaseAuth";
import type { initialState } from "../store";

export default function AuthForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: initialState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Determine role based on email
  const getRole = (email: string) => {
    if (email.trim().toLowerCase() === "admin@site.com") return "admin";
    return "user";
  };

  const handleSignup = async () => {
    dispatch(setLoading(true));
    try {
      const res = await signup(email, password);
      const role = getRole(email);
      dispatch(setUser({ ...res.user, role }));
    } catch (err) {
      console.log(err);
      dispatch(setError("handleSignup failed: "));
    }
    dispatch(setLoading(false));
  };

  const handleLogin = async () => {
    dispatch(setLoading(true));
    try {
      const res = await login(email, password);
      const role = getRole(email);
      dispatch(setUser({ ...res.user, role }));
    } catch (err) {
      console.log(err);
      dispatch(setError("handleLogin failed: "));
    }
    dispatch(setLoading(false));
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "4px",
            border: "1px solid #ddd",
            fontSize: "1rem",
            width: "100%"
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "4px",
            border: "1px solid #ddd",
            fontSize: "1rem",
            width: "100%"
          }}
        />
        <div style={{
          display: "flex",
          gap: "1rem",
          marginTop: "0.5rem"
        }}>
          <button 
            onClick={handleSignup} 
            disabled={loading}
            style={{
              flex: 1,
              padding: "0.75rem",
              backgroundColor: "#2e7d32",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            Sign Up
          </button>
          <button 
            onClick={handleLogin} 
            disabled={loading}
            style={{
              flex: 1,
              padding: "0.75rem",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            Log In
          </button>
        </div>
        {error && (
          <p style={{ 
            color: "#d32f2f", 
            margin: "0.5rem 0",
            textAlign: "center",
            fontSize: "0.875rem"
          }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
