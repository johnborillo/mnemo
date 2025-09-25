import { useState } from "react";
import { getTodayDateString } from "../utils/getTodayDateString";
import saveJournalEntry from "../utils/saveJournalEntry";

export default function useJournal() {
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
    const today = getTodayDateString();

    const newEntry = {
      date: today,
      perceivedLength,
      uniquePlaces,
      newPeople,
      photoBursts,
      taskSwitches,
      emotionMood
    };

    await saveJournalEntry(newEntry);
    e.preventDefault();
  };

  const clearForm = () => {
    setPerceivedLength(50);
    setUniquePlaces(0);
    setNewPeople(0);
    setPhotoBursts(0);
    setTaskSwitches(0);
    setEmotionMood(0);
  }

  return {
    perceivedLength, setPerceivedLength,
    uniquePlaces, setUniquePlaces,
    newPeople, setNewPeople,
    photoBursts, setPhotoBursts,
    taskSwitches, setTaskSwitches,
    emotionMood, setEmotionMood,
    sliderLabel,
    handleSubmit,
    clearForm
  }
}