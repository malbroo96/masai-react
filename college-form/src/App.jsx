import React, { useReducer, useState } from "react";

const initialState = {
  name: "",
  establishment_year: "",
  address: {
    building: "",
    street: "",
    city: {
      name: "",
      locality: {
        pinCode: "",
        landmark: "",
      },
    },
    state: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
  },
  courses_offered: [],
};

function formReducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "establishment_year":
      return { ...state, establishment_year: action.payload };
    case "building":
      return { ...state, address: { ...state.address, building: action.payload } };
    case "street":
      return { ...state, address: { ...state.address, street: action.payload } };
    case "city_name":
      return {
        ...state,
        address: { ...state.address, city: { ...state.address.city, name: action.payload, locality: state.address.city.locality } },
      };
    case "pinCode":
      return {
        ...state,
        address: { ...state.address, city: { ...state.address.city, locality: { ...state.address.city.locality, pinCode: action.payload } } },
      };
    case "landmark":
      return {
        ...state,
        address: { ...state.address, city: { ...state.address.city, locality: { ...state.address.city.locality, landmark: action.payload } } },
      };
    case "state":
      return { ...state, address: { ...state.address, state: action.payload } };
    case "latitude":
      return { ...state, address: { ...state.address, coordinates: { ...state.address.coordinates, latitude: action.payload } } };
    case "longitude":
      return { ...state, address: { ...state.address, coordinates: { ...state.address.coordinates, longitude: action.payload } } };
    case "courses_offered":
      return { ...state, courses_offered: action.payload.split(",").map(course => course.trim()) };
    case "reset":
      return initialState;
    default:
      throw new Error("invalid action type");
  }
}

function App() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setSubmitted(true);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
    setSubmitted(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>College Form (useReducer)</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="College Name"
          value={state.name}
          onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
        />
        <input
          type="number"
          placeholder="Establishment Year"
          value={state.establishment_year}
          onChange={(e) => dispatch({ type: "establishment_year", payload: e.target.value })}
        />
        <input
          type="text"
          placeholder="Building"
          value={state.address.building}
          onChange={(e) => dispatch({ type: "building", payload: e.target.value })}
        />
        <input
          type="text"
          placeholder="Street"
          value={state.address.street}
          onChange={(e) => dispatch({ type: "street", payload: e.target.value })}
        />
        <input
          type="text"
          placeholder="City Name"
          value={state.address.city.name}
          onChange={(e) => dispatch({ type: "city_name", payload: e.target.value })}
        />
        <input
          type="text"
          placeholder="Pin Code"
          value={state.address.city.locality.pinCode}
          onChange={(e) => dispatch({ type: "pinCode", payload: e.target.value })}
        />
        <input
          type="text"
          placeholder="Landmark"
          value={state.address.city.locality.landmark}
          onChange={(e) => dispatch({ type: "landmark", payload: e.target.value })}
        />
        <input
          type="text"
          placeholder="State"
          value={state.address.state}
          onChange={(e) => dispatch({ type: "state", payload: e.target.value })}
        />
        <input
          type="text"
          placeholder="Latitude"
          value={state.address.coordinates.latitude}
          onChange={(e) => dispatch({ type: "latitude", payload: e.target.value })}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={state.address.coordinates.longitude}
          onChange={(e) => dispatch({ type: "longitude", payload: e.target.value })}
        />
        <input
          type="text"
          placeholder="Courses Offered (comma separated)"
          value={state.courses_offered.join(", ")}
          onChange={(e) => dispatch({ type: "courses_offered", payload: e.target.value })}
        />

        <div style={{ marginTop: "10px" }}>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset} style={{ marginLeft: "10px" }}>Reset</button>
        </div>
      </form>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {submitted && (
        <div style={{ border: "1px solid #ccc", padding: "10px" }}>
          <h3>College Details:</h3>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
