/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DIAGRAM_NODES, DIAGRAM_CONNECTIONS } from '../data/stackData';
import { DiagramNode } from '../types';
import { IconResolver } from './IconResolver';
import { Network, ArrowRight, GitBranch, Terminal, RefreshCw, Layers } from 'lucide-react';
import { motion } from 'motion/react';

export function InteractiveDiagram() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('supabase');

  const selectedNode = DIAGRAM_NODES.find(n => n.id === selectedNodeId) || DIAGRAM_NODES[0];

  // Helper to determine if a connection highlights based on selected node
  const isConnectionHighlighted = (from: string, to: string) => {
    return from === selectedNodeId || to === selectedNodeId;
  };

  const getFlowExplanation = (nodeId: string) => {
    switch (nodeId) {
      case 'users':
        return {
          title: "Audience Entrypoint",
          description: "All client classes route requests. Gamers trigger Godot RPC queries, standard web users fetch Next.js chunks, and smartphone devices receive Expo EAS pipelines.",
          recommendation: "Ensure PostHog tracks early visitor registration funnels and Sentry checks browser compatibility."
        };
      case 'frontend_web':
        return {
          title: "Vercel Next.js Rendering Engine",
          description: "Serves standard static layouts. Executes Server Actions, proxies API keys to keep them invisible from browser consoles, and utilizes Incremental Static Regeneration (ISR).",
          recommendation: "Load environments via Vercel Panel settings, defaulting compile modes to TypeSafe configurations."
        };
      case 'frontend_mobile':
        return {
          title: "Expo Native Interface",
          description: "Provides smartphone code files. Compiles native modules for camera, local sqlite persistence, and bluetooth, and requests background push authorization.",
          recommendation: "Manage OTA update checks in main App.tsx to bypass app store delays during quick bugfixes."
        };
      case 'api_layer':
        return {
          title: "Serverless Gateway & WebSockets Channel",
          description: "Directs CRUD queries straight from Next.js endpoints or mobile app stores. Houses realtime socket subscribers and executes high-level billing webhooks.",
          recommendation: "Establish schema routes inside clean Express endpoints such like server.js to bypass CORS constraints."
        };
      case 'supabase':
        return {
          title: "Supabase Central Storage Core",
          description: "The PostgreSQL heart of your environment. Controls permissions with native Row-Level Security, keeps files inside storage buckets, and handles real-time data sync broadcasts.",
          recommendation: "Enable RLS policies immediately on user creation, guarding tables using auth.uid() comparisons."
        };
      case 'ai_layer':
        return {
          title: "AIS AI Layer (Gemini Logic)",
          description: "Injects advanced natural language logic. Parses document uploads, structures semantic search coordinates using PGVector, and automates AI text summaries.",
          recommendation: "Leverage gemini-3.5-flash since its massive context capability manages complex workflow files easily."
        };
      case 'stripe':
        return {
          title: "Stripe Monetary Infrastructure",
          description: "Manages subscription pricing tiers. Processes global customer credit card transactions, triggers webhook payouts alerts, and displays invoices self-service portals.",
          recommendation: "Map user profiles metadata directly inside custom metadata fields when creating checkouts sessions."
        };
      case 'storage':
        return {
          title: "Dynamic Media Storage Storage Layers",
          description: "Hosts system-critical file attachments, game spritesheet layouts, and avatar uploads. Leverages Cloudflare R2 structure to save egress costs.",
          recommendation: "Expose public folders only for generic elements, keeping database-matching folders carefully behind RLS."
        };
      case 'deploy':
        return {
          title: "Continuous Automated Orchestration",
          description: "Continuous delivery channels resolving git push events. Compiles both web pages (Vercel Node CDN) and compiled mobile packages (Expo EAS cloud engines).",
          recommendation: "Include rigorous Vitest and Playwright regression checks in GitHub actions hooks before running staging deploys."
        };
      default:
        return {
          title: "Operational Module",
          description: "An integral sector of the ReefStack ecosystem orchestrating secure, high-density, automated services.",
          recommendation: "Review the system layer's detailed code blocks for exact API parameters."
        };
    }
  };

  const details = getFlowExplanation(selectedNodeId);

  return (
    <div id="interactive-diagram-workspace" className="space-y-6">
      
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 id="diagram-heading" className="text-xl font-bold font-sans text-slate-100 flex items-center gap-2">
            <Network className="w-5 h-5 text-indigo-400" />
            Core Integration Flow Visualizer
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            ReefStack is architected to eliminate architectural friction. Click nodes below to trace API pathways, storage queries, and billing callbacks.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[10px] font-mono font-bold text-slate-400">SELECT NODE TO TRAVERSE PATHWAYS</span>
        </div>
      </div>

      {/* Main workspace layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: The Visual Schema Map */}
        <div className="lg:col-span-8 bg-slate-950 border border-blue-950/65 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[500px]">
          
          {/* Subtle tech grid background element */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
          
          {/* Simulated node connection flow diagram */}
          <div className="relative z-10 grid grid-cols-3 gap-y-12 gap-x-6">
            
            {/* Row 1: Entrance Users & Deployment controls */}
            <div className="col-span-3 flex justify-between items-center px-4">
              {/* User Block */}
              <button
                id="node-users-btn"
                onClick={() => setSelectedNodeId('users')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  selectedNodeId === 'users'
                    ? 'border-indigo-400 bg-indigo-950/30 shadow-[0_0_20px_rgba(129,140,248,0.2)]'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="p-1 px-2 text-[9px] font-bold font-mono bg-indigo-500/10 text-indigo-400 rounded">TARGETS</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <h4 className="font-sans font-bold text-sm text-slate-100 mt-1">CLIENT AUDIENCES</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">Webs / Mobiles / Gamers</p>
              </button>

              {/* Deployment Engine */}
              <button
                id="node-deploy-btn"
                onClick={() => setSelectedNodeId('deploy')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  selectedNodeId === 'deploy'
                    ? 'border-sky-400 bg-sky-950/30 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="p-1 px-2 text-[9px] font-bold font-mono bg-sky-500/10 text-sky-400 rounded">CI/CD</span>
                </div>
                <h4 className="font-sans font-bold text-sm text-slate-100 mt-1">ORCHESTRATION</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">Vercel & Expo EAS</p>
              </button>
            </div>

            {/* Row 2: Frontends channels */}
            <div className="col-span-3 grid grid-cols-2 gap-4 px-12">
              <button
                id="node-frontend_web-btn"
                onClick={() => setSelectedNodeId('frontend_web')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  selectedNodeId === 'frontend_web'
                    ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <h4 className="font-sans font-bold text-sm text-cyan-300">Next.js & React</h4>
                <p className="text-[10px] text-slate-400">Desktop / Web Site</p>
                <div className="mt-2 flex gap-1">
                  <span className="text-[8px] bg-slate-950 px-1 py-0.5 rounded text-slate-400 font-mono">App Router</span>
                  <span className="text-[8px] bg-slate-950 px-1 py-0.5 rounded text-slate-400 font-mono">ISR Ready</span>
                </div>
              </button>

              <button
                id="node-frontend_mobile-btn"
                onClick={() => setSelectedNodeId('frontend_mobile')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  selectedNodeId === 'frontend_mobile'
                    ? 'border-emerald-400 bg-emerald-950/30 shadow-[0_0_20px_rgba(52,211,153,0.2)]'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <h4 className="font-sans font-bold text-sm text-emerald-300">Expo Native</h4>
                <p className="text-[10px] text-slate-400">iOS & Android Pack</p>
                <div className="mt-2 flex gap-1">
                  <span className="text-[8px] bg-slate-950 px-1 py-0.5 rounded text-slate-400 font-mono">Expo Go</span>
                  <span className="text-[8px] bg-slate-950 px-1 py-0.5 rounded text-slate-400 font-mono">OTA Push</span>
                </div>
              </button>
            </div>

            {/* Row 3: API Gateway block */}
            <div className="col-span-3 flex justify-center">
              <button
                id="node-api_layer-btn"
                onClick={() => setSelectedNodeId('api_layer')}
                className={`p-4 rounded-xl border text-center cursor-pointer transition-all max-w-[280px] w-full ${
                  selectedNodeId === 'api_layer'
                    ? 'border-blue-400 bg-blue-950/30 shadow-[0_0_20px_rgba(96,165,250,0.2)]'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <span className="text-[8px] font-bold font-mono tracking-widest text-slate-400 uppercase bg-slate-950 px-2 py-0.5 rounded">
                  API ROUTING TUNNEL
                </span>
                <h4 className="font-sans font-black text-xs text-slate-100 mt-1">REST / GraphQL / Edge Functions</h4>
              </button>
            </div>

            {/* Row 4: Core Supabase database connected to Billing, Storage and AI Layer */}
            <div className="col-span-3 grid grid-cols-12 gap-2 items-center px-4">
              
              {/* Left sidebar: AI Layer */}
              <div className="col-span-4">
                <button
                  id="node-ai_layer-btn"
                  onClick={() => setSelectedNodeId('ai_layer')}
                  className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedNodeId === 'ai_layer'
                      ? 'border-fuchsia-400 bg-fuchsia-950/30'
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900'
                  }`}
                >
                  <h4 className="font-sans font-bold text-xs text-fuchsia-400">AIS WORKSPACE AI</h4>
                  <p className="text-[9px] text-slate-400 leading-none mt-1">Gemini API Framework</p>
                </button>
              </div>

              {/* Center: PostgreSQL Supabase */}
              <div className="col-span-4">
                <button
                  id="node-supabase-btn"
                  onClick={() => setSelectedNodeId('supabase')}
                  className={`w-full p-4 rounded-2xl border text-center cursor-pointer transition-all relative overflow-hidden ${
                    selectedNodeId === 'supabase'
                      ? 'border-emerald-400 bg-emerald-950/30 shadow-[0_0_30px_rgba(52,211,153,0.3)]'
                      : 'border-slate-800 bg-slate-900/70 hover:bg-slate-900'
                  }`}
                >
                  <div className="absolute top-1 right-1 flex h-2 w-2 select-none">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  
                  <span className="text-[8px] font-bold tracking-widest text-slate-500">POSTGRES ENGINE</span>
                  <h4 className="font-sans font-black text-md text-emerald-400 tracking-wide mt-0.5">SUPABASE</h4>
                  <p className="text-[9px] text-slate-400 font-mono mt-0.5">Auth / DB / Realtime</p>
                </button>
              </div>

              {/* Right: Stripe Billing & Media Storage stack */}
              <div className="col-span-4 space-y-2">
                <button
                  id="node-stripe-btn"
                  onClick={() => setSelectedNodeId('stripe')}
                  className={`w-full p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedNodeId === 'stripe'
                      ? 'border-indigo-400 bg-indigo-950/30'
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900'
                  }`}
                >
                  <h4 className="font-sans font-bold text-xs text-indigo-400">STRIPE</h4>
                  <p className="text-[9px] text-slate-400 leading-none">Billing & Subs</p>
                </button>

                <button
                  id="node-storage-btn"
                  onClick={() => setSelectedNodeId('storage')}
                  className={`w-full p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedNodeId === 'storage'
                      ? 'border-teal-400 bg-teal-950/30'
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900'
                  }`}
                >
                  <h4 className="font-sans font-bold text-xs text-teal-400">R2 / BUCKETS</h4>
                  <p className="text-[9px] text-slate-400 leading-none">Assets Storage</p>
                </button>
              </div>

            </div>

          </div>

          {/* Connective arrows explained */}
          <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span>🔌 Visual paths illustrate request loops</span>
            <span>💡 Select other blocks to test connections</span>
          </div>

        </div>

        {/* Right: Selected Node Detailed Diagnostics Panel */}
        <div className="lg:col-span-4 border border-blue-950/65 bg-slate-950 rounded-2xl p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          
          <div className="space-y-4">
            
            {/* Visual Header */}
            <div className="flex items-center gap-2">
              <span className="p-1 px-2 text-[9px] font-mono font-bold bg-blue-600/10 text-cyan-400 rounded-lg border border-cyan-500/20 uppercase">
                {selectedNode.type} MODULE
              </span>
              <span className="text-slate-500 font-mono text-xs">DIAGNOSTIC STATUS: OK</span>
            </div>

            {/* Title & Body */}
            <div>
              <h3 className="text-xl font-bold font-sans text-slate-100 flex items-center gap-2">
                {details.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-2.5 bg-slate-900/40 p-4 rounded-xl border border-slate-900 text-left">
                {details.description}
              </p>
            </div>

            {/* Standard Technologies list */}
            {selectedNode.techs && (
              <div className="space-y-2 text-left">
                <span className="text-[10px] font-mono font-bold text-slate-400">BLUEPRINT TECHNOLOGIES:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.techs.map((t, i) => (
                    <span key={i} className="text-xs font-mono px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md text-slate-200">
                      ⚙️ {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Advice panel */}
            <div className="p-4 rounded-xl bg-indigo-950/15 border border-indigo-500/25 space-y-1 text-left">
              <span className="text-[9px] font-mono font-bold text-indigo-400 block tracking-widest uppercase">
                ENGINE RECOMMENDATION:
              </span>
              <p className="text-xs text-indigo-200 leading-relaxed">
                {details.recommendation}
              </p>
            </div>

          </div>

          {/* Quick tips action panel */}
          <div className="pt-4 border-t border-slate-900 flex justify-between items-center text-xs text-slate-400">
            <span>⚡️ Zero latency callbacks</span>
            <button
              id="view-stack-panel-nav"
              onClick={() => {
                alert(`Traversing system config details for: ${selectedNode.label}. Loading templates variables settings...`);
              }}
              className="text-cyan-300 font-bold hover:underline flex items-center gap-1"
            >
              Configure sandbox
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
