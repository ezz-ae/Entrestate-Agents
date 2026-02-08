"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Topbar } from "./topbar"
import { Sidebar } from "./sidebar"
import { MobileNav } from "./mobile-nav"
import { MobileBreadcrumbBar } from "./mobile-breadcrumb-bar"
import { Footer } from "./footer"
import { SkipLink } from "./skip-link"
import { CommandPalette } from "@/components/search/command-palette"
import { AssistantDock } from "@/components/assistant/assistant-dock"
import { AssistantSheet } from "@/components/assistant/assistant-sheet"
import { navigation } from "@/lib/docs/nav"
import { useBehavioralEngine } from "@/hooks/use-behavioral-engine"
import { BestNextStepCard } from "@/components/intelligence/BestNextStepCard"

interface DocsShellProps {
  children: React.ReactNode
}

export function DocsShell({ children }: DocsShellProps) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { activeSignal, dismissSignal, triggerSignal } = useBehavioralEngine();

  // Find current section and page for breadcrumbs
  const currentNav = navigation.find((section) => section.items.some((item) => item.href === pathname))
  const currentPage = currentNav?.items.find((item) => item.href === pathname)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <Topbar onSearchClick={() => setSearchOpen(true)} onAssistantClick={() => {}} />
      <MobileBreadcrumbBar
        section={currentNav?.title}
        page={currentPage?.title}
        onMenuClick={() => setMobileNavOpen(true)}
      />
      <div className="flex flex-1">
        <div className="hidden lg:block">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)]">
            <Sidebar onSearchClick={() => setSearchOpen(true)} onAssistantClick={() => {}} />
          </div>
        </div>
        <main id="main-content" className="relative flex-1 overflow-hidden" tabIndex={-1}>
          {children}
          <Footer />
          <AssistantDock />
        </main>
      </div>

      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
      
      {activeSignal && (
        <BestNextStepCard 
          signal={activeSignal.signal} 
          context={activeSignal.context}
          onMitigate={() => {
            // Log mitigation and redirect to specific agent/action
            dismissSignal();
          }}
          onAcceptRisk={() => dismissSignal()}
        />
      )}
    </div>
  )
}
