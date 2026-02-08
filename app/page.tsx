import { Globe, Shield, Zap, Search } from "lucide-react"
import { HeroCard } from "@/components/docs/hero-card"
import { DecorativeBg } from "@/components/docs/decorative-bg"

const heroCards = [
  {
    title: "The Next Truth",
    description: "We've analyzed your intent signals. Based on current market motion, your capital best aligns with these 3 'Safe Yield' assets.",
    href: "/inventory",
    icon: Search,
  },
  {
    title: "Scenario Reality",
    description: "What breaks first? Run the automated 'Fed Rate Hike' simulation across your active watchlist now.",
    href: "/intelligence",
    icon: Globe,
  },
  {
    title: "Setup Completeness",
    description: "Your Intelligence Shield is currently 40% active. Mitigate your unmanaged capital exposure immediately.",
    href: "/pricing",
    icon: Zap,
  },
  {
    title: "Intelligence Docs",
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
        <h1 className="text-center text-4xl font-black tracking-tighter text-foreground sm:text-6xl">ENTRESTATE MONEY PRINTER</h1>
        <p className="mx-auto mt-4 max-w-xl px-4 text-center text-lg text-muted-foreground italic">
          "Waiting is weakness. Prediction is dominance. Welcome to Automated Reality."
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
