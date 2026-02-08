'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AgentBlueprintObject, AgentDomain, AgentAction } from '@/lib/engine/types';
import { Sparkles, Save, Shield, Activity, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AgentBuilderPage() {
  const [stage, setStage] = useState(1);
  const [blueprint, setBlueprint] = useState<Partial<AgentBlueprintObject>>({
    identity: { name: '', role: '', context: 'Sales', persona: { voice: 'Professional', accent: 'Neutral', sound: 'Standard' } },
    authority: { primaryDomain: 'Inventory & Pricing' },
    actions: { rights: [], confidenceThreshold: 0.8, failureBehavior: 'Defer' },
    reasoningContract: { mode: 'Think-Explain-Answer', enforceCalculationMethod: true },
    bindings: { tools: [] },
    guardrails: { killSwitchEnabled: true, restrictedActions: [] }
  });

  const nextStage = () => setStage(s => Math.min(s + 1, 6));
  const prevStage = () => setStage(s => Math.max(s - 1, 1));

  const updateIdentity = (updates: any) => {
    setBlueprint(prev => ({ ...prev, identity: { ...prev.identity, ...updates } } as any));
  };

  const toggleAction = (action: AgentAction) => {
    const currentActions = blueprint.actions?.rights || [];
    const newActions = currentActions.includes(action)
      ? currentActions.filter(a => a !== action)
      : [...currentActions, action];
    setBlueprint(prev => ({ ...prev, actions: { ...prev.actions, rights: newActions } } as any));
  };

  return (
    <div className="container py-10 max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b pb-10 border-primary/20">
        <div className="space-y-2">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black tracking-widest uppercase px-3 py-1 mb-2">
            Intelligence Compiler v3.0
          </Badge>
          <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">DEPLOYMENT HUB</h1>
          <p className="text-xl text-muted-foreground font-medium italic">"Orchestrating autonomous domain authority."</p>
        </div>
        <div className="flex gap-4">
          {stage > 1 && <Button variant="outline" onClick={prevStage} className="font-black text-[10px] tracking-widest uppercase h-12 px-8">STAY PARTIAL</Button>}
          {stage < 6 ? (
            <Button onClick={nextStage} className="font-black text-[10px] tracking-widest uppercase h-12 px-8 bg-primary shadow-lg shadow-primary/20">
              NEXT: STAGE {stage + 1}
            </Button>
          ) : (
            <Button className="bg-primary hover:bg-primary/90 font-black text-[10px] tracking-[0.2em] h-12 px-10 uppercase shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-transform active:scale-95">
              [ COMPLETE SETUP ]
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Stages Sidebar */}
        <div className="space-y-3">
          {[
            { id: 1, label: 'IDENTITY SYNTHESIS', icon: Sparkles },
            { id: 2, label: 'DOMAIN AUTHORITY', icon: Shield },
            { id: 3, label: 'ACTION RIGHTS', icon: Zap },
            { id: 4, label: 'REASONING CONTRACT', icon: Activity },
            { id: 5, label: 'LOGIC BINDING', icon: Zap },
            { id: 6, label: 'GUARDRAILS & SAFETY', icon: Shield },
          ].map((s) => (
            <div
              key={s.id}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all border-2 ${
                stage === s.id 
                  ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105' 
                  : 'text-muted-foreground border-transparent hover:bg-muted/50'
              }`}
            >
              <s.icon className={`w-5 h-5 ${stage === s.id ? 'fill-primary-foreground/20' : ''}`} />
              <span className="text-[10px] font-black tracking-widest leading-none">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <Card className="md:col-span-3 border-2 shadow-2xl overflow-hidden bg-background">
          <div className="bg-primary h-2 w-full opacity-50" />
          <CardContent className="p-10">
            {stage === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Agent Identity Name</Label>
                  <Input 
                    placeholder="e.g., Nexus Strategy Advisor" 
                    className="h-14 text-lg font-bold border-2 focus:border-primary px-6"
                    value={blueprint.identity?.name}
                    onChange={e => updateIdentity({ name: e.target.value })}
                  />
                </div>
                <div className="space-y-4">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Primary Role Definition</Label>
                  <Input 
                    placeholder="e.g., Portfolio Investment Specialist" 
                    className="h-14 text-lg font-bold border-2 focus:border-primary px-6"
                    value={blueprint.identity?.role}
                    onChange={e => updateIdentity({ role: e.target.value })}
                  />
                </div>
                <div className="space-y-4">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Operational Context</Label>
                  <Select onValueChange={v => updateIdentity({ context: v })}>
                    <SelectTrigger className="h-14 font-bold border-2 px-6"><SelectValue placeholder="Select Context" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sales" className="font-bold">SALES & CONVERSION</SelectItem>
                      <SelectItem value="Investment" className="font-bold">INVESTMENT ADVISORY</SelectItem>
                      <SelectItem value="Support" className="font-bold">PLATFORM SUPPORT</SelectItem>
                      <SelectItem value="Operations" className="font-bold">MARKET OPERATIONS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            {/* ... rest of the stages with same styling enhancement ... */}

            {stage === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Primary Domain Authority</Label>
                  <Select onValueChange={v => setBlueprint(prev => ({ ...prev, authority: { ...prev.authority, primaryDomain: v } } as any))}>
                    <SelectTrigger><SelectValue placeholder="Select Domain" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inventory & Pricing">Inventory & Pricing</SelectItem>
                      <SelectItem value="Investment & ROI">Investment & ROI</SelectItem>
                      <SelectItem value="Lead Qualification">Lead Qualification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Rule: One agent = one primary expertise. Secondary domains must support the primary.
                </p>
              </div>
            )}

            {stage === 3 && (
              <div className="grid grid-cols-2 gap-4">
                {['Make Calls', 'Send SMS', 'Draft Documents', 'Update Projects', 'Trigger Commands', 'Schedule Tasks'].map((action) => (
                  <div key={action} className="flex items-center space-x-2 border p-3 rounded-md">
                    <Checkbox 
                      id={action} 
                      checked={blueprint.actions?.rights.includes(action as AgentAction)}
                      onCheckedChange={() => toggleAction(action as AgentAction)}
                    />
                    <Label htmlFor={action} className="text-sm">{action}</Label>
                  </div>
                ))}
              </div>
            )}

            {stage === 6 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border p-4 rounded-lg bg-destructive/5 border-destructive/20">
                  <div className="space-y-1">
                    <Label className="text-destructive font-bold">Hard Kill Switch</Label>
                    <p className="text-xs text-muted-foreground">Allows instant session freeze and agent disabling.</p>
                  </div>
                  <Checkbox checked={blueprint.guardrails?.killSwitchEnabled} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
