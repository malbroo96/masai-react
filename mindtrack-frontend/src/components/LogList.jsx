export default function LogList({ logs }) {
  if (logs.length === 0) return <p>No logs yet.</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Your Logs</h2>
      <ul className="space-y-2">
        {logs.map((log, i) => (
          <li key={i} className="border p-2 rounded">
            <strong>{log.date}</strong> — Study: {log.studyHours}h, Sleep:{" "}
            {log.sleepHours}h
            <p className="text-sm mt-1">{log.reflection}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
