"use client"

import { useState } from "react"
import { Check, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "zh", label: "简体中文", flag: "🇨🇳" },
]

export function LanguageSelector() {
  const [selected, setSelected] = useState("en")
  const currentLang = languages.find((l) => l.code === selected) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-9 gap-2 rounded-full border-border/50 bg-secondary/50 px-3 hover:bg-secondary"
        >
          <span className="text-base">{currentLang.flag}</span>
          <span className="text-sm">{currentLang.label}</span>
          <ChevronUp className="h-3 w-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setSelected(lang.code)}
            className="flex items-center gap-2 focus:text-accent-foreground"
          >
            <span className="text-base">{lang.flag}</span>
            <span className={selected === lang.code ? "text-indigo-400 font-medium" : ""}>{lang.label}</span>
            {selected === lang.code && <Check className="ml-auto h-4 w-4 text-indigo-400" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
