// components/Features.jsx

const features = [
  {
    icon: "🤖",
    title: "AI Voice Receptionist",
    description:
      "An AI agent answers your phone calls, books appointments, and handles FAQs 24/7 — even at 2am. ElevenLabs voice synthesis. Sounds real.",
    tag: "ElevenLabs Powered",
    tagColor: "amber",
  },
  {
    icon: "⚡",
    title: "Workflow Automations",
    description:
      "No-code automation flows for lead follow-up, reminders, review requests. Connect via Make, Zapier, or webhooks.",
    tag: "Make.com + Zapier",
    tagColor: "cyan",
  },
  {
    icon: "📄",
    title: "Document Intelligence",
    description:
      "Upload contracts, policy guides, handbooks — ask questions in plain English. Instant RAG answers.",
    tag: "RAG + pgvector",
    tagColor: "green",
  },
  {
    icon: "📊",
    title: "Operations Dashboard",
    description:
      "Live metrics: leads captured, automations fired, time saved. Real-time visibility into your AI.",
    tag: "Real-time Metrics",
    tagColor: "purple",
  },
];

const tagColors = {
  amber: "bg-[#F5A623]/10 text-[#F5A623]",
  cyan: "bg-[#22D3EE]/10 text-[#22D3EE]",
  green: "bg-[#10B981]/10 text-[#10B981]",
  purple: "bg-[#A78BFA]/10 text-[#A78BFA]",
};

export default function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto py-20 px-6 md:px-12">
      <div className="font-mono-custom text-[10px] text-[#F5A623] uppercase tracking-[3px] mb-4 flex items-center gap-1">
        <span className="text-[#1E2D42]">//</span>Features
      </div>

      <h2 className="font-syne text-[clamp(32px,4vw,52px)] font-extrabold tracking-tighter text-white mb-4">
        Everything you need.<br />
        <em className="text-[#F5A623] not-italic">Nothing you don't.</em>
      </h2>

      <p className="text-base text-[#64748B] max-w-[500px] mb-12">
        Four AI-powered tools that work together — pre-configured the moment you select your business type.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-[#1A2540] border border-[#1A2540] rounded-2xl overflow-hidden">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} />
        ))}
        <FullWidthFeature />
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, tag, tagColor }) {
  const gradientColor =
    tagColor === "amber"
      ? "#F5A623"
      : tagColor === "cyan"
      ? "#22D3EE"
      : tagColor === "green"
      ? "#10B981"
      : "#A78BFA";

  const boxStyle =
    tagColor === "amber"
      ? "bg-[#F5A623]/10 border border-[#F5A623]/20"
      : tagColor === "cyan"
      ? "bg-[#22D3EE]/10 border border-[#22D3EE]/20"
      : tagColor === "green"
      ? "bg-[#10B981]/10 border border-[#10B981]/20"
      : "bg-[#A78BFA]/10 border border-[#A78BFA]/20";

  return (
    <div className="bg-[#0C1220] p-8 md:p-10 group relative transition hover:bg-[#111927]">
      
      {/* FIX: Tailwind can't parse dynamic colors like from-[${...}] */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition"
        style={{
          background: `linear-gradient(to right, ${gradientColor}, transparent)`,
        }}
      />

      <div
        className={`w-12 h-12 rounded-lg ${boxStyle} flex items-center justify-center text-2xl mb-5`}
      >
        {icon}
      </div>

      <div className="font-syne text-xl font-bold text-white mb-2">
        {title}
      </div>

      <div className="text-sm text-[#64748B] leading-relaxed">
        {description}
      </div>

      <span
        className={`inline-block mt-4 px-3 py-1 rounded font-mono-custom text-[10px] ${tagColors[tagColor]}`}
      >
        {tag}
      </span>
    </div>
  );
}

function FullWidthFeature() {
  const verticals = [
    { name: "Driving School", color: "#F5A623" },
    { name: "Dental / Medical", color: "#22D3EE" },
    { name: "Salon / Med Spa", color: "#A78BFA" },
    { name: "Real Estate", color: "#F472B6" },
  ];

  return (
    <div className="col-span-1 md:col-span-2 bg-[#0C1220] p-8 md:p-10 grid md:grid-cols-2 gap-6 items-center group">
      <div>
        <div className="w-12 h-12 rounded-lg bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center text-2xl mb-5">
          🎯
        </div>

        <div className="font-syne text-xl font-bold text-white mb-2">
          Industry-Specific Onboarding
        </div>

        <div className="text-sm text-[#64748B] leading-relaxed">
          Select your business type and pre-load exact tools, prompts, and workflows. Setup in under one hour.
        </div>

        <span className="inline-block mt-4 px-3 py-1 rounded bg-[#F5A623]/10 text-[#F5A623] font-mono-custom text-[10px]">
          6 Verticals Ready
        </span>
      </div>

      <div className="bg-[#060911] border border-[#1A2540] rounded-xl p-5 flex flex-col gap-2">
        {verticals.map((v, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-2 bg-[#0C1220] rounded-md border border-[#1A2540] text-xs"
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: v.color }}
            />
            <span className="flex-1 text-white font-medium">{v.name}</span>
            <span className="font-mono-custom text-[11px] text-[#10B981]">
              ✓ Pre-loaded
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}