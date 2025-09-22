import React from "react";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../hooks/useAuth";

function LoginForm() {
  const { values, handleChange, resetForm } = useForm({
    username: "",
    password: "",
  });
  const { loginUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ username: values.username });
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={values.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
