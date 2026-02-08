import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Shield, Target, TrendingUp, Zap } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="space-y-10 py-10 px-6">
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">Intelligence Engine Primer</h1>
        <p className="text-xl text-muted-foreground">
          Welcome to the world's first real estate reasoning engine. We don't just show you listings; we reason through the financial DNA of the market.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <Shield className="w-8 h-8 text-primary mb-2" />
            <CardTitle>The 5-Layer Model</CardTitle>
            <CardDescription>How we turn messy data into gold.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Our engine processes every project through 5 rigorous filters: Static Truths, Dynamic Momentum, Derived Strategy, Identity Kernel, and Decision Readiness.
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <Target className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Investment Score</CardTitle>
            <CardDescription>The 0-100 binary signal.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            A single metric that synthesizes price advantage, handover timing, and developer reliability. 85+ is a "Director's Pick."
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <TrendingUp className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Price Momentum</CardTitle>
            <CardDescription>Beat the market median.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            We track every asset against its specific completion year cohort. Never overpay for a trophy again.
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <Zap className="w-8 h-8 text-primary mb-2" />
            <CardTitle>Autonomous Agents</CardTitle>
            <CardDescription>Your 24/7 investment team.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Deploy specialized AI agents to qualify leads, draft contracts, and stress-test your portfolio in real-time.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
