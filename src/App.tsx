import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { EquipmentSection } from './components/EquipmentSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteSimulator } from './components/QuoteSimulator';
import { GeotechGuideModal } from './components/GeotechGuideModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { ConcreteCrushingCalculatorModal } from './components/ConcreteCrushingCalculatorModal';

export default function App() {
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [concreteCalcOpen, setConcreteCalcOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Main Header */}
      <Header
        onOpenSimulator={() => setSimulatorOpen(true)}
        onOpenPortal={() => setPortalOpen(true)}
        onOpenGuide={() => setGuideOpen(true)}
        onOpenConcreteCalc={() => setConcreteCalcOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenSimulator={() => setSimulatorOpen(true)}
          onOpenGuide={() => setGuideOpen(true)}
          onExploreServices={() => {
            const el = document.getElementById('metiers');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <ServicesSection
          onOpenSimulator={() => setSimulatorOpen(true)}
          onOpenGuide={() => setGuideOpen(true)}
          onOpenConcreteCalc={() => setConcreteCalcOpen(true)}
        />

        <EquipmentSection />

        <ProjectsSection />

        <AboutSection />

        <FaqSection
          onOpenGuide={() => setGuideOpen(true)}
          onOpenSimulator={() => setSimulatorOpen(true)}
        />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenSimulator={() => setSimulatorOpen(true)}
        onOpenPortal={() => setPortalOpen(true)}
        onOpenGuide={() => setGuideOpen(true)}
        onOpenConcreteCalc={() => setConcreteCalcOpen(true)}
      />

      {/* Floating Fast Action Simulator Button for Mobile/Desktop */}
      <aside aria-label="Action rapide devis" className="fixed bottom-3.5 right-3.5 sm:bottom-6 sm:right-6 z-30">
        <button
          onClick={() => setSimulatorOpen(true)}
          id="floating-btn-simulator"
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black px-3 py-2 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all text-xs border border-amber-600/30 group"
          title="Calculer un devis d'étude de sol"
        >
          <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950 shrink-0" />
          <span className="text-[11px] sm:text-xs tracking-tight">Devis Express</span>
          <span className="hidden sm:inline text-slate-800 font-semibold">• G1-G5</span>
        </button>
      </aside>

      {/* Interactive Modals */}
      <QuoteSimulator
        isOpen={simulatorOpen}
        onClose={() => setSimulatorOpen(false)}
      />

      <GeotechGuideModal
        isOpen={guideOpen}
        onClose={() => setGuideOpen(false)}
        onOpenSimulator={() => {
          setGuideOpen(false);
          setSimulatorOpen(true);
        }}
      />

      <ClientPortalModal
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
      />

      <ConcreteCrushingCalculatorModal
        isOpen={concreteCalcOpen}
        onClose={() => setConcreteCalcOpen(false)}
        onOpenSimulator={() => {
          setConcreteCalcOpen(false);
          setSimulatorOpen(true);
        }}
      />
    </div>
  );
}

