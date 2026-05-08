// components/CtaBanner.jsx
"use client";

export default function CtaBanner({ openModal }) {
  return (
    <div className="mx-6 md:mx-12 mb-20 bg-[#0C1220] border border-[#243050] rounded-2xl p-8 md:p-16 text-center relative overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[radial-gradient(ellipse,rgba(245,166,35,0.12)_0%,transparent_70%)]" />

      <h2 className="font-syne text-[clamp(28px,4vw,46px)] font-extrabold tracking-tighter text-white mb-4 relative z-10">
        Your competitors are getting AI.<br />
        Are you?
      </h2>

      <p className="text-base text-[#64748B] font-light mb-9 relative z-10">
        Join local businesses across the DMV using Smart AI Hub to capture more leads, save more
        time, and win more customers — automatically.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-3 relative z-10">
        
        <button
          onClick={() => openModal("signup")}
          className="px-8 py-3.5 rounded-lg bg-[#F5A623] text-[#060911] font-syne font-bold text-[15px] shadow-[0_0_40px_rgba(245,166,35,0.3)] hover:bg-[#E09018] hover:shadow-[0_0_60px_rgba(245,166,35,0.5)] transition-all"
        >
          Start Free Today →
        </button>

        <button
          onClick={() => openModal("login")}
          className="px-8 py-3.5 rounded-lg border border-[#243050] bg-transparent text-[#E2E8F0] font-dm font-medium hover:border-[#F5A623] hover:text-[#F5A623] hover:bg-[#F5A623]/10 transition-all"
        >
          Sign In
        </button>

      </div>
    </div>
  );
}