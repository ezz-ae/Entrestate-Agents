'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { MonetizationSignal } from '@/hooks/use-behavioral-engine';

interface BestNextStepCardProps {
  signal: MonetizationSignal;
  context: any;
  onMitigate: () => void;
  onAcceptRisk: () => void;
}

export function BestNextStepCard({ signal, context, onMitigate, onAcceptRisk }: BestNextStepCardProps) {
  const [isCompleting, setIsCompleting] = React.useState(false);

  const getContent = () => {
    if (isCompleting) {
      return {
        title: "SETUP INCOMPLETE",
        description: "You are activating the Market Intelligence Agent. Without the Scenario Shield, your analysis remains a theoretical exercise.",
        impact: "Fragmented intelligence increases capital fragility.",
        cta: "COMPLETE SETUP",
        anchor: "STAY PARTIAL (Proceed with vulnerable setup)"
      };
    }
    // ... existing content logic
      case 'ScrollDepthReached':
        return {
          title: "INTENSITY RECOGNIZED",
          description: "You've audited 80% of this asset's Static Truths. However, the Dynamic Pressure is hidden.",
          impact: "Unknown price drift is currently eroding your projected ROI.",
          cta: "ACTIVATE INTELLIGENCE SHIELD",
          anchor: "STAY PARTIAL"
        };
      case 'TimeOnAssetExceeded':
        return {
          title: "COGNITIVE FRICTION ALERT",
          description: "Hesitation detected. You are searching for validation that isn't in the public documentation.",
          impact: "Scenario vulnerability to Fed Rate Hike (+2%) is uncalculated.",
          cta: "RUN STRESS TEST NOW",
          anchor: "PROCEED WITHOUT VISIBILITY"
        };
      default:
        return {
          title: "SYSTEM ALERT",
          description: "A capital risk layer has been identified in your current profile.",
          impact: "Risk exposure: UNMONITORED.",
          cta: "RESOLVE IMMEDIATELY",
          anchor: "IGNORE RISK"
        };
    }
  };

  const content = getContent();

  return (
    <Card className="fixed bottom-24 right-6 w-[380px] shadow-2xl border-2 border-primary animate-in slide-in-from-right-10 duration-500 z-[100] bg-background">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 text-destructive font-black tracking-tighter">
          <AlertTriangle className="w-5 h-5" />
          <CardTitle className="text-lg">{content.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm font-medium leading-relaxed">
          {content.description}
        </p>
        <div className="p-3 bg-destructive/10 rounded border border-destructive/20">
          <p className="text-xs font-bold text-destructive flex items-center gap-2">
            <Zap className="w-3 h-3 text-destructive fill-destructive" />
            CRITICAL BLIND SPOT:
          </p>
          <p className="text-sm italic text-muted-foreground">{content.impact}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button onClick={onMitigate} className="w-full h-12 text-sm font-black tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground">
          [ YES, {content.cta} ]
        </Button>
        <Button onClick={onAcceptRisk} variant="ghost" className="w-full text-[10px] text-muted-foreground hover:text-destructive underline decoration-dotted">
          {content.anchor} (Proceed with unmanaged capital exposure)
        </Button>
      </CardFooter>
    </Card>
  );
}
