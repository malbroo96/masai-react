/**
 * AuthForm Component
 *
 * A comprehensive authentication form component that handles both user login and signup.
 * Features include:
 * - Email and password authentication
 * - Form validation with error messages
 * - Loading states and error handling
 * - Role-based access control (admin vs user)
 * - Seamless switching between login and signup modes
 *
 * Uses Firebase Authentication and Redux for state management.
 */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading } from "../features/authSlice";
import { signup, login } from "../firebaseAuth";
import type { initialState } from "../store";
import "../styles/auth-form.css";

export default function AuthForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: initialState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Determines user role based on email address
   * Special email 'admin@site.com' gets admin privileges
   *
   * @param email - User's email address
   * @returns 'admin' for admin@site.com, 'user' for all other emails
   */
  const getRole = (email: string) => {
    if (email.trim().toLowerCase() === "admin@site.com") return "admin";
    return "user";
  };

  /**
   * Handles the user signup process
   * Creates a new user account in Firebase and sets user state in Redux
   * with appropriate role based on email
   */
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

  /**
   * Handles the user login process
   * Authenticates user credentials with Firebase and updates Redux state
   * Sets appropriate role and handles any authentication errors
   */
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

  // State to toggle between login and signup modes
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({ email: "", password: "" });

  /**
   * Validates form input before submission
   * Checks for:
   * - Email presence and format
   * - Password presence and minimum length
   *
   * Updates error state with appropriate messages
   * @returns boolean - true if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    // Validate email
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handles form submission for both login and signup
   * 1. Prevents default form submission
   * 2. Validates form inputs
   * 3. Calls appropriate authentication handler based on mode
   *
   * @param e - React form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      await handleLogin();
    } else {
      await handleSignup();
    }
  };

  return (
    <div className="auth-container">
      {/* Main authentication container with centered box layout */}
      <div className="auth-box">
        <h2 className="auth-title">
          {isLogin ? "Sign in to your account" : "Create new account"}
        </h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label htmlFor="email-address">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`auth-input ${errors.email ? "error" : ""}`}
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="auth-input-error">{errors.email}</p>}
          </div>
          <div className="auth-input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={`auth-input ${errors.password ? "error" : ""}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="auth-input-error">{errors.password}</p>
            )}
          </div>

          {error && (
            <div className="auth-error">
              <div className="auth-error-message">{error}</div>
            </div>
          )}

          <div>
            <button type="submit" disabled={loading} className="auth-submit">
              {loading && (
                <svg
                  className="auth-loading"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {isLogin ? "Sign in" : "Sign up"}
            </button>
          </div>

          <div className="auth-switch">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="auth-switch-btn"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
