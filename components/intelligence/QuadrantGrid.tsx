'use client';

import React from 'react';
import { InventoryNode } from '@/lib/engine/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface QuadrantGridProps {
  projects: InventoryNode[];
}

const RISK_CLASSES = ['Conservative', 'Moderate', 'Aggressive', 'Speculative'] as const;
const TIMELINE_CLASSES = ['Immediate (Ready)', 'Near-term (6-12mo)', 'Short (1-2yr)', 'Medium (2-4yr)', 'Long (4yr+)'] as const;

export function QuadrantGrid({ projects }: QuadrantGridProps) {
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Market Risk vs. Liquidity Quadrant</h3>
        <div className="flex gap-2">
          {RISK_CLASSES.map(rc => (
            <Badge key={rc} variant="outline" className="text-[10px]">{rc}</Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 aspect-square md:aspect-video border rounded-xl p-4 bg-muted/20 relative">
        {/* Grid Lines */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-5 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-border/50" />
          ))}
        </div>

        {/* Axis Labels */}
        <div className="absolute -left-8 top-1/2 -rotate-90 text-[10px] font-medium text-muted-foreground">
          Liquidity Timeline
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-muted-foreground">
          Risk Class
        </div>

        {/* Projects Mapping */}
        {projects.map((project) => {
          const xIndex = RISK_CLASSES.indexOf(project.derived_risk_class as any);
          const yIndex = TIMELINE_CLASSES.indexOf(project.derived_liquidity_timeline as any);

          if (xIndex === -1 || yIndex === -1) return null;

          // Add some jitter to avoid overlapping
          const jitterX = (Math.random() - 0.5) * 15;
          const jitterY = (Math.random() - 0.5) * 15;

          const left = `calc(${(xIndex / 4) * 100}% + 12.5% + ${jitterX}px)`;
          const top = `calc(${(yIndex / 5) * 100}% + 10% + ${jitterY}px)`;

          return (
            <TooltipProvider key={project.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="absolute w-3 h-3 rounded-full bg-primary border-2 border-background cursor-pointer hover:scale-150 transition-transform"
                    style={{ left, top }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="p-2 space-y-1">
                    <p className="font-bold text-xs">{project.static_area} - {project.static_unit_types}</p>
                    <p className="text-[10px] text-muted-foreground">{project.static_city}</p>
                    <Badge variant="secondary" className="text-[9px]">
                      {project.derived_risk_class}
                    </Badge>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
}
