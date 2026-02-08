import { z } from 'zod';
import { DeliveryConfidence } from './types';

const DEVELOPER_NOISE_REGEX = /^(s|at\s|in\s|background-size|aspect-ratio|cover|px|rem)/i;
const CITY_DEVELOPER_BLOCKLIST = ['dubai', 'sharjah', 'abu dhabi', 'ajman', 'rak', 'uae'];

const DEV_RECOVERY_URL_REGEX = /\/developer\/([^/]+)\//;
const DEV_RECOVERY_DESC_REGEX = /(?:developed by|by)\s+([A-Z][A-Za-z\s&]+?)(?:\s+is\b|\s+in\b|\.|,|\s+offers)/i;

/**
 * The CSS Exorcism: Recovers developer names from corrupted records
 * using URL slugs or project descriptions.
 */
export function recoverDeveloperName(node: any): string | null {
  const currentDev = node.developer || node.static_developer_id;
  
  // If dev name is not noisy, return it
  if (currentDev && !DEVELOPER_NOISE_REGEX.test(currentDev)) {
    return currentDev;
  }

  // Attempt recovery from public_url or url_slug
  const urlSource = node.public_url || node.url_slug || "";
  const urlMatch = urlSource.match(DEV_RECOVERY_URL_REGEX);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1].replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
  }

  // Attempt recovery from description
  const descSource = node.description || "";
  const descMatch = descSource.match(DEV_RECOVERY_DESC_REGEX);
  if (descMatch && descMatch[1]) {
    return descMatch[1].trim();
  }

  return null;
}

/**
 * The Location Standardizer: Splits area strings and normalizes geography.
 */
export function standardizeLocation(locationStr: string): { city: string; area: string } {
  // Handles "Uae Dubai - Downtown" or "uae-dubai"
  const cleanStr = locationStr.replace(/^uae\s*/i, '').trim();
  const parts = cleanStr.split(/[-|]/).map(p => p.trim());
  
  if (parts.length >= 2) {
    return {
      city: parts[0].replace(/\b\w/g, (l: string) => l.toUpperCase()),
      area: parts[1].replace(/\b\w/g, (l: string) => l.toUpperCase())
    };
  }

  return {
    city: "Dubai", // Default fallback
    area: cleanStr.replace(/\b\w/g, (l: string) => l.toUpperCase())
  };
}

export const inventoryNodeSchema = z.object({
  // Layer 1
  building_id: z.number().optional(),
  name: z.string(),
  url_slug: z.string(),
  city: z.string(),
  developer: z.string().nullable().refine((val) => {
    if (!val) return true;
    if (DEVELOPER_NOISE_REGEX.test(val)) return false;
    if (CITY_DEVELOPER_BLOCKLIST.includes(val.toLowerCase())) return false;
    return true;
  }, { message: "Invalid developer name/noise detected" }),
  area: z.string(),
  price_from_aed: z.number().nullable().refine((val) => {
    if (!val) return true;
    return val >= 1000 && val <= 100000000;
  }, { message: "Price outlier detected" }),
  launch_year: z.number().nullable().refine((val) => {
    if (!val) return true;
    return val >= 2000 && val <= 2035;
  }, { message: "Launch year out of bounds" }),
  completion_year: z.number().nullable().refine((val) => {
    if (!val) return true;
    return val >= 2000 && val <= 2035;
  }, { message: "Completion year out of bounds" }),
  description: z.string().optional(),

  // Layer 2
  dynamic_years_to_handover: z.number().nullable(),
  dynamic_delivery_confidence: z.enum(['Delivered', 'High (1yr)', 'Medium (2-3yr)', 'Low (4yr+)', 'Speculative (6yr+)'] as const),
  dynamic_price_pressure: z.enum(['Upward', 'Stable', 'Downward', 'Unknown']),
  dynamic_absorption: z.enum(['Active', 'Passive']),
  dynamic_last_activity: z.union([z.string(), z.date()]).nullable(),

  // Layer 3
  derived_buyer_persona: z.enum(['Yield Seeker', 'Flipper', 'End User', 'Portfolio Builder', 'UHNW']),
  derived_risk_class: z.enum(['Conservative', 'Moderate', 'Aggressive', 'Speculative']),
  derived_holding_logic: z.enum(['Yield', 'Flip', 'Occupy', 'Hybrid']),
  derived_capital_efficiency: z.number().min(0).max(100),
  derived_liquidity_timeline: z.enum(['Immediate (Ready)', 'Near-term (6-12mo)', 'Short (1-2yr)', 'Medium (2-4yr)', 'Long (4yr+)']),

  // Layer 4 & 5
  id: z.string(),
  kernel_identity: z.string(),
  kernel_problem_solved: z.enum(['Cash Flow Generation', 'Capital Appreciation', 'Wealth Preservation', 'Lifestyle']),
  
  decision_flags: z.object({
    flag_high_risk_high_return: z.boolean(),
    flag_safe_yield: z.boolean(),
    flag_flip_opportunity: z.boolean(),
    flag_market_discount: z.boolean(),
    flag_ready_now: z.boolean(),
  }),
});

export type ValidatedInventoryNode = z.infer<typeof inventoryNodeSchema>;

export function sanitizeInventoryData(data: any[]): ValidatedInventoryNode[] {
  return data.map(node => {
    const result = inventoryNodeSchema.safeParse(node);
    if (!result.success) {
      console.warn(`Skipping invalid node ${node.id || 'unknown'}:`, result.error.format());
      return null;
    }
    return result.data;
  }).filter((node): node is ValidatedInventoryNode => node !== null);
}
