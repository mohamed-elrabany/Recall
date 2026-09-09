import Hero from "../components/landing/Hero";
import SearchMockup from "../components/landing/SearchMockup";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import CTA from "../components/landing/CTA";

export function Component() {
  return (
    <main>
        <Hero />
        <SearchMockup />
        <HowItWorks />
        <Features />
        <CTA />
    </main>
  );
}