// Layer 1: Static Truths (The Immutable Base) - Unified 17-Column Schema
export interface StaticTruths {
  building_id: number;
  name: string;
  url_slug: string;
  city: string;
  public_url: string;
  stock_updated_at: string | Date;
  is_on_sale: boolean;
  tags: string; // Flattened
  project_id: string;
  developer: string;
  area: string;
  price_from_aed: number | null;
  bedrooms_min: number | null;
  bedrooms_max: number | null;
  launch_year: number | null;
  completion_year: number | null;
  description: string; // Project Brief
}

// Layer 2: Dynamic Truths (The Evolving State)
export type DeliveryConfidence = 'Delivered' | 'High (1yr)' | 'Medium (2-3yr)' | 'Low (4yr+)' | 'Speculative (6yr+)';

export interface DynamicTruths {
  dynamic_years_to_handover: number | null;
  dynamic_delivery_confidence: DeliveryConfidence;
  dynamic_price_pressure: 'Upward' | 'Stable' | 'Downward' | 'Unknown';
  dynamic_absorption: 'Active' | 'Passive';
  dynamic_last_activity: string | Date | null;
}

// Layer 3: Derived Truths (The Analytical Layer)
export type ConstructionLifecycle = 'Pre-Launch' | 'Early Construction' | 'Mid-Construction' | 'Pre-Handover' | 'Post-Handover';

export interface DerivedTruths {
  derived_buyer_persona: 'Yield Seeker' | 'Flipper' | 'End User' | 'Portfolio Builder' | 'UHNW';
  derived_risk_class: 'Conservative' | 'Moderate' | 'Aggressive' | 'Speculative';
  derived_holding_logic: 'Yield' | 'Flip' | 'Occupy' | 'Hybrid';
  derived_capital_efficiency: number; // 0-100 Score
  derived_liquidity_timeline: 'Immediate (Ready)' | 'Near-term (6-12mo)' | 'Short (1-2yr)' | 'Medium (2-4yr)' | 'Long (4yr+)';
  
  // New Analytics Fields from Primer
  derived_ppb: number | null; // Price Per Bedroom
  derived_construction_lifecycle: ConstructionLifecycle;
  derived_price_momentum: number; // % deviation from cohort median
  derived_investment_score: number; // 0-100 composite
}

// --- Agent App & Builder Types (Source: entrestate.md) ---

export type AgentDomain = 
  | 'Inventory & Pricing' 
  | 'Investment & ROI' 
  | 'Lead Qualification' 
  | 'Marketing & Ads' 
  | 'Contracts & Legal';

export type AgentAction = 
  | 'Make Calls' 
  | 'Send SMS' 
  | 'Draft Documents' 
  | 'Update Projects' 
  | 'Trigger Commands' 
  | 'Schedule Tasks';

export interface AgentBlueprintObject {
  id: string;
  version: string;
  identity: {
    name: string;
    role: string;
    context: 'Sales' | 'Investment' | 'Support' | 'Operations';
    persona: {
      voice: string;
      accent: string;
      sound: string;
    };
  };
  authority: {
    primaryDomain: AgentDomain;
    secondaryDomain?: AgentDomain;
  };
  actions: {
    rights: AgentAction[];
    confidenceThreshold: number; // 0.0 - 1.0
    failureBehavior: 'Defer' | 'Notify' | 'Freeze';
  };
  reasoningContract: {
    mode: 'Think-Explain-Answer';
    enforceCalculationMethod: boolean;
  };
  bindings: {
    tools: string[]; // e.g., ['Inventory Engine', 'Lead Pipeline']
  };
  guardrails: {
    killSwitchEnabled: boolean;
    restrictedActions: string[];
  };
  metadata: {
    linkedLearningCardId?: string;
    sourceNotebookId?: string;
  };
}

// Layer 4 & 5: Kernel and Decision Engine
export interface InventoryNode extends StaticTruths, DynamicTruths, DerivedTruths {
  id: string; // url_slug
  kernel_identity: string; // Generated narrative
  kernel_problem_solved: 'Cash Flow Generation' | 'Capital Appreciation' | 'Wealth Preservation' | 'Lifestyle';
  
  decision_flags: {
    flag_high_risk_high_return: boolean;
    flag_safe_yield: boolean;
    flag_flip_opportunity: boolean;
    flag_market_discount: boolean;
    flag_ready_now: boolean;
  };
}

// Canonical Expert Agents (Initial Set)
export const CANONICAL_AGENTS: Partial<AgentBlueprintObject>[] = [
  {
    id: 'agent-investment-advisor',
    identity: { name: 'Investment Advisor', role: 'Portfolio Strategist', context: 'Investment', persona: { voice: 'Professional', accent: 'British', sound: 'Corporate' }},
    authority: { primaryDomain: 'Investment & ROI', secondaryDomain: 'Inventory & Pricing' },
    actions: { rights: ['Draft Documents', 'Schedule Tasks'], confidenceThreshold: 0.9, failureBehavior: 'Defer' }
  },
  {
    id: 'agent-caller-qualifier',
    identity: { name: 'Caller Qualification', role: 'Lead Screener', context: 'Sales', persona: { voice: 'Friendly', accent: 'Neutral', sound: 'Mobile' }},
    authority: { primaryDomain: 'Lead Qualification' },
    actions: { rights: ['Make Calls', 'Trigger Commands'], confidenceThreshold: 0.8, failureBehavior: 'Notify' }
  }
];
