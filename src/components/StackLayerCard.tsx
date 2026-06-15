/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { STACK_LAYERS } from '../data/stackData';
import { StackLayer } from '../types';
import { IconResolver } from './IconResolver';
import { Check, Copy, Code2, Sliders, ExternalLink, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';

interface StackLayerCardProps {
  selectedLayerIds: number[];
  toggleLayerSelection: (id: number) => void;
}

interface TiltCardProps {
  key?: number;
  layer: StackLayer;
  isActive: boolean;
  isSelected: boolean;
  setActiveLayerId: React.Dispatch<React.SetStateAction<number>> | ((id: number) => void);
  toggleLayerSelection: (id: number) => void;
  colors: {
    border: string;
    bg: string;
    text: string;
    glow: string;
    iconBg: string;
  };
}

function TiltCard({
  layer,
  isActive,
  isSelected,
  setActiveLayerId,
  toggleLayerSelection,
  colors
}: TiltCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse position to 3D rotation angles
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  // Map mouse position to subtle internal translations for a parallax depth effect
  const transX = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const transY = useTransform(y, [-0.5, 0.5], [-8, 8]);

  // Dampen the values with springs for extreme buttery smoothness
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 20 });
  const springTransX = useSpring(transX, { stiffness: 120, damping: 20 });
  const springTransY = useSpring(transY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const normalizedX = (mouseX / width) - 0.5;
    const normalizedY = (mouseY / height) - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const readinessClass = (layer.id === 5 || layer.id === 10) ? 'ready-alpha' : (layer.id === 2 || layer.id === 4 || layer.id === 8) ? 'ready-beta' : 'ready-stable';
  const isAlpha = readinessClass === 'ready-alpha';

  // Bioluminescent pulse animation:
  const pulseAnimate = isAlpha
    ? {
        borderColor: [
          "rgba(16, 185, 129, 0.2)",
          "rgba(52, 211, 153, 0.7)",
          "rgba(16, 185, 129, 0.2)"
        ],
        boxShadow: [
          "0 0 10px rgba(16, 185, 129, 0.15)",
          "0 0 25px rgba(16, 185, 129, 0.45)",
          "0 0 10px rgba(16, 185, 129, 0.15)"
        ]
      }
    : {};

  const pulseTransition = isAlpha
    ? {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    : undefined;

  return (
    <motion.div
      id={`layer-card-${layer.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setActiveLayerId(layer.id)}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        x: springTransX,
        y: springTransY,
        transformStyle: 'preserve-3d',
      }}
      animate={pulseAnimate}
      transition={pulseTransition}
      className={`group cursor-pointer p-4 rounded-xl border text-left bg-gradient-to-b transition-all duration-300 relative ${colors.bg} ${colors.border} ${colors.glow} ${
        isActive ? 'ring-2 ring-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)] scale-[1.01]' : ''
      } ${readinessClass}`}
    >
      {/* Visual Accent Number */}
      <span className="absolute top-3 right-3 text-[11px] font-mono font-bold text-slate-600 group-hover:text-slate-500 transition-colors">
        {String(layer.id).padStart(2, '0')}
      </span>

      {/* Bioluminescent pulse accent bar on bottom */}
      {isAlpha && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-65 animate-pulse rounded-b-xl" />
      )}

      {/* Layer icon & Label */}
      <div className="flex items-start gap-3" style={{ transform: 'translateZ(15px)' }}>
        <div className={`p-2 rounded-lg ${colors.iconBg} transition-all`}>
          <IconResolver name={layer.iconName} className="w-5 h-5" />
        </div>
        <div className="pr-4">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-slate-500 font-bold tracking-widest uppercase block">
              LAYER {layer.id}
            </span>
            {isAlpha && (
              <span className="text-[8px] font-mono font-bold px-1 py-0 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-550/20 leading-none">
                ALPHA
              </span>
            )}
          </div>
          <h3 className={`text-[13px] font-black tracking-wide font-sans mt-0.5 ${colors.text}`}>
            {layer.name}
          </h3>
          <p className="text-xs text-slate-300 font-semibold font-mono mt-1 pr-2 line-clamp-1">
            {layer.technology}
          </p>
        </div>
      </div>

      {/* Tags array */}
      <div className="mt-3 flex flex-wrap gap-1" style={{ transform: 'translateZ(10px)' }}>
        {layer.tags.slice(0, 3).map((tag, idx) => (
          <span key={idx} className="text-[9px] font-medium text-slate-400 bg-slate-950/80 px-1.5 py-0.5 rounded border border-slate-900">
            {tag}
          </span>
        ))}
        {layer.tags.length > 3 && (
          <span className="text-[9px] font-medium text-slate-500 px-1">
            +{layer.tags.length - 3} more
          </span>
        )}
      </div>

      {/* Buttons tray */}
      <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()} style={{ transform: 'translateZ(8px)' }}>
        <button
          id={`active-details-btn-${layer.id}`}
          onClick={() => setActiveLayerId(layer.id)}
          className="text-[10px] font-bold text-slate-400 hover:text-slate-100 flex items-center gap-1 transition-colors"
        >
          View Sandbox
          <ExternalLink className="w-3 h-3" />
        </button>

        <button
          id={`toggle-select-layer-btn-${layer.id}`}
          onClick={() => toggleLayerSelection(layer.id)}
          className={`text-[10px] font-bold px-2.5 py-1 rounded-md border min-w-[80px] transition-all flex items-center justify-center gap-1 ${
            isSelected 
              ? 'bg-blue-600/20 text-blue-300 border-blue-500/40 hover:bg-blue-600/30' 
              : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-3 h-3" />
              Added
            </>
          ) : (
            'Add to Stack'
          )}
        </button>
      </div>
    </motion.div>
  );
}

export function StackLayerCard({ selectedLayerIds, toggleLayerSelection }: StackLayerCardProps) {
  const [activeLayerId, setActiveLayerId] = useState<number>(1);
  const [customVariables, setCustomVariables] = useState<Record<string, string>>({
    tableName: 'transactions',
    metricsUrl: 'https://api.supabase.co/rest/v1/metrics',
    priceId: 'price_premium_99',
    appName: 'ReefStack Powered Web',
    playerSpeed: '300.0'
  });
  const [copied, setCopied] = useState(false);

  const activeLayer = STACK_LAYERS.find(l => l.id === activeLayerId) || STACK_LAYERS[0];

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCustomizedSnippet = (snippet: string) => {
    let result = snippet;
    Object.entries(customVariables).forEach(([key, val]) => {
      result = result.split(`'${key}'`).join(`'${val}'`);
      result = result.split(`"${key}"`).join(`"${val}"`);
      result = result.split(`SPEED = 300.0`).join(`SPEED = ${customVariables.playerSpeed || '300.0'}`);
    });
    return result;
  };

  const getColorClass = (colorName: string) => {
    switch (colorName) {
      case 'cyan': return { border: 'border-cyan-500/20 hover:border-cyan-400/50', bg: 'from-cyan-950/20 to-slate-900', text: 'text-cyan-400', glow: 'shadow-[0_0_15px_rgba(34,211,238,0.05)]', iconBg: 'bg-cyan-500/10 text-cyan-400' };
      case 'emerald': return { border: 'border-emerald-500/20 hover:border-emerald-400/50', bg: 'from-emerald-950/20 to-slate-900', text: 'text-emerald-400', glow: 'shadow-[0_0_15px_rgba(52,211,153,0.05)]', iconBg: 'bg-emerald-500/10 text-emerald-400' };
      case 'purple': return { border: 'border-purple-500/20 hover:border-purple-400/50', bg: 'from-purple-950/20 to-slate-900', text: 'text-purple-400', glow: 'shadow-[0_0_15px_rgba(192,132,252,0.05)]', iconBg: 'bg-purple-500/10 text-purple-400' };
      case 'amber': return { border: 'border-amber-500/20 hover:border-amber-400/50', bg: 'from-amber-950/20 to-slate-900', text: 'text-amber-400', glow: 'shadow-[0_0_15px_rgba(251,191,36,0.05)]', iconBg: 'bg-amber-500/10 text-amber-400' };
      case 'blue': return { border: 'border-blue-500/20 hover:border-blue-400/50', bg: 'from-blue-950/20 to-slate-900', text: 'text-blue-400', glow: 'shadow-[0_0_15px_rgba(96,165,250,0.05)]', iconBg: 'bg-blue-500/10 text-blue-400' };
      case 'pink': return { border: 'border-pink-500/20 hover:border-pink-400/50', bg: 'from-pink-950/20 to-slate-900', text: 'text-pink-400', glow: 'shadow-[0_0_15px_rgba(244,114,182,0.05)]', iconBg: 'bg-pink-500/10 text-pink-400' };
      case 'indigo': return { border: 'border-indigo-500/20 hover:border-indigo-400/50', bg: 'from-indigo-950/20 to-slate-900', text: 'text-indigo-400', glow: 'shadow-[0_0_15px_rgba(129,140,248,0.05)]', iconBg: 'bg-indigo-500/10 text-indigo-400' };
      case 'sky': return { border: 'border-sky-500/20 hover:border-sky-400/50', bg: 'from-sky-950/20 to-slate-900', text: 'text-sky-400', glow: 'shadow-[0_0_15px_rgba(56,189,248,0.05)]', iconBg: 'bg-sky-500/10 text-sky-400' };
      case 'rose': return { border: 'border-rose-500/20 hover:border-rose-400/50', bg: 'from-rose-950/20 to-slate-900', text: 'text-rose-400', glow: 'shadow-[0_0_15px_rgba(251,113,133,0.05)]', iconBg: 'bg-rose-500/10 text-rose-400' };
      case 'teal': return { border: 'border-teal-500/20 hover:border-teal-400/50', bg: 'from-teal-950/20 to-slate-900', text: 'text-teal-400', glow: 'shadow-[0_0_15px_rgba(45,212,191,0.05)]', iconBg: 'bg-teal-500/10 text-teal-400' };
      default: return { border: 'border-slate-800 hover:border-slate-700', bg: 'from-slate-900 to-slate-950', text: 'text-slate-300', glow: 'shadow-none', iconBg: 'bg-slate-800 text-slate-300' };
    }
  };

  return (
    <div id="stack-layers-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* 10 layers list columns */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="layers-heading" className="text-xl font-bold font-sans text-slate-100 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-400" />
              Interactive 10-Layer System Catalog
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select any core integration layer below to customize variables and review sandbox outputs.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500">
            {selectedLayerIds.length}/10 ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ perspective: 1000 }}>
          {STACK_LAYERS.map((layer) => {
            const colors = getColorClass(layer.color);
            const isActive = activeLayerId === layer.id;
            const isSelected = selectedLayerIds.includes(layer.id);

            return (
              <TiltCard
                key={layer.id}
                layer={layer}
                isActive={isActive}
                isSelected={isSelected}
                setActiveLayerId={setActiveLayerId}
                toggleLayerSelection={toggleLayerSelection}
                colors={colors}
              />
            );
          })}
        </div>
      </div>

      {/* Detail sandbox panel at right */}
      <div className="lg:col-span-5 border border-blue-950/60 bg-slate-950/90 rounded-2xl p-5 shadow-2xl space-y-5">
        
        {/* Detail Header */}
        <div className="flex items-center justify-between border-b border-slate-900 pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 ${getColorClass(activeLayer.color).text}`}>
              <IconResolver name={activeLayer.iconName} className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="text-[9px] font-bold font-mono tracking-widest text-slate-500 uppercase block">
                Sandbox Playground (Layer {activeLayer.id})
              </span>
              <h3 className="text-md font-bold text-slate-100 font-sans">
                {activeLayer.name}
              </h3>
            </div>
          </div>

          <button
            id="builder-layer-select-panel-toggle"
            onClick={() => toggleLayerSelection(activeLayer.id)}
            className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border leading-none transition-all ${
              selectedLayerIds.includes(activeLayer.id)
                ? 'bg-emerald-600/10 text-emerald-300 border-emerald-500/30'
                : 'bg-indigo-600 text-slate-50 border-indigo-500 hover:bg-indigo-500 shadow-md shadow-indigo-650'
            }`}
          >
            {selectedLayerIds.includes(activeLayer.id) ? '✓ Layer Enabled' : 'Enable Layer'}
          </button>
        </div>

        {/* Technology Tagline */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400">CORE PARTNERSHIPS</span>
          <div className="text-sm font-semibold font-mono text-cyan-300 flex items-center gap-2">
            🚀 {activeLayer.technology}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed italic mt-1">
            "{activeLayer.subtitle}"
          </p>
        </div>

        {/* Feature List */}
        <div className="space-y-2 bg-slate-900/60 p-3 rounded-lg border border-slate-900">
          <span className="text-[10px] font-mono font-bold text-slate-400 block pb-1 border-b border-slate-800/60">
            BLUEPRINT ADVANTAGES
          </span>
          <ul className="space-y-1.5 pt-1">
            {activeLayer.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-cyan-500 font-bold text-md leading-none mt-0.5">•</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Customization Sliders / Values Form */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400">
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            LIVE SANDBOX VARIABLES
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-900/40 rounded-lg border border-slate-900 text-left">
            {activeLayer.id === 1 && (
              <div className="col-span-2">
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Metrics Endpoint URL</label>
                <input
                  id="metricsUrl-input"
                  type="text"
                  value={customVariables.metricsUrl}
                  onChange={(e) => setCustomVariables({ ...customVariables, metricsUrl: e.target.value })}
                  className="w-full bg-slate-950 font-mono text-xs text-cyan-300 p-2 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}
            {activeLayer.id === 3 && (
              <div className="col-span-2">
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Database Table Target</label>
                <input
                  id="tableName-input"
                  type="text"
                  value={customVariables.tableName}
                  onChange={(e) => setCustomVariables({ ...customVariables, tableName: e.target.value })}
                  className="w-full bg-slate-950 font-mono text-xs text-cyan-300 p-2 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}
            {activeLayer.id === 4 && (
              <div className="col-span-2">
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Godot Player physics velocity</label>
                <input
                  id="playerSpeed-input"
                  type="number"
                  step="50"
                  value={customVariables.playerSpeed}
                  onChange={(e) => setCustomVariables({ ...customVariables, playerSpeed: e.target.value })}
                  className="w-full bg-slate-950 font-mono text-xs text-cyan-300 p-2 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}
            {activeLayer.id === 7 && (
              <div className="col-span-2">
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Stripe Price ID Tier</label>
                <input
                  id="priceId-input"
                  type="text"
                  value={customVariables.priceId}
                  onChange={(e) => setCustomVariables({ ...customVariables, priceId: e.target.value })}
                  className="w-full bg-slate-950 font-mono text-xs text-cyan-300 p-2 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}
            {activeLayer.id !== 1 && activeLayer.id !== 3 && activeLayer.id !== 4 && activeLayer.id !== 7 && (
              <div className="col-span-2">
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Project App Label</label>
                <input
                  id="appName-input"
                  type="text"
                  value={customVariables.appName}
                  onChange={(e) => setCustomVariables({ ...customVariables, appName: e.target.value })}
                  className="w-full bg-slate-950 font-mono text-xs text-cyan-300 p-2 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Code Playground */}
        <div className="space-y-2 text-left">
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
            <span className="flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5 text-blue-400" />
              DYNAMICAL BOILERPLATE CODE
            </span>
            <button
              id={`copy-code-panel-btn-${activeLayer.id}`}
              onClick={() => handleCopyCode(getCustomizedSnippet(activeLayer.codeSnippet))}
              className="flex items-center gap-1.5 px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded border border-slate-800 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy Code
                </>
              )}
            </button>
          </div>

          <div className="relative rounded-xl border border-slate-900 bg-slate-950 p-4 overflow-x-auto max-h-[300px] font-mono text-[11px] leading-relaxed text-slate-300 text-left">
            <pre className="whitespace-pre">{getCustomizedSnippet(activeLayer.codeSnippet)}</pre>
          </div>
          <span className="block text-[10px] font-medium text-slate-500 text-right">
            🔥 Values highlighted in active editor automatically sync into templates
          </span>
        </div>

      </div>

    </div>
  );
}
