"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { navigation } from "@/lib/docs/nav"
import { LanguageSelector } from "./language-selector"
import { ThemeToggle } from "./theme-toggle"

interface SidebarProps {
  onSearchClick?: () => void
  onAssistantClick?: () => void
}

export function Sidebar({ onSearchClick, onAssistantClick }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      role="navigation"
      aria-label="Main navigation"
      className="flex h-full w-64 flex-col border-r border-primary/10 bg-background/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 p-4 border-b border-primary/10">
        <Button
          variant="outline"
          className="h-10 flex-1 justify-start gap-2 border-primary/20 bg-primary/5 text-primary-foreground/70 hover:bg-primary/10 hover:text-primary-foreground"
          onClick={onSearchClick}
          aria-label="Open search (Cmd+K)"
        >
          <Search className="h-4 w-4 text-primary" />
          <span className="text-xs font-black uppercase tracking-widest">Asset Extraction...</span>
          <kbd className="ml-auto hidden rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-medium sm:inline-block text-primary">
            ⌘K
          </kbd>
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto overscroll-contain px-3 pb-4 pt-6" tabIndex={0}>
        {navigation.map((section) => (
          <div key={section.title} className="mb-6">
            <div className="mb-2 flex items-center gap-3 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">
              {section.icon && <section.icon className="h-3.5 w-3.5 text-primary/70" aria-hidden="true" />}
              {section.title}
            </div>
            <ul className="space-y-1" role="list">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2 text-xs font-black uppercase tracking-widest transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground/80",
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-primary/10 p-4">
        <div className="flex items-center justify-between gap-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </aside>
  )
}
