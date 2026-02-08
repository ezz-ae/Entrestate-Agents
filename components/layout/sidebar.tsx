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
      className="flex h-full w-64 flex-col border-r border-border/50 bg-sidebar"
    >
      <div className="flex items-center gap-2 p-4">
        <Button
          variant="outline"
          className="h-9 flex-1 justify-start gap-2 border-border bg-background text-foreground/70 hover:bg-muted hover:text-foreground"
          onClick={onSearchClick}
          aria-label="Open search (Cmd+K)"
        >
          <Search className="h-4 w-4" />
          <span className="text-sm">Search...</span>
          <kbd className="ml-auto hidden rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium sm:inline-block">
            ⌘K
          </kbd>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 shrink-0 border-border bg-background text-foreground/70 hover:bg-muted hover:text-foreground"
          onClick={onAssistantClick}
          aria-label="Open AI assistant"
        >
          <Sparkles className="h-4 w-4" />
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto overscroll-contain px-3 pb-4" tabIndex={0}>
        {navigation.map((section) => (
          <div key={section.title} className="mb-4">
            <div className="mb-1 flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-foreground">
              {section.icon && <section.icon className="h-4 w-4" aria-hidden="true" />}
              {section.title}
            </div>
            <ul className="space-y-0.5" role="list">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex min-h-[44px] items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-primary/10 font-medium text-accent-light"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
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

      <div className="border-t border-border/50 p-4">
        <div className="flex items-center justify-between gap-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </aside>
  )
}
