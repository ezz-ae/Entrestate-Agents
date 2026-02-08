/**
 * Simple string similarity scorer (Levenshtein based or Dice's Coefficient)
 * to replicate the "Fuzzy Matching" logic for merging datasets.
 */
export function getStringSimilarity(s1: string, s2: string): number {
  let longer = s1.toLowerCase();
  let shorter = s2.toLowerCase();
  if (longer.length < shorter.length) {
    [longer, shorter] = [shorter, longer];
  }
  
  const longerLength = longer.length;
  if (longerLength === 0) return 1.0;

  return (longerLength - editDistance(longer, shorter)) / longerLength;
}

function editDistance(s1: string, s2: string): number {
  const costs: number[] = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

/**
 * The Final Handshake: Merges two data sources using Fuzzy Logic.
 */
export function mergeDatasets(buildings: any[], projects: any[], threshold = 0.80) {
  const stats = {
    exactMatches: 0,
    fuzzyMatches: 0,
    failures: 0
  };

  const merged = buildings.map(building => {
    const normalizedBuildingName = building.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // 1. Exact Matching
    let match = projects.find(p => p.name.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedBuildingName);
    
    if (match) {
      stats.exactMatches++;
    } else {
      // 2. Fuzzy Matching
      match = projects.find(p => getStringSimilarity(building.name, p.name) >= threshold);
      if (match) stats.fuzzyMatches++;
    }

    if (match) {
      return { ...building, ...match };
    }

    stats.failures++;
    return building;
  });

  return { merged, stats };
}
