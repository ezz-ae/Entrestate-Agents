Technical Blueprint: Transforming the Entrestate Intelligence Engine into a Production UI

1. Architectural Vision and System Synergy

This blueprint defines the strategic migration of the Entrestate Intelligence Engine from its analytical origins in Snowflake and Hex to a high-performance, AI-native runtime environment on Vercel and Next.js 15. By unifying the multi-layered data logic with the "Entrestate-Agents" UI template, we transition from static market documentation into an executable investment platform. This integration ensures that the sophisticated Python-based reasoning—capable of modeling market corrections and developer reputations—is delivered with zero-loss fidelity to the end-user via a responsive, Type-safe TypeScript architecture.

Core System Stack

Layer	Technology	Implementation Details
Framework	Next.js 15 (App Router)	Utilizing React 19 features and Server Components.
Styling	Tailwind CSS 4	Utilizing @theme variable extensions and CSS-native nesting.
Components	shadcn/ui & Lucide React	High-performance, accessible primitive library.
Theme & UI	next-themes	Automatic dark/light mode detection.
Typography	Geist Sans & Mono	Optimized for technical and numerical readability.
Data Logic	5-Layer Inventory Model	Transitioning Hex analytics into TS-based services.
Runtime	Vercel Edge Runtime	Low-latency execution for AI reasoning and filtering.

The architectural goal is a rigid, manifest-driven development process that eliminates file duplication and ensures the AI assistant maintains complete system integrity during the build.


--------------------------------------------------------------------------------


2. The 5-Layer Data Model Implementation

The 5-Layer Inventory Model acts as the application's "brain," treating real estate projects as living financial nodes rather than static records. This structure allows the UI to react dynamically to changes in the Identity Kernel or Decision Flags.

TypeScript Interfaces

The following schemas in lib/engine/types.ts enforce the structural integrity of the market graph:

// Layer 1: Static Truths (The Immutable Base)
export interface StaticTruths {
  static_developer_id: string | null;
  static_city: string;
  static_area: string;
  static_unit_types: string; // e.g., "1-3BR"
  static_launch_year: number | null;
  static_original_price: number | null;
}

// Layer 2: Dynamic Truths (The Evolving State)
export type DeliveryConfidence = 'Delivered' | 'High (1yr)' | 'Medium (2-3yr)' | 'Low (4yr+)' | 'Speculative (6yr+)';

export interface DynamicTruths {
  dynamic_years_to_handover: number | null;
  dynamic_delivery_confidence: DeliveryConfidence;
  dynamic_price_pressure: 'Upward' | 'Stable' | 'Downward' | 'Unknown';
  dynamic_absorption: 'Active' | 'Passive';
  dynamic_last_activity: string | Date | null;
}

// Layer 3: Derived Truths (The Analytical Layer)
export interface DerivedTruths {
  derived_buyer_persona: 'Yield Seeker' | 'Flipper' | 'End User' | 'Portfolio Builder' | 'UHNW';
  derived_risk_class: 'Conservative' | 'Moderate' | 'Aggressive' | 'Speculative';
  derived_holding_logic: 'Yield' | 'Flip' | 'Occupy' | 'Hybrid';
  derived_capital_efficiency: number; // 0-100 Score: (Price/Bed + Time Value + Market Pricing)
  derived_liquidity_timeline: 'Immediate (Ready)' | 'Near-term (6-12mo)' | 'Short (1-2yr)' | 'Medium (2-4yr)' | 'Long (4yr+)';
}

// Layer 4 & 5: Kernel and Decision Engine
export interface InventoryNode extends StaticTruths, DynamicTruths, DerivedTruths {
  id: string; // url_path_segment
  kernel_identity: string; // Generated narrative: "Emaar | Downtown | Yield Seeker..."
  kernel_problem_solved: 'Cash Flow Generation' | 'Capital Appreciation' | 'Wealth Preservation' | 'Lifestyle';
  
  decision_flags: {
    flag_high_risk_high_return: boolean;
    flag_safe_yield: boolean; // v2 Logic: <2M AED + <1yr handover + Known Dev
    flag_flip_opportunity: boolean;
    flag_market_discount: boolean;
    flag_ready_now: boolean;
  };
}


Data Sanitization and Ingestion

The lib/engine/sanitization.ts utility must enforce strict Zod validation to eliminate "noise" identified in the source Hex analysis.

Sanitization Hard Constraints:

* Developer Noise Regex: Filter entries matching ^s$, ^at\s, or ^in\s.
* City-as-Developer filter: Reject developer names matching ['dubai', 'sharjah', 'abu dhabi', 'ajman', 'rak'].
* Timeline Boundaries: Launch years must fall between 2000-2030; completion years between 2010-2035.
* Price Outliers: Flag any price_from_aed < 1,000 (placeholders) or > 100,000,000 (outliers).


--------------------------------------------------------------------------------


3. Comprehensive File Manifest and Directory Map

To maintain system integrity, Gemini 3 must adhere to this unified file hierarchy, combining Next.js 15 App Router conventions with the engine logic.

├── app/
│   ├── (market)/
│   │   ├── inventory/
│   │   │   ├── [id]/page.tsx      # Deep dive into Project Kernel
│   │   │   ├── loading.tsx        # Skeleton for inventory loads
│   │   │   └── page.tsx           # Constraint-based search UI
│   │   └── intelligence/
│   │       ├── loading.tsx        # Skeleton for market stats
│   │       ├── error.tsx          # Error boundary for analytics
│   │       └── page.tsx           # Market Snapshot & Quadrant Views
│   ├── api/
│   │   ├── chat/route.ts          # Vercel AI SDK Intent Routing
│   │   └── engine/                # find_projects and what_if endpoints
│   └── layout.tsx
├── components/
│   ├── assistant/                 # AI Assistant UI (Dock & Sheet)
│   ├── intelligence/
│   │   ├── QuadrantGrid.tsx       # Risk (x) vs Timeline (y) Map
│   │   ├── DeveloperPortfolio.tsx # Historical execution cards
│   │   └── MarketSnapshot.tsx     # Hex-derived stats cards
│   └── ui/                        # shadcn/ui + Tailwind 4 primitives
├── lib/
│   ├── engine/
│   │   ├── types.ts               # 5-Layer Interfaces
│   │   ├── filters.ts             # find_projects() implementation
│   │   ├── scenarios.ts           # The 13 Scenario Templates
│   │   ├── reasoning.ts           # what_if() logic
│   │   ├── developer-profiles.ts  # Execution score logic (0-100)
│   │   └── sanitization.ts        # Noise removal logic
│   └── docs.config.ts             # Global site metadata
└── public/
    └── data/
        └── inventory.json         # Ground Truth Sink (Hex Export)


Manifest Verification Rule: The LLM must check the lib/engine/types.ts directory against the 5-layer schema before generating any UI component. Any prop mismatch in a component must trigger a schema update in the engine library first.


--------------------------------------------------------------------------------


4. Component Integration: Mapping UI to Intelligence

UI components are tethered directly to the 5-layer logic to ensure functional depth over aesthetic fluff.

Component-to-Logic Matrix

UI Component	Logic Hook / Function	Data Layer Used
Command Palette (⌘K)	find_projects()	Layer 1 (Static) + Layer 5 (Flags)
AssistantDock	ask_inventory()	Layer 4 (Kernel Identity)
MarketDashboard	market_snapshot()	Layer 2 (Dynamic Trends)
ScenarioPanel	run_scenario()	Layer 3 (Derived Metrics)
QuadrantGrid	market_axes_summary	Layer 3 (Risk vs. Timeline)

Decision Engine Visualization (Tailwind 4)

Using Tailwind 4 CSS variables for status representation:

* Safe Yield (flag_safe_yield): Apply @theme { --color-yield-safe: #10b981; }. Visualized as a "Conservative" badge with a high-confidence icon.
* Risk Quadrants: A QuadrantGrid component that maps derived_risk_class to columns and derived_liquidity_timeline to rows, placing projects on a 2D coordinate system.


--------------------------------------------------------------------------------


5. AI Reasoning Engine and Scenario Hooks

The AI Reasoning Engine provides actionable consultancy by processing the 5-layer graph through structured intent routing.

Prompt Engineering Guidelines

The AssistantDock system prompt must encapsulate the Market Axes Analysis. When a user provides a query, the AI extracts parameters for find_projects():

* Intent: Under 2M? -> budget_max: 2000000.
* Scenario: What if rates rise? -> run_scenario('fed_rate_hike').

Scenario Templates (The 13 Engine Scenarios)

The engine supports 13 pre-built scenarios in lib/engine/scenarios.ts, including:

1. Macro: fed_rate_hike, fed_rate_cut, global_recession, oil_boom.
2. Geopolitical: regional_instability, capital_flight_to_uae, russia_sanctions.
3. Regulatory: golden_visa_expansion, escrow_enforcement, rera_price_controls.
4. Sector: material_shortage, expo_hangover, population_surge.

AI responses must translate these scenarios into "Winners" (e.g., Cash buyers during rate hikes) and "Losers" (e.g., leveraged flippers) based on the Hex logic.


--------------------------------------------------------------------------------


6. Execution Roadmap for Gemini 3 Transformation

Phase 1: Data Foundation

* Directive: "Step 1: Create TypeScript interfaces in lib/engine/types.ts based on the 5-Layer Model. Implement Zod validation in lib/engine/sanitization.ts to filter developer noise using the regex patterns ^s$ and ^at\s."

Phase 2: Core Logic Porting

* Directive: "Step 2: Port the find_projects, what_if, and get_developer_portfolio Python functions into TypeScript services in lib/engine/. Ensure the execution_score logic (0-100) and the 13 scenario templates are fully implemented."

Phase 3: UI and Route Mapping

* Directive: "Step 3: Build the app/(market)/inventory and app/(market)/intelligence routes. Create the QuadrantGrid component that maps projects based on derived_risk_class and derived_liquidity_timeline axes."

Phase 4: AI Integration

* Directive: "Step 4: Connect the AssistantDock component to a Vercel AI SDK route. Implement natural language intent routing that parses budget, city, and scenario names to call the underlying engine functions."

Quality Assurance Checklist

* [ ] Field Integrity: Verify developer and price_aed are non-null for >80% of records in inventory.json.
* [ ] Safe Yield Logic: Confirm flag_safe_yield correctly isolates projects <2M AED with <1yr to handover from known developers.
* [ ] Quadrant Fidelity: Ensure the QuadrantGrid accurately positions "Safe Yield" in Q1 and "Speculative" in Q4.
* [ ] Scenario Accuracy: Confirm run_scenario('fed_rate_hike') returns the correct Hex-derived recommendations for cash-ready investors.

The system is now ready for the transition from analytical model to production runtime. Begin with Phase 1.
