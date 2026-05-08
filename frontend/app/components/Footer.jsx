// components/Footer.jsx

export default function Footer() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-[#1A2540] bg-[#0C1220] px-4 py-10 sm:px-6 lg:px-10 xl:px-12">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
        <div className="font-syne text-[16px] font-extrabold text-white sm:text-[17px]">
          <span className="text-[#F5A623]">Smart</span>AI Hub
        </div>

        <ul className="grid w-full max-w-[520px] grid-cols-2 gap-x-4 gap-y-3 list-none sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 lg:gap-8">
          <li>
            <button
              onClick={() => scrollToSection("features")}
              className="text-[13px] text-[#64748B] transition hover:text-[#F5A623]"
            >
              Features
            </button>
          </li>

          <li>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-[13px] text-[#64748B] transition hover:text-[#F5A623]"
            >
              Pricing
            </button>
          </li>

          <li>
            <button
              onClick={() => scrollToSection("results")}
              className="text-[13px] text-[#64748B] transition hover:text-[#F5A623]"
            >
              Results
            </button>
          </li>

          <li>
            <a
              href="#"
              className="text-[13px] text-[#64748B] transition hover:text-[#F5A623]"
            >
              Privacy
            </a>
          </li>

          <li>
            <a
              href="#"
              className="text-[13px] text-[#64748B] transition hover:text-[#F5A623]"
            >
              Terms
            </a>
          </li>
        </ul>

        <div className="font-mono-custom text-[11px] text-[#64748B]">
          (c) 2025 HasaanAI Labs - Elkton, MD
        </div>
      </div>
    </footer>
  );
}
