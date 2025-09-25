import { db } from "@/lib/db";
export default async function saveJournalEntry(entry) {
  try {
    await db.days.put(entry);
    console.log("Journal entry saved:", entry);
  } catch (error) {
    console.error("Failed to save journal entry:", error);
  }
}
  