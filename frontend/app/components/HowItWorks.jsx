// components/HowItWorks.jsx
const steps = [
  {
    number: "01",
    title: "Pick your business type",
    description:
      "Select your industry — Smart AI Hub pre-loads tools and prompts built for your niche.",
  },
  {
    number: "02",
    title: "Connect your tools",
    description: "Link phone number, calendar, CRM — guided setup, no code required.",
  },
  {
    number: "03",
    title: "Go live — AI does the rest",
    description:
      "Your AI receptionist answers calls, automations follow up, you focus on growth.",
  },
];

export default function HowItWorks() {
  return (
    <div id="how" className="bg-[#0C1220] border-y border-[#1A2540] py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="font-mono-custom text-[10px] text-[#F5A623] uppercase tracking-[3px] mb-4">
          //How It Works
        </div>
        <h2 className="font-syne text-[clamp(32px,4vw,52px)] font-extrabold tracking-tighter text-white mb-4">
          From signup to <em className="text-[#F5A623] not-italic">live</em>
          <br />
          in three steps.
        </h2>
        <p className="text-base text-[#64748B] max-w-[500px] mb-12">
          No technical team needed. Built for business owners, not developers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-[#1A2540] border border-[#1A2540] rounded-2xl overflow-hidden">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-[#0C1220] p-8 md:p-10 group relative">
              {idx < steps.length - 1 && (
                <div className="absolute top-8 right-0 w-px h-[calc(100%-4rem)] bg-[#1A2540] md:block hidden" />
              )}
              <div className="font-syne text-6xl font-extrabold text-[#1A2540] mb-4 leading-none group-hover:text-[#F5A623] transition">
                {step.number}
              </div>
              <div className="font-syne text-xl font-bold text-white mb-2">{step.title}</div>
              <div className="text-sm text-[#64748B]">{step.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}