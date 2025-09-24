'use client';
import { useEffect, useState } from "react";
import { db } from "../../../lib/db";
import NoveltyChart from "../components/NoveltyChart";
import { processDataForInsights } from "../utils/stats";

export default function Insights() {
  const [days, setDays] = useState([]);
  const [insightsData, setInsightsData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const days = await getdays();
      setDays(days);
      
      if (days.length > 0) {
        const insights = processDataForInsights(days);
        setInsightsData(insights);
      }
    }
    fetchData();
  }, []);

  async function getdays() {
    return await db.days
      .orderBy('date')
      .reverse()
      // .limit(1000)
      .toArray();
  }

  if (!insightsData) {
    return <div className="p-4">Loading insights...</div>;
  }

  const { enriched, weeklyStats } = insightsData;
  const { avgLength, correlation: corr, sortedDrivers } = weeklyStats;

  return (
    <div className="flex flex-col gap-6 p-4 max-w-4xl mx-auto">
      {/* Top Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold text-blue-700">Weekly Summary</h2>
        <p>
          Avg perceived length (last 7 days):{" "}
          <strong>{avgLength.toFixed(1)}</strong>
        </p>
        <p>
          Novelty ↔ Length correlation: <strong>{corr.toFixed(2)}</strong>
        </p>
        <p className="mt-2 text-sm text-blue-800">
          {corr > 0.5 && "On weeks like this, more novelty strongly matched with longer-feeling days."}
          {corr <= 0.5 && corr > 0 && "Novelty had a mild influence on your days feeling longer."}
          {corr <= 0 && "Novelty didn't explain much of how your days felt this week."}
        </p>
      </div>


      {/* Chart */}
      <div className="bg-white border rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">Novelty vs Perceived Length</h2>
        <NoveltyChart noveltyData={enriched} />
      </div>

      {/* Breakdown */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow">
        <h2 className="text-lg font-semibold text-green-700">Top Drivers This Week</h2>
        {sortedDrivers.map(([key, val]) => (
          <div key={key} className="mb-2">
            <p>
              {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
              <strong>{val >= 0 ? "+" : ""}{val.toFixed(1)} SD</strong>
            </p>
            <p className="text-sm text-green-800">
              {val > 0.5 && `You had more ${key} than usual, which stretched your days.`}
              {val < -0.5 && `You had fewer ${key} than usual, which made days feel shorter.`}
              {val >= -0.5 && val <= 0.5 && `Your ${key} levels were about average.`}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}