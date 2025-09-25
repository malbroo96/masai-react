import React, { useState } from "react";

type FeedbackData = {
  name: string;
  email: string;
  rating: number;
  feedback: string;
};

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackData>({
    name: "",
    email: "",
    rating: 0,
    feedback: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "rating" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Simple validation
    if (!formData.name || !formData.email || !formData.rating || !formData.feedback) {
      alert("Please fill in all fields");
      return;
    }

    setSubmitted(true);

    // ✅ Clear form
    setFormData({
      name: "",
      email: "",
      rating: 0,
      feedback: "",
    });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <h2>Feedback Form</h2>

          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Rating (1-5):</label>
          <input
            type="number"
            name="rating"
            value={formData.rating || ""}
            min="1"
            max="5"
            onChange={handleChange}
          />

          <label>Feedback:</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>Thank you for your feedback!</h2>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Rating:</strong> {formData.rating}</p>
          <p><strong>Feedback:</strong> {formData.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
