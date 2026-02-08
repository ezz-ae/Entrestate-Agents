"use client"

import { X, ArrowUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface AssistantSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AssistantSheet({ open, onOpenChange }: AssistantSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        hideCloseButton
        className="flex w-[368px] min-w-[368px] max-w-[576px] flex-col gap-0 p-0 sm:max-w-[576px]"
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-medium">Assistant</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-1 flex-col min-h-0">
          {/* Chat messages area */}
          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Ask anything about the docs</h3>
              <p className="text-sm text-muted-foreground">
                Get instant answers, code examples, and guidance from the AI assistant.
              </p>
            </div>
          </div>

          <div className="border-t border-border/50 p-4">
            <div className="flex items-center gap-2">
              <Input placeholder="Ask a question..." className="flex-1 bg-secondary/50 border-border/50" />
              <Button size="icon" className="shrink-0">
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
