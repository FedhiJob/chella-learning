import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import Features from "../components/layout/Features";
import StatsSection from "../components/layout/StatsSection";
import CTASection from "../components/layout/CTASection";
import Footer from "../components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden bg-[#05070d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,191,82,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.1),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

      <div className="relative">
        <Navbar />
        <Hero />
        <Features />
        <StatsSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}
