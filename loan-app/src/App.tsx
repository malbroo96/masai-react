import { useDispatch, useSelector } from "react-redux";
import { addApplication, clearApplication } from "./features/loanSlice";

function App() {
  const dispatch = useDispatch();

  const applications = useSelector((store) => store.loan.applications);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Loan Application Portal</h1>

      <button
        onClick={() =>
          dispatch(addApplication({ id: Date.now(), name: "test loan" }))
        }
      >
        Add Loan
      </button>

      <button onClick={() => dispatch(clearApplication())}>
        Clear Loans
      </button>

      <ul>
        {applications.map((app) => (
          <li key={app.id}>{app.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
