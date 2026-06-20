"use client";

import { AlertTriangle, BarChart3, Building2, CheckCircle2, ClipboardCopy, Download, FileSearch, Gauge, LineChart, MessageSquareText, Network, RotateCcw, ShieldCheck, Sparkles, Users, Vote } from "lucide-react";
import { useState } from "react";

type Tone = "low" | "medium" | "high";
type Tab = "institutional" | "retail" | "board" | "internal";
type Proposal = {
  id: string;
  company: string;
  industry: string;
  meeting: string;
  base: string;
  title: string;
  type: string;
  risk: number;
  support: number;
  retail: number;
  excerpt: string;
  summary: string;
  primary: string;
  flags: string[];
  groups: { name: string; level: Tone; concern: string; question: string; response: string }[];
  actions: string[];
  evidence: string[];
};

const proposals: Proposal[] = [
  {
    id: "northstar-pay",
    company: "Northstar Consumer Holdings",
    industry: "Retail and consumer services",
    meeting: "May 22, 2026",
    base: "62% institutional, 28% retail, 10% insiders",
    title: "Advisory vote to approve executive compensation",
    type: "Say on Pay",
    risk: 76,
    support: 64,
    retail: 7.8,
    excerpt: "Shareholders are asked to approve, on an advisory basis, the compensation of the company's named executive officers.",
    summary: "This advisory vote asks whether shareholders support how top executives were paid last year. Low support can pressure the board to revise pay practices even though the vote is non-binding.",
    primary: "CEO compensation increased 21% while total shareholder return declined 8% and operating margin declined 3.4%.",
    flags: ["CEO pay increased 21%", "TSR declined 8%", "Bonus payout remained above target", "Peer median CEO pay is lower"],
    groups: [
      { name: "Institutional investors", level: "high", concern: "Pay for performance mismatch and compensation committee accountability.", question: "Why did bonus payout stay above target?", response: "Add a concise committee rationale tied to measurable goals." },
      { name: "Retail shareholders", level: "medium", concern: "Dense proxy language makes the advisory vote hard to understand.", question: "What am I approving?", response: "Add a plain-English box explaining vote mechanics and pay drivers." },
      { name: "Pension funds", level: "high", concern: "Executive pay growth may appear disconnected from long-term value.", question: "How does pay support durable returns?", response: "Show multi-year performance links, peer logic, and clawback oversight." },
      { name: "Activist investors", level: "medium", concern: "The pay story is a pressure point against management.", question: "Is the board responsive?", response: "Prepare holder outreach points before opposition narratives form." },
    ],
    actions: ["Clarify pay-for-performance rationale", "Add one-page retail compensation explainer", "Prepare outreach to top institutional holders", "Explain bonus metrics in plain English"],
    evidence: ["Compensation table", "TSR trend", "Operating margin summary", "Prior vote support", "Investor base composition"],
  },
  {
    id: "meridian-climate",
    company: "Meridian Energy Group",
    industry: "Energy infrastructure",
    meeting: "June 3, 2026",
    base: "71% institutional, 18% retail, 11% insiders",
    title: "Shareholder proposal on climate transition disclosure",
    type: "Climate disclosure",
    risk: 71,
    support: 58,
    retail: 6.4,
    excerpt: "Shareholders request a report describing how capital allocation aligns with stated transition planning commitments.",
    summary: "The proposal asks for clearer disclosure on capital allocation and transition planning. Prior support was meaningful, so large holders may expect evidence of responsiveness.",
    primary: "Prior support reached 38%, and the current management response is broad rather than specific.",
    flags: ["Prior support reached 38%", "Peer disclosure trend is improving", "Management response lacks detail", "Media risk is moderate"],
    groups: [
      { name: "Institutional investors", level: "high", concern: "Need evidence of responsiveness after prior support.", question: "What changed since last year?", response: "Summarize disclosure enhancements and board oversight cadence." },
      { name: "Retail shareholders", level: "medium", concern: "The proposal may sound abstract.", question: "What report is being requested?", response: "Explain capital allocation and transition planning in simple terms." },
      { name: "Governance funds", level: "high", concern: "Repeat support can become a board accountability issue.", question: "Did the board engage?", response: "Add engagement statistics and themes from holder meetings." },
    ],
    actions: ["Add board responsiveness paragraph", "Publish disclosure roadmap", "Prepare top-holder engagement brief"],
    evidence: ["Prior vote results", "Peer disclosure trend", "Management opposition statement", "Investor ownership mix"],
  },
  {
    id: "apex-director",
    company: "ApexCloud Systems",
    industry: "Enterprise software",
    meeting: "May 29, 2026",
    base: "68% institutional, 21% retail, 11% insiders",
    title: "Director reelection for compensation committee chair",
    type: "Director election",
    risk: 63,
    support: 74,
    retail: 4.9,
    excerpt: "Shareholders are asked to elect the listed director to serve until the next annual meeting.",
    summary: "The director vote is sensitive because the nominee chairs compensation and sits on several external boards. Director elections become risky when overboarding and committee accountability overlap.",
    primary: "The director sits on four public boards while also chairing the compensation committee.",
    flags: ["Director sits on four public boards", "Compensation committee chair", "Attendance disclosed at 82%", "Long tenure exceeds 13 years"],
    groups: [
      { name: "Institutional investors", level: "medium", concern: "Policy screens may flag overboarding.", question: "Can the director commit enough time?", response: "Explain board workload review and attendance trend." },
      { name: "Governance funds", level: "high", concern: "Committee chair accountability can drive opposition.", question: "Why retain this committee chair?", response: "Show committee outcomes and refreshment plan." },
    ],
    actions: ["Clarify time commitment review", "Add board refreshment note", "Prepare governance policy talking points"],
    evidence: ["Director biography", "Attendance disclosure", "Committee assignment", "Prior support"],
  },
  {
    id: "harbor-chair",
    company: "HarborPoint Financial",
    industry: "Financial services",
    meeting: "June 11, 2026",
    base: "65% institutional, 24% retail, 11% insiders",
    title: "Shareholder proposal to require an independent chair",
    type: "Governance bylaw change",
    risk: 68,
    support: 60,
    retail: 5.7,
    excerpt: "Shareholders request that the board adopt a policy requiring the chair of the board to be independent whenever possible.",
    summary: "The proposal targets board leadership structure. It is sensitive because combined CEO and chair roles often attract governance-focused investors, especially in financial services.",
    primary: "The CEO also serves as chair, while the lead independent director explanation is thin.",
    flags: ["CEO also serves as chair", "Lead independent director role is briefly described", "Two pension funds supported similar proposals", "Governance scrutiny is elevated"],
    groups: [
      { name: "Pension funds", level: "high", concern: "Independent chair is a recurring governance policy issue.", question: "Why is combined leadership best now?", response: "Explain lead director authority and review cadence." },
      { name: "Retail shareholders", level: "medium", concern: "Leadership structure needs simple explanation.", question: "Who oversees the CEO?", response: "Add plain-English lead director explainer." },
    ],
    actions: ["Expand lead director authority disclosure", "Prepare pension-fund outreach", "Add retail leadership structure explainer"],
    evidence: ["Board leadership disclosure", "Lead independent director duties", "Investor base", "Prior governance support"],
  },
];

const scenarios = [
  ["retail", "Retail participation +10%", -3],
  ["top3", "Top 3 institutions oppose", 14],
  ["advisory", "Proxy adviser negative", 10],
  ["clarity", "Disclosure clarity improved", -8],
  ["holders", "Board meets top holders", -5],
] as const;

const toneClass: Record<Tone, string> = {
  low: "border-emerald-200 bg-emerald-50 text-emerald-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  high: "border-rose-200 bg-rose-50 text-rose-700",
};

function clamp(value: number) { return Math.max(0, Math.min(100, value)); }
function riskTone(value: number): Tone { return value >= 70 ? "high" : value >= 45 ? "medium" : "low"; }
function Pill({ level, children }: { level: Tone; children: React.ReactNode }) { return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${toneClass[level]}`}>{children}</span>; }
function Metric({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: typeof Vote }) { return <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><span className="text-sm text-slate-500">{label}</span><Icon className="h-5 w-5 text-[#d71920]" /></div><p className="mt-3 text-3xl font-semibold text-slate-950">{value}</p><p className="mt-1 text-sm text-slate-500">{detail}</p></div>; }
function Title({ icon: Icon, eyebrow, title }: { icon: typeof Vote; eyebrow: string; title: string }) { return <div className="flex items-start gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-[#d71920]"><Icon className="h-5 w-5" /></div><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d71920]">{eyebrow}</p><h2 className="mt-1 text-xl font-semibold text-slate-950">{title}</h2></div></div>; }

function draftFor(tab: Tab, proposal: Proposal) {
  if (tab === "retail") return `This ${proposal.type} vote asks shareholders to review ${proposal.title.toLowerCase()}. The key issue is simple: ${proposal.primary}`;
  if (tab === "board") return `Board view: projected support is ${proposal.support}%. The team should address ${proposal.primary.toLowerCase()} before investor outreach.`;
  if (tab === "internal") return `Internal memo: ${proposal.primary} Current language explains the proposal, but it does not fully answer likely investor objections. Strengthen the narrative before proxy season escalates.`;
  return `Institutional version: ${proposal.summary} Governance teams should focus on ${proposal.primary.toLowerCase()} and prepare evidence-backed holder outreach.`;
}

export default function Home() {
  const [selectedId, setSelectedId] = useState("northstar-pay");
  const [tab, setTab] = useState<Tab>("institutional");
  const [delta, setDelta] = useState(0);
  const [reviewed, setReviewed] = useState(false);
  const [notice, setNotice] = useState("ProxyLens is ready. Select a synthetic proposal to analyze shareholder voting risk.");
  const [audit, setAudit] = useState(["Proxy package loaded for synthetic annual meeting.", "Neutral intelligence mode active: no vote recommendation generated.", "Investor concern map prepared from proposal type and holder mix."]);
  const selected = proposals.find((item) => item.id === selectedId) ?? proposals[0];
  const risk = clamp(selected.risk + delta);
  const support = clamp(selected.support - delta);
  const highRisk = proposals.filter((item) => item.risk >= 68).length;

  function addAudit(entry: string) { setAudit((items) => [entry, ...items].slice(0, 6)); }
  function choose(id: string) { const next = proposals.find((item) => item.id === id); if (!next) return; setSelectedId(id); setDelta(0); setReviewed(false); setNotice(`${next.company} loaded. ${next.type} risk logic and concern map refreshed.`); addAudit(`Proposal classifier identified ${next.type}.`); }
  function analyze() { setNotice(`${selected.type} analyzed. Estimated opposition risk is ${100 - support}% with ${selected.groups[0]?.name ?? "institutional holders"} most sensitive.`); addAudit(`Vote risk engine scored ${selected.title} at ${risk}/100.`); }
  function scenario(id: string) { const item = scenarios.find((entry) => entry[0] === id); if (!item) return; const next = Math.max(-30, Math.min(30, delta + item[2])); setDelta(next); setNotice(`${item[1]} applied. Projected support changed to ${clamp(selected.support - next)}%.`); addAudit(`Simulator scenario applied: ${item[1]}.`); }
  function reset() { setDelta(0); setNotice("Simulator reset to base assumptions."); addAudit("Vote outcome simulator reset."); }
  function generate() { setNotice(`${tab} communication generated. Draft remains neutral and shareholder-ready.`); addAudit(`Communication Studio generated ${tab} version.`); }
  async function copy() { try { await navigator.clipboard?.writeText(draftFor(tab, selected)); } catch {} setNotice(`${tab} communication copied or staged for review.`); addAudit(`Communication draft staged for ${tab}.`); }
  function review() { setReviewed(true); setNotice("Human review marked complete. Evidence pack is audit-ready for governance review."); addAudit("Human governance review completed."); }
  function exportBrief() { const blob = new Blob([JSON.stringify({ product: "ProxyLens AI", domain: "broadridge.asion.ai", company: selected.company, proposal: selected.title, risk, support, evidence: selected.evidence, actions: selected.actions }, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `${selected.id}-proxy-readiness-brief.json`; a.click(); URL.revokeObjectURL(url); setNotice("Proxy Readiness Brief exported with risk score, concern map, evidence, and communications."); addAudit("Proxy Readiness Brief exported."); }

  return <main className="min-h-screen bg-[#f5f6f8] text-slate-950"><div className="pointer-events-none fixed inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_12%_0%,rgba(215,25,32,0.16),transparent_28rem),radial-gradient(circle_at_88%_0%,rgba(255,107,58,0.12),transparent_26rem)]" /><div className="relative mx-auto flex max-w-[1500px] flex-col gap-5 px-4 py-4 sm:px-6 lg:px-8">
    <header className="flex flex-col gap-4 border-b border-slate-200 bg-white/75 pb-4 backdrop-blur md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-3"><div className="relative h-11 w-11 overflow-hidden rounded-lg bg-slate-950"><div className="absolute -left-3 top-1 h-9 w-10 rotate-12 rounded-full bg-[#d71920]" /><div className="absolute bottom-1 right-1 h-6 w-6 rounded-full bg-[#ff6b3a]" /><div className="absolute left-3 top-3 h-5 w-5 rounded-full bg-white" /></div><div><p className="text-sm font-semibold text-slate-500">broadridge.asion.ai</p><h1 className="text-3xl font-semibold tracking-normal">ProxyLens AI</h1></div></div><div className="flex flex-wrap gap-2"><Pill level="low">Neutral infrastructure mode</Pill><Pill level={reviewed ? "low" : "medium"}>{reviewed ? "Human reviewed" : "Human review pending"}</Pill><span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">Concept demo, not affiliated with Broadridge</span></div></header>
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><Metric label="Upcoming votes" value="12" detail="Synthetic proxy-season slate" icon={Vote} /><Metric label="High concern votes" value={String(highRisk)} detail="Risk score above threshold" icon={AlertTriangle} /><Metric label="Retail clarity risk" value={`${selected.retail}/10`} detail="Plain-language gap" icon={MessageSquareText} /><Metric label="Estimated opposition" value={`${100 - support}%`} detail="Current simulator view" icon={BarChart3} /></section>
    <section className="grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)_390px]"><aside className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"><Title icon={Building2} eyebrow="Proposal list" title="Proxy package" /><div className="mt-4 space-y-2">{proposals.map((item) => <button key={item.id} data-testid={`proposal-${item.id}`} onClick={() => choose(item.id)} className={`w-full rounded-lg border px-3 py-3 text-left transition ${item.id === selected.id ? "border-[#d71920] bg-rose-50" : "border-slate-200 bg-white hover:bg-rose-50"}`}><span className="block text-sm font-semibold">{item.company}</span><span className="mt-1 block text-xs text-slate-500">{item.title}</span></button>)}</div><div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600"><b className="text-slate-950">{selected.industry}</b><br />Meeting: {selected.meeting}<br />{selected.base}</div></aside>
      <section className="space-y-4"><div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d71920]">Governance intelligence cockpit</p><h2 className="mt-2 text-4xl font-semibold leading-tight tracking-normal">Proxy season intelligence before the vote becomes a problem.</h2><p className="mt-3 max-w-3xl leading-7 text-slate-600">ProxyLens identifies proposal type, governance red flags, investor concern patterns, neutral communication drafts, vote simulations, and evidence for human review.</p></div><button data-testid="analyze-vote" onClick={analyze} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#d71920] px-4 py-3 text-sm font-semibold text-white hover:bg-[#b9151b]"><FileSearch className="h-4 w-4" /> Analyze proxy vote</button></div></div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><Title icon={Vote} eyebrow="Proposal analyzer" title={selected.type} /><p className="mt-4 text-lg font-semibold text-slate-950">{selected.title}</p><div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4"><p className="text-sm font-semibold">Proxy excerpt</p><p className="mt-2 text-sm leading-6 text-slate-600">{selected.excerpt}</p></div><p className="mt-5 text-sm leading-7 text-slate-600">{selected.summary}</p></div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-col gap-5 sm:flex-row sm:items-center"><div className="grid h-32 w-32 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(#d71920 ${risk * 3.6}deg, #e7ecf3 ${risk * 3.6}deg)` }}><div className="grid h-20 w-20 place-items-center rounded-full bg-white shadow-sm"><span className="text-3xl font-semibold">{risk}</span></div></div><div><Pill level={riskTone(risk)}>{riskTone(risk) === "high" ? "High concern" : "Watch closely"}</Pill><h3 className="mt-3 text-2xl font-semibold">Vote risk score</h3><p className="mt-2 text-sm leading-6 text-slate-600">Projected support is {support}%. ProxyLens highlights likely pushback without recommending how anyone should vote.</p></div></div></div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><Title icon={Gauge} eyebrow="Risk logic" title="Weighted scoring signals" /><div className="mt-5 grid gap-3 md:grid-cols-2">{["Proposal sensitivity", "Investor base risk", "Disclosure weakness", "Prior controversy", "Retail clarity", "Peer trend"].map((label, index) => { const value = Math.max(4, Math.round((risk / 100) * (index < 3 ? 20 : 10)) - index); const max = index < 3 ? 20 : 10; return <div key={label}><div className="mb-1 flex justify-between text-sm"><span className="text-slate-600">{label}</span><span className="font-mono font-semibold">{value}/{max}</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-[#d71920]" style={{ width: `${(value / max) * 100}%` }} /></div></div>; })}</div></div></section>
      <aside className="space-y-4"><div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><Title icon={AlertTriangle} eyebrow="Red flags" title="Why investors may care" /><div className="mt-4 space-y-2">{selected.flags.map((flag) => <div key={flag} className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">{flag}</div>)}</div><div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-600"><b>Primary issue:</b> {selected.primary}</div></div><div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><Title icon={Network} eyebrow="Investor concern map" title="Likely pushback" /><div className="mt-4 space-y-3">{selected.groups.map((group) => <div key={group.name} className="rounded-lg border border-slate-200 bg-slate-50 p-3"><div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold">{group.name}</p><Pill level={group.level}>{group.level}</Pill></div><p className="mt-2 text-sm leading-6 text-slate-600">{group.concern}</p><p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Likely question</p><p className="mt-1 text-sm">{group.question}</p><p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Suggested response</p><p className="mt-1 text-sm">{group.response}</p></div>)}</div></div></aside></section>
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]"><div className="grid gap-4 lg:grid-cols-2"><div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><Title icon={LineChart} eyebrow="Outcome simulator" title="Change vote assumptions" /><div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4"><div className="flex justify-between"><span className="text-sm text-slate-600">Projected support</span><span className="text-3xl font-semibold">{support}%</span></div><div className="mt-3 h-3 rounded-full bg-slate-200"><div className="h-3 rounded-full bg-emerald-500" style={{ width: `${support}%` }} /></div></div><div className="mt-4 grid gap-2 sm:grid-cols-2">{scenarios.map(([id, label]) => <button key={id} data-testid={`scenario-${id}`} onClick={() => scenario(id)} className="rounded-lg border border-slate-200 bg-white px-3 py-3 text-left text-sm font-semibold hover:border-[#d71920] hover:bg-rose-50">{label}</button>)}<button data-testid="reset-simulator" onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 py-3 text-sm font-semibold text-white"><RotateCcw className="h-4 w-4" /> Reset simulator</button></div></div>
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><Title icon={MessageSquareText} eyebrow="Communication studio" title="Neutral shareholder explanations" /><div className="mt-4 grid grid-cols-2 gap-2">{(["institutional", "retail", "board", "internal"] as Tab[]).map((item) => <button key={item} data-testid={`comm-${item}`} onClick={() => { setTab(item); setNotice(`${item} communication selected.`); addAudit(`Communication tab changed to ${item}.`); }} className={`rounded-lg border px-3 py-2 text-sm font-semibold capitalize ${tab === item ? "border-[#d71920] bg-rose-50 text-[#d71920]" : "border-slate-200 bg-white text-slate-600"}`}>{item}</button>)}</div><div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">{draftFor(tab, selected)}</div><div className="mt-4 grid gap-2 sm:grid-cols-3"><button data-testid="generate-communication" onClick={generate} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d71920] px-3 py-3 text-sm font-semibold text-white"><Sparkles className="h-4 w-4" /> Generate</button><button data-testid="copy-memo" onClick={copy} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-semibold"><ClipboardCopy className="h-4 w-4" /> Copy</button><button data-testid="mark-reviewed" onClick={review} className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-3 text-sm font-semibold text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Review</button></div></div>
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2"><Title icon={ShieldCheck} eyebrow="Evidence pack" title="Proxy Readiness Brief" /><div className="mt-5 grid gap-4 lg:grid-cols-3"><div><p className="text-sm font-semibold">Recommended actions</p><div className="mt-3 space-y-2">{selected.actions.map((action) => <p key={action} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">{action}</p>)}</div></div><div><p className="text-sm font-semibold">Evidence used</p><div className="mt-3 space-y-2">{selected.evidence.map((item) => <p key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">{item}</p>)}</div></div><div><p className="text-sm font-semibold">Audit notes</p><div className="mt-3 space-y-2">{audit.map((item) => <p key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">{item}</p>)}</div></div></div><div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p data-testid="workspace-notice" className="text-sm font-semibold leading-6">{notice}</p><button data-testid="export-brief" onClick={exportBrief} className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white"><Download className="h-4 w-4" /> Export brief</button></div></div></div>
      <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><Title icon={Users} eyebrow="Neutrality guardrails" title="Not a proxy adviser" /><div className="mt-5 space-y-3 text-sm leading-6 text-slate-600"><p className="rounded-lg border border-slate-200 bg-slate-50 p-3">ProxyLens does not tell investors how to vote. It identifies likely concerns and communication gaps before the meeting.</p><p className="rounded-lg border border-slate-200 bg-slate-50 p-3">Every output includes evidence, rationale, and human review so governance teams can explain decisions without black-box AI.</p><p className="rounded-lg border border-slate-200 bg-slate-50 p-3">The demo uses fictional companies and synthetic proposal data only.</p></div></aside></section>
  </div></main>;
}
