import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function PricingPage() {
  return (
    <div className="container py-20 space-y-16">
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black tracking-widest uppercase px-4 py-1.5 mb-2">
          Bounded Certainty Framework
        </Badge>
        <h1 className="text-5xl font-black tracking-tighter sm:text-7xl uppercase leading-none">REVENUE INTELLIGENCE TIERS</h1>
        <p className="text-xl text-muted-foreground font-medium italic max-w-2xl mx-auto">
          "Friction is a capital risk. We eliminate micro-costs in favor of proactive, automated dominance."
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Safety Tier */}
        <Card className="relative overflow-hidden border-2 hover:border-primary transition-all group bg-background">
          <div className="absolute top-0 right-0 p-6">
            <ShieldCheck className="w-10 h-10 text-primary opacity-10 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="h-2 w-full bg-muted group-hover:bg-primary transition-colors" />
          <CardHeader className="pt-8 px-8">
            <CardTitle className="text-3xl font-black tracking-tight uppercase">THE SAFETY SHIELD</CardTitle>
            <CardDescription className="text-lg font-medium italic">Focus: Loss Prevention & Baseline Visibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 px-8 pb-10">
            <div className="space-y-1">
              <div className="text-5xl font-black tracking-tighter">450 AED<span className="text-sm text-muted-foreground font-bold tracking-widest ml-2">/ MO</span></div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Entry Level Orchestration</p>
            </div>
            <ul className="space-y-4">
              {[
                "Full Access to 'Conservative' Market Nodes",
                "Real-time Developer Execution Scores",
                "Market Intelligence Agent (Active)",
                "Weekly Asset Risk Reports"
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="px-8 pb-10">
            <Button className="w-full h-14 font-black tracking-[0.2em] text-sm bg-primary text-primary-foreground shadow-xl uppercase transition-transform active:scale-95">
              [ ACTIVATE SHIELD ]
            </Button>
          </CardFooter>
        </Card>

        {/* Optimization Tier */}
        <Card className="relative overflow-hidden border-4 border-primary bg-primary/5 shadow-[0_30px_100px_rgba(59,130,246,0.2)] scale-105 group">
          <div className="absolute top-0 right-0 p-6">
            <Zap className="w-10 h-10 text-primary fill-primary animate-pulse" />
          </div>
          <div className="h-3 w-full bg-primary" />
          <CardHeader className="pt-8 px-8">
            <div className="flex justify-between items-center mb-2">
              <Badge className="bg-primary text-primary-foreground font-black text-[9px] tracking-widest px-3">MOST DEPLOYED</Badge>
            </div>
            <CardTitle className="text-3xl font-black tracking-tight uppercase">DIRECTOR MODE</CardTitle>
            <CardDescription className="text-lg font-medium italic">Focus: Maximum Efficiency & Automated Reality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 px-8 pb-10">
            <div className="space-y-1">
              <div className="text-5xl font-black tracking-tighter text-primary">1,200 AED<span className="text-sm text-muted-foreground font-bold tracking-widest ml-2">/ MO</span></div>
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">Full Market Dominance</p>
            </div>
            <ul className="space-y-4">
              {[
                "Everything in Safety Shield",
                "Aggressive & Speculative Node Deep-Dives",
                "The Scenario Agent: 13 Macro Simulations",
                "Custom 'What-If' Portfolio Stress Testing",
                "24/7 Proactive Concierge Alerts"
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="px-8 pb-10">
            <Button className="w-full h-14 font-black tracking-[0.2em] text-sm bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_10px_40px_rgba(59,130,246,0.4)] uppercase transition-transform active:scale-95">
              [ COMPLETE SETUP ]
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="text-center pt-10 border-t border-primary/10 max-w-4xl mx-auto">
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.4em] mb-4">
          Powered by the Behavioral Monetization Engine (BME)
        </p>
        <p className="text-xs text-muted-foreground italic font-medium leading-relaxed">
          "This pricing model enforces Bounded Certainty. By eliminating micro-billing friction, we ensure the Director leans into proactive intelligence during periods of maximum market volatility."
        </p>
      </div>
    </div>
  );
}
