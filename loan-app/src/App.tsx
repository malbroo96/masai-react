import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { useSelector } from "react-redux";
import AuthForm from "./components/AuthForm";
import LoanForm from "./components/LoanForm";
import LoanDashboard from "./components/LoanDashboard";
import type { initialState } from "./store";
import "./styles/app.css";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: initialState) => state.auth.user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  const user = useSelector((state: initialState) => state.auth.user);

  return (
    <Router>
      <div className="app">
        <header className="header">
          <nav className="nav">
            <div className="nav-container">
              <div className="brand">
                <Link to="/" className="brand-link">
                  Loan Application Portal
                </Link>
              </div>
              <div className="nav-items">
                {user ? (
                  <>
                    <Link to="/dashboard" className="nav-link">
                      Dashboard
                    </Link>
                    <Link to="/apply" className="nav-link">
                      Apply for Loan
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </header>

        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route
              path="/login"
              element={
                !user ? <AuthForm /> : <Navigate to="/dashboard" replace />
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <LoanDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/apply"
              element={
                <ProtectedRoute>
                  <LoanForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
