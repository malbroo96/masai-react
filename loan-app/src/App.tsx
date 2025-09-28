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
    <div style={{ 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#f5f5f5"
    }}>
      <header style={{
        backgroundColor: "#1976d2",
        color: "white",
        padding: "1rem",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ margin: 0, fontSize: "1.8rem" }}>Loan Application Portal</h1>
      </header>

      <main style={{
        flex: 1,
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%"
      }}>
        {user ? (
          <div style={{ 
            backgroundColor: "white", 
            borderRadius: "8px",
            padding: "2rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ 
              marginTop: 0, 
              color: "#333",
              marginBottom: "1.5rem"
            }}>Authorized User Section</h2>
            <div style={{ 
              margin: "1rem 0", 
              display: "flex", 
              gap: "1rem"
            }}>
              <button 
                onClick={handleAddLoan}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#1976d2",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >Add Loan</button>
              <button 
                onClick={handleClearLoans}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >Clear Loans</button>
            </div>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: "1rem 0"
            }}>
              {applications.map((app: { id: number; name: string }) => (
                <li 
                  key={app.id}
                  style={{
                    padding: "0.75rem",
                    borderBottom: "1px solid #eee",
                    color: "#666"
                  }}
                >{app.name}</li>
              ))}
            </ul>
            <LoanForm />
          </div>
        ) : (
          <div style={{
            maxWidth: "400px",
            margin: "2rem auto",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "2rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <AuthForm />
            <p style={{
              textAlign: "center",
              color: "#666",
              marginTop: "1rem"
            }}>Please log in to access loan applications.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
