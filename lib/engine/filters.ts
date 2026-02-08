import { InventoryNode } from './types';

export interface SearchFilters {
  budget_max?: number;
  budget_min?: number;
  city?: string;
  area?: string;
  developer_id?: string;
  ready_now?: boolean;
  safe_yield?: boolean;
  high_risk_high_return?: boolean;
  flip_opportunity?: boolean;
  market_discount?: boolean;
}

export function findProjects(inventory: InventoryNode[], filters: SearchFilters): InventoryNode[] {
  return inventory.filter(node => {
    // Budget check
    if (filters.budget_max && node.price_from_aed && node.price_from_aed > filters.budget_max) return false;
    if (filters.budget_min && node.price_from_aed && node.price_from_aed < filters.budget_min) return false;

    // Location check
    if (filters.city && node.city.toLowerCase() !== filters.city.toLowerCase()) return false;
    if (filters.area && node.area.toLowerCase() !== filters.area.toLowerCase()) return false;

    // Developer check
    if (filters.developer_id && node.developer?.toLowerCase() !== filters.developer_id.toLowerCase()) return false;

    // Decision Flag checks (Corrected Safe Yield Logic: <2M AED, Known Dev, <1yr handover)
    if (filters.safe_yield) {
      const isKnownDev = ['emaar', 'nakheel', 'sobha', 'damac'].includes(node.developer?.toLowerCase() || '');
      const isPriceSafe = (node.price_from_aed || 0) < 2000000;
      const isHandoverSoon = (node.dynamic_years_to_handover || 0) <= 1 || node.decision_flags.flag_ready_now;
      
      if (!(isKnownDev && isPriceSafe && isHandoverSoon)) return false;
    }

    if (filters.ready_now && !node.decision_flags.flag_ready_now) return false;
    if (filters.high_risk_high_return && !node.decision_flags.flag_high_risk_high_return) return false;
    if (filters.flip_opportunity && !node.decision_flags.flag_flip_opportunity) return false;
    if (filters.market_discount && !node.decision_flags.flag_market_discount) return false;

    return true;
  });
}
