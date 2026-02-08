import { InventoryNode } from './types';
import { ScenarioType, SCENARIO_TEMPLATES, ScenarioImpact } from './scenarios';

export interface ReasoningResult {
  scenario: ScenarioImpact;
  affected_nodes: {
    node_id: string;
    impact_score: number; // -100 to 100
    impact_narrative: string;
  }[];
  recommendation: string;
}

export function runWhatIfAnalysis(
  inventory: InventoryNode[],
  scenarioType: ScenarioType
): ReasoningResult {
  const scenario = SCENARIO_TEMPLATES[scenarioType];
  
  const affected_nodes = inventory.map(node => {
    let impact_score = 0;
    let impact_narrative = '';

    switch (scenarioType) {
      case 'fed_rate_hike':
        if (node.decision_flags.flag_ready_now) {
          impact_score = 20;
          impact_narrative = 'Ready units are favored by cash buyers as mortgage costs rise.';
        } else if (node.dynamic_years_to_handover && node.dynamic_years_to_handover > 3) {
          impact_score = -30;
          impact_narrative = 'Long-term off-plan projects face decreased demand from leveraged investors.';
        }
        break;

      case 'population_surge':
        if (node.derived_buyer_persona === 'End User' || node.derived_buyer_persona === 'Yield Seeker') {
          impact_score = 40;
          impact_narrative = 'Increased population drives sustainable rental demand and end-user occupancy.';
        }
        break;

      case 'global_recession':
        if (node.derived_risk_class === 'Conservative') {
          impact_score = 10;
          impact_narrative = 'Flight to quality favors low-risk, established assets.';
        } else if (node.derived_risk_class === 'Speculative') {
          impact_score = -50;
          impact_narrative = 'Speculative assets lose liquidity rapidly in a global downturn.';
        }
        break;

      // ... other scenarios can be implemented here
      default:
        impact_score = 0;
        impact_narrative = 'Standard market adjustment expected.';
    }

    return {
      node_id: node.id,
      impact_score,
      impact_narrative
    };
  }).filter(n => n.impact_score !== 0);

  return {
    scenario,
    affected_nodes: affected_nodes.sort((a, b) => b.impact_score - a.impact_score),
    recommendation: `Based on the ${scenarioType} scenario, focus on assets with high capital efficiency and positive impact scores.`
  };
}
