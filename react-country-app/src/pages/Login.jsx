import { useReducer } from "react";
import { useAuth } from "../context/AuthContext";

const initialState = { email: "", password: "" };

function reducer(state, action) {
  switch(action.type) {
    case "SET_FIELD":
      return {...state, [action.field]: action.value};
    default:
      throw new Error("Invalid action type");
  }
}

export default function Login() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { dispatch: authDispatch } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    authDispatch({ type: "LOGIN", payload: { email: state.email } });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={state.email} onChange={e => dispatch({type:"SET_FIELD", field:"email", value:e.target.value})} />
      <input type="password" value={state.password} onChange={e => dispatch({type:"SET_FIELD", field:"password", value:e.target.value})} />
      <button type="submit">Login</button>
    </form>
  );
}
