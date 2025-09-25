export function getDayOfWeek(dateStr, locale = "en-US") {
  const date = new Date(dateStr);
  
  // Fallback check in case invalid date is passed
  if (isNaN(date)) {
    throw new Error("Invalid date string");
  }

  return date.toLocaleDateString(locale, { weekday: "long" });
}
