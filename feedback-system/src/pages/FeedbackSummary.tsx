import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FeedbackContext } from "../context/FeedbackContext";

export default function FeedbackSummary() {
  const { data } = useContext(FeedbackContext);
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Feedback Summary</h2>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Feedback:</strong> {data.feedback}</p>

      <button onClick={() => navigate("/")}>Back to Form</button>
    </div>
  );
}
