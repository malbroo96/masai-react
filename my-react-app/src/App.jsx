import "./App.css";
import Counter from "./assignments/Counter.jsx";
import ToggleButton from "./assignments/ToggleButton.jsx";

function App() {
  return (
    <div>
      <div>
        {" "}
        Question1: <Counter initialValue={4} />
      </div>
      <div>
        Question2:
        <h1>Toggle Example</h1>
        {/* Without label */}
        <ToggleButton />
        {/* With label (Bonus) */}
        <ToggleButton label="Light Switch" />
      </div>
    </div>
  );
}

export default App;
