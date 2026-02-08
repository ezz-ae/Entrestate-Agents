import type React from "react"
import {
  Rocket,
  Settings,
  Globe,
  Navigation,
  FileText,
  EyeOff,
  FolderX,
  Palette,
  Type,
  Code,
  Component,
  Shield,
  FileCode,
  PenTool,
  Terminal,
  BookOpen,
  Braces,
  Zap,
  TrendingUp,
  Activity,
} from "lucide-react"

export const siteConfig = {
  name: "Entrestate Director",
  description: "The Autonomous Real Estate Revenue Engine",
  url: "https://director.entrestate.com",
  links: {
    twitter: "https://twitter.com/entrestate",
    github: "https://github.com/ezz-ae/Entrestate-Agents",
  },
}

export const topNavigation = [
  { title: "Inventory", href: "/inventory" },
  { title: "Intelligence", href: "/intelligence" },
  { title: "Agent Builder", href: "/agents/builder" },
  { title: "Docs", href: "/docs" },
]

export const footerLinks = {
  explore: [
    { title: "Startups", href: "#" },
    { title: "Enterprise", href: "#" },
    { title: "Switch", href: "#" },
  ],
  resources: [
    { title: "Customers", href: "#" },
    { title: "Blog", href: "#" },
    { title: "Pricing", href: "#" },
    { title: "Contact support", href: "#" },
    { title: "Feature Requests", href: "#" },
    { title: "Status", href: "#" },
  ],
  company: [
    { title: "Careers", href: "#" },
    { title: "Wall of Love", href: "#" },
  ],
  legal: [
    { title: "Privacy Policy", href: "#" },
    { title: "Terms of Service", href: "#" },
    { title: "Security", href: "#" },
  ],
}

export interface NavItem {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface NavSection {
  title: string
  icon?: React.ComponentType<{ className?: string }>
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: "Get started",
    icon: Rocket,
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Quickstart", href: "/docs/quickstart" },
      { title: "AI-native", href: "/docs/ai-native" },
      { title: "Migration guide", href: "/docs/migration" },
    ],
  },
  {
    title: "Organize",
    icon: Settings,
    items: [
      { title: "Global settings", href: "/docs/global-settings", icon: Settings },
      { title: "Navigation", href: "/docs/navigation", icon: Navigation },
      { title: "Pages", href: "/docs/pages", icon: FileText },
      { title: "Hidden pages", href: "/docs/hidden-pages", icon: EyeOff },
      { title: "Exclude files", href: "/docs/exclude-files", icon: FolderX },
    ],
  },
  {
    title: "Market Intelligence",
    icon: Globe,
    items: [
      { title: "Inventory", href: "/inventory" },
      { title: "Intelligence Dashboard", href: "/intelligence" },
    ],
  },
  {
    title: "Agent Builder",
    icon: Zap,
    items: [
      { title: "Create Agent", href: "/agents/builder" },
      { title: "Expert Agents", href: "/docs/expert-agents" },
    ],
  },
  {
    title: "Customize",
    icon: Palette,
    items: [
      { title: "Custom domain", href: "/docs/custom-domain", icon: Globe },
      { title: "Themes", href: "/docs/themes", icon: Palette },
      { title: "Fonts", href: "/docs/fonts", icon: Type },
      { title: "Custom scripts", href: "/docs/custom-scripts", icon: Code },
      { title: "React", href: "/docs/react", icon: Component },
      { title: "Dashboard access", href: "/docs/dashboard-access", icon: Shield },
      { title: "Custom 404 page", href: "/docs/custom-404", icon: FileCode },
    ],
  },
  {
    title: "Create content",
    icon: PenTool,
    items: [
      { title: "Web editor", href: "/docs/web-editor", icon: PenTool },
      { title: "Install the CLI", href: "/docs/cli", icon: Terminal },
      { title: "Format text", href: "/docs/format-text", icon: BookOpen },
      { title: "Format code", href: "/docs/format-code", icon: Braces },
    ],
  },
]
