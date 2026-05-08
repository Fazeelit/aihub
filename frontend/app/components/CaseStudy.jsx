// components/CaseStudy.jsx
export default function CaseStudy() {
  return (
    <div id="results" className="max-w-6xl mx-auto py-20 px-6 md:px-12">
      <div className="font-mono-custom text-[10px] text-[#F5A623] uppercase tracking-[3px] mb-4">
        Real Results
      </div>

      <h2 className="font-syne text-[clamp(32px,4vw,52px)] font-extrabold tracking-tighter text-white mb-4">
        Not a concept.<br />
        <em className="text-[#F5A623] not-italic">Already working.</em>
      </h2>

      <p className="text-base text-[#64748B] max-w-[500px] mb-12">
        Our first client is live in production today. Real numbers from DMV.
      </p>

      <div className="grid md:grid-cols-2 bg-[#0C1220] border border-[#243050] rounded-2xl overflow-hidden shadow-xl">
        
        {/* Left side */}
        <div className="p-8 md:p-12 border-r border-[#1A2540]">
          <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-full py-1.5 pl-2 pr-4 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-md" />
            <span className="text-xs text-[#10B981] font-medium">
              Live in Production
            </span>
          </div>

          <div className="font-syne text-3xl font-extrabold text-white">
            Nest Driving School
          </div>

          <div className="text-sm text-[#64748B] mb-4">
            Annandale, Virginia · DMV Area
          </div>

          <p className="text-[15px] text-[#64748B] leading-relaxed mb-6">
            Nest Driving School deployed full Smart AI Hub — ElevenLabs AI
            receptionist Nova handles calls 24/7, Make automation captures
            leads, follow-ups auto-run. Owner never misses an inquiry.
          </p>

          <div className="flex flex-wrap gap-2">
            {["AI Receptionist", "Lead Automation", "Follow-up Sequences"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded border border-[#1A2540] text-xs font-mono-custom text-[#64748B]"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="p-8 md:p-12 bg-[#111927] flex flex-col gap-6">
          <ResultItem
            label="Lead Response Time"
            before="6 hrs"
            after="<90s"
            description="Down 94% — instant AI response"
          />
          <ResultItem
            label="Receptionist Coverage"
            before="9–5"
            after="24/7"
            description="Nova answers every call"
          />
          <ResultItem
            label="Lead Capture Rate"
            before="~40%"
            after="100%"
            description="Every lead captured, logged, and followed up"
          />
        </div>
      </div>
    </div>
  );
}

function ResultItem({ label, before, after, description }) {
  return (
    <>
      <div>
        <div className="font-mono-custom text-[9px] text-[#64748B] uppercase tracking-wider">
          {label}
        </div>

        <div className="flex items-center gap-3 mt-1">
          <span className="font-syne text-2xl font-bold text-[#1E2D42] line-through">
            {before}
          </span>
          <span className="text-[#F5A623] text-xl">→</span>
          <span className="font-syne text-3xl font-extrabold text-[#10B981]">
            {after}
          </span>
        </div>

        <div className="text-xs text-[#64748B]">{description}</div>
      </div>

      <div className="h-px bg-[#1A2540]" />
    </>
  );
}