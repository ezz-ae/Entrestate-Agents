import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { signal, context, timestamp } = await req.json();

    // Log the behavioral signal to the Omni-Intelligence layer
    await prisma.eventLog.create({
      data: {
        eventType: signal,
        data: context,
        confidence: 1.0, // Initial confidence is high for direct interaction
        timestamp: new Date(timestamp),
        // userId: '...', // Extracted from auth in production
        agentId: 'meta-agent-orchestrator' 
      }
    });

    return NextResponse.json({ status: 'Logged' });
  } catch (error) {
    console.error('BME Logging Error:', error);
    return NextResponse.json({ error: 'Failed to log event' }, { status: 500 });
  }
}
