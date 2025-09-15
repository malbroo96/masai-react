import React, { useReducer, useState } from "react";

const initialState = {
  email: "",
  password: "",
};

function formReducer(state, action) {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("invalid action type");
  }
}

function App() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.email || state.password) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
    setSubmitted(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f7f7f7",
      }}
    >
      <div
        style={{
          padding: "20px",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          width: "300px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Form with useReducer</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="email"
              placeholder="Enter email"
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "email", payload: e.target.value })
              }
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <input
              type="password"
              placeholder="Enter password"
              value={state.password}
              onChange={(e) =>
                dispatch({ type: "password", payload: e.target.value })
              }
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "8px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>

            <button
              type="button"
              onClick={handleReset}
              style={{
                flex: 1,
                padding: "8px",
                background: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          </div>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {!submitted ? (
            <div>No details found</div>
          ) : (
            <div>
              <div>User Email: {state.email}</div>
              <div>User Password: {state.password}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
