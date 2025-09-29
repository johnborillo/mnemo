export function getDayOfWeek(dateStr, locale = "en-US") {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  // Fallback check in case invalid date is passed
  if (isNaN(date)) {
    throw new Error("Invalid date string");
  }

  return date.toLocaleDateString(locale, { weekday: "long" });
}