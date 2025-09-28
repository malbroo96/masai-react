import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { logoutUser } from "../firebaseAuth";
import type { initialState } from "../store";

export default function LoanForm() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: initialState) => state.auth);

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
  };

  return (
    <div>
      <h3>Loan Form Component</h3>
      <p>This is where your multi-step loan application will go.</p>
      {user && (
        <button onClick={handleLogout} style={{ marginTop: 16 }}>
          Logout
        </button>
      )}
    </div>
  );
}
