import React, { useState, useRef } from 'react';
import { 
  Layers, 
  TestTubes, 
  TrendingUp, 
  ShieldCheck, 
  Compass, 
  Droplet, 
  Check, 
  ArrowRight, 
  BookOpen, 
  Calculator,
  ExternalLink,
  ChevronDown,
  Info,
  Sparkles,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_DATA } from '../data/senelaboData';
import { ServiceDetail, ServiceCategory } from '../types';
import { SphericalHeadline } from './SphericalHeadline';

interface ServicesSectionProps {
  onOpenSimulator: () => void;
  onOpenGuide: () => void;
  onOpenConcreteCalc?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onOpenSimulator, 
  onOpenGuide,
  onOpenConcreteCalc
}) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory>('geotechnique');
  const [selectedTestModal, setSelectedTestModal] = useState<{
    name: string;
    norm: string;
    description: string;
  } | null>(null);

  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const activeService = SERVICES_DATA.find(s => s.id === activeTab) || SERVICES_DATA[0];

  const handleSelectTab = (serviceId: ServiceCategory) => {
    setActiveTab(serviceId);
    const tabEl = document.getElementById(`tab-service-${serviceId}`);
    if (tabEl && tabsScrollRef.current) {
      tabEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-4 h-4 sm:w-4.5 sm:h-4.5" />;
      case 'TestTubes': return <TestTubes className="w-4 h-4 sm:w-4.5 sm:h-4.5" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 sm:w-4.5 sm:h-4.5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5" />;
      case 'Compass': return <Compass className="w-4 h-4 sm:w-4.5 sm:h-4.5" />;
      case 'Droplet': return <Droplet className="w-4 h-4 sm:w-4.5 sm:h-4.5" />;
      default: return <Layers className="w-4 h-4 sm:w-4.5 sm:h-4.5" />;
    }
  };

  const getMobileTitle = (id: ServiceCategory) => {
    switch (id) {
      case 'geotechnique': return 'Géotechnique G1-G5';
      case 'laboratoire_sols': return 'Labo Sols & Roches';
      case 'chaussees_auscultation': return 'Chaussées & Routes';
      case 'controle_betons': return 'Bétons & Matériaux';
      case 'mines_forages': return 'Mines & Géophysique';
      case 'hydraulique_vrd': return 'Hydraulique & VRD';
      default: return '';
    }
  };

  return (
    <section id="metiers" className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header with 3D Spherical Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300/60 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>Pôles d'Expertise Technique</span>
          </div>

          {/* 3D Sphere Display for "Des métiers spécialisés pour sécuriser chaque étape de vos ouvrages" */}
          <SphericalHeadline />

          <p className="text-sm sm:text-base text-slate-600 px-1 max-w-2xl mx-auto">
            Du premier sondage géotechnique au contrôle de réception du béton durci et à l’auscultation des routes au déflectographe, Senelabo BTP déploie des équipements de précision et des ingénieurs chevronnés.
          </p>
        </motion.div>

        {/* Tab Selection Navigation - Épuré, Simple et Ultra-Fluide */}
        <div className="mb-8 sm:mb-10 max-w-5xl mx-auto">
          {/* Scrollable Tabs Track */}
          <div 
            ref={tabsScrollRef}
            className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-1 -mx-1 scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {SERVICES_DATA.map((service, index) => {
              const isActive = service.id === activeTab;
              return (
                <button
                  key={service.id}
                  onClick={() => handleSelectTab(service.id)}
                  id={`tab-service-${service.id}`}
                  className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer select-none shrink-0 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 bg-white hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-xs'
                  }`}
                >
                  {/* Sliding active pill background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceTabPill"
                      className="absolute inset-0 bg-slate-950 rounded-full shadow-md border border-slate-800"
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 35 
                      }}
                    />
                  )}

                  {/* Icon & Label */}
                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                    <span className={isActive ? 'text-amber-400' : 'text-slate-500'}>
                      {getIcon(service.icon)}
                    </span>
                    <span className="tracking-tight sm:hidden">{getMobileTitle(service.id)}</span>
                    <span className="tracking-tight hidden sm:inline">{service.shortTitle}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Service Detailed Card with Smooth Fluid Fade */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Context & Imagery */}
              <div className="lg:col-span-5 relative flex flex-col justify-between p-5 sm:p-8 bg-slate-900 text-white min-h-[300px] sm:min-h-[360px]">
                <div className="absolute inset-0 opacity-25 mix-blend-overlay">
                  <img 
                    src={activeService.image} 
                    alt={activeService.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>

                <div className="relative z-10 space-y-3.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="p-1.5 sm:p-2 bg-amber-500 text-slate-950 rounded-lg font-bold">
                      {getIcon(activeService.icon)}
                    </span>
                    <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                      Pôle d’expertise Senelabo
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-white leading-tight">
                    {activeService.title}
                  </h3>

                  <p className="text-sm font-medium text-amber-300">
                    {activeService.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeService.description}
                  </p>
                </div>

                <div className="relative z-10 pt-6 border-t border-slate-800 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {activeService.norms.map((norm, idx) => (
                      <span 
                        key={`norm-${activeService.id}-${norm}-${idx}`} 
                        className="text-[11px] bg-slate-800 text-slate-200 px-2.5 py-1 rounded font-mono border border-slate-700"
                      >
                        {norm}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={onOpenSimulator}
                      className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Demander une étude</span>
                    </motion.button>
                    {activeTab === 'geotechnique' && (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onOpenGuide}
                        className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                        <span>Guide G1-G5</span>
                      </motion.button>
                    )}
                    {activeTab === 'controle_betons' && onOpenConcreteCalc && (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onOpenConcreteCalc}
                        className="inline-flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Building2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Calculateur Béton (J+7 / J+28)</span>
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Tests, Features & Deliverables */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-8">
                
                {/* Core Features */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Méthodologies & Capacités Opérationnelles
                  </h4>
                  <ul className="grid grid-cols-1 gap-2.5">
                    {activeService.features.map((feature, i) => (
                      <li key={`feat-${activeService.id}-${i}`} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Normalized Tests Catalog */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Essais Normalisés In-Situ & en Laboratoire
                    </h4>
                    <span className="text-[11px] text-slate-500">Cliquez pour voir le descriptif</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeService.keyTests.map((test, index) => (
                      <motion.div 
                        key={`test-${activeService.id}-${test.name}-${index}`}
                        whileHover={{ y: -3, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSelectedTestModal(test)}
                        className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/40 transition-all cursor-pointer group shadow-2xs"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-900">
                            {test.name}
                          </p>
                          <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 shrink-0 mt-0.5" />
                        </div>
                        <span className="inline-block mt-1 text-[11px] font-mono text-amber-700 bg-amber-100/60 px-1.5 py-0.5 rounded">
                          {test.norm}
                        </span>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          {test.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Livrables & Rapports Opposables
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeService.deliverables.map((item, idx) => (
                      <span 
                        key={`deliv-${activeService.id}-${idx}`}
                        className="text-xs bg-slate-100 text-slate-800 font-medium px-3 py-1 rounded-full border border-slate-200"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Test details modal with AnimatePresence */}
      <AnimatePresence>
        {selectedTestModal && (
          <motion.div 
            key={`test-detail-modal-${selectedTestModal.norm}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] uppercase font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                    {selectedTestModal.norm}
                  </span>
                  <h3 className="text-lg font-bold text-slate-950 mt-1">
                    {selectedTestModal.name}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedTestModal(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedTestModal.description}
              </p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800">Engagement Qualité Senelabo BTP :</p>
                <p>• Réalisation selon les protocoles et tolérances strictes de la norme AFNOR / ASTM.</p>
                <p>• Étalonnage certifié périodique des capteurs, manomètres, balances et bâtis d’essais.</p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedTestModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Fermer
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedTestModal(null);
                    onOpenSimulator();
                  }}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg cursor-pointer"
                >
                  Inclure dans mon devis
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
