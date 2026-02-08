import { NextRequest, NextResponse } from 'next/server';
import { AgentBlueprintObject } from '@/lib/engine/types';

/**
 * API Endpoint for Agent Builder Operations
 * Handles Compilation and Retrieval of ABOs
 */

export async function POST(req: NextRequest) {
  try {
    const blueprint: AgentBlueprintObject = await req.json();

    // Enforce Epistemic Rules (Source: entrestate.md)
    if (!blueprint.identity.name || !blueprint.identity.role) {
      return NextResponse.json({ error: 'Identity must have a Name and Role.' }, { status: 400 });
    }

    if (!blueprint.authority.primaryDomain) {
      return NextResponse.json({ error: 'Domain Authority is mandatory.' }, { status: 400 });
    }

    // Logic for linking to Learning Card (Training Data Source: Intelligence Notebook)
    const compilationId = `abo-${Date.now()}`;
    const finalizedABO = {
      ...blueprint,
      id: compilationId,
      version: '1.0.0',
      metadata: {
        ...blueprint.metadata,
        compiledAt: new Date().toISOString(),
        status: 'executable'
      }
    };

    // In a production app, we would save this to Supabase here.
    return NextResponse.json({
      message: 'Agent Blueprint Compiled Successfully',
      abo: finalizedABO
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to compile Agent Blueprint.' }, { status: 500 });
  }
}

export async function GET() {
  // Returns templates for cloning (Mode B in entrestate.md)
  const templates = [
    { id: 'template-advisor', name: 'Investment Strategist Template' },
    { id: 'template-qualifier', name: 'Lead Screener Template' }
  ];
  return NextResponse.json(templates);
}
