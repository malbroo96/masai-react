export default function InsightsCard({ logs }) {
  if (logs.length < 7) {
    return (
      <div className="bg-yellow-100 p-4 rounded shadow">
        <p>📊 Log for at least 7 days to see insights.</p>
      </div>
    );
  }

  // Simple demo insight
  const avgSleep = (
    logs.reduce((sum, l) => sum + Number(l.sleepHours), 0) / logs.length
  ).toFixed(1);

  return (
    <div className="bg-blue-100 p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Insights</h2>
      <p>You average {avgSleep} hours of sleep.</p>
      {avgSleep >= 8 && <p>✅ You focus better when you sleep well!</p>}
    </div>
  );
}
