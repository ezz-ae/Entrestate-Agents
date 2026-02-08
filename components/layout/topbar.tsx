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
      <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-black uppercase tracking-tighter hidden sm:inline-block">Entrestate <span className="text-primary">Director</span></span>
          </Link>

        <div className="flex flex-1 items-center justify-end gap-4">
          <button
            onClick={onSearchClick}
            className="flex h-9 w-full max-w-[240px] items-center justify-between rounded-lg border-2 border-primary/5 bg-muted/50 px-3 text-xs font-black text-muted-foreground hover:bg-muted transition-all"
          >
            <span className="flex items-center gap-2 uppercase tracking-widest">
              <Search className="h-3 w-3" /> Asset Extraction...
            </span>
            <kbd className="pointer-events-none hidden rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
              ⌘K
            </kbd>
          </button>
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {topNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 text-xs font-black uppercase tracking-widest transition-colors flex items-center",
                  pathname.startsWith(item.href) ? "text-foreground" : "text-muted-foreground hover:text-primary/80",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1 md:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Search" onClick={onSearchClick}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="More options">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
    </header>
  )
}
