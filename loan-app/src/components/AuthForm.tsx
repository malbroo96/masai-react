import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading, logout } from "../features/authSlice";
import { signup, login, logoutUser } from "../firebaseAuth";
import type { initialState } from "../store";

export default function AuthForm() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(
    (state: initialState) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    dispatch(setLoading(true));
    try {
      const res = await signup(email, password);
      dispatch(setUser(res.user));
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
      dispatch(setUser(res.user));
    } catch (err) {
      console.log(err);
      dispatch(setError("handleLogin failed: "));
    }
    dispatch(setLoading(false));
  };

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
  };

  return (
    <div style={{ padding: 20 }}>
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignup} disabled={loading}>
            Sign Up
          </button>
          <button onClick={handleLogin} disabled={loading}>
            Log In
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
}
