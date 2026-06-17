/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as d3 from 'd3';
import { 
  Laptop, 
  Smartphone, 
  Gamepad2, 
  Bot, 
  Layers, 
  Database, 
  Wrench, 
  GraduationCap, 
  MoreHorizontal, 
  Check, 
  Menu, 
  BookOpen, 
  Layers3, 
  Users, 
  LifeBuoy, 
  Compass, 
  RefreshCw, 
  Terminal, 
  Copy, 
  Download, 
  Sliders, 
  Send, 
  ShieldAlert, 
  AlertCircle,
  HelpCircle,
  CheckCircle,
  Cpu, 
  GitMerge, 
  ArrowRight, 
  Code2, 
  Lock, 
  TrendingUp, 
  Mail,
  LockKeyhole,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap,
  Flame,
  UserCheck,
  PlayCircle,
  X,
  Dribbble,
  LogOut,
  Moon,
  Sun,
  Activity,
  Boxes
} from 'lucide-react';

interface TechCard {
  number: string;
  category: string;
  title: string;
  techBadge: string;
  bullet1: string;
  bullet2: string;
  bullet3: string;
  bullet4: string;
  bullet5: string;
  bullet6: string;
  footerText: string;
  colorClass: string; // Tailwind accent border/glow class
  glowColor: string; // color name for shadow/gradient
  bulletsHex: string;
  iconName: React.ComponentType<{ className?: string }>;
  techLogo?: string;
  subTechBadge?: string;
  subTechText?: string;
  badgeRow?: string[];
}

export default function App() {
  const [activeCardNum, setActiveCardNum] = useState<string>('1');
  const [selectedLayers, setSelectedLayers] = useState<string[]>(['1', '2', '3', '5', '6', '7', '8', '10']);
  
  // Modeler/Sandbox pricing simulator states
  const [expectedMau, setExpectedMau] = useState<number>(50000);
  const [scaleOptimization, setScaleOptimization] = useState<boolean>(true);
  const [edgeCachingEnabled, setEdgeCachingEnabled] = useState<boolean>(true);

  // Connection pathway states
  const [activeNodeId, setActiveNodeId] = useState<string>('supabase');

  // Interactive AI Assistant states
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [chatbotInput, setChatbotInput] = useState<string>('');
  const [chatbotPersonality, setChatbotPersonality] = useState<'wizard' | 'devops' | 'monetization' | 'security'>('wizard');
  const [chatbotMessages, setChatbotMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    {
      role: 'assistant',
      content: "Welcome, ReefStack Architect! 🐠 I can assist you with your full-stack deployment, setting up Stripe webhooks, postgres RLS, or generating custom Dockerfiles. What are we building today?"
    }
  ]);

  // Priority Support state entries
  const [supportTicks, setSupportTicks] = useState<Array<{ id: number, title: string, priority: string, status: string, answer?: string }>>([
    { id: 1042, title: "Database RLS validation fails in iframe environment", priority: "HIGH", status: "RESOLVED WITH RECOMMENDATION", answer: "SameSite=None; Secure; must be applied on session cookies when testing behind iframe containers. Alternatively, disable safari cross-site tracing limits." }
  ]);
  const [newTicketTitle, setNewTicketTitle] = useState<string>('');
  const [newTicketPriority, setNewTicketPriority] = useState<string>('MEDIUM');
  
  // Custom environment tags states
  const [customRepo, setCustomRepo] = useState<string>('reeflose88/reefstack-blueprint');
  const [customBranch, setCustomBranch] = useState<string>('main');
  const [customPatToken, setCustomPatToken] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Toast notification alert setup
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false });
  const showToast = (msg: string) => {
    setToast({ message: msg, show: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3500);
  };

  // Pricing Modal state
  const [activePricingModal, setActivePricingModal] = useState<'starter' | 'pro' | 'enterprise' | null>(null);

  // Esc key closure support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePricingModal(null);
      }
    };
    if (activePricingModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePricingModal]);

  // Focus trapping support inside modal container
  const modalRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (activePricingModal && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        // Focus close button or primary active element
        (focusableElements[0] as HTMLElement).focus();
        
        const handleTab = (e: KeyboardEvent) => {
          if (e.key !== 'Tab') return;
          const firstEl = focusableElements[0] as HTMLElement;
          const lastEl = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstEl) {
              lastEl.focus();
              e.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === lastEl) {
              firstEl.focus();
              e.preventDefault();
            }
          }
        };
        
        window.addEventListener('keydown', handleTab);
        return () => window.removeEventListener('keydown', handleTab);
      }
    }
  }, [activePricingModal]);

  // Monthly cost calculator logic based on active layers and scale inputs
  const calculateMonthlyCost = () => {
    if (!selectedLayers || selectedLayers.length === 0) {
      return 0;
    }
    const safeLayersCount = Array.isArray(selectedLayers) ? selectedLayers.length : 0;
    let base = 25.00;
    // Layer modifiers
    base += safeLayersCount * 9.50;
    // Scale modifier multiplier
    const safeMau = typeof expectedMau === 'number' && !isNaN(expectedMau) && isFinite(expectedMau) ? Math.max(0, expectedMau) : 0;
    const scaledFactor = (safeMau / 10000) * 4.25;
    let total = base + scaledFactor;
    
    if (scaleOptimization) total *= 0.58; // 42% discount
    if (edgeCachingEnabled) total *= 0.82; // 18% CDN caching discount
    
    const finalCost = Math.max(9.00, total);
    return isNaN(finalCost) || !isFinite(finalCost) ? 0 : finalCost;
  };

  // Handle AI assist direct queries
  const handleSendChat = (textInput: string = chatbotInput) => {
    const text = textInput.trim();
    if (!text) return;

    const newMsgs = [...chatbotMessages, { role: 'user' as const, content: text }];
    setChatbotMessages(newMsgs);
    setChatbotInput('');

    // Custom chatbot personality answers
    setTimeout(() => {
      let reply = "I've analyzed your system setup. Your combined ReefStack architecture is robust and production-grade.";
      const query = text.toLowerCase();

      if (chatbotPersonality === 'devops') {
        if (query.includes('deploy') || query.includes('vercel') || query.includes('host') || query.includes('cloud')) {
          reply = "🚀 **DevOps Deployment Routing Protocol Active:**\n1. Next.js / Static UI assets route directly through Vercel's global edge network.\n2. Container layers utilize Google Cloud Run bound strictly to Host `0.0.0.0` on standard Port `3000` behind the secure nginx reverse-proxy tunnel.\n3. Make sure to commit environment variables in `.env.example` in your synchronized GitHub repository.";
        } else {
          reply = "🔧 **DevOps System Agent report:** Connections across all 10 layers are verified. Webhooks map successfully. Run 'Self-Diagnostics' below to trigger live health checks.";
        }
      } else if (chatbotPersonality === 'monetization') {
        if (query.includes('stripe') || query.includes('pay') || query.includes('subscription')) {
          reply = "💸 **Stripe Monetization Routing Gateway:**\n1. Subscriptions check out on secure server-side API endpoints (`/api/checkout-session`) to shield secret tokens.\n2. Database profile synchronization triggers instantly from Webhook callbacks. Always load Stripe SDK instances lazily inside handlers to bypass early cloud startup constraints.";
        } else {
          reply = "💰 **Monetization Advice:** Map digital pricing IDs to corresponding Postgres DB role groups. Enable Layer 7 (Payments) + Layer 3 (Database) for automated updates.";
        }
      } else if (chatbotPersonality === 'security') {
        if (query.includes('auth') || query.includes('secure') || query.includes('jwt') || query.includes('rls')) {
          reply = "🔐 **Security Audit Recommendations:**\n1. Enforce strict Row-Level Security on critical tables: `ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;`.\n2. Ensure SameSite=None + cookies tags are written on authentication gateways when embedded inside preview containers. Protect endpoints using JWT verification handshakes.";
        } else {
          reply = "🛡️ **Security Sandbox active:** Inspecting CORS allowances, cookie paths, and database tokens security. All systems are locked and compliant.";
        }
      } else {
        // Wizard default response
        if (query.includes('stripe') || query.includes('pay')) {
          reply = "⚡ Stripe billing interfaces connect natively with Supabase tables. Go to Layer 7 to view instructions, edit notes, or test billing state payloads.";
        } else if (query.includes('deploy') || query.includes('github') || query.includes('sync')) {
          reply = "⚡ Type your PAT token under 'GitHub Pipeline Configuration' to launch automated CI/CD builds instantly on each git push.";
        } else if (query.includes('supabase') || query.includes('db')) {
          reply = "⚡ Supabase is fully configured with PostgreSQL. You can use Drizzle migrations for local development, and manage row security securely inside the UI.";
        } else {
          reply = "🧙‍♂️ **Full-Stack Wizard protocol activated!** What specific features can I scaffold for your web application, native game, or automated background services today?";
        }
      }

      setChatbotMessages(prev => [...prev, { role: 'assistant' as const, content: reply }]);
      showToast("AI Assistant responded!");
    }, 1000);
  };

  const handleApplyPreset = (mau: number, layers: string[], desc: string) => {
    setExpectedMau(mau);
    setSelectedLayers(layers);
    showToast(`Applied preset! ${desc}`);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketTitle.trim()) return;

    const newId = Math.floor(Math.random() * 9000) + 1000;
    const ticketObj = {
      id: newId,
      title: newTicketTitle,
      priority: newTicketPriority,
      status: "PENDING AI ANALYSIS"
    };

    setSupportTicks(prev => [ticketObj, ...prev]);
    setNewTicketTitle('');
    showToast(`Ticket #${newId} submitted to priority triage!`);

    // Bot response simulator
    setTimeout(() => {
      let advice = "Database/Layer sync is healthy. Ensure environment variables conform to .env.example specifications.";
      const titleLower = ticketObj.title.toLowerCase();
      if (titleLower.includes("stripe") || titleLower.includes("checkout")) {
        advice = "Stripe payments require a secure Server Route. Ensure STRIPE_SECRET_KEY is configured in your platform settings and you check out on port 3000.";
      } else if (titleLower.includes("git") || titleLower.includes("token") || titleLower.includes("sync")) {
        advice = "GitHub validation error. Validate your PAT scopes include 'repo' and the repo name format is strictly 'owner/repo-name'.";
      }

      setSupportTicks(prev => prev.map(t => t.id === newId ? { ...t, status: "AUTOMATED ACTION GENERATED", answer: advice } : t));
      showToast("AI support expert generated a response!");
    }, 1800);
  };

  // Sync state script simulator 
  const handleForceSync = () => {
    if (!customRepo.includes('/')) {
      showToast("Error: GitHub Rep name must follow owner/repo format!");
      return;
    }
    setIsSyncing(true);
    showToast("Opening secure connection to GitHub endpoint...");
    setTimeout(() => {
      setIsSyncing(false);
      showToast("Architecture specs parsed, README generated & synchronized to repository successfully!");
    }, 2000);
  };

  // Detailed specifications, code snippets, database schemas, and documentation notes per Layer
  const layerSpecifications: Record<string, {
    technologyDetailed: string,
    environmentKeys: string[],
    snippet: string,
    databaseSetup?: string,
    engineeringNotes: string
  }> = {
    '1': {
      technologyDetailed: "NEXT.JS 15 (APP ROUTER) & REACT 19 (STABLE)",
      environmentKeys: ["NEXT_PUBLIC_API_URL", "NEXT_PUBLIC_APP_PORT=3000"],
      engineeringNotes: "Employs Server-Side Rendering (SSR) for static content, paired with Incremental Static Regeneration (ISR) to dynamic caches. Streaming HTML segments bypass early load latencies easily.",
      snippet: `// app/dashboard/page.tsx
import { Suspense } from 'react';
import { fetchSystemMetrics } from '@/lib/db';

export const metadata = {
  title: 'Next.js Scalable Portal',
  description: 'Powered by ReefStack Pro+'
};

export default async function DashboardPage() {
  return (
    <div className="p-8 bg-[#070b14] min-h-screen text-slate-100">
      <h1 className="text-2xl font-bold tracking-tight">Active Core Metrics</h1>
      <Suspense fallback={<div className="h-40 animate-pulse bg-slate-800 rounded-xl" />}>
        <AsyncMetricsGrid />
      </Suspense>
    </div>
  );
}

async function AsyncMetricsGrid() {
  const metrics = await fetchSystemMetrics();
  return (
    <div className="grid grid-cols-3 gap-6 mt-6">
      {metrics.map(m => (
        <div key={m.id} className="p-4 rounded-xl border border-cyan-500/20 bg-slate-900/40">
          <p className="text-xs text-slate-400">{m.label}</p>
          <p className="text-xl font-bold text-cyan-400 mt-2">{m.value}</p>
        </div>
      ))}
    </div>
  );
}`
    },
    '2': {
      technologyDetailed: "EXPO SDK 51 & REACT NATIVE (NATIVE PACKAGING)",
      environmentKeys: ["EXPO_PUBLIC_SUPABASE_URL", "EXPO_PUBLIC_SUPABASE_ANON_KEY"],
      engineeringNotes: "Generates high performance native binary frames under a single consolidated codebase. Supports instant OTA hot patches bypass app store pipelines entirely.",
      snippet: `// App.tsx
import React from 'react';
import { View, Text, StatusBar, SafeAreaView } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#070b14' }}>
      <ExpoStatusBar style="light" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: '#22c55e', fontSize: 24, fontWeight: '900' }}>
          REEFSTACK NATIVE
        </Text>
        <Text style={{ color: '#94a3b8', fontSize: 12, marginTop: 8, textAlign: 'center' }}>
          Consolidated smartphone packaging compiled using Expo EAS.
        </Text>
      </View>
    </SafeAreaView>
  );
}`
    },
    '3': {
      technologyDetailed: "SUPABASE POSTGRESQL & DRIZZLE ORM INTEGRATOR",
      environmentKeys: ["DATABASE_URL=postgresql://postgres:[password]@db.supabase.co:5432/postgres", "SUPABASE_SERVICE_ROLE"],
      databaseSetup: `-- Define centralized user profile schemas
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  active_plan TEXT DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security strictly
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read solely their own profiles
CREATE POLICY "Users can query own profiles"
ON profiles FOR SELECT
USING (auth.uid() = id);`,
      engineeringNotes: "Core transactional Postgres instance database. Employs realtime tables triggers to stream mutations, and holds vector databases for AI similarity matches.",
      snippet: `// src/db/schema.ts
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),
  fullName: text('fullName').notNull(),
  activePlan: text('activePlan').default('free_tier'),
  createdAt: timestamp('createdAt').defaultNow().notNull()
});`
    },
    '4': {
      technologyDetailed: "GODOT ENGINE 4.3 (WEBGL2 & COMPOSITE EXPORTS)",
      environmentKeys: ["GODOT_GAME_API_GATEWAY", "GODOT_PLAYERS_SECURE_TOKEN"],
      engineeringNotes: "Lightweight robust game graphics orchestrator. Compiles to native apps or WebGL frames smoothly and interfaces with Supabase API hooks using JSON endpoints.",
      snippet: `extends Node2D

# Godot script to fetch highscores
var http_client: HTTPRequest

func _ready():
	http_client = HTTPRequest.new()
	add_child(http_client)
	http_client.request_completed.connect(self._on_scores_fetched)
	
	var url = "https://your-api-port-3000.run.app/api/scores"
	var headers = ["Content-Type: application/json"]
	http_client.request(url, headers, HTTPClient.METHOD_GET)

func _on_scores_fetched(result, response_code, headers, body):
	var json = JSON.new()
	json.parse(body.get_string_from_utf8())
	var response = json.get_data()
	print("Game highscores synced: ", response)`
    },
    '5': {
      technologyDetailed: "GEMINI AI & @GOOGLE/GENAI SDK CORE INTEGRATOR",
      environmentKeys: ["GEMINI_API_KEY", "OPENAI_API_REF_KEY"],
      engineeringNotes: "Invokes standard server-side reasoning. Supports function calling, maps grounding, real-time embeddings generation, and processes up to 2 million tokens context windows flawlessly.",
      snippet: `// server.ts (Safe Server-Side AI handler)
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

export function getAi(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    // Lazy initialize as mandated for safe app boot
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

// Router handler
app.post('/api/ai/architect', async (req, res) => {
  try {
    const ai = getAi();
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: req.body.prompt,
    });
    res.json({ response: response.text });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});`
    },
    '6': {
      technologyDetailed: "TAILWIND CSS V4, SHADCN COMPONENTS & FRAMER MOTION",
      environmentKeys: ["VITE_LAYOUT_FPS_CAP=60"],
      engineeringNotes: "Drives all beautiful browser viewport elements. Motion layouts and micro-interactions elevate interfaces without massive script parsing overheads.",
      snippet: `// src/components/GlowingCard.tsx
import React from 'react';
import { motion } from 'motion/react';

export function GlowingCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      className="p-6 rounded-2xl border border-pink-500/20 bg-[#070b14]/90 relative overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.08)]"
    >
      <div className="absolute inset-0 bg-radial-[at_50%_0%] from-pink-500/10 via-transparent to-transparent pointer-events-none" />
      <h4 className="text-sm font-bold tracking-widest text-pink-400 uppercase font-mono">{title}</h4>
      <div className="mt-4">{children}</div>
    </motion.div>
  );
}`
    },
    '7': {
      technologyDetailed: "STRIPE CHECKOUT API GATEWAY PARTNER",
      environmentKeys: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"],
      engineeringNotes: "Constructs highly resilient SaaS monetization channels. Handshakes webhook alerts securely to Postgres to keep user tier properties updated in real-time.",
      snippet: `// server/api/checkout.ts
import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY missing!");
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

app.post('/api/create-checkout', async (req, res) => {
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: 'price_1P_reef_premium', quantity: 1 }],
      mode: 'subscription',
      success_url: 'https://app-url.run.app/success',
      cancel_url: 'https://app-url.run.app/cancel',
    });
    res.json({ sessionUrl: session.url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});`
    },
    '8': {
      technologyDetailed: "VERCEL EDGE ORCHESTRATION & EXPO EAS BUILDS",
      environmentKeys: ["VERCEL_ORG_ID", "VERCEL_PROJECT_ID", "EAS_PROJECT_ID"],
      engineeringNotes: "Ensures atomic push-to-deploy sequences. Automatically coordinates staging URL generations on branch shifts and launches background mobile builds successfully.",
      snippet: `# .vercel/project.json
{
  "orgId": "team_reefstack_prod",
  "projectId": "proj_reef_dashboard",
  "framework": "nextjs"
}`
    },
    '9': {
      technologyDetailed: "POSTHOG METRICS ENGAGEMENT & SENTRY EXCEPTION HUNTER",
      environmentKeys: ["NEXT_PUBLIC_POSTHOG_KEY", "SENTRY_DSN"],
      engineeringNotes: "Monitors client viewport sessions, catches script crashes instantly, and correlates exceptions inside serverless routines back to code commits.",
      snippet: `// app/layout.tsx (Integrated Monitor Initialization)
'use client';
import { posthog } from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: 'https://app.posthog.com',
    capture_pageview: true,
  });
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <html>{children}</html>
    </PostHogProvider>
  );
}`
    },
    '10': {
      technologyDetailed: "SUPABASE AUTH GATEWAY WITH NATIVE MULTI-FACTOR (MFA)",
      environmentKeys: ["SUPABASE_JWT_SECRET", "NEXT_PUBLIC_SUPABASE_URL"],
      engineeringNotes: "Ensures state security at all boundaries. Governs email login codes, magic link handshakes, JWT session encodings, and row level verification guidelines.",
      snippet: `// lib/auth.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function signUpWithEmail(email: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: 'temporary-user-pass-123',
    options: {
      emailRedirectTo: 'https://reefstack-portal.run.app/welcome'
    }
  });
  return { data, error };
}`
    }
  };

  const activeSpec = layerSpecifications[activeCardNum] || layerSpecifications['1'];

  const techCardsData: TechCard[] = [
    {
      number: "1",
      category: "FRONTEND (WEB)",
      title: "Next.js / React / TS",
      techBadge: "NEXT.JS",
      bullet1: "App Router",
      bullet2: "Server Components",
      bullet3: "SEO Optimized",
      bullet4: "SSR / SSG / ISR",
      bullet5: "Fast & Scalable",
      bullet6: "PWA Ready",
      footerText: "Vercel edge CDN optimizations compiled",
      colorClass: "border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]",
      glowColor: "cyan",
      bulletsHex: "#06b6d4",
      iconName: Laptop
    },
    {
      number: "2",
      category: "MOBILE",
      title: "Expo / React Native",
      techBadge: "Expo",
      bullet1: "iOS, Android & Web",
      bullet2: "One Codebase",
      bullet3: "Expo Go",
      bullet4: "Push Notifications",
      bullet5: "OTA Updates",
      bullet6: "Native Performance",
      footerText: "Universal smartphone packages ready",
      colorClass: "border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
      glowColor: "emerald",
      bulletsHex: "#10b981",
      iconName: Smartphone
    },
    {
      number: "3",
      category: "BACKEND & DATABASE",
      title: "Supabase & Postgres",
      techBadge: "supabase",
      bullet1: "Built on PostgreSQL",
      bullet2: "Auth & RLS Security",
      bullet3: "Realtime Subscriptions",
      bullet4: "Scalable & Serverless",
      bullet5: "Row Level Security",
      bullet6: "Schema Migrations",
      footerText: "Postgres table indices synchronized",
      colorClass: "border-purple-500/40 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
      glowColor: "purple",
      bulletsHex: "#a855f7",
      iconName: Database,
      badgeRow: ["Auth", "Database", "Storage", "Realtime", "Edge Func", "Vector DB"]
    },
    {
      number: "4",
      category: "GAME ENGINE",
      title: "Godot Creator",
      techBadge: "GODOT",
      bullet1: "2D & 3D Engine",
      bullet2: "GDScript / C# Support",
      bullet3: "Lightweight build",
      bullet4: "Cross-Platform exports",
      bullet5: "Built-in Assets library",
      bullet6: "Export Everywhere",
      footerText: "UNITY (OPTIONAL) - 3D support enabled",
      subTechBadge: "UNITY (OPTIONAL)",
      subTechText: "For advanced 3D & console games",
      colorClass: "border-amber-500/40 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
      glowColor: "amber",
      bulletsHex: "#f59e0b",
      iconName: Gamepad2
    },
    {
      number: "5",
      category: "AI LAYER",
      title: "OpenAI & Gemini API",
      techBadge: "OpenAI API",
      bullet1: "AI Features Scaffolder",
      bullet2: "AI Prompts Library",
      bullet3: "Code & UI Generator",
      bullet4: "Game Mechanic setup",
      bullet5: "AI Agents Workflows",
      bullet6: "Embeddings / Vector DB",
      footerText: "+ Claude, Gemini, Mistral, Llama, etc.",
      colorClass: "border-sky-500/40 text-sky-450 shadow-[0_0_15px_rgba(56,189,248,0.15)]",
      glowColor: "sky",
      bulletsHex: "#38bdf8",
      iconName: Bot
    },
    {
      number: "6",
      category: "UI / DESIGN",
      title: "Tailwind / shadcn / Motion",
      techBadge: "Tailwind V4",
      bullet1: "Modern Components",
      bullet2: "Beautiful Design preset",
      bullet3: "Dynamic screen layouts",
      bullet4: "Framer Motion animations",
      bullet5: "Fully Responsive out-of-box",
      bullet6: "Dark Mode Ready Theme",
      footerText: "+ Figma, Canva, Iconify, Lucide Icons",
      colorClass: "border-pink-500/40 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.15)]",
      glowColor: "pink",
      bulletsHex: "#ec7299",
      iconName: Wrench
    },
    {
      number: "7",
      category: "PAYMENTS & BILLING",
      title: "Stripe Subscriptions",
      techBadge: "stripe",
      bullet1: "Subscriptions Manager",
      bullet2: "One-Time Payments portal",
      bullet3: "Webhook triggers synchronized",
      bullet4: "Self-Service Customer portal",
      bullet5: "Billing & Automated Invoices",
      bullet6: "Global taxes handling",
      footerText: "+ Paddle (Optional) + Tax & VAT Handling",
      colorClass: "border-blue-500/40 text-blue-450 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
      glowColor: "blue",
      bulletsHex: "#3b82f6",
      iconName: Sparkles
    },
    {
      number: "8",
      category: "DEPLOYMENT",
      title: "Vercel / Expo EAS",
      techBadge: "Vercel",
      bullet1: "Web Hosting (Vercel CDN)",
      bullet2: "Serverless edge functions",
      bullet3: "Mobile cloud compiles (EAS)",
      bullet4: "CI/CD automated trigger",
      bullet5: "Global static file CDN",
      bullet6: "Auto scaling instances",
      footerText: "+ Steam / itch.io / App Stores / Play Store",
      colorClass: "border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]",
      glowColor: "cyan",
      bulletsHex: "#06b6d4",
      iconName: Zap
    },
    {
      number: "9",
      category: "ANALYTICS & MONITORING",
      title: "PostHog / Sentry Log",
      techBadge: "PostHog",
      bullet1: "Product Metrics monitoring",
      bullet2: "Exceptions Sentry trace",
      bullet3: "Performance profiling metrics",
      bullet4: "Real-time user replay files",
      bullet5: "System live alerts triggers",
      bullet6: "Express server logs capture",
      footerText: "+ Google Analytics, Custom Dashboards",
      colorClass: "border-violet-500/40 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.15)]",
      glowColor: "violet",
      bulletsHex: "#8b5cf6",
      iconName: Flame
    },
    {
      number: "10",
      category: "AUTH & SECURITY",
      title: "Supabase JWT Auth",
      techBadge: "supabase Auth",
      bullet1: "Email / OAuth gateways",
      bullet2: "Secure Magic Links pass",
      bullet3: "2FA / MFA authentication",
      bullet4: "Token security handshake",
      bullet5: "API endpoints rate limits",
      bullet6: "Row-Level Database limits",
      footerText: "+ JWT, API Keys, + IP & Abuse Protection",
      colorClass: "border-emerald-500/40 text-emerald-450 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
      glowColor: "emerald",
      bulletsHex: "#10b981",
      iconName: Lock
    }
  ];

  return (
    <div className="bg-[#070b14] text-slate-100 min-h-screen font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden relative pb-16">
      
      {/* Decorative Blueprint Background Grid & Radial Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0e1526_1px,transparent_1px),linear-gradient(to_bottom,#0e1526_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.12),rgba(139,92,246,0.06),transparent)]" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-950/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-950/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Global Toast Alert banner */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 p-3.5 px-6 rounded-xl border border-cyan-500/30 bg-slate-950/95 text-cyan-300 font-mono text-xs font-bold tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-8 pt-8">

        {/* 1) HEADER SECTION */}
        <header className="flex flex-col lg:flex-row items-stretch justify-between gap-6 border-b border-[#121c38] pb-8">
          {/* Top-Left Logo and taglines */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3.5">
              {/* Real coral reef photographic image logo */}
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-cyan-500/40 relative group hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(6,182,212,0.35),inset_0_2px_8px_rgba(6,182,212,0.4)] ring-1 ring-cyan-500/50 bg-gradient-to-t from-cyan-950/80 via-slate-950 to-[#0b132b]">
                <img 
                  src="https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=400&q=80" 
                  alt="Coral reef" 
                  className="w-full h-full object-cover transition-opacity duration-300"
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0';
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-black font-sans tracking-tight uppercase leading-none text-white">
                    REEFSTACK <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-black">PRO+</span>
                  </h1>
                  <span className="text-[10px] font-bold tracking-widest px-2 py-0.5 bg-indigo-505/10 border border-indigo-500/20 text-indigo-400 rounded-md">
                    V2.5
                  </span>
                </div>
                <p className="text-[9.5px] font-mono text-cyan-400/90 font-bold tracking-widest uppercase mt-1">
                  PREMIUM ALL-IN-ONE BLUEPRINT ENGINE
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-xs text-slate-400 max-w-2xl font-bold tracking-wide uppercase leading-normal">
              THE ULTIMATE ALL-IN-ONE STACK TO BUILD, LAUNCH, SCALE & AUTOMATE APPS + GAMES
            </p>

            {/* Row of small feature badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { name: "MODERN", text: "React 19 & Next.js", col: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5" },
                { name: "SCALABLE", text: "Global CDN Edge", col: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" },
                { name: "OPEN SOURCE", text: "Self-Hostable", col: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5" },
                { name: "AI-POWERED", text: "SDK Grounding", col: "text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-500/5" },
                { name: "CROSS-PLATFORM", text: "Expo & Godot", col: "text-amber-405 border-amber-500/20 bg-amber-500/5" },
                { name: "SECURE", text: "Strict RLS guards", col: "text-rose-400 border-rose-500/20 bg-rose-500/5 animate-pulse" },
                { name: "DEVELOPER FRIENDLY", text: "Fully Documented", col: "text-sky-400 border-sky-500/20 bg-sky-500/5" },
              ].map(b => (
                <div key={b.name} className={`flex items-center gap-1 border rounded-md p-1 px-2.5 text-[8.5px] font-mono font-black ${b.col}`}>
                  <span className="w-1 h-1 rounded-full bg-current" />
                  <span>{b.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top-Right Multiplatform target box */}
          <div className="lg:w-[450px] bg-[#0c1222] border border-[#14234c] rounded-2xl p-4.5 flex flex-col justify-between tracking-wide">
            <div className="flex items-center justify-between border-b border-[#14234c] pb-2 text-[9.5px] font-mono font-extrabold text-slate-400">
              <span>ONE STACK. ENDLESS POSSIBILITIES.</span>
              <span className="text-cyan-450 animate-pulse">● WORKSPACE TARGETS READY</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 py-4">
              {[
                { label: "Web", icon: Laptop },
                { label: "Mobile", icon: Smartphone },
                { label: "Games", icon: Gamepad2 },
                { label: "AI Apps", icon: Bot },
                { label: "SaaS", icon: Layers },
                { label: "Marketplaces", icon: GraduationCap },
                { label: "Tools", icon: Wrench },
                { label: "Education", icon: GraduationCap },
                { label: "And More...", icon: MoreHorizontal },
              ].map(target => {
                const IconComponent = target.icon;
                return (
                  <div key={target.label} className="p-2 border border-[#14254c] rounded-lg hover:border-cyan-500/40 bg-[#070c18] flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-all cursor-pointer">
                    <IconComponent className="w-4.5 h-4.5 text-indigo-400" />
                    <span className="text-[10px] font-bold font-mono">{target.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </header>


        {/* 2) 10 NUMBERED TECH-STACK CARDS IN GRID */}
        <section className="space-y-4 text-left">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-widest block">
                INTEGRATED STACK MODULES
              </span>
              <h2 className="text-xl font-bold font-sans tracking-tight text-white uppercase mt-0.5">
                Core 10-Layer System Architecture
              </h2>
            </div>
            {/* Quick reset/download metadata actions */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  setSelectedLayers(['1', '2', '3', '5', '6', '7', '8', '10']);
                  showToast("Ecosystem layers customized package reverted to default specs!");
                }}
                className="p-1 px-2.5 rounded border border-[#14234c] bg-[#0c1222] text-[9.5px] font-mono text-slate-450 hover:text-white transition-all cursor-pointer"
              >
                Reset Default
              </button>
              <button 
                onClick={() => {
                  const blob = new Blob([JSON.stringify({ selectedLayers, mau: expectedMau, syncedRepo: customRepo }, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `reefstack-spec-${Date.now()}.json`;
                  a.click();
                  showToast("Architectural specification JSON downloaded!");
                }}
                className="p-1 px-2.5 rounded border border-[#14234c] bg-[#0c1222] text-[9.5px] font-mono text-cyan-400 hover:text-cyan-300 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                Export Spec
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {techCardsData.map((card) => {
              const isSelected = selectedLayers.includes(card.number);
              const isActiveSandbox = activeCardNum === card.number;
              const CardIcon = card.iconName;
              return (
                <div 
                  key={card.number}
                  onClick={() => {
                    setActiveCardNum(card.number);
                    showToast(`Loaded Layer ${card.number} live parameters & sandbox files!`);
                  }}
                  className={`group p-4 border rounded-xl bg-[#080d19]/80 cursor-pointer text-left transition-all relative flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg ${
                    isActiveSandbox ? 'border-indigo-400 ring-2 ring-indigo-500/20 scale-[1.015]' : isSelected ? card.colorClass : 'border-[#141f3a] opacity-80'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header info / Position count / Check box toggle */}
                    <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-current" style={{ color: card.bulletsHex }} />
                        <span className="font-bold tracking-widest">{card.number} {card.category}</span>
                      </div>
                      <input 
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedLayers(prev => [...prev, card.number]);
                            showToast(`Connected Layer ${card.number} to application blueprint!`);
                          } else {
                            setSelectedLayers(prev => prev.filter(n => n !== card.number));
                            showToast(`Disconnected Layer ${card.number} from package pipeline.`);
                          }
                        }}
                        className="w-3.5 h-3.5 rounded border-slate-700 accent-indigo-500 cursor-pointer"
                      />
                    </div>

                    {/* Logo tech outline */}
                    <div className="pt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg border border-[#14254c] bg-[#070b14] flex items-center justify-center shrink-0">
                          <CardIcon className="w-4.5 h-4.5 text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-white line-clamp-1 truncate">{card.title}</h4>
                          <span className="text-[10px] font-mono tracking-widest opacity-80" style={{ color: card.bulletsHex }}>{card.techBadge}</span>
                        </div>
                      </div>
                    </div>

                    {/* Supabase Sub-badges Row */}
                    {card.badgeRow && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {card.badgeRow.map(badge => (
                          <span key={badge} className="text-[8px] font-mono bg-slate-900 border border-[#14234c] px-1 py-0.5 rounded text-indigo-300 font-bold">
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Bullet feature lists */}
                    <div className="space-y-1 pt-3 border-t border-[#121b36] text-[11px] text-slate-350">
                      {[card.bullet1, card.bullet2, card.bullet3, card.bullet4, card.bullet5, card.bullet6].map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 leading-snug">
                          <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: card.bulletsHex }} />
                          <span className="line-clamp-1">{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Specific Sub-tech sections */}
                    {card.subTechBadge && (
                      <div className="mt-2.5 p-1.5 rounded-lg border border-amber-500/10 bg-[#070b14]/90 text-[10px]">
                        <span className="font-black text-amber-400 block tracking-wider uppercase font-mono">{card.subTechBadge}</span>
                        <span className="text-slate-400 block tracking-normal">{card.subTechText}</span>
                      </div>
                    )}
                  </div>

                  {/* Footers for sub-details */}
                  <div className="pt-3 border-t border-[#121b36] mt-4 flex items-center justify-between text-[9px] text-slate-500 font-mono">
                    <span className="truncate">{card.footerText}</span>
                    <span className="text-indigo-400 font-extrabold hover:underline">Active</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ACTIVE SELECTIVE LAYER DRAWERS / PLAYGROUNDS */}
          <div className="p-5 border border-[#14254c] rounded-2xl bg-[#0c1324]/90 relative overflow-hidden text-left space-y-4">
            <div className="absolute inset-0 bg-radial-[at_50%_0%] from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-[#14234c] pb-3 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black bg-indigo-505/10 text-indigo-400 border border-indigo-500/20 p-1 rounded">
                  POS: {activeCardNum}
                </span>
                <div>
                  <h4 className="text-sm font-black text-white">
                    SPECIFICATION DRAWER FOR LAYER {activeCardNum}: {techCardsData[parseInt(activeCardNum) - 1]?.title}
                  </h4>
                  <p className="text-xs text-slate-400">{activeSpec.technologyDetailed}</p>
                </div>
              </div>

              {/* Status active tracking pill */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-extrabold px-3 py-1 bg-[#050914] border border-[#121d3b] rounded-lg">
                <span className={`w-1.5 h-1.5 rounded-full ${selectedLayers.includes(activeCardNum) ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                <span>STATUS: {selectedLayers.includes(activeCardNum) ? "SELECTED MODULE" : "DISPATCH DISCONNECTED"}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Technical definitions and user custom variables notes */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4.5">
                <div className="space-y-3.5">
                  <div>
                    <span className="text-[9.5px] font-mono font-black text-indigo-400 block tracking-widest uppercase">ENGINEERING HANDSHAKE SPEC:</span>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeSpec.engineeringNotes}</p>
                  </div>

                  {/* Private Team Documentation notes section */}
                  <div className="space-y-1">
                    <span className="text-[9.5px] font-mono font-black text-slate-500 block tracking-wider uppercase">PRIVATE TEAM ARCHITECTURE NOTES:</span>
                    <textarea 
                      placeholder="Write your private team guidelines, api token mappings rules or schema changes notes here..."
                      className="w-full text-xs bg-[#060a16] border border-[#14234c] p-2 rounded-xl text-slate-300 pointer-events-auto select-text focus:outline-none focus:border-cyan-500/50 h-20 placeholder-slate-550"
                    />
                  </div>

                  {/* Environment Setup keys list */}
                  <div>
                    <span className="text-[9.5px] font-mono font-black text-slate-500 block tracking-wider uppercase mb-1">LOCAL CODES VARIABLES REQUIRE:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeSpec.environmentKeys.map(k => (
                        <code key={k} className="text-[10px] font-mono bg-slate-900/60 border border-[#14234c] p-1 px-2.5 rounded text-cyan-300 font-bold block">{k}</code>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Simulated file download metadata actions */}
                <div className="p-3 bg-[#050914] border border-[#121d3b] rounded-xl text-[11px] text-slate-400 leading-normal flex items-center justify-between">
                  <span>💡 Direct edit environment parameters inside `.env.example` to sync keys.</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(activeSpec.snippet);
                      showToast(`Copied Layer ${activeCardNum} integration code snippet to clipboard!`);
                    }}
                    className="p-1.5 px-3 rounded bg-indigo-650 hover:bg-indigo-600 text-white font-mono font-bold text-[10px] transition-all flex items-center gap-1 cursor-pointer select-none"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy Code
                  </button>
                </div>
              </div>

              {/* Code Snippet Preview panel */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-1">
                <div className="flex items-center justify-between border-b border-[#14234c] pb-1.5 text-[9.5px] font-mono font-bold text-slate-550">
                  <span>INTEGRATION CODE SPEC (TYPESCRIPT EXECUTABLE)</span>
                  <span className="text-emerald-450 uppercase animate-pulse">● Sandbox Ready</span>
                </div>
                <div className="bg-[#050914] border border-[#121d3b] rounded-xl p-3.5 overflow-x-auto max-h-[290px] text-left select-text pointer-events-auto">
                  <pre className="text-[10.5px] font-mono text-cyan-300 leading-relaxed tabular-nums whitespace-pre">{activeSpec.snippet}</pre>
                </div>
                {activeSpec.databaseSetup && (
                  <div className="space-y-1 mt-2">
                    <span className="text-[9px] font-mono text-slate-500 block tracking-widest uppercase">DATABASE SECURITY SCHEMA ALTER TABLE:</span>
                    <div className="bg-[#050914] border border-[#121d3b] rounded-xl p-2.5 overflow-x-auto text-left max-h-[140px] select-text pointer-events-auto">
                      <pre className="text-[10px] font-mono text-slate-400 leading-relaxed whitespace-pre">{activeSpec.databaseSetup}</pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>


        {/* 3) "HOW REEFSTACK WORKS TOGETHER" FLOW DIAGRAM */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch text-left">
          
          {/* Left Block: Connection Pathway Map (8 cols) */}
          <div className="lg:col-span-8 bg-[#0c1222] border border-[#14234c] rounded-2xl p-5 shadow-2 network-outline relative overflow-hidden flex flex-col justify-between min-h-[500px]">
            {/* Tech dotted matrix pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#141c38_1px,transparent_1px)] [background-size:20px_20px] opacity-35 pointer-events-none" />
            
            {/* Header info */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#14234c] pb-4 mb-4 gap-3">
              <div>
                <span className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-widest block">SYSTEM INTEGRATION DIAGRAM</span>
                <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5 mt-0.5">
                  <GitMerge className="w-4.5 h-4.5 text-indigo-400 animate-pulse" /> How ReefStack Works Together
                </h4>
              </div>
              
              <div className="flex items-center gap-1.5 bg-[#050914] px-2.5 py-1.5 rounded border border-[#121d3b] text-[9.5px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-ping" />
                <span className="text-slate-400 font-mono font-black">TRACE FLOW PATHS ACTIVE</span>
              </div>
            </div>

            {/* Infographic Network Diagram representation */}
            <div className="relative z-10 grid grid-cols-3 gap-y-8 gap-x-4 flex-1 items-center justify-center py-6">
              
              {/* Box A: Users */}
              <div className="flex flex-col items-center justify-center">
                <div 
                  onClick={() => {
                    setActiveNodeId('users');
                    showToast("Inspecting Audience Pipeline: web clients, mobile players and administrators!");
                  }}
                  className={`p-3.5 rounded-xl border w-full max-w-[200px] text-center cursor-pointer transition-all ${
                    activeNodeId === 'users' ? 'border-purple-400 bg-purple-950/25 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'border-[#14254c] bg-[#070b14] hover:bg-[#0c1322]'
                  }`}
                >
                  <span className="text-[8px] font-mono block text-slate-500 uppercase tracking-widest">GATEWAY</span>
                  <h5 className="font-extrabold text-xs text-white uppercase mt-1">Users</h5>
                  <div className="mt-3.5 space-y-1 text-left text-[10px] text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5"><Laptop className="w-3.5 h-3.5 text-cyan-400" /> Web Users</div>
                    <div className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-emerald-400" /> Mobile Clients</div>
                    <div className="flex items-center gap-1.5"><Gamepad2 className="w-3.5 h-3.5 text-amber-500" /> Gamers</div>
                    <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-rose-500" /> Admins</div>
                  </div>
                </div>
              </div>

              {/* Arrow Column 1 to Middle Gateways */}
              <div className="flex flex-col items-center justify-center space-y-3 shrink-0">
                <div className="w-full flex items-center justify-center gap-1">
                  <div className="h-[2px] w-12 bg-cyan-500/25 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-cyan-400 rotate-45 transform" />
                    <div className="absolute left-1/4 top-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
                  </div>
                </div>
              </div>

              {/* Box B: Frontend & Mobile Client Gateways */}
              <div className="flex flex-col gap-3 justify-center items-center">
                <div 
                  onClick={() => {
                    setActiveNodeId('frontend_web');
                    showToast("Vercel Next.js Rendering Router handles high density SEO loads.");
                  }}
                  className={`p-3 rounded-xl border w-full max-w-[200px] text-left cursor-pointer transition-all ${
                    activeNodeId === 'frontend_web' ? 'border-cyan-400 bg-cyan-950/20' : 'border-[#14234c] bg-[#070b14]'
                  }`}
                >
                  <h5 className="font-bold text-xs text-cyan-300">Frontend Web</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">Next.js & React App</p>
                </div>

                <div 
                  onClick={() => {
                    setActiveNodeId('frontend_mobile');
                    showToast("Expo packaging drives smart phone targeted apps.");
                  }}
                  className={`p-3 rounded-xl border w-full max-w-[200px] text-left cursor-pointer transition-all ${
                    activeNodeId === 'frontend_mobile' ? 'border-emerald-400 bg-emerald-950/20' : 'border-[#14234c] bg-[#070b14]'
                  }`}
                >
                  <h5 className="font-bold text-xs text-emerald-300 font-sans">Mobile Native</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Expo smartphone view</p>
                </div>
              </div>

              {/* Center Row 2: API Layer Gateway */}
              <div className="col-span-3 flex justify-center py-2.5">
                <div 
                  onClick={() => {
                    setActiveNodeId('api_layer');
                    showToast("Secure Express Server WebSockets channel loaded.");
                  }}
                  className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all max-w-[280px] w-full ${
                    activeNodeId === 'api_layer' ? 'border-sky-400 bg-sky-950/20' : 'border-[#14234c] bg-[#070b14]'
                  }`}
                >
                  <span className="text-[8px] font-bold font-mono tracking-widest text-[#94a3b8] bg-[#050914] border border-[#121d3b] px-2 py-1 rounded">
                    REST / GRAPHQL / EDGE GATEWAY
                  </span>
                  <h5 className="font-extrabold text-xs text-white mt-2 font-mono">API Layer (Server Middleware)</h5>
                </div>
              </div>

              {/* Row 3: Central Database core */}
              <div className="col-span-3 grid grid-cols-12 gap-2 items-center">
                {/* AI Gateway integration */}
                <div className="col-span-4 justify-self-start w-full">
                  <div 
                    onClick={() => {
                      setActiveNodeId('ai_layer');
                      showToast("Reasoning prompts evaluation executes through safe Gemini vectors.");
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      activeNodeId === 'ai_layer' ? 'border-purple-400 bg-purple-950/20' : 'border-[#14234c] bg-[#070b14]'
                    }`}
                  >
                    <h5 className="font-bold text-xs text-purple-400 uppercase tracking-tight">AI Layer</h5>
                    <p className="text-[10px] text-slate-400 font-mono mt-1 leading-snug">Gemini / OpenAI</p>
                  </div>
                </div>

                {/* Main Core backend central Node database Supabase */}
                <div className="col-span-4 w-full">
                  <div 
                    onClick={() => {
                      setActiveNodeId('supabase');
                      showToast("PostgreSQL core manages table structures, user properties auth, and attachments buckets.");
                    }}
                    className={`p-4 rounded-xl border text-center cursor-pointer transition-all relative overflow-hidden ${
                      activeNodeId === 'supabase' ? 'border-emerald-450 bg-emerald-950/25 shadow-[0_0_20px_rgba(52,211,153,0.3)]' : 'border-[#14234c] bg-[#070b14]'
                    }`}
                  >
                    <div className="absolute top-1.5 right-1.5 flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </div>
                    <span className="text-[8px] font-bold tracking-widest text-slate-500 block uppercase font-mono">POSTGRES CORE</span>
                    <h5 className="font-black text-xs text-emerald-400 mt-0.5 tracking-wider font-sans uppercase">supabase</h5>
                    <p className="text-[9px] text-slate-400 font-mono mt-1">Auth & RLS Locked</p>
                  </div>
                </div>

                {/* Outward integrations Stripe & Storage */}
                <div className="col-span-4 space-y-2.5 w-full">
                  <div 
                    onClick={() => {
                      setActiveNodeId('stripe');
                      showToast("Stripe Billing synchronizes webhook payloads.");
                    }}
                    className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                      activeNodeId === 'stripe' ? 'border-blue-400 bg-blue-950/20' : 'border-[#14234c] bg-[#070b14]'
                    }`}
                  >
                    <h5 className="font-extrabold text-[10px] text-blue-400 uppercase">stripe</h5>
                    <p className="text-[9px] text-slate-400 font-mono mt-0.5 leading-none">Monetization</p>
                  </div>

                  <div 
                    onClick={() => {
                      setActiveNodeId('storage');
                      showToast("Cloudflare R2 provides fast media streaming.");
                    }}
                    className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                      activeNodeId === 'storage' ? 'border-teal-400 bg-teal-950/20' : 'border-[#14234c] bg-[#070b14]'
                    }`}
                  >
                    <h5 className="font-extrabold text-[10px] text-teal-400 uppercase">Storage</h5>
                    <p className="text-[9px] text-slate-400 font-mono mt-0.5 leading-none">Asset Bundling</p>
                  </div>
                </div>
              </div>

              {/* Deployment Core row */}
              <div className="col-span-3 flex justify-center pt-3.5">
                <div 
                  onClick={() => {
                    setActiveNodeId('deploy');
                    showToast("Deployment targets Next.js static, mobile assets, or game store listings.");
                  }}
                  className={`p-3 rounded-xl border text-center cursor-pointer transition-all max-w-[280px] w-full ${
                    activeNodeId === 'deploy' ? 'border-cyan-400 bg-cyan-950/20' : 'border-[#14234c] bg-[#070b14]'
                  }`}
                >
                  <span className="text-[8px] font-mono tracking-widest text-[#94a3b8] bg-[#050914] border border-[#121d3b] px-2 py-0.5 rounded">
                    VERCEL CDN & EXPO EAS
                  </span>
                  <h4 className="text-xs font-black text-white mt-1.5 font-sans uppercase">Continuous Deployment Target</h4>
                </div>
              </div>

            </div>

            {/* Selected Node Advice context banner bottom */}
            {(() => {
              const nodeTips: Record<string, { title: string, tag: string, desc: string, advice: string }> = {
                'users': {
                  title: "Audience Pipeline Node",
                  tag: "ACTIVE CLIENTS",
                  desc: "Handles incoming routing requests. Includes web browsers, mobile app devices, and game instances.",
                  advice: "Configure rate limit guards inside Server API routes to secure databases."
                },
                'frontend_web': {
                  title: "Vercel Next.js Frontend Web UI",
                  tag: "COMPOSABLE WEB",
                  desc: "Compiles static web frameworks securely and delivers speed optimization for browser requests.",
                  advice: "Load API endpoints strictly from proxy server routes to prevent client key exposures."
                },
                'frontend_mobile': {
                  title: "Expo Smartphone Client Packaging",
                  tag: "NATIVE COMPILATION",
                  desc: "Generates mobile executable apps. Uses lightning quick over-the-air hotfixes setups.",
                  advice: "Review background SQLite locks inside App.tsx before compiling binaries."
                },
                'api_layer': {
                  title: "API Layer & WebSocket Handshake Gates",
                  tag: "ROUTING GATEWAY",
                  desc: "Ensures secure token handshakes and coordinates CRUD table query requests.",
                  advice: "Apply CORS policy matches carefully inside Server middlewares configuration."
                },
                'supabase': {
                  title: "Postgres Supabase Central Framework",
                  tag: "CORE DATABASE",
                  desc: "Holds profile datasets, triggers real-time tables streams, and operates storage buckets.",
                  advice: "Always enable Row-Level Security explicitly: ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;"
                },
                'ai_layer': {
                  title: "AI Integrations Module (Gemini Gateway & Reasoning)",
                  tag: "COGNITIVE INTELLIGENCE",
                  desc: "Structures semantic vectors similarity and handles document parser processes.",
                  advice: "Always lazy initialize the GoogleGenAI instance inside router files to protect keys."
                },
                'stripe': {
                  title: "Stripe Monetary Pricing Partner",
                  tag: "Billing & Subscriptions",
                  desc: "Manages subscription checking pages, monthly plans webhook triggers, and invoices.",
                  advice: "Always register webhook security secrets to bypass unauthorized price alerts."
                },
                'storage': {
                  title: "Edge Asset Object Pools (Cloudflare R2)",
                  tag: "MEDIA STORAGE",
                  desc: "Assets, levels assets packages and game sprite sheets are stored inside clean storage pools.",
                  advice: "Isolate invoice sheets inside secret folders, exposing generic images publicly."
                },
                'deploy': {
                  title: "Deployment Orchestration Pipelines (Vercel & EAS)",
                  tag: "AUTOMATED CI/CD",
                  desc: "Compiles mobile executable files or uploads static code changes automatically.",
                  advice: "Include strict lint checks in repository pre-commit hooks to avoid build compilation breaks."
                }
              };
              const tip = nodeTips[activeNodeId] || nodeTips['supabase'];
              return (
                <div className="relative z-10 border-t border-[#14234c] pt-4.5 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between text-left">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[8.5px] font-mono font-black bg-indigo-505/10 text-indigo-400 border border-indigo-500/20 p-0.5 px-2 rounded">
                        {tip.tag}
                      </span>
                      <span className="text-xs font-extrabold text-white">{tip.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono leading-relaxed">{tip.desc}</p>
                  </div>
                  <div className="md:max-w-xs bg-slate-950/80 border border-cyan-500/10 p-3 rounded-xl">
                    <span className="text-[8.5px] font-mono font-extrabold text-[#94a3b8] block">BLUEPRINT ENGINEERING RULE:</span>
                    <p className="text-[10px] text-cyan-300 italic mt-0.5 font-sans leading-snug">"{tip.advice}"</p>
                  </div>
                </div>
              );
            })()}

          </div>

          {/* Right Block: UPGRADES AND EXTRA FEATURES PANEL (4 cols) */}
          <div className="lg:col-span-4 bg-[#0c1222] border border-[#14234c] rounded-2xl p-5 shadow-2 flex flex-col justify-between text-left relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-[at_50%_0%] from-[#1d1b4b] via-transparent to-transparent opacity-65 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-[#14234c] pb-2 text-[9.5px] font-mono font-black text-slate-400">
                <span>NEW & POWERFUL UPGRADES</span>
                <span className="bg-indigo-505/15 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded-md text-[8.5px] animate-pulse">NEW</span>
              </div>

              {/* List of high potential modules */}
              <div className="space-y-4 mt-5">
                {[
                  { title: "AI Builder Suite", desc: "Generate applications setup, custom boilerplate scripts, UI layout rules, other integrations easily.", icon: Bot, col: "text-purple-400" },
                  { title: "Game Creation Suite", desc: "Define dialogue patterns, map design vectors, sprites generation, NPC pathways blueprints.", icon: Gamepad2, col: "text-amber-500" },
                  { title: "Automation Workflow", desc: "Automate task queues scheduling, triggering of cron triggers actions, automated email blasts.", icon: Cpu, col: "text-cyan-400" },
                  { title: "Team & Collaboration", desc: "Map access parameters permissions levels, role groups metadata, share secure workspaces.", icon: Users, col: "text-blue-400" },
                  { title: "Headless CMS Portal", desc: "Interface content updates easily. Add blogs, catalog descriptions, images metadata safely.", icon: Layers3, col: "text-emerald-400" },
                  { title: "Internationalization", desc: "Translate text structures, locate date currencies, serve global languages flawlessly.", icon: Compass, col: "text-indigo-400" },
                  { title: "Offline Web Sync PWA", desc: "Store browser credentials local databases caching, and sync tables automatically on signal restore.", icon: Smartphone, col: "text-rose-455" },
                  { title: "Dynamic Hook Plugins", desc: "Connect REST integrations, dispatch JSON payloads triggers, scale parameters.", icon: Wrench, col: "text-teal-400" },
                ].map((upg) => {
                  const UpgradeIcon = upg.icon;
                  return (
                    <div key={upg.title} className="flex gap-3 hover:translate-x-1 transition-transform duration-200">
                      <div className="w-8.5 h-8.5 rounded-lg bg-[#070b14] border border-[#14254c] flex items-center justify-center shrink-0">
                        <UpgradeIcon className={`w-4.5 h-4.5 ${upg.col}`} />
                      </div>
                      <div>
                        <h5 className="font-extrabold text-[12px] text-white leading-tight font-sans block">{upg.title.toUpperCase()} —</h5>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-mono mt-0.5">{upg.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#14234c] text-[10px] text-slate-500 font-mono">
              ⚡ Upgrade module suites directly from developers panels dashboard.
            </div>
          </div>
        </section>


        {/* 4) EXPANDED FEATURE LAYERS SECTION */}
        <section className="space-y-4 text-left">
          <div>
            <span className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-widest block">SPECIALIZED DEV LAYERS</span>
            <h2 className="text-xl font-bold font-sans text-white uppercase mt-1">Expanded Feature Layers Outline</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-3">
            {[
              {
                letter: "A",
                title: "AI BUILDER",
                features: ["App Idea Generator", "Auto Code Generator", "UI / Layout Tool", "Debug & Fix Agent", "Prompt Library", "AI Test Generator", "Documentation AI"],
                borderCol: "border-purple-500/20 bg-purple-500/5",
                badgeStyle: "bg-purple-950/40 text-purple-400 border-purple-500/30"
              },
              {
                letter: "B",
                title: "DESIGN LAYER",
                features: ["Figma Integration", "Canva & Brand Assets", "Logo & Brand Kit", "Icon Resolver Library", "Mockup Generator", "Screenshot Builder", "Color Palette Setup"],
                borderCol: "border-pink-500/20 bg-pink-500/5",
                badgeStyle: "bg-pink-950/40 text-pink-400 border-pink-500/30"
              },
              {
                letter: "C",
                title: "GAME CREATION",
                features: ["Game Templates Pack", "Sprite Assets Sheets", "Custom Sprite gen", "Level Builder Canvas", "Dialogue AI templates", "Quest System hooks", "Save/Load script"],
                borderCol: "border-amber-500/20 bg-amber-500/5",
                badgeStyle: "bg-amber-950/40 text-amber-500 border-amber-500/30"
              },
              {
                letter: "D",
                title: "BUSINESS CORE",
                features: ["Console Dashboard", "Users Management", "Customer metadata", "Unified Email lists", "Credits token purchases", "Affiliate gateway", "Reports & Insights"],
                borderCol: "border-blue-500/20 bg-blue-500/5",
                badgeStyle: "bg-blue-950/40 text-blue-400 border-blue-500/30"
              },
              {
                letter: "E",
                title: "AUTOMATION",
                features: ["Dynamic AI Agents", "GitHub Actions workflows", "Task scheduling", "Automated Cron tasks", "Live Auto-deploy", "Error Bug Reports", "Content creator AI"],
                borderCol: "border-cyan-500/20 bg-cyan-500/5",
                badgeStyle: "bg-cyan-950/40 text-cyan-400 border-cyan-500/30"
              },
              {
                letter: "F",
                title: "STORAGE & MEDIA",
                features: ["Supabase Bucket pools", "Cloudflare R2 caches", "Images upload route", "Video streaming files", "Audio files compression", "Resource library core", "CDN routes caching"],
                borderCol: "border-teal-500/20 bg-teal-500/5",
                badgeStyle: "bg-teal-950/40 text-teal-400 border-teal-500/30"
              },
              {
                letter: "G",
                title: "TESTING SUITE",
                features: ["Playwright E2E browser", "Vitest unit runner", "Game checks lists", "Mobile clients emulator", "Load Performance logs", "System error alert", "Accessibility audits"],
                borderCol: "border-sky-500/20 bg-sky-500/5",
                badgeStyle: "bg-sky-950/40 text-sky-400 border-sky-500/30"
              },
              {
                letter: "H",
                title: "LAUNCH PAD",
                features: ["SEO Landing pages", "Waitlist entries DB", "SaaS marketing tools", "Sitemap generation", "PR & Press Assets Kit", "Social Media templates", "Store compilation helper"],
                borderCol: "border-rose-500/20 bg-rose-500/5",
                badgeStyle: "bg-rose-950/40 text-rose-455 border-rose-500/30"
              },
            ].map(layer => (
              <div key={layer.letter} className={`p-3.5 border rounded-xl hover:-translate-y-1 transition-all duration-250 ${layer.borderCol}`}>
                <div className="flex items-center gap-1.5 border-b border-[#14234c] pb-2 mb-3">
                  <span className={`text-[10px] font-mono font-black w-5 h-5 rounded-md flex items-center justify-center border font-mono ${layer.badgeStyle}`}>{layer.letter}</span>
                  <h5 className="font-extrabold text-[10px] font-sans text-white truncate leading-none">{layer.title}</h5>
                </div>
                <ul className="space-y-1.5 text-[10.5px] text-slate-400 font-mono text-left">
                  {layer.features.map(f => (
                    <li key={f} className="flex items-start gap-1 leading-snug">
                      <span className="text-slate-650 shrink-0">◇</span>
                      <span className="line-clamp-1">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Core Integrations bar panel */}
          <div className="p-4 bg-[#0c1222] border border-[#14234c] rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-4 mt-3">
            <div className="text-left">
              <h5 className="font-bold text-xs text-indigo-400 font-sans tracking-wide uppercase">PUBLIC EXTENSIONS & CLOUD SERVICES</h5>
              <p className="text-[10.5px] text-slate-400 font-mono mt-0.5">Unified handshakes ready to scale via secure APIs, Webhooks, or client scripts.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { name: "GitHub", icon: Laptop },
                { name: "Docker", icon: Wrench },
                { name: "Slack", icon: Users },
                { name: "Discord", icon: Users },
                { name: "Notion", icon: Layers3 },
                { name: "Zapier", icon: Sliders },
                { name: "Make", icon: RefreshCw },
                { name: "Hugging Face", icon: Bot },
              ].map(ext => (
                <div key={ext.name} className="flex items-center gap-1.5 p-1.5 px-3 border border-[#14254c] bg-[#070b14] hover:border-cyan-500/30 rounded-lg text-slate-300 text-[11px] font-mono cursor-pointer transition-all">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-405" />
                  <span>{ext.name}</span>
                </div>
              ))}
              <span className="text-[10px] font-mono text-slate-500 pl-2">+ 1000s more via APIs & Webhooks</span>
            </div>
          </div>
        </section>


        {/* 5) HOW TO USE (STEP-BY-STEP) TIMELINE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch text-left">
          
          {/* Timeline steps block (7 columns or elements) */}
          <div className="lg:col-span-6 bg-[#0c1222] border border-[#14234c] rounded-2xl p-5 shadow-2 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-widest block">LIFECYCLE ROADMAP</span>
                <h4 className="text-sm font-extrabold text-white uppercase mt-0.5">HOW TO USE REEFSTACK (STEP-BY-STEP)</h4>
              </div>

              {/* Staggered circular step nodes */}
              <div className="space-y-4 pt-2">
                {[
                  { num: "1", title: "Idea Discovery", action: "Define Goals", desc: "Solidify structural variables, database targets, and mobile deployment prerequisites." },
                  { num: "2", title: "Ecosystem Plan", action: "Pick Presets", desc: "Activate combined layer tags or pick pre-compiled solopreneur packages." },
                  { num: "3", title: "App Scaffold", action: "Compile Sandbox", desc: "Tailor private snippets, custom notes parameters and download specifications codes." },
                  { num: "4", title: "Reliability Test", action: "Execute Audits", desc: "Run self diagnostics, local mock calculations checks and test API rates integrity specs." },
                  { num: "5", title: "Deploy Targets", action: "Production Launch", desc: "Deliver Next.js files edges to Vercel and compile native mobile code via Expo EAS." },
                  { num: "6", title: "Launch Blast", action: "Open Gates", desc: "Dispatch launch waitlist emails triggers and hook up PostHog session monitors." },
                  { num: "7", title: "Continuous Growth", action: "Monetize", desc: "Sync active Stripe billing tiers to postgres profiles roles and scale users capacity." },
                ].map(step => (
                  <div key={step.num} className="flex gap-4 items-start hover:translate-x-1 transition-transform duration-200">
                    <div className="w-7 h-7 rounded-full border border-cyan-500/30 bg-cyan-950/40 flex items-center justify-center text-cyan-400 font-mono text-[11px] font-black shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.2)]">
                      {step.num}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 leading-none">
                        <span className="text-xs font-black text-white">{step.title}</span>
                        <span className="text-[8px] font-mono bg-slate-900 border border-[#121d3b] px-1.5 py-0.5 rounded text-indigo-305 font-bold uppercase">{step.action}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-mono mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Example Use Cases block */}
          <div className="lg:col-span-3 bg-[#0c1222] border border-[#14234c] rounded-2xl p-5 shadow-2 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-widest block">PRE-COMPILED BENTO TEMPLATES</span>
                <h4 className="text-xs font-extrabold text-white uppercase mt-0.5">EXAMPLE USE CASES</h4>
              </div>

              <div className="space-y-3 pt-1">
                {[
                  { name: "AI SaaS Tools", mau: 10000, layers: ['1', '3', '5', '6', '7', '10'], desc: "AI Powered Web Application" },
                  { name: "E-Commerce Store", mau: 100000, layers: ['1', '3', '6', '7', '8', '9', '10'], desc: "Enterprise Scalable Store" },
                  { name: "Social App", mau: 250000, layers: ['1', '2', '3', '6', '8', '9', '10'], desc: "Full Stack Social Package" },
                  { name: "Mobile Game", mau: 50000, layers: ['2', '3', '4', '8', '9', '10'], desc: "EAS Native Code Package" },
                  { name: "RPG / Adventure Game", mau: 20000, layers: ['3', '4', '6', '8', '10'], desc: "Godot Web Export Config" },
                  { name: "Portfolio Website", mau: 5000, layers: ['1', '6', '8'], desc: "Lite Single-Page App" },
                  { name: "Marketplace Platform", mau: 500000, layers: ['1', '3', '6', '7', '8', '9', '10'], desc: "High Density Multi-vendor Core" }
                ].map(presets => (
                  <div 
                    key={presets.name}
                    onClick={() => handleApplyPreset(presets.mau, presets.layers, presets.desc)}
                    className="p-2 border border-[#14254c] hover:border-cyan-500/35 hover:bg-[#070b14] rounded-lg tracking-wide bg-[#0c1222] text-left cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-250 hover:text-white leading-none font-sans block">{presets.name}</span>
                      <span className="text-[8.5px] font-mono text-cyan-405 font-black">Apply</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono leading-none mt-1">{presets.layers.length} Layers • {presets.mau.toLocaleString()} Users</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[9.5px] font-mono text-slate-500 mt-2">
              ⚡ Clicking presets triggers instant variables scale and layers mapping updates dynamically.
            </p>
          </div>

          {/* Why ReefStack Pro+ Panel with Bioluminescent stacked coral SVG reef illustration support */}
          <div className="lg:col-span-3 bg-[#0c1222] border border-[#14234c] rounded-2xl p-5 shadow-2 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/30 via-transparent to-transparent pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div>
                <span className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-widest block font-sans">ECOSYSTEM VALUE MATRIX</span>
                <h4 className="text-xs font-extrabold text-white uppercase mt-0.5">WHY REEFSTACK PRO+?</h4>
              </div>

              {/* Checklist review */}
              <div className="space-y-2.5 pt-1.5 text-left text-slate-300 font-mono text-[11px]">
                {[
                  "All-In-One Solution",
                  "AI-Powered Development",
                  "Modern, Fast & Scalable",
                  "Save Time & Reduce Costs",
                  "Build, Launch & Scale Faster"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coral reef photographic image */}
            <div className="w-full h-32 rounded-xl overflow-hidden border border-cyan-500/40 relative mt-4 shadow-[0_0_15px_rgba(6,182,212,0.35)] ring-1 ring-cyan-500/50 bg-gradient-to-t from-cyan-950/80 via-slate-950 to-[#0b132b]">
              <img 
                src="https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=400&q=80" 
                alt="Coral reef" 
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>


        {/* SYSTEM MANAGEMENT AUXILIARY SERVICES: PERSISTENT CONTROLS & DIAGNOSTICS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch text-left">
          
          {/* Active Cloud hosting dynamic modeler */}
          <div className="lg:col-span-4 bg-[#0c1222] border border-[#14234c] rounded-2xl p-5 shadow-2 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4.5 h-4.5 text-cyan-400 animate-pulse" />
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-sans">Ecosystem Cost Modeler</h4>
              </div>

              <div className="space-y-3 pt-1">
                {/* MAU scale control slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10.5px] font-mono text-slate-400">
                    <span>EXPECTED VOLUME (MAU):</span>
                    <span className="text-cyan-400 font-bold bg-[#070b14] px-1.5 rounded">{expectedMau.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range"
                    min="1000"
                    max="1000000"
                    step="1000"
                    value={expectedMau}
                    onChange={(e) => setExpectedMau(Number(e.target.value))}
                    className="w-full accent-cyan-405 bg-[#050914] rounded-lg h-1 px-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  {/* Toggle Serverless auto optimization check */}
                  <div 
                    onClick={() => {
                      setScaleOptimization(!scaleOptimization);
                      showToast(`Serverless optimization: ${!scaleOptimization ? 'ENABLED (42% discount)' : 'DISABLED'}`);
                    }}
                    className={`p-2 border rounded-xl flex items-center gap-1.5 cursor-pointer select-none transition-all ${
                      scaleOptimization ? 'border-emerald-500/35 bg-emerald-500/5 text-emerald-400' : 'border-[#14234c] bg-[#070b14]/70 text-slate-500'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${scaleOptimization ? 'opacity-100' : 'opacity-20'}`} />
                    <span>Serverless auto</span>
                  </div>

                  {/* Toggle Edge caching check */}
                  <div 
                    onClick={() => {
                      setEdgeCachingEnabled(!edgeCachingEnabled);
                      showToast(`CDN Edge caching auto optimization: ${!edgeCachingEnabled ? 'ENABLED (-18% cost)' : 'DISABLED'}`);
                    }}
                    className={`p-2 border rounded-xl flex items-center gap-1.5 cursor-pointer select-none transition-all ${
                      edgeCachingEnabled ? 'border-cyan-500/35 bg-cyan-500/5 text-cyan-400' : 'border-[#14234c] bg-[#070b14]/70 text-slate-500'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${edgeCachingEnabled ? 'opacity-100' : 'opacity-20'}`} />
                    <span>Edge CDN Cache</span>
                  </div>
                </div>

                {/* D3 Line Chart Widget */}
                {(() => {
                  const chartData = [];
                  const pointsCount = 15;
                  const hasLayers = selectedLayers && selectedLayers.length > 0;
                  for (let i = 0; i <= pointsCount; i++) {
                    const mauVal = 1000 + (999000 * i) / pointsCount;
                    let costVal = 0;
                    if (hasLayers) {
                      costVal = 25.00 + selectedLayers.length * 9.55 + (mauVal / 10000) * 4.25;
                      if (scaleOptimization) costVal *= 0.58;
                      if (edgeCachingEnabled) costVal *= 0.82;
                      costVal = Math.max(9.00, costVal);
                    }
                    chartData.push({ mau: mauVal, cost: costVal });
                  }

                  const width = 320;
                  const height = 110;
                  const paddingLeft = 32;
                  const paddingRight = 10;
                  const paddingTop = 12;
                  const paddingBottom = 18;

                  const xScale = d3.scaleLinear()
                    .domain([1000, 1000000])
                    .range([paddingLeft, width - paddingRight]);

                  const maxCost = Math.max(...chartData.map(d => d.cost));
                  const safeMaxCost = maxCost > 0 ? maxCost : 100;
                  const yScale = d3.scaleLinear()
                    .domain([0, safeMaxCost * 1.1])
                    .range([height - paddingBottom, paddingTop]);

                  const lineGenerator = d3.line<{ mau: number, cost: number }>()
                    .x(d => xScale(d.mau))
                    .y(d => yScale(d.cost))
                    .curve(d3.curveMonotoneX);

                  const areaGenerator = d3.area<{ mau: number, cost: number }>()
                    .x(d => xScale(d.mau))
                    .y0(height - paddingBottom)
                    .y1(d => yScale(d.cost))
                    .curve(d3.curveMonotoneX);

                  const linePathString = lineGenerator(chartData) || '';
                  const areaPathString = areaGenerator(chartData) || '';

                  const curX = xScale(expectedMau);
                  const curY = yScale(calculateMonthlyCost());

                  const yTicks = [0, maxCost / 2, maxCost];

                  return (
                    <div className="border border-[#14234c] bg-[#070b14]/60 p-2.5 rounded-xl space-y-1.5 overflow-hidden">
                      <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 font-bold">
                        <span>ESTIMATION TRAJECTORY</span>
                        <span className="text-cyan-500/80">LIVE MODEL</span>
                      </div>
                      
                      <div className="relative">
                        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} className="overflow-visible select-none">
                          <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.00" />
                            </linearGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="3" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                          </defs>

                          {/* Horizontal Dashed Gridlines representing values */}
                          {yTicks.map((tick, idx) => {
                            const yPos = yScale(tick);
                            return (
                              <g key={`yTick-${idx}`} className="opacity-30">
                                <line 
                                  x1={paddingLeft} 
                                  y1={yPos} 
                                  x2={width - paddingRight} 
                                  y2={yPos} 
                                  stroke="#1e293b" 
                                  strokeDasharray="2,2" 
                                />
                                <text 
                                  x={paddingLeft - 5} 
                                  y={yPos + 3} 
                                  fill="#94a3b8" 
                                  fontSize="7.5" 
                                  textAnchor="end" 
                                  fontFamily="monospace"
                                  fontWeight="bold"
                                >
                                  ${Math.round(tick)}
                                </text>
                              </g>
                            );
                          })}

                          {/* X-axis labels */}
                          <g className="opacity-40 text-slate-400 font-mono text-[7.5px] font-bold">
                            <text x={paddingLeft} y={height - 4} textAnchor="start" fill="#94a3b8">1K</text>
                            <text x={(width - paddingLeft - paddingRight) / 2 + paddingLeft} y={height - 4} textAnchor="middle" fill="#94a3b8">500K</text>
                            <text x={width - paddingRight} y={height - 4} textAnchor="end" fill="#94a3b8">1M MAU</text>
                          </g>

                          {/* D3 Cost Area with gradient fill */}
                          <path 
                            d={areaPathString} 
                            fill="url(#areaGradient)" 
                            className="transition-all duration-300 ease-in-out"
                          />

                          {/* D3 Cost Trajectory Line */}
                          <path 
                            d={linePathString} 
                            fill="none" 
                            stroke="#22d3ee" 
                            strokeWidth="2" 
                            filter="url(#glow)"
                            className="transition-all duration-300 ease-in-out"
                          />

                          {/* Interactive Vertical Slider Indicator Line */}
                          <line 
                            x1={curX} 
                            y1={paddingTop} 
                            x2={curX} 
                            y2={height - paddingBottom} 
                            stroke="#818cf8" 
                            strokeWidth="1" 
                            strokeDasharray="3,3"
                            opacity="0.7"
                          />

                          {/* Glowing pulsing dot on the trajectory */}
                          <circle 
                            cx={curX} 
                            cy={curY} 
                            r="6" 
                            fill="#818cf8" 
                            opacity="0.3" 
                            className="animate-ping"
                          />
                          <motion.circle 
                            cx={curX} 
                            cy={curY} 
                            r="4.5" 
                            fill="#22d3ee" 
                            stroke="#070b14" 
                            strokeWidth="1.5"
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })()}

                {/* Live calculate read outputs */}
                <div className="p-3 bg-slate-900 border border-[#14234c] rounded-xl text-left">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">ESTIMATED CLOUD BUDGET:</span>
                  <div className="flex items-baseline gap-1 mt-1 text-white font-mono">
                    <span className="text-xl font-bold font-sans text-cyan-300">
                      ${calculateMonthlyCost().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-xs text-slate-500">/ mo</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 leading-normal font-mono mt-3">
              📐 Multiplier shifts relative to connected active layers.
            </p>
          </div>

          {/* GitHub configuration management */}
          <div className="lg:col-span-4 bg-[#0c1222] border border-[#14234c] rounded-2xl p-5 shadow-2 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Laptop className="w-4.5 h-4.5 text-indigo-400" />
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-sans">GitHub Orchestrator</h4>
              </div>

              <div className="space-y-2.5 text-[11px] font-mono">
                <div className="space-y-1">
                  <span className="text-slate-550 block text-[9.5px]">REPO:</span>
                  <input 
                    type="text"
                    value={customRepo}
                    onChange={(e) => setCustomRepo(e.target.value)}
                    className="w-full text-xs font-bold font-sans bg-slate-900 border border-[#14234c] p-1.5 rounded-lg text-slate-200 focus:outline-none"
                    placeholder="owner/repo-name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <span className="text-slate-550 block text-[9.5px]">BRANCH:</span>
                    <input 
                      type="text"
                      value={customBranch}
                      onChange={(e) => setCustomBranch(e.target.value)}
                      className="w-full text-xs font-sans bg-slate-900 border border-[#14234c] p-1.5 rounded-lg text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-550 block text-[9.5px]">PAT TOKEN:</span>
                    <input 
                      type="password"
                      value={customPatToken}
                      onChange={(e) => setCustomPatToken(e.target.value)}
                      className="w-full text-xs font-sans bg-slate-900 border border-[#14234c] p-1.5 rounded-lg text-slate-200 focus:outline-none placeholder-slate-600"
                      placeholder="ghp_****************"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleForceSync}
                  disabled={isSyncing}
                  className="w-full p-2 rounded-xl bg-indigo-650 hover:bg-indigo-600 text-white font-bold transition-all mt-1 flex items-center justify-center gap-1 cursor-pointer font-sans"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? "Syncing Pipeline..." : "Sync Active Architecture State"}</span>
                </button>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 font-mono mt-3">
              🔐 Token saved securely on internal sandboxes cache files.
            </p>
          </div>

          {/* Interactive Chatbot engineering advisor */}
          <div className="lg:col-span-4 bg-[#0c1222] border border-[#14234c] rounded-2xl p-5 shadow-2 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-4.5 h-4.5 text-purple-400 animate-pulse" />
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-sans">AI Architect Advisor</h4>
                </div>
                {/* Personality selectors */}
                <select 
                  value={chatbotPersonality}
                  onChange={(e) => {
                    setChatbotPersonality(e.target.value as any);
                    showToast(`Switched active AI expert personality to: ${e.target.value.toUpperCase()}`);
                  }}
                  className="text-[10px] bg-slate-950 border border-[#14234c] rounded p-0.5 text-indigo-400 font-bold"
                >
                  <option value="wizard">Wizard</option>
                  <option value="devops">DevOps</option>
                  <option value="monetization">Monetization</option>
                  <option value="security">Security</option>
                </select>
              </div>

              {/* Chat frame */}
              <div className="bg-[#050914] border border-[#121d3b] rounded-xl p-3 h-32 overflow-y-auto space-y-2 text-[11px] font-mono scrollbar-thin">
                {chatbotMessages.map((msg, idx) => (
                  <div key={idx} className={`p-1.5 rounded-lg leading-relaxed ${msg.role === 'assistant' ? 'bg-[#0f172a] text-cyan-300' : 'bg-indigo-950/40 text-slate-200 text-right'}`}>
                    <span className="text-[9px] text-slate-500 block">{msg.role === 'assistant' ? 'AI' : 'YOU'}:</span>
                    <p className="whitespace-pre-line text-left">{msg.content}</p>
                  </div>
                ))}
              </div>

              {/* Inputs */}
              <form onSubmit={(e) => { e.preventDefault(); handleSendChat(); }} className="flex gap-2.5">
                <input 
                  type="text"
                  value={chatbotInput}
                  onChange={(e) => setChatbotInput(e.target.value)}
                  placeholder="Ask advisor (e.g. 'How to set up database RLS?')..."
                  className="flex-1 text-xs bg-slate-900 border border-[#14234c] focus:border-cyan-500/40 p-2 rounded-xl text-slate-200 focus:outline-none"
                />
                <button type="submit" className="p-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-all cursor-pointer">
                  Send
                </button>
              </form>
            </div>

            <span className="text-[9px] text-slate-500 font-mono mt-3 block">
              🤖 Multi Personality Advisor grounded on Google AI Studio SDK.
            </span>
          </div>
        </section>

        {/* PRICING PLANS SECTION */}
        <section className="space-y-6 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#14234c] pb-4 gap-4">
            <div>
              <span className="text-[10px] font-mono font-black text-cyan-400 uppercase tracking-widest block">SUBSCRIPTION PLANS</span>
              <h2 className="text-xl font-extrabold text-white uppercase tracking-tight font-sans mt-0.5">CHOOSE YOUR PLAN</h2>
            </div>
            <p className="text-[10.5px] text-slate-400 font-mono">
              All plans include core API access, unified deployment triggers, and sandbox nodes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* STARTER CARD */}
            <div className="bg-[#0c1222] border border-[#14234c] hover:border-slate-500/30 rounded-2xl p-6 shadow-md flex flex-col justify-between transition-all duration-300 relative overflow-hidden group hover:-translate-y-1">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[8px] font-mono font-bold tracking-widest text-slate-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded uppercase">STARTER</span>
                    <h3 className="text-lg font-black font-sans text-white mt-2">FREE</h3>
                    <p className="text-[10px] font-mono text-slate-500 mt-1">For hobbies & evaluation</p>
                  </div>
                </div>

                <div className="border-t border-[#121d3b] pt-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Basic features blueprint</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>1 Active Project Sandbox</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Community support forum</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => {
                    setActivePricingModal('starter');
                    showToast("Loading Starter Tier specifications...");
                  }}
                  className="w-full text-center p-2.5 rounded-xl bg-slate-900 border border-[#14234c] hover:border-cyan-500/40 text-slate-200 hover:text-white font-bold transition-all text-xs font-sans cursor-pointer group-hover:bg-[#111a30]"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* PRO CARD (MOST POPULAR) */}
            <div className="bg-[#0f172a] border border-cyan-500/50 rounded-2xl p-6 shadow-lg flex flex-col justify-between transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 ring-1 ring-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              {/* Most Popular Badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-500 to-indigo-500 text-slate-950 text-[8px] font-black font-mono tracking-widest px-3.5 py-1 rounded-bl-xl uppercase">
                MOST POPULAR
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[8px] font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/55 border border-cyan-800/40 px-2 py-0.5 rounded uppercase">PRO</span>
                    <h3 className="text-lg font-black font-sans text-cyan-300 mt-2">$29 <span className="text-xs text-slate-400 font-normal">/ mo</span></h3>
                    <p className="text-[10px] font-mono text-slate-405 mt-1">For professional solopreneurs & production</p>
                  </div>
                </div>

                <div className="border-t border-[#121d3b] pt-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>All 10 architecture layers</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Unlimited active projects</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Priority helpdesk support</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Advanced analytics dashboard</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => {
                    setActivePricingModal('pro');
                    showToast("Switched configuration to Pro Tier view...");
                  }}
                  className="w-full text-center p-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold transition-all text-xs font-sans cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                >
                  Choose Pro
                </button>
              </div>
            </div>

            {/* ENTERPRISE CARD */}
            <div className="bg-[#0c1222] border border-[#14234c] hover:border-purple-500/30 rounded-2xl p-6 shadow-md flex flex-col justify-between transition-all duration-300 relative overflow-hidden group hover:-translate-y-1">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[8px] font-mono font-bold tracking-widest text-purple-400 bg-purple-950/40 border border-purple-800/40 px-2 py-0.5 rounded uppercase">ENTERPRISE</span>
                    <h3 className="text-lg font-black font-sans text-white mt-2">CUSTOM</h3>
                    <p className="text-[10px] font-mono text-slate-500 mt-1">For scaling teams & companies</p>
                  </div>
                </div>

                <div className="border-t border-[#121d3b] pt-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Everything in Pro tier plus:</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Dedicated cloud infrastructure</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>SSO / SAML identity integration</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>SLA uptime & dedicated account manager</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => {
                    setActivePricingModal('enterprise');
                    showToast("Opening Enterprise connection gate...");
                  }}
                  className="w-full text-center p-2.5 rounded-xl bg-slate-900 border border-[#14234c] hover:border-purple-500/40 text-slate-200 hover:text-white font-bold transition-all text-xs font-sans cursor-pointer group-hover:bg-[#111a30]"
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>


        {/* SUPPORT TICKETS AND RECONCILE HEALTH CHECKS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch text-left">
          
          {/* Support Ticket submissions */}
          <div className="lg:col-span-6 bg-[#0c1222] border border-[#14234c] rounded-2xl p-5 shadow-2 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-[#14234c] pb-2 text-slate-400">
                <LifeBuoy className="w-4.5 h-4.5 text-rose-500" />
                <h4 className="text-xs font-bold text-white uppercase font-sans">Active Priority Diagnostics Tickets</h4>
              </div>

              {/* Queue entries list */}
              <div className="space-y-3 max-h-[160px] overflow-y-auto">
                {supportTicks.map(ticket => (
                  <div key={ticket.id} className="p-2.5 border border-[#14254c] rounded-lg bg-[#070b14] space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-indigo-400 font-bold">TICKET #{ticket.id}</span>
                      <span className="text-slate-500">{ticket.priority} PRIORITY</span>
                    </div>
                    <p className="text-slate-200 font-semibold leading-snug">{ticket.title}</p>
                    <div className="border-t border-[#121c38] pt-1 mt-1 flex justify-between items-center text-[9.5px]">
                      <span className="text-slate-500">STATUS:</span>
                      <span className="text-cyan-405 font-medium">{ticket.status}</span>
                    </div>
                    {ticket.answer && (
                      <p className="text-[10px] text-emerald-400 bg-slate-905/60 p-1.5 rounded border border-emerald-500/10 italic leading-snug mt-1 text-left">
                        "Corrective advice: {ticket.answer}"
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Submit panel */}
              <form onSubmit={handleCreateTicket} className="space-y-2 text-[11px] font-mono">
                <div className="space-y-1">
                  <span className="text-slate-500 block text-[9.5px]">SUBMIT NEW STRUCTURAL BLOCKAGE DETAIL:</span>
                  <input 
                    type="text"
                    value={newTicketTitle}
                    onChange={(e) => setNewTicketTitle(e.target.value)}
                    placeholder="Submit a ticket description (e.g. 'Stripe Webhooks callback fails on production')"
                    className="w-full text-xs bg-slate-900 border border-[#14234c] p-2 rounded-xl text-slate-200 focus:outline-none focus:border-rose-500/50"
                  />
                </div>
                <div className="flex justify-between gap-3 pt-1">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500 text-[9.5px]">Triage priority:</span>
                    <select 
                      value={newTicketPriority}
                      onChange={(e) => setNewTicketPriority(e.target.value)}
                      className="bg-slate-950 text-xs border border-[#14234c] rounded p-0.5 text-indigo-400 font-bold"
                    >
                      <option value="LOW">LOW</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="HIGH">HIGH</option>
                    </select>
                  </div>
                  <button type="submit" className="p-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all cursor-pointer font-sans text-xs">
                    File Support Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sentry exception diagnostics log trace simulation */}
          <div className="lg:col-span-6 bg-[#0c1222] border border-[#14234c] rounded-2xl p-5 shadow-2 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#14234c] pb-2 text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4.5 h-4.5 text-rose-550 animate-pulse" />
                  <h4 className="text-xs font-bold text-white uppercase font-sans">Self-Diagnostic Health Tracer</h4>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-505/10 px-2 py-0.5 rounded border border-emerald-500/20">System Integrity 100%</span>
              </div>

              <div className="bg-[#050914] border border-[#121d3b] p-3.5 rounded-xl h-44 overflow-y-auto space-y-1 select-text pointer-events-auto scrollbar-thin">
                <span className="text-[9.5px] font-mono text-[#475569] block border-b border-[#14234c] pb-1 font-bold">LIVE TELEMETRY MONITOR INCOMING EVENTS CONNECTED:</span>
                
                <div className="text-[10px] font-mono text-[#cbd5e1] space-y-1">
                  <p className="text-slate-500">📡 [SYSTEM] telemetry sync connected.</p>
                  <p className="text-slate-500">🟢 [SUCCESS] all environment variables compiled correctly.</p>
                  <p className="text-cyan-405">✦ Next.js static asset caches loaded.</p>
                  <p className="text-[#a855f7]">✦ Supabase Postgres indexes scanned: 0 errors.</p>
                  <p className="text-emerald-455">✦ SameSite session cookies check completed: safe (True).</p>
                  <p className="text-cyan-305">⚡ Self diagnostic validation checks finalized.</p>
                </div>
              </div>

              <button 
                onClick={() => {
                  showToast("Performing complete system telemetry diagnostic analysis...");
                }}
                className="w-full text-center p-2 rounded-xl bg-[#050914]/80 border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 font-bold transition-all text-xs font-sans cursor-pointer"
              >
                Perform System-wide Self Diagnostics Health Scan
              </button>
            </div>
          </div>
        </section>


        {/* 6) FOOTER BAR */}
        <footer className="w-full border-t border-[#121c38] bg-[#070b14] pt-8 text-center flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-2">
            <div className="flex items-center gap-2">
              <h4 className="text-md font-black tracking-widest text-white font-sans uppercase">
                REEFSTACK <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">PRO+</span>
              </h4>
              <span className="text-[9px] font-mono border border-slate-700/60 p-0.5 px-1.5 rounded text-slate-500 uppercase">Architecture Core</span>
            </div>
            
            <p className="text-xs text-slate-400 max-w-xl font-bold tracking-tight uppercase">
              BUILD YOUR VISION. CODE YOUR FUTURE. SHIP TO THE WORLD.
            </p>
          </div>

          {/* Row of links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center font-mono text-xs text-slate-400">
            {[
              { name: "Docs", icon: BookOpen },
              { name: "Templates", icon: Layers3 },
              { name: "Community", icon: Users },
              { name: "Support", icon: LifeBuoy },
              { name: "Roadmap", icon: Compass },
              { name: "Updates", icon: RefreshCw },
            ].map(link => {
              const LinkIcon = link.icon;
              return (
                <a 
                  key={link.name} 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast(`Opened Resource Portal: ${link.name}!`);
                  }}
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-all font-bold cursor-pointer"
                >
                  <LinkIcon className="w-4 h-4 text-indigo-400" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>
        </footer>

        {/* Small copyright */}
        <div className="pt-2 text-center text-[10px] font-mono text-slate-650 tracking-wider">
          &copy; 2026 REEFSTACK INC. ALL RIGHTS RESERVED. CONFIGURED FOR PREMIUM WEB ECOSYSTEM PORTFOLIO AND ACTIVE CONTAINERIZED BUILDS.
        </div>

      </div>

      {/* PRICING PLANS DETAILS MODAL OVERLAYS */}
      <AnimatePresence>
        {activePricingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with smooth enter/exit animations */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePricingModal(null)}
              className="absolute inset-0 bg-[#020612]/85 backdrop-blur-md cursor-pointer"
            />

            {/* Centered Modal Container with scale/fade animations */}
            <motion.div 
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-[#0c1222] border border-cyan-500/40 p-6 md:p-8 rounded-2xl shadow-[0_0_35px_rgba(6,182,212,0.3)] z-10 text-left space-y-6"
            >
              {/* Close Button X */}
              <button 
                onClick={() => setActivePricingModal(null)}
                className="absolute top-4 right-4 p-1 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              {activePricingModal === 'starter' && (
                <div className="space-y-5">
                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded uppercase">STARTER PLAN</span>
                    <h3 className="text-2xl font-black font-sans text-white mt-1.5 uppercase">STARTER DETAILS</h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">Lightweight, direct local sandbox validation and blueprints exploration</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">FULL FEATURE SPECS:</h4>
                    <div className="space-y-2 text-xs font-mono text-slate-300">
                      {[
                        "Core React 19 & Next.js workspace configurations",
                        "Direct local environment code sandbox testing",
                        "Single-view app development scaffolding",
                        "Manual file imports & custom Blueprints repository integrations",
                        "Standard Edge Content Delivery Network (CDN) triggers",
                        "Access to comprehensive public community forums"
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#121d3b] pt-4">
                    <h4 className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2">PRICE BREAKDOWN:</h4>
                    <div className="space-y-1.5 text-xs font-mono text-slate-400 bg-slate-950/75 border border-[#14234c] p-3 rounded-lg">
                      <div className="flex justify-between">
                        <span>Developer Licensing Seat:</span>
                        <span className="text-emerald-400 font-bold">FREE ($0.00)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Base Sandbox DB Capacity:</span>
                        <span className="text-slate-300">1 Core Instance</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Support Quotas:</span>
                        <span className="text-slate-300">Community Forums</span>
                      </div>
                      <hr className="border-[#14234c] my-1" />
                      <div className="flex justify-between text-white font-bold">
                        <span>Estimated Total Bill:</span>
                        <span className="text-cyan-300">$0.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => {
                        setActivePricingModal(null);
                        showToast("Successfully initiated Starter plan workflows!");
                      }}
                      className="w-full text-center p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-white font-bold text-xs font-sans transition-all hover:bg-slate-800 cursor-pointer"
                    >
                      Get Started Free
                    </button>
                  </div>
                </div>
              )}

              {activePricingModal === 'pro' && (
                <div className="space-y-5">
                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded uppercase">PRO PLAN</span>
                    <h3 className="text-2xl font-black font-sans text-cyan-300 mt-1.5 uppercase">PRO DETAILS</h3>
                    <p className="text-xs text-slate-300 font-mono mt-1">High fidelity automated developer dashboards with all ecosystem layers</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">FULL FEATURE SPECS:</h4>
                    <div className="space-y-2 text-xs font-mono text-slate-200">
                      {[
                        "Continuous multi-view architecture layouts support",
                        "Complete AI Builder companion auto generation capabilities",
                        "Automatic cost-efficient database scale optimizations (42% savings)",
                        "Ultra-low latency content caching edge configurations (18% savings)",
                        "Deploy unlimited sandboxes seamlessly",
                        "Grounded AI advisory chatbots powered by Gemini API",
                        "High priority human developer helpdesk support tickets"
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#121d3b] pt-4">
                    <h4 className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2">PRICE BREAKDOWN:</h4>
                    <div className="space-y-1.5 text-xs font-mono text-slate-300 bg-slate-950/75 border border-[#14234c] p-3 rounded-lg">
                      <div className="flex justify-between">
                        <span>Seat Flat Licensing Fee:</span>
                        <span className="text-cyan-400">$29.00 / mo</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Database instances quota:</span>
                        <span className="text-slate-400">Unlimited sandbox nodes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ecosystem optimization discounts:</span>
                        <span className="text-emerald-400 font-bold">Enabled & Bundled</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ticketing priority SLAs:</span>
                        <span className="text-slate-400">Guaranteed response in under 2h</span>
                      </div>
                      <hr className="border-[#14234c] my-1" />
                      <div className="flex justify-between text-white font-bold">
                        <span>Estimated Total Bill:</span>
                        <span className="text-cyan-300">$29.00 / mo</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => {
                        setActivePricingModal(null);
                        showToast("Upgrade path registered! Welcome to Pro Level!");
                      }}
                      className="w-full text-center p-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs font-sans transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    >
                      Activate Pro Access
                    </button>
                  </div>
                </div>
              )}

              {activePricingModal === 'enterprise' && (
                <div className="space-y-5">
                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-purple-400 bg-purple-950/40 border border-purple-800/40 px-2.5 py-1 rounded uppercase">ENTERPRISE PLAN</span>
                    <h3 className="text-2xl font-black font-sans text-purple-300 mt-1.5 uppercase">ENTERPRISE DETAILS</h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">High-availability dedicated postgres clusters with SSO and custom legal SLAs</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">FULL FEATURE SPECS:</h4>
                    <div className="space-y-2 text-xs font-mono text-slate-300">
                      {[
                        "All security integrations (Postgres JWT Row-Level-Security, SSO / SAML)",
                        "Dedicated high IOPS cluster storage databases",
                        "Individually configured isolated Docker orchestration environments",
                        "24/7 dedicated telephone & instant Slack channel support lines",
                        "Legally backed 99.99% service availability guarantees",
                        "Assigned dedicated technical account manager & weekly reviews"
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#121d3b] pt-4">
                    <h4 className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2">PRICE BREAKDOWN:</h4>
                    <div className="space-y-1.5 text-xs font-mono text-slate-400 bg-slate-950/75 border border-[#14234c] p-3 rounded-lg">
                      <div className="flex justify-between">
                        <span>Bespoke cluster storage:</span>
                        <span className="text-slate-300">Variable (Quoted hourly)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Single-Sign-On integrations:</span>
                        <span className="text-slate-300">Included ($0 Setup fee)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Corporate custom compliance contracts:</span>
                        <span className="text-slate-300">Tailored individually</span>
                      </div>
                      <hr className="border-[#14234c] my-1" />
                      <div className="flex justify-between text-white font-bold">
                        <span>Estimated Total Bill:</span>
                        <span className="text-purple-400">Custom Quote / Contract</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => {
                        setActivePricingModal(null);
                        showToast("Enterprise inquiry ticket logged! We'll contact you in 24h.");
                      }}
                      className="w-full text-center p-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs font-sans transition-all cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    >
                      Submit Inquiry Call
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
