/**
 * Statistical utility functions for data analysis
 */

/**
 * Compute basic statistics (mean and standard deviation) for a given key across days
 */
export function computeStats(days, key) {
  const values = days.map(d => d[key]).filter(v => !isNaN(v));
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
  return { mean, std: Math.sqrt(variance) };
}

/**
 * Calculate z-score (standard deviations from mean)
 */
export function z(value, mean, std) {
  if (std === 0) return 0;
  return (value - mean) / std;
}

/**
 * Compute novelty score for a day based on multiple factors
 */
export function computeNovelty(day, stats) {
  return (
    z(day.uniquePlaces, stats.places.mean, stats.places.std) +
    z(day.newPeople, stats.people.mean, stats.people.std) +
    z(day.photoBursts, stats.photos.mean, stats.photos.std) +
    z(day.taskSwitches, stats.switches.mean, stats.switches.std)
  );
}

/**
 * Calculate correlation coefficient between two arrays
 */
export function correlation(x, y) {
  const n = x.length;
  if (n === 0) return 0;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;
  const num = x.reduce((a, xi, i) => a + (xi - meanX) * (y[i] - meanY), 0);
  const den = Math.sqrt(
    x.reduce((a, xi) => a + (xi - meanX) ** 2, 0) *
    y.reduce((a, yi) => a + (yi - meanY) ** 2, 0)
  );
  return den === 0 ? 0 : num / den;
}

/**
 * Process raw days data and return all computed insights
 */
export function processDataForInsights(days) {
  // Calculate base statistics for all metrics
  const stats = {
    length: computeStats(days, "perceivedLength"),
    places: computeStats(days, "uniquePlaces"),
    people: computeStats(days, "newPeople"),
    photos: computeStats(days, "photoBursts"),
    switches: computeStats(days, "taskSwitches"),
    mood: computeStats(days, "mood")
  };

  // Enrich each day with novelty score
  const enriched = days.map(day => ({
    date: day.date,
    perceivedLength: day.perceivedLength,
    novelty: computeNovelty(day, stats),
    uniquePlaces: day.uniquePlaces,
    newPeople: day.newPeople,
    photoBursts: day.photoBursts,
    taskSwitches: day.taskSwitches,
    emotionMood: day.emotionMood
  }));

  // Calculate weekly summary (last 7 days)
  const last7 = enriched.slice(0, 7); // already reversed
  const avgLength = last7.reduce((a, d) => a + d.perceivedLength, 0) / (last7.length || 1);
  const corr = correlation(
    last7.map(d => d.novelty),
    last7.map(d => d.perceivedLength)
  );

  // Calculate top drivers for the week
  const driverScores = {
    places: z(last7.reduce((a, d) => a + d.uniquePlaces, 0) / (last7.length || 1), stats.places.mean, stats.places.std),
    people: z(last7.reduce((a, d) => a + d.newPeople, 0) / (last7.length || 1), stats.people.mean, stats.people.std),
    photos: z(last7.reduce((a, d) => a + d.photoBursts, 0) / (last7.length || 1), stats.photos.mean, stats.photos.std),
    switches: z(last7.reduce((a, d) => a + d.taskSwitches, 0) / (last7.length || 1), stats.switches.mean, stats.switches.std),
  };

  const sortedDrivers = Object.entries(driverScores)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, 2);

  return {
    enriched,
    weeklyStats: {
      avgLength,
      correlation: corr,
      sortedDrivers
    }
  };
}
