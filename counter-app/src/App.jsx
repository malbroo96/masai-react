import React, { useReducer } from "react";

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// Initial state
const initialState = { count: 0 };

function App() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1>Counter: {state.count}</h1>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            background: "green",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Increment
        </button>
        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          style={{
            padding: "10px 20px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default App;
