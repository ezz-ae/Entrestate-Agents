import { Globe, Shield, Zap, Search } from "lucide-react"
import { HeroCard } from "@/components/docs/hero-card"
import { DecorativeBg } from "@/components/docs/decorative-bg"

const heroCards = [
  {
    title: "Market Inventory",
    description: "Explore the 5-layer modeled market graph. Find high-scoring assets across all price tiers.",
    href: "/inventory",
    icon: Search,
  },
  {
    title: "Intelligence Dashboard",
    description: "Visualize market risk vs. liquidity timelines on the proprietary Portfolio Quadrant Analysis.",
    href: "/intelligence",
    icon: Globe,
  },
  {
    title: "Agent Builder",
    description: "Build custom AI agents to automate your market analysis, calls, and investment reasoning.",
    href: "/agents/builder",
    icon: Zap,
  },
  {
    title: "Intelligence Docs",
    description: "Learn about the 5-Layer Model, PPB metrics, and our proprietary Investment Scoring logic.",
    href: "/docs",
    icon: Shield,
  },
]

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-3.5rem)]">
      <DecorativeBg />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 lg:py-24 lg:pb-12">
        {/* Hero text - centered */}
        <h1 className="text-center text-4xl font-medium tracking-tight text-foreground">Entrestate Intelligence Engine</h1>
        <p className="mx-auto mt-4 max-w-xl px-4 text-center text-lg text-muted-foreground">
          The next generation of real estate investment discovery. Autonomous agents, 5-layer market modeling, and algorithmic risk guardrails for the modern investor.
        </p>

        {/* Hero cards grid */}
        <div className="mt-12 grid gap-x-6 gap-y-4 px-6 sm:grid-cols-2 lg:mt-24 lg:px-0">
          {heroCards.map((card) => (
            <HeroCard key={card.href} {...card} />
          ))}
        </div>
      </div>
    </div>
  )
}
