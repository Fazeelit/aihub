// components/Pricing.jsx
"use client";

import PropTypes from "prop-types";

const plans = [
  {
    name: "Starter",
    price: "49",
    period: "per month, billed monthly",
    featured: false,
    features: [
      "AI Chat Assistant",
      "3 workflow automations",
      "50,000 AI tokens/month",
      "1 user account",
      "Email support",
      { text: "Voice receptionist", muted: true },
      { text: "Document intelligence", muted: true },
    ],
  },
  {
    name: "Pro",
    price: "149",
    period: "per month, billed monthly",
    featured: true,
    features: [
      "Everything in Starter",
      "AI Voice Receptionist",
      "Document Intelligence (RAG)",
      "5 workflow automations",
      "200,000 AI tokens/month",
      "3 user accounts",
      "Priority support",
    ],
  },
  {
    name: "Agency",
    price: "399",
    period: "per month, billed monthly",
    featured: false,
    features: [
      "Everything in Pro",
      "White-label branding",
      "Custom subdomain",
      "Unlimited automations",
      "Unlimited tokens",
      "Unlimited team members",
      "Dedicated onboarding call",
    ],
  },
];

export default function Pricing({ openModal }) {
  return (
    <section id="pricing" className="max-w-6xl mx-auto py-20 px-6 md:px-12">
      <div className="font-mono-custom text-[10px] text-[#F5A623] uppercase tracking-[3px] mb-4">
        Pricing
      </div>
      <h2 className="font-syne text-[clamp(32px,4vw,52px)] font-extrabold tracking-tighter text-white mb-4">
        Simple pricing.<br />
        <em className="text-[#F5A623] not-italic">No surprises.</em>
      </h2>
      <p className="text-base text-[#64748B] max-w-[500px] mb-12">
        Start free, scale when you're ready. Every plan includes onboarding support and a 30-day
        money-back guarantee.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} openModal={openModal} />
        ))}
      </div>
    </section>
  );
}

Pricing.propTypes = {
  openModal: PropTypes.func.isRequired,
};

function PricingCard({ plan, openModal }) {
  return (
    <div
      className={`bg-[#0C1220] border ${
        plan.featured ? "border-[#F5A623] shadow-[0_0_40px_rgba(245,166,35,0.15)]" : "border-[#1A2540]"
      } rounded-2xl p-8 md:p-9 relative transition-all hover:-translate-y-1 hover:border-[#243050] hover:shadow-2xl`}
    >
      {plan.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F5A623] text-[#060911] font-mono-custom text-[9px] font-medium px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
          Most Popular
        </div>
      )}
      <div className={`font-syne text-[15px] font-bold uppercase tracking-wider mb-4 ${plan.featured ? "text-[#F5A623]" : "text-[#64748B]"}`}>
        {plan.name}
      </div>
      <div className="font-syne text-[52px] font-extrabold text-white tracking-tighter leading-none">
        <sup className="text-[22px] font-semibold align-top text-[#64748B]">$</sup>
        {plan.price}
      </div>
      <div className="text-[13px] text-[#64748B] mt-1 mb-6">{plan.period}</div>
      <div className="h-px bg-[#1A2540] mb-6" />
      <ul className="flex flex-col gap-3 mb-8">
        {plan.features.map((feature, idx) => {
          const isMuted = typeof feature === "object";
          const text = isMuted ? feature.text : feature;
          return (
            <li key={idx} className="flex items-start gap-2 text-[13px] text-[#64748B]">
              <span className="text-[#10B981] text-sm">✓</span>
              <span className={isMuted ? "text-[#1E2D42]" : ""}>{text}</span>
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => openModal("signup")}
        className={`w-full py-3 rounded-lg font-syne text-sm font-bold transition-all ${
          plan.featured
            ? "bg-[#F5A623] text-[#060911] shadow-[0_4px_20px_rgba(245,166,35,0.3)] hover:bg-[#E09018] hover:shadow-[0_4px_30px_rgba(245,166,35,0.5)]"
            : "bg-transparent text-[#E2E8F0] border border-[#243050] hover:border-[#F5A623] hover:text-[#F5A623]"
        }`}
      >
        {plan.name === "Agency" ? "Contact Sales" : plan.featured ? "Start Pro Free →" : "Get Started"}
      </button>
    </div>
  );
}

PricingCard.propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired,
    features: PropTypes.array.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};