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
    <div className="container py-10 max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Builder</h1>
          <p className="text-muted-foreground">Opinionated AI Intelligence Compiler (Stage {stage}/6)</p>
        </div>
        <div className="flex gap-2">
          {stage > 1 && <Button variant="outline" onClick={prevStage}>Stay Partial</Button>}
          {stage < 6 ? (
            <Button onClick={nextStage}>Next: Stage {stage + 1}</Button>
          ) : (
            <Button className="bg-primary hover:bg-primary/90 font-black tracking-widest">
              [ COMPLETE SETUP ]
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Stages Sidebar */}
        <div className="space-y-2">
          {[
            { id: 1, label: 'Identity', icon: Sparkles },
            { id: 2, label: 'Domain', icon: Shield },
            { id: 3, label: 'Actions', icon: Zap },
            { id: 4, label: 'Reasoning', icon: Activity },
            { id: 5, label: 'Tools', icon: Zap },
            { id: 6, label: 'Guardrails', icon: Shield },
          ].map((s) => (
            <div
              key={s.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                stage === s.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <s.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <Card className="md:col-span-3">
          <CardContent className="pt-6">
            {stage === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Agent Name</Label>
                  <Input 
                    placeholder="e.g., Nexus Strategy Advisor" 
                    value={blueprint.identity?.name}
                    onChange={e => updateIdentity({ name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role Definition</Label>
                  <Input 
                    placeholder="e.g., Investment Analyst" 
                    value={blueprint.identity?.role}
                    onChange={e => updateIdentity({ role: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Operating Context</Label>
                  <Select onValueChange={v => updateIdentity({ context: v })}>
                    <SelectTrigger><SelectValue placeholder="Select Context" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Investment">Investment</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

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
