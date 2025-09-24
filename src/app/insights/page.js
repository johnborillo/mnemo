'use client';
import { useEffect, useState } from "react";
import { db } from "../../../lib/db";

export default function Insights() {
  const [recentDays, setRecentDays] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const recentDays = await getRecentDays();
      console.log('Recent Days:', recentDays);
      setRecentDays(recentDays);
    }
    fetchData();
  }, []);

  // Get last 7 entries
  async function getRecentDays() {
    return await db.days
      .orderBy('date')
      .reverse()
      .limit(7)
      .toArray();
  }

  // Get a single day
  async function getDay(date) {
    return await db.days.get({ date });
  }

  return (
    <>
      <div className="flex-col justify-center">
        <div>
          <h1 className="text-center">Insights</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-2">
            <ul>
              {recentDays.map((day) => (
                <li key={day.id}>
                  <strong>{day.date}:</strong> Perceived Length: {day.perceivedLength}, Unique Places: {day.uniquePlaces}, New People: {day.newPeople}, Photo Bursts: {day.photoBursts}, Task Switches: {day.taskSwitches}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}