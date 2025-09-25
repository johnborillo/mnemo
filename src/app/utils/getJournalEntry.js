import { db } from "@/lib/db";

export async function getJournalEntry(limit) {
  try {
    const response = await db.days
    .orderBy('date')
    .reverse()
    .limit(limit || 1000)
    .toArray();
    return response;
  } catch (error) {
    console.error("Failed to fetch journal entry:", error);
    return null;
  }
}