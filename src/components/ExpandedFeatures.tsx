/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EXPANDED_LAYERS, UPGRADES } from '../data/stackData';
import { ExpandedLayer, Upgrade } from '../types';
import { Check, Info, Library, HelpCircle, HardDriveDownload, Sparkles, CheckSquare, Github, Slack, Database } from 'lucide-react';

export function ExpandedFeatures() {
  const [activeLayerLetter, setActiveLayerLetter] = useState<string>('A');
  const [checkedFeatures, setCheckedFeatures] = useState<Record<string, boolean>>({});
  const [selectedUpgradeId, setSelectedUpgradeId] = useState<string | null>("ai_builder");

  const activeLayer = EXPANDED_LAYERS.find(l => l.letter === activeLayerLetter) || EXPANDED_LAYERS[0];
  const activeUpgrade = UPGRADES.find(u => u.id === selectedUpgradeId) || UPGRADES[0];

  const handleToggleCheck = (featName: string) => {
    setCheckedFeatures(prev => ({
      ...prev,
      [featName]: !prev[featName]
    }));
  };

  const handleToggleAll = (layer: ExpandedLayer) => {
    const allNames = layer.features.map(f => f.name);
    const anyChecked = allNames.some(name => checkedFeatures[name]);

    const updated = { ...checkedFeatures };
    allNames.forEach(name => {
      updated[name] = !anyChecked;
    });
    setCheckedFeatures(updated);
  };

  const activeCheckedCount = activeLayer.features.filter(f => checkedFeatures[f.name]).length;

  return (
    <div id="expanded-features-workspace" className="space-y-6">
      
      {/* Introduction text */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 id="features-heading" className="text-xl font-bold font-sans text-slate-100 flex items-center gap-2">
            <Library className="w-5 h-5 text-pink-400" />
            Expanded Feature Sub-Layers
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            ReefStack features pre-audited template modules across eight specialized engineering layers. Use the toggles to construct your mock deployment layout list.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-2 px-3 rounded-lg text-xs">
          <span className="text-slate-400 font-medium">TOTAL FEATURES CHECKED:</span>
          <span className="font-mono font-bold text-cyan-400">
            {Object.values(checkedFeatures).filter(Boolean).length} modules
          </span>
        </div>
      </div>

      {/* Upgrades grid panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: List A to H Layers and active item details */}
        <div className="md:col-span-8 bg-slate-950 border border-blue-950/60 rounded-2xl p-5 shadow-xl space-y-4">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block tracking-wider">
            8 COMPREHENSIVE WORKFLOW DEPOT SECTORS
          </span>

          {/* Letter Badges row */}
          <div className="flex flex-wrap gap-2 pb-3 border-b border-slate-900">
            {EXPANDED_LAYERS.map((layer) => {
              const isActive = activeLayerLetter === layer.letter;
              return (
                <button
                  id={`letter-tab-btn-${layer.letter}`}
                  key={layer.letter}
                  onClick={() => setActiveLayerLetter(layer.letter)}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border text-xs font-bold font-mono transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-600/10 text-cyan-300 border-cyan-400/40 shadow-md shadow-blue-950/40' 
                      : 'bg-slate-900/40 text-slate-400 border-slate-900 hover:border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs ${
                    isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-950 text-slate-400'
                  }`}>
                    {layer.letter}
                  </span>
                  <span className="font-sans font-bold text-[11px] uppercase tracking-wide">
                    {layer.name.replace(" LAYER", "")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Expanded detail features within selected row */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-sans text-slate-100 flex items-center gap-2">
                  <span className="bg-sky-500/10 text-sky-400 p-1 rounded-md text-xs font-mono font-bold font-sans border border-sky-500/20">
                    LAYER {activeLayer.letter}
                  </span>
                  {activeLayer.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Click features to select, or bulk activate all sub-features.
                </p>
              </div>

              <button
                id={`bulk-toggle-layer-btn-${activeLayer.letter}`}
                onClick={() => handleToggleAll(activeLayer)}
                className="text-xs font-semibold text-cyan-300 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg transition-all"
              >
                {activeCheckedCount === activeLayer.features.length ? '🧹 Uncheck All' : '✓ Select All'}
              </button>
            </div>

            {/* Grid of features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="expanded-features-grid-list">
              {activeLayer.features.map((feat) => {
                const isChecked = !!checkedFeatures[feat.name];
                return (
                  <div
                    id={`feature-item-${feat.name.replace(/\s+/g, '-').toLowerCase()}`}
                    key={feat.name}
                    onClick={() => handleToggleCheck(feat.name)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-300 relative select-none ${
                      isChecked 
                        ? 'border-emerald-500/35 bg-emerald-950/15 shadow-[0_0_15px_rgba(16,185,129,0.04)] text-slate-100' 
                        : 'border-slate-900 bg-slate-900/30 text-slate-400 hover:border-slate-800 hover:text-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        isChecked ? 'bg-emerald-500 border-emerald-400' : 'border-slate-700'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 text-slate-950 stroke-[3px]" />}
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold leading-tight ${isChecked ? 'text-slate-100' : 'text-slate-300'}`}>
                          {feat.name}
                        </h4>
                        <p className="text-[10.5px] text-slate-500 mt-1 leading-normal">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Right Column: Upgrades panel & Popular integrations logos */}
        <div className="md:col-span-4 space-y-6">
          
          {/* Custom Upgrades list */}
          <div className="bg-slate-950 border border-blue-950/60 rounded-2xl p-5 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold font-sans text-slate-200 uppercase tracking-wider block border-b border-slate-900 pb-3">
              NEW & POWERFUL UPGRADES
            </h3>

            <div className="space-y-2">
              {UPGRADES.map((upgrade) => {
                const isSelected = selectedUpgradeId === upgrade.id;
                return (
                  <button
                    id={`upgrade-panel-item-${upgrade.id}`}
                    key={upgrade.id}
                    onClick={() => setSelectedUpgradeId(upgrade.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-all duration-300 relative flex items-start gap-3 ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-950/20 shadow-md' 
                        : 'border-slate-900 bg-slate-900/30 hover:bg-slate-900/50'
                    }`}
                  >
                    <div className={`p-1.5 rounded bg-slate-900 border border-slate-800 ${isSelected ? 'text-cyan-300' : 'text-slate-500'}`}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-200">
                          {upgrade.title}
                        </h4>
                        {upgrade.badge && (
                          <span className="text-[7.5px] font-bold font-mono px-1 bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-400/20 rounded">
                            {upgrade.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1 leading-none">{upgrade.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected upgrade detailed overview */}
            {activeUpgrade && (
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-900 text-left space-y-2">
                <span className="text-[9px] font-mono font-bold text-cyan-400 block tracking-widest uppercase">
                  UPGRADE DETAIL NOTES:
                </span>
                <p className="text-xs text-slate-300 leading-normal">
                  {activeUpgrade.details}
                </p>
              </div>
            )}
          </div>

          {/* Popular custom Integrations showcase as seen on bottom right of featured map */}
          <div className="bg-slate-950 border border-blue-950/60 rounded-2xl p-5 shadow-2.5xl space-y-4 text-left">
            <h3 className="text-xs font-bold font-sans text-slate-200 uppercase tracking-widest">
              SYSTEM INTEGRATIONS MAPS
            </h3>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2 p-2 bg-slate-900/40 rounded-lg border border-slate-900">
                <Github className="w-4 h-4 text-slate-300" />
                GitHub Repos
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-900/40 rounded-lg border border-slate-900">
                <Slack className="w-4 h-4 text-cyan-400" />
                Slack Notify
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-900/40 rounded-lg border border-slate-900">
                <Database className="w-4 h-4 text-purple-400" />
                Zapier Flow
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-900/40 rounded-lg border border-slate-900">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Hugging Face
              </div>
            </div>

            <span className="block text-[9.5px] text-slate-500 leading-normal">
              🌐 Integrate 1000s more third-party software structures using client webhooks and automated Edge cron loops.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
