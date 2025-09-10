import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function Settings() {
  const { user, setUser } = useContext(UserContext); // Access context
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [success, setSuccess] = useState(false);

  // Update form fields if context changes
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name, email }); // Update context
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000); // Hide success message after 2s
  };

  return (
    <div className="container">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", margin: "auto" }}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <button type="submit" style={{ padding: "8px", background: "#0077ff", color: "#fff", border: "none", borderRadius: "6px" }}>Update</button>

        {success && <p style={{ color: "green" }}>Profile updated successfully!</p>}
      </form>
    </div>
  );
}
