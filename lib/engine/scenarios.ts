export type ScenarioType = 
  | 'fed_rate_hike' | 'fed_rate_cut' | 'global_recession' | 'oil_boom'
  | 'regional_instability' | 'capital_flight_to_uae' | 'russia_sanctions'
  | 'golden_visa_expansion' | 'escrow_enforcement' | 'rera_price_controls'
  | 'material_shortage' | 'expo_hangover' | 'population_surge';

export interface ScenarioImpact {
  winners: string;
  losers: string;
  market_sentiment: 'Bullish' | 'Bearish' | 'Neutral' | 'Volatile';
  description: string;
}

export const SCENARIO_TEMPLATES: Record<ScenarioType, ScenarioImpact> = {
  fed_rate_hike: {
    winners: 'Cash-ready investors, ready-to-move-in properties',
    losers: 'Leveraged flippers, off-plan projects with long handovers',
    market_sentiment: 'Neutral',
    description: 'Higher borrowing costs reduce mortgage demand but favor liquidity-rich buyers.'
  },
  fed_rate_cut: {
    winners: 'Mortgage buyers, luxury villa segments',
    losers: 'High-yield savings accounts',
    market_sentiment: 'Bullish',
    description: 'Lower rates stimulate borrowing and increase asset valuations.'
  },
  global_recession: {
    winners: 'Safe-haven assets, high-yield ready apartments',
    losers: 'Speculative off-plan, ultra-luxury niche',
    market_sentiment: 'Bearish',
    description: 'Reduced global liquidity leads to flight-to-quality in stable markets like Dubai.'
  },
  oil_boom: {
    winners: 'Government-backed developers, infrastructure-heavy areas',
    losers: 'None (broad market lift)',
    market_sentiment: 'Bullish',
    description: 'Increased regional liquidity spills over into real estate and infrastructure.'
  },
  regional_instability: {
    winners: 'Dubai (Safe Haven effect), ready properties',
    losers: 'Tourism-dependent short-term rentals',
    market_sentiment: 'Volatile',
    description: 'Capital flight from unstable regions seeks refuge in Dubai’s regulatory safety.'
  },
  capital_flight_to_uae: {
    winners: 'Luxury segment, branded residences',
    losers: 'Low-end affordable housing (relatively)',
    market_sentiment: 'Bullish',
    description: 'Inflow of global UHNW capital drives up premium property prices.'
  },
  russia_sanctions: {
    winners: 'Waterfront properties, Palm Jumeirah, Dubai Marina',
    losers: 'Mainland industrial (relatively)',
    market_sentiment: 'Bullish',
    description: 'Specific geopolitical shifts drive massive localized demand in premium sectors.'
  },
  golden_visa_expansion: {
    winners: 'Secondary market, family-oriented villas',
    losers: 'Short-term speculative flips',
    market_sentiment: 'Bullish',
    description: 'Long-term residency incentivizes "End User" behavior over speculation.'
  },
  escrow_enforcement: {
    winners: 'Tier 1 Developers, institutional investors',
    losers: 'Small/New developers with weak balance sheets',
    market_sentiment: 'Neutral',
    description: 'Tighter regulation increases buyer confidence but weeds out smaller players.'
  },
  rera_price_controls: {
    winners: 'Tenants, long-term yield seekers',
    losers: 'Aggressive rental flippers',
    market_sentiment: 'Neutral',
    description: 'Stabilizes market but may limit peak ROI for aggressive landlords.'
  },
  material_shortage: {
    winners: 'Ready properties, owners of existing inventory',
    losers: 'Developers with tight margins, off-plan buyers (delays)',
    market_sentiment: 'Volatile',
    description: 'Supply chain disruptions increase replacement costs and ready-unit premiums.'
  },
  expo_hangover: {
    winners: 'Logistics hubs, South Dubai long-term',
    losers: 'Short-term event-driven rentals',
    market_sentiment: 'Neutral',
    description: 'Transition from event-hosting to permanent infrastructure utilization.'
  },
  population_surge: {
    winners: 'Affordable luxury, mid-market apartments, schools/clinics proximity',
    losers: 'Remote/Isolated speculative land',
    market_sentiment: 'Bullish',
    description: 'Organic demand from new residents drives sustainable rental growth.'
  }
};
