import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Profile() {
  const { user } = useContext(UserContext); // Access user data from context

  return (
    <div className="container">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}
