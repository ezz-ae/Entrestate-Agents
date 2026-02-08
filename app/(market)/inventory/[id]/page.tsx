import { InventoryNode } from '@/lib/engine/types';
import inventoryData from '@/public/data/inventory.json';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const project = (inventoryData as InventoryNode[]).find(p => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container py-10 space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">{project.name || project.area}</h1>
          <p className="text-xl text-muted-foreground">{project.city} • {project.developer}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            {project.decision_flags.flag_safe_yield && <Badge className="bg-green-600 hover:bg-green-700">Safe Yield</Badge>}
            {project.decision_flags.flag_flip_opportunity && <Badge className="bg-blue-600 hover:bg-blue-700">Flip Op</Badge>}
            <Badge variant="outline">{project.derived_risk_class}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Investment Score:</span>
            <span className={`text-2xl font-black ${
              project.derived_investment_score > 80 ? 'text-green-500' : 
              project.derived_investment_score > 60 ? 'text-blue-500' : 'text-orange-500'
            }`}>
              {project.derived_investment_score}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Layer 1 & 2: Truths */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Inventory Identity Kernel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg leading-relaxed">{project.kernel_identity}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Launch Year</p>
                <p className="font-semibold">{project.launch_year || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Handover</p>
                <p className="font-semibold">{project.completion_year || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Starting Price</p>
                <p className="font-semibold">AED {project.price_from_aed?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">PPB (Price/Bed)</p>
                <p className="font-semibold">AED {project.derived_ppb?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Lifecycle</p>
                <p className="font-semibold">{project.derived_construction_lifecycle}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Confidence</p>
                <p className="font-semibold">{project.dynamic_delivery_confidence}</p>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Price Momentum</p>
                <p className={`text-xl font-bold ${project.derived_price_momentum < 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {project.derived_price_momentum > 0 ? '+' : ''}{project.derived_price_momentum}% vs Median
                </p>
                {project.derived_price_momentum > 50 && (
                  <div className="mt-2 p-2 bg-destructive/10 rounded border border-destructive/20 animate-pulse">
                    <p className="text-[10px] font-black text-destructive uppercase">Nuclear Data Gap: High Premium</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Problem Solved</p>
                <p className="text-xl font-medium text-primary">{project.kernel_problem_solved}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Layer 3: Derived Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Investment Logic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Capital Efficiency</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${project.derived_capital_efficiency}%` }}
                  />
                </div>
                <span className="font-bold">{project.derived_capital_efficiency}</span>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Buyer Persona</p>
              <p className="font-semibold text-lg">{project.derived_buyer_persona}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Holding Logic</p>
              <p className="font-semibold text-lg">{project.derived_holding_logic}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Liquidity Timeline</p>
              <p className="font-semibold text-lg">{project.derived_liquidity_timeline}</p>
            </div>
            
            <Separator />
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Director's Analysis</p>
              <p className="text-xs italic leading-relaxed text-muted-foreground">
                This asset has been algorithmically validated. Its {project.derived_investment_score} score reflects a superior {project.derived_price_momentum < 0 ? 'valuation entry point' : 'market positioning'} coupled with {project.dynamic_delivery_confidence.toLowerCase()} execution confidence. Recommended for {project.derived_buyer_persona} portfolios.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
