// components/FloatingCards.jsx
export default function FloatingCards() {
  return (
    <>
      {/* Left floating card - Nest Driving School */}
      <div className="absolute hidden xl:block left-[4%] top-[35%] z-10 animate-float-card [animation-delay:1s]">
        <div className="bg-[#0C1220]/90 backdrop-blur-xl border border-[#243050] rounded-xl p-4 min-w-[200px] shadow-2xl hover:border-[#F5A623]/50 transition-all duration-300">
          <div className="font-mono-custom text-[9px] text-[#64748B] uppercase tracking-wider">
            Live — Nest Driving School
          </div>
          <div className="font-syne text-[22px] font-extrabold text-[#10B981] mt-1">↓ 94%</div>
          <div className="text-[11px] text-[#64748B]">Lead response time</div>
          <div className="mt-2 h-[3px] bg-[#1E2D42] rounded overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#10B981] to-[#22D3EE] rounded animate-bar-grow" />
          </div>
          <div className="mt-2 text-[10px] text-[#64748B] font-mono-custom">
            From 6hrs → &lt;90s
          </div>
        </div>
      </div>

      {/* Right floating card - Recent Activity */}
      <div className="absolute hidden xl:block right-[4%] top-[40%] z-10 animate-float-card [animation-delay:3s]">
        <div className="bg-[#0C1220]/90 backdrop-blur-xl border border-[#243050] rounded-xl p-4 min-w-[220px] shadow-2xl hover:border-[#F5A623]/50 transition-all duration-300">
          <div className="font-mono-custom text-[9px] text-[#64748B] uppercase tracking-wider">
            Recent Activity
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2 text-[11px] text-[#64748B] hover:text-[#E2E8F0] transition">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Lead captured · 2m ago
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#64748B] hover:text-[#E2E8F0] transition">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
              Follow-up sent · 5m ago
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#64748B] hover:text-[#E2E8F0] transition">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
              AI call answered · 8m ago
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#64748B] hover:text-[#E2E8F0] transition">
              <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
              Booking confirmed · 12m ago
            </div>
          </div>
        </div>
      </div>
    </>
  );
}