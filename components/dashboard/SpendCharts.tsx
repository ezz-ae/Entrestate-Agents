'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', spend: 400, revenue: 2400 },
  { name: 'Tue', spend: 300, revenue: 1398 },
  { name: 'Wed', spend: 200, revenue: 9800 },
  { name: 'Thu', spend: 278, revenue: 3908 },
  { name: 'Fri', spend: 189, revenue: 4800 },
  { name: 'Sat', spend: 239, revenue: 3800 },
  { name: 'Sun', spend: 349, revenue: 4300 },
];

export function SpendCharts() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Revenue vs. Spend (7 Days)</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="spend" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
