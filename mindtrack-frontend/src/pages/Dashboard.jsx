import { useState, useEffect } from "react";
import DailyLogForm from "../components/DailyLogForm";
import LogList from "../components/LogList";
import StreakCounter from "../components/StreakCounter";
import InsightsCard from "../components/InsightsCard";
import HeatmapCalendar from "../components/HeatmapCalendar";

export default function Dashboard({ user }) {
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem("mindtrack-logs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("mindtrack-logs", JSON.stringify(logs));
  }, [logs]);

  return (
    <div className="space-y-4">
      <DailyLogForm onSave={(log) => setLogs([...logs, log])} />
      <StreakCounter logs={logs} />
      <InsightsCard logs={logs} />
      <LogList logs={logs} />
      <HeatmapCalendar logs={logs} />
    </div>
  );
}
