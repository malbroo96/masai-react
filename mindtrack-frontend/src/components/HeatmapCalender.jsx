import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";

export default function HeatmapCalendar({ logs }) {
  if (!logs.length) return null;

  // Transform logs into heatmap format
  const values = logs.map((log) => ({
    date: log.date,
    count: Number(log.studyHours) || 0,
  }));

  // Date range (last 3 months)
  const today = new Date();
  const startDate = new Date();
  startDate.setMonth(today.getMonth() - 2);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">📅 Study Heatmap</h2>
      <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        values={values}
        classForValue={(value) => {
          if (!value || value.count === 0) {
            return "color-empty";
          }
          if (value.count < 2) return "color-scale-1";
          if (value.count < 4) return "color-scale-2";
          if (value.count < 6) return "color-scale-3";
          return "color-scale-4";
        }}
        tooltipDataAttrs={(value) => {
          return {
            "data-tip": value.date
              ? `${value.date}: ${value.count} hrs study`
              : "No data",
          };
        }}
      />
      <ReactTooltip />
    </div>
  );
}
