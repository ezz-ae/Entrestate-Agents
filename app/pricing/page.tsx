import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="container py-20 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black tracking-tighter sm:text-6xl">BOUNDED CERTAINTY</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto italic">
          "Billing friction is a capital risk. We eliminate micro-costs in favor of proactive intelligence."
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Safety Tier */}
        <Card className="relative overflow-hidden border-2 hover:border-primary transition-all group">
          <div className="absolute top-0 right-0 p-4">
            <ShieldCheck className="w-8 h-8 text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">SAFETY (Entry)</CardTitle>
            <CardDescription>Focus: Loss Prevention & Conservative Yield</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-4xl font-black">450 AED <span className="text-sm text-muted-foreground font-medium">/ month</span></div>
            <ul className="space-y-3">
              {[
                "Full Visibility into 'Conservative' Assets",
                "Developer Execution Score (Real-time)",
                "Market Intelligence Agent (Active)",
                "Weekly Risk Mitigation Reports"
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full h-12 font-bold tracking-widest bg-primary text-primary-foreground">
              [ ACTIVATE INTELLIGENCE SHIELD ]
            </Button>
          </CardFooter>
        </Card>

        {/* Optimization Tier */}
        <Card className="relative overflow-hidden border-2 border-primary bg-primary/5 shadow-xl scale-105 group">
          <div className="absolute top-0 right-0 p-4">
            <Zap className="w-8 h-8 text-primary fill-primary animate-pulse" />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">OPTIMIZATION (Power)</CardTitle>
            <CardDescription>Focus: Maximum Efficiency & Scenario Stress-Testing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-4xl font-black">1,200 AED <span className="text-sm text-muted-foreground font-medium">/ month</span></div>
            <ul className="space-y-3">
              {[
                "Everything in Safety",
                "Aggressive/Speculative Asset Deep-Dives",
                "Scenario Agent: 13 Macro Simulations",
                "Custom 'What-If' Stress Testing",
                "24/7 Proactive Concierge Alerts"
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full h-12 font-black tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
              [ COMPLETE SETUP ]
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="text-center pt-10">
        <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">
          Powered by the Behavioral Monetization Engine (BME)
        </p>
      </div>
    </div>
  );
}
