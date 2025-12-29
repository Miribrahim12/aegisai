export default function RiskCard({ status, score }) {
  return (
    <div className="bg-black border border-cyber/30 rounded-xl p-6">
      <h2 className="text-lg mb-2">AI Risk Score</h2>

      <div className="text-4xl font-bold text-cyber">
        {score}
      </div>

      <div
        className={`mt-2 font-semibold ${
          status === "ANOMALY"
            ? "text-red-500"
            : "text-green-500"
        }`}
      >
        {status}
      </div>
    </div>
  );
}
