export default function StreakCounter({ logs }) {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    let count = 0;
    let today = new Date();

    for (let i = 0; i < logs.length; i++) {
      const logDate = new Date(logs[logs.length - 1 - i].date);
      if (
        logDate.toDateString() === today.toDateString() ||
        logDate.toDateString() ===
          new Date(today.setDate(today.getDate() - 1)).toDateString()
      ) {
        count++;
      } else {
        break;
      }
    }
    setStreak(count);
  }, [logs]);

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-semibold">🔥 Current Streak</h2>
      <p>{streak} days</p>
    </div>
  );
}
