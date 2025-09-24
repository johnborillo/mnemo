'use client'

import { useState } from "react"
import { db } from "../../../lib/db";

export default function Journal() {
  const [perceivedLength, setPerceivedLength] = useState(50);
  const [uniquePlaces, setUniquePlaces] = useState(0);
  const [newPeople, setNewPeople] = useState(0);
  const [photoBursts, setPhotoBursts] = useState(0);
  const [taskSwitches, setTaskSwitches] = useState(0);
  const [emotionMood, setEmotionMood] = useState(0);

  const sliderLabel = (() => {
    if (perceivedLength <= 20) return "Over before I knew it";
    if (perceivedLength >= 21 && perceivedLength <= 40) return "Pretty short"
    if (perceivedLength >= 41 && perceivedLength <= 60) return "Average day"
    if (perceivedLength >= 61 && perceivedLength <= 80) return "Pretty long"
    if (perceivedLength >= 81 && perceivedLength <= 100) return "One of the longest days"
    return "Long";
  })();

  const handleSubmit = async (e) => {
    // const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // FOR TESTING PURPOSES, USE A RANDOM DATE WITHIN THE LAST YEAR
    const randomDaysAgo = Math.floor(Math.random() * 365); // Random number between 0 and 364
    const today = new Date();
    today.setDate(today.getDate() - randomDaysAgo);
    const randomDate = today.toISOString().split('T')[0]; // YYYY-MM-DD

    await db.days.put({
      // date: today,
      date: randomDate,
      perceivedLength: parseInt(perceivedLength),
      uniquePlaces: parseInt(uniquePlaces) ?? 0,
      newPeople: parseInt(newPeople) ?? 0,
      photoBursts: parseInt(photoBursts) ?? 0,
      taskSwitches: parseInt(taskSwitches) ?? 0,
      // emotionMood: emotionMood ?? '',
      // notes: notes ?? ''
    });

    e.preventDefault();
  };

  const handleDelete = () => {
    setPerceivedLength(50);
    setUniquePlaces(0);
    setNewPeople(0);
    setPhotoBursts(0);
    setTaskSwitches(0);
    setEmotionMood(0);
  }

  return (
    <>
      <div className="flex-col justify-center">
        <div>
          <h1 className="text-center">How long did today feel?</h1>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="default-range" className="block mb-2 font-medium text-gray-900 dark:text-white">Perceived Day Length</label>
          <input
            type="range"
            value={perceivedLength}
            onChange={(e) => setPerceivedLength(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-[#4B6858]"
            id="default-range"
          />
          <p className="text-center">{sliderLabel}</p>
        </div>
        <div className="mt-6">
          <h1 className="text-lg font-semibold mb-4">Mood & Novelty</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <label htmlFor="unique-places" className="mb-1 font-medium text-gray-900 dark:text-white">Unique places visited:</label>
              <input
                type="number"
                id="unique-places"
                name="unique-places"
                className="p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                value={uniquePlaces}
                onChange={(e) => setUniquePlaces(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="new-people" className="mb-1 font-medium text-gray-900 dark:text-white">New people:</label>
              <input
                type="number"
                id="new-people"
                name="new-people"
                className="p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                value={newPeople}
                onChange={(e) => setNewPeople(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="photo-bursts" className="mb-1 font-medium text-gray-900 dark:text-white">Photo bursts:</label>
              <input
                type="number"
                id="photo-bursts"
                name="photo-bursts"
                className="p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                value={photoBursts}
                onChange={(e) => setPhotoBursts(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="task-switches" className="mb-1 font-medium text-gray-900 dark:text-white">Task switches (estimate):</label>
              <input
                type="number"
                id="task-switches"
                name="task-switches"
                className="p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                value={taskSwitches}
                onChange={(e) => setTaskSwitches(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="emotion-mood" className="mb-1 font-medium text-gray-900 dark:text-white">Emotion mood (1-5):</label>
              <input
                type="number"
                id="emotion-mood"
                name="emotion-mood"
                min="1"
                max="5"
                className="p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                value={emotionMood}
                onChange={(e) => setEmotionMood(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <p>Today felt like a {sliderLabel.toLowerCase()}.</p>
          <p>I visited {uniquePlaces} unique places, encountered {newPeople} new people or topics, took {photoBursts} photo bursts, switched tasks approximately {taskSwitches} times, and rated my emotional mood as {emotionMood} out of 5.</p>
          <div className="flex gap-4">
            <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-[#78A78D] text-white rounded-lg hover:bg-[#2a8e55]">Save Entry</button>
            <button onClick={handleDelete} className="mt-4 px-4 py-2 bg-[#E56B6F] text-white rounded-lg hover:bg-[#DD3C41]">Delete Entry</button>
          </div>
        </div>
      </div>
    </>
  )
}