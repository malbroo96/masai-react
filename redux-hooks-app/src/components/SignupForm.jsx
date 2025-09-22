import React from "react";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../hooks/useAuth";

function SignupForm() {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { loginUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ email: values.email });
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <input
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
