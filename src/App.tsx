/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  STACK_LAYERS, 
  DIAGRAM_NODES, 
  HOW_TO_STEPS, 
  USE_CASES, 
  UPGRADES, 
  EXPANDED_LAYERS 
} from './data/stackData';
import { IconResolver } from './components/IconResolver';
import { FooterLinks } from './components/Navigation';
import { DependencyGraph } from './components/DependencyGraph';
import { 
  Cpu, 
  Globe, 
  Smartphone, 
  Database, 
  Gamepad2, 
  Bot, 
  Palette, 
  CreditCard, 
  Cloud, 
  Activity, 
  ShieldAlert, 
  Sparkles, 
  Wand2, 
  Boxes, 
  Users, 
  FileText, 
  Languages, 
  WifiOff, 
  Puzzle, 
  Lightbulb, 
  FileSpreadsheet, 
  Hammer, 
  CheckSquare, 
  Rocket, 
  Megaphone, 
  TrendingUp, 
  HelpCircle, 
  LifeBuoy,
  Code2, 
  Lock, 
  Compass, 
  ArrowRight,
  Laptop,
  Send,
  Copy,
  Check,
  ChevronRight,
  MessageSquare,
  Info,
  Github,
  Slack,
  CheckCircle2,
  RefreshCw,
  X,
  Plus,
  Sliders,
  ExternalLink,
  Layers,
  GitMerge,
  GripVertical,
  MoveLeft,
  MoveRight,
  RotateCcw,
  Edit2,
  Eye,
  Sun,
  Moon,
  Trash,
  Play,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIMilestone {
  name: string;
  action: string;
}

interface AIRecommendResponse {
  recommendedStack: {
    frontend: string;
    mobile?: string;
    backend: string;
    gameEngine?: string;
    ai: string;
    ui: string;
    payments: string;
    analytics?: string;
    auth?: string;
  };
  architectureAnalysis: string;
  suggestedMilestones: AIMilestone[];
  isFallback?: boolean;
}

const getCustomPersonalityResponse = (input: string, personality: 'wizard' | 'devops' | 'monetization' | 'security'): string => {
  const query = input.toLowerCase();

  if (personality === 'devops') {
    if (query.includes('deploy') || query.includes('cloud') || query.includes('run') || query.includes('port')) {
      return `### 🚀 DevOps Cloud Run Deployment Protocol:
1. **Target Environment:** Google Cloud Run. Your microservice must configure static binds to host \`0.0.0.0\` on port \`3000\` exclusively.
2. **Reverse Proxy Rules:** Port 3000 is the only externally reachable tunnel, routed via our highly optimized nginx reverse proxy layer.
3. **CI/CD Integration:** Bind your Personal Access Token (PAT) inside the GitHub manager at the bottom left. Once synchronized, it handles building automatic container images safely.
4. **Action Required:** Toggle the **CI/CD Deploy Pipeline (Layer 10)** above, or select the **"⚡ 1-Click DevOps Direct Deploy"** assistant trigger below to configure dependencies instantly!`;
    }
    if (query.includes('stripe') || query.includes('pay') || query.includes('monetizat')) {
      return `### 💸 DevOps Stripe Port & Hosting Webhooks:
- In cloud deployments, Webhook events must point to a secured server endpoint: \`https://app-url/api/webhooks/stripe\`.
- Use lazy SDK loading on the Server to preserve cold-starts: \`let stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)\` within the handler execution, avoiding module load load-times.`;
    }
    return `🛠️ [Terminal Connection Established] I am your DevOps Systems Engineer. Ask me about:
- Port 3000 routing constraints
- Nixpacks & Containerization builds
- CI/CD automation & Git integration
- Click the **"⚡ 1-Click DevOps Deploy"** button for immediate setup.`;
  }

  if (personality === 'monetization') {
    if (query.includes('stripe') || query.includes('pay') || query.includes('bill') || query.includes('subscr') || query.includes('checkout')) {
      return `### 💳 Stripe Checkout & Monetization Handshake:
1. **No Client-Side Keys:** Always process Stripe transactions inside secure backend routes (\`/api/checkout\`).
2. **Lazy Instance Generation:** Initialize the API client inside your API handler to prevent early configuration failure crashes.
3. **Dynamic User Roles Mapping:** Map plans like \`price_premium_99\` directly to Postgres database profiles. Users receive the 'Pro' tier tag.
4. **Database Triggers:** Enable **Layer 7 (Payments Gateway)** and **Layer 3 (Database Profiles)** to track invoice histories.
5. **Action Required:** Select the **"💳 1-Click Payments Setup"** trigger below to instantly coordinate database schemas!`;
    }
    return `💰 [Monetization Console Live] Ready to construct high conversion SaaS systems. Let me advise you on:
- Stripe checkout loops & Webhooks
- Product pricing schema configurations
- Premium content locks & Tiered access
- Custom Stripe pricing models. Run the payment preset triggers below to test!`;
  }

  if (personality === 'security') {
    if (query.includes('jwt') || query.includes('cookie') || query.includes('cors') || query.includes('secure') || query.includes('auth')) {
      return `### 🔐 JWT Token Protection & iframe SameSite Cookies:
1. **SameSite Security:** In embedded preview containers (like the AI Studio iframe), same-site cookie permissions must be handled explicitly: \`SameSite=None; Secure;\` headers.
2. **Row-Level Security (RLS):** Apply table limits:
   \`ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;\`
   \`CREATE POLICY "auth_profile_view" ON profiles FOR SELECT USING (auth.uid() = id);\`
3. **Guard Shielding:** Enable **Layer 6 (Auth Gates)** above to verify auth tokens before they hit the database pipeline.`;
    }
    return `🔐 [Security Sandbox Session Active] I am inspecting cookie paths, auth tokens, and network limits. Ask me about:
- JWT payload configuration
- Postgres Row-Level Security policies
- Protecting preview iframe session tokens
- Toggle **Layer 6 (Auth Gates)** to shield application networks immediately.`;
  }

  // Default: Full-Stack Wizard
  if (query.includes('deploy') || query.includes('cloud')) {
    return `To compile ReefStack and deploy to **Google Cloud Run**:
1. Check that your node script serves on standard port \`3000\`.
2. Connect your Git repository at the bottom block to automatically push updates.
3. Click the **"⚡ 1-Click DevOps Deploy"** assistant shortcut below to automatically check relevant system layers!`;
  }
  if (query.includes('stripe') || query.includes('pay') || query.includes('bill')) {
    return `To establish secure SaaS checkout payment steps:
- Always use server-side routes to avoid exposing secret API keys.
- Coordinate **Layer 7 (Payments)** with **Layer 3 (Database Profiles)**.
- Choose **"💳 1-Click Payments Setup"** below to activate!`;
  }
  if (query.includes('supabase') || query.includes('postgres') || query.includes('database') || query.includes('db')) {
    return `To configure **Supabase Relational Database tables**:
1. Toggle **Layer 3 (Database Profiles)** and **Layer 2 (User Profiles)** to sync data schemas.
2. Enable RLS to prevent unauthorized rows query access.
3. Ensure to seed initial relational schemas with migrations inside drizzle toolkit consoles.`;
  }
  if (query.includes('ai') || query.includes('gemini') || query.includes('vector')) {
    return `To integrate **Gemini AI & pgvector embeddings**:
- Import the recommended SDK: \`import { GoogleGenAI } from "@google/genai";\`
- Maintain API keys inside private environment variables (\`process.env.GEMINI_API_KEY\`).
- Apply semantic similarity filters inside backend routes for ultra-smart analytics!`;
  }

  return `🧙‍♂️ [Full-Stack Wizards Vault Activated] Let's build something beautiful! I can help you with:
- React state & Framer Motion transitions
- Clean CSS layouts & responsive design
- Blueprint synchronization with Cloud SQL
- Check out our rich custom tutorials or write your custom questions below!`;
};

interface AnimatedReefProps {
  mode: 'logo' | 'chat';
}

function AnimatedReef({ mode }: AnimatedReefProps) {
  return (
    <div className={`relative ${mode === 'logo' ? 'w-11 h-11' : 'w-14 h-14'} flex items-center justify-center rounded-xl bg-gradient-to-t from-cyan-950/80 via-slate-950 to-[#0b132b] border border-cyan-500/35 shadow-[0_0_20px_rgba(6,182,212,0.15),inset_0_2px_8px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-105 group/reef select-none shrink-0 overflow-visible`}>
      
      {/* Dynamic Hover Sonar Rings (expanding outwards) */}
      <div className="absolute inset-0 rounded-xl pointer-events-none overflow-visible">
        <div className="absolute -inset-4 rounded-full border border-cyan-500/20 opacity-0 group-hover/reef:opacity-100 sea-sonar-wave-1 pointer-events-none" />
        <div className="absolute -inset-8 rounded-full border border-indigo-500/10 opacity-0 group-hover/reef:opacity-100 sea-sonar-wave-2 pointer-events-none" />
      </div>

      {/* Internal Submerged elements */}
      <div className="absolute inset-0.5 rounded-[10px] overflow-hidden bg-[#010411]">
        {/* Deep sea ambient ocean light rays background */}
        <div className="absolute inset-0 bg-radial-[at_50%_0%] from-cyan-500/20 via-transparent to-transparent opacity-90" />

        {/* Dynamic Refined SVG Artwork */}
        <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 select-none pointer-events-none">
          <defs>
            <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
              <stop offset="85%" stopColor="#0891b2" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </radialGradient>
            
            <linearGradient id="neonCyan" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>

            <linearGradient id="neonRose" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
            
            <linearGradient id="neonGold" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            <linearGradient id="neonPurple" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ambient background glow circle */}
          <circle cx="50" cy="45" r="35" fill="url(#ringGlow)" />

          {/* Rising Tiny Bioluminescent Bubbles */}
          <circle cx="28" cy="72" r="1.5" fill="#22d3ee" className="sea-bubble-1 opacity-80" />
          <circle cx="48" cy="62" r="2.2" fill="#38bdf8" className="sea-bubble-2 opacity-60" />
          <circle cx="72" cy="78" r="1" fill="#e0f2fe" className="sea-bubble-3 opacity-95" />
          <circle cx="58" cy="42" r="1.5" fill="#c084fc" className="sea-bubble-2 opacity-75" />
          <circle cx="78" cy="38" r="1.2" fill="#22d3ee" className="sea-bubble-1 opacity-85" />

          {/* Swimming cyber-micro fish gliding in a loop */}
          <g className="sea-swim-fish-1 text-cyan-400">
            <path d="M 45,52 Q 50,48 55,52 Q 53,52 50,55 Z" fill="url(#neonCyan)" opacity="0.85" />
            <circle cx="54" cy="51" r="0.5" fill="#ffffff" />
          </g>

          {/* Base Reef Mounds */}
          <path 
            d="M 10,100 C 10,88 24,84 32,92 C 38,94 40,98 44,100 Z" 
            fill="url(#neonPurple)" 
            opacity="0.8" 
          />
          <path d="M 14,97 Q 20,91 26,97" stroke="#d8b4fe" strokeWidth="0.8" fill="none" opacity="0.5" />
          <path d="M 18,94 Q 24,88 29,94" stroke="#d8b4fe" strokeWidth="0.8" fill="none" opacity="0.5" />

          <path 
            d="M 60,100 C 65,90 78,86 86,93 C 92,95 92,100 92,100 Z" 
            fill="url(#neonPurple)" 
            opacity="0.75" 
          />
          <path d="M 68,96 Q 74,90 80,96" stroke="#d8b4fe" strokeWidth="0.8" fill="none" opacity="0.4" />

          {/* Deep background Indigo/Purple Coral */}
          <path
            d="M 35,95 C 35,80 25,70 19,60 C 17,56 21,53 23,56 C 27,62 31,70 37,77 C 36,63 34,50 37,37 C 38,34 41,34 42,37 C 44,50 43,63 44,76 C 47,63 51,51 54,39 C 55,36 58,36 59,39 C 61,53 58,67 54,80 C 59,73 65,67 71,60 C 73,57 75,59 74,62 C 70,73 61,84 49,90 Z"
            fill="url(#neonPurple)"
            className="sea-coral-sway-3"
            opacity="0.55"
            style={{ filter: "drop-shadow(0 0 3px rgba(124,58,237,0.4))" }}
          />

          {/* Bioluminescent Cyber-Corals rising with continuous swaying */}
          {/* Main Staghorn Coral tree - Neon Cyan */}
          <path 
            d="M 44,100 L 45,75 C 45,70 41,68 37,64 C 32,59 28,50 29,42 C 29,38 32,38 33,41 C 35,46 38,54 41,59 C 41,50 39,40 40,30 C 41,27 44,27 45,30 C 47,39 46,49 48,58 C 50,49 53,40 55,32 C 56,29 59,29 60,32 C 61,43 59,54 57,64 C 61,59 66,56 70,50 C 72,47 74,48 73,51 C 70,59 63,68 53,74 L 52,100 Z" 
            fill="url(#neonCyan)" 
            className="sea-coral-sway-1 sea-pulsate-logo"
            opacity="0.9"
            style={{ filter: "drop-shadow(0 0 5px rgba(34,211,238,0.7))" }}
          />

          {/* Secondary Accent Coral Branch - Neon Rose/Pink */}
          <path 
            d="M 52,100 L 51,78 C 53,73 57,71 60,67 C 64,62 67,54 66,47 C 66,44 69,44 70,47 C 71,51 71,58 68,63 C 71,56 74,48 75,40 C 76,37 79,37 79,40 C 80,48 77,56 74,64 L 75,64 C 78,59 81,55 84,49 C 85,47 87,48 86,51 C 83,58 77,66 69,72 L 58,100 Z" 
            fill="url(#neonRose)" 
            className="sea-coral-sway-2"
            opacity="0.85"
            style={{ filter: "drop-shadow(0 0 5px rgba(244,63,94,0.65))" }}
          />

          {/* Bioluminescent Starfish at the Coral base */}
          <path 
            d="M 28,94 L 30.5,90 L 34,90 L 31.5,87.5 L 32.5,83.5 L 29,85.5 L 25.5,83.5 L 26.5,87.5 L 24,90 L 27.5,90 Z" 
            fill="url(#neonGold)" 
            opacity="0.95"
            style={{ filter: "drop-shadow(0 0 4px rgba(245,158,11,0.85))" }}
          />

          {/* Little glowing floating spores/plankton */}
          <circle cx="38" cy="48" r="0.7" fill="#10b981" className="sea-bubble-3 opacity-90 animate-pulse" />
          <circle cx="64" cy="58" r="0.8" fill="#10b981" className="sea-bubble-1 opacity-80 animate-pulse" />
          <circle cx="21" cy="62" r="0.6" fill="#fbbf24" className="sea-bubble-2 opacity-95 animate-pulse" />
        </svg>
      </div>

      {/* Pulsing micro-status indicator at the bottom-right */}
      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#020512] border border-cyan-500/40 flex items-center justify-center shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="absolute w-1.5 h-1.5 rounded-full bg-emerald-500" />
      </div>
    </div>
  );
}

interface RecommendScenario {
  id: string;
  name: string;
  description: string;
  sequence: number[];
  justification: string;
  badges: string[];
}

const SCENARIOS: RecommendScenario[] = [
  {
    id: 'saas',
    name: 'Secure SaaS Dashboard',
    description: 'Auth isolation, database integration, metrics, and billing.',
    sequence: [10, 3, 7, 1, 9], // Auth (10) -> DB (3) -> Payments (7) -> Frontend (1) -> Analytics (9)
    justification: 'Placing Auth (Layer 10) before Backend & Database (Layer 3) is a vital best-practice. It ensures Row-Level Security matches active user contexts before fetching rows. Payments (Layer 7) follows database registration so account metadata aligns perfectly.',
    badges: ['Auth first', 'RLS Gate', 'Billing webhooks']
  },
  {
    id: 'ai-portal',
    name: 'Contextual AI Copilot',
    description: 'Ensuring safe, authenticated vector prompts with LLM groundings.',
    sequence: [10, 3, 5, 1, 9], // Auth (10) -> DB (3) -> AI Layer (5) -> Frontend (1) -> Analytics (9)
    justification: 'Placing Auth (Layer 10) before Database (Layer 3) prevents unauthenticated metadata leaks. Database (Layer 3) precedes AI Layer (5) to inject custom enterprise facts (vector search embeddings) into Gemini prompts.',
    badges: ['Embedding Context', 'Prevent Leakage', 'Secure LLM']
  },
  {
    id: 'realtime-gaming',
    name: 'Realtime Multiplayer Engine',
    description: 'Immediate authentication of socket clients prior to opening persistent game streams.',
    sequence: [10, 4, 3, 2, 9], // Auth (10) -> Game Engine (4) -> DB (3) -> Mobile (2) -> Analytics (9)
    justification: 'Placing Auth (Layer 10) before Game Engine (Layer 4) guarantees only valid account tokens spawn multiplayer entities, reducing server-load from unauthenticated requests.',
    badges: ['High Sync Socket', 'Anti-DDoS Login', 'Low Latency']
  },
  {
    id: 'automation-cicd',
    name: 'Cloud Run DevOps Pipeline',
    description: 'Static audits, optimized containers packing, and automated deploy releases.',
    sequence: [1, 9, 8], // Frontend (1) -> Analytics/Monitoring (9) -> Deploy (8)
    justification: 'Placing Analytics & Monitoring (Layer 9) directly beside Deployment (Layer 8) allows automatic release rollback in case health checks or synthetics report active service errors.',
    badges: ['Auto-Rollback', 'Continuous Release', 'Audit Scopes']
  }
];

export default function App() {
  // Layer Selection State
  const [selectedLayerIds, setSelectedLayerIds] = useState<number[]>([1, 2, 3, 5, 6, 7, 8, 10]);
  
  // Layer list with drag-and-drop support
  const [layersList, setLayersList] = useState<typeof STACK_LAYERS>(STACK_LAYERS);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Drag-and-Drop system handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    if (draggedIndex === index) return;

    const newList = [...layersList];
    const draggedItem = newList[draggedIndex];
    // Remove current
    newList.splice(draggedIndex, 1);
    // Insert back at target
    newList.splice(index, 0, draggedItem);

    setLayersList(newList);
    setDraggedIndex(null);
    setDragOverIndex(null);
    showToast(`Reordered layers: '${draggedItem.name}' moved to position ${index + 1}`);
  };

  const moveLayer = (currentIndex: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= layersList.length) return;

    const newList = [...layersList];
    const temp = newList[currentIndex];
    newList[currentIndex] = newList[targetIndex];
    newList[targetIndex] = temp;
    setLayersList(newList);
    showToast(`Shifted '${temp.name}' successfully to position ${targetIndex + 1}`);
  };

  const resetLayersOrder = () => {
    setLayersList(STACK_LAYERS);
    showToast("Restored original core system layers sequence!");
  };
  
  // Sidebar Sandbox state
  const [activeSandboxLayerId, setActiveSandboxLayerId] = useState<number>(3);
  const [isSandboxOpen, setIsSandboxOpen] = useState<boolean>(false);
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);
  const [sandboxCopied, setSandboxCopied] = useState<boolean>(false);
  const [customVariables, setCustomVariables] = useState<Record<string, string>>({
    tableName: 'transactions',
    metricsUrl: 'https://api.supabase.co/rest/v1/metrics',
    priceId: 'price_premium_99',
    appName: 'ReefStack Engineered Portal',
    playerSpeed: '320.0'
  });

  // Diagram Node Details state
  const [activeNodeId, setActiveNodeId] = useState<string>('supabase');
  const [flowViewMode, setFlowViewMode] = useState<'diagram' | 'd3'>('diagram');

  // AI & presets tab state
  const [aiPanelTab, setAiPanelTab] = useState<'presets' | 'ai-architect' | 'live-advisor' | 'github-sync'>('presets');
  
  // Custom AI Architect state
  const [projectDescription, setProjectDescription] = useState('');
  const [customPreferences, setCustomPreferences] = useState('');
  const [aiResponse, setAiResponse] = useState<AIRecommendResponse | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({});

  // Layer sequence recommendation state and mechanics
  const [activeScenarioId, setActiveScenarioId] = useState<string>('saas');
  const [userCustomRequirements, setUserCustomRequirements] = useState<string>('');

  const handleOptimizedReorder = (scenarioId: string, customSequence?: number[]) => {
    let priorityIds: number[] = [];
    if (customSequence) {
      priorityIds = customSequence;
    } else {
      const sc = SCENARIOS.find(s => s.id === scenarioId);
      if (!sc) return;
      priorityIds = sc.sequence;
    }

    // Filter current catalog layers into a prioritized map
    const sorted = [...layersList].sort((a, b) => {
      const idxA = priorityIds.indexOf(a.id);
      const idxB = priorityIds.indexOf(b.id);

      if (idxA !== -1 && idxB !== -1) {
        return idxA - idxB;
      }
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });

    setLayersList(sorted);
    // Make sure Priority IDs are inside active selectedLayerIds
    const union = Array.from(new Set([...selectedLayerIds, ...priorityIds]));
    setSelectedLayerIds(union);
    showToast(`Layers optimized. Core handshakes aligned securely!`);
  };

  const analyzeUserRequirements = (text: string) => {
    const sequence: number[] = [];
    const reasons: string[] = [];
    const tags: string[] = [];
    const t = text.toLowerCase();

    // Determine dependencies to activate based on user text keywords
    const hasAuth = t.includes("auth") || t.includes("login") || t.includes("secure") || t.includes("sign") || t.includes("user") || t.includes("password");
    const hasDb = t.includes("db") || t.includes("database") || t.includes("postgres") || t.includes("supabase") || t.includes("sql") || t.includes("store");
    const hasAi = t.includes("ai") || t.includes("gemini") || t.includes("openai") || t.includes("llm") || t.includes("model") || t.includes("copilot") || t.includes("chat");
    const hasStripe = t.includes("billing") || t.includes("stripe") || t.includes("payment") || t.includes("checkout") || t.includes("subscription") || t.includes("pay");
    const hasGame = t.includes("game") || t.includes("godot") || t.includes("engine") || t.includes("graphics") || t.includes("unity") || t.includes("play");
    const hasMobile = t.includes("mobile") || t.includes("expo") || t.includes("native") || t.includes("ios") || t.includes("android") || t.includes("phone");
    const hasWeb = t.includes("web") || t.includes("react") || t.includes("nextjs") || t.includes("next.js") || t.includes("site");
    const hasTelemetry = t.includes("analytics") || t.includes("posthog") || t.includes("sentry") || t.includes("monitoring") || t.includes("error") || t.includes("telemetry");

    // Add in safety ordering:
    // Auth MUST come first before Database and AI
    if (hasAuth) {
      sequence.push(10);
      tags.push("Auth Enforced");
    }
    // Database comes key for storage
    if (hasDb) {
      sequence.push(3);
      tags.push("Database Provisioned");
    }
    // Generative AI
    if (hasAi) {
      sequence.push(5);
      tags.push("Gemini Integrated");
    }
    // Game Engine
    if (hasGame) {
      sequence.push(4);
      tags.push("Godot Enabled");
    }
    // Stripe
    if (hasStripe) {
      sequence.push(7);
      tags.push("Stripe Connected");
    }
    if (hasWeb) {
      sequence.push(1);
    }
    if (hasMobile) {
      sequence.push(2);
      tags.push("Expo Mobile");
    }
    if (hasTelemetry) {
      sequence.push(9);
      tags.push("Sentry Audited");
    }

    // Default sequence if empty/short input
    if (sequence.length === 0) {
      return {
        sequence: [10, 3, 6, 1, 9],
        justification: "Describe what you want to build above (e.g. 'A secured mobile application with postgres database and generative AI support'). Recommendation: Places Auth (Layer 10) first before Database (Layer 3) to protect row data via Row-Level Security policies.",
        tags: ["Secure Default", "SaaS Blueprint Ready"]
      };
    }

    // Generate smart reasons based on sequence ordering
    if (hasAuth && hasDb) {
      reasons.push("Authentication (Layer 10) is prioritized before Supabase Database (Layer 3) to protect row-level security policies (RLS). This blocks direct hacker queries before they query your enterprise schema.");
    } else if (hasDb && !hasAuth) {
      reasons.push("⚠️ WARNING: You requested Database (Layer 3) but no Auth filter was detected. We strongly suggest reordering a security layer (JWT Auth / RLS Policies) preceding the DB layer to prevent open table leakage.");
    }
    if (hasDb && hasAi) {
      reasons.push("The PostgreSQL database (Layer 3) is placed before the AI Layer (Layer 5) so metadata context and vector search embeddings can be extracted and injected into Gemini prompts.");
    }
    if (hasDb && hasStripe) {
      reasons.push("Database (Layer 3) resides before Stripe Billing (Layer 7) ensuring users exist in database profiles before triggering subscription credit logs.");
    }
    if (hasAi && hasStripe) {
      reasons.push("AI (Layer 5) resides before Stripe Billing (Layer 7) enabling smart automated AI billing auditing.");
    }

    if (reasons.length === 0) {
      reasons.push("The sequence prioritizes credentials verification controls before client interfaces, keeping your system architecture scalable and safe.");
    }

    return {
      sequence,
      justification: reasons.join(" "),
      tags
    };
  };

  // CI/CD simulator states
  const [ciStatus, setCiStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [ciActiveJob, setCiActiveJob] = useState<string>('');
  const [ciConsoleLogs, setCiConsoleLogs] = useState<string[]>([
    "=== GitHub Actions CI/CD Runner Platform ===",
    "Host: ubuntu-latest (Node v20.11.0)",
    "Status: Idle, awaiting manual pipeline trigger dispatch..."
  ]);

  const runCiPipelineSimulator = (jobName: string, lines: string[]) => {
    if (ciStatus === 'running') {
      showToast("A pipeline job is already active! Please wait.");
      return;
    }
    setCiStatus('running');
    setCiActiveJob(jobName);
    setCiConsoleLogs([
      `[Dispatch] Initializing trigger: ${jobName}...`,
      "Fetching target repository assets from cluster...",
      "Matching commit HEAD with origin/main..."
    ]);

    let currentLogs = [
      `[Dispatch] Initializing trigger: ${jobName}...`,
      "Fetching target repository assets from cluster...",
      "Matching commit HEAD with origin/main..."
    ];

    lines.forEach((line, index) => {
      setTimeout(() => {
        currentLogs = [...currentLogs, line];
        setCiConsoleLogs(prev => [...prev, line]);
        if (index === lines.length - 1) {
          setCiStatus('success');
          showToast(`CI/CD Job '${jobName}' completed in sandbox!`);
        }
      }, (index + 1) * 500);
    });
  };

  // Live Advisor Chat state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: "Welcome to the Systems Expert Advisor console. Ask me anything about configuring your row-level database security, active Stripe pricing webhooks, Next.js server actions, or Deno Edge Cron setups." }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // Expanded Feature Checklist state
  const [checkedExpandedFeatures, setCheckedExpandedFeatures] = useState<Record<string, boolean>>({
    "App Idea Generator": true,
    "Auto Code Generator": true,
    "Tailwind Configurator": true,
    "Save / Load System": true,
    "Admin Dashboard": true,
    "User Management": true,
  });

  // Upgrade active overview state
  const [activeUpgradeId, setActiveUpgradeId] = useState<string>('ai_builder');

  // Step Walker state
  const [activeStepNum, setActiveStepNum] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2]);

  // Private Markdown-based Notes state, stored per layer ID
  const [layerNotes, setLayerNotes] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('reefstack_layer_notes');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const updateLayerNote = (layerId: number, noteText: string) => {
    const updatedNotes = { ...layerNotes, [layerId]: noteText };
    setLayerNotes(updatedNotes);
    localStorage.setItem('reefstack_layer_notes', JSON.stringify(updatedNotes));
  };

  // PDF Report Modal states
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [reportAuthor, setReportAuthor] = useState('reeflose88@gmail.com');
  const [reportRevision, setReportRevision] = useState('v2.5.1-Stable');
  const [reportNotes, setReportNotes] = useState('This blueprint specification documents security scopes, client interfaces, transaction pathways, and continuous deployments integration.');

  // Interactive Footer Elements states
  const [activeFooterLink, setActiveFooterLink] = useState<string | null>(null);
  const [discordInput, setDiscordInput] = useState('');
  const [discordLogs, setDiscordLogs] = useState<Array<{user: string, role: string, msg: string, time: string}>>([
    { user: 'ReefAdmin', role: 'Staff ✦', msg: 'Welcome to ReefStack Alliance! Standard cookie rules have been successfully audited for our v2.5.1 core layouts.', time: '11:15 AM' },
    { user: 'ReactIndie', role: 'Developer', msg: 'Has anybody enabled the Stripe checkout gateway without database profile mapping? Getting webhook orphans.', time: '11:22 AM' },
    { user: 'SecEngineer', role: 'Expert ✦', msg: 'Yes, that triggers the safety warnings log. Always bind Payments (Layer 7) and Profiles DB (Layer 3) to persist custom invoice details!', time: '11:29 AM' },
  ]);
  const [supportTicks, setSupportTicks] = useState<Array<{id: number, title: string, priority: string, status: string, timestamp: string, answer?: string}>>([
    { id: 1045, title: 'SameSite Cookies override inside Safari iFrame layout', priority: 'High', status: 'RESOLVED', timestamp: 'Today', answer: 'Use explicit CORS origin configurations and set SameSite=None + Secure attribute headers in server.ts response handlers.' }
  ]);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketPriority, setNewTicketPriority] = useState('Medium');
  const [uptimeTestLogs, setUptimeTestLogs] = useState<string[]>([]);
  const [isUptimeRunning, setIsUptimeRunning] = useState(false);

  const [roadmapVotesState, setRoadmapVotesState] = useState<Record<string, number>>({
    'Automated PostgreSQL Extension installer': 42,
    'Live WebSocket Channel Sandbox Visualizer': 98,
    'One-Click Deno Edge Cron cloud integration': 59,
    'Continuous diagnostic telemetry warning flags': 74,
    'Framer Motion custom router micro-transitions': 116,
  });

  // Architectural Operational Modeler and Financial Dashboard States
  const [expectedMau, setExpectedMau] = useState<number>(35000);
  const [scaleOptimization, setScaleOptimization] = useState<boolean>(false);
  const [edgeCachingEnabled, setEdgeCachingEnabled] = useState<boolean>(true);

  const calculateSecurityScore = () => {
    let score = 100;
    const isSelected = (id: number) => selectedLayerIds.includes(id);
    
    // Warnings penalty
    const warnings = getValidationWarnings();
    warnings.forEach(() => {
      score -= 15;
    });

    if (!isSelected(10)) score -= 15; // Auth/Security is missing entirely
    if (isSelected(3) && !isSelected(10)) score -= 15; // Database active but no Auth (huge risk!)
    
    // Auth and DB positioning check:
    const authIndex = layersList.findIndex(l => l.id === 10);
    const dbIndex = layersList.findIndex(l => l.id === 3);
    if (isSelected(10) && isSelected(3) && authIndex > dbIndex) {
      score -= 12; // DB comes before Auth (unsafe sequence)
    }
    
    return Math.max(15, Math.min(100, score));
  };

  const calculateMonthlyCost = () => {
    if (selectedLayerIds.length === 0) return 0;
    
    const basePrices: Record<number, number> = {
      1: 15,  // Web
      2: 25,  // Mobile
      3: 25,  // Database (Supabase)
      4: 0,   // Games (Frictionless distribution)
      5: 40,  // AI Core (Gemini / Pinecone API)
      6: 0,   // Design (Tailwind, free)
      7: 10,  // API Router Gateway
      8: 15,  // Payments & Stripe
      9: 15,  // Sentry / Telemetry
      10: 20  // CI/CD pipelines
    };
    
    let baseSum = 0;
    selectedLayerIds.forEach(id => {
      baseSum += (basePrices[id] || 0);
    });
    
    // Exponential power scale of MAU (Users) on database, storage, bandwidth, and logging
    let trafficMultiplier = 1;
    if (expectedMau > 5000) {
      trafficMultiplier = 1 + Math.log10(expectedMau / 5000) * 1.65;
    }
    
    let total = baseSum * trafficMultiplier;
    
    if (scaleOptimization) {
      total = total * 0.58; // 42% serverless scale-to-zero discount
    }
    
    return Math.round(total * 100) / 100;
  };

  const calculatePerformanceRating = () => {
    let latency = 140; // baseline ms
    const isSelected = (id: number) => selectedLayerIds.includes(id);
    
    if (isSelected(1) && !isSelected(3)) {
      latency = 18; // Simple static client
    } else {
      if (isSelected(1)) latency -= 25; // CDN edge cache
      if (isSelected(3)) latency += 35; // DB connection handshake
      if (isSelected(5)) latency += 190; // Gen-AI tokens pipeline latency
      if (isSelected(7)) latency -= 15; // API gateway load-balancing optimization
    }
    
    if (edgeCachingEnabled) {
      latency = Math.max(8, Math.round(latency * 0.3)); // 70% cache hit latency reduction
    }
    
    return Math.max(4, latency);
  };

  const calculateBundleWeight = () => {
    let weightKb = 0;
    const isSelected = (id: number) => selectedLayerIds.includes(id);
    
    if (isSelected(1)) weightKb += 85; 
    if (isSelected(2)) weightKb += 130;
    if (isSelected(3)) weightKb += 48;
    if (isSelected(4)) weightKb += 18500; // Godot WASM engine flag!
    if (isSelected(5)) weightKb += 28;
    if (isSelected(6)) weightKb += 12;
    if (isSelected(7)) weightKb += 35;
    if (isSelected(8)) weightKb += 65;
    if (isSelected(9)) weightKb += 45;
    if (isSelected(10)) weightKb += 40;
    
    return weightKb;
  };

  const MODELER_PRESETS = [
    {
      name: "Dev Sandbox",
      layers: [1, 3, 6, 10],
      mau: 2500,
      scaleOptimization: true,
      edgeCaching: true,
      desc: "Minimal cost serverless playground. Ideal for single-user proofs of concepts."
    },
    {
      name: "AI SaaS Launchpad",
      layers: [1, 3, 5, 6, 7, 8, 9, 10],
      mau: 35000,
      scaleOptimization: false,
      edgeCaching: true,
      desc: "High-integrity telemetry, Stripe payouts, and Gemini agent assistants active."
    },
    {
      name: "Godot Web-Game",
      layers: [1, 4, 6, 10],
      mau: 150000,
      scaleOptimization: true,
      edgeCaching: false,
      desc: "Heavy multiplayer lobby deployment utilizing Godot visual WASM components."
    },
    {
      name: "Enterprise Multiplatform",
      layers: [1, 2, 3, 5, 6, 7, 8, 9, 10],
      mau: 650000,
      scaleOptimization: true,
      edgeCaching: true,
      desc: "Ecosystem scales at peak load. Sentry alerts, iOS, and database pools integrated."
    }
  ];

  const handleApplyModelerPreset = (preset: typeof MODELER_PRESETS[0]) => {
    setSelectedLayerIds(preset.layers);
    setExpectedMau(preset.mau);
    setScaleOptimization(preset.scaleOptimization);
    setEdgeCachingEnabled(preset.edgeCaching);
    showToast(`Dashboard Preset applied: ${preset.name}! Recalculated systems configuration.`);
  };

  // Theme & Interactive Chatbot Guide States
  const [theme, setTheme] = useState<'dark' | 'light' | 'deep-sea'>(() => (localStorage.getItem('reefstack_theme') as 'dark' | 'light' | 'deep-sea') || 'dark');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [activeTutorialId, setActiveTutorialId] = useState<string | null>(null);
  const [chatbotInput, setChatbotInput] = useState('');
  const [chatbotPersonality, setChatbotPersonality] = useState<'wizard' | 'devops' | 'monetization' | 'security'>('wizard');
  const [chatbotMessages, setChatbotMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    {
      role: 'assistant',
      content: `Hello Master Builder! 👋 I am your ReefStack AI Engineering Assistant. I am designed to make it incredibly easy for you to build apps and deploy them step-by-step.

Let me know what you want to build (e.g. "I want to deploy to Cloud Run" or "How to link Stripe?"), or select one of our premium in-dashboard guides below to begin!`
    }
  ]);

  // GitHub Repository Sync state settings
  const [gitHubRepo, setGitHubRepo] = useState(() => localStorage.getItem('reefstack_github_repo') || 'reeflose88/reefstack-blueprint');
  const [gitHubToken, setGitHubToken] = useState(() => localStorage.getItem('reefstack_github_pat') || '');
  const [gitHubBranch, setGitHubBranch] = useState('main');
  const [commitMessage, setCommitMessage] = useState('docs: sync ReefStack system architecture blueprint');
  const [isSyncing, setIsSyncing] = useState(false);

  const getNodeHighlightClass = (nodeId: string, activeClass: string, defaultClass = "border-[#0a1128] bg-slate-900/40 hover:bg-slate-900/70") => {
    if (activeNodeId !== nodeId) return defaultClass;
    if (theme === 'deep-sea') {
      return "border-emerald-400 bg-emerald-950/40 shadow-[0_0_20px_rgba(52,211,153,0.55)]";
    }
    return activeClass;
  };

  const generateREADME = () => {
    return `# 🐠 ReefStack Pro+ Modular Architecture Specification

This repository contains the dynamic system design blueprint generated on ReefStack Pro+.

Author: **${reportAuthor}**  
Revision: **${reportRevision}**  
Date: **${new Date().toLocaleDateString()}**

## 📝 Executive Overview & Architecture Focus
${reportNotes}

## ⚡ Active System Layers (${selectedLayerIds.length}/10 Enabled)
Here is the current sorted sequence of architectural blocks in the stack:

| Position | Layer ID | Module Name | Technology | Status | Private Team Documentation Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
${layersList.map((layer, index) => {
  const isActive = selectedLayerIds.includes(layer.id);
  const note = layerNotes[layer.id] ? layerNotes[layer.id].replace(/\n/g, '<br>') : '_No custom notes written._';
  return `| **POS ${index + 1}** | #${String(layer.id).padStart(2, '0')} | **${layer.name}** | \`${layer.technology}\` | ${isActive ? '✅ **ACTIVE**' : '❌ **DISABLED**'} | ${note} |`;
}).join('\n')}

---

## 🔒 Automated Real-Time Integrity & Validation Report
${getValidationWarnings().length > 0 ? `⚠️ **${getValidationWarnings().length} integration conflicts detected and scanned in the architecture:** \n\n` + getValidationWarnings().map((warn, i) => `### ${i+1}. ${warn.title} (${warn.severity.toUpperCase()})
- **Affected Layers:** ${warn.layerNames.join(', ') || 'Global'}
- **Conflict:** ${warn.description}
- **Resolution Path:** ${warn.resolution}`).join('\n\n') : `✅ **Perfect System Scan verified!** No modules integration conflicts detected between active segments.`}

---

## 🛠️ Codebase Snippets Catalog Output
All active system parameters are customized with live environment variables:
${layersList.filter(l => selectedLayerIds.includes(l.id)).map(layer => `
### Layer ${layer.id}: ${layer.name} (${layer.technology})
\`\`\`typescript
${getCustomizedSnippet(layer)}
\`\`\`
`).join('\n')}

---
*Generated via ReefStack Pro+ Systems Integrity Suite.*
`;
  };

  const generateReefstackJson = () => {
    return JSON.stringify({
      version: reportRevision,
      timestamp: new Date().toISOString(),
      author: reportAuthor,
      configuration: {
        selectedLayerIds,
        layersList: layersList.map((l, index) => ({ id: l.id, name: l.name, technology: l.technology, originalPosition: index })),
        customVariables,
        layerNotes
      }
    }, null, 2);
  };

  const handleAddSupportTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketTitle.trim()) return;
    const ticketId = Math.floor(Math.random() * 8000) + 1000;
    const userTitle = newTicketTitle.trim();
    const currentPriority = newTicketPriority;
    const newTick = {
      id: ticketId,
      title: userTitle,
      priority: currentPriority,
      status: 'PENDING CLIENT AGENT',
      timestamp: 'Just now'
    };
    setSupportTicks(prev => [newTick, ...prev]);
    setNewTicketTitle('');
    showToast(`Ticket #${ticketId} submitted to priority support queue!`);
    
    // Simulate AI response
    setTimeout(() => {
      let advice = "Our support unit is verifying this setup. Ensure that your configured layer variables are compiled properly.";
      const lowTitle = userTitle.toLowerCase();
      if (lowTitle.includes("stripe") || lowTitle.includes("payment")) {
        advice = "Stripe payments require continuous webhooks. Check if the environment STRIPE_SECRET_KEY is configured in Settings. Remember to proxy custom billing records on client-side requests via server/api routes.";
      } else if (lowTitle.includes("supabase") || lowTitle.includes("postgres") || lowTitle.includes("db") || lowTitle.includes("database")) {
        advice = "PostgreSQL error detected. Verify that schema migrations inside src/db/schema.ts align perfectly with database rules. Use cloudsql-update-schema if using standard Cloud SQL plugins.";
      } else if (lowTitle.includes("git") || lowTitle.includes("repo") || lowTitle.includes("sync")) {
        advice = "GitHub Sync requires a Personal Access Token with 'repo' privileges. Check that your repository owner/name is written in correct case and complies with standard CORS paths.";
      } else if (lowTitle.includes("cookie") || lowTitle.includes("iframe") || lowTitle.includes("safari")) {
        advice = "Iframe third-party cookie restrictions: Set SameSite=None + Secure. Users may also need to toggle Safari's 'Prevent Cross-Site Tracking' off for full local storage functionality inside frames.";
      } else if (lowTitle.includes("anim")) {
        advice = "Animations are handled with motion/react hooks. Try defining staggered delays using the item index so components cascade perfectly on load.";
      }
      
      setSupportTicks(prev => prev.map(t => t.id === ticketId ? { 
        ...t, 
        status: 'RECOMMENDED ACTION GENERATED', 
        answer: advice 
      } : t));
      showToast(`Priority bot generated recommended solution for Ticket #${ticketId}!`);
    }, 1500);
  };

  const handleSendDiscordMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discordInput.trim()) return;
    const userMsg = discordInput.trim();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      user: 'reeflose88',
      role: 'Beta Builder [You]',
      msg: userMsg,
      time: timeStr
    };
    setDiscordLogs(prev => [...prev, newMsg]);
    setDiscordInput('');
    showToast("Message broadcasted to Discord Alliance channel!");
    
    // Auto typist answer
    setTimeout(() => {
      let replyMsg = "That is awesome! Keep cataloging other blueprint layers. ReefStack Inc incorporates those changes directly.";
      const lowMsg = userMsg.toLowerCase();
      if (lowMsg.includes("docs") || lowMsg.includes("api")) {
        replyMsg = "The Docs & APIs section has full endpoints specs for all 10 modules! Tap that tab on the left inside this Resource Console.";
      } else if (lowMsg.includes("template") || lowMsg.includes("saas") || lowMsg.includes("preset")) {
        replyMsg = "Yes! I highly recommend testing the 'Solopreneur Rich SaaS Pack' template under SaaS Templates! It automatically connects Layer 3 (Supabase) + Layer 7 (Payments) + Layer 10 (CI/CD) with a single click.";
      } else if (lowMsg.includes("roadmap") || lowMsg.includes("vote")) {
        replyMsg = "Agreed, we should definitely upvote 'Live WebSocket Channel Sandbox Visualizer' in the Roadmap tab!";
      } else if (lowMsg.includes("error") || lowMsg.includes("help") || lowMsg.includes("db") || lowMsg.includes("stripe")) {
        replyMsg = "Oh, if you hit an architectural blockage, write a ticket inside the 'Active Support' tab — our priority diagnostics bot replies with precise corrective resolutions in 1 second.";
      } else if (lowMsg.includes("hello") || lowMsg.includes("hey") || lowMsg.includes("hi")) {
        replyMsg = "Hello @reeflose88! What custom web application or smartphone game are you compiling in ReefStack today?";
      }
      
      setDiscordLogs(prev => [...prev, {
        user: 'AllianceBot',
        role: 'Moderator Bot ⭐',
        msg: replyMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      showToast("AllianceBot is responding...");
    }, 1200);
  };

  const handleRunDiagnostics = () => {
    if (isUptimeRunning) return;
    setIsUptimeRunning(true);
    setUptimeTestLogs([]);
    
    const logsSequence = [
      "📡 [SYSTEM] Initializing complete standard architecture diagnostic check...",
      "🔍 [SYSTEM] Checking Active Layers: " + selectedLayerIds.map(id => `#${id}`).join(', ') + " currently loaded.",
      "⚠️ [DIAGNOSTIC] Checking configuration integrity models...",
      "🔒 [INFO] Scanning SameSite secure session cookies inside iframe environment...",
      "🟢 [SUCCESS] Perfect structural index layouts verified.",
      "🚀 [SYSTEM] Compiling customized environmental variables for Sandbox execution...",
      "✨ [COMPLETION] Self-Diagnostic run finished. Framework status: 100% HEALTHY & RESPONSIVE."
    ];
    
    logsSequence.forEach((logLine, index) => {
      setTimeout(() => {
        setUptimeTestLogs(prev => [...prev, logLine]);
        if (index === logsSequence.length - 1) {
          setIsUptimeRunning(false);
          showToast("🎉 Diagnostics compiled completely! Standard integrity: 100% stable.");
        }
      }, (index + 1) * 400);
    });
  };

  const handleGitHubSync = async () => {
    if (!gitHubRepo.includes('/')) {
      showToast("Error: GitHub Repo must follow 'username/repo-name' form.");
      return;
    }
    if (!gitHubToken) {
      showToast("Error: GitHub Personal Access Token (PAT) is required.");
      return;
    }

    setIsSyncing(true);
    showToast("Connecting to GitHub API...");

    try {
      const readmeText = generateREADME();
      const jsonText = generateReefstackJson();
      const [owner, repo] = gitHubRepo.trim().split('/');

      const commitSingleFile = async (path: string, contentStr: string) => {
        let fileSha: string | undefined = undefined;

        try {
          const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${gitHubBranch}`, {
            headers: {
              'Authorization': `token ${gitHubToken}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          });
          if (res.ok) {
            const fileInfo = await res.json();
            fileSha = fileInfo.sha;
          }
        } catch (e) {
          // Ignore, file doesn't exist yet
        }

        const encoder = new TextEncoder();
        const rawBytes = encoder.encode(contentStr);
        let binaryStr = "";
        for (let i = 0; i < rawBytes.byteLength; i++) {
          binaryStr += String.fromCharCode(rawBytes[i]);
        }
        const base64Data = btoa(binaryStr);

        const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${gitHubToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
          },
          body: JSON.stringify({
            message: `${commitMessage} [${path}]`,
            content: base64Data,
            sha: fileSha,
            branch: gitHubBranch
          })
        });

        if (!putRes.ok) {
          const errData = await putRes.json().catch(() => ({}));
          throw new Error(errData.message || `HTTP ${putRes.status} uploading ${path}`);
        }
      };

      await commitSingleFile('README.md', readmeText);
      await commitSingleFile('.reefstack.json', jsonText);

      // Store in localStorage
      localStorage.setItem('reefstack_github_repo', gitHubRepo);
      localStorage.setItem('reefstack_github_pat', gitHubToken);

      showToast("🎉 GitHub Repositories Synced! README.md & .reefstack.json updated!");
    } catch (err: any) {
      console.error(err);
      showToast(`Error: ${err.message || err}`);
    } finally {
      setIsSyncing(false);
    }
  };

  // Accessibility shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const isTyping = targetTag === 'input' || targetTag === 'textarea';

      // Ctrl + S (or Cmd + S) -> Save note
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        setIsEditingNote(false);
        showToast("💾 Notes stored & compiled locally!");
        return;
      }

      // Ctrl + P -> PDF Spec Builder
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsPrintModalOpen(true);
        showToast("📑 Snapshot report customizer triggered (Ctrl+P)!");
        return;
      }

      // Rearranging layers with Arrow keys (only if not actively typing inside input)
      if (!isTyping) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const currentIndex = layersList.findIndex(l => l.id === activeSandboxLayerId);
          if (currentIndex > 0) {
            moveLayer(currentIndex, 'left');
          } else {
            showToast("Layer is already in the top physical sequence!");
          }
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          const currentIndex = layersList.findIndex(l => l.id === activeSandboxLayerId);
          if (currentIndex < layersList.length - 1) {
            moveLayer(currentIndex, 'right');
          } else {
            showToast("Layer is already in the final physical sequence!");
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSandboxLayerId, layersList, isEditingNote]);

  // Diagnostics conflict validation model function
  const getValidationWarnings = () => {
    const warnings: Array<{
      id: string;
      title: string;
      severity: 'warning' | 'error' | 'info';
      layerNames: string[];
      description: string;
      resolution: string;
    }> = [];

    const isSelected = (id: number) => selectedLayerIds.includes(id);

    // Conflict 1: Web (1) or Mobile (2) Active but no Backend & Database (3) established
    if ((isSelected(1) || isSelected(2)) && !isSelected(3)) {
      warnings.push({
        id: 'client_isolation',
        title: 'Decoupled Client Isolation detected',
        severity: 'error',
        layerNames: [(isSelected(1) ? 'Frontend (Web)' : ''), (isSelected(2) ? 'Mobile' : '')].filter(Boolean),
        description: 'You have enabled active web/mobile visual clients, but no central Database/Backend service is configured to bind state.',
        resolution: 'Include Layer 3 (BACKEND & DATABASE) to supply database Row-Level Security profiles and webhooks hooks.'
      });
    }

    // Conflict 2: AI (5) selected, but no API routing (6) or Database backend (3) to secure secrets
    if (isSelected(5) && !isSelected(6) && !isSelected(3)) {
      warnings.push({
        id: 'direct_keys_exposure',
        title: 'Direct Client AI Key Exposure danger',
        severity: 'error',
        layerNames: ['AI / Analytics'],
        description: 'Dispatching raw Gemini client queries from browsers exposes secure tokens directly to developer inspect tools.',
        resolution: 'Enable Layer 6 (API Router Gateway / Express controllers) to proxy AI prompts from safe backend environments.'
      });
    }

    // Conflict 3: Game Engine Godot (4) + Next.js (1) hydration shifts
    if (isSelected(1) && isSelected(4)) {
      warnings.push({
        id: 'godot_ssr_mismatch',
        title: 'Next.js SSR Hydration Overhead',
        severity: 'warning',
        layerNames: ['Frontend (Web)', 'Game Engine'],
        description: 'Godot WASM canvas nodes injected inside static React files can crash hydration sequences inside NextJS engines.',
        resolution: 'Configure dynamic imports on the Next.js page so the Godot package mounts strictly with "{ ssr: false }".'
      });
    }

    // Conflict 4: Payments (7) active without a Database profiles base layout (3)
    if (isSelected(7) && !isSelected(3)) {
      warnings.push({
        id: 'orphaned_transactions',
        title: 'Webhook Transaction Orphans',
        severity: 'warning',
        layerNames: ['Payments'],
        description: 'Stripe payments require an active profiles table to write subscription statuses or extend digital wallet credits.',
        resolution: 'Activate Layer 3 (Supabase PostgreSQL profiles) to safely parse webhooks and provision user credits.'
      });
    }

    // Conflict 5: CI/CD Pipeline (10) enabled with no Target client
    if (isSelected(10) && !isSelected(1) && !isSelected(2) && !isSelected(4)) {
      warnings.push({
        id: 'empty_pipeline',
        title: 'Idle Orchestration Waste',
        severity: 'info',
        layerNames: ['CI/CD Orchestration'],
        description: 'Developer automated runner channels are active, but there are no target web/mobile packages selected to build.',
        resolution: 'Enable Layer 1 (Frontend Web) or Layer 2 (Mobile) to supply target files for the runner compile cycles.'
      });
    }

    // Conflict 6: Empty stack
    if (selectedLayerIds.length === 0) {
      warnings.push({
        id: 'entirely_empty',
        title: 'Absolute Null Blueprint Model',
        severity: 'error',
        layerNames: [],
        description: 'You have disabled every single architecture block. No clients, servers, or webhooks will run.',
        resolution: 'Select at least Layer 1 (Frontend Web) and Layer 3 (Database backend) to trigger initial setups.'
      });
    }

    return warnings;
  };

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Preset Selection Toggler
  const handleApplyPreset = (useCase: any) => {
    setProjectDescription(`A customized version: ${useCase.title}. ${useCase.description}`);
    setCustomPreferences(`Blueprint mapped specifically for high performance templates.`);

    // Map which of the 10 layers go active
    const targetLayerIds: number[] = [1, 3, 6, 10]; // minimum defaults
    if (useCase.suggestedStack.mobile) targetLayerIds.push(2);
    if (useCase.suggestedStack.gameEngine) targetLayerIds.push(4);
    if (useCase.suggestedStack.ai) targetLayerIds.push(5);
    if (useCase.suggestedStack.payments) targetLayerIds.push(7);
    if (useCase.suggestedStack.analytics || useCase.title.toLowerCase().includes("saas")) {
      targetLayerIds.push(8);
      targetLayerIds.push(9);
    }

    setSelectedLayerIds(targetLayerIds);
    showToast(`Successfully applied '${useCase.title}' template preset!`);
  };

  // Trigger recommendation API
  const handleGenerateAIRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectDescription.trim()) return;

    setIsAiLoading(true);
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectDescription,
          customPreferences,
          selectedLayerIds
        }),
      });

      const data = await response.json();
      setAiResponse(data);
      setCompletedMilestones({});
      showToast("Gemini verified customized architecture generated successfully!");
    } catch (err) {
      console.error(err);
      showToast("API Fallback system activated - standard credentials simulated.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Smart Chatbot Live Dashboard Manipulator
  const executeChatbotDashboardCommands = (phrase: string): boolean => {
    const text = phrase.toLowerCase();
    let triggered = false;

    // 1. Theme control
    if (text.includes("light mode") || text.includes("theme to light") || text.includes("activate light")) {
      setTheme('light');
      showToast("🐠 Live Reef Advisor: Visual theme updated to Light Mode!");
      triggered = true;
    } else if (text.includes("dark mode") || text.includes("theme to dark") || text.includes("activate dark")) {
      setTheme('dark');
      showToast("🐠 Live Reef Advisor: Visual theme updated to Crimson Dark!");
      triggered = true;
    } else if (text.includes("deep sea") || text.includes("abyssal") || text.includes("theme to deep sea")) {
      setTheme('deep-sea');
      showToast("🐠 Live Reef Advisor: Visual theme updated to Abyssal Glow Deep Sea Mode!");
      triggered = true;
    }

    // 2. Select All / Clear Layers
    if (text.includes("select all layers") || text.includes("enable all layers") || text.includes("activate all layers")) {
      setSelectedLayerIds([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      showToast("🐠 Live Reef Advisor: Successfully enabled all 10 Stack Layers!");
      triggered = true;
    } else if (text.includes("clear all layers") || text.includes("disable all layers") || text.includes("unselect all layers")) {
      setSelectedLayerIds([]);
      showToast("🐠 Live Reef Advisor: Successfully cleared all selected stack layers!");
      triggered = true;
    }

    // 3. Scenario Optimizations
    if (text.includes("saas profile") || text.includes("secure saas") || text.includes("optimize saas")) {
      setActiveScenarioId('saas');
      handleOptimizedReorder('saas');
      showToast("🐠 Live Reef Advisor: Optimized stack order for SaaS Profiles!");
      triggered = true;
    } else if (text.includes("ai portal") || text.includes("ai copilot") || text.includes("optimize ai")) {
      setActiveScenarioId('ai-portal');
      handleOptimizedReorder('ai-portal');
      showToast("🐠 Live Reef Advisor: Reordered and optimized stack for AI-Portal!");
      triggered = true;
    } else if (text.includes("multiplayer") || text.includes("realtime game") || text.includes("reorder game")) {
      setActiveScenarioId('realtime-gaming');
      handleOptimizedReorder('realtime-gaming');
      showToast("🐠 Live Reef Advisor: Loaded Realtime Multiplayer configuration!");
      triggered = true;
    } else if (text.includes("devops") || text.includes("ci/cd pipeline") || text.includes("optimize pipeline")) {
      setActiveScenarioId('automation-cicd');
      handleOptimizedReorder('automation-cicd');
      showToast("🐠 Live Reef Advisor: Optimized CI/CD pipeline structures!");
      triggered = true;
    }

    // 4. Trigger specific CI/CD actions from advisor chat
    if (text.includes("trigger test") || text.includes("run test") || text.includes("check unit specs")) {
      runCiPipelineSimulator("Release Unit Specs Checker", [
        "Setting up Node environment v20.11...",
        "[PASS] src/App.test.tsx > compiles perfectly",
        "✓ Verified 12 critical stack interfaces",
        "SUCCESS: Prompt triggered unit specifications verified successfully!"
      ]);
      showToast("🐠 Live Reef Advisor: Remotely executing specs checker...");
      triggered = true;
    } else if (text.includes("trigger docker") || text.includes("pack container") || text.includes("build docker")) {
      runCiPipelineSimulator("Pack Immutable Container", [
        "Staging Docker multi-stage workspace...",
        "STEP 3/3: EXPOSE port 3000...",
        "✓ Packed layer architecture into single dist assets",
        "SUCCESS: Remotely pushed immutable container successfully!"
      ]);
      showToast("🐠 Live Reef Advisor: Remotely compiling container tags...");
      triggered = true;
    }

    // 5. Open specific layer sandboxes
    const matchOpenSandbox = text.match(/(?:open|sandbox|inspect|show|load)\s+(web|mobile|database|postgres|game|ai|stripe|payments|auth|security|analytics|git|pipeline|github)/i);
    if (matchOpenSandbox) {
      const keyword = matchOpenSandbox[1].toLowerCase();
      let targetId = 3; // Database by default
      if (keyword.includes("web") || keyword.includes("frontend")) targetId = 1;
      else if (keyword.includes("mobile")) targetId = 2;
      else if (keyword.includes("game") || keyword.includes("godot")) targetId = 4;
      else if (keyword.includes("ai") || keyword.includes("gemini")) targetId = 5;
      else if (keyword.includes("auth") || keyword.includes("security")) targetId = 10;
      else if (keyword.includes("stripe") || keyword.includes("payments")) targetId = 7;
      else if (keyword.includes("analytics") || keyword.includes("sentry")) targetId = 9;
      else if (keyword.includes("git") || keyword.includes("pipeline") || keyword.includes("github")) targetId = 8;
      
      const exactLayer = layersList.find(l => l.id === targetId || l.name.toLowerCase().includes(keyword));
      if (exactLayer) {
        setActiveSandboxLayerId(exactLayer.id);
        setIsSandboxOpen(true);
        showToast(`🐠 Live Reef Advisor: Loaded the active Sandbox code for: ${exactLayer.name}!`);
        triggered = true;
      }
    }

    // 6. Generic layers selection additions
    let changed = false;
    layersList.forEach(l => {
      const namePart = l.name.toLowerCase();
      const techPart = l.technology.toLowerCase();
      if (text.includes(`enable ${namePart.split(" ")[0].toLowerCase()}`) || 
          text.includes(`add ${namePart.split(" ")[0].toLowerCase()}`) ||
          text.includes(`enable ${techPart.split(" ")[0].toLowerCase()}`) ||
          text.includes(`add ${techPart.split(" ")[0].toLowerCase()}`)) {
        if (!selectedLayerIds.includes(l.id)) {
          setSelectedLayerIds(prev => [...prev, l.id]);
          changed = true;
        }
      }
      if (text.includes(`disable ${namePart.split(" ")[0].toLowerCase()}`) || 
          text.includes(`remove ${namePart.split(" ")[0].toLowerCase()}`) ||
          text.includes(`disable ${techPart.split(" ")[0].toLowerCase()}`) ||
          text.includes(`remove ${techPart.split(" ")[0].toLowerCase()}`)) {
        if (selectedLayerIds.includes(l.id)) {
          setSelectedLayerIds(prev => prev.filter(x => x !== l.id));
          changed = true;
        }
      }
    });

    if (changed) {
      showToast("🐠 Live Reef Advisor: Synced dynamic dashboard layers!");
      triggered = true;
    }

    return triggered;
  };

  // Send Chat message to Gemini
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput.trim();
    const updatedMsgs = [...chatMessages, { role: 'user' as const, content: userMsg }];
    setChatMessages(updatedMsgs);
    setChatInput('');
    setChatLoading(true);

    // Apply immediate local command response to dashboard before backend call for maximum agility
    executeChatbotDashboardCommands(userMsg);

    try {
      const response = await fetch('/api/advisor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMsgs,
          selectedStackState: layersList.filter(l => selectedLayerIds.includes(l.id)).map(l => l.name)
        })
      });

      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      
      // Let assistant's architectural guidelines program target layers if specified in response content!
      executeChatbotDashboardCommands(data.content);
    } catch (err) {
      console.error(err);
      
      // Fallback sandbox simulation content matching the user message
      let reply = "I am ready to help configure your stack! Just type things like 'enable Auth', 'load Database sandbox', 'activate light mode' or 'run tests' to orchestrate the system panel live.";
      if (userMsg.toLowerCase().includes("auth") || userMsg.toLowerCase().includes("database") || userMsg.toLowerCase().includes("reorder")) {
        reply = "Understood. The optimal system configuration places Layer 10 (Auth & RLS) before Layer 3 (Database). I have verified this handshake in your local blueprint. Type 'load Auth' to inspect its JWT verification code in the sandbox.";
      }
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: `[Offline Sandbox Model] ${reply}` }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Standard variables updater
  const getCustomizedSnippet = (layer: any) => {
    let result = layer.codeSnippet || '';
    Object.entries(customVariables).forEach(([key, val]) => {
      result = result.split(`'${key}'`).join(`'${val}'`);
      result = result.split(`"${key}"`).join(`"${val}"`);
      result = result.split(`SPEED = 300.0`).join(`SPEED = ${customVariables.playerSpeed || '300.0'}`);
    });
    return result;
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setSandboxCopied(true);
    setTimeout(() => setSandboxCopied(false), 2000);
    showToast("Active code boilerplate copied to clipboard!");
  };

  const toggleLayerSelection = (id: number) => {
    setSelectedLayerIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleExpandedFeature = (name: string) => {
    setCheckedExpandedFeatures(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const totalExpandedChecked = Object.values(checkedExpandedFeatures).filter(Boolean).length;

  // Render markdown inline helper
  const renderMarkdown = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="text-sm font-bold text-cyan-300 mt-4 mb-2">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
        return <div key={idx} className="text-xs text-slate-200 ml-2 my-1 font-mono">{line}</div>;
      }
      return <p key={idx} className="text-xs text-slate-300 mt-1 leading-relaxed">{line}</p>;
    });
  };

  // Color mappings
  const getColorClass = (colorName: string) => {
    switch (colorName) {
      case 'cyan': return { border: 'border-cyan-500/20 hover:border-cyan-500/50', activeBorder: 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.25)]', text: 'text-cyan-400', bg: 'from-cyan-950/20 to-slate-950', iconBg: 'bg-cyan-500/10 text-cyan-400' };
      case 'emerald': return { border: 'border-emerald-500/20 hover:border-emerald-500/50', activeBorder: 'border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.25)]', text: 'text-emerald-400', bg: 'from-emerald-950/20 to-slate-950', iconBg: 'bg-emerald-500/10 text-emerald-400' };
      case 'purple': return { border: 'border-purple-500/20 hover:border-purple-500/50', activeBorder: 'border-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.25)]', text: 'text-purple-400', bg: 'from-purple-950/20 to-slate-950', iconBg: 'bg-purple-500/10 text-purple-400' };
      case 'amber': return { border: 'border-amber-500/20 hover:border-amber-500/50', activeBorder: 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.25)]', text: 'text-amber-400', bg: 'from-amber-950/20 to-slate-950', iconBg: 'bg-amber-500/10 text-amber-400' };
      case 'blue': return { border: 'border-blue-500/20 hover:border-blue-500/50', activeBorder: 'border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.25)]', text: 'text-blue-400', bg: 'from-blue-950/20 to-slate-950', iconBg: 'bg-blue-500/10 text-blue-400' };
      case 'pink': return { border: 'border-pink-500/20 hover:border-pink-500/50', activeBorder: 'border-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.25)]', text: 'text-pink-400', bg: 'from-pink-950/20 to-slate-950', iconBg: 'bg-pink-500/10 text-pink-400' };
      case 'indigo': return { border: 'border-indigo-500/20 hover:border-indigo-500/50', activeBorder: 'border-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.25)]', text: 'text-indigo-400', bg: 'from-indigo-950/20 to-slate-950', iconBg: 'bg-indigo-500/10 text-indigo-400' };
      case 'sky': return { border: 'border-sky-500/20 hover:border-sky-500/50', activeBorder: 'border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]', text: 'text-sky-400', bg: 'from-sky-950/20 to-slate-950', iconBg: 'bg-sky-500/10 text-sky-400' };
      case 'rose': return { border: 'border-rose-500/20 hover:border-rose-500/50', activeBorder: 'border-rose-400 shadow-[0_0_15px_rgba(251,113,133,0.25)]', text: 'text-rose-400', bg: 'from-rose-950/20 to-slate-950', iconBg: 'bg-rose-500/10 text-rose-400' };
      case 'teal': return { border: 'border-teal-500/20 hover:border-teal-500/50', activeBorder: 'border-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.25)]', text: 'text-teal-400', bg: 'from-teal-950/20 to-slate-950', iconBg: 'bg-teal-500/10 text-teal-400' };
      default: return { border: 'border-slate-800 hover:border-slate-700', activeBorder: 'border-slate-200', text: 'text-slate-300', bg: 'from-slate-900 to-slate-950', iconBg: 'bg-slate-800 text-slate-300' };
    }
  };

  // Diagram trace flow details mapping
  const getFlowExplanation = (id: string) => {
    switch (id) {
      case 'users': return { title: "Audience Pipeline Node", tag: "GATEWAY INPUT", details: "All incoming requests from clients route dynamically here. Includes standard browsers rendering React SSR code blocks, godot runtime instances query commands, and mobile packages.", advice: "Enable rate-limit guards within Express router files to avoid spam cycles." };
      case 'frontend_web': return { title: "Next.js Rendering Frontend Node", tag: "COMPOSABLE WEB", details: "Executes standard App Router logic. Resolves Server Components directly near database tables, and hides raw developer tokens safely behind server layers.", advice: "Apply Next.js Incremental Static Regeneration (ISR) with 'next: { revalidate: 3600 }' blocks." };
      case 'frontend_mobile': return { title: "Expo & Native Node", tag: "SMARTPHONE TARGETS", details: "Compiles iOS and Android modules asynchronously. Uses EAS clouds pipelines to package ready-built applications and delivers swift updates via OTA hooks.", advice: "Initialize local sqlite db connections inside App.tsx on startup to secure client logs." };
      case 'api_layer': return { title: "Secure API Routing Node", tag: "GATEWAY", details: "Translates high-speed requests between the client structures and database backends. Integrates Express middlewares and verifies safety tokens securely.", advice: "Declare all third-party credentials strictly behind endpoint paths to bypass CORS bottlenecks." };
      case 'supabase': return { title: "Supabase Central Database Node", tag: "POSTGRES CORE", details: "The core database engine. Features native Row-Level Security, keeps asset attachments protected within buckets, and triggers socket event updates.", advice: "Write strict RLS guidelines comparisons: 'auth.uid() = user_id' immediately on table formation." };
      case 'ai_layer': return { title: "AIS intelligence Node", tag: "REASONING MODULE", details: "Invokes Gemini SDK context vectors. Helps evaluate user files summaries, builds code, and coordinates prompt templates for continuous automation.", advice: "Prefer gemini-3.5-flash as its high token capacity effortlessly processes structural code logs." };
      case 'stripe': return { title: "Stripe Billing Infrastructure Node", tag: "SUBSCRIPTIONS PORTALS", details: "Processes transactions globally. Dispatches immediate alerts checking transaction webhooks and handles user self-service billing queries.", advice: "Embed the active user's internal ID metadata directly inside Stripe checkout sessions parameters." };
      case 'storage': return { title: "Cloudflare R2 Media Node", tag: "ASSETS HOUSING", details: "Maintains structural file uploads, game levels spritesheets, and avatars. Operates edge storage networks to cut down network retrieval times completely.", advice: "Separate public media files from sensitive invoice files cleanly of different access controls." };
      case 'deploy': return { title: "Orchestrated CI/CD Pipelines Node", tag: "AUTOMATION ENGINE", details: "Triggers on git push hooks. Packs mobile packages through Expo EAS and hosts your web layouts securely of global CDNs.", advice: "Embed Vitest regression queries inside testing workflows before dispatching code onto main branches." };
      default: return { title: "Ecosystem Integration Node", tag: "ACTIVE INTEGRATION", details: "Orchestrates complex data pipelines across your entire custom deployment blueprint models.", advice: "Tweak variables inside the Sandbox Playground panel to test other outcomes." };
    }
  };

  const currentFlowDetails = getFlowExplanation(activeNodeId);
  const activeUpgrade = UPGRADES.find(u => u.id === activeUpgradeId) || UPGRADES[0];
  const activeStep = HOW_TO_STEPS.find(s => s.number === activeStepNum) || HOW_TO_STEPS[0];

  return (
    <div id="reefstack-app-root" className={`min-h-screen transition-colors duration-500 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden relative ${
      theme === 'dark' ? 'bg-[#020512] text-slate-100' : theme === 'deep-sea' ? 'deep-sea bg-[#010c12] text-[#d1f3f9]' : 'bg-[#f4f7fe] text-slate-800'
    }`}>
      
      {/* Dynamic top ambient glow lines */}
      <div className={`absolute top-0 left-0 right-0 h-[400px] pointer-events-none transition-opacity duration-500 ${
        theme === 'dark' ? 'bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),rgba(59,130,246,0.05),transparent)] opacity-100' : theme === 'deep-sea' ? 'bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent)] opacity-100' : 'bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.05),transparent)] opacity-50'
      }`} />
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent pointer-events-none transition-opacity duration-500 ${
        theme === 'dark' ? 'opacity-100' : theme === 'deep-sea' ? 'opacity-100 bg-gradient-to-r from-transparent via-emerald-500/45 to-transparent' : 'opacity-40'
      }`} />
      
      {/* Decorative technical line grid blueprint paper styling */}
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,#0b1026_1px,transparent_1px),linear-gradient(to_bottom,#0b1026_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none transition-all duration-500 ${
        theme === 'dark' ? 'opacity-20' : theme === 'deep-sea' ? 'opacity-25 bg-[linear-gradient(to_right,#0c3132_1px,transparent_1px),linear-gradient(to_bottom,#0c3132_1px,transparent_1px)]' : 'opacity-5 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)]'
      }`} />

      {/* Primary Header section */}
      <header id="reef-header" className={`sticky top-0 z-40 w-full border-b backdrop-blur-md px-4 py-3.5 transition-all duration-350 ${
        theme === 'dark' 
          ? 'border-[#121c3b]/60 bg-[#030615]/85 text-slate-100' 
          : 'border-slate-205/70 bg-white/90 text-slate-800 shadow-[0_2px_20px_rgba(0,0,0,0.03)]'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand logo & dynamic active light */}
          <div className="flex items-center gap-3.5">
            <AnimatedReef mode="logo" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black font-sans tracking-wide bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                  REEFSTACK <span className={`font-light transition-colors ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>PRO+</span>
                </h1>
                <span className={`text-[10px] font-black tracking-widest px-2.5 py-0.5 rounded-full border transition-all duration-300 ${
                  theme === 'dark' ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-indigo-50 border-indigo-150 text-indigo-600'
                }`}>
                  v2.5 PRELEASE
                </span>
              </div>
              <p className={`text-[11px] font-extrabold uppercase tracking-widest mt-0.5 transition-colors ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                The Ultimate App & Game Construction Engine
              </p>
            </div>
          </div>

          {/* Real-time statistics counters bar */}
          <div className="flex items-center gap-3.5 flex-wrap justify-center">
            <div className={`flex items-center gap-2 p-1 px-3 rounded-lg text-[11px] border transition-all duration-300 ${
              theme === 'dark' ? 'bg-[#090e24] border-[#141d3d]' : 'bg-slate-100 border-slate-200/80 text-slate-700'
            }`}>
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Layers selected:</span>
              <span className="font-mono font-black text-cyan-500 dark:text-cyan-300">{selectedLayerIds.length}/10</span>
            </div>
            <div className={`flex items-center gap-2 p-1 px-3 rounded-lg text-[11px] border transition-all duration-300 ${
              theme === 'dark' ? 'bg-[#090e24] border-[#141d3d]' : 'bg-slate-100 border-slate-200/80 text-slate-700'
            }`}>
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>Features checked:</span>
              <span className="font-mono font-black text-purple-600 dark:text-purple-300">{totalExpandedChecked} modules</span>
            </div>
            <div className={`flex items-center gap-2 p-1 px-3 rounded-lg text-[11px] border transition-all duration-300 ${
              theme === 'dark' ? 'bg-indigo-950/20 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200 text-indigo-700'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-450 animate-pulse" />
              <span className="font-bold">● ACTIVE SANDBOX</span>
            </div>

            {/* Global Theme Mode Toggle Switcher */}
            <button
              id="theme-toggle-btn"
              onClick={() => {
                const nextTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'deep-sea' : 'dark';
                setTheme(nextTheme);
                localStorage.setItem('reefstack_theme', nextTheme);
                showToast(`Switched active theme mode to ${nextTheme === 'dark' ? 'Dark Mode 🌙' : nextTheme === 'light' ? 'Light Mode ☀️' : 'Deep Sea Abyssal 🐠'}!`);
              }}
              title="Toggle Global Color Theme (Light / Dark / Deep Sea)"
              className={`p-1.5 px-3 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${
                theme === 'dark'
                  ? 'bg-[#0f172a]/80 hover:bg-[#1e293b]/90 border-slate-700/60 text-amber-400 hover:text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.1)]'
                  : theme === 'deep-sea'
                  ? 'bg-[#011419]/90 hover:bg-[#02222b]/95 border-emerald-500/40 text-emerald-400 hover:text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                  : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-700 hover:text-slate-900 shadow-sm shadow-blue-500/5'
              }`}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline font-bold">Light Mode</span>
                </>
              ) : theme === 'deep-sea' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden sm:inline font-bold">Dark Mode</span>
                </>
              ) : (
                <>
                  <Compass className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="hidden sm:inline font-bold">Deep Sea</span>
                </>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Main Unified Board Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        
        {/* Unified Hero Promotional Banner */}
        <section id="hero-banner" className={`relative border rounded-3xl p-6 md:p-8 overflow-hidden shadow-2xl text-left transition-all duration-500 transform hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(6,182,212,0.12)] ${
          theme === 'dark' 
            ? 'border-[#142247]/65 bg-gradient-to-b from-[#08102a] to-[#040816] text-slate-100' 
            : 'border-slate-200bg-white bg-gradient-to-b from-white to-slate-50 text-slate-800 shadow-indigo-150/40 hover:shadow-[0_30px_60px_rgba(129,140,248,0.12)]'
        }`}>
          
          {/* Glowing particle background elements */}
          <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-indigo-900/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch justify-between gap-8">
            
            {/* Left side: Brand pitch and badges */}
            <div className="flex-1 space-y-5">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest">
                <span className={`px-2.5 py-1 justify-center rounded-md font-black border ${
                  theme === 'dark' ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' : 'bg-cyan-50 text-cyan-600 border-cyan-200'
                }`}>PREMIUM ARCHITECTURE EDITION</span>
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>• OVER 100k+ REAL TIME ECOSYSTEM DEPLOYMENTS</span>
              </div>

              <div className="space-y-1.5">
                <h2 className={`text-4xl md:text-5xl font-black tracking-tight font-sans uppercase transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  REEFSTACK <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">PRO+</span>
                </h2>
                <p className={`text-xs sm:text-sm font-bold leading-relaxed max-w-xl transition-colors duration-300 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-650'
                }`}>
                  THE ULTIMATE ALL-IN-ONE SYSTEM PLOTTER TO BUILD, LAUNCH, DEPLOY & SECURE WEB APPS, SMARTPHONE GAMES, AUTOMATIONS & AI WORKFLOWS.
                </p>
              </div>

              {/* Pill feature Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { text: "MODERN REACT", style: theme === 'dark' ? "border-cyan-500/30 text-cyan-300 bg-cyan-950/15" : "border-cyan-200 text-cyan-600 bg-cyan-50" },
                  { text: "HIGHLY SCALABLE", style: theme === 'dark' ? "border-emerald-500/30 text-emerald-300 bg-emerald-950/15" : "border-emerald-200 text-emerald-600 bg-emerald-50" },
                  { text: "100% OPEN SOURCE", style: theme === 'dark' ? "border-blue-500/30 text-blue-300 bg-blue-950/15" : "border-blue-200 text-blue-600 bg-blue-50" },
                  { text: "AI-POWERED CODE", style: theme === 'dark' ? "border-fuchsia-500/30 text-fuchsia-300 bg-fuchsia-950/15" : "border-fuchsia-200 text-fuchsia-600 bg-fuchsia-50" },
                  { text: "MULTI-PLATFORM", style: theme === 'dark' ? "border-amber-500/30 text-amber-300 bg-amber-950/15" : "border-amber-200 text-amber-600 bg-amber-50" },
                  { text: "RLS SECURE", style: theme === 'dark' ? "border-rose-500/30 text-rose-300 bg-rose-950/15" : "border-rose-200 text-rose-600 bg-rose-50" },
                  { text: "ZERO LATENCY CDN", style: theme === 'dark' ? "border-teal-500/30 text-teal-300 bg-teal-950/15" : "border-teal-200 text-teal-600 bg-teal-50" }
                ].map((badge) => (
                  <span 
                    key={badge.text} 
                    className={`text-[9.5px] font-black font-sans px-3 py-1 rounded-full border tracking-wider transition-colors duration-300 ${badge.style}`}
                  >
                    {badge.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side: Scope platform targets (Web, Mobile, Games...) */}
            <div className={`lg:w-[380px] p-5 rounded-2xl border flex flex-col justify-between shadow-inner transition-colors duration-300 ${
              theme === 'dark' ? 'bg-[#020512]/90 border-[#142145]' : 'bg-slate-50/80 border-slate-205'
            }`}>
              <span className={`text-[10px] font-mono font-black uppercase tracking-widest block border-b pb-2 text-left ${
                theme === 'dark' ? 'text-slate-400 border-[#0d142d]' : 'text-slate-500 border-slate-200'
              }`}>
                📦 ONE MODULE STACK. ENDLESS MULTI-PLATFORMS:
              </span>

              <div className="grid grid-cols-3 gap-2 py-4">
                {[
                  { label: "Web Portals", icon: Laptop, col: "text-cyan-600 dark:text-cyan-400 bg-cyan-500/5 hover:border-cyan-500/30" },
                  { label: "Mobile Apps", icon: Smartphone, col: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 hover:border-emerald-500/30" },
                  { label: "Game Engines", icon: Gamepad2, col: "text-amber-600 dark:text-amber-400 bg-amber-500/5 hover:border-amber-500/30" },
                  { label: "AI Workflows", icon: Bot, col: "text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-500/5 hover:border-fuchsia-500/30" },
                  { label: "SaaS Systems", icon: Layers, col: "text-blue-600 dark:text-blue-400 bg-blue-500/5 hover:border-blue-500/30" },
                  { label: "Databases", icon: Database, col: "text-purple-600 dark:text-purple-400 bg-purple-500/5 hover:border-purple-500/30" }
                ].map((scope) => {
                  const Icon = scope.icon;
                  return (
                    <div 
                      key={scope.label} 
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer group ${scope.col} ${
                        theme === 'dark' ? 'border-[#0d142c]' : 'border-slate-200 hover:bg-white hover:shadow-sm'
                      }`}
                      onClick={() => showToast(`Ecosystem Preset targets: ${scope.label}`)}
                    >
                      <Icon className="w-4.5 h-4.5 group-hover:scale-110 transition-transform duration-300" />
                      <span className={`text-[10px] font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{scope.label}</span>
                    </div>
                  );
                })}
              </div>

              <span className={`block text-[9.5px] font-mono text-left ${theme === 'dark' ? 'text-slate-550' : 'text-slate-450'}`}>
                ⚡️ Fully integrated modular layers optimized for high density edge compilation hooks & scale.
              </span>
            </div>

          </div>
        </section>

        {/* REEFSTACK PRO+ REAL-TIME SIMULATION & CAPACITY PLANNING SUITE */}
        <section id="operational-modeler" className="space-y-4 animate-fadeIn text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-950/20 dark:border-indigo-500/10 pb-2.5">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl border ${theme === 'dark' ? 'bg-cyan-950/25 border-cyan-500/25 text-cyan-400' : 'bg-cyan-50 border-cyan-200 text-cyan-600'}`}>
                <Sliders className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className={`text-base font-black uppercase tracking-wider font-sans ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
                  Operational Capacity & Cost Modeler
                </h3>
                <p className={`text-[11px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-550'} mt-0.5`}>
                  Simulate enterprise scale, CDN latency parameters, and monthly cloud hosting structures in real-time.
                </p>
              </div>
            </div>
            
            {/* Direct Reset active button */}
            <div className={`flex items-center gap-2 text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-[#060a1d]/60 border border-[#141f3e] ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-650 bg-slate-50 border-slate-200'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Reactive Feed Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Left Controls Card */}
            <div className={`lg:col-span-5 p-4.5 rounded-2xl border flex flex-col justify-between space-y-4 ${
              theme === 'dark' ? 'bg-[#020512]/90 border-[#141f3d]' : 'bg-slate-50/80 border-slate-200/80 shadow-sm'
            }`}>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2 text-slate-400 border-indigo-550/10 dark:border-indigo-500/10">
                  <span className="text-[10.5px] font-mono font-black uppercase tracking-wider text-cyan-500 dark:text-cyan-400">Planning Controls</span>
                  <span className="text-[9.5px] text-slate-450 italic">Calculated dynamically</span>
                </div>

                {/* Preset Picker */}
                <div className="space-y-1.5">
                  <span className={`text-[9.5px] font-mono uppercase font-black tracking-wide block ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    🧩 CHOOSE ECOSYSTEM CONFIGURATION PRESETS:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {MODELER_PRESETS.map((p) => {
                      const isActive = expectedMau === p.mau && selectedLayerIds.length === p.layers.length;
                      return (
                        <button
                          type="button"
                          key={p.name}
                          onClick={() => handleApplyModelerPreset(p)}
                          className={`p-2 font-mono text-left rounded-lg text-[10px] border transition-all cursor-pointer hover:scale-[1.01] ${
                            isActive 
                              ? 'bg-indigo-650/15 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-extrabold' 
                              : theme === 'dark'
                              ? 'bg-slate-950/65 border-[#121c38] hover:border-[#1e2e5c] text-slate-350 hover:text-white'
                              : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700 shadow-sm'
                          }`}
                        >
                          <div className="font-extrabold flex items-center gap-1">
                            <span>✨ {p.name}</span>
                          </div>
                          <p className="text-[9px] text-slate-450 mt-0.5 font-sans leading-relaxed line-clamp-1">{p.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* MAU Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className={`uppercase font-bold flex items-center gap-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      <Users className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                      Expected Volume Traffic (MAU):
                    </span>
                    <span className="text-cyan-600 dark:text-cyan-300 font-extrabold bg-[#050a1e] dark:bg-cyan-950/40 px-2.5 py-0.5 border border-cyan-500/20 rounded">
                      {expectedMau.toLocaleString()} Users
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="1000000"
                    step="1000"
                    value={expectedMau}
                    onChange={(e) => setExpectedMau(Number(e.target.value))}
                    className="w-full accent-cyan-500 bg-slate-900 cursor-pointer rounded-lg h-1.5 focus:outline-none"
                  />
                  <div className="flex items-center justify-between text-[8px] font-mono text-slate-450">
                    <span>1,000 (MVP Sandbox)</span>
                    <span>100,000 (Active Growth)</span>
                    <span>1,000,000 (Global Enterprise)</span>
                  </div>
                </div>

                {/* Optimizations */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  
                  {/* Optimizer 1: Scale-to-Zero */}
                  <div 
                    onClick={() => {
                      setScaleOptimization(!scaleOptimization);
                      showToast(`Scale-to-Zero Node: ${!scaleOptimization ? "OPTIMIZED (42% discount enabled)" : "standard containers running continuous"}`);
                    }}
                    className={`p-2.5 rounded-xl border cursor-pointer select-none transition-all flex items-start gap-2 hover:bg-opacity-80 active:scale-[0.99] ${
                      scaleOptimization 
                        ? 'bg-emerald-950/15 border-emerald-500/35 text-emerald-700 dark:text-emerald-300' 
                        : theme === 'dark' 
                        ? 'bg-slate-950/40 border-[#0d152c] text-slate-400 hover:border-[#141f3e]'
                        : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-100 shadow-sm'
                    }`}
                  >
                    <div className="mt-0.5">
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${scaleOptimization ? 'border-emerald-400 bg-emerald-505' : 'border-slate-500'}`}>
                        {scaleOptimization && <Check className="w-2.5 h-2.5 text-white stroke-[4]" />}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-black block leading-none">Serverless Scale</span>
                      <span className="text-[8.5px] text-slate-455 block leading-normal mt-0.5">Pause containers idle hosts (-42% cost)</span>
                    </div>
                  </div>

                  {/* Optimizer 2: CDN Edge Cache */}
                  <div 
                    onClick={() => {
                      setEdgeCachingEnabled(!edgeCachingEnabled);
                      showToast(`Edge CDN caching: ${!edgeCachingEnabled ? "ACTIVE (reduced handshake latency by 70%)" : "deactivated (all reads request database raw origin)"}`);
                    }}
                    className={`p-2.5 rounded-xl border cursor-pointer select-none transition-all flex items-start gap-2 hover:bg-opacity-80 active:scale-[0.99] ${
                      edgeCachingEnabled 
                        ? 'bg-teal-950/15 border-teal-500/35 text-teal-700 dark:text-teal-300' 
                        : theme === 'dark' 
                        ? 'bg-slate-950/40 border-[#0d152c] text-slate-400 hover:border-[#141f3e]'
                        : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-100 shadow-sm'
                    }`}
                  >
                    <div className="mt-0.5">
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${edgeCachingEnabled ? 'border-teal-400 bg-teal-505' : 'border-slate-500'}`}>
                        {edgeCachingEnabled && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-black block leading-none">Edge CDN Cache</span>
                      <span className="text-[8.5px] text-slate-455 block leading-normal mt-0.5">Cache API responses at router nodes (-70% latency)</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Dynamic feedback notice */}
              <div className={`text-[9px] font-mono p-2.5 rounded-lg border leading-relaxed ${
                theme === 'dark' ? 'bg-[#060a1d]/60 border-[#141f3e] text-slate-400' : 'bg-slate-100 border-slate-202 text-slate-600'
              }`}>
                💡 <span className="text-cyan-500 dark:text-cyan-300 font-extrabold uppercase">Capacity Audit:</span> Dynamic formulas estimate resources based on user scale. Tap catalog checkpills below to instantly see metrics changes.
              </div>

            </div>

            {/* Right Bento Grid Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Card 1: Estimated Cost */}
              {(() => {
                const monCost = calculateMonthlyCost();
                return (
                  <div className={`p-4 rounded-2xl border text-left relative overflow-hidden transition-all group ${
                    theme === 'dark' ? 'bg-[#030615] border-[#141f3e]' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="absolute top-[-20%] right-[-5%] w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
                    
                    <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase tracking-wide">
                      <span className="flex items-center gap-1 font-bold">
                        <Cloud className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                        ESTIMATED CLOUD HOSTING
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-baseline gap-1 bg-[#050a1d] p-2 rounded-xl border border-[#141f3e] dark:bg-transparent dark:border-none dark:p-0">
                      <span className="text-3xl font-black text-cyan-500 dark:text-cyan-400 tracking-tight">
                        ${monCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-slate-500 text-xs font-mono">/ mo</span>
                    </div>

                    {/* Cost evaluation context */}
                    <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-200 dark:border-slate-900">
                      <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-450">
                        <span>Database scale:</span>
                        <span className="text-slate-500 dark:text-slate-350">{(expectedMau * 4.5).toLocaleString()} rows</span>
                      </div>
                      <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-455">
                        <span>API Egress usage:</span>
                        <span className="text-slate-500 dark:text-slate-350">{(expectedMau * 0.08).toFixed(1)} GB</span>
                      </div>
                      <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-455">
                        <span>Serverless discount:</span>
                        <span className={scaleOptimization ? "text-emerald-600 dark:text-emerald-400 font-bold font-sans" : "text-amber-500 font-sans"}>
                          {scaleOptimization ? "Active (-42%)" : "Inactive (Continuous)"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Card 2: Security & Governance Auditing Score */}
              {(() => {
                const secScore = calculateSecurityScore();
                let grade = 'F';
                let gradeColor = 'text-rose-600 border-rose-200 bg-rose-50 dark:text-rose-405 dark:border-rose-555/20 dark:bg-rose-950/10';
                if (secScore >= 95) { grade = 'A+'; gradeColor = 'text-emerald-600 border-emerald-202 bg-emerald-50 dark:text-emerald-400 dark:border-emerald-555/20 dark:bg-emerald-950/10'; }
                else if (secScore >= 88) { grade = 'A-'; gradeColor = 'text-emerald-600 border-emerald-202 bg-emerald-50 dark:text-emerald-400 dark:border-emerald-555/20 dark:bg-emerald-950/10'; }
                else if (secScore >= 80) { grade = 'B+'; gradeColor = 'text-teal-600 border-teal-202 bg-teal-50 dark:text-teal-400 dark:border-teal-555/20 dark:bg-teal-950/10'; }
                else if (secScore >= 70) { grade = 'B-'; gradeColor = 'text-amber-600 border-amber-202 bg-amber-50 dark:text-amber-400 dark:border-[#2e2612] dark:bg-amber-950/10'; }
                else if (secScore >= 55) { grade = 'C'; gradeColor = 'text-amber-655 border-amber-202 bg-amber-50 dark:text-amber-400 dark:border-[#2e2612] dark:bg-amber-950/10'; }
                else if (secScore >= 35) { grade = 'D'; gradeColor = 'text-rose-600 border-rose-202 bg-rose-50 dark:text-rose-405 dark:border-rose-555/20 dark:bg-rose-950/10'; }

                const isAuthActive = selectedLayerIds.includes(10);
                const isDbActive = selectedLayerIds.includes(3);
                
                return (
                  <div className={`p-4 rounded-2xl border text-left relative overflow-hidden transition-all group ${
                    theme === 'dark' ? 'bg-[#030615] border-[#141f3e]' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    
                    <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase tracking-wide">
                      <span className="flex items-center gap-1 font-bold">
                        <Lock className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                        VULNERABILITY & AUDIT SCORE
                      </span>
                    </div>

                    <div className="mt-2 text-left flex items-center justify-between bg-[#050a1d] p-1.5 rounded-xl border border-[#141f3e] dark:bg-transparent dark:border-none dark:p-0">
                      <span className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                        {secScore} <span className="text-xs text-slate-500 dark:text-slate-455">/ 100</span>
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-mono font-black rounded border ${gradeColor}`}>
                        GRADE {grade}
                      </span>
                    </div>

                    {/* Security warnings checklist */}
                    <div className="mt-4 pt-3 border-t border-slate-202 dark:border-slate-900 space-y-1.5 text-[9.5px] font-mono text-slate-455">
                      <div className="flex items-center justify-between">
                        <span>Governance (Layer 10):</span>
                        <span className={isAuthActive ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-rose-500 font-bold"}>
                          {isAuthActive ? "Armed" : "Missing"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Database Policies:</span>
                        <span className={isAuthActive && isDbActive ? "text-emerald-600 dark:text-emerald-400" : "text-amber-500 font-bold"}>
                          {isAuthActive && isDbActive ? "Active RLS" : "Unenforced"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Leaks LeakScanner:</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">0 Active leaks</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Card 3: Cache Performance Latency */}
              {(() => {
                const latency = calculatePerformanceRating();
                let statusLabel = "Decentralized Grid";
                let statusColor = "text-emerald-600 dark:text-emerald-400";
                if (latency > 150) {
                  statusLabel = "AI Pipeline Delay";
                  statusColor = "text-amber-555";
                } else if (latency < 12) {
                  statusLabel = "Edge Node Hit";
                  statusColor = "text-cyan-600 dark:text-cyan-400";
                }
                
                return (
                  <div className={`p-4 rounded-2xl border text-left relative overflow-hidden transition-all group ${
                    theme === 'dark' ? 'bg-[#030615] border-[#141f3e]' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    
                    <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase tracking-wide">
                      <span className="flex items-center gap-1 font-bold">
                        <Activity className="w-4 h-4 text-amber-505" />
                        ESTIMATED ENDPOINT LATENCY
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-baseline gap-2 bg-[#050a1d] p-2 rounded-xl border border-[#141f3e] dark:bg-transparent dark:border-none dark:p-0">
                      <span className="text-3xl font-black text-amber-500 dark:text-amber-400 tracking-tight">
                        {latency} ms
                      </span>
                      <span className={`text-[9.5px] font-mono font-bold ${statusColor}`}>{statusLabel}</span>
                    </div>

                    {/* Performance properties */}
                    <div className="mt-4 pt-3 border-t border-slate-202 dark:border-slate-900 space-y-1.5 text-[9.5px] font-mono text-slate-455">
                      <div className="flex items-center justify-between">
                        <span>Hydration cache:</span>
                        <span className="text-slate-500 dark:text-slate-350">CDN Optimized</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Index scan:</span>
                        <span className="text-slate-500 dark:text-slate-350">1.2ms (B-Tree schema)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>DNS distribution:</span>
                        <span className={edgeCachingEnabled ? "text-emerald-655 dark:text-emerald-400 font-bold" : "text-slate-500 font-bold"}>
                          {edgeCachingEnabled ? "Armed (Cache ON)" : "Direct origin"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Card 4: Bundle payload size */}
              {(() => {
                const bundleWeight = calculateBundleWeight();
                const isHeavyGame = selectedLayerIds.includes(4);
                
                return (
                  <div className={`p-4 rounded-2xl border text-left relative overflow-hidden transition-all group ${
                    theme === 'dark' ? 'bg-[#030615] border-[#141f3e]' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    
                    <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase tracking-wide">
                      <span className="flex items-center gap-1 font-bold">
                        <Boxes className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                        MODULE CONSOLE TARGET WEIGHT
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-baseline gap-1.5 bg-[#050a1d] p-1.5 rounded-xl border border-[#141f3e] dark:bg-transparent dark:border-none dark:p-0">
                      <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
                        {bundleWeight > 1000 
                          ? `${(bundleWeight / 1000).toFixed(2)} MB` 
                          : `${bundleWeight} KB`
                        }
                      </span>
                      {isHeavyGame && (
                        <span className="text-[8px] font-bold text-red-500 border border-red-500/25 bg-red-950/20 px-1.5 rounded uppercase leading-none">
                          WASM Engine
                        </span>
                      )}
                    </div>

                    {/* Progress representation */}
                    <div className="mt-4 pt-3 border-t border-slate-202 dark:border-slate-900 space-y-2">
                      <div className="w-full bg-slate-202 dark:bg-[#060a1d] rounded-full h-1.5 overflow-hidden flex">
                        <div className="bg-cyan-400 h-full" style={{ width: selectedLayerIds.includes(1) ? "15%" : "0%" }} />
                        <div className="bg-emerald-400 h-full" style={{ width: selectedLayerIds.includes(2) ? "18%" : "0%" }} />
                        <div className="bg-amber-500 h-full" style={{ width: isHeavyGame ? "55%" : "0%" }} />
                        <div className="bg-indigo-500 h-full" style={{ width: "20%" }} />
                      </div>
                      
                      <div className="flex items-center justify-between text-[8px] font-mono text-slate-455 leading-tight">
                        <span>WASM engine size:</span>
                        <span className="text-slate-500 dark:text-slate-350">
                          {isHeavyGame ? "18.5 MB static bin" : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}

            </div>

          </div>
        </section>

        {/* Section 1: The 10 Core Stack Layers (Interactive System Catalog) */}
        <section id="core-catalog" className="space-y-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-450">
                <Code2 className="w-5.5 h-5.5 text-cyan-400" />
                <h3 className="text-xl font-extrabold font-sans tracking-tight text-white uppercase">
                  10 Core System Layers Catalog
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl text-left">
                These represent the foundational blocks of ReefStack Pro+. Toggle checkboxes to add or remove layers from your active blueprint model. Hover and click "Sandbox" to load editable variables and inspect codes!
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={resetLayersOrder}
                title="Restore original sequence index"
                className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/40 hover:bg-slate-900/80 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/30 text-slate-450 text-[11px] font-bold rounded cursor-pointer transition-all uppercase tracking-wide leading-none"
              >
                <RotateCcw className="w-3 h-3 text-indigo-400" />
                <span>Restore Default</span>
              </button>
              <div className="flex items-center gap-2 bg-[#060a1d] p-1 px-3.5 roudned-lg border border-[#141e3d] text-xs font-mono">
                <span className="text-slate-400 font-bold uppercase">Blueprints state:</span>
                <span className="font-bold text-cyan-400">{selectedLayerIds.length}/10 ACTIVE LAYERS</span>
              </div>
            </div>
          </div>

          {/* Realtime Automated System validation alerts checker & Technical Snapshot button */}
          <div className="bg-[#040816]/90 border border-[#14234c]/65 rounded-2xl p-4.5 space-y-3.5 shadow-lg text-left">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#0f1837] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-550/15 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                  <ShieldAlert className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-100 uppercase tracking-widest leading-none">
                    ReefStack Real-Time Integrity Auditor
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Automated validation scan evaluating {selectedLayerIds.length} enabled architecture nodes for cross-dependency conflicts.
                  </p>
                </div>
              </div>
              
              {/* Generation snapshot action button */}
              <button
                onClick={() => setIsPrintModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-700 hover:from-cyan-500 hover:to-indigo-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-cyan-500/10 cursor-pointer transition-all uppercase tracking-wide"
              >
                <FileText className="w-4 h-4 text-cyan-200" />
                <span>Export Technical PDF Specification</span>
              </button>
            </div>

            {/* Warnings List parser */}
            {getValidationWarnings().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {getValidationWarnings().map((warn) => (
                  <div 
                    key={warn.id}
                    className={`p-3 rounded-xl border flex gap-3 ${
                      warn.severity === 'error' 
                        ? 'bg-rose-950/10 border-rose-500/20 text-rose-350' 
                        : warn.severity === 'warning'
                        ? 'bg-amber-950/10 border-amber-500/20 text-amber-350'
                        : 'bg-indigo-950/10 border-indigo-500/20 text-indigo-350'
                    }`}
                  >
                    <div className="p-1 h-fit rounded bg-black/30 mt-0.5 shrink-0">
                      <ShieldAlert className="w-4 h-4 text-rose-450" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h5 className="text-[11.5px] font-black uppercase tracking-tight">{warn.title}</h5>
                        {warn.layerNames.map(name => (
                          <span key={name} className="text-[8px] font-mono px-1.5 py-0.2 bg-black/40 border border-current rounded uppercase">
                            {name}
                          </span>
                        ))}
                      </div>
                      <p className="text-[10.5px] text-slate-350 leading-relaxed font-sans">{warn.description}</p>
                      <div className="pt-1 text-[10.5px] font-mono italic flex items-center gap-1.5 opacity-90">
                        <p className="text-[10px] text-slate-200">
                          <span className="font-bold uppercase tracking-wider text-[9px] text-[#0ea5e9] mr-1.5">Resolution:</span>
                          {warn.resolution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-emerald-950/10 border border-emerald-500/25 rounded-xl flex items-center gap-3 text-emerald-450">
                <span className="text-md shrink-0">✨</span>
                <div className="text-left">
                  <span className="text-[11px] font-black uppercase tracking-widest block font-sans">Ecosystem Blueprint Verified: Clean Scan</span>
                  <p className="text-[10px] text-emerald-300 font-mono mt-0.5">0 integration conflicts found between selected modules. Ready for compilation pipeline deployment.</p>
                </div>
              </div>
            )}
          </div>

          {/* Cyber-Oceanic Depth Grid Shell */}
          <div className="relative overflow-visible p-6 rounded-2xl border border-cyan-500/15 bg-gradient-to-b from-[#020617]/95 to-[#0b1330]/75 backdrop-blur-2xl">
            {/* The single large fixed div with .radial-glow class behind the entire grid for dynamic depth lighting */}
            <div className="absolute inset-0 radial-glow opacity-80 pointer-events-none mix-blend-screen rounded-2xl" />

            {/* 10-column interactive grid wrapper with reordering capabilities */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-10 gap-3">
            {layersList.map((layer, index) => {
              const colors = getColorClass(layer.color);
              const isSelected = selectedLayerIds.includes(layer.id);
              const isActiveSandbox = activeSandboxLayerId === layer.id && isSandboxOpen;

              const getReadinessBadge = (id: number) => {
                switch (id) {
                  case 1:
                  case 3:
                  case 6:
                  case 7:
                  case 9:
                    return { label: 'Stable', style: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' };
                  case 2:
                  case 4:
                  case 8:
                    return { label: 'Beta', style: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' };
                  case 5:
                  case 10:
                  default:
                    return { label: 'Alpha', style: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/30' };
                }
              };

              const badge = getReadinessBadge(layer.id);
              const readinessClass = 
                badge.label === 'Stable' ? 'ready-stable' : 
                badge.label === 'Beta' ? 'ready-beta' : 'ready-alpha';

              return (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: draggedIndex === index ? 0.95 : isSelected ? 1.015 : 1.0,
                    boxShadow: draggedIndex === index
                      ? "0 4px 10px rgba(0,0,0,0.4)"
                      : isSelected 
                      ? (theme === 'dark' ? "0 8px 24px rgba(6, 182, 212, 0.2)" : "0 8px 24px rgba(37, 99, 235, 0.1)") 
                      : "0 2px 4px rgba(0,0,0,0)"
                  }}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -2,
                    boxShadow: theme === 'dark' ? "0 12px 30px rgba(6,182,212,0.25)" : "0 12px 30px rgba(37,99,235,0.12)"
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 240, 
                    damping: 24,
                    mass: 0.6
                  }}
                  id={`layer-card-poster-${layer.id}`}
                  key={layer.id}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  onDrop={(e) => handleDrop(e, index)}
                  onClick={() => {
                    setActiveSandboxLayerId(layer.id);
                    setIsSandboxOpen(true);
                  }}
                  className={`group p-3.5 rounded-xl text-left transition-all duration-300 relative flex flex-col justify-between cursor-grab active:cursor-grabbing select-none glass-card ${readinessClass} ${
                    theme === 'dark' ? colors.bg : 'from-white to-slate-50/80'
                  } ${
                    isSelected 
                      ? (theme === 'dark' ? 'border-r-indigo-500/30' : 'border-blue-500 shadow-sm shadow-blue-500/10') 
                      : (theme === 'dark' ? colors.border : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50/20')
                  } ${isActiveSandbox ? 'ring-2 ring-blue-500 scale-[1.01]' : ''} ${
                    draggedIndex === index ? 'opacity-30 border-dashed border-slate-700 scale-95' : ''
                  } ${
                    dragOverIndex === index ? 'border-cyan-400 ring-2 ring-cyan-500/20 scale-[1.01]' : ''
                  }`}
                >
                  
                  {/* Glowing background hint when selection stays enabled */}
                  {isSelected && (
                    <div className="absolute inset-0 radial-glow opacity-30 rounded-xl pointer-events-none" />
                  )}

                  {/* Absolute positioning of drag controls & index counters at the top */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between opacity-70 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      <div className="text-slate-550 hover:text-cyan-450 cursor-grab active:cursor-grabbing drag-handle">
                        <GripVertical className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                      <span className="text-[7px] font-mono font-black text-slate-550 uppercase tracking-widest leading-none">
                        POS: {index + 1}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {index > 0 && (
                        <button
                          title="Shift Left / Up"
                          onClick={() => moveLayer(index, 'left')}
                          className="p-0.5 hover:bg-slate-900/60 rounded text-slate-505 hover:text-cyan-400 transition-colors cursor-pointer"
                        >
                          <MoveLeft className="w-2.5 h-2.5" />
                        </button>
                      )}
                      {index < layersList.length - 1 && (
                        <button
                          title="Shift Right / Down"
                          onClick={() => moveLayer(index, 'right')}
                          className="p-0.5 hover:bg-slate-900/60 rounded text-slate-505 hover:text-cyan-400 transition-colors cursor-pointer"
                        >
                          <MoveRight className="w-2.5 h-2.5" />
                        </button>
                      )}
                      <span className="text-[9.5px] font-mono font-black text-slate-600 transition-colors">
                        #{String(layer.id).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Icon & Label */}
                  <div className="space-y-3 pt-5.5">
                    <div className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center ${colors.iconBg}`}>
                      <IconResolver name={layer.iconName} className="w-4.5 h-4.5" />
                    </div>

                    <div>
                      <span className="text-[8px] font-mono font-black text-slate-500 tracking-widest uppercase block leading-none">
                        LAYER {layer.id}
                      </span>
                      <h4 className={`text-[12px] font-black tracking-wide font-sans mt-1 line-clamp-1 truncate ${colors.text}`}>
                        {layer.name.split(" ")[0]} <span className={`font-light ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{layer.name.split(" ").slice(1).join(" ")}</span>
                      </h4>
                      <p className={`text-[10px] font-extrabold font-mono mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        {layer.technology.split(" ")[0]}
                      </p>
                      
                      {/* Dynamic readiness badge */}
                      <div className="mt-1.5 flex items-center gap-1">
                        <span className={`text-[7px] font-mono tracking-wider px-1.5 py-0.5 border rounded-md font-bold uppercase ${badge.style}`}>
                          {badge.label}
                        </span>
                        <span className="text-[7.5px] text-slate-450 font-mono font-medium tracking-wide">Status</span>
                      </div>
                    </div>

                    {/* Compact Checklist bullet points */}
                    <div className="space-y-1 pt-1.5 border-t border-[#0e1634] text-left">
                      {layer.features.slice(0, 3).map((f, idx) => (
                        <div key={idx} className="flex items-start gap-1 text-[10px] text-slate-400 leading-tight">
                          <Check className="w-2.5 h-2.5 text-blue-500 mt-0.5 shrink-0" />
                          <span className="line-clamp-1">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card bottom actions tray */}
                  <div className="mt-4 pt-2.5 border-t border-[#0e1634] flex items-center justify-between gap-1" onClick={(e) => e.stopPropagation()}>
                    {/* Tiny settings sandbox button */}
                    <button 
                      className="text-[9.5px] font-bold text-slate-500 hover:text-cyan-300 flex items-center gap-1 leading-none transition-colors cursor-pointer"
                      onClick={() => {
                        setActiveSandboxLayerId(layer.id);
                        setIsSandboxOpen(true);
                      }}
                    >
                      <Sliders className="w-2.5 h-2.5 text-blue-400" />
                      Sandbox
                    </button>

                    {/* Checkbox state toggler */}
                    <button
                      onClick={() => toggleLayerSelection(layer.id)}
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-600 border-blue-400 text-slate-100' 
                          : 'border-slate-800 hover:border-slate-700 bg-slate-950/70'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3px]" />}
                    </button>
                  </div>

                </motion.div>
              );
            })}
            </div>
          </div>
        </section>

        {/* Section 2: Flow Diagram and AI Expert Architect Dual Canvas */}
        <section id="integration-flow" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Block: Connection Pathway Map (8 cols) */}
          <div className="lg:col-span-7 bg-[#040816] border border-[#14234c]/65 rounded-2xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[500px]">
            {/* Tech dotted matrix pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#141c38_1px,transparent_1px)] [background-size:20px_20px] opacity-35 pointer-events-none" />
            
            {/* Header info */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#0d1632] pb-4 mb-4 gap-3">
              <div>
                <span className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-widest block">SYSTEM INFRASTRUCTURE FLOW</span>
                <h4 className="text-md font-extrabold text-white flex items-center gap-1.5 mt-0.5">
                  <GitMerge className="w-4.5 h-4.5 text-indigo-400" /> How ReefStack Modules Connect
                </h4>
              </div>
              <div className="flex items-center gap-2">
                {/* View switcher buttons */}
                <div className="bg-[#020512] border border-[#14234c]/60 p-0.5 rounded-lg flex shrink-0">
                  <button
                    type="button"
                    onClick={() => setFlowViewMode('diagram')}
                    className={`px-3 py-1 text-[9.5px] font-black uppercase rounded-md transition-all cursor-pointer ${
                      flowViewMode === 'diagram' ? 'bg-indigo-600 text-slate-550!' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Flow Pathway
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFlowViewMode('d3');
                      showToast("Active D3 logical dependency map generated!");
                    }}
                    className={`px-3 py-1 text-[9.5px] font-black uppercase rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                      flowViewMode === 'd3' ? 'bg-indigo-600 text-slate-550!' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="inline-block w-1.5 h-1.5 bg-cyan-455 rounded-full animate-ping" />
                    D3 Graph Map
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 bg-[#080d24] px-2.5 py-1.5 rounded border border-[#141f44] text-[9.5px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-ping" />
                  <span className="text-slate-400 font-mono">FLOW ACTIVE</span>
                </div>
              </div>
            </div>

            {flowViewMode === 'diagram' ? (
              /* SVG Interactive Connection Diagram Grid */
              <div className="relative z-10 grid grid-cols-3 gap-y-10 gap-x-4 flex-1 items-center justify-center py-6">
                
                {/* Row 1: CLIENTS & CI-CD ORCHESTRATORS */}
                <div className="col-span-3 flex justify-between items-center px-4">
                  {/* Users block */}
                  <div 
                    onClick={() => setActiveNodeId('users')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all max-w-[200px] ${
                      getNodeHighlightClass('users', 'border-indigo-400 bg-indigo-950/20 shadow-[0_0_15px_rgba(129,140,248,0.15)]')
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px] font-bold font-mono px-1.5 py-0.5 bg-indigo-500/10 text-indigo-400 rounded border border-indigo-550/20">ACCESS</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <h5 className="font-bold text-xs text-white uppercase mt-1.5">Client Audiences</h5>
                    <p className="text-[9.5px] text-slate-500 font-mono mt-0.5">Webs / Natives / Godot</p>
                  </div>

                  {/* Automation Orchestration block */}
                  <div 
                    onClick={() => setActiveNodeId('deploy')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all max-w-[200px] ${
                      getNodeHighlightClass('deploy', 'border-sky-400 bg-sky-950/20 shadow-[0_0_15px_rgba(56,189,248,0.15)]')
                    }`}
                  >
                    <span className="text-[8px] font-bold font-mono px-1.5 py-0.5 bg-sky-500/10 text-sky-400 rounded border border-sky-550/20">CI/CD PIPELINE</span>
                    <h5 className="font-bold text-xs text-white uppercase mt-1.5">Orchestration</h5>
                    <p className="text-[9.5px] text-slate-500 font-mono mt-0.5">Vercel & Expo EAS CDN</p>
                  </div>
                </div>

                {/* Row 2: Frontends */}
                <div className="col-span-3 grid grid-cols-2 gap-6 px-8 py-2">
                  {/* Web Frontend block */}
                  <div 
                    onClick={() => setActiveNodeId('frontend_web')}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      getNodeHighlightClass('frontend_web', 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]')
                    }`}
                  >
                    <h5 className="font-bold text-xs text-cyan-300">NEXT.js + React Portal</h5>
                    <p className="text-[9.5px] text-slate-400">Desktop / SEO Web apps</p>
                    <div className="mt-2 flex gap-1 items-center">
                      <span className="text-[7.5px] bg-[#020512] border border-[#0f1837] px-1 py-0.5 rounded text-slate-500 font-mono">App Router</span>
                      <span className="text-[7.5px] bg-[#020512] border border-[#0f1837] px-1 py-0.5 rounded text-emerald-400 font-mono">ISR Active</span>
                    </div>
                  </div>

                  {/* Mobile client block */}
                  <div 
                    onClick={() => setActiveNodeId('frontend_mobile')}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      getNodeHighlightClass('frontend_mobile', 'border-emerald-400 bg-emerald-950/20 shadow-[0_0_15px_rgba(52,211,153,0.15)]')
                    }`}
                  >
                    <h5 className="font-bold text-xs text-emerald-300">EXPO Native Pack</h5>
                    <p className="text-[9.5px] text-slate-400">iOS & Android build</p>
                    <div className="mt-2 flex gap-1 items-center">
                      <span className="text-[7.5px] bg-[#020512] border border-[#0f1837] px-1 py-0.5 rounded text-slate-500 font-mono">Expo Go</span>
                      <span className="text-[7.5px] bg-[#020512] border border-[#0f1837] px-1 py-0.5 rounded text-cyan-400 font-mono">OTA updates</span>
                    </div>
                  </div>
                </div>

                {/* Row 3: API Gateway Layer */}
                <div className="col-span-3 flex justify-center">
                  <div 
                    onClick={() => setActiveNodeId('api_layer')}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all max-w-[280px] w-full ${
                      getNodeHighlightClass('api_layer', 'border-blue-400 bg-blue-950/20 shadow-[0_0_15px_rgba(96,165,250,0.15)]')
                    }`}
                  >
                    <span className="text-[8px] font-bold font-mono tracking-widest text-slate-400 bg-[#020512] border border-[#0d1633] px-2.5 py-1 rounded">
                      SECURE API ROUTER PASS
                    </span>
                    <h5 className="font-extrabold text-xs text-slate-100 mt-2 uppercase font-mono">Express Server Middlewares</h5>
                  </div>
                </div>

                {/* Row 4: Core Supabase database connected to Billing, Storage and AI Layer */}
                <div className="col-span-3 grid grid-cols-12 gap-2 items-center px-4">
                  
                  {/* AIS Workspace AI brain */}
                  <div className="col-span-4 justify-self-start w-full">
                    <div 
                      onClick={() => setActiveNodeId('ai_layer')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        getNodeHighlightClass('ai_layer', 'border-fuchsia-400 bg-fuchsia-950/20')
                      }`}
                    >
                      <h5 className="font-bold text-[10.5px] text-fuchsia-400 truncate uppercase tracking-tight">AIS Gemini</h5>
                      <p className="text-[8.5px] text-slate-400 mt-1">Reasoning & Vector pg</p>
                    </div>
                  </div>

                  {/* Center Core Database Supabase */}
                  <div className="col-span-4 w-full">
                    <div 
                      onClick={() => setActiveNodeId('supabase')}
                      className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all relative overflow-hidden ${
                        getNodeHighlightClass('supabase', 'border-emerald-400 bg-emerald-950/20 shadow-[0_0_20px_rgba(52,211,153,0.2)]', 'border-[#0a1128] bg-slate-900/60 hover:bg-slate-900')
                      }`}
                    >
                      <div className="absolute top-1 right-1 flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </div>
                      <span className="text-[7.5px] font-bold tracking-widest text-slate-500 block">POSTGRES TABLE</span>
                      <h5 className="font-black text-xs text-emerald-400 mt-0.5 tracking-wider uppercase font-sans">SUPABASE</h5>
                      <p className="text-[8px] text-slate-400 font-mono mt-0.5 truncate leading-none">RLS / Auth locks</p>
                    </div>
                  </div>

                  {/* Stripe Billing & Media panel right */}
                  <div className="col-span-4 space-y-2.5 w-full">
                    <div 
                      onClick={() => setActiveNodeId('stripe')}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                        getNodeHighlightClass('stripe', 'border-indigo-400 bg-indigo-950/20')
                      }`}
                    >
                      <h5 className="font-bold text-[10px] text-indigo-400 uppercase leading-none">Stripe Portal</h5>
                      <p className="text-[8.5px] text-slate-400 mt-0.5">Subscriptions API</p>
                    </div>

                    <div 
                      onClick={() => setActiveNodeId('storage')}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                        getNodeHighlightClass('storage', 'border-teal-400 bg-teal-950/20')
                      }`}
                    >
                      <h5 className="font-bold text-[10px] text-teal-400 uppercase leading-none">Cloudflare R2</h5>
                      <p className="text-[8.5px] text-slate-400 mt-0.5">Object Egress Storage</p>
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="relative z-10 flex-1 my-4">
                <DependencyGraph 
                  selectedLayers={layersList.filter(l => selectedLayerIds.includes(l.id))} 
                  theme={theme} 
                />
              </div>
            )}

            {/* Bottom selected node diagnostic feedback panel */}
            <div className="relative z-10 border-t border-[#0d1632] pt-4 mt-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between text-left">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-mono font-black bg-blue-500/10 text-cyan-400 rounded p-0.5 px-2.5 border border-cyan-500/25">
                    {currentFlowDetails.tag}
                  </span>
                  <h6 className="text-xs font-black text-slate-100">{currentFlowDetails.title}</h6>
                </div>
                <p className="text-[10.5px] text-slate-350 leading-relaxed font-mono">
                  {currentFlowDetails.details}
                </p>
              </div>

              {/* Engine warning recommendation block */}
              <div className="sm:max-w-[240px] w-full bg-indigo-950/15 border border-indigo-500/15 rounded-xl p-3 text-left">
                <span className="text-[8px] font-mono font-bold text-indigo-400 block tracking-widest uppercase">
                  ADVISORY COMPLIANCE REQ:
                </span>
                <p className="text-[10px] text-indigo-250 italic leading-snug mt-0.5 font-sans">
                  "{currentFlowDetails.advice}"
                </p>
              </div>
            </div>

          </div>

          {/* Right Block: AI Systems Architect & Advisor Terminal Studio (5 cols) */}
          <div className="lg:col-span-5 border border-[#14234c]/65 bg-[#040816] rounded-2xl p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            
            <div className="space-y-4">
              {/* Tab options headers bar */}
              <div className="grid grid-cols-2 sm:flex sm:flex-row bg-[#020512] border border-[#0e1634] p-1 rounded-xl gap-1">
                <button
                  onClick={() => setAiPanelTab('presets')}
                  className={`text-[9.5px] font-black uppercase py-1.5 px-2 rounded-lg transition-all duration-200 text-center flex-1 ${
                    aiPanelTab === 'presets' ? 'bg-[#0f172a] text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Preset Templates
                </button>
                <button
                  onClick={() => setAiPanelTab('ai-architect')}
                  className={`text-[9.5px] font-black uppercase py-1.5 px-2 rounded-lg transition-all duration-200 text-center flex-1 ${
                    aiPanelTab === 'ai-architect' ? 'bg-[#0f172a] text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  AI Architect
                </button>
                <button
                  onClick={() => setAiPanelTab('live-advisor')}
                  className={`text-[9.5px] font-black uppercase py-1.5 px-2 rounded-lg transition-all duration-200 text-center flex-1 ${
                    aiPanelTab === 'live-advisor' ? 'bg-[#0f172a] text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Expert Chat
                </button>
                <button
                  onClick={() => setAiPanelTab('github-sync')}
                  className={`text-[9.5px] font-black uppercase py-1.5 px-2 rounded-lg transition-all duration-200 text-center flex-1 flex items-center justify-center gap-1.5 ${
                    aiPanelTab === 'github-sync' ? 'bg-[#0f172a] text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]' : 'text-slate-400 hover:text-emerald-400'
                  }`}
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Sync</span>
                </button>
              </div>

              {/* Tab Content 1: Templates presets */}
              {aiPanelTab === 'presets' && (
                <div className="space-y-4 text-left">
                  <div>
                    <h5 className="text-xs font-black text-slate-350 uppercase tracking-wider">Select Predefined Architecture Presets</h5>
                    <p className="text-[10px] text-slate-450 mt-1 leading-normal">
                      Instantly configure the 10 Core Stack selectors with tailored setups suitable for specific product frameworks.
                    </p>
                  </div>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {USE_CASES.map((uc) => (
                      <div
                        key={uc.title}
                        onClick={() => handleApplyPreset(uc)}
                        className="p-3 bg-slate-900/40 hover:bg-slate-900 border border-[#0d152f] hover:border-slate-800 rounded-xl cursor-pointer transition-all flex items-start gap-3"
                      >
                        <div className="p-2 rounded bg-[#020512] text-cyan-300 border border-[#0d1633]">
                          <IconResolver name={uc.iconName} className="w-4.5 h-4.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h6 className="text-[11.5px] font-black text-white">{uc.title}</h6>
                          <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-normal">{uc.description}</p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            <span className="text-[8px] bg-slate-950 px-1 py-0.5 rounded text-slate-500 font-mono">
                              React + Next
                            </span>
                            {uc.suggestedStack.mobile && (
                              <span className="text-[8px] bg-slate-950 px-1 py-0.5 rounded text-emerald-400 font-mono">
                                Expo iOS
                              </span>
                            )}
                            {uc.suggestedStack.gameEngine && (
                              <span className="text-[8px] bg-slate-950 px-1 py-0.5 rounded text-amber-400 font-mono">
                                Godot Scenes
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 self-center mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab Content 2: AI Custom Systems Architect */}
              {aiPanelTab === 'ai-architect' && (
                <div className="space-y-4 text-left">
                  {/* Sequence Optimizer Box */}
                  <div className="bg-[#020512] border border-[#14234c]/60 rounded-xl p-3.5 space-y-3">
                    <div className="flex items-center gap-2 border-b border-[#0d1633] pb-2.5">
                      <div className="bg-indigo-900/30 p-1.5 rounded border border-indigo-500/20">
                        <Cpu className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <h6 className="text-[11px] font-black tracking-wide text-white font-mono uppercase">📐 Layer Sequence Optimizations</h6>
                        <p className="text-[9.5px] text-slate-400 mt-0.5 leading-none">Suggested structures based on system interactions</p>
                      </div>
                    </div>

                    {/* Scenario Badges selectors */}
                    <div className="space-y-1.5">
                      <span className="text-[8.5px] font-mono font-bold text-slate-500 uppercase tracking-widest block">SELECT APP ARCHITECTURE PROFILE:</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {SCENARIOS.map((sc) => {
                          const isActive = activeScenarioId === sc.id;
                          return (
                            <button
                              key={sc.id}
                              type="button"
                              onClick={() => {
                                setActiveScenarioId(sc.id);
                                showToast(`Selected profile: ${sc.name}`);
                              }}
                              className={`p-2 rounded-lg border text-left transition-all text-[#0d1633] cursor-pointer ${
                                isActive 
                                  ? 'bg-indigo-950/40 border-indigo-500/40 text-slate-100!' 
                                  : 'bg-slate-950/20 border-[#0d1633]/60 text-slate-400 hover:border-slate-800'
                              }`}
                            >
                              <div className="font-bold flex items-center justify-between text-[10px]">
                                <span className={isActive ? 'text-indigo-300' : ''}>{sc.name}</span>
                                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />}
                              </div>
                              <p className="text-[8px] text-slate-500 mt-0.5 line-clamp-1 font-sans">{sc.description}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Scenario details card */}
                    {(() => {
                      const sc = SCENARIOS.find(s => s.id === activeScenarioId);
                      if (!sc) return null;

                      // Check if current layer list has Auth (ID 10) before Database (ID 3)
                      const indexAuth = layersList.findIndex(l => l.id === 10);
                      const indexDB = layersList.findIndex(l => l.id === 3);
                      const isOrderOptimal = indexAuth !== -1 && indexDB !== -1 && indexAuth < indexDB;

                      return (
                        <div className="p-3 bg-slate-950 rounded-lg border border-[#0d1633] space-y-2.5 text-left animate-fadeIn">
                          {/* Recommended sequence visually */}
                          <div className="flex flex-col gap-1">
                            <span className="text-[8.5px] font-mono font-bold text-slate-450 uppercase">REQUISITE FLOW PATHWAY:</span>
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              {sc.sequence.map((id, index) => {
                                const l = STACK_LAYERS.find(layer => layer.id === id);
                                return (
                                  <React.Fragment key={id}>
                                    <span className="text-[9px] font-mono font-black text-cyan-350 bg-cyan-950/20 px-1.5 py-0.5 rounded border border-cyan-550/10 leading-none">
                                      {l ? l.name.replace(" FRONTEND (WEB)", "Web").replace("BACKEND & DATABASE", "DB").replace("PAYMENTS & BILLING", "Stripe").replace("AUTH & SECURITY", "Auth").replace("ANALYTICS & MONITORING", "Telemetry").replace("AI LAYER", "AI").replace("GAME ENGINE", "Game") : `Layer ${id}`}
                                    </span>
                                    {index < sc.sequence.length - 1 && (
                                      <span className="text-[10px] text-slate-600 font-bold leading-none">→</span>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          </div>

                          <p className="text-[9.5px] text-slate-350 leading-relaxed font-mono">
                            💡 <span className="font-semibold text-slate-200">Justification:</span> {sc.justification}
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {sc.badges.map(b => (
                              <span key={b} className="text-[8.5px] font-mono bg-indigo-950/50 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-950/20">
                                #{b}
                              </span>
                            ))}
                          </div>

                          {/* Quick Correct Action button */}
                          <div className="pt-2 border-t border-[#0d1633] flex items-center justify-between gap-4">
                            <div className="flex flex-col">
                              <span className="text-[8.5px] font-mono font-bold text-slate-500">OPTIMALITY COMPLIANT:</span>
                              {isOrderOptimal ? (
                                <span className="text-[9px] font-mono text-emerald-450 font-bold flex items-center gap-1 leading-none mt-0.5">
                                  ● Core Auth-DB order verified
                                </span>
                              ) : (
                                <span className="text-[9px] font-mono text-amber-500 font-bold flex items-center gap-1 leading-none mt-0.5 animate-pulse">
                                  ▲ Auth sequence mismatch
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleOptimizedReorder(sc.id)}
                              className="bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-400/20 hover:border-indigo-450 rounded-md p-1 px-3 text-[9px] font-mono font-bold text-indigo-300 hover:text-white transition-all cursor-pointer flex items-center gap-1"
                            >
                              <Wand2 className="w-3 h-3" />
                              Apply Optimal Sequence
                            </button>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Interactive Custom Requirements Sequence Recommendation Engine */}
                    <div className="bg-[#020512] border border-[#14234c]/60 rounded-xl p-3.5 space-y-3 mt-3">
                      <div className="flex items-center gap-2 border-b border-[#0d1633] pb-2">
                        <div className="bg-emerald-900/30 p-1.5 rounded border border-emerald-500/20">
                          <Cpu className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                          <h6 className="text-[11px] font-black tracking-wide text-white font-mono uppercase">🎯 Dynamic Custom Requirements Analyzer</h6>
                          <p className="text-[9.5px] text-slate-400 mt-0.5 leading-none">Automated Recommendation Engine calculations based on user input</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <label className="text-[8.5px] font-mono text-slate-500 block mb-1 uppercase font-bold">TYPE CUSTOM REQUIREMENTS & REORDER GATES:</label>
                          <textarea
                            value={userCustomRequirements}
                            onChange={(e) => setUserCustomRequirements(e.target.value)}
                            placeholder="e.g., Need a mobile native app with robust postgres DB storage, secure jwt sessions checkout and metrics..."
                            rows={2}
                            className="w-full bg-[#030615] font-mono text-xs text-emerald-300 p-2 rounded border border-[#0d1633] focus:border-emerald-500 focus:outline-none"
                          />
                        </div>

                        {/* Calculated custom parameters output */}
                        {(() => {
                          const recommendation = analyzeUserRequirements(userCustomRequirements);
                          const indexAuth = layersList.findIndex(l => l.id === 10);
                          const indexDB = layersList.findIndex(l => l.id === 3);
                          const isAuthFirst = indexAuth !== -1 && indexDB !== -1 && indexAuth < indexDB;
                          const hasAuthSelected = selectedLayerIds.includes(10);
                          const hasDbSelected = selectedLayerIds.includes(3);

                          return (
                            <div className="p-2.5 bg-slate-950/80 rounded-lg border border-emerald-500/10 space-y-2 text-left animate-fadeIn">
                              <div className="flex flex-col gap-1">
                                <span className="text-[8.5px] font-mono font-bold text-slate-450">SUGGESTED OPTIMAL SEQUENCE STRUCTURE:</span>
                                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                  {recommendation.sequence.map((id, index) => {
                                    const l = STACK_LAYERS.find(layer => layer.id === id);
                                    return (
                                      <React.Fragment key={id}>
                                        <span className="text-[9px] font-mono font-black text-emerald-300 bg-emerald-950/20 px-1.5 py-0.5 rounded border border-emerald-500/25 leading-none">
                                          {l ? l.name.replace(" FRONTEND (WEB)", "Web").replace("BACKEND & DATABASE", "DB").replace("PAYMENTS & BILLING", "Stripe").replace("AUTH & SECURITY", "Auth & RLS").replace("ANALYTICS & MONITORING", "Telemetry").replace("AI LAYER", "AI").replace("GAME ENGINE", "Game") : `Layer ${id}`}
                                        </span>
                                        {index < recommendation.sequence.length - 1 && (
                                          <span className="text-[10px] text-slate-650 font-bold leading-none">→</span>
                                        )}
                                      </React.Fragment>
                                    );
                                  })}
                                </div>
                              </div>

                              <p className="text-[9.5px] text-slate-350 leading-normal font-sans">
                                <strong className="text-emerald-400 font-mono">Calculated Justification:</strong> {recommendation.justification}
                              </p>

                              {recommendation.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {recommendation.tags.map(t => (
                                    <span key={t} className="text-[8px] font-mono bg-emerald-950/45 text-emerald-450 px-1.5 py-0.5 rounded border border-emerald-550/15">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <div className="flex items-center justify-between border-t border-[#0d1633] pt-2 mt-1 gap-2">
                                <div className="text-[8px] font-mono text-slate-550">
                                  {hasAuthSelected && hasDbSelected ? (
                                    isAuthFirst ? (
                                      <span className="text-emerald-450 font-bold">✓ Auth RLS (10) predates DB (3)</span>
                                    ) : (
                                      <span className="text-amber-500 font-bold">▲ DB (3) loaded before Auth RLS (10)</span>
                                    )
                                  ) : (
                                    <span>Define auth/db items above</span>
                                  )}
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleOptimizedReorder('custom-calc', recommendation.sequence)}
                                  className="bg-emerald-600/10 hover:bg-emerald-650 border border-emerald-500/20 hover:border-emerald-450 rounded px-2.5 py-1 text-[8.5px] font-mono font-bold text-emerald-400 hover:text-white transition-all cursor-pointer flex items-center gap-1"
                                >
                                  <Check className="w-3 h-3" />
                                  Apply optimal sequence
                                </button>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleGenerateAIRecommendation} className="space-y-3">
                    <div className="border-t border-[#14234c]/30 pt-3">
                      <h5 className="text-xs font-black text-slate-350 uppercase tracking-tight flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        Generate Custom Blueprint via Gemini AI
                      </h5>
                      <p className="text-[10px] text-slate-450 mt-1 leading-normal">
                        Describe your custom software requirements. The server-side Gemini intelligence will recommend version packages, security scopes, and active checklists milestones.
                      </p>
                    </div>

                  <div className="space-y-2">
                    <div>
                      <label className="text-[9.5px] font-mono text-slate-400 block mb-1 uppercase font-bold">Project Concept Details</label>
                      <textarea
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        placeholder="e.g., A multi-user SaaS booking portal with subscription pricing tiers, real-time calendars matching Supabase, and Sentry telemetry capturing error events."
                        rows={3}
                        className="w-full bg-[#020512] font-mono text-xs text-cyan-300 p-2 rounded border border-[#0d1633] focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[9.5px] font-mono text-slate-400 block mb-1 uppercase font-bold">Extra Custom Preferences</label>
                      <input
                        type="text"
                        value={customPreferences}
                        placeholder="e.g., Use Postgres extensions, require passwordless magic signups..."
                        onChange={(e) => setCustomPreferences(e.target.value)}
                        className="w-full bg-[#020512] font-mono text-xs text-cyan-300 p-2 rounded border border-[#0d1633] focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isAiLoading || !projectDescription.trim()}
                    className="w-full bg-indigo-600 hover:bg-indigo-550 border border-indigo-450 font-bold text-xs p-2 py-2.5 rounded-xl text-slate-50 transition-all flex items-center justify-center gap-1.5 shadow-md disabled:opacity-40"
                  >
                    {isAiLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        AI Architect Thinking...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        Generate Custom Stack Blueprint
                      </>
                    )}
                  </button>

                  {/* Recommendations response */}
                  {aiResponse && (
                    <div className="mt-3 bg-[#020512] border border-[#0d1632] rounded-xl p-3 space-y-3.5 max-h-[220px] overflow-y-auto">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-mono font-black text-rose-400 bg-rose-955/20 px-2 py-0.5 rounded border border-rose-450/25 uppercase">
                          {aiResponse.isFallback ? 'Blueprint Sandboxed' : 'Gemini Synthesis Verified'}
                        </span>
                        <span className="text-[9.5px] text-slate-450 font-mono">Milestones Loaded</span>
                      </div>

                      <div className="text-left leading-relaxed">
                        {renderMarkdown(aiResponse.architectureAnalysis)}
                      </div>

                      {/* AI Milestones lists */}
                      <div className="space-y-2 border-t border-[#090f2b] pt-3 text-left">
                        <span className="text-[9.5px] font-mono font-black text-slate-450 block uppercase tracking-wider">TAILORED ROADMAP PROJECTS</span>
                        <div className="space-y-1.5">
                          {aiResponse.suggestedMilestones?.map((m: AIMilestone, i: number) => {
                            const isDone = !!completedMilestones[m.name];
                            return (
                              <div
                                key={m.name}
                                onClick={() => {
                                  setCompletedMilestones(prev => ({ ...prev, [m.name]: !isDone }));
                                  showToast(`Milestone '${m.name}' updated!`);
                                }}
                                className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                                  isDone ? 'bg-emerald-950/10 border-emerald-500/20 text-slate-100' : 'bg-[#040816] border-[#0c142e] text-slate-400 hover:border-[#141f42]'
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  <div className={`mt-0.5 w-3.5 h-3.5 rounded border flex items-center justify-center ${
                                    isDone ? 'bg-emerald-500 border-emerald-400' : 'border-slate-800'
                                  }`}>
                                    {isDone && <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3.5px]" />}
                                  </div>
                                  <div>
                                    <h6 className={`text-[10px] font-black ${isDone ? 'text-slate-100' : 'text-slate-200'}`}>{m.name}</h6>
                                    <p className="text-[9px] text-slate-450 mt-0.5">{m.action}</p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                  </form>
                </div>
              )}

              {/* Tab Content 3: Systems Expert Advisor Chat console */}
              {aiPanelTab === 'live-advisor' && (
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-slate-950/80 to-[#020512] border border-[#0d1633] p-3 rounded-xl shadow-lg">
                    <AnimatedReef mode="chat" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                        🐠 Live Reef Advisor
                      </h5>
                      <p className="text-[10px] text-slate-400 mt-1.5 leading-normal">
                        Ask architectural inquiries. I can automatically enable/disable core dashboard layers or load sandboxes based on what you are building.
                      </p>
                    </div>
                  </div>

                  {/* Message terminal panels */}
                  <div className="bg-[#020512] border border-[#0d1633] rounded-xl p-3 space-y-3.5 h-[240px] overflow-y-auto flex flex-col">
                    {chatMessages.map((msg, idx) => (
                      <div 
                        key={idx} 
                        className={`flex flex-col space-y-1 max-w-[85%] ${
                          msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'
                        }`}
                      >
                        <span className="text-[8px] font-mono font-bold text-slate-500">
                          {msg.role === 'user' ? 'HACKER DEV' : 'REEFSTACK ARCHITECT'}
                        </span>
                        <div className={`p-2.5 rounded-xl text-xs leading-normal text-left ${
                          msg.role === 'user' 
                            ? 'bg-blue-600/10 text-cyan-200 rounded-tr-none border border-blue-500/15 font-mono' 
                            : 'bg-[#060c23] text-gray-350 rounded-tl-none border border-slate-900 leading-relaxed'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="self-start flex items-center gap-1.5 text-[10px] font-mono text-slate-500 ml-1">
                        <RefreshCw className="w-3 h-3 animate-spin text-cyan-300" />
                        Analysing configurations parameters...
                      </div>
                    )}
                  </div>

                  {/* Chat input form */}
                  <form onSubmit={handleSendChatMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask our expert advisor e.g., How to configure RLS..."
                      className="flex-1 bg-[#020512] font-mono text-xs text-cyan-300 p-2 py-2 rounded-xl border border-[#0d1633] focus:border-indigo-505 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim() || chatLoading}
                      className="bg-indigo-600 hover:bg-indigo-550 text-slate-50 p-2 px-3.5 rounded-xl border border-indigo-450 transition-colors disabled:opacity-45"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}

              
              {/* Tab Content 4: Real GitHub Sync Port Hub */}
              {aiPanelTab === 'github-sync' && (
                <div className="space-y-4 text-left">
                  <div>
                    <h5 className="text-xs font-black text-slate-350 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      GitHub Repository Sync Hub
                    </h5>
                    <p className="text-[10px] text-slate-450 mt-1 leading-normal">
                      Connect your developer account to sync the dynamic system layout, customized notes, and code snippets straight to your repository files.
                    </p>
                  </div>

                  {/* Form fields parameters layout */}
                  <div className="space-y-3 bg-[#020512] border border-[#0d1633] p-3.5 rounded-xl">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-black text-slate-400 block uppercase">Repository Path</label>
                        <input
                          type="text"
                          value={gitHubRepo}
                          onChange={(e) => setGitHubRepo(e.target.value)}
                          placeholder="username/repository-name"
                          className="w-full bg-[#05091d] border border-[#14234c] text-xs font-mono text-cyan-300 p-2 rounded focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-black text-slate-400 block uppercase">Target Branch</label>
                        <input
                          type="text"
                          value={gitHubBranch}
                          onChange={(e) => setGitHubBranch(e.target.value)}
                          placeholder="main"
                          className="w-full bg-[#05091d] border border-[#14234c] text-xs font-mono text-cyan-300 p-2 rounded focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono font-black text-slate-400 block uppercase">Personal Access Token (PAT)</label>
                      <input
                        type="password"
                        value={gitHubToken}
                        onChange={(e) => setGitHubToken(e.target.value)}
                        placeholder="ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                        className="w-full bg-[#05091d] border border-[#14234c] text-xs font-mono text-cyan-300 p-2 rounded focus:border-cyan-500 focus:outline-none"
                      />
                      <span className="text-[8.5px] font-mono text-slate-500 leading-none block">
                        🔒 Saved strictly to your browser's local sandbox storage. Requires <code>repo</code> access scope.
                      </span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono font-black text-slate-400 block uppercase">Commit Message</label>
                      <input
                        type="text"
                        value={commitMessage}
                        onChange={(e) => setCommitMessage(e.target.value)}
                        className="w-full bg-[#05091d] border border-[#14234c] text-xs font-mono text-slate-300 p-2 rounded focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Sync specification previews checklist */}
                  <div className="p-3 bg-slate-900/15 border border-[#14234c]/40 rounded-xl space-y-2.5">
                    <span className="text-[8.5px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">Target Commits Manifest:</span>
                    <div className="grid grid-cols-2 gap-2 text-left">
                      <div className="p-2 rounded bg-black/40 border border-slate-900">
                        <div className="text-[10px] font-bold text-white font-sans flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>README.md</span>
                        </div>
                        <span className="text-[9px] text-slate-500 font-mono">Dynamic Technical Overview Spec</span>
                      </div>
                      <div className="p-2 rounded bg-black/40 border border-slate-900">
                        <div className="text-[10px] font-bold text-white font-sans flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>.reefstack.json</span>
                        </div>
                        <span className="text-[9px] text-slate-500 font-mono">Reconstructible System State Manifest</span>
                      </div>
                    </div>
                  </div>

                  {/* Push Trigger Button */}
                  <button
                    onClick={handleGitHubSync}
                    disabled={isSyncing}
                    className="w-full h-11 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:from-slate-800 disabled:to-slate-850 text-slate-100 hover:text-white disabled:text-slate-500 text-xs font-black rounded-xl border border-emerald-500/10 shadow-lg cursor-pointer transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    {isSyncing ? (
                      <>
                        <RefreshCw className="w-4 h-4 text-white animate-spin" />
                        <span>Compiling & Syncing Payload...</span>
                      </>
                    ) : (
                      <>
                        <GitMerge className="w-4 h-4 text-emerald-200" />
                        <span>Deploy Blueprint payload</span>
                      </>
                    )}
                  </button>
                </div>
              )}

            </div>

            {/* Quick action helper bottom */}
            <div className="pt-4 border-t border-[#0e1634] mt-5 flex justify-between items-center text-[10.5px] text-slate-550">
              <span>⚡️ Connected models: gemini-3.5-flash</span>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Ecosystem playground: Double check that the GEMINI_API_KEY has been securely updated inside your Environment panel settings.");
                }}
                className="text-cyan-400 font-bold hover:underline"
              >
                Sandbox check
              </a>
            </div>

          </div>

        </section>

        {/* Section 3: Expanded Feature Checklist Layers Board (Columns A to H) */}
        <section id="expanded-checklist" className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-pink-400">
                <Wand2 className="w-5.5 h-5.5 text-pink-400" />
                <h3 className="text-xl font-extrabold font-sans tracking-tight text-white uppercase">
                  Expanded Sub-Systems Feature Board
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl text-left">
                Every ReefStack Pro+ compilation is configured with these eight modular branches. Simply tick any sub-feature to blueprint your detailed layout configuration!
              </p>
            </div>

            {/* Feature progress bar tracker */}
            <div className="flex items-center gap-3.5 bg-[#060a1d] p-2 px-4 rounded-xl border border-[#141e3d]">
              <span className="text-slate-450 text-xs font-mono font-bold uppercase">Blueprints density:</span>
              <span className="font-mono font-black text-cyan-400 text-xs">
                {totalExpandedChecked} / 56 SUB-FEATURES ENABLED
              </span>
            </div>
          </div>

          {/* 8 horizontal columns flex grid (A to H layers side-by-side) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3" id="sub-layers-board">
            {EXPANDED_LAYERS.map((layer) => {
              // Count which checked features fit under this layer
              const subFeatureNames = layer.features.map(f => f.name);
              const enabledInThisLayer = subFeatureNames.filter(name => checkedExpandedFeatures[name]).length;

              return (
                <div 
                  key={layer.letter}
                  className="bg-[#040816]/90 border border-[#121d3f]/60 rounded-xl p-3.5 flex flex-col justify-between space-y-3 shadow-md hover:border-indigo-900/35 transition-colors text-left"
                >
                  <div>
                    {/* Header sector info and checkbox count */}
                    <div className="flex items-center justify-between border-b border-[#0d1633] pb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded bg-blue-900/40 border border-blue-500/25 flex items-center justify-center text-[10.5px] font-mono font-black text-white leading-none">
                          {layer.letter}
                        </span>
                        <h5 className="font-black text-[10px] text-slate-300 font-sans tracking-wide uppercase truncate max-w-[80px]">
                          {layer.name.replace(" LAYER", "")}
                        </h5>
                      </div>
                      <span className="text-[9px] font-mono font-black text-cyan-400 bg-cyan-950/20 px-1.5 rounded leading-normal">
                        {enabledInThisLayer}/{layer.features.length}
                      </span>
                    </div>

                    {/* Features checkboxes column list */}
                    <div className="space-y-1.5 pt-2">
                      {layer.features.map((feat) => {
                        const isChecked = !!checkedExpandedFeatures[feat.name];
                        return (
                          <div
                            key={feat.name}
                            onClick={() => toggleExpandedFeature(feat.name)}
                            className={`p-1.5 rounded cursor-pointer transition-all select-none text-[10px] ${
                              isChecked 
                                ? 'bg-emerald-950/15 text-slate-100 font-black border border-emerald-500/10' 
                                : 'text-slate-500 hover:text-slate-350'
                            }`}
                          >
                            <div className="flex items-start gap-1.5 leading-tight">
                              <div className={`mt-0.5 w-3 h-3 rounded flex items-center justify-center transition-all ${
                                isChecked ? 'bg-emerald-505 border-transparent text-emerald-400' : 'border border-slate-800'
                              }`}>
                                {isChecked ? (
                                  <Check className="w-2.5 h-2.5 stroke-[4.5px]" />
                                ) : null}
                              </div>
                              <span className="truncate" title={`${feat.name}: ${feat.description}`}>
                                {feat.name}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mass toggler button */}
                  <button
                    onClick={() => {
                      const allNames = layer.features.map(f => f.name);
                      const anyChecked = allNames.some(name => checkedExpandedFeatures[name]);
                      
                      const updated = { ...checkedExpandedFeatures };
                      allNames.forEach(name => {
                        updated[name] = !anyChecked;
                      });
                      setCheckedExpandedFeatures(updated);
                      showToast(`Bulk updated sub-feature layer ${layer.letter}`);
                    }}
                    className="w-full text-center text-[8.5px] font-mono uppercase bg-[#020512] hover:bg-slate-900 border border-[#0d1632] py-1 rounded text-slate-500 hover:text-slate-200 transition-colors"
                  >
                    Bulk Toggle
                  </button>

                </div>
              );
            })}
          </div>

          {/* Integrations strip block beneath the columns */}
          <div className="border border-[#14234c]/60 bg-[#040816]/70 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-5 text-left">
            <div className="space-y-0.5">
              <span className="text-[8px] font-mono font-black text-indigo-400 tracking-widest uppercase block">SYSTEM CONNECTIVITY HARNESS</span>
              <h5 className="text-[12px] font-bold text-white uppercase">Extensions & Global Integrations</h5>
            </div>

            <div className="flex flex-wrap items-center gap-3 justify-center">
              {[
                { name: "GitHub Repositories", icon: Github, col: "text-slate-300" },
                { name: "Slack Alerts", icon: Slack, col: "text-cyan-400" },
                { name: "Docker Compose", icon: Boxes, col: "text-indigo-400" },
                { name: "Cloudflare Workers", icon: Cloud, col: "text-amber-450" },
                { name: "PostHog Analytics", icon: Activity, col: "text-rose-400" },
                { name: "Discord Webhooks", icon: Megaphone, col: "text-blue-400" },
                { name: "Zapier Automated Pipelines", icon: RefreshCw, col: "text-emerald-400" },
                { name: "Hugging Face Models", icon: Sparkles, col: "text-fuchsia-400" }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.name} 
                    className="flex items-center gap-2 p-1.5 px-3 bg-[#020512] border border-[#0d1633] rounded-lg text-[10.5px] font-mono text-slate-400"
                    title={item.name}
                  >
                    <Icon className={`w-3.5 h-3.5 ${item.col}`} />
                    <span>{item.name.split(" ")[0]}</span>
                  </div>
                );
              })}
              <span className="text-[10px] text-slate-500 font-bold px-2">
                + hundreds more via Edge REST APIs & Webhooks templates
              </span>
            </div>
          </div>

          {/* Automated Developer Run/Audit Pipeline Triggers (GitHub Actions) */}
          <div className="bg-[#05091d]/95 border border-[#14234c]/65 rounded-2xl p-5 shadow-xl space-y-4 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#0d1633] pb-3 gap-3">
              <div>
                <span className="text-[9.5px] font-mono font-black text-rose-400 tracking-widest uppercase block">
                  INTEGRATED CONTINUOUS AUTOMATION (CI/CD)
                </span>
                <h5 className="text-[14px] font-black text-white uppercase flex items-center gap-1.5 mt-0.5">
                  <Github className="w-4.5 h-4.5 text-indigo-400" />
                  GitHub Actions Pipeline Control Deck
                </h5>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-slate-400 uppercase">Runner status:</span>
                <span className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1 uppercase ${
                  ciStatus === 'running' 
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                    : ciStatus === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-slate-900 border border-[#0d1633] text-slate-400'
                }`}>
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                    ciStatus === 'running' ? 'bg-amber-450 animate-ping' : ciStatus === 'success' ? 'bg-emerald-400' : 'bg-slate-500'
                  }`} />
                  {ciStatus === 'running' ? `Running (Job: ${ciActiveJob})` : ciStatus === 'success' ? 'Idle / Last Success' : 'Idle'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Trigger Cards Area (5 cols) */}
              <div className="lg:col-span-5 space-y-2.5">
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider block">DISPATCH WORKFLOW MANUALLY:</span>
                
                {[
                  {
                    name: "Release Unit Specs Checker",
                    action: "npm run test:unit",
                    description: "Checks React component configurations, D3 graph canvas, and mock hook layers.",
                    icon: Play,
                    lines: [
                      "Setting up Node environment v20.11...",
                      "Installing Vitest specs frameworks...",
                      "✓ PASS - src/App.test.tsx > compiles perfectly",
                      "✓ PASS - src/components/DependencyGraph.test.tsx > D3 layout renders",
                      "SUCCESS: All 12/12 unit tests successfully evaluated."
                    ]
                  },
                  {
                    name: "Pack Immutable Container",
                    action: "docker build -t reef:latest .",
                    description: "Compiles ES Module code and bundles the CJS Node proxy for Cloud Run.",
                    icon: Boxes,
                    lines: [
                      "Staging Docker multi-stage workspace...",
                      "STEP 1/3: FROM node:20-alpine AS build...",
                      "STEP 2/3: RUN npm run build (CommonJS bundles compiled in dist/)...",
                      "STEP 3/3: EXPOSE port 3000...",
                      "SUCCESS: Packed container app:latest successfully pushed to registry."
                    ]
                  },
                  {
                    name: "Linter & TypeScript Guard",
                    action: "npm run static:lint",
                    description: "Evaluates syntax rules, relative imports, and strict TypeScript types safety.",
                    icon: Shield,
                    lines: [
                      "Spinning up eslint-config-standard...",
                      "Evaluating JSX layout files for tag sanitizations...",
                      "Strict typings verified (tsc --noEmit)...",
                      "SUCCESS: All TypeScript files compliant with 0 errors."
                    ]
                  }
                ].map((job) => {
                  const JobIcon = job.icon;
                  const isCurrent = ciActiveJob === job.name;
                  return (
                    <div 
                      key={job.name}
                      onClick={() => runCiPipelineSimulator(job.name, job.lines)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        isCurrent && ciStatus === 'running'
                          ? 'bg-indigo-950/20 border-indigo-500/40 shadow-inner'
                          : 'bg-slate-950/40 border-[#0d1633] hover:bg-[#060a22]/85 hover:border-[#1c2c5e]'
                      }`}
                    >
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[8.5px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded leading-none uppercase">
                            {job.action}
                          </span>
                        </div>
                        <h6 className="text-[11.5px] font-black text-slate-100 uppercase mt-1">{job.name}</h6>
                        <p className="text-[9.5px] text-slate-450 line-clamp-1 font-sans">{job.description}</p>
                      </div>
                      <button 
                        type="button"
                        className={`p-2 rounded bg-indigo-950/20 text-indigo-400 border border-indigo-500/10 hover:border-indigo-455 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer ${
                          isCurrent && ciStatus === 'running' ? 'animate-spin animate-ping' : ''
                        }`}
                      >
                        <JobIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Live Terminal Console Area (7 cols) */}
              <div className="lg:col-span-7 flex flex-col h-[235px]">
                <div className="bg-[#020512] border border-[#0d1633] rounded-xl flex-1 flex flex-col overflow-hidden">
                  {/* Console Header */}
                  <div className="bg-[#040816] px-3.5 py-1.5 border-b border-[#0d1633] flex items-center justify-between">
                    <span className="text-[8.5px] font-mono text-slate-450 tracking-wider">GitHub Actions System Log (ubuntu-latest)</span>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500/60" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/60" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
                    </div>
                  </div>
                  {/* Log stream lines */}
                  <div className="p-3.5 font-mono text-[9.5px] text-emerald-400 space-y-1 overflow-y-auto flex-1 text-left bg-slate-950/95 scrollbar-thin">
                    {ciConsoleLogs.map((log, lidx) => (
                      <div key={lidx} className="leading-relaxed whitespace-pre-wrap font-mono">
                        <span className="text-slate-500 select-none mr-2">[{lidx + 1}]</span>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 4: Lifecycle Pipeline, Preset Use cases & why Reefstack */}
        <section id="workflow-lifecycle" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Block: Lifecycle Pipeline Step by Step (5 cols) */}
          <div className="lg:col-span-6 bg-[#040816]/90 border border-[#14234c]/65 rounded-2xl p-5 shadow-2xl space-y-4 text-left">
            <div>
              <span className="text-[9px] font-mono font-black text-cyan-400 tracking-widest uppercase block border-b border-[#0d1633] pb-2">
                Engineering Development Lifecycle step-by-step
              </span>
              <h4 className="text-sm font-extrabold text-white uppercase mt-2">
                How to deploy with ReefStack Pro+
              </h4>
              <p className="text-[11px] text-slate-400 leading-normal mt-1">
                Execute this standard 7-step process pipeline dynamically to migrate abstract code blocks straight into high scale live production.
              </p>
            </div>

            {/* Connected nodes circles */}
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-2.5 pb-2 border-b border-[#080f2d] pt-1">
              {HOW_TO_STEPS.map((hstep) => {
                const isActive = activeStepNum === hstep.number;
                const isCompleted = completedSteps.includes(hstep.number);

                return (
                  <div
                    key={hstep.number}
                    onClick={() => setActiveStepNum(hstep.number)}
                    className={`flex-1 p-2 text-center rounded-xl border cursor-pointer transition-all ${
                      isActive 
                        ? 'bg-cyan-950/20 border-cyan-500/40 shadow-inner text-white' 
                        : isCompleted
                        ? 'bg-emerald-950/10 border-emerald-500/20 text-slate-100'
                        : 'bg-[#020512] border-[#0c142e] text-slate-500 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span className={`w-4 h-4 rounded text-[9.5px] font-mono font-bold flex items-center justify-center ${
                        isActive ? 'bg-cyan-405 text-slate-950' : 'bg-[#020512] text-slate-500'
                      }`}>
                        {hstep.number}
                      </span>
                      {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-450" />}
                    </div>
                    <span className="text-[10px] font-black uppercase mt-1 block truncate">
                      {hstep.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* active step descriptions */}
            <div className="space-y-2 pt-1 font-sans">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-900/20 border border-indigo-500/20 flex items-center justify-center text-cyan-400">
                  <IconResolver name={activeStep.iconName} className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[8.5px] font-mono text-slate-500 block">PIPELINE PHASE {activeStep.number} : {activeStep.title}</span>
                  <h5 className="text-xs font-black text-white uppercase">{activeStep.action}</h5>
                </div>
              </div>

              <p className="text-[11px] text-slate-350 leading-relaxed font-mono">
                {activeStep.description}
              </p>

              <p className="text-[11px] text-slate-450 italic leading-snug bg-slate-950/40 p-3 rounded-lg border border-slate-900 font-sans">
                💡 Methodologies guidelines: "{activeStep.details}"
              </p>
            </div>

            {/* Checkpoint tasks completed toggle */}
            <div className="pt-2 border-t border-[#0d1633] flex items-center justify-between">
              <span className="text-[9.5px] text-slate-500 font-mono">COMPLETE CHECKS TO INCREMENT STATUS</span>
              <button
                onClick={() => {
                  const num = activeStep.number;
                  setCompletedSteps(prev => 
                    prev.includes(num) ? prev.filter(x => x !== num) : [...prev, num]
                  );
                  showToast(`Toggled Phase ${num} completion state!`);
                  if (!completedSteps.includes(num) && num < 7) {
                    setTimeout(() => {
                      setActiveStepNum(num + 1);
                    }, 500);
                  }
                }}
                className={`text-[10px] font-bold p-1.5 px-3.5 rounded-lg border transition-all ${
                  completedSteps.includes(activeStep.number)
                    ? 'bg-emerald-650/15 border-emerald-500/35 text-emerald-400'
                    : 'bg-indigo-600 hover:bg-indigo-550 border-indigo-450 text-slate-100'
                }`}
              >
                {completedSteps.includes(activeStep.number) ? 'Completed ✓' : 'Mark Completed'}
              </button>
            </div>

          </div>

          {/* Right Block: why reefstack benefits and digital coral elements (7 cols) */}
          <div className="lg:col-span-6 bg-[#040816]/90 border border-[#14234c]/65 rounded-2xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between text-left">
            
            {/* Ambient vector schematic of digital coral reef backdrop */}
            <div className="absolute -bottom-8 -right-8 w-44 h-44 opacity-15 text-cyan-500 animate-pulse pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #0e204c 2px, transparent 2px)", backgroundSize: "12px 12px" }}>
              <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px] rounded-full blur-md" />
            </div>

            <div className="space-y-4 relative z-10">
              <div>
                <span className="text-[9px] font-mono font-black text-indigo-400 tracking-widest uppercase block border-b border-[#0d1633] pb-2">
                  Ecosystem Value Proposition parameters
                </span>
                <h4 className="text-sm font-extrabold text-white uppercase mt-2">
                  Why ReefStack Pro+ is preferred
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3">
                {[
                  { title: "All-in-One Scaffold", desc: "No need to manually configure webpack, docker configs, postgres triggers, or Stripe webhook routes. ReefStack bundles all structures out of the box." },
                  { title: "AI-Powered Development", desc: "Includes advanced Gemini chat models integrations natively maps task parameters into full boilerplate folders templates." },
                  { title: "Zero Latency Compilation", desc: "Built with Node.js fast ESM bundling layers, keeping development hot reload speeds immediate and production files lightweight." },
                  { title: "Optimized Storage CDN", desc: "Hosts secure avatar images, files buckets and level maps inside Cloudflare R2 edge locations, reducing network egress fees." },
                  { title: "Universal Auth Security", desc: "Features universal Row-Level security, JWT profiles data protection, and rate-limit shields protecting Express routes." },
                  { title: "Scale-to-Zero Architecture", desc: "Designed for serverless and scalable database structures, minimizing staging server operational costs." }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/40 rounded-xl border border-[#0d152a] text-left space-y-1">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-450 shrink-0" />
                      <h6 className="text-[11px] font-black text-white">{item.title}</h6>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal font-sans">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Slogan banner block inside footer */}
            <div className="pt-3 border-t border-[#0e1634] flex flex-col md:flex-row items-center justify-between gap-3 text-left relative z-10 text-[11px] text-slate-400">
              <span className="font-mono font-extrabold uppercase text-slate-500 tracking-wider">
                ⚡️ Curated for High Performance Stacks
              </span>
              <span className="text-cyan-400 font-extrabold flex items-center gap-1">
                Build your Vision • Code your Future • Ship to the World 🚀
              </span>
            </div>

          </div>

        </section>

      </main>

      {/* Floating sliding drawer - Playground Variables Codes Studio Sandbox */}
      <AnimatePresence>
        {isSandboxOpen && (
          <>
            {/* Backdrop black overlay */}
            <div 
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsSandboxOpen(false)}
            />

            {/* Flyout drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-[#030615]/98 border-l border-[#14234e] shadow-2xl p-6 overflow-y-auto backdrop-blur-md text-left flex flex-col justify-between"
            >
              <div className="space-y-6">
                
                {/* Drawer header close button */}
                <div className="flex items-center justify-between border-b border-[#0d1633] pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${getColorClass(STACK_LAYERS.find(l=>l.id===activeSandboxLayerId)?.color || 'cyan').text}`}>
                      <IconResolver name={STACK_LAYERS.find(l=>l.id===activeSandboxLayerId)?.iconName || 'Globe'} className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block leading-none">
                        Layer Sandbox Playground
                      </span>
                      <h4 className="text-md font-bold text-slate-100 font-sans tracking-wide mt-1">
                        {STACK_LAYERS.find(l=>l.id===activeSandboxLayerId)?.name}
                      </h4>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsSandboxOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Subtitle */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono font-black text-slate-450 block uppercase tracking-widest">PARTNERSHIP TECHSTACKS</span>
                  <div className="text-xs font-black text-cyan-300 font-mono">
                    🚀 {STACK_LAYERS.find(l=>l.id===activeSandboxLayerId)?.technology}
                  </div>
                  <p className="text-xs text-slate-400 leading-normal italic font-sans pr-4 mt-0.5">
                    "{STACK_LAYERS.find(l=>l.id===activeSandboxLayerId)?.subtitle}"
                  </p>

                  {/* Accessibility Hotkeys Bar */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#0d1633]/50 mt-1 pb-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black shrink-0">⌨️ SYSTEM SHORTCUTS:</span>
                    <div className="flex items-center gap-1 bg-cyan-950/20 border border-cyan-500/15 p-1 px-2 rounded-md text-[9px] font-mono text-slate-350" title="Press left/right arrow keys to move layer position!">
                      <kbd className="font-black text-cyan-400 font-sans">← / →</kbd>
                      <span>Reorder Layer</span>
                    </div>
                    <div className="flex items-center gap-1 bg-indigo-950/20 border border-indigo-500/15 p-1 px-2 rounded-md text-[9px] font-mono text-slate-350" title="Press Ctrl+S to save custom note!">
                      <kbd className="font-black text-indigo-400 font-sans">Ctrl+S</kbd>
                      <span>Save Note</span>
                    </div>
                    <div className="flex items-center gap-1 bg-emerald-950/20 border border-emerald-500/15 p-1 px-2 rounded-md text-[9px] font-mono text-slate-350" title="Press Ctrl+P to trigger PDF specs compiler!">
                      <kbd className="font-black text-emerald-450 font-sans">Ctrl+P</kbd>
                      <span>PDF Modal</span>
                    </div>
                  </div>
                </div>

                {/* Sandbox Advantages list */}
                <div className="space-y-2 bg-[#020512] p-3.5 rounded-xl border border-[#0d1632] text-left">
                  <span className="text-[9px] font-mono font-black text-slate-450 block uppercase tracking-widest border-b border-[#0d1632]/80 pb-1.5">
                    BLUEPRINTS PERFORMANCE HIGHLIGHTS
                  </span>
                  <ul className="space-y-2 pt-1.5">
                    {STACK_LAYERS.find(l=>l.id===activeSandboxLayerId)?.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-350 leading-relaxed font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Live Editable Parameters Form */}
                <div className="space-y-3 pt-1 text-left">
                  <div className="flex items-center gap-1.5 text-[9.5px] font-mono font-black text-slate-450 pb-1 uppercase">
                    <Sliders className="w-3.5 h-3.5 text-blue-400" />
                    Customized Sandbox State Variables
                  </div>

                  <div className="p-3 bg-[#020512] border border-[#0d1632] rounded-xl grid grid-cols-1 gap-3 text-left">
                    {activeSandboxLayerId === 1 && (
                      <div className="space-y-1">
                        <label className="text-[9.5px] font-mono text-slate-405 block uppercase font-bold">Metrics API Web URL Endpoint</label>
                        <input
                          type="text"
                          value={customVariables.metricsUrl}
                          onChange={(e) => setCustomVariables({ ...customVariables, metricsUrl: e.target.value })}
                          className="w-full bg-[#040816] font-mono text-xs text-cyan-300 p-2 rounded border border-[#0d1632] focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    )}
                    {activeSandboxLayerId === 3 && (
                      <div className="space-y-1">
                        <label className="text-[9.5px] font-mono text-slate-405 block uppercase font-bold">Target SQL Transactions Table Label</label>
                        <input
                          type="text"
                          value={customVariables.tableName}
                          onChange={(e) => setCustomVariables({ ...customVariables, tableName: e.target.value })}
                          className="w-full bg-[#040816] font-mono text-xs text-cyan-300 p-2 rounded border border-[#0d1632] focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    )}
                    {activeSandboxLayerId === 4 && (
                      <div className="space-y-1">
                        <label className="text-[9.5px] font-mono text-slate-405 block uppercase font-bold">Godot physics player movement velocity</label>
                        <input
                          type="number"
                          value={customVariables.playerSpeed}
                          onChange={(e) => setCustomVariables({ ...customVariables, playerSpeed: e.target.value })}
                          className="w-full bg-[#040816] font-mono text-xs text-cyan-300 p-2 rounded border border-[#0d1632] focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    )}
                    {activeSandboxLayerId === 7 && (
                      <div className="space-y-1">
                        <label className="text-[9.5px] font-mono text-slate-405 block uppercase font-bold">Stripe Price ID Tier Billing code</label>
                        <input
                          type="text"
                          value={customVariables.priceId}
                          onChange={(e) => setCustomVariables({ ...customVariables, priceId: e.target.value })}
                          className="w-full bg-[#040816] font-mono text-xs text-cyan-300 p-2 rounded border border-[#0d1632] focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    )}
                    {activeSandboxLayerId !== 1 && activeSandboxLayerId !== 3 && activeSandboxLayerId !== 4 && activeSandboxLayerId !== 7 && (
                      <div className="space-y-1">
                        <label className="text-[9.5px] font-mono text-slate-405 block uppercase font-bold">Dynamic Application Name Label</label>
                        <input
                          type="text"
                          value={customVariables.appName}
                          onChange={(e) => setCustomVariables({ ...customVariables, appName: e.target.value })}
                          className="w-full bg-[#040816] font-mono text-xs text-cyan-300 p-2 rounded border border-[#0d1632] focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Private Markdown-Based Notes for Documentation */}
                <div className="space-y-2.5 bg-[#020512] p-4 rounded-xl border border-[#0d1632] text-left">
                  <div className="flex items-center justify-between border-b border-[#0d1632]/80 pb-1.5 mb-2">
                    <span className="text-[10px] font-mono font-black text-slate-405 block uppercase tracking-widest leading-none">
                      📓 PRIVATE DOCUMENTATION NOTE
                    </span>
                    <button
                      onClick={() => setIsEditingNote(!isEditingNote)}
                      className="text-[9.5px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {isEditingNote ? (
                        <>
                          <Eye className="w-3 h-3 text-emerald-400" />
                          <span>Preview Markdown</span>
                        </>
                      ) : (
                        <>
                          <Edit2 className="w-3 h-3 text-indigo-400" />
                          <span>Edit Notes</span>
                        </>
                      )}
                    </button>
                  </div>

                  {isEditingNote ? (
                    <div className="space-y-2">
                      <textarea
                        value={layerNotes[activeSandboxLayerId] || ''}
                        onChange={(e) => updateLayerNote(activeSandboxLayerId, e.target.value)}
                        placeholder="### Architectural Note&#10;Write markdown documentation here for this blueprint layer...&#10;&#10;1. Custom variables initialized&#10;2. Security policies audited"
                        className="w-full h-32 bg-[#040816] border border-[#0d1632] rounded-lg p-2.5 text-xs text-slate-205 font-mono focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20"
                      />
                      <div className="text-[8.5px] font-mono text-slate-500 leading-normal space-y-1">
                        <div>💡 Auto-saved as you type. Supports H3 Headers (###) and lists.</div>
                        <div className="text-cyan-500 font-bold">⌨️ Hotkey: Press <kbd className="bg-black/40 px-1 rounded text-slate-300">Ctrl+S</kbd> to compile note and view formatted live markdown.</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-350 min-h-12 leading-relaxed">
                      {layerNotes[activeSandboxLayerId] ? (
                        <div className="prose prose-invert max-w-none space-y-1 bg-[#040816]/50 p-2.5 rounded-lg border border-[#0d1632]/50">
                          {layerNotes[activeSandboxLayerId].split('\n').map((line, fileIdx) => {
                            if (line.trim().startsWith('### ')) {
                              return <h5 key={fileIdx} className="text-xs font-black text-cyan-400 mt-2 mb-1 uppercase tracking-wider">{line.replace('### ', '')}</h5>;
                            }
                            if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                              return <li key={fileIdx} className="ml-3 list-disc text-slate-300 my-0.5">{line.substring(2)}</li>;
                            }
                            if (line.trim().match(/^\d+\.\s/)) {
                              return <li key={fileIdx} className="ml-3 list-decimal text-slate-300 my-0.5">{line.substring(line.indexOf('.') + 1).trim()}</li>;
                            }
                            if (line.trim() === '') {
                              return <div key={fileIdx} className="h-1" />;
                            }
                            return <p key={fileIdx} className="text-[11px] text-slate-350 leading-relaxed">{line}</p>;
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4 bg-[#040816]/30 rounded-lg border border-dashed border-[#0d1632]/45 text-slate-550 text-center space-y-1">
                          <span className="text-xs text-slate-500 font-mono">✎ empty note</span>
                          <button
                            onClick={() => setIsEditingNote(true)}
                            className="text-[10px] text-cyan-550 hover:text-cyan-400 font-bold underline cursor-pointer"
                          >
                            Click to write custom documentation notes...
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Dynamic Boilerplate Code Output */}
                <div className="space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[9.5px] font-mono font-black text-slate-455 uppercase leading-none">
                      <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                      Dynamic Blueprint Code Snippet
                    </span>
                    <button
                      onClick={() => handleCopyCode(getCustomizedSnippet(STACK_LAYERS.find(l=>l.id===activeSandboxLayerId)))}
                      className="flex items-center gap-1.5 text-[9.5px] font-bold p-1 px-3 bg-slate-900 border border-slate-800 rounded hover:text-white transition-colors"
                    >
                      {sandboxCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-400" /> Copy Code
                        </>
                      )}
                    </button>
                  </div>

                  <div className="relative rounded-xl border border-[#0a102a] bg-[#020512] p-4 overflow-x-auto max-h-[250px] font-mono text-[10.5px] text-purple-200">
                    <pre className="whitespace-pre">{getCustomizedSnippet(STACK_LAYERS.find(l=>l.id===activeSandboxLayerId))}</pre>
                  </div>
                  <span className="block text-[8.5px] font-mono text-slate-500 text-right leading-none">
                    🔥 values highlighted inside the editor automatically compile into variables
                  </span>
                </div>

              </div>

              {/* Drawer footer activator checklist toggle */}
              <div className="pt-4 border-t border-[#0d1633] mt-6 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-bold uppercase">Selection Blueprint State:</span>
                <button
                  onClick={() => {
                    toggleLayerSelection(activeSandboxLayerId);
                    showToast(`Toggled selection status for Layer ${activeSandboxLayerId}!`);
                  }}
                  className={`p-2 px-4 rounded-xl border font-bold transition-all text-xs ${
                    selectedLayerIds.includes(activeSandboxLayerId)
                      ? 'bg-[#10b981]/10 text-emerald-400 border-[#10b981]/25'
                      : 'bg-indigo-600 hover:bg-indigo-550 text-slate-100 border-indigo-455'
                  }`}
                >
                  {selectedLayerIds.includes(activeSandboxLayerId) ? '✓ Sandbox Enabled' : 'Enable Sandbox layer'}
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating active status popup toast bar */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-indigo-950 border border-indigo-500/30 p-2.5 px-5 rounded-2xl flex items-center gap-2 shadow-2xl text-xs font-mono font-bold text-slate-100 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Printable Report preview in-app interactive modal */}
      <AnimatePresence>
        {isPrintModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrintModalOpen(false)}
              className="absolute inset-0 bg-[#02040b]/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative bg-[#050819] border border-[#14234c] w-full max-w-2xl rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[85vh] text-left space-y-5 z-10"
            >
              <div className="flex items-center justify-between border-b border-[#0d1633] pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-md font-extrabold text-white uppercase tracking-wider font-sans">
                    Report Generator Console
                  </h3>
                </div>
                <button
                  onClick={() => setIsPrintModalOpen(false)}
                  className="p-1 px-2.5 bg-slate-900 border border-slate-800 rounded hover:text-white text-slate-400 transition-colors cursor-pointer"
                >
                  Close ×
                </button>
              </div>

              {/* Form input details to customize print */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#030613] p-4 rounded-xl border border-[#0d1632]">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 block uppercase font-black">DOCUMENT AUTHOR / EMAIL</label>
                  <input
                    type="text"
                    value={reportAuthor}
                    onChange={(e) => setReportAuthor(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 text-xs text-cyan-300 font-mono p-2 rounded focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-405 block uppercase font-black">REVISION VERSION</label>
                  <input
                    type="text"
                    value={reportRevision}
                    onChange={(e) => setReportRevision(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 text-xs text-cyan-300 font-mono p-2 rounded focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-mono text-slate-405 block uppercase font-black">EXECUTIVE REPORT SUMMARY NOTE</label>
                  <textarea
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 text-xs text-slate-200 p-2 h-20 rounded focus:border-cyan-500 focus:outline-none font-sans"
                  />
                </div>
              </div>

              {/* Integrity Warning snapshot review */}
              <div className="p-3.5 bg-[#020512] rounded-xl border border-[#0e1633] space-y-2">
                <span className="text-[9px] font-mono text-indigo-400 font-bold block uppercase tracking-widest leading-none">SNAPSHOT DIAGNOSTICS LOGS</span>
                <div className="text-xs text-slate-350">
                  {getValidationWarnings().length > 0 ? (
                    <span className="text-amber-400 font-bold">⚠️ Warning flags detected inside current system blueprint selection: {getValidationWarnings().length} conflicts will compile into the printed report.</span>
                  ) : (
                    <span className="text-emerald-400 font-bold">✓ System validated perfectly. report compiles cleanly with zero conflict logs.</span>
                  )}
                </div>
              </div>

              {/* Action Buttons to download report */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#0d1633] pt-4">
                <div className="text-[10px] text-slate-500 font-mono leading-tight max-w-sm">
                  💡 Clicking print launches your native browser print overlay module. Choose <strong>"Save as PDF"</strong> or your local printer destination.
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setIsPrintModalOpen(false)}
                    className="w-full sm:w-auto px-4 py-2 hover:bg-slate-900 border border-slate-850 rounded-xl text-slate-400 text-xs font-bold font-sans cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setTimeout(() => {
                        window.print();
                      }, 120);
                    }}
                    className="w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-black rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all uppercase tracking-wide"
                  >
                    <FileText className="w-4 h-4 text-slate-950" />
                    <span>Download PDF / Print</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 
        This is the dedicated high-contrast printable technical layout. 
        Normally hidden on screens, but when printing is triggered, other elements hide via `@media print` 
        and this element prints crisp black-and-white.
      */}
      <div id="printable-blueprint-report" className="hidden print:block text-black bg-white p-10 font-sans">
        <div className="border-b-4 border-black pb-4 mb-6">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight">ReefStack Pro+</h1>
              <p className="text-sm font-semibold tracking-wide uppercase text-gray-500">System Blueprint Specification & Technical Report</p>
            </div>
            <div className="text-right text-xs font-mono">
              <div>Date: {new Date().toLocaleDateString()}</div>
              <div>Revision: {reportRevision}</div>
              <div>Author: {reportAuthor}</div>
            </div>
          </div>
        </div>

        <div className="mb-6 space-y-2">
          <h3 className="text-lg font-bold uppercase tracking-wide border-b border-gray-300 pb-1">Executive Summary</h3>
          <p className="text-xs text-gray-750 leading-relaxed">{reportNotes}</p>
        </div>

        {/* Validation Check Diagnostics in Printed Report */}
        <div className="mb-6 space-y-2">
          <h3 className="text-lg font-bold uppercase tracking-wide border-b border-gray-300 pb-1">Automated System Security & Conflict Scan</h3>
          {getValidationWarnings().length > 0 ? (
            <div className="border border-red-300 bg-red-50 p-3 rounded space-y-2">
              <span className="text-[10px] font-bold text-red-700 uppercase tracking-widest block">INTEGRITY ALERTS DETECTED ({getValidationWarnings().length})</span>
              <ul className="space-y-2">
                {getValidationWarnings().map((warn, i) => (
                  <li key={i} className="text-xs text-gray-800">
                    <span className="font-bold text-red-650">[{warn.title}]</span> - {warn.description} 
                    <div className="mt-0.5 font-mono text-[10px] italic text-gray-500">Resolution: {warn.resolution}</div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="border border-green-300 bg-green-50 p-2 text-xs text-green-800 rounded">
              ✓ Verified Clean scan. Zero architectural design conflicts detected.
            </div>
          )}
        </div>

        {/* Active Layers Listing */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold uppercase tracking-wide border-b border-gray-300 pb-1">Architecture Layers Configuration State</h3>
          <table className="w-full border-collapse border border-gray-300 text-xs">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border border-gray-300 p-2 font-black w-24">POSITION</th>
                <th className="border border-gray-300 p-2 font-black w-24">LAYER ID</th>
                <th className="border border-gray-300 p-2 font-black">MODULE SPECIFICATION</th>
                <th className="border border-gray-300 p-2 font-black">STATUS</th>
                <th className="border border-gray-300 p-2 font-black">PRIVATE NOTE</th>
              </tr>
            </thead>
            <tbody>
              {layersList.map((layer, index) => {
                const isSel = selectedLayerIds.includes(layer.id);
                return (
                  <tr key={layer.id} className={isSel ? "bg-white" : "bg-gray-50 text-gray-400 font-light"}>
                    <td className="border border-gray-300 p-2 font-mono">POSITION {index + 1}</td>
                    <td className="border border-gray-300 p-2 font-bold font-mono">#{String(layer.id).padStart(2, '0')}</td>
                    <td className="border border-gray-300 p-2">
                      <div className="font-bold text-gray-900">{layer.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono">{layer.technology}</div>
                    </td>
                    <td className="border border-gray-300 p-2 font-bold">
                      {isSel ? (
                        <span className="text-green-700">✓ ACTIVE CLIENT-NODE</span>
                      ) : (
                        <span className="text-gray-400">× INACTIVE</span>
                      )}
                    </td>
                    <td className="border border-gray-300 p-2 text-[10.5px]">
                      {layerNotes[layer.id] ? (
                        <span className="italic block max-w-xs truncate text-gray-700">{layerNotes[layer.id]}</span>
                      ) : (
                        <span className="text-gray-400 font-light italic">No private annotations written.</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected snippets detailed values summary */}
        <div className="mt-6">
          <h3 className="text-md font-bold uppercase text-gray-700 tracking-wide border-b border-gray-300 pb-1">Codebase Snippets Spec Outline</h3>
          <div className="space-y-3 mt-2">
            {layersList.filter(l => selectedLayerIds.includes(l.id)).map(layer => (
              <div key={layer.id} className="p-3 border border-gray-250 rounded">
                <div className="font-black text-xs text-gray-800">{layer.name} — {layer.technology} Code Snippet Template</div>
                <pre className="text-[9.5px] bg-gray-50 p-2 rounded mt-1 border border-gray-200 font-mono overflow-auto max-h-[160px] whitespace-pre">
                  {getCustomizedSnippet(layer)}
                </pre>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-300 pt-4 text-center text-[10px] text-gray-400 font-mono">
          End of Specification Report — Generated via ReefStack Pro+ Integrity Suite.
        </div>
      </div>

      {/* Embedded footer links with interactive callbacks */}
      <FooterLinks onLinkClick={(name) => {
        setActiveFooterLink(name);
        showToast(`Opened Resource Console: ${name}`);
      }} />

      {/* Interactive Footer resource portal modal */}
      <AnimatePresence>
        {activeFooterLink && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFooterLink(null)}
              className="absolute inset-0 bg-[#02040b]/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 35 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 35 }}
              className="relative bg-[#04081b] border border-[#14234c] w-full max-w-5xl h-[80vh] rounded-3xl shadow-3xl overflow-hidden flex flex-col md:flex-row z-10 text-left"
            >
              {/* Sidebar of the resource panel */}
              <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#121c3d] bg-[#020512] p-5 flex flex-col justify-between shrink-0">
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] font-mono font-black text-cyan-400 block tracking-widest uppercase">REEFSTACK CLIENT GATEWAY</span>
                    <h4 className="text-sm font-semibold tracking-wide text-white font-sans uppercase mt-1">Resource Hub</h4>
                  </div>

                  <nav className="space-y-1.5">
                    {[
                      { id: "Docs & APIs", label: "Docs & APIs", desc: "Detailed specs", icon: FileText },
                      { id: "SaaS Templates", label: "SaaS Templates", desc: "1-Click Layouts", icon: Boxes },
                      { id: "Discord Alliance", label: "Alliance Chat", desc: "Mock Live Forum", icon: Users },
                      { id: "Active Support", label: "Priority Tickets", desc: "Support Bot Queue", icon: LifeBuoy },
                      { id: "2026 Roadmap", label: "2026 Roadmap", desc: "Feature Telemetry", icon: Compass },
                      { id: "Engine Updates", label: "Self Diagnostics", desc: "Console compiler", icon: RefreshCw }
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = activeFooterLink === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveFooterLink(item.id);
                            showToast(`Navigated to ${item.id}`);
                          }}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left group ${
                            isSelected 
                              ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.06)]' 
                              : 'border border-transparent text-slate-400 hover:text-white hover:bg-slate-900/50'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-cyan-950/40 text-cyan-400' : 'bg-slate-950 text-slate-400 group-hover:text-cyan-400'} transition-all`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold leading-normal">{item.label}</div>
                            <div className="text-[9px] text-slate-500 leading-none mt-0.5">{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="pt-4 border-t border-[#121c3d]/50 hidden md:block">
                  <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>CONNECTION STABLE (SSL)</span>
                  </div>
                </div>
              </div>

              {/* Main Content Area of the panel */}
              <div className="flex-1 flex flex-col overflow-hidden bg-[#04081c]">
                {/* Header bar */}
                <div className="p-4 px-6 border-b border-[#121c3d] flex items-center justify-between bg-[#04081c]/50">
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono">
                      // {activeFooterLink} Resource Port
                    </h3>
                    <p className="text-[10px] text-slate-450 font-sans">
                      Standard sandbox integration console. All actions persist in-memory.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveFooterLink(null)}
                    className="p-1 px-3 bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-400 rounded-lg text-xs font-bold font-sans border border-slate-850 cursor-pointer transition-all"
                  >
                    Close console ×
                  </button>
                </div>

                {/* Scroller body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                  {/* TAB 1: Docs & APIs */}
                  {activeFooterLink === "Docs & APIs" && (
                    <div className="space-y-4">
                      <div className="bg-indigo-950/15 border border-indigo-500/20 p-4 rounded-xl">
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">🛠️ Global Stack API Protocols Specs</h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          ReefStack Pro+ standardizes data channels across 10 functional layout nodes. Select any stack tier below to check live instructions and variables schema:
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {layersList.map((layer) => (
                          <div 
                            key={layer.id} 
                            onClick={() => {
                              setActiveSandboxLayerId(layer.id);
                              setIsSandboxOpen(true);
                              // Keep the sidebar open but also show the sandbox drawer!
                              showToast(`Sandbox Drawer triggered for Layer #${layer.id}!`);
                            }}
                            className="p-3 bg-[#020512] border border-[#0d1633] hover:border-cyan-500/40 rounded-xl cursor-pointer transition-all flex items-start gap-3 group"
                          >
                            <div className="p-2 rounded bg-cyan-950/30 font-mono font-black text-cyan-400 text-xs border border-cyan-500/15 animate-pulse">
                              #{String(layer.id).padStart(2, '0')}
                            </div>
                            <div className="flex-1 min-w-0 text-xs">
                              <div className="font-bold text-slate-200 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                                <span>{layer.name}</span>
                                <span className="text-[9px] font-mono text-emerald-450 font-normal">Active</span>
                              </div>
                              <div className="text-[10px] text-slate-400 mt-1">Technology: <code className="font-mono text-cyan-400 text-[10px] bg-slate-100/10 px-1 rounded">{layer.technology}</code></div>
                              <div className="text-[9px] text-slate-500 mt-1 italic group-hover:text-slate-400 line-clamp-1">"{layer.subtitle || 'Custom compiled node'}"</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: SaaS Templates */}
                  {activeFooterLink === "SaaS Templates" && (
                    <div className="space-y-4">
                      <div className="bg-emerald-950/15 border border-emerald-500/20 p-4 rounded-xl">
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">🥞 Complete Multi-Layer SaaS Boilerplates</h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          Click any layout package below to instantly toggle the 10 architecture segments and load optimized preferences.
                        </p>
                      </div>

                      <div className="space-y-3">
                        {[
                          {
                            title: "The Solopreneur AI Hub Boilerplate",
                            desc: "Designed for micro-saas systems requiring continuous auth sessions, OpenAI/Gemini smart summaries, payment triggers, and automated deployments.",
                            stack: [1, 3, 5, 7, 10],
                            vars: { tableName: 'ai_billing_users', priceId: 'price_ai_pro_39', appName: 'AI Agent Architect Hub' }
                          },
                          {
                            title: "Indie Real-Time Game Studio Setup",
                            desc: "A multiplayer optimized game blueprint utilizing local engine physics frames, continuous analytical logging, and edge state synchronization.",
                            stack: [2, 4, 6, 8, 10],
                            vars: { tableName: 'game_ranks_score', playerSpeed: '640.5', appName: 'Multiplayer Arena Infinite' }
                          },
                          {
                            title: "Serverless E-Commerce Standard Model",
                            desc: "An safe, resilient storefront framework focusing on immediate client searches, secure Stripe subscriptions, and auto-generated analytical dashboards.",
                            stack: [1, 3, 7, 8],
                            vars: { tableName: 'store_checkout_invoices', priceId: 'price_growth_cart_59', appName: 'Modular Shop Portal' }
                          }
                        ].map((tpl) => (
                          <div 
                            key={tpl.title}
                            className="p-4 bg-[#020512] border border-[#0d1633] hover:bg-[#03081e] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-300"
                          >
                            <div className="space-y-1.5 flex-1">
                              <h5 className="text-xs font-extrabold text-white uppercase tracking-wider font-sans">{tpl.title}</h5>
                              <p className="text-[11px] text-slate-400 leading-normal max-w-xl">{tpl.desc}</p>
                              <div className="flex flex-wrap gap-1 items-center">
                                <span className="text-[9px] text-[#5569a7] font-semibold uppercase font-mono mr-1">Activated layers:</span>
                                {tpl.stack.map(id => (
                                  <span key={id} className="text-[9px] font-mono font-black bg-cyan-950/40 text-cyan-400 border border-cyan-500/20 px-1.5 py-0.2 rounded">
                                    #{id}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedLayerIds(tpl.stack);
                                setCustomVariables(prev => ({ ...prev, ...tpl.vars }));
                                showToast(`Applied "${tpl.title}" schema successfully!`);
                              }}
                              className="px-4 py-2 bg-[#09153a] hover:bg-cyan-500 hover:text-black border border-cyan-500/20 rounded-xl text-cyan-300 text-[10px] font-mono tracking-widest uppercase font-black cursor-pointer transition-all shrink-0 w-full md:w-auto text-center"
                            >
                              Activate spec
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Discord Alliance */}
                  {activeFooterLink === "Discord Alliance" && (
                    <div className="space-y-4 flex flex-col h-full max-h-[50vh]">
                      <div className="bg-indigo-950/10 border border-indigo-500/10 p-3 rounded-xl flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                          <div className="text-[11px] text-slate-205">
                            You are connected as <strong>reeflose88</strong> to channel <code>#reefstack-developers</code>.
                          </div>
                        </div>
                        <span className="text-[9px] bg-slate-900 border border-slate-800 p-1 px-1.5 rounded font-mono text-slate-400">4,812 Online</span>
                      </div>

                      {/* Messages scroll list */}
                      <div className="flex-1 bg-black/40 border border-[#0d1633] rounded-2xl p-4 overflow-y-auto space-y-3.5 min-h-[220px]">
                        {discordLogs.map((msg, i) => (
                          <div key={i} className="text-xs flex items-start gap-2.5 group">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-800 text-white font-mono font-black text-[10px] flex items-center justify-center shrink-0 uppercase">
                              {msg.user[0]}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-baseline gap-2">
                                <span className={`font-black text-[11px] ${msg.user === 'reeflose88' ? 'text-indigo-300' : 'text-cyan-300'}`}>{msg.user}</span>
                                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-slate-900 border border-slate-800 rounded text-slate-500">{msg.role}</span>
                                <span className="text-[8.5px] text-slate-500 font-mono">{msg.time}</span>
                              </div>
                              <p className="text-slate-305 leading-normal mt-1 bg-[#020512]/60 p-2 rounded border border-[#0d1633]/30 whitespace-pre-wrap">{msg.msg}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Form input bar */}
                      <form onSubmit={handleSendDiscordMsg} className="flex gap-2 shrink-0">
                        <input
                          type="text"
                          value={discordInput}
                          onChange={(e) => setDiscordInput(e.target.value)}
                          placeholder="Type message block... Ask bots or discuss system variables here."
                          className="flex-1 bg-[#020512] border border-[#14234c] text-xs font-mono text-cyan-300 p-3 rounded-xl focus:border-cyan-500 focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="px-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-505 hover:to-purple-505 text-slate-100 hover:text-white text-xs font-mono font-black uppercase rounded-xl border border-indigo-505/10 flex items-center justify-center cursor-pointer transition-all gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Send</span>
                        </button>
                      </form>
                    </div>
                  )}

                  {/* TAB 4: Active Support */}
                  {activeFooterLink === "Active Support" && (
                    <div className="space-y-4">
                      <div className="bg-indigo-950/15 border border-indigo-500/25 p-4 rounded-xl">
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">🩺 Continuous Diagnostic Priority Tickets Queue</h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed font-sans">
                          Got stuck deploying database row policies, CORS variables list, or iOS builds? Log your query below. Our automated diagnostic bot parses keywords to supply instant corrective code blueprints.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Ticket logger Form */}
                        <form onSubmit={handleAddSupportTicket} className="md:col-span-1 p-4 bg-[#020512] border border-[#0d1633] rounded-2xl space-y-3.5">
                          <span className="text-[9px] font-mono font-black text-cyan-400 block tracking-widest uppercase">CREATE DIAGNOSTIC TICKET</span>
                          
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-slate-400 block uppercase font-bold">CONCURRENT ISSUE TITLE</label>
                            <input
                              type="text"
                              required
                              value={newTicketTitle}
                              onChange={(e) => setNewTicketTitle(e.target.value)}
                              placeholder="e.g. database schema mismatch"
                              className="w-full bg-[#030615] border border-[#14234c] text-xs font-mono text-cyan-300 p-2 rounded focus:border-cyan-500 focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-slate-400 block uppercase font-bold font-bold">Severity Level</label>
                            <select
                              value={newTicketPriority}
                              onChange={(e) => setNewTicketPriority(e.target.value)}
                              className="w-full bg-[#030615] border border-[#14234c] text-xs font-mono text-cyan-300 p-2 rounded focus:border-cyan-500 focus:outline-none"
                            >
                              <option value="Low">Low - System guidance</option>
                              <option value="Medium">Medium - Variables debug</option>
                              <option value="High">High - Applet deployment crash</option>
                              <option value="Mission-Critical">Mission-Critical - Production blocker</option>
                            </select>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-550 hover:to-blue-620 text-white font-mono font-black text-[10px] tracking-widest uppercase rounded-xl border border-cyan-500/10 cursor-pointer mt-2 transition-all block text-center"
                          >
                            Submit support log
                          </button>
                        </form>

                        {/* Ticket list visualizer */}
                        <div className="md:col-span-2 space-y-3.5 text-left">
                          <span className="text-[9px] font-mono font-black text-indigo-400 block tracking-widest uppercase">ACTIVE SUPPORT PIPELINE ({supportTicks.length} TICKETS)</span>
                          
                          <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1">
                            {supportTicks.map((t) => (
                              <div key={t.id} className="p-3.5 bg-black/40 border border-[#0d1633] rounded-2xl text-left space-y-2">
                                <div className="flex items-start justify-between gap-2 flex-wrap sm:flex-nowrap">
                                  <div>
                                    <div className="text-xs font-bold text-white uppercase tracking-normal">
                                      #{t.id}: {t.title}
                                    </div>
                                    <div className="flex items-center gap-3 mt-1.5 text-[9px] text-slate-400 font-sans">
                                      <span className="font-mono font-bold">Severity: <span className="text-amber-400">{t.priority}</span></span>
                                      <span>•</span>
                                      <span>Opened: {t.timestamp}</span>
                                    </div>
                                  </div>
                                  <span className={`text-[8.5px] font-mono font-black px-2 py-0.5 rounded-full border ${
                                    t.status.includes("RESOLVED") 
                                      ? 'bg-emerald-950/30 text-emerald-400 border-emerald-500/20' 
                                      : 'bg-indigo-950/30 text-indigo-300 border-indigo-500/20 animate-pulse'
                                  }`}>
                                    {t.status}
                                  </span>
                                </div>
                                {t.answer && (
                                  <div className="p-2.5 bg-cyan-950/15 border border-cyan-500/10 rounded-xl text-[10.5px] text-cyan-300 leading-normal whitespace-pre-wrap font-sans">
                                    <strong className="text-indigo-350 block text-[9.5px] font-mono uppercase tracking-wider mb-1">🤖 PRIORITY ASSISTANT ANSWER RESOLUTION:</strong>
                                    {t.answer}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: 2026 Roadmap */}
                  {activeFooterLink === "2026 Roadmap" && (
                    <div className="space-y-4">
                      <div className="bg-indigo-950/15 border border-indigo-500/25 p-4 rounded-xl">
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-sans">🗺️ Standard 2026 Engine Feature Roadmap Timelines</h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          We are continuously extending standard compilation pipelines for ReefStack Pro+. Vote for your preferred upcoming integrations. Upvote states are managed instantly.
                        </p>
                      </div>

                      <div className="space-y-3">
                        {Object.entries(roadmapVotesState).map(([featName, votesCount]) => (
                          <div 
                            key={featName}
                            className="p-3.5 bg-[#020512] border border-[#0d1633] hover:border-slate-850 rounded-2xl flex items-center justify-between gap-4 transition-all"
                          >
                            <div className="text-xs font-bold text-slate-100 flex items-center gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                              <span className="font-sans font-bold">{featName}</span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-xs font-mono font-black text-cyan-300 bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-500/10 min-w-[55px] text-center">
                                {votesCount} 👍
                              </span>
                              <button
                                onClick={() => {
                                  setRoadmapVotesState(prev => ({ ...prev, [featName]: prev[featName] + 1 }));
                                  showToast(`Upvoted feature: "${featName}"!`);
                                }}
                                className="px-3 py-1 bg-gradient-to-r from-cyan-600 to-indigo-700 hover:from-cyan-500 hover:to-indigo-600 text-white font-mono font-black text-[9.5px] tracking-wider uppercase rounded-lg border border-cyan-500/10 cursor-pointer transition-all"
                              >
                                UPVOTE
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 6: Engine Updates */}
                  {activeFooterLink === "Engine Updates" && (
                    <div className="space-y-4">
                      <div className="bg-indigo-950/15 border border-indigo-500/25 p-4 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <div>
                          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-sans">📡 Self-Diagnostics & Integrity Auditor Compiler</h4>
                          <p className="text-[11px] text-slate-400 mt-1 leading-normal max-w-xl">
                            Compile of environmental state variables and selected layers configuration triggers real-time static checks inside the browser box runtime.
                          </p>
                        </div>
                        <button
                          onClick={handleRunDiagnostics}
                          disabled={isUptimeRunning}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:from-slate-800 disabled:to-slate-850 text-slate-100 hover:text-white disabled:text-slate-500 text-xs font-mono font-black uppercase rounded-xl border border-emerald-500/15 cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                        >
                          {isUptimeRunning ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 text-white animate-spin" />
                              <span>Scanning Tiers...</span>
                            </>
                          ) : (
                            <>
                              <Activity className="w-3.5 h-3.5 text-emerald-200" />
                              <span>Run static diagnostics</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Diagnostic console output log box */}
                      <div className="p-4 bg-slate-950 border border-[#0d1633] rounded-2xl text-left space-y-1.5 font-mono text-[10.5px] text-slate-350 min-h-[220px]">
                        <div className="text-[9.5px] text-slate-550 border-b border-slate-900 pb-2 mb-2 uppercase tracking-widest flex items-center justify-between">
                          <span>SYSTEM SHIELD COMPILER VERSION v2.5.1-STABLE</span>
                          <span>ONLINE STATUS: ACTIVE</span>
                        </div>
                        {uptimeTestLogs.length === 0 ? (
                          <div className="text-slate-500 italic pb-2">
                            Ready to compile sandbox static code diagnostics. Click "Run static diagnostics" button above to scan active stack configurations.
                          </div>
                        ) : (
                          uptimeTestLogs.map((log, index) => {
                            let logColor = "text-slate-300";
                            if (log.includes("SUCCESS")) logColor = "text-emerald-400 font-bold";
                            if (log.includes("SYSTEM")) logColor = "text-cyan-400";
                            if (log.includes("DIAGNOSTIC") || log.includes("warning")) logColor = "text-amber-400";
                            return (
                              <div key={index} className={`${logColor} py-0.5 leading-relaxed border-l-2 border-slate-800 pl-3.5`}>
                                {log}
                              </div>
                            );
                          })
                        )}
                        {isUptimeRunning && (
                          <div className="text-cyan-400 animate-pulse text-[9.5px] font-bold border-l-2 border-cyan-800 pl-3.5">
                            ▋ Analyzing segment modules and state integrity variables list...
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* INTERACTIVE BUILDER GUIDE AI CHATBOT HELPER */}
      {/* ========================================================= */}
      
      {/* Floating Sparkles Bot Trigger Button with Pulse Ring */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Helper text bubble on first load */}
        <AnimatePresence>
          {!isChatbotOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              transition={{ delay: 1 }}
              className={`p-2.5 px-3.5 rounded-xl text-xs font-bold shadow-lg pointer-events-auto flex items-center gap-2 select-none border whitespace-nowrap cursor-pointer transition-all ${
                theme === 'dark' 
                  ? 'bg-slate-900/90 border-[#142347] text-cyan-300' 
                  : 'bg-white border-slate-200 text-slate-850 shadow-slate-200/50'
              }`}
              onClick={() => setIsChatbotOpen(true)}
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-450 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Need help building? Click my AI guide! Assistant active.</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className={`pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(6,182,212,0.3)] cursor-pointer relative transition-all border ${
            isChatbotOpen 
              ? 'bg-rose-650 border-rose-450 text-white shadow-rose-500/20 shadow-lg' 
              : 'bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 border-cyan-400/30 text-white'
          }`}
          title="Interactive Builder Guides Assistant Chatbot"
        >
          {isChatbotOpen ? (
            <span className="text-xl font-black font-sans">✕</span>
          ) : (
            <div className="relative">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
            </div>
          )}
        </motion.button>
      </div>

      {/* Floating Chatbot Widget Window */}
      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 25 }}
            className={`fixed bottom-24 right-6 w-[420px] max-w-[calc(100vw-32px)] h-[620px] shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden border transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-[#040816]/95 backdrop-blur-md border-[#142347] text-slate-100 shadow-indigo-950/20' 
                : 'bg-white/95 backdrop-blur-md border-slate-205 text-slate-800 shadow-slate-350/50'
            }`}
          >
            {/* Header section with live indicator & reset buttons */}
            <div className="px-4 py-3 bg-gradient-to-r from-[#030615] to-[#121c3b] flex items-center justify-between border-b border-[#142347]/60">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                  chatbotPersonality === 'wizard' ? 'bg-indigo-500/10 border-indigo-400/25 text-indigo-400' :
                  chatbotPersonality === 'devops' ? 'bg-amber-500/10 border-amber-400/25 text-amber-400' :
                  chatbotPersonality === 'monetization' ? 'bg-emerald-500/10 border-emerald-400/25 text-emerald-400' :
                  'bg-fuchsia-500/10 border-fuchsia-400/25 text-fuchsia-400'
                }`}>
                  <Bot className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div className="text-left">
                  <h4 className="text-[11.5px] font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    ReefStack AI Guide
                    <span className={`text-[8.5px] px-1.5 py-0.2 rounded-md font-mono border font-extrabold uppercase ${
                      chatbotPersonality === 'wizard' ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' :
                      chatbotPersonality === 'devops' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' :
                      chatbotPersonality === 'monetization' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' :
                      'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20'
                    }`}>
                      {chatbotPersonality}
                    </span>
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-pulse" />
                    <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-wider">Expert Advisor Active</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setChatbotMessages([
                      {
                        role: 'assistant',
                        content: `Chat history reset. Hello Master Builder! 👋 I am your ReefStack Pro+ AI Assistant. Switch between our specialized counselor personas below to test or configure configurations!`
                      }
                    ]);
                    showToast("Conversation cleared successfully!");
                  }}
                  title="Reset conversation logs"
                  className="text-slate-400 hover:text-rose-400 p-1 hover:bg-slate-800/40 rounded transition-colors cursor-pointer"
                >
                  <Trash className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setIsChatbotOpen(false)}
                  className="text-slate-400 hover:text-white text-md font-sans p-1 hover:bg-slate-800/40 rounded transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Dynamic Counselor Specialty Swapper Tabs */}
            <div className={`p-1 flex border-b gap-1 ${
              theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              {[
                { id: 'wizard', label: '🧙‍♂️ Full-Stack', color: 'text-indigo-400 hover:bg-indigo-500/5' },
                { id: 'devops', label: '🚀 DevOps', color: 'text-amber-400 hover:bg-amber-500/5' },
                { id: 'monetization', label: '💰 Stripe API', color: 'text-emerald-400 hover:bg-emerald-500/5' },
                { id: 'security', label: '🔐 Security', color: 'text-fuchsia-400 hover:bg-fuchsia-500/5' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setChatbotPersonality(tab.id as any);
                    let welcome = "";
                    if (tab.id === 'wizard') welcome = "🧙‍♂️ **Full-Stack Wizard** is now guiding! I cover React, hooks, state, animations, and clean boilerplate composition. Let's build!";
                    if (tab.id === 'devops') welcome = "🚀 **DevOps Deployment Engineer** on-deck! Ask about standard Cloud Run configurations, target port 3000 binds, repository syncing, and terminal pipelines.";
                    if (tab.id === 'monetization') welcome = "💰 **Monetization Architect** has taken focus. Ask about secure Stripe API checkout gates, pricing databases, and profiles integrations.";
                    if (tab.id === 'security') welcome = "🔐 **Security Auditor Mode** initiated. I inspect authentication token cookies, same-site parameters, row level table control, and CORS protection.";
                    
                    setChatbotMessages(prev => [
                      ...prev,
                      { role: 'assistant', content: welcome }
                    ]);
                    showToast(`Invoked AI Advisor: ${tab.id.toUpperCase()}`);
                  }}
                  className={`flex-1 py-1 rounded text-[10px] font-bold uppercase transition-all duration-200 cursor-pointer ${
                    chatbotPersonality === tab.id 
                      ? (theme === 'dark' ? 'bg-slate-800 text-cyan-400 shadow-sm border border-slate-700/50' : 'bg-white text-blue-600 shadow-sm border border-slate-200')
                      : `text-slate-400 hover:text-slate-200`
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mini Blueprint Status Monitor Panel */}
            <div className={`p-2 border-b flex items-center justify-between text-[10px] ${
              theme === 'dark' ? 'bg-[#060b1e]/60 border-slate-800' : 'bg-slate-50 border-slate-150'
            }`}>
              <div className="flex items-center gap-1.5 text-left font-mono">
                <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}>Complexity:</span>
                <span className={`font-black uppercase text-[10px] ${
                  selectedLayerIds.length > 8 ? 'text-purple-400' : selectedLayerIds.length > 5 ? 'text-cyan-400' : 'text-emerald-400'
                }`}>
                  {selectedLayerIds.length > 8 ? 'Pro Stack' : selectedLayerIds.length > 5 ? 'Balanced' : 'Lightweight'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedLayerIds.length > 0 ? 'bg-cyan-400' : 'bg-rose-400'}`} />
                  <span className="font-mono text-[9px]">{selectedLayerIds.length}/10 Layers</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedLayerIds.includes(6) ? 'bg-emerald-450' : 'bg-amber-400 animate-pulse'}`} />
                  <span className="font-mono text-[9px] uppercase font-bold">
                    {selectedLayerIds.includes(6) ? '🔐 Protected' : '⚠️ No Auth Gate'}
                  </span>
                </div>
              </div>
            </div>

            {/* 1-Click Interactive Direct Blueprint System Actions */}
            <div className={`p-2 border-b text-left ${
              theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50/50 border-slate-150'
            }`}>
              <span className={`text-[8.5px] font-black font-mono tracking-wider block mb-1 uppercase ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                ⚡ 1-CLICK DYNAMIC SYSTEM BLUEPRINT MODIFIERS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => {
                    setSelectedLayerIds(prev => {
                      const list = [...prev];
                      if (!list.includes(9)) list.push(9);
                      if (!list.includes(10)) list.push(10);
                      return list;
                    });
                    setActiveStepNum(5);
                    const systemMsg = "System automated Action applied! Added DevOps layers: **Layer 10 (CI/CD)** and **Layer 9 (Uptime Monitor)**. Step guide focus updated to **Step 5 (Production Deployment Pipelines)**.";
                    setChatbotMessages(prev => [...prev, { role: 'assistant', content: systemMsg }]);
                    showToast("⚡ DevOps Blueprint Stack Enabled!");
                  }}
                  className={`p-1 px-2 text-[9px] font-extrabold uppercase rounded border cursor-pointer transition-all ${
                    theme === 'dark' 
                      ? 'bg-amber-950/20 border-amber-500/30 text-amber-350 hover:bg-amber-900/30' 
                      : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  ⚡ Direct DevOps Deploy
                </button>
                <button
                  onClick={() => {
                    setSelectedLayerIds(prev => {
                      const list = [...prev];
                      if (!list.includes(3)) list.push(3);
                      if (!list.includes(7)) list.push(7);
                      return list;
                    });
                    setActiveStepNum(3);
                    const systemMsg = "Action executed! Mounted **Layer 7 (Payments Gateway)** and **Layer 3 (Database Profiles)**. Checkout parameters auto-generated and matched.";
                    setChatbotMessages(prev => [...prev, { role: 'assistant', content: systemMsg }]);
                    showToast("💳 Stripe Monetization Stack Enabled!");
                  }}
                  className={`p-1 px-2 text-[9px] font-extrabold uppercase rounded border cursor-pointer transition-all ${
                    theme === 'dark' 
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/30' 
                      : 'bg-emerald-50 border-emerald-200 text-emerald-750 hover:bg-emerald-100'
                  }`}
                >
                  💳 SaaS Checkout Gateway
                </button>
                <button
                  onClick={() => {
                    handleRunDiagnostics();
                    const systemMsg = "Integrity scan sequence dispatch initiated. Please review live system output logs inside the system diagnostic board console tray below!";
                    setChatbotMessages(prev => [...prev, { role: 'assistant', content: systemMsg }]);
                    showToast("📡 Terminal Diagnostics triggered.");
                  }}
                  className={`p-1 px-2 text-[9px] font-extrabold uppercase rounded border cursor-pointer transition-all ${
                    theme === 'dark' 
                      ? 'bg-cyan-950/20 border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/30' 
                      : 'bg-cyan-50 border-cyan-200 text-cyan-700 hover:bg-cyan-100'
                  }`}
                >
                  🔍 Run System Diagnostics
                </button>
              </div>
            </div>

            {/* Chat screen messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-left custom-scrollbar bg-slate-950/5 text-xs">
              {chatbotMessages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role !== 'user' && (
                    <div className="w-6.5 h-6.5 rounded-md bg-indigo-505/15 flex items-center justify-center shrink-0 text-indigo-400 border border-indigo-500/20">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl max-w-[85%] whitespace-pre-wrap leading-relaxed shadow-sm text-[11px] ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : (theme === 'dark' 
                          ? 'bg-[#0f172a] text-slate-200 border border-slate-800 rounded-bl-none' 
                          : 'bg-slate-100/90 text-slate-800 rounded-bl-none border border-slate-200')
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Tutorial Preset Launchers Launcher Tray */}
            <div className={`p-2.5 border-t text-left ${theme === 'dark' ? 'bg-slate-900/35 border-slate-800' : 'bg-slate-50 border-slate-150'}`}>
              <span className={`text-[8.5px] font-black font-mono tracking-wider block mb-1.5 uppercase ${theme === 'dark' ? 'text-slate-400' : 'text-slate-550'}`}>
                🗺️ LEARNING PRESSETS & SCHEMAS ({chatbotPersonality.toUpperCase()} MOTIVES):
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { text: '🚀 Cloud Run Port rules', q: 'deploy cloud run' },
                  { text: '💳 Stripe Setup Webhooks', q: 'stripe payments' },
                  { text: '💾 postgres relational tools', q: 'postgres database' },
                  { text: '🧠 AI high density vectors', q: 'ai gemini vector' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const userQuery = item.text;
                      const botAnswer = getCustomPersonalityResponse(item.q, chatbotPersonality);
                      setChatbotMessages(prev => [
                        ...prev, 
                        { role: 'user', content: userQuery },
                        { role: 'assistant', content: botAnswer }
                      ]);
                      showToast(`Tutorial preset verified: ${userQuery}`);
                    }}
                    className={`p-2 rounded-lg text-[9.5px] font-bold text-left border flex items-center justify-between transition-all hover:scale-[1.01] cursor-pointer ${
                      theme === 'dark' 
                        ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-cyan-350 hover:border-cyan-500/30' 
                        : 'bg-white border-slate-205 text-slate-705 hover:text-blue-600 hover:border-blue-300 shadow-sm'
                    }`}
                  >
                    <span>{item.text}</span>
                    <span className="text-[10px] text-cyan-400">➔</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat User Input Area */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (!chatbotInput.trim()) return;
                const txt = chatbotInput;
                setChatbotInput('');
                const responseText = getCustomPersonalityResponse(txt, chatbotPersonality);
                setChatbotMessages(prev => [
                  ...prev,
                  { role: 'user', content: txt },
                  { role: 'assistant', content: responseText }
                ]);
              }}
              className={`p-3 border-t flex items-center gap-2 ${
                theme === 'dark' ? 'bg-[#030615] border-[#142347]' : 'bg-white border-slate-150'
              }`}
            >
              <input
                type="text"
                value={chatbotInput}
                onChange={(e) => setChatbotInput(e.target.value)}
                placeholder={`Ask our ${chatbotPersonality} counselor how to build...`}
                className={`flex-1 rounded-lg px-3 py-2 text-[11px] focus:outline-none focus:ring-1 ${
                  theme === 'dark' 
                    ? 'bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500' 
                    : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10.5px] font-bold uppercase transition-transform active:scale-95 cursor-pointer"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
