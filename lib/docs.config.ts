import {
  Sparkles,
  FolderCog,
  Palette,
  PenTool,
  BookOpen,
  Globe,
  Settings,
  Navigation,
  FileText,
  EyeOff,
  FolderX,
  Paintbrush,
  Type,
  Code,
  Component,
  Lock,
  FileQuestion,
  Edit,
  Terminal,
  AlignLeft,
  FileCode,
} from "lucide-react"

// Site configuration
export const siteConfig = {
  name: "Entrestate Director",
  description: "The Autonomous Real Estate Revenue Engine",
  url: "https://director.entrestate.com",
  ogImage: "/og-image.png",
  logo: {
    light: "/logo.svg",
    dark: "/logo.svg",
  },
  github: "https://github.com/ezz-ae/Entrestate-Agents",
  twitter: "https://twitter.com/entrestate",
}

// Top navigation links
export const topNavigation = [
  { label: "The Market Map", href: "/inventory" },
  { label: "Revenue Matrix", href: "/intelligence" },
  { label: "Deployment Hub", href: "/agents/builder" },
  { label: "Intelligence Protocol", href: "/docs" },
]

// Sidebar navigation
export const navigation = [
  {
    title: "Get started",
    icon: Sparkles,
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Quickstart", href: "/docs/quickstart" },
      { title: "AI-native", href: "/docs/ai-native" },
      { title: "Migration guide", href: "/docs/migration" },
    ],
  },
  {
    title: "Organize",
    icon: FolderCog,
    items: [
      { title: "Global settings", href: "/docs/global-settings" },
      { title: "Navigation", href: "/docs/navigation" },
      { title: "Pages", href: "/docs/pages" },
      { title: "Hidden pages", href: "/docs/hidden-pages" },
      { title: "Exclude files", href: "/docs/exclude-files" },
    ],
  },
  {
    title: "Customize",
    icon: Palette,
    items: [
      { title: "Custom domain", href: "/docs/custom-domain" },
      { title: "Themes", href: "/docs/themes" },
      { title: "Fonts", href: "/docs/fonts" },
      { title: "Custom scripts", href: "/docs/custom-scripts" },
      { title: "React", href: "/docs/react" },
      { title: "Dashboard access", href: "/docs/dashboard-access" },
      { title: "Custom 404 page", href: "/docs/custom-404" },
    ],
  },
  {
    title: "Create content",
    icon: PenTool,
    items: [
      { title: "Web editor", href: "/docs/web-editor" },
      { title: "Install the CLI", href: "/docs/cli" },
      { title: "Format text", href: "/docs/format-text" },
      { title: "Format code", href: "/docs/format-code" },
      { title: "Components", href: "/docs/components" },
    ],
  },
]

// Footer links
export const footerLinks = {
  explore: [
    { label: "Startups", href: "/startups" },
    { label: "Enterprise", href: "/enterprise" },
    { label: "Switch", href: "/switch" },
  ],
  resources: [
    { label: "Customers", href: "/customers" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact support", href: "/support" },
    { label: "Feature Requests", href: "/features" },
    { label: "Status", href: "/status" },
  ],
  company: [
    { label: "Careers", href: "/careers" },
    { label: "Wall of Love", href: "/wall-of-love" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Security", href: "/security" },
  ],
}

// Icon mapping for navigation
export const iconMap = {
  Sparkles,
  FolderCog,
  Palette,
  PenTool,
  BookOpen,
  Globe,
  Settings,
  Navigation,
  FileText,
  EyeOff,
  FolderX,
  Paintbrush,
  Type,
  Code,
  Component,
  Lock,
  FileQuestion,
  Edit,
  Terminal,
  AlignLeft,
  FileCode,
}
