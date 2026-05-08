"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const businessOptions = [
  {
    id: "driving-school",
    icon: "🚗",
    name: "Driving School",
    desc: "Lesson bookings, road test prep, student follow-ups",
    toolkit: "4 workflows, 12 AI prompts, and phone integrations pre-configured",
  },
  {
    id: "medical",
    icon: "🏥",
    name: "Dental / Medical",
    desc: "Appointment reminders, patient re-engagement, reviews",
    toolkit: "5 workflows, patient recall prompts, and booking integrations pre-configured",
  },
  {
    id: "wellness",
    icon: "💆",
    name: "Med Spa / Wellness",
    desc: "Treatment bookings, upsell campaigns, no-show recovery",
    toolkit: "4 workflows, treatment upsell prompts, and CRM integrations pre-configured",
  },
  {
    id: "salon",
    icon: "💇",
    name: "Salon / Hair Studio",
    desc: "Appointment bookings, seasonal campaigns, review requests",
    toolkit: "3 workflows, seasonal campaign prompts, and booking integrations pre-configured",
  },
  {
    id: "real-estate",
    icon: "🏠",
    name: "Real Estate",
    desc: "Lead nurture, listing summaries, document Q&A",
    toolkit: "6 workflows, listing summary prompts, and lead nurture integrations pre-configured",
  },
  {
    id: "restaurant",
    icon: "🍽️",
    name: "Restaurant / Catering",
    desc: "Reservation management, event bookings, review automation",
    toolkit: "4 workflows, reservation automation, and review prompts pre-configured",
  },
];

const integrationsSeed = [
  {
    id: "phone",
    icon: "📞",
    name: "Phone Number",
    desc: "Route inbound calls to Nova AI receptionist",
    connected: true,
    initialStatus: "Connected",
  },
  {
    id: "calendar",
    icon: "📅",
    name: "Google Calendar",
    desc: "Sync lesson bookings and appointments automatically",
    connected: false,
    initialStatus: "Connect",
  },
  {
    id: "crm",
    icon: "💼",
    name: "GoHighLevel / CRM",
    desc: "Pipe captured leads directly into your CRM pipeline",
    connected: false,
    initialStatus: "Connect",
  },
  {
    id: "email",
    icon: "✉️",
    name: "Gmail / Email",
    desc: "Send automated follow-ups and booking confirmations",
    connected: false,
    initialStatus: "Skip for now",
  },
  {
    id: "sms",
    icon: "💬",
    name: "SMS / Twilio",
    desc: "Text-based lead follow-up and appointment reminders",
    connected: false,
    initialStatus: "Skip for now",
  },
];

const voiceSettingsSeed = [
  { id: "style", label: "Voice Style", value: "Friendly and Professional" },
  { id: "language", label: "Language", value: "English (US)" },
  { id: "hours", label: "Hours", value: "24/7 Always On" },
  { id: "greeting", label: "Greeting", value: "Custom Business Intro" },
];

const progressSteps = [
  { step: 1, label: "Account Created" },
  { step: 2, label: "Business Type" },
  { step: 3, label: "Integrations" },
  { step: 4, label: "Configure Nova" },
  { step: 5, label: "Go Live" },
];

const themeVars = {
  "--flow-bg": "#060911",
  "--flow-bg-2": "#0c1220",
  "--flow-bg-3": "#111927",
  "--flow-border": "#1a2540",
  "--flow-border-2": "#243050",
  "--flow-border-3": "#2e3d5c",
  "--flow-amber": "#f5a623",
  "--flow-amber-2": "#e09018",
  "--flow-amber-3": "#b87818",
  "--flow-cyan": "#22d3ee",
  "--flow-green": "#10b981",
  "--flow-purple": "#a78bfa",
  "--flow-white": "#ffffff",
  "--flow-text": "#e2e8f0",
  "--flow-muted": "#64748b",
  "--flow-subtle": "#1e2d42",
};

const ghostButtonClass =
  "cursor-pointer rounded-[7px] border border-[var(--flow-border-2)] bg-transparent px-5 py-[10px] text-[13px] text-[var(--flow-muted)] transition-all duration-200 hover:border-[var(--flow-border-3)] hover:text-[var(--flow-white)]";

const primaryButtonClass =
  "cursor-pointer rounded-[7px] border-none bg-[var(--flow-amber)] px-6 py-[10px] font-['Syne',sans-serif] text-[14px] font-bold text-[#060911] transition-all duration-200 hover:bg-[var(--flow-amber-2)]";

const cardNameClass =
  "mb-1 font-['Syne',sans-serif] text-[14px] font-bold text-[var(--flow-white)]";

const cardDescClass = "text-[11px] leading-[1.4] text-[var(--flow-muted)]";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedBusinessId, setSelectedBusinessId] = useState(businessOptions[0].id);
  const [integrations, setIntegrations] = useState(integrationsSeed);
  const [voiceSelections, setVoiceSelections] = useState(
    voiceSettingsSeed.reduce(
      (acc, item, index) => ({ ...acc, [item.id]: index === 0 }),
      {},
    ),
  );
  const [integrationTouched, setIntegrationTouched] = useState({});
  const [businessName, setBusinessName] = useState("Nest Driving School");
  const [greeting, setGreeting] = useState(
    "Thanks for calling Nest Driving School. How can I help you today?",
  );

  const selectedBusiness = useMemo(
    () =>
      businessOptions.find((item) => item.id === selectedBusinessId) ?? businessOptions[0],
    [selectedBusinessId],
  );

  const goNext = () => setCurrentStep((step) => Math.min(step + 1, 5));
  const goBack = () => setCurrentStep((step) => Math.max(step - 1, 2));

  const toggleIntegration = (integrationId) => {
    setIntegrationTouched((current) => ({
      ...current,
      [integrationId]: true,
    }));

    setIntegrations((current) =>
      current.map((item) =>
        item.id === integrationId ? { ...item, connected: !item.connected } : item,
      ),
    );
  };

  const toggleVoiceSetting = (settingId) => {
    setVoiceSelections((current) => ({
      ...current,
      [settingId]: !current[settingId],
    }));
  };

  return (
    <main
      className="min-h-screen bg-[linear-gradient(180deg,#060911_0%,#0a1120_100%)] text-[var(--flow-text)] [background-image:radial-gradient(circle_at_top_right,rgba(245,166,35,0.1),transparent_28%),linear-gradient(180deg,#060911_0%,#0a1120_100%)]"
      style={themeVars}
    >
      <div className="mx-auto w-[min(1280px,calc(100%-32px))] px-0 pb-14 pt-[clamp(48px,6vw,72px)] min-[1440px]:w-[min(1360px,calc(100%-64px))] max-[1080px]:w-[min(100%-32px,1000px)] max-[1080px]:pt-[56px] max-[720px]:w-[min(100%-20px,100%)] max-[720px]:pb-7 max-[720px]:pt-12">
        <div className="mb-5 flex items-center justify-end gap-4 max-[720px]:flex-col max-[720px]:items-start">
          <div className="flex items-center gap-[10px]">
            <button
              type="button"
              className="cursor-pointer rounded-[10px] border border-[var(--flow-amber)] bg-[var(--flow-amber)] px-[14px] py-2 font-['Syne',sans-serif] text-[12px] font-bold text-[#060911] transition-[background,border-color,transform] duration-200 hover:-translate-y-px hover:border-[var(--flow-amber-2)] hover:bg-[var(--flow-amber-2)]"
              onClick={() => router.push("/dashboard")}
            >
              Skip to Dashboard
            </button>
          </div>
        </div>

        <div className="mb-5 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-[720px]:mb-4 max-[720px]:gap-[6px]">
          {progressSteps.map((item, index) => {
            const isDone = item.step < currentStep;
            const isActive = item.step === currentStep;

            return (
              <FragmentWithLine
                key={item.step}
                showLine={index < progressSteps.length - 1}
                lineClass="h-px min-w-[30px] flex-1 bg-[var(--flow-border)]"
              >
                <div
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap text-[12px] max-[720px]:text-[11px]",
                    isDone
                      ? "text-[var(--flow-green)]"
                      : isActive
                        ? "text-[var(--flow-white)]"
                        : "text-[var(--flow-muted)]",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full font-['JetBrains_Mono',monospace] text-[11px] max-[720px]:h-6 max-[720px]:w-6 max-[720px]:text-[10px]",
                      isDone
                        ? "bg-[var(--flow-green)] text-[#060911]"
                        : isActive
                          ? "bg-[var(--flow-amber)] text-[#060911]"
                          : "bg-[var(--flow-subtle)] text-[var(--flow-muted)]",
                    )}
                  >
                    {isDone ? "✓" : item.step}
                  </div>
                  <span>{item.label}</span>
                </div>
              </FragmentWithLine>
            );
          })}
        </div>

        {currentStep === 2 && (
          <section className="rounded-[16px] border border-[var(--flow-border-2)] bg-[var(--flow-bg-2)] p-10 max-[720px]:p-5">
            <h1 className="mb-[6px] font-['Syne',sans-serif] text-[26px] font-extrabold tracking-[-0.8px] text-[var(--flow-white)]">
              What type of business do you run?
            </h1>
            <p className="mb-7 max-w-[720px] text-[14px] text-[var(--flow-muted)]">
              We&apos;ll pre-load the perfect tools, workflows, and AI prompts for your
              industry.
            </p>

            <div className="grid grid-cols-3 gap-[10px] max-[1080px]:grid-cols-2 max-[720px]:grid-cols-1">
              {businessOptions.map((business) => {
                const selected = business.id === selectedBusinessId;

                return (
                  <button
                    key={business.id}
                    type="button"
                    className={cn(
                      "relative cursor-pointer rounded-[10px] border border-[var(--flow-border)] bg-[var(--flow-bg)] p-[18px] text-left transition-all duration-200 hover:border-[var(--flow-border-2)] hover:bg-[var(--flow-bg-3)]",
                      selected &&
                        "border-[var(--flow-amber)] bg-[rgba(245,166,35,0.06)]",
                    )}
                    onClick={() => setSelectedBusinessId(business.id)}
                  >
                    <div
                      className={cn(
                        "absolute right-[10px] top-[10px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[var(--flow-amber)] text-[9px] font-bold text-[#060911] transition-opacity duration-200",
                        selected ? "opacity-100" : "opacity-0",
                      )}
                    >
                      ✓
                    </div>
                    <div className="mb-[10px] text-[28px]">{business.icon}</div>
                    <div className={cardNameClass}>
                      {business.name}
                    </div>
                    <div className={cardDescClass}>{business.desc}</div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-[10px] border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.08)] px-5 py-4 max-[720px]:flex-col max-[720px]:items-start">
              <div className="text-[20px]">✅</div>
              <div>
                <div className="text-[13px] font-medium text-[var(--flow-green)]">
                  {selectedBusiness.name} toolkit loaded!
                </div>
                <div className="mt-[2px] text-[11px] text-[var(--flow-muted)]">
                  {selectedBusiness.toolkit}
                </div>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-3">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className={`${ghostButtonClass} cursor-not-allowed opacity-60 hover:border-[var(--flow-border-2)] hover:text-[var(--flow-muted)]`}
              >
                ← Back
              </button>
              <button type="button" className={primaryButtonClass} onClick={goNext}>
                Continue →
              </button>
            </div>
          </section>
        )}

        {currentStep === 3 && (
          <section className="rounded-[16px] border border-[var(--flow-border-2)] bg-[var(--flow-bg-2)] p-10 max-[720px]:p-5">
            <h1 className="mb-[6px] font-['Syne',sans-serif] text-[26px] font-extrabold tracking-[-0.8px] text-[var(--flow-white)]">
              Connect your existing tools
            </h1>
            <p className="mb-7 max-w-[720px] text-[14px] text-[var(--flow-muted)]">
              Link the tools you already use. You can always add more later.
            </p>

            <div className="flex flex-col gap-2">
              {integrations.map((integration) => (
                <button
                  key={integration.id}
                  type="button"
                  className={cn(
                    "flex cursor-pointer items-center gap-[14px] rounded-[8px] border border-[var(--flow-border)] bg-[var(--flow-bg)] px-4 py-[14px] text-left transition-all duration-200 hover:border-[var(--flow-border-2)] max-[720px]:grid-cols-1 max-[720px]:justify-items-start",
                    integration.connected &&
                      "border-[rgba(16,185,129,0.4)] bg-[rgba(16,185,129,0.04)]",
                  )}
                  onClick={() => toggleIntegration(integration.id)}
                >
                  <div className="shrink-0 text-[22px]">{integration.icon}</div>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold text-[var(--flow-white)]">
                      {integration.name}
                    </div>
                    <div className="mt-[2px] text-[11px] text-[var(--flow-muted)]">
                      {integration.desc}
                    </div>
                  </div>
                  <div
                    className={cn(
                      "shrink-0 rounded-[4px] px-[9px] py-[3px] font-['JetBrains_Mono',monospace] text-[10px]",
                      integration.connected
                        ? "bg-[rgba(16,185,129,0.1)] text-[var(--flow-green)]"
                        : !integrationTouched[integration.id] &&
                            integration.initialStatus === "Skip for now"
                          ? "bg-[var(--flow-subtle)] text-[var(--flow-muted)]"
                          : "bg-[rgba(245,166,35,0.1)] text-[var(--flow-amber)]",
                    )}
                  >
                    {integration.connected
                      ? "Connected"
                      : !integrationTouched[integration.id]
                        ? integration.initialStatus
                        : "Connect"}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-7 flex items-center justify-between max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-3">
              <button type="button" className={ghostButtonClass} onClick={goBack}>
                ← Back
              </button>
              <button type="button" className={primaryButtonClass} onClick={goNext}>
                Continue →
              </button>
            </div>
          </section>
        )}

        {currentStep === 4 && (
          <section className="rounded-[16px] border border-[var(--flow-border-2)] bg-[var(--flow-bg-2)] p-10 max-[720px]:p-5">
            <h1 className="mb-[6px] font-['Syne',sans-serif] text-[26px] font-extrabold tracking-[-0.8px] text-[var(--flow-white)]">
              Meet Nova — your AI receptionist
            </h1>
            <p className="mb-7 max-w-[720px] text-[14px] text-[var(--flow-muted)]">
              Customize how Nova sounds and what she knows about your business.
            </p>

            <div className="mb-4 rounded-[10px] border border-[var(--flow-border)] bg-[var(--flow-bg)] p-5">
              <div className="mb-3 flex h-7 items-center gap-[3px]">
                {[40, 70, 100, 50, 80, 40, 90].map((height, index) => (
                  <div
                    key={height + index}
                    className="w-[3px] animate-pulse rounded-[2px] bg-[var(--flow-amber)]"
                    style={{ height: `${height}%`, animationDelay: `${index * 0.1}s` }}
                  />
                ))}
              </div>
              <div className="mb-1 font-['Syne',sans-serif] text-[18px] font-bold text-[var(--flow-amber)]">
                Nova is ready
              </div>
              <div className="text-[12px] text-[var(--flow-muted)]">
                Powered by ElevenLabs voice AI · Pre-trained on your business type
              </div>

              <div className="mt-[14px] grid grid-cols-2 gap-[10px] max-[720px]:grid-cols-1">
                {voiceSettingsSeed.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={cn(
                      "cursor-pointer rounded-[7px] border border-[var(--flow-border)] bg-[var(--flow-bg-2)] p-3 text-left transition-[border-color,background,color] duration-200",
                      voiceSelections[item.id] && "border-[var(--flow-amber)]",
                    )}
                    onClick={() => toggleVoiceSetting(item.id)}
                  >
                    <div className="mb-1 font-['JetBrains_Mono',monospace] text-[10px] text-[var(--flow-muted)]">
                      {item.label}
                    </div>
                    <div className="text-[13px] font-medium text-[var(--flow-white)]">
                      {item.value}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-[5px] block font-['JetBrains_Mono',monospace] text-[11px] uppercase tracking-[1px] text-[var(--flow-muted)]">
                Business Name (Nova will say this)
              </label>
              <input
                className="w-full rounded-[7px] border border-[var(--flow-border)] bg-[var(--flow-bg)] px-[14px] py-[11px] font-['DM_Sans',sans-serif] text-[13px] text-[var(--flow-text)] outline-none transition-colors duration-200 focus:border-[var(--flow-amber)]"
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="mb-[5px] block font-['JetBrains_Mono',monospace] text-[11px] uppercase tracking-[1px] text-[var(--flow-muted)]">
                What should Nova say when she answers?
              </label>
              <input
                className="w-full rounded-[7px] border border-[var(--flow-border)] bg-[var(--flow-bg)] px-[14px] py-[11px] font-['DM_Sans',sans-serif] text-[13px] text-[var(--flow-text)] outline-none transition-colors duration-200 focus:border-[var(--flow-amber)]"
                value={greeting}
                onChange={(event) => setGreeting(event.target.value)}
              />
            </div>

            <div className="mt-7 flex items-center justify-between max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-3">
              <button type="button" className={ghostButtonClass} onClick={goBack}>
                ← Back
              </button>
              <button type="button" className={primaryButtonClass} onClick={goNext}>
                Go Live
              </button>
            </div>
          </section>
        )}

        {currentStep === 5 && (
          <section className="rounded-[16px] border border-[var(--flow-border-2)] bg-[var(--flow-bg-2)] px-10 py-[60px] text-center max-[720px]:px-5 max-[720px]:py-9">
            <div className="mb-5 text-[56px]">🚀</div>
            <h1 className="mb-[6px] text-center font-['Syne',sans-serif] text-[26px] font-extrabold tracking-[-0.8px] text-[var(--flow-white)]">
              You&apos;re live!
            </h1>
            <p className="mx-auto mb-8 max-w-[400px] text-[14px] font-light text-[var(--flow-muted)]">
              Nova is answering your calls. Automations are running. Your dashboard is live. Welcome to Smart AI Hub.
            </p>

            <div className="mb-8 grid grid-cols-3 gap-3 text-left max-[1080px]:grid-cols-1">
              <div className="rounded-[8px] border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.08)] p-[14px]">
                <div className="mb-[6px] text-[20px]">🤖</div>
                <div className="mb-[3px] text-[12px] font-semibold text-[var(--flow-green)]">
                  Nova Active
                </div>
                <div className="text-[11px] text-[var(--flow-muted)]">
                  AI receptionist is live
                </div>
              </div>
              <div className="rounded-[8px] border border-[rgba(245,166,35,0.2)] bg-[rgba(245,166,35,0.08)] p-[14px]">
                <div className="mb-[6px] text-[20px]">⚡</div>
                <div className="mb-[3px] text-[12px] font-semibold text-[var(--flow-amber)]">
                  4 Workflows On
                </div>
                <div className="text-[11px] text-[var(--flow-muted)]">
                  Automations running
                </div>
              </div>
              <div className="rounded-[8px] border border-[rgba(34,211,238,0.2)] bg-[rgba(34,211,238,0.08)] p-[14px]">
                <div className="mb-[6px] text-[20px]">📊</div>
                <div className="mb-[3px] text-[12px] font-semibold text-[var(--flow-cyan)]">
                  Dashboard Ready
                </div>
                <div className="text-[11px] text-[var(--flow-muted)]">
                  Live metrics tracking
                </div>
              </div>
            </div>

            <button
              type="button"
              className="cursor-pointer rounded-[7px] border-none bg-[var(--flow-amber)] px-8 py-3 font-['Syne',sans-serif] text-[14px] font-bold text-[#060911] transition-all duration-200 hover:bg-[var(--flow-amber-2)]"
              onClick={() => router.push("/dashboard")}
            >
              Open My Dashboard →
            </button>
          </section>
        )}
      </div>
    </main>
  );
}

function FragmentWithLine({ children, showLine, lineClass }) {
  return (
    <>
      {children}
      {showLine ? <div className={lineClass} /> : null}
    </>
  );
}
