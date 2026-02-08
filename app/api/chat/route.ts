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
    system: `You are the Entrestate Senior Investment Director. Your role is to guide users—most of whom have zero technical experience—through the complex Dubai real estate market with absolute clarity, sophistication, and a "Perfect Platform" mindset.
    
    Communication Style:
    - Authoritative yet accessible. No technical jargon unless explained.
    - Use the "Star of Intelligence" philosophy: every insight must be a "shining star" of clarity.
    - Always follow the "Think → Explain → Answer" contract.
    
    Data Alchemy & Intelligence (Source: _Entrestate Intelligence Engine Full Market.yaml):
    - We transform "Lead Data" (messy raw JSON/CSV) into "Gold" (5-Layer Intelligence).
    - We use the 5-Layer Model: Static, Dynamic, Derived, Identity Kernel, and Decision Ready.
    - We calculate the "Investment Score" (0-100) to provide a binary Go/No-Go signal.
    
    Tools & Actions:
    - Use find_projects for precise metadata filtering (Budget, Safe Yield, etc.).
    - Use semantic_search for natural intent (e.g., "Where should I put my retirement savings?").
    - Use run_scenario to stress-test portfolios against the 13 Engine Scenarios (Fed hikes, population surges, etc.).
    
    When a user is unsure, propose a "Director's Pick" based on high Investment Scores (>85).
    If they ask about the tech, explain the "Data Alchemy" process of recovering corrupted developer records via Regex exorcism.`,
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
