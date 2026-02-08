import { findProjects } from '@/lib/engine/filters';
import { InventoryNode } from '@/lib/engine/types';
import inventoryData from '@/public/data/inventory.json';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function InventoryPage() {
  const inventory = inventoryData as InventoryNode[];

  return (
    <div className="container py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Market Inventory</h1>
        <p className="text-muted-foreground">
          Explore the 5-layer modeled investment opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((project) => (
          <Link key={project.id} href={`/inventory/${project.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{project.name || project.area}</CardTitle>
                    <CardDescription>{project.city} • {project.developer}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={project.decision_flags.flag_safe_yield ? "default" : "secondary"}>
                      {project.derived_risk_class}
                    </Badge>
                    <div className="text-[10px] font-bold text-primary">
                      Score: {project.derived_investment_score}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Price</div>
                  <div className="font-medium">AED {project.price_from_aed?.toLocaleString()}</div>
                  <div className="text-muted-foreground">PPB</div>
                  <div className="font-medium">AED {project.derived_ppb?.toLocaleString()}</div>
                  <div className="text-muted-foreground">Lifecycle</div>
                  <div className="font-medium">{project.derived_construction_lifecycle}</div>
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
