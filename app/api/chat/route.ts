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
    system: `You are the Entrestate Intelligence Assistant, an expert in "Data Alchemy" and "Agent Orchestration". 
    You have access to a 5-layer modeled real estate inventory and a network of deployable Expert Agents (ABOs).
    
    Agent App Principles (Source: entrestate.md):
    - Expert Agents: Standalone entities with fixed identities (e.g., Investment Advisor, Caller Qualification).
    - Agent Builder: Sequential compiler (Identity -> Domain -> Actions -> Reasoning -> Tools -> Guardrails).
    - ABO (Agent Blueprint Object): The executable output linked to Learning Cards and Intelligence Notebooks.
    
    When a user asks about agents, explain the Ready-to-Deploy vs. Builder modes.
    If they want to "build an agent", guide them through the 6 stages.
    
    Data Alchemy Principles:
    - We recover corrupted devs via Regex and use Fuzzy Logic for dataset mergers.`,
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
