// components/LogoStrip.jsx
export default function LogoStrip() {
  const industries = [
    "Driving Schools",
    "Dental Clinics",
    "Med Spas",
    "Real Estate",
    "Salons",
    "Restaurants",
    "Auto Shops",
  ];

  return (
    <div className="py-6 px-6 md:px-12 border-y border-[#1A2540] bg-[#0C1220]/50 flex flex-wrap items-center justify-center gap-6">
      <span className="font-mono-custom text-[11px] text-[#64748B] uppercase tracking-wider">
        Built for
      </span>
      <div className="flex flex-wrap gap-6 text-[13px] font-bold font-syne text-[#1E2D42] uppercase tracking-wide">
        {industries.map((industry, idx) => (
          <span key={idx}>
            <span className="hover:text-[#64748B] transition cursor-default">{industry}</span>
            {idx < industries.length - 1 && <span className="ml-6">·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}