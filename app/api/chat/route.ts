import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { findProjects, SearchFilters } from '@/lib/engine/filters';
import { runWhatIfAnalysis } from '@/lib/engine/reasoning';
import { hybridSearch } from '@/lib/engine/vector';
import { ScenarioType } from '@/lib/engine/scenarios';
import { InventoryNode } from '@/lib/engine/types';
import inventoryData from '@/public/data/inventory.json';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-1.5-flash'),
    messages,
    system: `You are the Entrestate Senior Investment Director and Behavioral Specialist. 
    Your mission is to guide users through the "Entrestate Money Printer" using the Behavioral Monetization Engine (BME).
    
    Behavioral Mandates:
    - Never be passive. Inactivity is a failure.
    - Use "Truth Framing": Make the cost of "not knowing" psychologically unbearable.
    - Apply the 4-Stage Narrative Template for all asset discussions:
      1. What You See: Surface data.
      2. What You’re Missing: The "Nuclear" data gap (e.g., High Premium >50%).
      3. What Breaks Without It: Consequences (e.g., Fed Rate Hike collapse).
      4. What Changes After Activation: The relief/shield.
    
    Linguistic Anchors:
    - Replace "Package" with "Completeness."
    - Use "Complete Setup" (Active/Safe) vs "Stay Partial" (Passive/Vulnerable).
    - Reframing purchase as "Activate Intelligence Shield."
    
    Truth Hierarchy:
    - Layer 1: Static Truths (Baseline).
    - Layer 2: Dynamic Truths (Momentum).
    - Layer 3: Derived Truths (Intelligence).
    - Layer 4: Identity Kernel (DNA).
    - Layer 5: Decision Ready (Binary Signal).
    
    Always follow the "Think → Explain → Answer" contract. Predictive intelligence is dominance.`,
    tools: {
      find_projects: tool({
        description: 'Search for real estate projects based on metadata filters',
        parameters: z.object({
          budget_max: z.number().optional(),
          city: z.string().optional(),
          area: z.string().optional(),
          ready_now: z.boolean().optional(),
          safe_yield: z.boolean().optional(),
          min_score: z.number().optional().description('Minimum investment score (0-100)'),
        }),
        execute: async (filters: SearchFilters & { min_score?: number }) => {
          let projects = findProjects(inventoryData as InventoryNode[], filters);
          if (filters.min_score) {
            projects = projects.filter(p => (p.derived_investment_score || 0) >= filters.min_score!);
          }
          return projects;
        },
      }),
      list_agents: tool({
        description: 'List available expert agents and templates',
        parameters: z.object({}),
        execute: async () => {
          return {
            ready_agents: ['Investment Advisor', 'Caller Qualification', 'Sales Follow-Up', 'Listing Intelligence'],
            builder_url: '/agents/builder'
          };
        },
      }),
      semantic_search: tool({
        description: 'Search for projects based on semantic meaning or intent',
        parameters: z.object({
          query: z.string(),
          filters: z.string().optional().description('Upstash metadata filter string (e.g., "price_from_aed < 2000000")'),
        }),
        execute: async ({ query, filters }) => {
          const results = await hybridSearch(query, filters);
          return results;
        },
      }),
      run_scenario: tool({
        description: 'Run a "what if" market scenario analysis',
        parameters: z.object({
          scenario: z.enum([
            'fed_rate_hike', 'fed_rate_cut', 'global_recession', 'oil_boom',
            'regional_instability', 'capital_flight_to_uae', 'russia_sanctions',
            'golden_visa_expansion', 'escrow_enforcement', 'rera_price_controls',
            'material_shortage', 'expo_hangover', 'population_surge'
          ] as [string, ...string[]]),
        }),
        execute: async ({ scenario }) => {
          const analysis = runWhatIfAnalysis(inventoryData as InventoryNode[], scenario as ScenarioType);
          return analysis;
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
