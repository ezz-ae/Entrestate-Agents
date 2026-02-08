import { Globe, Shield, Zap, Search } from "lucide-react"
import { HeroCard } from "@/components/docs/hero-card"
import { DecorativeBg } from "@/components/docs/decorative-bg"

const heroCards = [
  {
    title: "The Market Map",
    description: "Scan the 5-layer project graph. Extract high-scoring assets across all price tiers instantly.",
    href: "/inventory",
    icon: Search,
  },
  {
    title: "Revenue Matrix",
    description: "Visualize capital efficiency vs. liquidity timelines on the proprietary Director's Quadrant.",
    href: "/intelligence",
    icon: Globe,
  },
  {
    title: "Deployment Hub",
    description: "Initialize autonomous AI agents to automate your market analysis, calls, and ROI stress-tests.",
    href: "/agents/builder",
    icon: Zap,
  },
  {
    title: "Intelligence Protocol",
    description: "Master the 5-Layer Model and the Behavioral Trigger Matrix. Learn how we rearrange market reality.",
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
        <h1 className="text-center text-5xl font-black tracking-tighter text-foreground sm:text-7xl uppercase">DIRECTOR CONSOLE</h1>
        <p className="mx-auto mt-6 max-w-xl px-4 text-center text-xl text-muted-foreground font-medium italic">
          "Prediction is Dominance. Welcome to your Automated Reality."
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
