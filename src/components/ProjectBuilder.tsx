/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { USE_CASES, STACK_LAYERS } from '../data/stackData';
import { ProjectUseCase } from '../types';
import { 
  Sparkles, 
  Send, 
  Terminal, 
  RefreshCw, 
  BookOpen, 
  Copy, 
  Check, 
  HelpCircle, 
  ChevronRight, 
  MessageSquare,
  Wand2,
  ListTodo,
  TrendingUp
} from 'lucide-react';

interface ProjectBuilderProps {
  selectedLayerIds: number[];
  toggleLayerSelection: (id: number) => void;
}

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

export function ProjectBuilder({ selectedLayerIds, toggleLayerSelection }: ProjectBuilderProps) {
  const [projectDescription, setProjectDescription] = useState('');
  const [customPreferences, setCustomPreferences] = useState('');
  const [aiResponse, setAiResponse] = useState<AIRecommendResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({});
  
  // Chat advisor states
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: "Hello! I am your ReefStack Architect Advisor. Ask me anything about configuring your database security, Stripe subscriptions, Next.js server actions, or Godot assets exports." }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  const handleApplyPreset = (useCase: ProjectUseCase) => {
    setProjectDescription(`A customized: ${useCase.title}. ${useCase.description}`);
    setCustomPreferences(`Default stack layout matching ${useCase.title} templates`);

    // Enable layer selections matching this preset
    const targetLayerIds: number[] = [];
    if (useCase.suggestedStack.frontend) targetLayerIds.push(1);
    if (useCase.suggestedStack.mobile) targetLayerIds.push(2);
    if (useCase.suggestedStack.backend) targetLayerIds.push(3);
    if (useCase.suggestedStack.gameEngine) targetLayerIds.push(4);
    if (useCase.suggestedStack.ai) targetLayerIds.push(5);
    if (useCase.suggestedStack.ui) targetLayerIds.push(6);
    if (useCase.suggestedStack.payments) targetLayerIds.push(7);
    
    // Clear all existing and set only these target layers for sandbox consistency
    STACK_LAYERS.forEach(layer => {
      const isSelected = selectedLayerIds.includes(layer.id);
      const shouldBeSelected = targetLayerIds.includes(layer.id);
      if (isSelected !== shouldBeSelected) {
        toggleLayerSelection(layer.id);
      }
    });
  };

  const handleGenerateAIRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectDescription.trim()) return;

    setIsLoading(true);
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
      // Reset completed milestone tracks
      setCompletedMilestones({});
    } catch (err) {
      console.error(err);
      alert('Failed to connect to the Gemini API recommend endpoint. Ensuring sandbox fallback...');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput.trim();
    const updatedMsgs = [...chatMessages, { role: 'user' as const, content: userMsg }];
    setChatMessages(updatedMsgs);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await fetch('/api/advisor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMsgs,
          selectedStackState: STACK_LAYERS.filter(l => selectedLayerIds.includes(l.id)).map(l => l.name)
        })
      });

      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, { role: 'assistant', content: "Offline / Timeout Error: Unable to resolve with Gemini Advisor channel. Use standard templates instructions." }]);
    } finally {
      setChatLoading(false);
    }
  };

  const toggleMilestone = (mName: string) => {
    setCompletedMilestones(prev => ({
      ...prev,
      [mName]: !prev[mName]
    }));
  };

  // Render basic custom markdown string helper securely
  const renderMarkdown = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('###')) {
        return <h4 key={idx} className="text-sm font-bold text-cyan-300 mt-4 mb-2">{trimmed.slice(3).trim()}</h4>;
      }
      if (trimmed.startsWith('##')) {
        return <h3 key={idx} className="text-md font-bold text-blue-300 mt-5 mb-2 border-b border-slate-900 pb-1">{trimmed.slice(2).trim()}</h3>;
      }
      if (trimmed.startsWith('#')) {
        return <h2 key={idx} className="text-lg font-extrabold text-slate-100 mt-6 mb-3">{trimmed.slice(1).trim()}</h2>;
      }
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        return (
          <li key={idx} className="text-xs text-slate-300 list-disc ml-5 my-1 leading-relaxed">
            {trimmed.slice(1).trim()}
          </li>
        );
      }
      if (/^\d+\./.test(trimmed)) {
        const dotIdx = trimmed.indexOf('.');
        return (
          <li key={idx} className="text-xs text-slate-300 list-decimal ml-5 my-1 leading-relaxed">
            {trimmed.slice(dotIdx + 1).trim()}
          </li>
        );
      }
      if (trimmed === '') return <div key={idx} className="h-2" />;
      return <p key={idx} className="text-xs text-slate-400 leading-relaxed my-1.5">{trimmed}</p>;
    });
  };

  const getActiveLayoutNames = () => {
    return STACK_LAYERS.filter(l => selectedLayerIds.includes(l.id)).map(l => l.technology);
  };

  return (
    <div id="project-builder-master" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      
      {/* Predefined templates side tray (Desktop span 4, Mobile full) */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Presets Card */}
        <div className="bg-slate-950 border border-blue-950/60 rounded-2xl p-5 shadow-2xl text-left space-y-4">
          <div>
            <h3 className="text-md font-bold font-sans text-slate-100 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-amber-400" />
              Predefined Use-Cases
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select a popular starting canvas to configure matching sandbox layers instantly.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {USE_CASES.map((useCase) => (
              <button
                id={`preset-btn-${useCase.title.replace(/\s+/g, '-').toLowerCase()}`}
                key={useCase.title}
                onClick={() => handleApplyPreset(useCase)}
                className="w-full text-left p-3.5 rounded-xl border border-slate-900 bg-slate-900/30 hover:border-slate-800 hover:bg-slate-900/60 transition-all group flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs font-black font-sans tracking-wide text-slate-200 group-hover:text-cyan-300 transition-colors">
                    {useCase.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-950 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                  <span>🚀 Auto-toggles {Object.keys(useCase.suggestedStack).length} layers</span>
                  <span className="text-cyan-400 group-hover:underline flex items-center gap-1 font-sans font-bold">
                    Load Preset
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current sandbox metrics logs */}
        <div className="bg-slate-950 border border-blue-950/60 rounded-2xl p-5 shadow-xl text-left space-y-3">
          <h3 className="text-xs font-bold font-sans text-slate-200 uppercase tracking-widest pb-2 border-b border-slate-900">
            CURRENT BLUEPRINT AUDIT
          </h3>

          <div className="text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Selected Layers:</span>
              <span className="font-mono text-cyan-300 font-bold">{selectedLayerIds.length} of 10</span>
            </div>
            
            {selectedLayerIds.length > 0 ? (
              <div className="p-3 bg-slate-900/40 rounded-lg border border-slate-900 space-y-1">
                <span className="text-[9px] font-mono text-slate-500 font-bold block">ACTIVE SELECTION TECHS:</span>
                <div className="flex flex-wrap gap-1">
                  {getActiveLayoutNames().map((tech, i) => (
                    <span key={i} className="text-[9px] font-mono bg-slate-950 px-1.5 py-0.5 rounded text-slate-300 border border-slate-900">
                      {tech.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-slate-500 italic">No layers added. Enable some layers above or load a template use-case!</p>
            )}

            <div className="pt-2 border-t border-slate-900">
              <span className="text-[10px] font-mono text-cyan-400 block pb-1 font-bold">ESTIMATED COMPILING REVALIDATIONS:</span>
              <p className="text-[11.5px] leading-relaxed text-slate-400">
                Next.js ISR segments: <strong className="text-slate-200">Revalidate every hour</strong>, database queries scale serverless with pgvector and secure JWT access guards.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Dynamic Prompt Builder & AI generation panel */}
      <div className="lg:col-span-8 bg-slate-950 border border-blue-950/60 rounded-2xl p-6 shadow-2xl flex flex-col justify-between text-left space-y-6">
        
        {/* Config Inputs Form */}
        <form onSubmit={handleGenerateAIRecommendation} className="space-y-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider">
              REEFSTACK GENERATIVE ARCHITECT v2.5
            </span>
            <h3 id="architect-title" className="text-lg font-black font-sans text-slate-100 flex items-center gap-1.5 mt-0.5">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
              Gemini AI-Powered Blueprint Architect
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Describe your software project, game, or startup idea. Gemini will analyze dependencies and construct a highly tailored deployment blueprint.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-slate-400 block font-bold">PROJECT IDEA & GOALS</label>
            <textarea
              id="projectDesc-textarea"
              rows={3}
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="e.g. A beautiful mobile adventure application called reeflost tracking custom highscore listings with social integrations and Stripe item purchases..."
              className="w-full bg-slate-900 font-sans text-xs text-slate-200 p-3 rounded-xl border border-slate-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 block font-bold">ADDITIONAL CUSTOM PREFERENCES</label>
              <input
                id="customPref-input"
                type="text"
                value={customPreferences}
                onChange={(e) => setCustomPreferences(e.target.value)}
                placeholder="e.g., Must use GraphQL instead of REST, or include Unity metrics..."
                className="w-full bg-slate-900 text-xs text-slate-200 p-2.5 rounded-lg border border-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex items-end justify-end">
              <button
                id="architect-submit-btn"
                type="submit"
                disabled={isLoading || !projectDescription.trim()}
                className={`w-full py-2.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  isLoading || !projectDescription.trim()
                    ? 'bg-slate-900 text-slate-500 border-slate-950 cursor-not-allowed'
                    : 'bg-indigo-600 text-slate-100 border-indigo-500 hover:bg-indigo-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.25)] cursor-pointer'
                }`}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
                    Analyzing project structure...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Generate Custom Architecture Blueprint
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* AI Results showcase */}
        {isLoading && (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-slate-900/20 rounded-2xl border border-dashed border-blue-900/40">
            <div className="p-3 bg-indigo-500/10 rounded-full border border-indigo-500/30 animate-bounce">
              <Sparkles className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200">Sifting ReefStack blueprint layers with gemini-3.5-flash...</h4>
              <p className="text-xs text-slate-400 max-w-sm mt-1 mx-auto leading-relaxed">
                Evaluating database layouts, optimizing security rules, modeling Stripe hooks callbacks, and verifying API structures.
              </p>
            </div>
          </div>
        )}

        {aiResponse && !isLoading && (
          <div id="ai-results-panel" className="space-y-6 pt-4 border-t border-slate-900">
            
            {/* Status confirmation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-mono text-slate-400 font-bold">
                  {aiResponse.isFallback ? "BLUEPRINT SYNTHESIS (Offline Mode)" : "BLUEPRINT SYNTHESIS (Gemini Live)"}
                </span>
              </div>

              <button
                id="copy-blueprint-txt-btn"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(aiResponse, null, 2));
                  alert('Copied blueprint JSON meta configurations to clipboard!');
                }}
                className="text-[10px] font-bold text-slate-400 hover:text-slate-100 font-mono flex items-center gap-1.5 px-2 py-1 bg-slate-900 border border-slate-800 rounded hover:bg-slate-800 transition-colors"
              >
                <Copy className="w-3 h-3" />
                Export Manifest
              </button>
            </div>

            {/* Structured Table summary of recommended stack */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
              <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-900">
                <span className="text-[9px] font-mono text-slate-500 font-bold block">FRONTEND STAGINGS</span>
                <span className="text-xs font-mono font-bold text-cyan-300 mt-1 block">
                  ⚙️ {aiResponse.recommendedStack.frontend}
                </span>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-900">
                <span className="text-[9px] font-mono text-slate-500 font-bold block">BACKEND HOSTING</span>
                <span className="text-xs font-mono font-bold text-purple-300 mt-1 block">
                  ⚙️ {aiResponse.recommendedStack.backend}
                </span>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-900">
                <span className="text-[9px] font-mono text-slate-500 font-bold block">REASONING AI</span>
                <span className="text-xs font-mono font-bold text-amber-300 mt-1 block">
                  ⚙️ {aiResponse.recommendedStack.ai}
                </span>
              </div>
            </div>

            {/* Full Analysis text */}
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-950 text-left relative">
              <span className="absolute top-3 right-4 text-[9px] font-mono text-slate-600">ARCHITECT'S ADVISORY DIAGNOSTIC</span>
              <div className="prose prose-invert max-w-full">
                {renderMarkdown(aiResponse.architectureAnalysis)}
              </div>
            </div>

            {/* Custom Suggested Milestones */}
            {aiResponse.suggestedMilestones && aiResponse.suggestedMilestones.length > 0 && (
              <div className="space-y-3 bg-slate-900/20 p-4 rounded-xl border border-slate-900/60">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-800pb-1.5">
                  <ListTodo className="w-3.5 h-3.5 text-indigo-400" />
                  Your Tailored Development Roadmaps
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {aiResponse.suggestedMilestones.map((milestone, i) => {
                    const isDone = !!completedMilestones[milestone.name];
                    return (
                      <div
                        id={`milestone-check-${useCaseSlug(milestone.name)}`}
                        key={i}
                        onClick={() => toggleMilestone(milestone.name)}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                          isDone 
                            ? 'border-emerald-500/30 bg-emerald-950/15 text-slate-100' 
                            : 'border-slate-900 bg-slate-900/30 text-slate-400 hover:border-slate-800'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center ${
                            isDone ? 'bg-emerald-500 border-emerald-400' : 'border-slate-700'
                          }`}>
                            {isDone && <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3px]" />}
                          </div>
                          <div>
                            <h4 className={`text-xs font-bold leading-tight ${isDone ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                              {milestone.name}
                            </h4>
                            <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                              {milestone.action}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Floating System Chat advisor trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          id="toggle-advisor-chat-btn"
          onClick={() => setChatOpen(!chatOpen)}
          className="p-3.5 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-700 text-slate-100 hover:scale-105 shadow-[0_4px_25px_rgba(6,182,212,0.45)] border border-cyan-400/30 active:scale-95 transition-all flex items-center justify-center gap-2 group-active:scale-95"
        >
          <MessageSquare className="w-5.5 h-5.5 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold font-sans pr-1">system Chat advisor</span>
        </button>

        {chatOpen && (
          <div id="advisor-portal" className="absolute bottom-16 right-0 w-[350px] max-h-[500px] h-[500px] bg-slate-950 border border-blue-950/80 rounded-2xl shadow-3xl flex flex-col justify-between overflow-hidden text-left">
            
            {/* Header chat banner */}
            <div className="p-4 bg-gradient-to-r from-cyan-950 via-slate-950 to-indigo-950 border-b border-slate-900 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-extrabold font-sans text-slate-100 tracking-wide block uppercase">
                  REEFSTACK EXPERT ADVISOR
                </h4>
                <p className="text-[10px] text-cyan-400 font-mono leading-none mt-0.5">🚀 Core systems consultant</p>
              </div>
              <button
                id="close-portal-btn"
                onClick={() => setChatOpen(false)}
                className="text-xs text-slate-500 hover:text-slate-300 font-bold"
              >
                Close
              </button>
            </div>

            {/* Chat list viewport */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/70" id="chat-messages-viewport">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`p-3 rounded-xl max-w-[85%] text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-900/80 text-slate-300 border border-slate-900 rounded-bl-none text-left'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-xl bg-slate-900 text-slate-500 border border-slate-900">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin inline-block mr-1.5" />
                    Advisor typing...
                  </div>
                </div>
              )}
            </div>

            {/* Message input */}
            <form onSubmit={handleSendChatMessage} className="p-3 border-t border-slate-900 bg-slate-950 flex items-center gap-2">
              <input
                id="advisorChat-input"
                type="text"
                placeholder="Ask about database structure, auth, stripe..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-slate-900 text-xs text-slate-200 p-2.5 rounded-lg border border-slate-900 focus:border-blue-500 focus:outline-none"
              />
              <button
                id="send-chat-submit-btn"
                type="submit"
                disabled={!chatInput.trim() || chatLoading}
                className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center justify-center disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}
      </div>

    </div>
  );
}

function useCaseSlug(name: string): string {
  return name.replace(/\s+/g, '-').replace(/[^a-zA-Z-]/g, '').toLowerCase();
}
