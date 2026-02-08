export interface DeveloperHistory {
  id: string;
  name: string;
  delivered_units: number;
  on_time_percentage: number; // 0-100
  quality_rating: number; // 0-5
  market_cap_category: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Boutique';
}

export function calculateExecutionScore(history: DeveloperHistory): number {
  // Weighting logic for the 0-100 score
  const deliveryWeight = 0.4;
  const punctualityWeight = 0.3;
  const qualityWeight = 0.2;
  const tierWeight = 0.1;

  const normalizedDelivery = Math.min(history.delivered_units / 10000, 1) * 100;
  const normalizedPunctuality = history.on_time_percentage;
  const normalizedQuality = (history.quality_rating / 5) * 100;
  
  const tierScores: Record<string, number> = {
    'Tier 1': 100,
    'Tier 2': 80,
    'Tier 3': 60,
    'Boutique': 70
  };
  const normalizedTier = tierScores[history.market_cap_category] || 50;

  const score = (
    (normalizedDelivery * deliveryWeight) +
    (normalizedPunctuality * punctualityWeight) +
    (normalizedQuality * qualityWeight) +
    (normalizedTier * tierWeight)
  );

  return Math.round(score);
}

// Mock database of developers for the engine
export const DEVELOPER_PROFILES: Record<string, DeveloperHistory> = {
  'emaar': {
    id: 'emaar',
    name: 'Emaar Properties',
    delivered_units: 85000,
    on_time_percentage: 92,
    quality_rating: 4.8,
    market_cap_category: 'Tier 1'
  },
  'nakheel': {
    id: 'nakheel',
    name: 'Nakheel',
    delivered_units: 30000,
    on_time_percentage: 75,
    quality_rating: 4.0,
    market_cap_category: 'Tier 1'
  },
  'sobha': {
    id: 'sobha',
    name: 'Sobha Realty',
    delivered_units: 12000,
    on_time_percentage: 98,
    quality_rating: 4.9,
    market_cap_category: 'Tier 2'
  },
  'damac': {
    id: 'damac',
    name: 'DAMAC Properties',
    delivered_units: 42000,
    on_time_percentage: 80,
    quality_rating: 4.2,
    market_cap_category: 'Tier 1'
  }
};
