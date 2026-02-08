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
        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl uppercase">Automated Reality</h1>
        <p className="text-muted-foreground italic">
          "Browsing is inefficient. We have rearranged the market nodes based on your behavioral intent."
        </p>
      </div>

      <PredictiveTruthCanvas />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((project) => (
          <Link key={project.id} href={`/inventory/${project.id}`}>
            <Card className={`h-full hover:shadow-2xl transition-all cursor-pointer border-2 ${project.derived_price_momentum > 20 ? 'border-destructive/50 opacity-80 grayscale-[0.5]' : 'hover:border-primary'}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold">{project.name || project.area}</CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest">{project.city} • {project.developer}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={project.decision_flags.flag_safe_yield ? "default" : "secondary"} className="font-black text-[9px]">
                      {project.derived_risk_class}
                    </Badge>
                    <div className="text-[10px] font-black text-primary">
                      SCORE: {project.derived_investment_score}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.derived_price_momentum > 50 && (
                  <div className="p-2 bg-destructive/10 rounded border border-destructive/20 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-destructive" />
                    <span className="text-[9px] font-black text-destructive uppercase tracking-tighter">Nuclear Data Gap: High Premium</span>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground text-[10px] uppercase font-bold">Entry Price</div>
                  <div className="font-black text-xs">AED {project.price_from_aed?.toLocaleString()}</div>
                  <div className="text-muted-foreground text-[10px] uppercase font-bold">Price Momentum</div>
                  <div className={`font-black text-xs ${project.derived_price_momentum < 0 ? 'text-green-500' : 'text-destructive'}`}>
                    {project.derived_price_momentum > 0 ? '+' : ''}{project.derived_price_momentum}%
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
