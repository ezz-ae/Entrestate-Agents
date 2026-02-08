"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Sparkles, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { siteConfig, topNavigation } from "@/lib/docs/nav"

interface TopbarProps {
  onSearchClick?: () => void
  onAssistantClick?: () => void
}

export function Topbar({ onSearchClick, onAssistantClick }: TopbarProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border/50 bg-background/80 px-4 backdrop-blur-sm lg:px-6">
      {/* Logo on left */}
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 text-primary-foreground"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <span className="font-semibold text-foreground">{siteConfig.name}</span>
      </Link>

      {/* Desktop navigation */}
      <div className="hidden md:flex items-center gap-1">
        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {topNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-1.5 text-sm font-medium transition-colors flex items-center",
                pathname.startsWith(item.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <Button size="sm" className="ml-2">
          Get started
        </Button>
      </div>

      {/* Mobile icons */}
      <div className="flex items-center gap-1 md:hidden">
        <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Search" onClick={onSearchClick}>
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="AI Assistant" onClick={onAssistantClick}>
          <Sparkles className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="More options">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
