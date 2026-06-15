/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StackLayer, Upgrade, ExpandedLayer, Step, ProjectUseCase, DiagramNode, DiagramConnection } from '../types';

export const STACK_LAYERS: StackLayer[] = [
  {
    id: 1,
    name: "FRONTEND (WEB)",
    category: "frontend",
    technology: "Next.js & React (TypeScript)",
    subtitle: "The framework of choice for modern web apps",
    tags: ["React 19", "App Router", "Server Components", "SEO Optimized", "SSR / SSG / ISR", "PWA Ready"],
    features: [
      "Optimized Core Web Vitals for maximum SEO",
      "Streaming layout render with loading states",
      "Hybrid Static & Dynamic rendering on demand",
      "Native support for Server Actions & Server Components",
      "Full TS strict type safety out-of-the-box"
    ],
    color: "cyan",
    iconName: "Globe",
    codeSnippet: `// app/page.tsx
import { Suspense } from 'react';
import { ReefLogo } from '@/components/ReefLogo';
import { HeroSection } from '@/components/Hero';

export const metadata = {
  title: 'Next.js Scalable App',
  description: 'Built with ReefStack Pro+',
};

export default async function Page() {
  return (
    <main className="min-h-screen text-slate-100 bg-slate-950">
      <HeroSection title="ReefStack Powered Web" />
      <Suspense fallback={<div className="animate-pulse h-60 bg-blue-900/10" />}>
        <AsyncDashboardData />
      </Suspense>
    </main>
  );
}

async function AsyncDashboardData() {
  const stats = await fetch('https://api.supabase.co/rest/v1/metrics', {
    next: { revalidate: 3600 } // ISR Setup
  }).then(r => r.json());

  return <DataGrid items={stats} />;
}`
  },
  {
    id: 2,
    name: "MOBILE",
    category: "mobile",
    technology: "Expo & React Native",
    subtitle: "Deliver gorgeous native apps with one codebase",
    tags: ["iOS & Android", "One Codebase", "Expo Go Quick Dev", "Push Notifications", "OTA Updates", "Native Performance"],
    features: [
      "Access rich device hardware seamlessly",
      "Instant feedback with Fast Refresh development",
      "Over-the-air updates directly to users bypassing app stores",
      "Beautiful cross-platform native visual styling",
      "Robust pre-built SDKs for secure filesystem, camera, & sensors"
    ],
    color: "emerald",
    iconName: "Smartphone",
    codeSnippet: `// App.tsx
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';

export default function App() {
  React.useEffect(() => {
    // Request push notification permissions on boot
    Notifications.requestPermissionsAsync();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.card}>
        <Text style={styles.title}>ReefStack Mobile Client</Text>
        <Text style={styles.subtitle}>Expo & React Native Powered</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090d16', justifyContent: 'center' },
  card: { padding: 24, margin: 16, backgroundColor: '#111827', borderRadius: 12 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#10b981' },
  subtitle: { fontSize: 14, color: '#9ca3af', marginTop: 8 }
});`
  },
  {
    id: 3,
    name: "BACKEND & DATABASE",
    category: "backend",
    technology: "Supabase (PostgreSQL)",
    subtitle: "An open-source Firebase alternative with real SQL power",
    tags: ["PostgreSQL Engine", "Auth Built-In", "Realtime Streams", "Storage Buckets", "Vector Databases", "RLS Policies"],
    features: [
      "Row-Level Security (RLS) guaranteeing user isolation at database layer",
      "Realtime DB listening over WebSockets",
      "Scalable Serverless Edge Functions in TypeScript/Deno",
      "Vector store via pgvector for matching embeddings in AI flows",
      "Instantly generated SQL queries & GraphQL layers from client"
    ],
    color: "purple",
    iconName: "Database",
    codeSnippet: `-- Row-level security for database items
alter table profiles enable row level security;

create policy "Users can view own profiling data"
  on profiles for select
  using ( auth.uid() = id );

-- Create Realtime publication
create publication reef_realtime_pub for table transactions;

-- Add PGVector similarity search
create extension if not exists vector;
create table documents (
  id uuid primary key,
  content text,
  embedding vector(1536)
);`
  },
  {
    id: 4,
    name: "GAME ENGINE",
    category: "game",
    technology: "Godot Engine (Unity Optional)",
    subtitle: "Frictionless companion for 2D & 3D real-time apps",
    tags: ["2D & 3D", "GDScript & C#", "Lightweight App size", "Cross-Platform", "Asset Library", "Export Everywhere"],
    features: [
      "Under 100MB download speed, lightning fast startups",
      "Flexible node/scene-based architecture",
      "Rich tilemaps and real-time lighting capabilities",
      "Excellent WebGL/WebAssembly exports for browser play",
      "No revenue shares or royalty fees - 100% open source"
    ],
    color: "amber",
    iconName: "Gamepad2",
    codeSnippet: `# player.gd - Simple player controller in Godot
extends CharacterBody2D

const SPEED = 300.0
const JUMP_VELOCITY = -400.0

# Get gravity from project settings
var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta):
	# Add gravity
	if not is_on_floor():
		velocity.y += gravity * delta

	# Handle Jump
	if Input.is_action_just_pressed("ui_accept") and is_on_floor():
		velocity.y = JUMP_VELOCITY

	# Get input direction
	var direction = Input.get_axis("ui_left", "ui_right")
	if direction:
		velocity.x = direction * SPEED
	else:
		velocity.x = move_toward(velocity.x, 0, SPEED)

	move_and_slide()`
  },
  {
    id: 5,
    name: "AI LAYER",
    category: "ai",
    technology: "Gemini / OpenAI API",
    subtitle: "Integrate LLMs, computer vision, and workflows",
    tags: ["LLM Reasoning", "Embeddings Setup", "Prompt Templates", "Auto Code & UI", "Active Agents", "Function Calling"],
    features: [
      "Natural language user interactions directly within your apps",
      "Context-rich semantic search with pgvector + model embeddings",
      "Automated prompt systems for classification, analysis, & summarization",
      "Function calling mapping Gemini actions straight to API executions",
      "Generative image, text, audio, and code pipelines out-of-the-box"
    ],
    color: "blue",
    iconName: "Bot",
    codeSnippet: `// server/api/recommendation.ts - Gemini Integration
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
});

export async function recommendStackForProject(projectDescription: string) {
  const prompt = \`Recommend a custom ReefStack sub-architecture for: "\${projectDescription}".
  Suggest technologies, details, and workflow configs.\`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      temperature: 0.2,
      responseMimeType: "application/json",
      // ... provide structural formatting schema ...
    }
  });

  return response.text;
}`
  },
  {
    id: 6,
    name: "UI / DESIGN",
    category: "design",
    technology: "Tailwind CSS + shadcn/ui + Framer Motion",
    subtitle: "The absolute zenith of fluid desktop & mobile layout tools",
    tags: ["Tailwind Utility", "Radix UI Primitives", "Fluid Animations", "Responsive Scaling", "Dark Mode Default", "Unified Theme"],
    features: [
      "Utility-first Tailwind classes for zero runtime CSS bloat",
      "Copy-paste modular Radix UI structures with shadcn CLI",
      "Declarative physics-based user transitions with Framer Motion",
      "Preloaded tailwind themes mapped to CSS custom variables",
      "Full color consistency across dark and light systems"
    ],
    color: "pink",
    iconName: "Palette",
    codeSnippet: `// components/AnimatedCard.tsx
import { motion } from 'framer-motion';

interface Props {
  title: string;
  desc: string;
}

export function AnimatedCard({ title, desc }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="p-6 rounded-xl border border-slate-800 bg-slate-900 shadow-xl"
    >
      <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="mt-2 text-slate-400 text-sm">{desc}</p>
    </motion.div>
  );
}`
  },
  {
    id: 7,
    name: "PAYMENTS & BILLING",
    category: "billing",
    technology: "Stripe API & Webhooks",
    subtitle: "Monetize globally with reliable financial infrastructure",
    tags: ["User Subscriptions", "One-Time Checkout", "Stripe Webhooks", "Billing Portal", "SaaS Pricing Grid", "Multi-Currency"],
    features: [
      "Stripe checkout portal for fast and secure PCI-compliant payments",
      "Dynamic subscription pricing models (monthly, yearly, tiered)",
      "Secure API callback endpoints tracking custom subscription states",
      "Built-in localized currency, card, Apple Pay, & Google Pay options",
      "Self-service billing dashboard letting users pause or cancel plans"
    ],
    color: "indigo",
    iconName: "CreditCard",
    codeSnippet: `// api/stripe/checkout.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function createCheckoutSession(userId: string, priceId: string) {
  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: \`\${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}\`,
    cancel_url: \`\${process.env.APP_URL}/pricing\`,
    metadata: { userId },
  });
}`
  },
  {
    id: 8,
    name: "DEPLOYMENT",
    category: "deployment",
    technology: "Vercel & Expo EAS",
    subtitle: "Deploy web applications and native programs globally",
    tags: ["Continuous Vercel Hosting", "Mobile Native CDN", "EAS Cloud Compilation", "Automated Pipelines", "Zero Downtime Deploy", "Edge Caching"],
    features: [
      "Git-push-to-deploy web configurations with automatic preview builds",
      "Global serverless edge network resolving in <50ms dynamically",
      "Expo Application Services (EAS) compilation in the cloud",
      "Automatic custom domain SSL updates and DNS management",
      "Dynamic environment variables safely loaded on start"
    ],
    color: "sky",
    iconName: "Cloud",
    codeSnippet: `# vercel.json - Config routing
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ],
  "redirects": [
    { "source": "/old-route", "destination": "/new-route", "permanent": true }
  ]
}`
  },
  {
    id: 9,
    name: "ANALYTICS & MONITORING",
    category: "analytics",
    technology: "PostHog + Sentry",
    subtitle: "Track core application health and user action funnels",
    tags: ["Behavior Funnels", "Error Capture Sentry", "Session Recording", "Telemetry Tracking", "Performance Metrics", "Uptime Alerts"],
    features: [
      "Track custom UI buttons, active funnels, and click maps in real-time",
      "Complete user session replays identifying UX bugs and bottlenecks",
      "Catch serverless crash stacktraces with Sentry alerting immediately",
      "Analyze active usage, active user counts, and customer churn metrics",
      "Performance benchmarking across browsers and operating systems"
    ],
    color: "rose",
    iconName: "Activity",
    codeSnippet: `// utils/telemetry.ts
import posthog from 'posthog-js';
import * as Sentry from '@sentry/react';

export function initializeTelemetry() {
  posthog.init(process.env.VITE_POSTHOG_KEY!, {
    api_host: 'https://app.posthog.com',
    autocapture: true
  });

  Sentry.init({
    dsn: process.env.VITE_SENTRY_DSN,
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

export function trackUserAction(event: string, meta: Record<string, any>) {
  posthog.capture(event, meta);
}`
  },
  {
    id: 10,
    name: "AUTH & SECURITY",
    category: "auth",
    technology: "Supabase Auth + JWT Security",
    subtitle: "The security envelope locking down profiles and data layers",
    tags: ["OAuth & SSO logins", "Passwordless Magic", "MFA / 2FA Ready", "Row Isolation Security", "API Access Guards", "Abuse Shield"],
    features: [
      "Universal OAuth providers (Google, GitHub, Apple, Discord)",
      "Zero-password authentication with instant secure email Magic Links",
      "Multi-factor auth configurations natively managed inside user dashboards",
      "Encrypted JSON Web Tokens (JWT) passing profile ownership cleanly",
      "Rate-limiters and bot prevention guarding public custom endpoints"
    ],
    color: "teal",
    iconName: "ShieldAlert",
    codeSnippet: `// components/LoginForm.tsx
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMagicLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + '/dashboard' }
    });
    alert('Magic link has been sent!');
    setLoading(false);
  };

  return <form onSubmit={handleMagicLogin}>...</form>;
}`
  }
];

export const UPGRADES: Upgrade[] = [
  {
    id: "ai_builder",
    title: "AI BUILDER SUITE",
    description: "Generate applications, clean backend structures, layouts and visual interfaces from user descriptions.",
    iconName: "Sparkles",
    badge: "NEW",
    details: "Combines strict Prompt Templates with Gemini-3.5-flash structural capabilities to spit out boilerplates immediately matching Next.js + Tailwind layout conventions."
  },
  {
    id: "game_creation",
    title: "GAME CREATION SUITE",
    description: "Create interactive dialogs, item databases, quest tracking systems, or custom sprites automatically.",
    iconName: "Wand2",
    details: "Export layouts, map systems, and level templates natively format-compatible to launch in your companion Godot engine scenes."
  },
  {
    id: "automation_workflow",
    title: "AUTOMATION WORKFLOW",
    description: "Set tasks running inside Deno runtime edge workers executing cron loops and scheduled events.",
    iconName: "Boxes",
    details: "Configure routine synchronization jobs, report dispatch timings, or auto-scale asset rendering loops completely serverless."
  },
  {
    id: "team_collab",
    title: "TEAM & COLLABORATION",
    description: "Built-in organization schema support granting isolated administrative dashboards and role profiles.",
    iconName: "Users",
    details: "Supports custom user domains, invite-only signup flow gates, and audit trails recorded for all server modifications."
  },
  {
    id: "headless_cms",
    title: "HEADLESS CMS",
    description: "Manage app assets, copy, landing configurations, and updates through database-driven interfaces.",
    iconName: "FileText",
    details: "Let non-technical staff make live modifications to blogs, tutorials, pricing structures, or items securely."
  },
  {
    id: "i18n",
    title: "INTERNATIONALIZATION",
    description: "Seamless translation libraries storing localized configurations for target market audiences.",
    iconName: "Languages",
    details: "Route custom browser locales natively, fetch content catalogs based on IP headers, and adjust script layout directions smoothly."
  },
  {
    id: "offline_sync",
    title: "OFFLINE SUPPORT",
    description: "Cache crucial assets and queue user mutations to sync only when a persistent link returns.",
    iconName: "WifiOff",
    details: "Utilizes client-side indexDB structures and ServiceWorkers to keep the UI running at blazing fast offline states without freezes."
  },
  {
    id: "plugins",
    title: "PLUGINS & EXTENSIONS",
    description: "Enrich the core dashboard ecosystem with community modules or build customized API nodes easily.",
    iconName: "Puzzle",
    details: "Utilize modular entry exports enabling standard callbacks to transform content, intercept requests, or broadcast webhooks."
  }
];

export const EXPANDED_LAYERS: ExpandedLayer[] = [
  {
    letter: "A",
    name: "AI BUILDER LAYER",
    color: "from-fuchsia-500/20 to-pink-500/10",
    features: [
      { name: "App Idea Generator", description: "Flesh out vague concepts into precise features" },
      { name: "Auto Code Generator", description: "Generates boilerplate, APIs, and hooks" },
      { name: "UI / Layout Generator", description: "Exports Tailwind grids and micro-interactions" },
      { name: "Debug & Fix Agent", description: "Reviews logs to find stacktrace breaks" },
      { name: "Prompt Library", description: "Pre-tested queries for code, games, and layout" },
      { name: "AI Test Generator", description: "Drafts comprehensive Vitest and Playwright cases" },
      { name: "Documentation AI", description: "Drafts clean markdown setups for teams" }
    ]
  },
  {
    letter: "B",
    name: "DESIGN LAYER",
    color: "from-blue-500/20 to-cyan-500/10",
    features: [
      { name: "Figma Integration", description: "Figma REST API styles mapping to Tailwind" },
      { name: "Canvas & Brand Assets", description: "Auto-formats logo assets from vector guidelines" },
      { name: "Logo & Brand Kit", description: "Creates custom svg asset palettes based on brand keywords" },
      { name: "Icon Library", description: "Unified, lightweight Lucide and Radix components" },
      { name: "Mockup Generator", description: "Presents apps framed on modern devices in real-time" },
      { name: "Screenshot Builder", description: "Automates App Store promotional slides production" },
      { name: "Color Palette Tools", description: "Ensures contrast compliance dynamically" }
    ]
  },
  {
    letter: "C",
    name: "GAME CREATION LAYER",
    color: "from-amber-500/20 to-orange-500/10",
    features: [
      { name: "Game Templates", description: "Platformers, RPG, and card battle presets" },
      { name: "Asset Packs", description: "Pre-made sprites, tiles, and sounds ready for game logic" },
      { name: "Sprite Generator", description: "Generates sheet sprites using fine-tuned models" },
      { name: "Dialogue AI", description: "Exports complex dialogue nodes to Godot script files" },
      { name: "Level Builder", description: "Generates tile maps and layouts algebraically" },
      { name: "Quest System", description: "Auto-manages active quests, items, and XP rewards" },
      { name: "Save / Load System", description: "Encrypted offline save game file persistence" }
    ]
  },
  {
    letter: "D",
    name: "BUSINESS LAYER",
    color: "from-emerald-500/20 to-teal-500/10",
    features: [
      { name: "Admin Dashboard", description: "Full workspace metrics tracking panel" },
      { name: "User Management", description: "Control permission grants, locks, and active states" },
      { name: "Customer Database", description: "Secure CRM logging transactions and history logs" },
      { name: "Email Marketing", description: "Newsletter template broadcasts and analytics" },
      { name: "Credit System", description: "Tokens system for pay-as-you-go APIs integration" },
      { name: "Affiliate System", description: "Generates promotional codes tracking sales conversions" },
      { name: "Reports & Insights", description: "Aggregates revenue metrics and financial summaries" }
    ]
  },
  {
    letter: "E",
    name: "AUTOMATION LAYER",
    color: "from-violet-500/20 to-purple-500/10",
    features: [
      { name: "AI Agents", description: "Task-oriented processes running background actions" },
      { name: "GitHub Actions", description: "CI/CD checks testing code on every push cycle" },
      { name: "Scheduled Tasks", description: "Configures recurring workflows (daily emails, etc.)" },
      { name: "Cron Jobs", description: "Deno Edge Cron scheduling simple functions" },
      { name: "Auto Deploy", description: "Automates releases upon tests resolving as green" },
      { name: "Bug Reports", description: "Intercepts errors logging issues on Discord" },
      { name: "Content Generation", description: "Updates landing news pages with search insights" }
    ]
  },
  {
    letter: "F",
    name: "STORAGE & MEDIA LAYER",
    color: "from-indigo-500/20 to-violet-500/10",
    features: [
      { name: "Supabase Storage", description: "Secure storage for user-uploaded profiles and bills" },
      { name: "Cloudflare R2", description: "Blazing fast global object store with zero egress fees" },
      { name: "Image Uploads", description: "Auto-scales formats (WebP resizing) on upload events" },
      { name: "Video Uploads", description: "Segmented video conversion to HLS/DASH streams" },
      { name: "Audio Uploads", description: "Optimizes dialogue and audio recordings seamlessly" },
      { name: "Asset Library", description: "Searchable workspace directory organizing files" },
      { name: "CDN Delivery", description: "Edge networks caching outputs globally in <30ms" }
    ]
  },
  {
    letter: "G",
    name: "TESTING LAYER",
    color: "from-rose-500/20 to-red-500/10",
    features: [
      { name: "Playwright (E2E)", description: "Automated browser clicks testing key flows" },
      { name: "Vitest (Unit Tests)", description: "Fast, isolated checks verifying small utilities" },
      { name: "Game Test Checklist", description: "Manual and routine triggers validating build files" },
      { name: "Mobile Testing", description: "Simulates Android/iOS screen resolutions" },
      { name: "Performance Tests", description: "Flags regressions slowing main render paint events" },
      { name: "Error Monitoring", description: "Saves client failures logs detailing state bugs" },
      { name: "Accessibility Tests", description: "Guarantees proper contrast and screenreader support" }
    ]
  },
  {
    letter: "H",
    name: "LAUNCH LAYER",
    color: "from-yellow-500/20 to-amber-500/10",
    features: [
      { name: "Landing Page Builder", description: "High-speed custom landing structures" },
      { name: "Waitlist System", description: "Capture prospective emails with countdown timers" },
      { name: "SEO Tools", description: "Injects robust schema meta to rank in Google search" },
      { name: "Sitemap Generator", description: "Autobuilds sitemap XML indexes for indexing bots" },
      { name: "Press Kit", description: "Beautiful ready-made assets packages for magazines" },
      { name: "Social Content Kit", description: "Generates custom promotional layouts for X/LinkedIn" },
      { name: "App Store Prep", description: "Compliance checks validation files before store uploads" }
    ]
  }
];

export const HOW_TO_STEPS: Step[] = [
  {
    number: 1,
    title: "IDEA",
    action: "Define your project",
    description: "Write out requirements, determine scope, and visualize target audiences.",
    details: "Select the 'Project Builder' tool in our dashboard to summarize your concept. The built-in AI assistant will flesh out the necessary ReefStack modules.",
    iconName: "Lightbulb"
  },
  {
    number: 2,
    title: "PLAN",
    action: "Design the logic flow",
    description: "Select layers, model routing pathways, and document secure API boundaries.",
    details: "Choose where user data resides, pick authenticators (Supabase Auth vs Apple ID), choose Stripe pricing loops, and identify necessary AI integrations.",
    iconName: "FileSpreadsheet"
  },
  {
    number: 3,
    title: "BUILD",
    action: "Scaffold structures",
    description: "Use our interactive modules to export boilerplate and write clean code blocks.",
    details: "Initialize Next.js frontend pages, mount the mobile App screens, and deploy Supabase server schema migrations with ready-made row level security definitions.",
    iconName: "Hammer"
  },
  {
    number: 4,
    title: "TEST",
    action: "Check reliability",
    description: "Run unit cases, perform edge-cases simulation, and observe Sentry metrics.",
    details: "Deploy Playwright browsers to search for page errors. Check layouts rendering at both smartphone dimensions and ultra-wide settings.",
    iconName: "CheckSquare"
  },
  {
    number: 5,
    title: "DEPLOY",
    action: "Git Push to Production",
    description: "Deploy Next.js code folders to Vercel and native mobile projects on EAS.",
    details: "Vercel registers a git hook trigger initiating instant production builds. EAS compiles and signs Android APKs or Apple IPAs in the cloud automatically.",
    iconName: "Rocket"
  },
  {
    number: 6,
    title: "LAUNCH",
    action: "Open gates to users",
    description: "Broadcast on ProductHunt, trigger waitlist emails, and track conversion events.",
    details: "Activate PostHog logs capturing the live user registration actions. Ensure CDN configs are warmed up to stream assets lightning-fast.",
    iconName: "Megaphone"
  },
  {
    number: 7,
    title: "GROW",
    action: "Analyze and Refine",
    description: "Iterate features based on data metrics, monetize tiers, and optimize code.",
    details: "Review user funnels within PostHog to spot checkout drop-offs. Use Gemini API analysis feedback to dynamically balance compute loads or add AI-agent automations.",
    iconName: "TrendingUp"
  }
];

export const USE_CASES: ProjectUseCase[] = [
  {
    title: "AI SaaS Platform",
    style: "fuchsia",
    iconName: "Bot",
    description: "A subscription software utilizing LLMs to summarize user files and write clean blogs.",
    suggestedStack: {
      frontend: "Next.js (React Server Components)",
      backend: "Supabase (Profiles, docs database, pgvector)",
      ai: "Gemini API (Reasoning / generation models)",
      ui: "Tailwind CSS + shadcn/ui components",
      payments: "Stripe Subscriptions (Monthly Premium Tier)",
    }
  },
  {
    title: "Modern E-Commerce Store",
    style: "emerald",
    iconName: "ShoppingBag",
    description: "Ultra-fast catalog matching user reviews, instant search, and lightning checkouts.",
    suggestedStack: {
      frontend: "Next.js (ISR Dynamic catalog routes)",
      backend: "Supabase (Products, reviews database & Storage)",
      ai: "Gemini Embeddings (Dynamic product recommendation search)",
      ui: "Tailwind CSS Layout components",
      payments: "Stripe checkout API (Apple & Google Pay enabled)"
    }
  },
  {
    title: "Real-Time Mobile Game",
    style: "amber",
    iconName: "Gamepad2",
    description: "An arcade multiplayer game with global highscores and custom digital badges purchases.",
    suggestedStack: {
      frontend: "Expo & React Native Mobile wrapper",
      backend: "Supabase Database (User login, profile profiles & Storage)",
      gameEngine: "Godot (WebGL web export + native compile)",
      ai: "LLM Dialogues (Dynamic NPC conversation logs)",
      ui: "Tailwind Native styled layouts",
      payments: "Stripe One-Time purchases (In-app tokens)"
    }
  }
];

export const DIAGRAM_NODES: DiagramNode[] = [
  { id: "users", label: "USERS", type: "user", description: "Web, Mobile, Gamers, & Admins executing actions", techs: ["Web Users", "Mobile Clients", "Gamers", "Admins"] },
  { id: "frontend_web", label: "FRONTEND (WEB)", type: "frontend", description: "Next.js & React single-page app served from edge", techs: ["Next.js", "React Components", "Vercel CDN"] },
  { id: "frontend_mobile", label: "MOBILE (CLIENT)", type: "mobile", description: "Native Expo & React Native smartphone views", techs: ["Expo", "React Native", "EAS Cloud"] },
  { id: "api_layer", label: "API LAYER", type: "api", description: "Routing gates, WebSockets gateway & serverless callbacks", techs: ["REST / GraphQL", "Edge Workers", "WebSockets"] },
  { id: "supabase", label: "SUPABASE", type: "backend", description: "Database engine, isolated structures & secure storage", techs: ["Auth Engine", "PostgreSQL", "RLS Polices"] },
  { id: "ai_layer", label: "AI LAYER (GEMINI)", type: "ai", description: "Durable reasoning pipelines and embeddings checks", techs: ["Gemini-3.5-flash", "googleSearch API", "Vector PGVector"] },
  { id: "stripe", label: "STRIPE", type: "payments", description: "Payment processing gateway resolving plans states", techs: ["Checkouts", "Webhooks callback", "Customer billing"] },
  { id: "storage", label: "ASSETS STORAGE", type: "storage", description: "Global object stores holding images, videos & code binaries", techs: ["Supabase Buckets", "Cloudflare R2 RLS"] },
  { id: "deploy", label: "DEPLOYMENT", type: "deployment", description: "Live orchestration pipelines delivering code instantly", techs: ["Vercel Edge", "Expo EAS", "Game Store packages"] }
];

export const DIAGRAM_CONNECTIONS: DiagramConnection[] = [
  { from: "users", to: "frontend_web", label: "Access Site", animated: true },
  { from: "users", to: "frontend_mobile", label: "Launch App", animated: true },
  { from: "frontend_web", to: "api_layer", label: "API Calls", animated: true },
  { from: "frontend_mobile", to: "api_layer", label: "API Calls", animated: true },
  { from: "api_layer", to: "supabase", label: "DB query", animated: true },
  { from: "supabase", to: "ai_layer", label: "Fetch embeddings", animated: false },
  { from: "supabase", to: "stripe", label: "Sync subscription", animated: false },
  { from: "supabase", to: "storage", label: "Fetch files", animated: false },
  { from: "deploy", to: "frontend_web", label: "Continuous deploy", animated: false },
  { from: "deploy", to: "frontend_mobile", label: "EAS build", animated: false }
];
