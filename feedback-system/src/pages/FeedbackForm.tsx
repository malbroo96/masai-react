import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FeedbackContext } from "../context/FeedbackContext";

export default function FeedbackForm() {
  const { data, updateData } = useContext(FeedbackContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.feedback) {
      setError("⚠️ All fields are required");
      return;
    }
    navigate("/summary");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Feedback Form</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
          />
        </div>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
          />
        </div>
        <div>
          <label>Feedback:</label><br />
          <textarea
            value={data.feedback}
            onChange={(e) => updateData({ feedback: e.target.value })}
          />
        </div>
        <button type="submit">Go to Summary</button>
      </form>
    </div>
  );
}
