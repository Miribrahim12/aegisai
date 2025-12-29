import { useState } from "react";
import Sidebar from "../components/Sidebar";
import RiskCard from "../components/RiskCard";
import ActivityChart from "../components/ActivityChart";
import { analyzeLog } from "../api/api";

export default function Dashboard() {
  const [result, setResult] = useState({
    status: "NORMAL",
    risk_score: 10,
  });

  const [loading, setLoading] = useState(false);

  const runScan = async () => {
    try {
      setLoading(true);

      const res = await analyzeLog({
        requests_per_min: 85,
        failed_logins: 12,
      });

      setResult(res);
    } catch (err) {
      console.error("Scan failed:", err);
      alert("Scan failed. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-dark">
      <Sidebar />

      <div className="flex-1 p-12">
        <h1 className="text-3xl font-bold mb-8">
          Security Overview
        </h1>

        <button
          onClick={runScan}
          disabled={loading}
          className="bg-cyber text-black px-8 py-3 rounded-lg font-semibold mb-8 hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Scanning..." : "Run AI Scan"}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RiskCard
            status={result.status}
            score={result.risk_score}
          />
          <ActivityChart />
        </div>
      </div>
    </div>
  );
}
