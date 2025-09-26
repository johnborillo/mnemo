'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { getJournalEntry } from '../utils/getJournalEntry';
import { getTodayDateString } from '../utils/getTodayDateString';
import saveJournalEntry from '../utils/saveJournalEntry';

const JournalContext = createContext();

export function JournalProvider({ children }) {
  // ===== DATA FETCHING STATE (for reading existing entries) =====
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===== FORM STATE (for creating new entries) =====
  const [perceivedLength, setPerceivedLength] = useState(50);
  const [uniquePlaces, setUniquePlaces] = useState(0);
  const [newPeople, setNewPeople] = useState(0);
  const [photoBursts, setPhotoBursts] = useState(0);
  const [taskSwitches, setTaskSwitches] = useState(0);
  const [emotionMood, setEmotionMood] = useState(1);

  // ===== DERIVED STATE =====
  const today = getTodayDateString();
  const todayData = data?.[0]?.date === today ? data[0] : null;
  const hasLoggedToday = !!todayData;

  const sliderLabel = (() => {
    if (perceivedLength <= 20) return "Over before I knew it";
    if (perceivedLength >= 21 && perceivedLength <= 40) return "Pretty short";
    if (perceivedLength >= 41 && perceivedLength <= 60) return "Average day";
    if (perceivedLength >= 61 && perceivedLength <= 80) return "Pretty long";
    if (perceivedLength >= 81 && perceivedLength <= 100) return "One of the longest days";
    return "Long";
  })();

  const dayLengthText = (() => {
    if (!todayData) return "";
    if (todayData.perceivedLength <= 20) return "today flew by quick";
    if (todayData.perceivedLength <= 40) return "felt shorter than usual";
    if (todayData.perceivedLength <= 60) return "average routine day";
    if (todayData.perceivedLength <= 80) return "pretty long day";
    if (todayData.perceivedLength <= 100) return "felt longer than usual";
  })();

  // ===== DATA FETCHING =====
  const fetchData = async () => {
    setLoading(true);
    try {
      const entries = await getJournalEntry(7);
      setData(entries);
    } catch (error) {
      console.error('Error fetching journal data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await fetchData();
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // ===== FORM ACTIONS =====
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const newEntry = {
      date: today,
      perceivedLength: Number(perceivedLength),
      uniquePlaces: Number(uniquePlaces),
      newPeople: Number(newPeople),
      photoBursts: Number(photoBursts),
      taskSwitches: Number(taskSwitches),
      emotionMood: Number(emotionMood)
    };

    try {
      await saveJournalEntry(newEntry);
      // Automatically refresh data so hasLoggedToday updates immediately
      await refreshData();
      // Optionally clear form after successful submission
      clearForm();
    } catch (error) {
      console.error('Error saving journal entry:', error);
    }
  };

  const clearForm = () => {
    setPerceivedLength(50);
    setUniquePlaces(0);
    setNewPeople(0);
    setPhotoBursts(0);
    setTaskSwitches(0);
    setEmotionMood(1);
  };

  // ===== CONTEXT VALUE =====
  const value = {
    // Data reading (for home page, insights, etc.)
    data,
    loading,
    todayData,
    dayLengthText,
    hasLoggedToday,
    refreshData,

    // Form management (for log page)
    perceivedLength,
    setPerceivedLength,
    uniquePlaces,
    setUniquePlaces,
    newPeople,
    setNewPeople,
    photoBursts,
    setPhotoBursts,
    taskSwitches,
    setTaskSwitches,
    emotionMood,
    setEmotionMood,
    sliderLabel,
    handleSubmit,
    clearForm
  };

  return (
    <JournalContext.Provider value={value}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
}
