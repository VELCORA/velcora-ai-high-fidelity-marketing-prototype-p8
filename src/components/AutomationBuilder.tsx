import React, { useState } from 'react';
import {
  GitBranch,
  Play,
  CheckCircle2,
  Clock,
  Globe,
  Sparkles,
  Send,
  Sliders,
  ArrowRight,
  RefreshCw,
  Layers,
  Database,
  Bell,
  Code,
} from 'lucide-react';
import { useToast } from './Toast';

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  interval: string;
  target: string;
  action: string;
  nodes: { id: string; label: string; iconName: string; status: 'idle' | 'running' | 'success' }[];
}

const TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'price-drop',
    name: 'Competitor Price Sentinel',
    description: 'Scrapes e-commerce product catalogs every 6 hours, checks for price drops > 15%, and alerts via Webhook.',
    interval: 'Every 6 Hours',
    target: 'https://store.apple.com/shop/catalog',
    action: 'Webhook -> Slack / Discord',
    nodes: [
      { id: '1', label: 'Cron Trigger (6h)', iconName: 'clock', status: 'idle' },
      { id: '2', label: 'Stealth Scrape URL', iconName: 'globe', status: 'idle' },
      { id: '3', label: 'AI Price Schema Diff', iconName: 'sparkles', status: 'idle' },
      { id: '4', label: 'Dispatch Webhook Alert', iconName: 'send', status: 'idle' },
    ],
  },
  {
    id: 'ai-digest',
    name: 'Daily Tech AI Intelligence Digest',
    description: 'Harvests top 20 trending AI articles daily, extracts executive summaries, and formats JSON payload.',
    interval: 'Daily at 08:00 UTC',
    target: 'https://techcrunch.com/category/artificial-intelligence',
    action: 'JSON Storage -> Email Digest',
    nodes: [
      { id: '1', label: 'Daily Cron (08:00)', iconName: 'clock', status: 'idle' },
      { id: '2', label: 'Crawl Top 20 Articles', iconName: 'globe', status: 'idle' },
      { id: '3', label: 'Gemini 3.7 Summarizer', iconName: 'sparkles', status: 'idle' },
      { id: '4', label: 'Postgres & Vector Store', iconName: 'database', status: 'idle' },
    ],
  },
  {
    id: 'lead-enrich',
    name: 'Lead & Contact Auto-Enrichment',
    description: 'Extracts founder bios, verified work emails, and tech stack fingerprints on webhook event trigger.',
    interval: 'On Webhook Event',
    target: 'https://news.ycombinator.com/leaders',
    action: 'CRM Sync -> HubSpot / Notion',
    nodes: [
      { id: '1', label: 'Inbound Webhook', iconName: 'bell', status: 'idle' },
      { id: '2', label: 'Profile DOM Scraper', iconName: 'globe', status: 'idle' },
      { id: '3', label: 'NLP Entity Extractor', iconName: 'sparkles', status: 'idle' },
      { id: '4', label: 'Push to CRM / Table', iconName: 'database', status: 'idle' },
    ],
  },
];

export const AutomationBuilder: React.FC = () => {
  const { showToast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate>(TEMPLATES[0]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([
    'Pipeline deployed in sandbox mode. Ready for test run.',
  ]);

  const handleRunPipeline = async () => {
    setIsExecuting(true);
    setActiveStep(0);
    setPipelineLogs([`[START] Triggering workflow: ${selectedTemplate.name}`]);

    // Step 1: Trigger
    await new Promise((r) => setTimeout(r, 600));
    setActiveStep(1);
    setPipelineLogs((p) => [...p, `[STEP 1] Trigger fired: ${selectedTemplate.interval}`]);

    // Step 2: Scrape
    await new Promise((r) => setTimeout(r, 800));
    setActiveStep(2);
    setPipelineLogs((p) => [...p, `[STEP 2] Anti-bot stealth session opened for ${selectedTemplate.target}`]);

    // Step 3: AI Transform
    await new Promise((r) => setTimeout(r, 900));
    setActiveStep(3);
    setPipelineLogs((p) => [...p, `[STEP 3] Gemini AI schema synthesis completed with 100% field match`]);

    // Step 4: Dispatch
    await new Promise((r) => setTimeout(r, 700));
    setActiveStep(4);
    setPipelineLogs((p) => [
      ...p,
      `[SUCCESS] Payload dispatched to target: ${selectedTemplate.action}. Response HTTP 200 OK.`,
    ]);

    setIsExecuting(false);
    showToast(`Workflow "${selectedTemplate.name}" executed successfully!`, 'success');
  };

  const handleDeploy = () => {
    showToast(`Pipeline "${selectedTemplate.name}" scheduled and active!`, 'success');
  };

  return (
    <section id="automation-builder" className="relative w-full py-20 px-4 sm:px-8 md:px-14 bg-[#05080c] text-white z-20 font-sans-ui border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass border border-white/15 text-xs text-emerald-300 mb-3.5">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Autonomous Pipeline Orchestrator</span>
          </div>
          <h2 className="font-serif italic text-3xl sm:text-5xl text-white tracking-tight">
            Visual Workflow Automation
          </h2>
          <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed">
            Connect web scrapers, AI transformation filters, and external webhooks into resilient zero-maintenance pipelines.
          </p>
        </div>

        {/* Template Selector Pills */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-8">
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => {
                setSelectedTemplate(tmpl);
                setActiveStep(-1);
                setPipelineLogs([`Switched to pipeline template: ${tmpl.name}`]);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedTemplate.id === tmpl.id
                  ? 'bg-white text-black shadow-lg font-semibold scale-105'
                  : 'liquid-glass text-white/80 hover:text-white border-white/10'
              }`}
            >
              {tmpl.name}
            </button>
          ))}
        </div>

        {/* Builder Studio Canvas */}
        <div className="liquid-glass border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Header Info */}
          <div className="flex items-start justify-between flex-wrap gap-4 pb-6 border-b border-white/10">
            <div>
              <h3 className="font-serif italic text-2xl text-white">{selectedTemplate.name}</h3>
              <p className="text-white/70 text-xs sm:text-sm mt-1 max-w-xl">{selectedTemplate.description}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRunPipeline}
                disabled={isExecuting}
                className={`px-5 py-2.5 rounded-full font-medium text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-md ${
                  isExecuting
                    ? 'bg-white/20 text-white/60 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-white/90'
                }`}
              >
                {isExecuting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Test Run Pipeline</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDeploy}
                className="px-5 py-2.5 rounded-full font-medium text-xs sm:text-sm bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all active:scale-95 cursor-pointer"
              >
                Deploy Cron Job
              </button>
            </div>
          </div>

          {/* Interactive Pipeline Node Graph */}
          <div className="py-8 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[720px] gap-3 relative">
              {/* Connector line */}
              <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-white/10 -translate-y-1/2 z-0" />

              {selectedTemplate.nodes.map((node, index) => {
                const isPassed = activeStep > index;
                const isCurrent = activeStep === index;

                return (
                  <React.Fragment key={node.id}>
                    <div className="relative z-10 flex flex-col items-center text-center max-w-[160px]">
                      {/* Node Circle */}
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 shadow-xl ${
                          isPassed
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 scale-105'
                            : isCurrent
                            ? 'bg-amber-400 text-black border-amber-300 animate-pulse scale-110'
                            : 'bg-black/70 border-white/20 text-white/70'
                        }`}
                      >
                        {isPassed ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : index === 0 ? (
                          <Clock className="w-6 h-6" />
                        ) : index === 1 ? (
                          <Globe className="w-6 h-6" />
                        ) : index === 2 ? (
                          <Sparkles className="w-6 h-6" />
                        ) : (
                          <Send className="w-6 h-6" />
                        )}
                      </div>

                      {/* Node Label */}
                      <span className="mt-3 text-xs font-medium text-white leading-tight">
                        {node.label}
                      </span>
                      <span className="text-[10px] text-white/50 mt-0.5">
                        {isPassed ? 'Completed' : isCurrent ? 'Running...' : 'Ready'}
                      </span>
                    </div>

                    {index < selectedTemplate.nodes.length - 1 && (
                      <div className="relative z-10 text-white/30">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Pipeline Log Terminal */}
          <div className="mt-6 rounded-2xl bg-black/60 border border-white/15 p-4 font-mono text-xs text-emerald-300/90 max-h-40 overflow-y-auto space-y-1">
            <div className="text-white/50 text-[11px] pb-2 border-b border-white/10 flex items-center justify-between">
              <span>Pipeline Telemetry Console</span>
              <span className="text-emerald-400">Worker Status: Online</span>
            </div>
            {pipelineLogs.map((log, idx) => (
              <p key={idx} className="pt-1">{log}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
