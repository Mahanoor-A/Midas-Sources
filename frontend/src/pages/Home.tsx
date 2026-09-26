import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import { RfqProvider } from "@/components/RfqModal";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { Marquee } from "@/components/Marquee";
import { CredibilityStrip } from "@/components/CredibilityStrip";
import { AboutSection } from "@/components/AboutSection";
import { CapabilityGroups } from "@/components/CapabilityGroups";
import { IndustriesServed } from "@/components/IndustriesServed";
import { HowMidasWorks } from "@/components/HowMidasWorks";
import { ClientExperience } from "@/components/ClientExperience";
import { ConversionStrip } from "@/components/ConversionStrip";
import { CaseStudies } from "@/components/CaseStudies";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { QualityHse } from "@/components/QualityHse";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <RfqProvider>
      <div className="min-h-screen bg-[#0B0F17] text-[#F1F5F9]">
        <div className="grain-overlay" aria-hidden="true" />
        <Header />
        <main>
          <HeroSection />
          <Marquee />
          <CredibilityStrip />
          <AboutSection />
          <CapabilityGroups />
          <IndustriesServed />
          <HowMidasWorks />
          <ClientExperience />
          <ConversionStrip />
          <CaseStudies />
          <ProjectShowcase />
          <QualityHse />
          <ContactSection />
        </main>
        <Footer />
        <Toaster position="bottom-right" theme="dark" richColors />
      </div>
    </RfqProvider>
  );
}
