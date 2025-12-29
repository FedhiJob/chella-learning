import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/layout/Hero';
import Features from '../components/layout/Features';
import StatsSection from '../components/layout/StatsSection';
import CTASection from '../components/layout/CTASection';
import Footer from '../components/layout/Footer';


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
        <Navbar />
        <Hero />
        <Features />
        <StatsSection />
        <CTASection />
        <Footer />

    </div>
  );
}
