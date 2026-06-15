import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { StackLayer } from '../types';
import { Sparkles, Info, HelpCircle } from 'lucide-react';

interface DependencyGraphProps {
  selectedLayers: StackLayer[];
  theme: 'light' | 'dark';
}

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  layerId: number;
  color: string;
  technology: string;
  subtitle?: string;
  tags?: string[];
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  description: string;
  type: string;
}

const ALL_SYSTEM_DEPENDENCIES = [
  { source: "1", target: "3", type: "Data Queries", description: "Next.js Frontend connects to Backend & Database for persistent profiles, server state, and API routing integrations." },
  { source: "1", target: "6", type: "Security Guards", description: "Frontend enforces client-side Authentication routes, checking middleware sessions before loading sub-systems feature boards." },
  { source: "1", target: "7", type: "Checkout Handshake", description: "Frontend hosts custom Stripe React elements, prompting subscription billing loops client-side." },
  { source: "2", target: "3", type: "Mobile Sync", description: "Expo React Native applications dispatch asynchronous requests to PostgreSQL API databases gateways." },
  { source: "2", target: "6", type: "Credential Lock", description: "Mobile client persists secure JWT credentials locally, authenticating device-level push notification subscriptions." },
  { source: "5", target: "3", type: "AI Vector Database", description: "AIS Gemini AI embeddings are serialized into high-dimensional vectors and saved inside PostgreSQL pgvector profiles." },
  { source: "7", target: "3", type: "Monetization Audit", description: "Stripe secure servers dispatch transaction events to express webhooks, updating postgres subscription profiles." },
  { source: "10", target: "1", type: "Build CI/CD", description: "GitHub actions automatically execute container compilations, checking syntax on web routing layouts." },
  { source: "10", target: "2", type: "EAS Native Publish", description: "Deploy pipelines bundle Expo resources, deploying push configurations directly to App stores." },
  { source: "8", target: "1", type: "Browser Logging", description: "Sentry oversees error reporting across browser pages, reporting react exceptions directly back to the logging console." },
  { source: "8", target: "2", type: "Mobile Crash Guard", description: "Sentry alerts monitor physical mobile memory exceptions, highlighting broken component loops." },
  { source: "9", target: "3", type: "Heartbeat Scan", description: "Uptime monitor continuously runs diagnostic ping cycles, validating API database cluster latency rates." },
  { source: "6", target: "3", type: "SQL RLS Access", description: "Authentication tokens mapped to Row Level Security rules inside postgres tables automatically." },
  { source: "4", target: "3", type: "Game State Profiles", description: "Godot multiplayer loops query database clusters for saved scores and lobby configurations." },
  { source: "4", target: "6", type: "Matchmaking Auth", description: "Godot client verifies player identity gates prior to unlocking high score leaderboard entries." }
];

export const DependencyGraph: React.FC<DependencyGraphProps> = ({ selectedLayers, theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [activeAdvisory, setActiveAdvisory] = useState<string>('Hover over any module node or connecting dependency line to view real-time architectural handshakes.');
  
  // Floating Interactive Tooltip State
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    visible: boolean;
    title: string;
    tech: string;
    subtitle: string;
    color: string;
    tags?: string[];
  } | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Clear previous SVG content to avoid duplications on redraws
    const svgElement = d3.select(svgRef.current);
    svgElement.selectAll('*').remove();

    const width = containerRef.current.clientWidth || 500;
    const height = 400;

    // Filter nodes based on selected layers
    const selectedIds = new Set(selectedLayers.map(l => String(l.id)));
    
    const nodes: GraphNode[] = selectedLayers.map(layer => ({
      id: String(layer.id),
      name: layer.name,
      layerId: layer.id,
      color: layer.color,
      technology: layer.technology,
      subtitle: layer.subtitle,
      tags: layer.tags
    }));

    // Filter links to only connect selected nodes
    const links: GraphLink[] = ALL_SYSTEM_DEPENDENCIES
      .filter(dep => selectedIds.has(dep.source) && selectedIds.has(dep.target))
      .map(dep => ({
        source: dep.source,
        target: dep.target,
        description: dep.description,
        type: dep.type
      }));

    // Build the D3 force simulation
    const simulation = d3.forceSimulation<GraphNode>(nodes)
      .force("link", d3.forceLink<GraphNode, GraphLink>(links)
        .id(d => d.id)
        .distance(120)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(50));

    // Define marker arrowhead for links
    svgElement.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 26) // Compensate node radius (circle width) to position arrowhead perfectly
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("xoverflow", "visible")
      .append("path")
      .attr("d", "M 0,-3.5 L 10 ,0 L 0,3.5")
      .attr("fill", theme === 'dark' ? "#38bdf8" : "#2563eb")
      .style("stroke", "none");

    // Group for dragging and panning
    const g = svgElement.append("g");

    // Drawing linkage pathways
    const link = g.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", theme === 'dark' ? "rgba(56, 189, 248, 0.25)" : "rgba(37, 99, 235, 0.25)")
      .attr("stroke-width", 2.2)
      .attr("marker-end", "url(#arrowhead)")
      .style("cursor", "pointer")
      .style("transition", "stroke 0.2s, stroke-width 0.2s")
      .on("mouseover", function (event, d) {
        d3.select(this)
          .attr("stroke", theme === 'dark' ? "#38bdf8" : "#2563eb")
          .attr("stroke-width", 4.5);
        
        // Lookup source/target names
        const srcName = typeof d.source === 'object' ? d.source.name : d.source;
        const tgtName = typeof d.target === 'object' ? d.target.name : d.target;
        setHoveredLink(`${srcName} ➔ ${tgtName}`);
        setActiveAdvisory(`🔗 [${d.type.toUpperCase()}] ${d.description}`);
      })
      .on("mouseout", function () {
        d3.select(this)
          .attr("stroke", theme === 'dark' ? "rgba(56, 189, 248, 0.25)" : "rgba(37, 99, 235, 0.25)")
          .attr("stroke-width", 2.2);
        setHoveredLink(null);
      });

    // Create unique color mapping matching tailwind layers colors
    const getNodeColor = (color: string) => {
      switch (color) {
        case 'cyan': return { border: '#22d3ee', fill: 'rgba(6, 182, 212, 0.15)' };
        case 'emerald': return { border: '#34d399', fill: 'rgba(16, 185, 129, 0.15)' };
        case 'purple': return { border: '#c084fc', fill: 'rgba(168, 85, 247, 0.15)' };
        case 'amber': return { border: '#fbbf24', fill: 'rgba(245, 158, 11, 0.15)' };
        case 'fuchsia': return { border: '#e879f9', fill: 'rgba(217, 70, 239, 0.15)' };
        case 'rose': return { border: '#fb7185', fill: 'rgba(244, 63, 94, 0.15)' };
        case 'pink': return { border: '#f472b6', fill: 'rgba(236, 72, 153, 0.15)' };
        case 'sky': return { border: '#38bdf8', fill: 'rgba(14, 165, 233, 0.15)' };
        case 'indigo': return { border: '#818cf8', fill: 'rgba(99, 102, 241, 0.15)' };
        default: return { border: '#ef4444', fill: 'rgba(239, 68, 68, 0.15)' };
      }
    };

    // Node wrapper groups
    const node = g.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .enter().append("g")
      .style("cursor", "grab")
      .call(d3.drag<SVGGElement, GraphNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );

    // Draw solid backplate base circle
    node.append("circle")
      .attr("r", 20)
      .attr("fill", d => theme === 'dark' ? '#040816' : '#ffffff')
      .attr("stroke", d => getNodeColor(d.color).border)
      .attr("stroke-width", 2)
      .attr("filter", "drop-shadow(0px 2px 4px rgba(0,0,0,0.15))")
      .on("mouseover", function (event: MouseEvent, d: GraphNode) {
        d3.select(this)
          .attr("stroke-width", 3.5)
          .attr("fill", getNodeColor(d.color).fill);
        setHoveredNode(d);
        setActiveAdvisory(`🧙‍♂️ [LAYER ${d.layerId}] ${d.name} (${d.technology}). Ready and linked into your custom solution blueprint config.`);
        
        const bounds = containerRef.current?.getBoundingClientRect();
        if (bounds) {
          const x = event.clientX - bounds.left;
          const y = event.clientY - bounds.top - 150; // offset vertically to hover elegantly
          setTooltip({
            x,
            y,
            visible: true,
            title: d.name,
            tech: d.technology,
            subtitle: d.subtitle || "A foundational core stack layer within the compilation matrix.",
            color: d.color,
            tags: d.tags
          });
        }
      })
      .on("mousemove", function (event: MouseEvent, d: GraphNode) {
        const bounds = containerRef.current?.getBoundingClientRect();
        if (bounds) {
          const x = event.clientX - bounds.left;
          const y = event.clientY - bounds.top - 150;
          setTooltip(prev => prev ? { ...prev, x, y } : null);
        }
      })
      .on("mouseout", function () {
        d3.select(this)
          .attr("stroke-width", 2)
          .attr("fill", d => theme === 'dark' ? '#040816' : '#ffffff');
        setHoveredNode(null);
        setTooltip(null);
      });

    // Draw little core index number in the center of the bubble
    node.append("text")
      .attr("dy", ".3em")
      .attr("text-anchor", "middle")
      .attr("font-family", "JetBrains Mono, monospace")
      .attr("font-size", "10px")
      .attr("font-weight", "900")
      .attr("fill", d => theme === 'dark' ? '#ffffff' : '#0f172a')
      .style("pointer-events", "none")
      .text(d => d.layerId);

    // Node outer labels representing modules name
    node.append("text")
      .attr("dx", 0)
      .attr("dy", 35)
      .attr("text-anchor", "middle")
      .attr("font-family", "Inter, sans-serif")
      .attr("font-size", "9.5px")
      .attr("font-weight", "700")
      .attr("fill", theme === 'dark' ? "#cbd5e1" : "#1e293b")
      .style("pointer-events", "none")
      .text(d => d.name.split(" ")[0]);

    // Force simulation tick updates
    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as GraphNode).x!)
        .attr("y1", d => (d.source as GraphNode).y!)
        .attr("x2", d => (d.target as GraphNode).x!)
        .attr("y2", d => (d.target as GraphNode).y!);

      node
        .attr("transform", d => `translate(${d.x!}, ${d.y!})`);
    });

    // Drag-drop helpers
    function dragstarted(event: any, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
      d3.select(this).style("cursor", "grabbing");
    }

    function dragged(event: any, d: GraphNode) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
      d3.select(this).style("cursor", "grab");
    }

    return () => {
      simulation.stop();
    };
  }, [selectedLayers, theme]);

  return (
    <div ref={containerRef} className="relative w-full border border-dashed rounded-xl overflow-hidden p-3 flex flex-col justify-between transition-all bg-slate-950/40 border-slate-500/20" style={{ height: '430px' }}>
      
      {/* Floating Interactive Tooltip */}
      {tooltip && tooltip.visible && (
        <div 
          className="absolute z-30 pointer-events-none p-3.5 rounded-xl border border-indigo-500/30 bg-[#020512]/95 backdrop-blur-md shadow-2xl transition-all duration-75 text-left w-64 space-y-2"
          style={{ 
            left: `${tooltip.x}px`, 
            top: `${tooltip.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="flex items-center justify-between border-b border-[#0f173a] pb-1.5">
            <span className="text-[8.5px] font-mono bg-indigo-550/20 border border-indigo-500/35 text-indigo-300 px-1.5 py-0.5 rounded leading-none uppercase tracking-wider">
              Layer Module
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <div>
            <h6 className="text-xs font-black text-slate-100 uppercase tracking-tight flex items-center gap-1">
              🐠 {tooltip.title}
            </h6>
            <p className="text-[9.5px] font-mono text-cyan-400 font-bold mt-0.5">{tooltip.tech}</p>
          </div>
          <p className="text-[10px] text-slate-300 leading-normal font-sans pt-0.5">
            {tooltip.subtitle}
          </p>
          {tooltip.tags && tooltip.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1.5 border-t border-[#0f173a]">
              {tooltip.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[8px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-1 py-0.2 rounded leading-none">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Interactive Title & Header Status Info overlays */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-[#020512]/90 border border-[#14234c] backdrop-blur-md rounded-lg p-2 leading-none">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-[9px] font-mono font-black text-cyan-200 uppercase tracking-widest leading-none">D3 FORCE-DIRECTED RELATIONAL TOPOLOGY</span>
        </div>
        
        <div className="bg-[#020512]/90 border border-emerald-500/30 text-emerald-400 backdrop-blur-md rounded px-2 py-0.5 text-[8.5px] font-mono uppercase font-black leading-none flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          Live {selectedLayers.length} NODES Sourced
        </div>
      </div>

      {/* Primary SVG Render Anchor */}
      <svg ref={svgRef} className="w-full h-[320px]" />

      {/* Advisory Console Box (at bottom) */}
      <div className="bg-[#040816] border border-[#14234c]/65 p-3 rounded-lg text-left relative z-10 shadow-lg">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="text-[9.5px] font-mono font-bold text-indigo-300 uppercase tracking-wider">Dynamic Architecture Advisory System</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-normal font-sans font-medium">
          {activeAdvisory}
        </p>
        
        {hoveredLink && (
          <div className="mt-1.5 pt-1 border-t border-[#0e1634] flex justify-between items-center text-[10px] font-mono">
            <span className="text-cyan-400 font-bold block">Consolidated Tunnel:</span>
            <span className="text-white px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-800 text-[9.5px]">
              {hoveredLink}
            </span>
          </div>
        )}
      </div>

      {/* Guide details help box */}
      <div className="absolute bottom-24 right-3 z-10">
        <div className="group relative">
          <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700/60 flex items-center justify-center cursor-pointer hover:bg-slate-800">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="absolute right-0 bottom-8 hidden group-hover:block w-[180px] p-2 bg-slate-905 border border-slate-800 rounded shadow-2xl text-[9px] text-slate-400 font-mono leading-relaxed bg-[#020512]">
            💡 Drag circles to dynamically re-adjust physical module distances. Hover lines to verify REST/JWT communication paths.
          </div>
        </div>
      </div>
    </div>
  );
};
