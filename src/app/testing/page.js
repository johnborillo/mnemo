'use client'

import { db } from "../../../lib/db";
import journalData from "./journalData";

export default function Testing() {
  async function importTestData() {
    await db.days.clear();
    // await db.days.bulkAdd(testData);
    await db.days.bulkAdd(journalData);
    console.log("Test data imported!");
  }

  const testData = Array.from({ length: 365 }, (_, i) => {
    const randomDaysAgo = Math.floor(Math.random() * (10 * 365)); // Random number between 0 and 3650 (approximately 10 years)
    const today = new Date();
    today.setDate(today.getDate() - randomDaysAgo);
    const randomDate = today.toISOString().split('T')[0]; // YYYY-MM-DD

    return {
      date: randomDate,
      perceivedLength: Math.floor(Math.random() * 101), // Random number between 0 and 100
      uniquePlaces: Math.floor(Math.random() * 11), // Random number between 0 and 10
      newPeople: Math.floor(Math.random() * 21), // Random number between 0 and 20
      photoBursts: Math.floor(Math.random() * 6), // Random number between 0 and 5
      taskSwitches: Math.floor(Math.random() * 16), // Random number between 0 and 15
      emotionMood: Math.floor(Math.random() * 11), // Random number between 0 and 10
    };
  });


  return (
    <>
      <button onClick={importTestData} className="btn">Import Test Data</button>
    </>
  )
}