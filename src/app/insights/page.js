'use client';
import { useEffect, useState } from "react";
import { getJournalEntry } from "../utils/getJournalEntry";
import NoveltyChart from "../components/NoveltyChart";
import { processDataForInsights } from "../utils/stats";
import { CiCircleInfo } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Insights() {
  const [insightsData, setInsightsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const days = await getJournalEntry();
      
      if (days.length > 0) {
        const insights = processDataForInsights(days);
        setInsightsData(insights);
        setLoading(false);
      }
      setLoading(false)
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4">Loading insights...</div>;
  }

  if (!loading && !insightsData) {
    return <div className="p-4">Start adding enteries to start seeing insights!</div>;
  }

  const { enriched, weeklyStats } = insightsData;
  const { avgLength, correlation: corr, sortedDrivers } = weeklyStats;

  return (
    <div className="flex flex-col gap-6 p-4 max-w-4xl mx-auto">
      {/* Top Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold text-blue-700">Weekly Summary</h2>
          <Dialog>
            <DialogTrigger><CiCircleInfo className="inline-block mb-3 ml-1 text-gray-500 dark:text-gray-400" size={25} /></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>What does it all mean?</DialogTitle>
                <DialogDescription>
                  Correlation is a statistical measure that describes the strength and direction of a relationship between two variables.<br /><br />
                  In this case, it measures how "Novelty" and "Length" are related. A positive correlation (e.g., Length correlation {">"} 0.5) means that as novelty increases, the perceived length of days also tends to increase.<br /><br />
                  <strong>Example:</strong><br />
                  • <em className="text-[#78A78D]">Positive correlation</em>: On weeks when you visited new places, met new people, or had memorable moments (like taking photo bursts), you often rated your days as longer. More novelty stretched your sense of time.<br /><br />
                  • <em className="text-[#E56B6F]">Negative correlation</em>: Sometimes novelty shows up on days that feel rushed or blurry. For example, traveling through multiple places, meeting lots of new people at once, or switching tasks constantly can feel chaotic. Even though novelty was high, you may have rated those days as shorter. That pattern creates a negative correlation.<br /><br />
                  • <em>Neutral / mild correlation:</em> If novelty levels were about average — a couple new activities here and there, but nothing extreme — your perceived length may not shift much either way, so the correlation looks weaker.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
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

      <NoveltyChart noveltyData={enriched} />

      {/* Breakdown */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold text-green-700">Top Drivers This Week</h2>
          <Dialog>
            <DialogTrigger>
              <CiCircleInfo className="inline-block mb-3 ml-1 text-gray-500 dark:text-gray-400" size={25} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>What do the drivers mean?</DialogTitle>
                <DialogDescription>
                  The breakdown shows which factors (like new places, people, or task switches) stood out compared to your personal baseline.<br /><br />
                  Each number is measured in <strong>standard deviations (SD)</strong>. That’s just a way of saying how far this week was from your usual average:<br /><br />
                  • <em className="text-[#78A78D]">Positive values (e.g. +0.8 SD)</em>: You had more of this factor than usual. For example, more new people or more task switches. These often stretched your days.<br /><br />
                  • <em className="text-[#E56B6F]">Negative values (e.g. -1.0 SD)</em>: You had less of this factor than usual. For instance, fewer unique places or fewer photo bursts. These often made days feel shorter.<br /><br />
                  • <em>Values near 0 (e.g. -0.2 SD)</em>: About average for you — nothing stood out strongly this week.<br /><br />
                  Think of it as a way of spotlighting which aspects of novelty drove your time-perception up or down most relative to your own baseline.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

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