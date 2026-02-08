'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingDown, ShieldAlert } from 'lucide-react';
import { InventoryNode } from '@/lib/engine/types';
import inventoryData from '@/public/data/inventory.json';

export function PredictiveTruthCanvas() {
  const [prediction, setPrediction] = useState<InventoryNode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate Behavioral Extraction Logic
    // In production, this would fetch from /api/intelligence/predict based on session signals
    const timer = setTimeout(() => {
      const bestPick = (inventoryData as InventoryNode[]).find(p => p.derived_investment_score > 90);
      setPrediction(bestPick || null);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return (
    <div className="w-full h-32 animate-pulse bg-primary/5 rounded-xl border border-dashed border-primary/20 flex items-center justify-center">
      <p className="text-xs font-bold text-primary tracking-widest uppercase">Extracting Intent Signal...</p>
    </div>
  );

  if (!prediction) return null;

  return (
    <Card className="border-2 border-primary bg-primary/5 shadow-2xl overflow-hidden relative group">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Badge className="bg-primary text-[10px] font-black tracking-widest uppercase px-2 py-0.5">
            <Sparkles className="w-3 h-3 mr-1 fill-white" /> The Next Truth
          </Badge>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Confidence: 94%</span>
        </div>
        <CardTitle className="text-2xl font-black tracking-tighter mt-2">
          {prediction.name || prediction.area}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm italic text-muted-foreground leading-relaxed">
          "Your behavior aligns with <b>Wealth Preservation</b>. Based on your 120s audit of Business Bay, this asset is the only one in your radius with a <span className='text-green-500 font-bold'>-12% Discount to Cohort</span>."
        </p>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2 text-sm font-bold">
            <TrendingDown className="w-4 h-4 text-green-500" />
            <span>AED {prediction.price_from_aed?.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold">
            <ShieldAlert className="w-4 h-4 text-primary" />
            <span>Score: {prediction.derived_investment_score}</span>
          </div>
        </div>
        <button className="w-full py-3 bg-primary text-primary-foreground font-black text-xs tracking-widest rounded-lg hover:bg-primary/90 transition-colors uppercase">
          [ ACTIVATE INTELLIGENCE SHIELD ]
        </button>
      </CardContent>
    </Card>
  );
}
