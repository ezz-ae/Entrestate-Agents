import { InventoryNode } from '@/lib/engine/types';
import inventoryData from '@/public/data/inventory.json';
import { QuadrantGrid } from '@/components/intelligence/QuadrantGrid';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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
          <Card>
            <CardHeader>
              <CardTitle>Market Composition</CardTitle>
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
