import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "10:00", value: 20 },
  { time: "10:05", value: 22 },
  { time: "10:10", value: 19 },
  { time: "10:15", value: 85 },
];

export default function ActivityChart() {
  return (
    <div className="bg-black border border-cyber/30 rounded-xl p-6">
      <h2 className="text-lg mb-4">Activity Monitor</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#00f2ff"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
