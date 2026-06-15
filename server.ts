import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("⚠️ Warning: GEMINI_API_KEY is not configured or left as default in environment variables.");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// 1. API: Recommend Stack config based on project description
app.post("/api/recommend", async (req, res) => {
  const { projectDescription, customPreferences } = req.body;

  if (!projectDescription || typeof projectDescription !== "string") {
    res.status(400).json({ error: "Missing or invalid projectDescription in request body." });
    return;
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Elegant fallback simulation with highly realistic data so the app always delivers zero frustration
    setTimeout(() => {
      res.json({
        success: true,
        isFallback: true,
        recommendedStack: {
          frontend: "Next.js (React Server Components, App Router)",
          mobile: "Expo & React Native for native packaging",
          backend: "Supabase (PostgreSQL, Storage, Realtime, Edge Functions)",
          gameEngine: projectDescription.toLowerCase().includes("game") ? "Godot Engine (2D & 3D WebGL exporter)" : "None (Custom SPA Layout preferred)",
          ai: "Gemini API integration (Reasoning with gemini-3.5-flash)",
          ui: "Tailwind CSS + shadcn/ui components + Framer Motion animations",
          payments: "Stripe Subscriptions structure (SaaS Payment grid)",
          analytics: "PostHog (User usage tracking) & Sentry (Crash logging)",
          auth: "Supabase Auth (Magic Links, secure JWT locks)"
        },
        architectureAnalysis: `### ReefStack Custom Recommendation (Sandbox Mode)
Your project concepts *"${projectDescription}"* can be perfectly handled via the ReefStack Pro+ framework. 

Since your environment does not have a registered Gemini key at this moment, here is our suggested architecture:
1. **Frontend Core**: Use **Next.js** for blistering speed and reliable server components.
2. **Persistence**: **Supabase** acts as your central PostgreSQL host, with Row-Level Security ensuring absolute safety.
3. **AI Reasoning**: Leverage the newly released **gemini-3.5-flash** to summarize documents or generate interactive logs server-side.
4. **Design Palette**: Render elegant grids with absolute contrast utilizing **Tailwind CSS & Framer Motion**.`,
        suggestedMilestones: [
          { name: "Scaffold App", action: "Initialize Next.js App Router workspace, importing standard template layouts." },
          { name: "Integrate Database", action: "Configure Supabase tables containing profiles and register authentication gates." },
          { name: "Trigger LLM Callbacks", action: "Write standard Express proxy endpoints forwarding requests safely without exposing keys." },
          { name: "Secure Stripe Payments", action: "Register account webhook endpoints tracking subscription items." }
        ]
      });
    }, 1000);
    return;
  }

  try {
    const prompt = `You are the lead systems architect for ReefStack Pro+: the ultimate app and game construction ecosystem.
A user describes their project idea as:\n"${projectDescription}"
Additional parameters/preferences: "${customPreferences || 'None specified'}"

Recommend a custom, tailored sub-architecture consisting of specific integrations using the available categories.
You must return your response in JSON format. Provide the appropriate responseSchema strictly.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the ultimate ReefStack Pro+ software architecture recommendation assistant. Be professional, specific, and insightful.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["recommendedStack", "architectureAnalysis", "suggestedMilestones"],
          properties: {
            recommendedStack: {
              type: Type.OBJECT,
              required: ["frontend", "backend", "ai", "ui", "payments", "analytics", "auth"],
              properties: {
                frontend: { type: Type.STRING, description: "Recommended web frontend package structure with versions or modules" },
                mobile: { type: Type.STRING, description: "Recommended mobile framework details or 'Not required for this project type' if web-only" },
                backend: { type: Type.STRING, description: "Database and backend details" },
                gameEngine: { type: Type.STRING, description: "Custom game engine configuration or 'None' if standard SaaS tool" },
                ai: { type: Type.STRING, description: "Specific AI features or models" },
                ui: { type: Type.STRING, description: "CSS and layout parameters" },
                payments: { type: Type.STRING, description: "Monetization pathway" },
                analytics: { type: Type.STRING, description: "Tracking modules suggested" },
                auth: { type: Type.STRING, description: "Authentication approach" }
              }
            },
            architectureAnalysis: {
              type: Type.STRING,
              description: "A professional, inspiring, Markdown-formatted evaluation explaining the architectural connections, data flows, and justification for this particular selection."
            },
            suggestedMilestones: {
              type: Type.ARRAY,
              description: "A step-by-step roadmap tailored specifically to this project's requirements",
              items: {
                type: Type.OBJECT,
                required: ["name", "action"],
                properties: {
                  name: { type: Type.STRING, description: "Milestone identifier e.g., 'Phase 1: DB Initialization'" },
                  action: { type: Type.STRING, description: "Precise development instruction detailing files or credentials" }
                }
              }
            }
          }
        }
      }
    });

    const recommendationText = response.text;
    res.setHeader("Content-Type", "application/json");
    res.send(recommendationText);
  } catch (error: any) {
    console.error("Gemini recommendation error:", error);
    res.status(500).json({ error: "Failed to generate recommendation. " + error.message });
  }
});

// 2. API: Architectural Chat Advisor
app.post("/api/advisor-chat", async (req, res) => {
  const { messages, selectedStackState } = req.body;

  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: "Messages array is required." });
    return;
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Simulating assistant responder in sandbox
    const lastMessage = messages[messages.length - 1]?.content || "Hello";
    res.json({
      role: "model",
      content: `[Advisor Mode - Key Offline]
That is a fantastic question! You asked: "${lastMessage}"

When using **ReefStack Pro+**, here are a few recommended practices:
1. **Row Level Security**: Always write SQL policies to guard raw records. Never trust parameters sent directly by browser clients.
2. **Gemini SDK Proxies**: Use server routes like this custom Express endpoint to shield secret credentials.
3. **Optimistic States**: Utilize local react state transitions first before syncing with server databases to feel instantaneous to end-users.`
    });
    return;
  }

  try {
    const formattedHistory = messages.map(m => ({
      role: m.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: m.content }]
    }));

    const chatInstance = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: `You are the lead architect advisor for ReefStack Pro+. 
The typical user has selected: ${JSON.stringify(selectedStackState || "Default standard ReefStack: Next.js, Supabase, Stripe, Gemini")}.
Answer questions accurately, providing concrete development tips, security patterns, best practices, or custom configuration guidelines. 
Always remain encouragement-focused, helpful, and concise.`
      },
      history: formattedHistory.slice(0, -1) // pass all standard messages except the latest one
    });

    const latestMessage = messages[messages.length - 1].content;
    const response = await chatInstance.sendMessage({ message: latestMessage });

    res.json({
      role: "model",
      content: response.text
    });
  } catch (error: any) {
    console.error("Gemini advisor chat error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 3. Mount Vite dynamically based on env or statically serve the React static production files
async function boot() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 ReefStack Core Server booted on port ${PORT}`);
  });
}

boot();
