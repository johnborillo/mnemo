import Dexie from 'dexie';

// Create a new database instance
export const db = new Dexie('journalDB');

// Define schema
db.version(1).stores({
  days: `
    ++id,
    &date,
    perceivedLength,
    uniquePlaces,
    newPeople,
    newTopics,
    photoBursts,
    taskSwitches,
    mood,
    notes
  `
});
