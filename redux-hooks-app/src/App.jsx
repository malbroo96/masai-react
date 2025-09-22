// src/App.jsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store"; // <-- make sure path matches folder/file exactly
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Redux Toolkit + Custom Hooks Demo</h1>
        <LoginForm />
        <SignupForm />
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
