// components/Hero.jsx
"use client";

import PropTypes from "prop-types";

export default function Hero({ openModal }) {
  const scrollToResults = () => {
    const element = document.getElementById("results");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-10 xl:px-12">
      <div className="absolute inset-0 bg-grid-pattern bg-[length:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_20%,transparent_100%)] animate-grid-pulse" />

      <div className="absolute right-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(245,166,35,0.12)_0%,transparent_70%)] blur-[80px] animate-orb-float sm:h-[420px] sm:w-[420px] xl:h-[500px] xl:w-[500px]" />
      <div className="absolute bottom-[-80px] left-[-100px] h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.08)_0%,transparent_70%)] blur-[80px] animate-orb-float [animation-delay:3s] sm:h-[340px] sm:w-[340px] xl:h-[400px] xl:w-[400px]" />
      <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.08)_0%,transparent_70%)] blur-[80px] animate-orb-float [animation-delay:6s] sm:h-[260px] sm:w-[260px] xl:h-[300px] xl:w-[300px]" />

      <HeroFloatingCards />

      <div className="relative z-[2] mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-[1440px] items-center justify-center">
        <div className="w-full max-w-[640px] text-center lg:max-w-[900px]">
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-[#F5A623]/40 bg-[#F5A623]/10 py-1.5 pl-2 pr-3 animate-fade-up sm:mb-8 sm:pr-4 [animation-delay:0.2s]">
            <div className="h-1.5 w-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] animate-pulse-dot" />
            <span className="font-mono-custom text-left text-[10px] tracking-[0.18em] text-[#F5A623] sm:text-[11px] sm:tracking-wider">
              Now Live &middot; First Client Deployed in DMV
            </span>
          </div>

          <h1 className="mb-5 animate-fade-up font-syne text-[clamp(30px,8vw,72px)] font-extrabold leading-[0.96] tracking-[-0.05em] text-white [animation-delay:0.3s] sm:mb-6">
            Your local business.
            <br />
            <span className="relative text-[#F5A623] after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[3px] after:rounded-full after:bg-gradient-to-r after:from-[#F5A623] after:to-transparent after:content-['']">
              AI-powered.
            </span>
            <br />
            Finally.
          </h1>

          <p className="mx-auto mb-8 max-w-[560px] animate-fade-up text-[15px] leading-relaxed text-[#64748B] [animation-delay:0.4s] sm:mb-10 sm:text-base lg:text-lg">
            One platform with{" "}
            <strong className="text-white">
              AI receptionist, workflow automations, and document intelligence
            </strong>{" "}
            &mdash; pre-built for your industry. Live in under an hour.
          </p>

          <div className="mb-10 flex flex-col items-stretch justify-center gap-3 animate-fade-up sm:mb-12 sm:flex-row sm:items-center sm:gap-4 [animation-delay:0.5s]">
            <button
              onClick={() => openModal("signup")}
              className="rounded-lg bg-[#F5A623] px-6 py-3 text-[14px] font-bold text-[#060911] shadow-[0_0_40px_rgba(245,166,35,0.3)] transition-all hover:bg-[#E09018] hover:shadow-[0_0_60px_rgba(245,166,35,0.5)] sm:px-8 sm:py-3.5 sm:text-[15px]"
            >
              Start Free &mdash; No Credit Card
            </button>
            <button
              onClick={scrollToResults}
              className="rounded-lg border border-[#243050] bg-transparent px-6 py-3 text-[14px] font-medium text-[#E2E8F0] transition-all hover:border-[#F5A623] hover:bg-[#F5A623]/10 hover:text-[#F5A623] sm:px-8 sm:py-3.5"
            >
              See Real Results &darr;
            </button>
          </div>

          <HeroProofStrip />
        </div>
      </div>
    </div>
  );
}

Hero.propTypes = {
  openModal: PropTypes.func.isRequired,
};

function HeroFloatingCards() {
  return (
    <>
      <div className="absolute hidden xl:block left-[4%] top-[35%] z-10 animate-float-card [animation-delay:1s]">
        <div className="bg-[#0C1220]/90 backdrop-blur-xl border border-[#243050] rounded-xl p-4 min-w-[200px] shadow-2xl">
          <div className="font-mono-custom text-[9px] text-[#64748B] uppercase tracking-wider">
            Live &mdash; Nest Driving School
          </div>
          <div className="font-syne text-[22px] font-extrabold text-[#10B981]">
            &darr; 94%
          </div>
          <div className="text-[11px] text-[#64748B]">Lead response time</div>
          <div className="mt-2 h-[3px] bg-[#1E2D42] rounded overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#10B981] to-[#22D3EE] rounded animate-bar-grow" />
          </div>
        </div>
      </div>

      <div className="absolute hidden xl:block right-[4%] top-[40%] z-10 animate-float-card [animation-delay:3s]">
        <div className="bg-[#0C1220]/90 backdrop-blur-xl border border-[#243050] rounded-xl p-4 min-w-[220px] shadow-2xl">
          <div className="font-mono-custom text-[9px] text-[#64748B] uppercase tracking-wider">
            Recent Activity
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              Lead captured &middot; 2m ago
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
              Follow-up sent &middot; 5m ago
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
              AI call answered &middot; 8m ago
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
              Booking confirmed &middot; 12m ago
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function HeroProofStrip() {
  return (
    <div className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-6 animate-fade-up sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-8 [animation-delay:0.6s]">
      <div className="text-center">
        <div className="font-syne text-[22px] font-extrabold text-[#F5A623] tracking-tighter sm:text-[26px]">
          &lt;90s
        </div>
        <div className="text-[10px] text-[#64748B] uppercase tracking-wide sm:text-[11px]">
          Lead Response
        </div>
      </div>
      <div className="hidden h-10 w-px bg-[#1A2540] sm:block" />
      <div className="text-center">
        <div className="font-syne text-[22px] font-extrabold text-[#F5A623] tracking-tighter sm:text-[26px]">
          24/7
        </div>
        <div className="text-[10px] text-[#64748B] uppercase tracking-wide sm:text-[11px]">
          AI Uptime
        </div>
      </div>
      <div className="hidden h-10 w-px bg-[#1A2540] sm:block" />
      <div className="text-center">
        <div className="font-syne text-[22px] font-extrabold text-[#F5A623] tracking-tighter sm:text-[26px]">
          1hr
        </div>
        <div className="text-[10px] text-[#64748B] uppercase tracking-wide sm:text-[11px]">
          Setup Time
        </div>
      </div>
      <div className="hidden h-10 w-px bg-[#1A2540] sm:block" />
      <div className="text-center">
        <div className="font-syne text-[22px] font-extrabold text-[#F5A623] tracking-tighter sm:text-[26px]">
          $49
        </div>
        <div className="text-[10px] text-[#64748B] uppercase tracking-wide sm:text-[11px]">
          Starts At /mo
        </div>
      </div>
    </div>
  );
}
