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
    <div style={{ padding: 20 }}>
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
    </div>
  );
}
