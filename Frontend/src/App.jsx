import { useEffect, useState } from "react";
import { getCounter, incrementCounter, decrementCounter } from "./utils/api";

function App() {
  const [counter, setCounter] = useState(0);

  // Fetch counter value on mount
  useEffect(() => {
    const fetchCounter = async () => {
      const data = await getCounter();
      if (data) setCounter(data.value);
    };
    fetchCounter();
  }, []);

  const handleIncrement = async () => {
    const data = await incrementCounter();
    if (data) setCounter(data.value);
  };

  const handleDecrement = async () => {
    const data = await decrementCounter();
    if (data) setCounter(data.value);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Counter App</h1>
      <h2>{counter}</h2>
      <button onClick={handleIncrement} style={{ margin: "10px", padding: "10px 20px" }}>
        Increment
      </button>
      <button onClick={handleDecrement} style={{ margin: "10px", padding: "10px 20px" }}>
        Decrement
      </button>
    </div>
  );
}

export default App;
