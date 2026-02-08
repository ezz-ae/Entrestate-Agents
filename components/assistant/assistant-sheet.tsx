"use client"

import { X, ArrowUp, Sparkles, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useChat } from '@ai-sdk/react';
import { ScrollArea } from "@/components/ui/scroll-area"

interface AssistantSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AssistantSheet({ open, onOpenChange }: AssistantSheetProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  // Custom Meta Agent Query Function for autonomous execution
  async function queryMetaAgent(prompt: string) {
    const res = await fetch('/api/meta-agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, agentId: 'agent-investment-advisor' }),
    });
    return res.json();
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        hideCloseButton
        className="flex w-[368px] min-w-[368px] max-w-[576px] flex-col gap-0 p-0 sm:max-w-[576px]"
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-medium">Entrestate Intelligence</span>
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

        <ScrollArea className="flex-1 px-4">
          <div className="py-6 space-y-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-black tracking-tighter mb-2">PROACTIVE INTELLIGENCE</h3>
                <p className="text-xs text-muted-foreground max-w-[280px] italic leading-relaxed">
                  "Your Intelligence Shield is 40% active. Provide your intent handle to complete the setup and activate full market dominance."
                </p>
                <div className="mt-6 flex flex-col gap-2 w-full max-w-[240px]">
                  <Button size="sm" className="w-full font-black text-[10px] tracking-widest uppercase h-10 shadow-lg shadow-primary/20 transition-transform active:scale-95">[ COMPLETE SETUP ]</Button>
                  <Button size="sm" variant="ghost" className="w-full font-bold text-[9px] text-muted-foreground opacity-50 underline decoration-dotted uppercase hover:text-destructive">
                    STAY PARTIAL (Vulnerable)
                  </Button>
                </div>
              </div>
            )}
            
            {messages.map(m => (
              <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role !== 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div className={`rounded-2xl px-4 py-2 text-sm max-w-[85%] ${
                  m.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted border border-border/50'
                }`}>
                  {m.content}
                </div>
                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start animate-pulse">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0" />
                <div className="rounded-2xl px-4 py-2 bg-muted h-10 w-24" />
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-border/50 p-4 bg-background">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input 
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a question..." 
              className="flex-1 bg-secondary/50 border-border/50" 
            />
            <Button size="icon" type="submit" disabled={isLoading || !input || input.trim() === ''} className="shrink-0">
              <ArrowUp className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
