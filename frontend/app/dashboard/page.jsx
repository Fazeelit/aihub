"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const dashboardNav = [
  { id: "overview", icon: "📊", label: "Overview" },
  { id: "chat", icon: "💬", label: "AI Chat", badge: "3" },
  { id: "nova", icon: "🤖", label: "Nova Receptionist", badge: "Live", badgeGreen: true },
  { id: "automations", icon: "⚡", label: "Automations" },
  { id: "docs", icon: "📄", label: "Documents" },
];

const kpis = [
  { tone: "a", label: "Leads Captured", value: "247", change: "↑ 34% vs last month" },
  { tone: "g", label: "Calls Handled by Nova", value: "189", change: "↑ 100% (was 0)" },
  { tone: "c", label: "Avg Response Time", value: "87s", change: "↓ 94% from 6 hrs" },
  { tone: "p", label: "Time Saved (hrs)", value: "43h", change: "↑ Automations running" },
];

const chartHeights = [30, 45, 60, 40, 70, 55, 80, 65, 90, 75, 85, 95, 100, 88];

const activityItems = [
  { color: "var(--green)", text: "Nova answered inbound call from +1 (703) 4XX-XXXX", time: "2m ago" },
  { color: "var(--amber)", text: "Lead captured: Sarah M. - wants lesson booking", time: "6m ago" },
  { color: "var(--cyan)", text: "Follow-up sequence triggered for Marcus T.", time: "14m ago" },
  { color: "var(--purple)", text: "Review request sent to James K. after lesson", time: "28m ago" },
  { color: "var(--green)", text: "Appointment confirmed: Aisha R. - Thu 2pm lesson", time: "1h ago" },
];

const conversations = [
  { title: "Driving school pricing strategy", time: "Just now", active: true },
  { title: "Summer marketing campaign ideas", time: "2h ago" },
  { title: "How to reduce no-show rates", time: "Yesterday" },
  { title: "Competitor analysis DMV area", time: "2 days ago" },
];

const automationsSeed = [
  {
    id: "lead-capture",
    triggerClass: "at-webhook",
    trigger: "⚡ Webhook Trigger",
    name: "Lead Capture → CRM",
    desc: "When Nova captures a lead via phone call, automatically create a contact in GoHighLevel CRM and assign to follow-up pipeline.",
    stats: [
      { value: "847", label: "Runs", className: "green" },
      { value: "99.2%", label: "Success", className: "amber" },
      { value: "2.3s", label: "Avg Time", style: { color: "var(--cyan)" } },
    ],
    enabled: true,
  },
  {
    id: "appointment-reminder",
    triggerClass: "at-schedule",
    trigger: "🕐 Scheduled",
    name: "Appointment Reminder",
    desc: "Send SMS reminder 24 hours before a scheduled driving lesson. Include instructor name, location, and what to bring.",
    stats: [
      { value: "234", label: "Sent", className: "green" },
      { value: "12%", label: "No-show reduction", className: "amber" },
    ],
    enabled: true,
  },
  {
    id: "review-request",
    triggerClass: "at-event",
    trigger: "📍 Post-Event",
    name: "Review Request",
    desc: "2 hours after a lesson is marked complete, send personalized SMS asking for a Google review with a direct link.",
    stats: [
      { value: "89", label: "Reviews", className: "green" },
      { value: "4.9★", label: "Avg Rating", className: "amber" },
    ],
    enabled: true,
  },
  {
    id: "cold-lead",
    triggerClass: "at-schedule",
    trigger: "🔁 7-Day Re-engage",
    name: "Cold Lead Nurture",
    desc: "If a lead hasn't booked after 7 days, send a sequence of 3 personalized follow-up messages over 2 weeks.",
    stats: [
      { value: "Paused", label: "Status", style: { color: "var(--muted)" } },
      { value: "18%", label: "Re-engage rate", className: "amber" },
    ],
    enabled: false,
  },
];

const documents = [
  {
    id: "policy",
    icon: "📋",
    name: "Student Policy Handbook",
    meta: "PDF · 24 pages · 1.2MB",
    badge: "✓ Indexed",
    badgeClass: "db-indexed",
  },
  {
    id: "contract",
    icon: "📝",
    name: "Instructor Contract Template",
    meta: "DOCX · 8 pages · 0.4MB",
    badge: "✓ Indexed",
    badgeClass: "db-indexed",
  },
  {
    id: "pricing",
    icon: "💰",
    name: "Pricing & Packages 2025",
    meta: "PDF · 2 pages · 0.1MB",
    badge: "Processing...",
    badgeClass: "db-processing",
  },
  {
    id: "routes",
    icon: "🗺️",
    name: "Route Maps & Test Areas",
    meta: "PDF · 12 pages · 3.4MB",
    badge: "✓ Indexed",
    badgeClass: "db-indexed",
  },
];

const settingsTabs = ["👤 Profile", "🔔 Notifications", "🔌 Integrations", "🤖 AI Model", "💳 Billing", "👥 Team"];

const themeVars = {
  "--bg": "#060911",
  "--bg2": "#0c1220",
  "--bg3": "#111927",
  "--bg4": "#16213a",
  "--border": "#1a2540",
  "--border2": "#243050",
  "--border3": "#2e3d5c",
  "--amber": "#f5a623",
  "--amber2": "#e09018",
  "--amber3": "#b87818",
  "--aglow": "rgba(245, 166, 35, 0.15)",
  "--cyan": "#22d3ee",
  "--green": "#10b981",
  "--red": "#ef4444",
  "--purple": "#a78bfa",
  "--blue": "#3b82f6",
  "--white": "#ffffff",
  "--text": "#e2e8f0",
  "--muted": "#64748b",
  "--subtle": "#1e2d42",
};

const cardClass =
  "rounded-[10px] border border-[var(--border)] bg-[var(--bg2)] p-5";

const headerClass =
  "flex shrink-0 items-center justify-between gap-3 border-b border-[var(--border)] px-7 py-5 min-[1440px]:px-9 min-[1440px]:py-6 max-[1080px]:flex-wrap max-[1080px]:items-start max-[1080px]:px-5 max-[1080px]:py-[18px] max-[720px]:p-4";

const contentClass =
  "flex-1 px-7 pb-8 pt-6 min-[1440px]:px-9 min-[1440px]:pb-10 min-[1440px]:pt-7 max-[1080px]:p-5 max-[720px]:p-4";

const navItemBase =
  "relative flex min-w-0 cursor-pointer items-center gap-[10px] px-4 py-[9px] text-[13px] transition-all duration-150 max-[1080px]:rounded-[10px] max-[1080px]:px-3 max-[1080px]:py-[10px]";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getKpiAccent(tone) {
  if (tone === "a") return "before:bg-[var(--amber)] text-[var(--amber)]";
  if (tone === "g") return "before:bg-[var(--green)] text-[var(--green)]";
  if (tone === "c") return "before:bg-[var(--cyan)] text-[var(--cyan)]";
  return "before:bg-[var(--purple)] text-[var(--purple)]";
}

function getTriggerClass(triggerClass) {
  if (triggerClass === "at-webhook") {
    return "bg-[rgba(34,211,238,0.1)] text-[var(--cyan)]";
  }

  if (triggerClass === "at-schedule") {
    return "bg-[rgba(167,139,250,0.1)] text-[var(--purple)]";
  }

  return "bg-[rgba(245,166,35,0.1)] text-[var(--amber)]";
}

function getDocBadgeClass(badgeClass) {
  return badgeClass === "db-indexed"
    ? "bg-[rgba(16,185,129,0.1)] text-[var(--green)]"
    : "bg-[rgba(245,166,35,0.1)] text-[var(--amber)]";
}

function getStatValueClass(className) {
  if (className === "green") return "text-[var(--green)]";
  if (className === "amber") return "text-[var(--amber)]";
  return "";
}

export default function DashboardPage() {
  const [activePanel, setActivePanel] = useState("overview");
  const [automations, setAutomations] = useState(automationsSeed);
  const [activeDocument, setActiveDocument] = useState("policy");
  const [activeSettingsTab, setActiveSettingsTab] = useState("👤 Profile");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [settingsToggles, setSettingsToggles] = useState({
    claude: true,
    streaming: true,
    history: true,
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedUser = localStorage.getItem("authUser");
    if (!storedUser) {
      return;
    }

    try {
      setLoggedInUser(JSON.parse(storedUser));
    } catch {
      setLoggedInUser(null);
    }
  }, []);

  const displayName = loggedInUser?.username || "Hasaan";
  const avatarLabel =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("") || "HA";

  const activeDocumentData = useMemo(
    () => documents.find((item) => item.id === activeDocument) ?? documents[0],
    [activeDocument],
  );

  const toggleAutomation = (automationId) => {
    setAutomations((current) =>
      current.map((item) =>
        item.id === automationId ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  const toggleSetting = (key) => {
    setSettingsToggles((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <main
      className="min-h-screen bg-[var(--bg)] font-['DM_Sans',sans-serif] text-[var(--text)]"
      style={themeVars}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] box-border bg-[var(--bg)] pt-12 min-[1440px]:max-w-[1600px] max-[1080px]:block max-[1080px]:pt-9 max-[720px]:pt-6">
        <div className="flex w-[240px] shrink-0 flex-col border-r border-[var(--border)] bg-[var(--bg2)] min-[1440px]:w-[260px] max-[1080px]:w-full max-[1080px]:border-b max-[1080px]:border-r-0">
          <div className="flex-1 overflow-y-auto py-3 max-[1080px]:grid max-[1080px]:grid-cols-2 max-[1080px]:gap-1 max-[1080px]:p-3 max-[720px]:grid-cols-1">
            <div className="px-4 pb-1 pt-2 font-['JetBrains_Mono',monospace] text-[8px] uppercase tracking-[2px] text-[var(--subtle)] max-[1080px]:col-span-full max-[1080px]:px-1 max-[1080px]:pb-1 max-[1080px]:pt-2">
              Main
            </div>

            {dashboardNav.map((item) => {
              const isActive = activePanel === item.id;

              return (
                <div
                  key={item.id}
                  className={cn(
                    navItemBase,
                    isActive
                      ? "bg-[rgba(245,166,35,0.07)] text-[var(--amber)]"
                      : "text-[var(--muted)] hover:bg-[rgba(255,255,255,0.03)] hover:text-[var(--text)]",
                  )}
                  onClick={() => setActivePanel(item.id)}
                >
                  {isActive ? (
                    <span className="absolute bottom-[6px] left-0 top-[6px] hidden w-[2px] rounded-r-[2px] bg-[var(--amber)] max-[1080px]:hidden lg:block" />
                  ) : null}
                  <span className="shrink-0 text-[15px]">{item.icon}</span>
                  {item.label}
                  {item.badge ? (
                    <span
                      className={cn(
                        "ml-auto rounded-[10px] px-[6px] py-[1px] font-['JetBrains_Mono',monospace] text-[9px] font-semibold text-[var(--bg)]",
                        item.badgeGreen ? "bg-[var(--green)]" : "bg-[var(--amber)]",
                      )}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </div>
              );
            })}

            <div className="mt-2 px-4 pb-1 pt-2 font-['JetBrains_Mono',monospace] text-[8px] uppercase tracking-[2px] text-[var(--subtle)] max-[1080px]:col-span-full max-[1080px]:px-1 max-[1080px]:pb-1 max-[1080px]:pt-2">
              Business
            </div>
            <div className={cn(navItemBase, "text-[var(--muted)] hover:bg-[rgba(255,255,255,0.03)] hover:text-[var(--text)]")}>
              <span className="shrink-0 text-[15px]">👥</span>Leads & CRM
            </div>
            <div className={cn(navItemBase, "text-[var(--muted)] hover:bg-[rgba(255,255,255,0.03)] hover:text-[var(--text)]")}>
              <span className="shrink-0 text-[15px]">📆</span>Appointments
            </div>
            <div className={cn(navItemBase, "text-[var(--muted)] hover:bg-[rgba(255,255,255,0.03)] hover:text-[var(--text)]")}>
              <span className="shrink-0 text-[15px]">⭐</span>Reviews
            </div>

            <div className="mt-2 px-4 pb-1 pt-2 font-['JetBrains_Mono',monospace] text-[8px] uppercase tracking-[2px] text-[var(--subtle)] max-[1080px]:col-span-full max-[1080px]:px-1 max-[1080px]:pb-1 max-[1080px]:pt-2">
              Account
            </div>
            <div
              className={cn(
                navItemBase,
                activePanel === "settings"
                  ? "bg-[rgba(245,166,35,0.07)] text-[var(--amber)]"
                  : "text-[var(--muted)] hover:bg-[rgba(255,255,255,0.03)] hover:text-[var(--text)]",
              )}
              onClick={() => setActivePanel("settings")}
            >
              {activePanel === "settings" ? (
                <span className="absolute bottom-[6px] left-0 top-[6px] hidden w-[2px] rounded-r-[2px] bg-[var(--amber)] max-[1080px]:hidden lg:block" />
              ) : null}
              <span className="shrink-0 text-[15px]">⚙️</span>Settings
            </div>
            <div className={cn(navItemBase, "text-[var(--muted)] hover:bg-[rgba(255,255,255,0.03)] hover:text-[var(--text)]")}>
              <span className="shrink-0 text-[15px]">💳</span>Billing
            </div>
          </div>

          <div className="border-t border-[var(--border)] p-[14px] max-[1080px]:p-3">
            <div className="flex cursor-pointer items-center gap-[10px] rounded-[8px] px-3 py-[10px] transition-colors duration-200 hover:bg-[var(--bg3)]">
              <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--amber),var(--amber3))] font-['Syne',sans-serif] text-[12px] font-extrabold text-[var(--bg)]">
                {avatarLabel}
              </div>
              <div className="min-w-0 flex-1">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[12px] font-medium text-[var(--white)]">
                  {displayName}
                </div>
                <div className="text-[10px] text-[var(--muted)] max-[720px]:text-[11px]">
                  Pro Plan · $149/mo
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          <div className={cn(activePanel === "overview" ? "block" : "hidden")}>
            <div className={headerClass}>
              <div>
                <div className="font-['Syne',sans-serif] text-[20px] font-extrabold tracking-[-0.5px] text-[var(--white)]">
                  Overview
                </div>
                <div className="mt-[2px] text-[12px] text-[var(--muted)] max-[720px]:text-[11px]">
                  Nest Driving School · Last 30 days
                </div>
              </div>
              <div className="flex items-center gap-2 max-[1080px]:w-full max-[1080px]:flex-wrap">
                <span className="inline-flex items-center gap-[6px] rounded-[4px] bg-[rgba(16,185,129,0.1)] px-[10px] py-1 font-['JetBrains_Mono',monospace] text-[10px] text-[var(--green)] max-[720px]:w-full max-[720px]:justify-center">
                  ● Nova Live
                </span>
                <Link
                  href="/onboarding"
                  className="inline-flex items-center justify-center rounded-[6px] bg-[var(--amber)] px-[14px] py-[6px] text-[12px] font-semibold text-[var(--bg)] transition-colors duration-200 hover:bg-[var(--amber2)] max-[720px]:w-full"
                >
                  Back to Onboarding
                </Link>
                <button
                  type="button"
                  className="cursor-pointer rounded-[6px] bg-[var(--amber)] px-[14px] py-[6px] text-[12px] font-semibold text-[var(--bg)] transition-colors duration-200 hover:bg-[var(--amber2)] max-[720px]:w-full"
                >
                  + New Automation
                </button>
              </div>
            </div>

            <div className={contentClass}>
              <div className="mb-5 grid grid-cols-4 gap-[14px] max-[1080px]:grid-cols-1 max-[720px]:gap-[10px]">
                {kpis.map((item) => (
                  <div
                    key={item.label}
                    className={cn(
                      "relative overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--bg2)] p-[18px] before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[3px] before:content-['']",
                      getKpiAccent(item.tone),
                    )}
                  >
                    <div className="mb-2 font-['JetBrains_Mono',monospace] text-[9px] uppercase tracking-[2px] text-[var(--muted)]">
                      {item.label}
                    </div>
                    <div className="mb-1 font-['Syne',sans-serif] text-[28px] font-extrabold tracking-[-1px]">
                      {item.value}
                    </div>
                    <div className="text-[11px] text-[var(--green)]">{item.change}</div>
                  </div>
                ))}
              </div>

              <div className="mb-[14px] grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-[14px] max-[1080px]:grid-cols-1">
                <div className={cardClass}>
                  <div className="mb-4 flex items-center justify-between font-['Syne',sans-serif] text-[14px] font-bold text-[var(--white)]">
                    Leads This Month
                    <span className="font-['DM_Sans',sans-serif] text-[11px] font-normal text-[var(--muted)]">
                      Daily capture
                    </span>
                  </div>
                  <div className="flex h-20 items-end gap-1">
                    {chartHeights.map((height, index) => (
                      <div
                        key={`${height}-${index}`}
                        className={cn(
                          "min-h-1 flex-1 rounded-t-[3px] bg-[var(--subtle)] transition-colors duration-300",
                          index >= chartHeights.length - 2 && "bg-[var(--amber)]",
                        )}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className={cardClass}>
                  <div className="mb-4 font-['Syne',sans-serif] text-[14px] font-bold text-[var(--white)]">
                    Live Activity
                  </div>
                  <div className="flex flex-col">
                    {activityItems.map((item, index) => (
                      <div
                        key={`${item.text}-${item.time}`}
                        className={cn(
                          "flex items-center gap-[10px] py-[9px] text-[12px]",
                          index !== activityItems.length - 1 && "border-b border-[var(--border)]",
                          "max-[720px]:flex-wrap max-[720px]:items-start",
                        )}
                      >
                        <div
                          className="h-[7px] w-[7px] shrink-0 rounded-full"
                          style={{ background: item.color }}
                        />
                        <span className="flex-1 text-[var(--text)]">{item.text}</span>
                        <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[var(--muted)] max-[720px]:pl-[17px]">
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-[14px] rounded-[10px] border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.06)] px-[18px] py-4 max-[1080px]:flex-wrap max-[1080px]:items-start">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[rgba(245,166,35,0.4)] bg-[linear-gradient(135deg,rgba(245,166,35,0.3),rgba(245,166,35,0.1))] text-[20px]">
                  🤖
                  <div className="absolute inset-[-4px] animate-pulse rounded-full border border-[rgba(16,185,129,0.4)]" />
                </div>
                <div className="flex-1">
                  <div className="mb-[2px] text-[14px] font-semibold text-[var(--white)]">
                    Nova is active and answering calls
                  </div>
                  <div className="text-[11px] text-[var(--muted)]">
                    AI receptionist · ElevenLabs voice · 24/7 coverage
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 max-[1080px]:w-full">
                  <div className="text-center">
                    <div className="font-['Syne',sans-serif] text-[16px] font-extrabold text-[var(--green)]">
                      189
                    </div>
                    <div className="text-[10px] text-[var(--muted)]">Calls this month</div>
                  </div>
                  <div className="text-center">
                    <div className="font-['Syne',sans-serif] text-[16px] font-extrabold text-[var(--green)]">
                      98%
                    </div>
                    <div className="text-[10px] text-[var(--muted)]">Handled</div>
                  </div>
                  <div className="text-center">
                    <div className="font-['Syne',sans-serif] text-[16px] font-extrabold text-[var(--green)]">
                      4.9★
                    </div>
                    <div className="text-[10px] text-[var(--muted)]">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cn(activePanel === "chat" ? "block" : "hidden")}>
            <div className={headerClass}>
              <div>
                <div className="font-['Syne',sans-serif] text-[20px] font-extrabold tracking-[-0.5px] text-[var(--white)]">
                  AI Chat
                </div>
                <div className="mt-[2px] text-[12px] text-[var(--muted)] max-[720px]:text-[11px]">
                  Powered by Claude · Ask anything about your business
                </div>
              </div>
              <div className="flex items-center gap-2 max-[1080px]:w-full max-[1080px]:flex-wrap">
                <span className="inline-flex items-center gap-[6px] rounded-[4px] border border-[rgba(245,166,35,0.2)] bg-[rgba(245,166,35,0.1)] px-[10px] py-[3px] font-['JetBrains_Mono',monospace] text-[10px] text-[var(--amber)]">
                  claude-sonnet
                </span>
              </div>
            </div>

            <div className={cn(contentClass, "pt-4")}>
              <div className="grid min-h-[560px] grid-cols-[minmax(220px,260px)_minmax(0,1fr)] gap-[14px] min-[1440px]:min-h-[620px] max-[1080px]:grid-cols-1 max-[1080px]:min-h-0">
                <div className="flex w-[220px] shrink-0 flex-col overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--bg2)] max-[1080px]:w-full">
                  <div className="flex items-center justify-between border-b border-[var(--border)] p-[14px]">
                    <span className="text-[13px] font-semibold text-[var(--white)]">
                      Conversations
                    </span>
                    <button
                      type="button"
                      className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] bg-[var(--amber)] text-[16px] text-[var(--bg)]"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2">
                    {conversations.map((item) => (
                      <div
                        key={item.title}
                        className={cn(
                          "mb-[2px] cursor-pointer rounded-[7px] px-[10px] py-[10px] text-[12px] transition-all duration-200",
                          item.active
                            ? "bg-[rgba(245,166,35,0.08)] text-[var(--amber)]"
                            : "text-[var(--muted)] hover:bg-[var(--bg3)] hover:text-[var(--text)]",
                        )}
                      >
                        <div className="mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap font-medium">
                          {item.title}
                        </div>
                        <div className="font-['JetBrains_Mono',monospace] text-[10px] text-[var(--subtle)]">
                          {item.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex min-w-0 flex-col overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--bg2)]">
                  <div className="flex items-center gap-[10px] border-b border-[var(--border)] px-[18px] py-[14px] max-[720px]:flex-wrap max-[720px]:px-[14px] max-[720px]:py-3">
                    <span className="text-[13px] font-medium text-[var(--white)]">
                      Driving school pricing strategy
                    </span>
                    <span className="ml-auto rounded-[4px] border border-[rgba(245,166,35,0.2)] bg-[rgba(245,166,35,0.1)] px-[10px] py-[3px] font-['JetBrains_Mono',monospace] text-[10px] text-[var(--amber)]">
                      claude-sonnet-4
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5 max-[720px]:p-[14px]">
                    <div className="flex flex-row-reverse items-start gap-[10px] max-[720px]:flex-col max-[720px]:items-end">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--amber),var(--amber3))] font-['Syne',sans-serif] text-[11px] font-extrabold text-[var(--bg)]">
                        {avatarLabel}
                      </div>
                      <div>
                        <div className="max-w-[min(75%,680px)] rounded-[10px] bg-[var(--amber)] px-[14px] py-[11px] text-[13px] font-medium leading-[1.6] text-[var(--bg)] max-[720px]:max-w-full">
                          What&apos;s a competitive pricing strategy for a driving school in
                          the DMV area? We currently charge $65/lesson but I think we&apos;re
                          underpriced.
                        </div>
                        <div className="mt-[3px] text-right font-['JetBrains_Mono',monospace] text-[9px] text-[var(--subtle)]">
                          10:42 AM
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-[10px] max-[720px]:flex-col">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(245,166,35,0.3)] bg-[rgba(245,166,35,0.15)] text-[12px]">
                        🤖
                      </div>
                      <div>
                        <div className="max-w-[min(75%,680px)] rounded-[10px] border border-[var(--border)] bg-[var(--bg3)] px-[14px] py-[11px] text-[13px] leading-[1.6] text-[var(--text)] max-[720px]:max-w-full">
                          Based on current market data for the DMV area, $65/lesson is
                          indeed below the market median. Here&apos;s what I recommend:
                          <br />
                          <br />
                          <strong>Market positioning:</strong> Most driving schools in
                          Northern Virginia charge $75-$95/lesson for a 60-min session.
                          Maryland tends to run $70-$85.
                          <br />
                          <br />
                          <strong>Recommendation:</strong> Move to $79/lesson with a
                          &quot;10-lesson package&quot; at $699 (saving $91). This positions
                          you as premium over discount competitors while remaining
                          accessible.
                          <br />
                          <br />
                          You could also add a &quot;Road Test Ready&quot; package at $299 (3
                          lessons + road test accompaniment) which commands higher margin.
                        </div>
                        <div className="mt-[3px] font-['JetBrains_Mono',monospace] text-[9px] text-[var(--subtle)]">
                          10:42 AM
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row-reverse items-start gap-[10px] max-[720px]:flex-col max-[720px]:items-end">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--amber),var(--amber3))] font-['Syne',sans-serif] text-[11px] font-extrabold text-[var(--bg)]">
                        {avatarLabel}
                      </div>
                      <div>
                        <div className="max-w-[min(75%,680px)] rounded-[10px] bg-[var(--amber)] px-[14px] py-[11px] text-[13px] font-medium leading-[1.6] text-[var(--bg)] max-[720px]:max-w-full">
                          Can you write me an email announcing the new pricing to existing
                          students?
                        </div>
                        <div className="mt-[3px] text-right font-['JetBrains_Mono',monospace] text-[9px] text-[var(--subtle)]">
                          10:44 AM
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-[10px] max-[720px]:flex-col">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(245,166,35,0.3)] bg-[rgba(245,166,35,0.15)] text-[12px]">
                        🤖
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-1 rounded-[10px] border border-[var(--border)] bg-[var(--bg3)] px-[14px] py-3">
                          <div className="h-[6px] w-[6px] animate-bounce rounded-full bg-[var(--muted)]" />
                          <div className="[animation-delay:150ms] h-[6px] w-[6px] animate-bounce rounded-full bg-[var(--muted)]" />
                          <div className="[animation-delay:300ms] h-[6px] w-[6px] animate-bounce rounded-full bg-[var(--muted)]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[var(--border)] p-[14px]">
                    <div className="flex items-end gap-2 rounded-[10px] border border-[var(--border)] bg-[var(--bg)] px-3 py-[10px] focus-within:border-[var(--amber)]">
                      <textarea
                        className="max-h-[100px] flex-1 resize-none bg-transparent text-[13px] text-[var(--text)] outline-none placeholder:text-[var(--subtle)]"
                        placeholder="Ask anything about your business..."
                        rows={1}
                      />
                      <button
                        type="button"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] bg-[var(--amber)] text-[14px] text-[var(--bg)] transition-colors duration-200 hover:bg-[var(--amber2)]"
                      >
                        ↑
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cn(activePanel === "automations" ? "block" : "hidden")}>
            <div className={headerClass}>
              <div>
                <div className="font-['Syne',sans-serif] text-[20px] font-extrabold tracking-[-0.5px] text-[var(--white)]">
                  Automations
                </div>
                <div className="mt-[2px] text-[12px] text-[var(--muted)] max-[720px]:text-[11px]">
                  4 active workflows · 1,247 runs this month
                </div>
              </div>
              <div className="flex items-center gap-2 max-[1080px]:w-full max-[1080px]:flex-wrap">
                <button
                  type="button"
                  className="cursor-pointer rounded-[6px] bg-[var(--amber)] px-[14px] py-[6px] text-[12px] font-semibold text-[var(--bg)] transition-colors duration-200 hover:bg-[var(--amber2)] max-[720px]:w-full"
                >
                  + New Workflow
                </button>
              </div>
            </div>

            <div className={contentClass}>
              <div className="mb-4 grid grid-cols-2 gap-3 max-[1080px]:grid-cols-1">
                {automations.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[10px] border border-[var(--border)] bg-[var(--bg2)] p-5 transition-colors duration-200 hover:border-[var(--border2)]"
                  >
                    <div className="mb-3 flex items-start justify-between max-[720px]:gap-[10px]">
                      <div>
                        <div
                          className={cn(
                            "mb-[10px] w-fit rounded-[4px] px-2 py-[3px] font-['JetBrains_Mono',monospace] text-[9px]",
                            getTriggerClass(item.triggerClass),
                          )}
                        >
                          {item.trigger}
                        </div>
                        <div className="font-['Syne',sans-serif] text-[14px] font-bold text-[var(--white)]">
                          {item.name}
                        </div>
                      </div>
                      <div
                        className={cn(
                          "relative h-5 w-9 shrink-0 cursor-pointer rounded-[10px] transition-colors duration-200",
                          item.enabled ? "bg-[var(--green)]" : "bg-[var(--subtle)]",
                        )}
                        onClick={() => toggleAutomation(item.id)}
                      >
                        <div
                          className={cn(
                            "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all duration-200",
                            item.enabled ? "left-[18px]" : "left-0.5",
                          )}
                        />
                      </div>
                    </div>
                    <div className="mb-[14px] text-[12px] leading-[1.5] text-[var(--muted)]">
                      {item.desc}
                    </div>
                    <div className="flex flex-wrap gap-4 max-[720px]:gap-3">
                      {item.stats.map((stat) => (
                        <div key={stat.label} className="text-[11px] text-[var(--muted)]">
                          <span
                            className={cn(
                              "block font-['Syne',sans-serif] text-[14px] font-bold",
                              getStatValueClass(stat.className),
                            )}
                            style={stat.style}
                          >
                            {stat.value}
                          </span>
                          {stat.label}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={cn(activePanel === "docs" ? "block" : "hidden")}>
            <div className={headerClass}>
              <div>
                <div className="font-['Syne',sans-serif] text-[20px] font-extrabold tracking-[-0.5px] text-[var(--white)]">
                  Document Intelligence
                </div>
                <div className="mt-[2px] text-[12px] text-[var(--muted)] max-[720px]:text-[11px]">
                  Ask questions about your business documents
                </div>
              </div>
              <div className="flex items-center gap-2 max-[1080px]:w-full max-[1080px]:flex-wrap">
                <button
                  type="button"
                  className="cursor-pointer rounded-[6px] bg-[var(--amber)] px-[14px] py-[6px] text-[12px] font-semibold text-[var(--bg)] transition-colors duration-200 hover:bg-[var(--amber2)] max-[720px]:w-full"
                >
                  + Upload Document
                </button>
              </div>
            </div>

            <div className={cn(contentClass, "pt-4")}>
              <div className="grid min-h-[560px] grid-cols-[minmax(240px,280px)_minmax(0,1fr)] gap-[14px] min-[1440px]:min-h-[620px] max-[1080px]:grid-cols-1 max-[1080px]:min-h-0">
                <div className="flex w-[260px] shrink-0 flex-col overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--bg2)] max-[1080px]:w-full">
                  <div className="flex items-center justify-between border-b border-[var(--border)] p-[14px] max-[720px]:px-[14px] max-[720px]:py-3">
                    <span className="text-[13px] font-semibold text-[var(--white)]">
                      Documents
                    </span>
                    <button
                      type="button"
                      className="rounded-[6px] bg-[var(--amber)] px-3 py-[5px] text-[11px] font-semibold text-[var(--bg)]"
                    >
                      + Upload
                    </button>
                  </div>
                  {documents.map((document) => (
                    <div
                      key={document.id}
                      className={cn(
                        "cursor-pointer border-b border-[var(--border)] px-[14px] py-3 transition-colors duration-200 hover:bg-[var(--bg3)]",
                        activeDocument === document.id &&
                          "bg-[rgba(245,166,35,0.07)]",
                      )}
                      onClick={() => setActiveDocument(document.id)}
                    >
                      <div className="mb-1 text-[18px]">{document.icon}</div>
                      <div className="mb-[2px] text-[12px] font-medium text-[var(--white)]">
                        {document.name}
                      </div>
                      <div className="text-[10px] text-[var(--muted)]">
                        {document.meta}
                      </div>
                      <div
                        className={cn(
                          "mt-1 w-fit rounded-[3px] px-[7px] py-[2px] font-['JetBrains_Mono',monospace] text-[9px]",
                          getDocBadgeClass(document.badgeClass),
                        )}
                      >
                        {document.badge}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex min-w-0 flex-col overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--bg2)]">
                  <div className="border-b border-[var(--border)] px-[18px] py-[14px] max-[720px]:px-[14px] max-[720px]:py-3">
                    <div className="mb-[2px] text-[13px] font-semibold text-[var(--white)]">
                      {activeDocumentData.icon} {activeDocumentData.name}
                    </div>
                    <div className="text-[11px] text-[var(--muted)]">
                      Ask any question about this document
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-[14px] overflow-y-auto p-5 max-[720px]:p-[14px]">
                    <div className="ml-auto max-w-[min(80%,720px)] self-end rounded-[9px] bg-[var(--amber)] px-[14px] py-3 text-[13px] font-medium leading-[1.6] text-[var(--bg)] max-[720px]:max-w-full">
                      What&apos;s our cancellation policy for lessons?
                    </div>
                    <div className="max-w-[min(80%,720px)] rounded-[9px] border border-[var(--border)] bg-[var(--bg3)] px-[14px] py-3 text-[13px] leading-[1.6] text-[var(--text)] max-[720px]:max-w-full">
                      According to the Student Policy Handbook (Section 4.2), the
                      cancellation policy is:
                      <br />
                      <br />
                      • <strong>24+ hours notice:</strong> Full credit applied to next
                      lesson
                      <br />
                      • <strong>12-24 hours:</strong> 50% credit applied
                      <br />
                      • <strong>Less than 12 hours:</strong> No refund or credit
                      <br />
                      • <strong>No-show:</strong> Lesson forfeited, no refund
                      <br />
                      <br />
                      Students may request a one-time emergency exception per enrollment.
                      <div className="mt-[6px] border-t border-[var(--border)] pt-[6px] font-['JetBrains_Mono',monospace] text-[10px] text-[var(--muted)]">
                        📍 Source: Policy Handbook, Section 4.2, Page 11
                      </div>
                    </div>
                    <div className="ml-auto max-w-[min(80%,720px)] self-end rounded-[9px] bg-[var(--amber)] px-[14px] py-3 text-[13px] font-medium leading-[1.6] text-[var(--bg)] max-[720px]:max-w-full">
                      What age do students need to be to enroll?
                    </div>
                    <div className="max-w-[min(80%,720px)] rounded-[9px] border border-[var(--border)] bg-[var(--bg3)] px-[14px] py-3 text-[13px] leading-[1.6] text-[var(--text)] max-[720px]:max-w-full">
                      Students must be at least <strong>15 years and 9 months old</strong>{" "}
                      to begin driving lessons in Virginia (to obtain a learner&apos;s
                      permit at 15 years 10 months). In Maryland, the minimum age is{" "}
                      <strong>15 years and 9 months</strong> as well, with a learner&apos;s
                      permit available at 15 years 10 months.
                      <div className="mt-[6px] border-t border-[var(--border)] pt-[6px] font-['JetBrains_Mono',monospace] text-[10px] text-[var(--muted)]">
                        📍 Source: Policy Handbook, Section 2.1, Page 4
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[var(--border)] p-3">
                    <div className="flex items-end gap-2 rounded-[10px] border border-[var(--border)] bg-[var(--bg)] px-3 py-[10px] focus-within:border-[var(--amber)]">
                      <textarea
                        className="max-h-[100px] flex-1 resize-none bg-transparent text-[13px] text-[var(--text)] outline-none placeholder:text-[var(--subtle)]"
                        placeholder="Ask a question about this document..."
                        rows={1}
                      />
                      <button
                        type="button"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] bg-[var(--amber)] text-[14px] text-[var(--bg)] transition-colors duration-200 hover:bg-[var(--amber2)]"
                      >
                        ↑
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cn(activePanel === "nova" ? "block" : "hidden")}>
            <div className={headerClass}>
              <div>
                <div className="font-['Syne',sans-serif] text-[20px] font-extrabold tracking-[-0.5px] text-[var(--white)]">
                  Nova - AI Receptionist
                </div>
                <div className="mt-[2px] text-[12px] text-[var(--muted)] max-[720px]:text-[11px]">
                  ElevenLabs Voice AI · Live 24/7
                </div>
              </div>
              <div className="flex items-center gap-2 max-[1080px]:w-full max-[1080px]:flex-wrap">
                <span className="inline-flex items-center gap-[6px] rounded-[4px] bg-[rgba(16,185,129,0.1)] px-3 py-[5px] text-[11px] text-[var(--green)] max-[720px]:w-full max-[720px]:justify-center">
                  ● Active &amp; Answering
                </span>
              </div>
            </div>

            <div className={contentClass}>
              <div className="grid grid-cols-2 gap-[14px] max-[1080px]:grid-cols-1">
                <div className={cardClass}>
                  <div className="mb-4 font-['Syne',sans-serif] text-[14px] font-bold text-[var(--white)]">
                    Nova Status
                  </div>
                  <div className="mb-4 flex items-center gap-[14px] rounded-[10px] border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.06)] px-[18px] py-4 max-[1080px]:flex-wrap max-[1080px]:items-start">
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[rgba(245,166,35,0.4)] bg-[linear-gradient(135deg,rgba(245,166,35,0.3),rgba(245,166,35,0.1))] text-[20px]">
                      🤖
                      <div className="absolute inset-[-4px] animate-pulse rounded-full border border-[rgba(16,185,129,0.4)]" />
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-[var(--white)]">
                        Nova is live
                      </div>
                      <div className="text-[11px] text-[var(--green)]">
                        Answering calls right now
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <div className="flex items-center justify-between gap-[14px] border-b border-[var(--border)] py-3 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
                      <div>
                        <div className="text-[13px] text-[var(--text)]">Voice Style</div>
                        <div className="mt-[2px] text-[11px] text-[var(--muted)]">
                          Friendly &amp; Professional
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-[6px] rounded-[4px] border border-[rgba(245,166,35,0.2)] bg-[rgba(245,166,35,0.1)] px-[10px] py-[3px] font-['JetBrains_Mono',monospace] text-[10px] text-[var(--amber)]">
                        ElevenLabs
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-[14px] border-b border-[var(--border)] py-3 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
                      <div>
                        <div className="text-[13px] text-[var(--text)]">Coverage</div>
                      </div>
                      <span className="inline-flex items-center gap-[6px] rounded-[4px] bg-[rgba(16,185,129,0.1)] px-[10px] py-[3px] font-['JetBrains_Mono',monospace] text-[10px] text-[var(--green)]">
                        24/7
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-[14px] py-3 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
                      <div>
                        <div className="text-[13px] text-[var(--text)]">Language</div>
                      </div>
                      <span className="text-[12px] text-[var(--muted)]">
                        English (US)
                      </span>
                    </div>
                  </div>
                </div>

                <div className={cardClass}>
                  <div className="mb-4 font-['Syne',sans-serif] text-[14px] font-bold text-[var(--white)]">
                    This Month
                  </div>
                  <div className="grid grid-cols-2 gap-[10px] max-[1080px]:grid-cols-1">
                    <div className="relative overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--bg2)] p-[18px] before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[3px] before:bg-[var(--green)] before:content-['']">
                      <div className="mb-2 font-['JetBrains_Mono',monospace] text-[9px] uppercase tracking-[2px] text-[var(--muted)]">
                        Calls Handled
                      </div>
                      <div className="font-['Syne',sans-serif] text-[22px] font-extrabold text-[var(--green)]">
                        189
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--bg2)] p-[18px] before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[3px] before:bg-[var(--amber)] before:content-['']">
                      <div className="mb-2 font-['JetBrains_Mono',monospace] text-[9px] uppercase tracking-[2px] text-[var(--muted)]">
                        Leads Captured
                      </div>
                      <div className="font-['Syne',sans-serif] text-[22px] font-extrabold text-[var(--amber)]">
                        143
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--bg2)] p-[18px] before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[3px] before:bg-[var(--cyan)] before:content-['']">
                      <div className="mb-2 font-['JetBrains_Mono',monospace] text-[9px] uppercase tracking-[2px] text-[var(--muted)]">
                        Avg Call Length
                      </div>
                      <div className="font-['Syne',sans-serif] text-[22px] font-extrabold text-[var(--cyan)]">
                        2.4m
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--bg2)] p-[18px] before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[3px] before:bg-[var(--purple)] before:content-['']">
                      <div className="mb-2 font-['JetBrains_Mono',monospace] text-[9px] uppercase tracking-[2px] text-[var(--muted)]">
                        Satisfaction
                      </div>
                      <div className="font-['Syne',sans-serif] text-[22px] font-extrabold text-[var(--purple)]">
                        4.9★
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={cn(cardClass, "mt-[14px]")}>
                <div className="mb-4 font-['Syne',sans-serif] text-[14px] font-bold text-[var(--white)]">
                  Recent Calls
                </div>
                <div className="flex flex-col">
                  {[
                    {
                      color: "var(--green)",
                      text: "Inbound call from +1 (703) 4XX-XXXX - Lead captured: Lesson booking for Sarah M.",
                      time: "2m ago",
                    },
                    {
                      color: "var(--amber)",
                      text: 'Inbound call - FAQ: "What age do I need to be to start?" - Answered by Nova',
                      time: "18m ago",
                    },
                    {
                      color: "var(--green)",
                      text: "Inbound call from +1 (240) 5XX-XXXX - Appointment rescheduled for James T.",
                      time: "45m ago",
                    },
                    {
                      color: "var(--cyan)",
                      text: "Inbound call - Pricing inquiry - Lead captured, follow-up triggered automatically",
                      time: "1.2h ago",
                    },
                  ].map((item, index, items) => (
                    <div
                      key={`${item.text}-${item.time}`}
                      className={cn(
                        "flex items-center gap-[10px] py-[9px] text-[12px]",
                        index !== items.length - 1 && "border-b border-[var(--border)]",
                        "max-[720px]:flex-wrap max-[720px]:items-start",
                      )}
                    >
                      <div
                        className="h-[7px] w-[7px] shrink-0 rounded-full"
                        style={{ background: item.color }}
                      />
                      <span className="flex-1 text-[var(--text)]">{item.text}</span>
                      <span className="font-['JetBrains_Mono',monospace] text-[10px] text-[var(--muted)] max-[720px]:pl-[17px]">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={cn(activePanel === "settings" ? "block" : "hidden")}>
            <div className={headerClass}>
              <div>
                <div className="font-['Syne',sans-serif] text-[20px] font-extrabold tracking-[-0.5px] text-[var(--white)]">
                  Settings
                </div>
                <div className="mt-[2px] text-[12px] text-[var(--muted)] max-[720px]:text-[11px]">
                  Manage your account and preferences
                </div>
              </div>
            </div>

            <div className={contentClass}>
              <div className="grid grid-cols-[220px_minmax(0,1fr)] gap-[14px] max-[1080px]:grid-cols-1">
                <div className="h-fit rounded-[10px] border border-[var(--border)] bg-[var(--bg2)] px-0 py-2">
                  {settingsTabs.map((tab) => (
                    <div
                      key={tab}
                      className={cn(
                        "flex cursor-pointer items-center gap-[10px] px-4 py-[10px] text-[13px] transition-all duration-200",
                        activeSettingsTab === tab
                          ? "bg-[rgba(245,166,35,0.07)] text-[var(--amber)]"
                          : "text-[var(--muted)] hover:bg-[rgba(255,255,255,0.03)] hover:text-[var(--text)]",
                      )}
                      onClick={() => setActiveSettingsTab(tab)}
                    >
                      {tab}
                    </div>
                  ))}
                </div>

                <div className="rounded-[10px] border border-[var(--border)] bg-[var(--bg2)] p-6 max-[720px]:p-4">
                  <div className="mb-5 font-['Syne',sans-serif] text-[17px] font-bold text-[var(--white)]">
                    {activeSettingsTab.replace(/^[^ ]+\s/, "")} Settings
                  </div>

                  <div className="mb-6">
                    <div className="mb-3 font-['JetBrains_Mono',monospace] text-[12px] font-semibold uppercase tracking-[1px] text-[var(--muted)]">
                      Business Info
                    </div>
                    <div className="mb-3 grid grid-cols-2 gap-3 max-[1080px]:grid-cols-1">
                      <div className="mb-4">
                        <label className="mb-[5px] block font-['JetBrains_Mono',monospace] text-[11px] font-medium uppercase tracking-[1px] text-[var(--muted)]">
                          Business Name
                        </label>
                        <input
                          className="w-full rounded-[7px] border border-[var(--border)] bg-[var(--bg)] px-[14px] py-[11px] text-[13px] text-[var(--text)] outline-none transition-colors duration-200 focus:border-[var(--amber)]"
                          defaultValue="Nest Driving School"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="mb-[5px] block font-['JetBrains_Mono',monospace] text-[11px] font-medium uppercase tracking-[1px] text-[var(--muted)]">
                          Business Type
                        </label>
                        <input
                          className="w-full rounded-[7px] border border-[var(--border)] bg-[var(--bg)] px-[14px] py-[11px] text-[13px] text-[var(--text)] outline-none transition-colors duration-200 focus:border-[var(--amber)]"
                          defaultValue="Driving School"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="mb-[5px] block font-['JetBrains_Mono',monospace] text-[11px] font-medium uppercase tracking-[1px] text-[var(--muted)]">
                        Website
                      </label>
                      <input
                        className="w-full rounded-[7px] border border-[var(--border)] bg-[var(--bg)] px-[14px] py-[11px] text-[13px] text-[var(--text)] outline-none transition-colors duration-200 focus:border-[var(--amber)]"
                        defaultValue="nestdrivingschool.com"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="mb-3 font-['JetBrains_Mono',monospace] text-[12px] font-semibold uppercase tracking-[1px] text-[var(--muted)]">
                      AI Preferences
                    </div>
                    <div className="flex items-center justify-between gap-[14px] border-b border-[var(--border)] py-3 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
                      <div>
                        <div className="text-[13px] text-[var(--text)]">
                          Use Claude for AI Chat
                        </div>
                        <div className="mt-[2px] text-[11px] text-[var(--muted)]">
                          claude-sonnet-4 (recommended for Pro plan)
                        </div>
                      </div>
                      <div className="ml-4 shrink-0 max-[720px]:ml-0">
                        <ToggleBig
                          enabled={settingsToggles.claude}
                          onClick={() => toggleSetting("claude")}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-[14px] border-b border-[var(--border)] py-3 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
                      <div>
                        <div className="text-[13px] text-[var(--text)]">
                          Stream responses
                        </div>
                        <div className="mt-[2px] text-[11px] text-[var(--muted)]">
                          Show AI typing in real-time
                        </div>
                      </div>
                      <div className="ml-4 shrink-0 max-[720px]:ml-0">
                        <ToggleBig
                          enabled={settingsToggles.streaming}
                          onClick={() => toggleSetting("streaming")}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-[14px] py-3 max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
                      <div>
                        <div className="text-[13px] text-[var(--text)]">
                          Save conversation history
                        </div>
                        <div className="mt-[2px] text-[11px] text-[var(--muted)]">
                          Store all AI chat sessions in your account
                        </div>
                      </div>
                      <div className="ml-4 shrink-0 max-[720px]:ml-0">
                        <ToggleBig
                          enabled={settingsToggles.history}
                          onClick={() => toggleSetting("history")}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="rounded-[7px] bg-[var(--amber)] px-6 py-[10px] font-['Syne',sans-serif] text-[14px] font-bold text-[var(--bg)] transition-colors duration-200 hover:bg-[var(--amber2)] max-[720px]:w-full"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ToggleBig({ enabled, onClick }) {
  return (
    <div
      className={cn(
        "relative h-6 w-11 cursor-pointer rounded-[12px] transition-colors duration-200",
        enabled ? "bg-[var(--green)]" : "bg-[var(--subtle)]",
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all duration-200",
          enabled ? "left-[22px]" : "left-0.5",
        )}
      />
    </div>
  );
}
