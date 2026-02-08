import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SpendCharts } from '@/components/dashboard/SpendCharts';
import { Zap, Users, DollarSign, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  return (
    <div className="container py-10 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b pb-10 border-primary/20">
        <div className="space-y-2">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black tracking-widest uppercase px-3 py-1 mb-2">
            Network Operations Center
          </Badge>
          <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">DIRECTOR CONSOLE</h1>
          <p className="text-xl text-muted-foreground font-medium italic">"Meta control over autonomous revenue units."</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="font-black text-[10px] tracking-widest uppercase h-12 px-8 border-2">SYSTEM AUDIT</Button>
          <Button className="font-black text-[10px] tracking-widest uppercase h-12 px-10 bg-primary shadow-xl shadow-primary/20">DEPLOY UNIVERSAL SHIELD</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 shadow-lg overflow-hidden group">
          <div className="h-1.5 w-full bg-green-500/50 group-hover:bg-green-500 transition-colors" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Revenue Flow</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter uppercase leading-none">$45,231.89</div>
            <p className="text-[10px] font-bold text-green-500 mt-2 uppercase tracking-widest">+20.1% MOM VELOCITY</p>
          </CardContent>
        </Card>
        <Card className="border-2 shadow-lg overflow-hidden group">
          <div className="h-1.5 w-full bg-primary/50 group-hover:bg-primary transition-colors" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Revenue Units</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter uppercase leading-none">128 AGENTS</div>
            <p className="text-[10px] font-bold text-primary mt-2 uppercase tracking-widest">+12 DEPLOYED (24H)</p>
          </CardContent>
        </Card>
        <Card className="border-2 shadow-lg overflow-hidden group">
          <div className="h-1.5 w-full bg-destructive/50 group-hover:bg-destructive transition-colors" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Operational Spend</CardTitle>
            <Activity className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter uppercase leading-none">$12,234.00</div>
            <p className="text-[10px] font-bold text-destructive mt-2 uppercase tracking-widest">82% OF QUOTA UTILIZED</p>
          </CardContent>
        </Card>
        <Card className="border-2 shadow-lg overflow-hidden group">
          <div className="h-1.5 w-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Qualified Intent</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter uppercase leading-none">573 LEADS</div>
            <p className="text-[10px] font-bold text-blue-500 mt-2 uppercase tracking-widest">34% CONVERSION RATE</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <SpendCharts />
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Agent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { agent: 'Investment Advisor', task: 'ROI Analysis', status: 'Completed', time: '2m ago' },
                { agent: 'Caller Qualifier', task: 'Lead Call #452', status: 'In Progress', time: 'Just now' },
                { agent: 'Sales Follow-Up', task: 'SMS Blast', status: 'Pending', time: '15m ago' },
                { agent: 'Listing Intel', task: 'Market Refresh', status: 'Completed', time: '1h ago' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{item.agent}</p>
                    <p className="text-xs text-muted-foreground">{item.task}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{item.status}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
