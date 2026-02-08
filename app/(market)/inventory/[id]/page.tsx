import { InventoryNode } from '@/lib/engine/types';
import inventoryData from '@/public/data/inventory.json';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const project = (inventoryData as InventoryNode[]).find(p => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container py-10 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b pb-8 border-primary/20">
        <div className="space-y-2">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black tracking-widest uppercase px-3 py-1 mb-2">
            Asset DNA Dossier
          </Badge>
          <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">{project.name || project.area}</h1>
          <p className="text-xl text-muted-foreground font-medium italic">{project.city} • {project.developer}</p>
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className="flex gap-2">
            {project.decision_flags.flag_safe_yield && <Badge className="bg-green-600 font-black text-[10px] tracking-widest py-1.5 px-4 shadow-[0_0_20px_rgba(22,163,74,0.4)] uppercase">Yield Shield Active</Badge>}
            {project.decision_flags.flag_flip_opportunity && <Badge className="bg-blue-600 font-black text-[10px] tracking-widest py-1.5 px-4 shadow-[0_0_20px_rgba(37,99,235,0.4)] uppercase">Flip Potential</Badge>}
            <Badge variant="outline" className="font-black text-[10px] tracking-widest py-1.5 px-4 uppercase border-2">{project.derived_risk_class}</Badge>
          </div>
          <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 flex flex-col items-end">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Director's Score</span>
            <span className={`text-5xl font-black tracking-tighter ${
              project.derived_investment_score > 80 ? 'text-green-500' : 
              project.derived_investment_score > 60 ? 'text-blue-500' : 'text-orange-500'
            }`}>
              {project.derived_investment_score}<span className="text-xl text-muted-foreground">/100</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Layer 1 & 2: The Ground Truths */}
        <Card className="md:col-span-2 border-2 shadow-xl overflow-hidden">
          <div className="bg-primary h-2 w-full" />
          <CardHeader>
            <CardTitle className="text-2xl font-black tracking-tighter uppercase">Intelligence Kernel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <p className="text-xl font-medium leading-relaxed italic text-foreground/80">"{project.kernel_identity}"</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 border-t pt-8 border-dashed">
              <div>
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-2">Registry Year</p>
                <p className="text-2xl font-black tracking-tight">{project.launch_year || 'N/A'}</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-2">Delivery Window</p>
                <p className="text-2xl font-black tracking-tight">{project.completion_year || 'N/A'}</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-2">Entry Capital</p>
                <p className="text-2xl font-black tracking-tight text-primary">AED {project.price_from_aed?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-2">Price/Bed (PPB)</p>
                <p className="text-2xl font-black tracking-tight">AED {project.derived_ppb?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-2">Lifecycle State</p>
                <p className="text-lg font-black tracking-tight uppercase">{project.derived_construction_lifecycle}</p>
              </div>
              <div>
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-2">Exec. Confidence</p>
                <p className="text-lg font-black tracking-tight uppercase text-green-500">{project.dynamic_delivery_confidence}</p>
              </div>
            </div>

            <div className="p-6 bg-destructive/5 rounded-2xl border-2 border-destructive/20 relative group overflow-hidden">
              <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <AlertTriangle className="w-12 h-12 text-destructive" />
              </div>
              <div className="space-y-4 max-w-lg">
                <div>
                  <p className="text-[10px] font-black text-destructive uppercase tracking-[0.2em] mb-1">Nuclear Gap Analysis</p>
                  <p className="text-2xl font-black tracking-tighter text-destructive">
                    {project.derived_price_momentum > 0 ? '+' : ''}{project.derived_price_momentum}% <span className="text-sm">Vulnerability vs. Median</span>
                  </p>
                </div>
                <p className="text-sm font-medium leading-relaxed italic text-muted-foreground">
                  "Without the <b>Scenario Agent</b>, your capital is exposed to unmonitored macro shifts. A single rate adjustment collapses your projected ROI."
                </p>
                <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-black text-[10px] tracking-[0.2em] h-10 px-6 uppercase shadow-lg">
                  [ MITIGATE RISK NOW ]
                </Button>
              </div>
            </div>

            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-1">Problem Solved</p>
                <p className="text-3xl font-black text-primary tracking-tighter uppercase">{project.kernel_problem_solved}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-1">Platform Status</p>
                <Badge variant="outline" className="font-black text-[10px] border-2 border-primary/20 text-primary">AUDITED & VALIDATED</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Layer 3 & 4: Operational Logic */}
        <div className="space-y-8">
          <Card className="border-2 border-primary/20 bg-primary/5 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-black tracking-widest uppercase">Executive Logic</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between items-end mb-1">
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">Capital Efficiency</p>
                  <span className="text-xl font-black text-primary">{project.derived_capital_efficiency}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden border">
                  <div 
                    className="h-full bg-primary shadow-[0_0_15px_rgba(59,130,246,0.6)]" 
                    style={{ width: `${project.derived_capital_efficiency}%` }}
                  />
                </div>
              </div>

              <div className="grid gap-6">
                <div>
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Target Persona</p>
                  <p className="font-black text-xl tracking-tight uppercase">{project.derived_buyer_persona}</p>
                </div>

                <div>
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Holding Strategy</p>
                  <p className="font-black text-xl tracking-tight uppercase">{project.derived_holding_logic}</p>
                </div>

                <div>
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Liquidity Timeline</p>
                  <p className="font-black text-xl tracking-tight uppercase">{project.derived_liquidity_timeline}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="bg-background/80 p-5 rounded-xl border-2 border-primary/10 space-y-3">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Director's Recommendation</p>
                <p className="text-xs italic leading-relaxed text-muted-foreground font-medium">
                  "This asset carries {project.derived_price_momentum < 0 ? 'an optimized entry point' : 'a premium positioning'}. Based on its {project.derived_capital_efficiency}% efficiency score, we recommend deployment for <b>{project.derived_buyer_persona}</b> targets."
                </p>
                <Button variant="outline" className="w-full font-black text-[10px] tracking-widest h-10 uppercase border-primary/20 hover:bg-primary/5">
                  [ RUN FULL ROI ANALYSIS ]
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-destructive/20 overflow-hidden group">
            <div className="p-4 bg-destructive/5 flex items-center justify-between">
              <span className="text-[10px] font-black text-destructive tracking-widest uppercase">System Guardrail</span>
              <ShieldAlert className="w-4 h-4 text-destructive opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <CardContent className="pt-4 pb-6 space-y-4">
              <p className="text-[11px] font-bold italic text-muted-foreground">
                "Unmonitored assets are a failure of strategy. Activation of the <b>Scenario Shield</b> is recommended before capital deployment."
              </p>
              <Button size="sm" variant="ghost" className="w-full text-[9px] font-black tracking-[0.3em] uppercase underline decoration-dotted text-destructive/70 hover:text-destructive">
                [ IGNORE RISK WARNING ]
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
