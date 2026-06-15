/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HOW_TO_STEPS } from '../data/stackData';
import { Step } from '../types';
import { IconResolver } from './IconResolver';
import { CheckCircle, ArrowRight, Play, Compass, RefreshCw, Layers } from 'lucide-react';

export function StepByStepGuide() {
  const [activeStepNum, setActiveStepNum] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const activeStep = HOW_TO_STEPS.find(s => s.number === activeStepNum) || HOW_TO_STEPS[0];

  const handleToggleStepCompleted = (num: number) => {
    setCompletedSteps(prev => {
      if (prev.includes(num)) {
        return prev.filter(x => x !== num);
      } else {
        return [...prev, num];
      }
    });

    // Auto advance to next step if completing the current one!
    if (num === activeStepNum && num < HOW_TO_STEPS.length) {
      setTimeout(() => {
        setActiveStepNum(num + 1);
      }, 600);
    }
  };

  const getStepStatus = (stepNum: number) => {
    if (completedSteps.includes(stepNum)) return 'completed';
    if (stepNum === activeStepNum) return 'active';
    return 'staged';
  };

  const getCheckpointList = (stepNum: number): string[] => {
    switch (stepNum) {
      case 1:
        return [
          "Define specific target users (Web visitors, mobile gamers, corporate admins)",
          "Formulate standard monetization strategies (one-time pricing vs monthly subscription checks)",
          "Draft high-level functional features outline"
        ];
      case 2:
        return [
          "Establish what database tables are critical (e.g.profiles, historical bills, items catalogs)",
          "Determine whether specific AI generative reasoning pipelines (Gemini API integrations) are necessary",
          "Draft initial user flow navigation layouts maps"
        ];
      case 3:
        return [
          "Initialize React / Next.js client repositories template folders",
          "Configure standard postgreSQL tables, installing PGVector extension as needed",
          "Inject theme custom variables into Tailwind tailwindcss global configurations"
        ];
      case 4:
        return [
          "Draft unit tests checking core utility formulas utilizing Vitest",
          "Mount Playwright check cycles tracking key payment routes",
          "Expose private test accounts validating multi-user live messaging queues"
        ];
      case 5:
        return [
          "Deploy Express proxy routers onto Cloud Run or Vercel edge networks",
          "Securely load secrete environment variables in remote setting portals",
          "Publish compiled iOS / Android bundles onto companion app store checks"
        ];
      case 6:
        return [
          "Activate live payment collections on Stripe, checking active SSL safety triggers",
          "Transmit bulk notification dispatches to signed waitlist audiences",
          "Publish workspace announcement listings across community platforms"
        ];
      case 7:
        return [
          "Evaluate telemetry funnels within PostHog to detect visitor checkout drops",
          "Optimize database compute limits enabling automatic scaling caches",
          "Introduce smart agent cron routines matching weekly reports schedules"
        ];
      default:
        return [
          "Audit current system configuration parameters",
          "Maintain dependency libraries files at latest stable targets",
          "Re-verify active security rules guarding tables"
        ];
    }
  };

  return (
    <div id="step-by-step-guide" className="bg-slate-950 border border-blue-950/60 rounded-2xl p-6 shadow-xl space-y-6 text-left">
      
      {/* Detail header */}
      <div>
        <h3 id="step-by-step-heading" className="text-md font-bold font-sans text-slate-100 uppercase tracking-widest block border-b border-slate-900 pb-3">
          HOW TO USE REEFSTACK (STEP-BY-STEP WORKFLOW)
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xl">
          Execute this standard 7-step engineering development lifecycle to bring your application of choice successfully from abstract ideation straight to high-scale global launch.
        </p>
      </div>

      {/* Steps visual pipeline layout */}
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-2.5 border-b border-slate-900 pb-5">
        {HOW_TO_STEPS.map((step) => {
          const status = getStepStatus(step.number);
          const isCompleted = status === 'completed';
          const isActive = status === 'active';

          return (
            <div
              id={`step-node-${step.number}`}
              key={step.number}
              onClick={() => setActiveStepNum(step.number)}
              className={`flex-1 p-3 rounded-xl border cursor-pointer select-none transition-all duration-300 relative ${
                isActive 
                  ? 'border-cyan-500/40 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                  : isCompleted
                  ? 'border-emerald-500/30 bg-emerald-950/10'
                  : 'border-slate-900 bg-slate-900/30 hover:border-slate-800'
              }`}
            >
              {/* Badge label */}
              <div className="flex items-center justify-between">
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-950 text-slate-500'
                }`}>
                  {step.number} : {step.title}
                </span>

                {isCompleted && (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>

              <h4 className={`text-[11px] font-bold mt-2 truncate ${
                isActive ? 'text-cyan-300' : 'text-slate-300'
              }`}>
                {step.action}
              </h4>
            </div>
          );
        })}
      </div>

      {/* Expanded individual step sandbox workspace */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-2">
        
        {/* Step details content */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
              <IconResolver name={activeStep.iconName} className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-wider font-bold text-slate-500 uppercase block">
                ACTIVE PIPELINE SECTOR (STEP {activeStep.number}/7)
              </span>
              <h4 className="text-md font-bold text-slate-100 font-sans">
                {activeStep.title} : <span className="text-cyan-300">{activeStep.action}</span>
              </h4>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            {activeStep.description}
          </p>

          <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-900">
            {activeStep.details}
          </p>
        </div>

        {/* Action Checkpoints List column */}
        <div className="md:col-span-5 bg-slate-900/35 border border-slate-900 rounded-xl p-4 space-y-3">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block tracking-wider pb-1.5 border-b border-slate-900">
            BLUEPRINT STAGING REQUISITES
          </span>

          <ul className="space-y-2.5">
            {getCheckpointList(activeStep.number).map((checkpoint, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="text-cyan-450 leading-none font-bold mt-0.5">•</span>
                <span>{checkpoint}</span>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-slate-900 flex justify-between items-center">
            <span className="text-[10px] text-slate-500 font-medium">COMPLETE CHECKPOINTS TO ADVANCE</span>

            <button
              id={`mark-phase-completed-${activeStep.number}`}
              onClick={() => handleToggleStepCompleted(activeStep.number)}
              className={`text-[10px] font-bold px-3 py-1.5 rounded border transition-all ${
                completedSteps.includes(activeStep.number)
                  ? 'bg-emerald-600/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-cyan-600 text-slate-950 border-cyan-500 hover:bg-cyan-500 shadow shadow-cyan-900'
              }`}
            >
              {completedSteps.includes(activeStep.number) ? 'Phase Completed ✓' : 'Mark Phase Done'}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
