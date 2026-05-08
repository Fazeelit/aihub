// app/page.jsx
"use client";

import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CaseStudy from "@/components/CaseStudy";
import Pricing from "@/components/Pricing";
import CtaBanner from "@/components/CtaBanner";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  const openModal = (tab) => {
    window.dispatchEvent(
      new CustomEvent("open-auth-modal", {
        detail: { tab },
      }),
    );
  };

  return (
    <>
      <Hero openModal={openModal} />
      <LogoStrip />
      <ScrollReveal>
        <Features />
      </ScrollReveal>
      <ScrollReveal>
        <HowItWorks />
      </ScrollReveal>
      <ScrollReveal>
        <CaseStudy />
      </ScrollReveal>
      <ScrollReveal>
        <Pricing openModal={openModal} />
      </ScrollReveal>
      <ScrollReveal>
        <CtaBanner openModal={openModal} />
      </ScrollReveal>
    </>
  );
}
