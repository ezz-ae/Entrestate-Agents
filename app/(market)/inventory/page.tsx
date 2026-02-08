import { findProjects } from '@/lib/engine/filters';
import { InventoryNode } from '@/lib/engine/types';
import inventoryData from '@/public/data/inventory.json';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { PredictiveTruthCanvas } from '@/components/intelligence/PredictiveTruthCanvas';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export default function InventoryPage() {
  const inventory = inventoryData as InventoryNode[];

  return (
    <div className="container py-10 space-y-12">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-5xl font-black tracking-tighter uppercase">THE MARKET MAP</h1>
        <p className="text-muted-foreground font-medium italic">
          "Your Capital Alignment Hub. We have filtered 7,000+ nodes to reveal the absolute Truth."
        </p>
      </div>

      <PredictiveTruthCanvas />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {inventory.map((project) => (
          <Link key={project.id} href={`/inventory/${project.id}`}>
            <Card className={`h-full hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all cursor-pointer border-2 ${project.derived_price_momentum > 20 ? 'border-destructive/30 opacity-70 grayscale-[0.8]' : 'hover:border-primary'}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-black tracking-tighter uppercase">{project.name || project.area}</CardTitle>
                    <CardDescription className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80">{project.city} • {project.developer}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={project.decision_flags.flag_safe_yield ? "default" : "secondary"} className="font-black text-[9px] tracking-widest px-2">
                      {project.derived_risk_class.toUpperCase()}
                    </Badge>
                    <div className="text-[11px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded">
                      SCORE: {project.derived_investment_score}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {project.derived_price_momentum > 50 && (
                  <div className="p-2 bg-destructive/10 rounded border border-destructive/20 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-destructive" />
                    <span className="text-[9px] font-black text-destructive uppercase tracking-widest">NUCLEAR GAP: HIGH PREMIUM</span>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm border-t pt-4">
                  <div>
                    <p className="text-muted-foreground text-[9px] uppercase font-black tracking-widest mb-0.5">Entry Point</p>
                    <p className="font-black text-xs">AED {project.price_from_aed?.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-[9px] uppercase font-black tracking-widest mb-0.5">Momentum</p>
                    <p className={`font-black text-xs ${project.derived_price_momentum < 0 ? 'text-green-500' : 'text-destructive'}`}>
                      {project.derived_price_momentum > 0 ? '+' : ''}{project.derived_price_momentum}% vs Median
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-[9px] uppercase font-black tracking-widest mb-0.5">PPB (Value)</p>
                    <p className="font-black text-xs">AED {project.derived_ppb?.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-[9px] uppercase font-black tracking-widest mb-0.5">Lifecycle</p>
                    <p className="font-black text-[10px] uppercase">{project.derived_construction_lifecycle}</p>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-xs italic text-muted-foreground">
                    {project.kernel_identity}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
