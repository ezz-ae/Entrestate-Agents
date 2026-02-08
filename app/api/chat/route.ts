import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { findProjects } from '@/lib/engine/filters';
import { runWhatIfAnalysis } from '@/lib/engine/reasoning';
import { hybridSearch } from '@/lib/engine/vector';
import { InventoryNode } from '@/lib/engine/types';
import { ScenarioType } from '@/lib/engine/scenarios';
import inventoryData from '@/public/data/inventory.json';

export const maxDuration = 30;

type ChatMessage = { role: 'user' | 'system' | 'assistant'; content: string };

// Define each tool return type
type FindProjectsResult = InventoryNode[];
type ListAgentsResult = { ready_agents: string[]; builder_url: string };
type SemanticSearchResult = Awaited<ReturnType<typeof hybridSearch>>;
type RunScenarioResult = ReturnType<typeof runWhatIfAnalysis>;

export async function POST(req: Request) {
  const { messages }: { messages: ChatMessage[] } = await req.json();

  const result = await streamText({
    model: google('gemini-1.5-flash'),
    messages,
    system: `You are the Entrestate Senior Investment Director and Behavioral Specialist. 
      Guide users through the "Entrestate Money Printer" using the Behavioral Monetization Engine (BME).`,
    tools: {
      find_projects: tool({
        description: 'Search for real estate projects based on metadata filters',
        parameters: z.object({
          budget_max: z.number().optional(),
          city: z.string().optional(),
          area: z.string().optional(),
          ready_now: z.boolean().optional(),
          safe_yield: z.boolean().optional(),
          min_score: z.number().optional(),
        }),
        execute: async (params) => {
          let projects = findProjects(inventoryData as InventoryNode[], params);
          if (params.min_score !== undefined) {
            const min_score = params.min_score;
            projects = projects.filter(p => (p.derived_investment_score ?? 0) >= min_score);
          }
          return projects;
        },
      }),
      list_agents: tool({
        description: 'List available expert agents and templates',
        parameters: z.object({}),
        execute: async () => ({
          ready_agents: ['Investment Advisor', 'Caller Qualification', 'Sales Follow-Up', 'Listing Intelligence'],
          builder_url: '/agents/builder',
        }),
      }),
      semantic_search: tool({
        description: 'Search for projects based on semantic meaning or intent',
        parameters: z.object({
          query: z.string(),
          filters: z.string().optional(),
        }),
        execute: async (params) => {
          const results = await hybridSearch(params.query, params.filters);
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
          ]),
        }),
        execute: async (params) => {
          const analysis = runWhatIfAnalysis(inventoryData as InventoryNode[], params.scenario as ScenarioType);
          return analysis;
        },
      }),
    },
  });

  if (result?.toTextStreamResponse) {
    return result.toTextStreamResponse();
  }

  throw new Error('Failed to generate stream response from AI model.');
}
