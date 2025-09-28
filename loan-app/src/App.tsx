import { addApplication, clearApplications } from "./features/loanSlice";
import AuthForm from "./components/AuthForm";
import LoanForm from "./components/LoanForm";
import { useSelector, useDispatch } from "react-redux";
import type { initialState } from "./store";

function App() {
  const dispatch = useDispatch();
  const applications = useSelector(
    (store: initialState) => store.loan.applications
  );
  const user = useSelector((store: initialState) => store.auth.user);

  const handleAddLoan = () => {
    dispatch(addApplication({ id: Date.now(), name: "Test Loan" }));
  };

  const handleClearLoans = () => {
    dispatch(clearApplications());
  };
  console.log("User from Redux:", user);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Loan Application Portal</h1>

      {user ? (
        <div style={{ marginTop: "20px" }}>
          <h2>Authorized User Section</h2>
          <div style={{ margin: "10px 0", display: "flex", gap: "10px" }}>
            <button onClick={handleAddLoan}>Add Loan</button>
            <button onClick={handleClearLoans}>Clear Loans</button>
          </div>
          <ul>
            {applications.map((app: { id: number; name: string }) => (
              <li key={app.id}>{app.name}</li>
            ))}
          </ul>
          <LoanForm />
        </div>
      ) : (
        <div>
          <AuthForm />
          <p>Please log in to access loan applications.</p>
        </div>
      )}
    </div>
  );
}

export default App;
