"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FileText, Hash, ArrowLeft } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { docPages } from "@/lib/docs/pages"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 150)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const filteredPages = useMemo(() => {
    const query = debouncedSearch.toLowerCase()
    if (!query) return docPages
    return docPages.filter(
      (page) => page.title.toLowerCase().includes(query) || page.description.toLowerCase().includes(query),
    )
  }, [debouncedSearch])

  const handleSelect = (slug: string) => {
    onOpenChange(false)
    setSearch("")
    router.push(slug ? `/docs/${slug}` : "/docs")
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} showCloseButton={false}>
      <div className="flex items-center gap-2 border-b border-border p-2 sm:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onOpenChange(false)}
          aria-label="Close search"
          className="shrink-0"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <CommandInput
          placeholder="Search..."
          value={search}
          onValueChange={setSearch}
          aria-label="Search documentation"
          className="border-0 focus:ring-0"
        />
      </div>
      <div className="hidden sm:block">
        <CommandInput
          placeholder="Search documentation..."
          value={search}
          onValueChange={setSearch}
          aria-label="Search documentation"
        />
      </div>
      <CommandList className="max-h-[60vh] sm:max-h-[300px]">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {filteredPages.map((page) => (
            <CommandItem
              key={page.slug}
              value={page.title}
              onSelect={() => handleSelect(page.slug)}
              className="group flex items-center gap-3 py-3 sm:py-2"
            >
              <FileText
                className="h-4 w-4 text-muted-foreground group-data-[selected=true]:text-primary-foreground shrink-0"
                aria-hidden="true"
              />
              <div className="flex flex-col min-w-0">
                <span className="truncate">{page.title}</span>
                <span className="text-xs text-muted-foreground group-data-[selected=true]:text-primary-foreground/80 truncate hidden sm:block">
                  {page.description}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Quick links">
          <CommandItem
            onSelect={() => handleSelect("quickstart")}
            className="group flex items-center gap-3 py-3 sm:py-2"
          >
            <Hash
              className="h-4 w-4 text-muted-foreground group-data-[selected=true]:text-primary-foreground"
              aria-hidden="true"
            />
            <span>Getting Started</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("cli")} className="group flex items-center gap-3 py-3 sm:py-2">
            <Hash
              className="h-4 w-4 text-muted-foreground group-data-[selected=true]:text-primary-foreground"
              aria-hidden="true"
            />
            <span>CLI Reference</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
