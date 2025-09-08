import { useState } from "react";

function Counter(props) {
  const [count, setCount] = useState(props.initialValue || 0);
  return (
    <div>
      <p>Current Count: {count}</p>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Increment
      </button>
      <button
        disabled={count <= 0}
        onClick={() => setCount((prevCount) => prevCount - 1)}
      >
        Decrement
      </button>
    </div>
  );
}

export default Counter;
