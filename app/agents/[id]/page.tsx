'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bot, Phone, MessageSquare, Play, Pause, Settings, Zap } from 'lucide-react';
import { Label } from '@/components/ui/label';

export default function AgentPanelPage({ params }: { params: { id: string } }) {
  // Mock agent data (in real app, fetch from Prisma)
  const agent = {
    id: params.id,
    name: "Nexus Strategy Advisor",
    role: "Investment Portfolio Analyst",
    status: "active",
    domain: "Investment & ROI",
    actions: ["Draft Documents", "Schedule Tasks", "Make Calls"],
    confidence: 0.92,
    persona: "Professional British Male",
  };

  return (
    <div className="container py-10 space-y-8">
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{agent.name}</h1>
            <p className="text-muted-foreground">{agent.role}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon"><Settings className="w-4 h-4" /></Button>
          {agent.status === 'active' ? (
            <Button variant="secondary"><Pause className="w-4 h-4 mr-2" /> Pause Agent</Button>
          ) : (
            <Button><Play className="w-4 h-4 mr-2" /> Activate Agent</Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 border-2 border-primary bg-primary/5">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-black tracking-tighter uppercase">Intelligence Shield: ACTIVE</CardTitle>
              <Badge className="bg-primary animate-pulse">DIRECTOR LEVEL</Badge>
            </div>
            <CardDescription className="italic text-xs">"Proactive mitigation of unmanaged capital exposure."</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="p-4 bg-background rounded-lg border-l-4 border-destructive">
              <p className="text-[10px] font-black text-destructive uppercase tracking-widest mb-1">NUCLEAR DATA GAP DETECTED</p>
              <p className="text-sm font-bold">Your Portfolio vulnerability to Fed Rate Hike (+2%) is unmonitored.</p>
              <p className="text-xs text-muted-foreground mt-2 italic">"Without this visibility, a single rate adjustment collapses your exit liquidity by 40%."</p>
              <Button size="sm" className="mt-4 bg-destructive text-destructive-foreground hover:bg-destructive/90 font-black text-[10px] tracking-widest uppercase">
                [ RESOLVE NUCLEAR GAP ]
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="text-xs uppercase text-muted-foreground">Domain Authority</Label>
                <p className="font-semibold text-lg">{agent.domain}</p>
              </div>
              <div>
                <Label className="text-xs uppercase text-muted-foreground">Confidence Threshold</Label>
                <p className="font-semibold text-lg">{agent.confidence * 100}%</p>
              </div>
              <div>
                <Label className="text-xs uppercase text-muted-foreground">Persona / Voice</Label>
                <p className="font-semibold text-lg">{agent.persona}</p>
              </div>
              <div>
                <Label className="text-xs uppercase text-muted-foreground">Status</Label>
                <Badge className="ml-2 bg-green-500">{agent.status}</Badge>
              </div>
            </div>
            <Separator />
            <div>
              <Label className="text-xs uppercase text-muted-foreground mb-3 block">Executable Action Rights</Label>
              <div className="flex gap-2">
                {agent.actions.map(action => (
                  <Badge key={action} variant="outline" className="flex gap-1 items-center py-1 px-3">
                    {action.includes('Call') && <Phone className="w-3 h-3" />}
                    {action.includes('Draft') && <MessageSquare className="w-3 h-3" />}
                    {action}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Execution Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { task: 'Lead Qualification', time: '5m ago', result: 'Success' },
                  { task: 'Market ROI Calculation', time: '1h ago', result: 'Success' },
                  { task: 'Schedule Callback', time: '3h ago', result: 'Pending' },
                ].map((log, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{log.task}</span>
                    <span className="font-medium">{log.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Button className="w-full bg-primary h-12 text-lg">
            <Zap className="w-5 h-5 mr-2" /> Force Execution Test
          </Button>
        </div>
      </div>
    </div>
  );
}
