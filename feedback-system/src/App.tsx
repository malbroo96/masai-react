import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FeedbackProvider } from "./context/FeedbackContext";
import FeedbackForm from "./pages/FeedbackForm";
import FeedbackSummary from "./pages/FeedbackSummary";

function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FeedbackForm />} />
          <Route path="/summary" element={<FeedbackSummary />} />
        </Routes>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
