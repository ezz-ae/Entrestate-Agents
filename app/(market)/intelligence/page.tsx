import { InventoryNode } from '@/lib/engine/types';
import inventoryData from '@/public/data/inventory.json';
import { QuadrantGrid } from '@/components/intelligence/QuadrantGrid';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function IntelligencePage() {
  const inventory = inventoryData as InventoryNode[];

  return (
    <div className="container py-10 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Market Intelligence</h1>
        <p className="text-muted-foreground">
          Derived analytics and risk assessments of the total inventory.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Quadrant Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <QuadrantGrid projects={inventory} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-2 border-primary bg-primary/5 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-black tracking-tighter uppercase">
                <Zap className="w-5 h-5 text-primary fill-primary animate-pulse" />
                Proactive Concierge
              </CardTitle>
              <p className="text-xs text-muted-foreground italic font-medium">"Automated risk mitigation and opportunity detection."
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-background rounded-lg border border-primary/20 space-y-2">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Market Gap Alert</p>
                <p className="text-sm italic leading-relaxed text-muted-foreground">
                  "A new 'High-Efficiency' gap has opened in Dubai Hills with a Market Score of 85.4/100. We have already run the impact analysis for your profile."
                </p>
                <Button variant="link" className="p-0 h-auto text-xs mt-2 font-black tracking-widest text-primary hover:text-primary/80 uppercase">
                  [ ACTIVATE RESULTS ]
                </Button>
              </div>
              <div className="p-3 bg-background rounded-lg border border-destructive/20 space-y-2">
                <p className="text-[10px] font-black text-destructive uppercase tracking-widest mb-1">Critical Risk Alert</p>
                <p className="text-sm italic leading-relaxed text-muted-foreground">
                  "We noticed a 5% drop in delivery confidence for your watched assets. Shall we handle the risk mitigation for you?"
                </p>
                <Button variant="link" className="p-0 h-auto text-xs mt-2 font-black tracking-widest text-destructive hover:text-destructive/80 uppercase">
                  [ SHIELD ASSETS ]
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-black tracking-tighter uppercase">Market Composition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Projects</span>
                <span className="font-bold">{inventory.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Safe Yield Assets</span>
                <span className="font-bold">{inventory.filter(p => p.decision_flags.flag_safe_yield).length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">High Risk / High Return</span>
                <span className="font-bold">{inventory.filter(p => p.decision_flags.flag_high_risk_high_return).length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Liquidity Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder for a chart or list */}
              <div className="space-y-2">
                {['Immediate (Ready)', 'Near-term (6-12mo)', 'Short (1-2yr)'].map(label => (
                  <div key={label} className="flex justify-between items-center text-sm">
                    <span>{label}</span>
                    <Badge variant="outline">
                      {inventory.filter(p => p.derived_liquidity_timeline === label).length}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
