// components/Navbar.jsx
"use client";

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar({ openModal }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const syncAuthState = () => {
      if (typeof window === "undefined") {
        return;
      }

      setIsLoggedIn(Boolean(localStorage.getItem("authToken")));
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    window.addEventListener("auth-state-changed", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("auth-state-changed", syncAuthState);
    };
  }, []);

  const clearAuthState = () => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    window.dispatchEvent(new CustomEvent("auth-state-changed"));
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMenuClick = (id) => {
    setMobileMenuOpen(false);

    const shouldLogoutToLanding =
      isLoggedIn && (pathname === "/dashboard" || pathname === "/onboarding");

    if (shouldLogoutToLanding) {
      clearAuthState();
      router.push(`/#${id}`);
      return;
    }

    if (pathname === "/") {
      scrollToSection(id);
      return;
    }

    router.push(`/#${id}`);
  };

  const handleAuthClick = () => {
    setMobileMenuOpen(false);

    if (!isLoggedIn) {
      openModal("login");
      return;
    }

    clearAuthState();
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-[#1A2540] bg-[#060911]/88 backdrop-blur-xl animate-fade-down">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-10 xl:px-12">
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            router.push("/");
          }}
          className="font-syne text-[18px] sm:text-[22px] font-extrabold tracking-tight text-white"
        >
          <span className="text-[#F5A623]">Smart</span>AI Hub
        </button>

        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 list-none">
          <li>
            <button
              onClick={() => handleMenuClick("features")}
              className="text-[#64748B] text-sm hover:text-white transition"
            >
              Features
            </button>
          </li>
          <li>
            <button
              onClick={() => handleMenuClick("how")}
              className="text-[#64748B] text-sm hover:text-white transition"
            >
              How It Works
            </button>
          </li>
          <li>
            <button
              onClick={() => handleMenuClick("results")}
              className="text-[#64748B] text-sm hover:text-white transition"
            >
              Results
            </button>
          </li>
          <li>
            <button
              onClick={() => handleMenuClick("pricing")}
              className="text-[#64748B] text-sm hover:text-white transition"
            >
              Pricing
            </button>
          </li>
        </ul>

        <div className="hidden sm:flex items-center gap-2 lg:gap-3">
          <button
            onClick={handleAuthClick}
            className="px-4 lg:px-5 py-1.5 rounded-md border border-[#243050] bg-transparent text-[#E2E8F0] text-[13px] font-medium hover:border-[#F5A623] hover:text-[#F5A623] transition-all"
          >
            {isLoggedIn ? "Logout" : "Sign In"}
          </button>
          {!isLoggedIn ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal("signup");
              }}
              className="px-4 lg:px-5 py-1.5 rounded-md bg-[#F5A623] text-[#060911] text-[13px] font-bold shadow-[0_0_20px_rgba(245,166,35,0.25)] hover:bg-[#E09018] hover:shadow-[0_0_30px_rgba(245,166,35,0.4)] transition-all"
            >
              Get Started Free
            </button>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((current) => !current)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#243050] bg-[#0C1220] text-[#E2E8F0] transition hover:border-[#F5A623] hover:text-[#F5A623] sm:hidden"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-[2px] w-4 rounded-full bg-current transition-transform ${
                mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-4 rounded-full bg-current transition-opacity ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[2px] w-4 rounded-full bg-current transition-transform ${
                mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-[#1A2540] bg-[#060911]/98 px-4 pb-4 pt-3 sm:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-2">
            <button
              onClick={() => handleMenuClick("features")}
              className="rounded-lg border border-transparent bg-[#0C1220] px-4 py-3 text-left text-[13px] text-[#E2E8F0] transition hover:border-[#243050] hover:text-white"
            >
              Features
            </button>
            <button
              onClick={() => handleMenuClick("how")}
              className="rounded-lg border border-transparent bg-[#0C1220] px-4 py-3 text-left text-[13px] text-[#E2E8F0] transition hover:border-[#243050] hover:text-white"
            >
              How It Works
            </button>
            <button
              onClick={() => handleMenuClick("results")}
              className="rounded-lg border border-transparent bg-[#0C1220] px-4 py-3 text-left text-[13px] text-[#E2E8F0] transition hover:border-[#243050] hover:text-white"
            >
              Results
            </button>
            <button
              onClick={() => handleMenuClick("pricing")}
              className="rounded-lg border border-transparent bg-[#0C1220] px-4 py-3 text-left text-[13px] text-[#E2E8F0] transition hover:border-[#243050] hover:text-white"
            >
              Pricing
            </button>

            <div className="mt-2 grid grid-cols-1 gap-2">
              <button
                onClick={handleAuthClick}
                className="w-full rounded-lg border border-[#243050] px-4 py-3 text-[13px] font-medium text-[#E2E8F0] transition hover:border-[#F5A623] hover:text-[#F5A623]"
              >
                {isLoggedIn ? "Logout" : "Sign In"}
              </button>
              {!isLoggedIn ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openModal("signup");
                  }}
                  className="w-full rounded-lg bg-[#F5A623] px-4 py-3 text-[13px] font-bold text-[#060911] transition hover:bg-[#E09018]"
                >
                  Get Started Free
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

Navbar.propTypes = {
  openModal: PropTypes.func.isRequired,
};
