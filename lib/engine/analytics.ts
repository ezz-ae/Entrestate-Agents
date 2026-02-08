import { InventoryNode, ConstructionLifecycle } from './types';
import { DEVELOPER_PROFILES, calculateExecutionScore } from './developer-profiles';

/**
 * Calculates Price Per Bedroom (PPB)
 * Studios are treated as 1-unit denominator for conservative density modeling.
 */
export function calculatePPB(price: number | null, bedrooms: number | null): number | null {
  if (!price) return null;
  const denominator = Math.max(bedrooms || 1, 1);
  return price / denominator;
}

/**
 * Determines Construction Lifecycle based on completion year and current year.
 */
export function getLifecycleState(completionYear: number | null, launchYear: number | null): ConstructionLifecycle {
  const currentYear = new Date().getFullYear();
  if (!completionYear) return 'Pre-Launch';
  if (completionYear <= currentYear) return 'Post-Handover';
  if (completionYear - currentYear <= 1) return 'Pre-Handover';
  
  if (launchYear && currentYear - launchYear <= 1) return 'Early Construction';
  return 'Mid-Construction';
}

/**
 * Calculates the Investment Score (0-100) based on the Primer logic.
 */
export function calculateInvestmentScore(node: InventoryNode, cohortMedianPPB: number): number {
  let score = 50; // Baseline

  // 1. Price vs. Cohort (+20 Points max)
  const ppb = node.derived_ppb || 0;
  if (ppb > 0) {
    const deviation = ((ppb - cohortMedianPPB) / cohortMedianPPB) * 100;
    if (deviation < -20) score += 20; // Discount/Deep Discount
    else if (deviation < 0) score += 10; // Below Average
    else if (deviation > 50) score -= 20; // High Premium
  }

  // 2. Time to Handover (+15 Points max)
  const yearsToHandover = node.dynamic_years_to_handover || 0;
  if (yearsToHandover >= 1 && yearsToHandover <= 3) {
    score += 15;
  } else if (yearsToHandover > 5) {
    score -= 10;
  }

  // 3. Safety Bonus (Execution Score)
  const devProfile = DEVELOPER_PROFILES[node.developer?.toLowerCase() || ''];
  if (devProfile) {
    const executionScore = calculateExecutionScore(devProfile);
    score += (executionScore / 100) * 15; // Max 15 points
  }

  return Math.min(Math.max(Math.round(score), 0), 100);
}

/**
 * Groups projects and calculates medians for PPB by completion year.
 */
export function calculateCohortMedians(inventory: InventoryNode[]): Record<number, number> {
  const cohorts: Record<number, number[]> = {};
  
  inventory.forEach(node => {
    const year = node.completion_year || 0;
    if (year === 0) return;
    if (!cohorts[year]) cohorts[year] = [];
    if (node.derived_ppb) cohorts[year].push(node.derived_ppb);
  });

  const medians: Record<number, number> = {};
  Object.entries(cohorts).forEach(([year, ppbs]) => {
    const sorted = ppbs.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    medians[parseInt(year)] = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  });

  return medians;
}

/**
 * Generates the "Alchemist's Workshop" Transformation Log.
 */
export function getTransformationLog(
  rawCount: number,
  corruptedDevs: number,
  recoveredDevs: number,
  matchedOverlaps: number,
  finalIntelPool: number,
  safeYieldOpportunities: number
) {
  return `
TRANSFORMATION LOG: FINAL WINS
------------------------------------------------------------
• CORRUPTED DEVS: ${corruptedDevs} records detected and filtered.
• NAMES RECOVERED: ${recoveredDevs} valid developers saved via Regex.
• MATCHED OVERLAPS: ${matchedOverlaps} buildings perfectly unified with project data.
• TOTAL INTEL POOL: ${finalIntelPool} unique properties available for analysis.
• LOGIC FIX: Loosened criteria recovered ${safeYieldOpportunities} Safe Yield opportunities.
• SCENARIO ENGINE: Enabled what_if() logic for interest rate and market shifts.
------------------------------------------------------------
  `.trim();
}
