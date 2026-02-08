"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AssistantSheet } from "./assistant-sheet"

export function AssistantDock() {
  const [query, setQuery] = useState("")
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "i" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsSheetOpen(true)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:left-64"
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(calc(100% + 16px))",
          transition: "transform 0.5s ease-in-out",
        }}
      >
        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsSheetOpen(true);
            }}
            role="search"
            aria-label="Ask AI assistant"
            className="relative rounded-2xl border border-border bg-card/95 p-1 shadow-2xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <label htmlFor="assistant-input" className="sr-only">
                Ask a question
              </label>
              <input
                id="assistant-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question..."
                className="min-h-[44px] flex-1 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <div className="flex items-center gap-2 pr-2">
                <kbd className="hidden rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
                  ⌘I
                </kbd>
                <Button
                  type="submit"
                  size="icon"
                  className="h-10 w-10 min-h-[44px] min-w-[44px] rounded-lg"
                  disabled={!query.trim()}
                  aria-label="Send message"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <AssistantSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </>
  )
}
