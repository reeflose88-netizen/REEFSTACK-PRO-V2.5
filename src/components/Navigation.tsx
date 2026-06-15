/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Compass, 
  Cpu, 
  Layers, 
  Terminal, 
  BookOpen, 
  Layers3, 
  Users, 
  LifeBuoy, 
  GitMerge, 
  RefreshCw, 
  HelpCircle,
  Gem
} from 'lucide-react';

interface NavigationProps {
  currentView: 'dashboard' | 'diagram' | 'builder' | 'features';
  onViewChange: (view: 'dashboard' | 'diagram' | 'builder' | 'features') => void;
  selectedCount: number;
}

export function Navigation({ currentView, onViewChange, selectedCount }: NavigationProps) {
  return (
    <header id="reef-header" className="sticky top-0 z-40 w-full border-b border-blue-950/60 bg-slate-950/80 backdrop-blur-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand details */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-700 to-indigo-800 shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-400/30">
            <Cpu className="w-5 h-5 text-cyan-200 animate-pulse" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black font-sans tracking-wide bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                REEFSTACK <span className="font-light text-slate-100">PRO+</span>
              </h1>
              <span className="text-[10px] font-bold tracking-widest px-2 py-0.5 bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 rounded-full">
                v2.5
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              The Ultimate App & Game Construction Engine
            </p>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav aria-label="Main Navigation" className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800/80">
          <button
            id="nav-btn-dashboard"
            onClick={() => onViewChange('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              currentView === 'dashboard'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            10-Layer Stack
          </button>
          
          <button
            id="nav-btn-diagram"
            onClick={() => onViewChange('diagram')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              currentView === 'diagram'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <GitMerge className="w-3.5 h-3.5" />
            System Integration Flow
          </button>

          <button
            id="nav-btn-builder"
            onClick={() => onViewChange('builder')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all relative ${
              currentView === 'builder'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-amber-400/90" />
            AI Architect & Sandbox
            {selectedCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[9px] font-bold px-1.5 py-0.5 bg-indigo-500 text-slate-100 rounded-full animate-bounce">
                {selectedCount}
              </span>
            )}
          </button>

          <button
            id="nav-btn-features"
            onClick={() => onViewChange('features')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              currentView === 'features'
                ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            <Layers3 className="w-3.5 h-3.5" />
            Expanded Layers
          </button>
        </nav>

        {/* Badges system */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] font-bold text-slate-400">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-900 border border-slate-800 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ACTIVE WORKSPACE
          </div>
        </div>

      </div>
    </header>
  );
}

export function FooterLinks({ onLinkClick }: { onLinkClick?: (name: string) => void }) {
  const links = [
    { name: "Docs & APIs", icon: BookOpen, url: "#" },
    { name: "SaaS Templates", icon: Layers3, url: "#" },
    { name: "Discord Alliance", icon: Users, url: "#" },
    { name: "Active Support", icon: LifeBuoy, url: "#" },
    { name: "2026 Roadmap", icon: Compass, url: "#" },
    { name: "Engine Updates", icon: RefreshCw, url: "#" }
  ];

  return (
    <footer id="reef-footer" className="mt-16 w-full border-t border-blue-950/60 bg-slate-950 px-4 py-8 text-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left">
          <h4 className="text-sm font-bold text-slate-200">REEFSTACK PRO+ Architecture Engine</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-md">
            The standard stack framework curated for production-grade React web portfolios, native smartphones packaging, serverless database synchronization, and local game engines.
          </p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center">
          {links.map((link) => {
            const IconComponent = link.icon;
            return (
              <li key={link.name}>
                <a 
                  href={link.url} 
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-300 hover:scale-105 active:scale-95 transition-all duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onLinkClick) {
                      onLinkClick(link.name);
                    }
                  }}
                >
                  <IconComponent className="w-3.5 h-3.5 text-blue-400" />
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="text-[10px] font-mono text-slate-500 mt-8">
        &copy; 2026 REEFSTACK Inc. All rights reserved. Registered for AI Studio build sandbox environment.
      </p>
    </footer>
  );
}
