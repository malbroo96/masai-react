import { useState } from "react";

export default function DailyLogForm({ onSave }) {
  const [studyHours, setStudyHours] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [reflection, setReflection] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      studyHours,
      sleepHours,
      reflection,
      date: new Date().toISOString().split("T")[0],
    });
    setStudyHours("");
    setSleepHours("");
    setReflection("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow rounded flex flex-col gap-2"
    >
      <input
        type="number"
        placeholder="Study Hours"
        value={studyHours}
        onChange={(e) => setStudyHours(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Sleep Hours"
        value={sleepHours}
        onChange={(e) => setSleepHours(e.target.value)}
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Reflection..."
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        className="border p-2 rounded h-24"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save Entry
      </button>
    </form>
  );
}import { useState } from "react";

export default function DailyLogForm({ onSave }) {
  const [studyHours, setStudyHours] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [reflection, setReflection] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      studyHours,
      sleepHours,
      reflection,
      date: new Date().toISOString().split("T")[0],
    });
    setStudyHours("");
    setSleepHours("");
    setReflection("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow rounded flex flex-col gap-2"
    >
      <input
        type="number"
        placeholder="Study Hours"
        value={studyHours}
        onChange={(e) => setStudyHours(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Sleep Hours"
        value={sleepHours}
        onChange={(e) => setSleepHours(e.target.value)}
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Reflection..."
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        className="border p-2 rounded h-24"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save Entry
      </button>
    </form>
  );
}

