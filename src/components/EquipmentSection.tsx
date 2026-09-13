import React, { useState } from 'react';
import { 
  Truck, 
  Cpu, 
  CheckCircle2, 
  Gauge, 
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  Maximize2,
  X,
  Compass,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EQUIPMENT_DATA } from '../data/senelaboData';
import { EquipmentItem } from '../types';

type CategoryFilter = 'all' | 'route' | 'sondage' | 'laboratoire';

const CATEGORIES: { id: CategoryFilter; label: string; count: number }[] = [
  { id: 'all', label: 'Tous les équipements', count: 6 },
  { id: 'route', label: 'Auscultation Routière', count: 1 },
  { id: 'sondage', label: 'Sondages & Forages', count: 3 },
  { id: 'laboratoire', label: 'Laboratoire Sols & Bétons', count: 2 },
];

function getCategoryForEquipment(id: string): CategoryFilter {
  if (id === 'deflectographe') return 'route';
  if (id === 'presses_beton_3000kn' || id === 'bancs_oedométriques') return 'laboratoire';
  return 'sondage';
}

export const EquipmentSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(EQUIPMENT_DATA[0].id);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Filtered equipment list based on category
  const filteredEquipment = EQUIPMENT_DATA.filter(item => {
    if (activeCategory === 'all') return true;
    return getCategoryForEquipment(item.id) === activeCategory;
  });

  // Keep selected equipment valid
  const currentEquipment = EQUIPMENT_DATA.find(item => item.id === selectedId) || filteredEquipment[0] || EQUIPMENT_DATA[0];
  const currentIndex = EQUIPMENT_DATA.findIndex(item => item.id === currentEquipment.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % EQUIPMENT_DATA.length;
    setSelectedId(EQUIPMENT_DATA[nextIdx].id);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + EQUIPMENT_DATA.length) % EQUIPMENT_DATA.length;
    setSelectedId(EQUIPMENT_DATA[prevIdx].id);
  };

  return (
    <section id="materiel" className="py-20 lg:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(#f59e0b_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête principal & KPIs de déploiement */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8 border-b border-slate-800/80 pb-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
              <Cpu className="w-3.5 h-3.5" />
              <span>Parc Technique & Équipements de Pointe</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Une puissance matérielle de premier plan en Afrique de l’Ouest
            </h2>
            
            <p className="text-base text-slate-300 leading-relaxed">
              Senelabo BTP investit continuellement dans des machines de haute technologie : sondeuses polyvalentes sur chenilles et porteurs tout-terrain, presses asservies numériques et déflectographe informatisé.
            </p>
          </motion.div>

          {/* Carte KPI Capacité de déploiement */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-2 gap-3 shrink-0 lg:max-w-md w-full"
          >
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-center gap-3.5 shadow-sm">
              <div className="p-3 bg-amber-500/15 text-amber-400 rounded-xl border border-amber-500/20">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Flotte Mobile</p>
                <p className="text-base font-black text-white">5 Ateliers Forage</p>
                <p className="text-[11px] text-amber-400 font-medium">Tout-terrain & Chenilles</p>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-center gap-3.5 shadow-sm">
              <div className="p-3 bg-blue-500/15 text-blue-400 rounded-xl border border-blue-500/20">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Déploiement</p>
                <p className="text-base font-black text-white">Sénégal & UEMOA</p>
                <p className="text-[11px] text-emerald-400 font-medium">2 Labos Fixes & Mobiles</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline">
            Filtrer par domaine :
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  // If current selected item isn't in this category, pick the first one from it
                  if (cat.id !== 'all') {
                    const firstMatch = EQUIPMENT_DATA.find(item => getCategoryForEquipment(item.id) === cat.id);
                    if (firstMatch) setSelectedId(firstMatch.id);
                  }
                }}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Architecture interactive : Sélecteur gauche + Vitrine détaillée droite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLONNE GAUCHE : SÉLECTEUR ÉPURÉ AVEC ANIMATIONS */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between px-1 mb-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Sélectionnez un équipement :
              </p>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <span className="font-mono text-amber-400 font-bold">0{currentIndex + 1}</span>
                <span>/</span>
                <span className="font-mono">0{EQUIPMENT_DATA.length}</span>
              </div>
            </div>
            
            <div className="space-y-2.5">
              {filteredEquipment.map((item, idx) => {
                const isSelected = item.id === currentEquipment.id;
                const itemIndex = EQUIPMENT_DATA.findIndex(e => e.id === item.id) + 1;
                
                return (
                  <motion.div
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    id={`equip-card-${item.id}`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-200 border ${
                      isSelected
                        ? 'bg-gradient-to-r from-slate-900 to-slate-850 border-amber-500/80 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    {/* Active accent bar */}
                    {isSelected && (
                      <motion.div 
                        layoutId="activeEquipmentIndicator"
                        className="absolute -left-[2px] top-3 bottom-3 w-1.5 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.8)]"
                      />
                    )}

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        {/* Numéro séquentiel élégant */}
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 shadow-sm'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          0{itemIndex}
                        </div>

                        <div>
                          <h3 className={`text-sm font-bold transition-colors leading-snug ${
                            isSelected ? 'text-white' : 'text-slate-200'
                          }`}>
                            {item.name}
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5">{item.type}</p>
                        </div>
                      </div>

                      {/* Badge distinctif */}
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0 border transition-colors ${
                        isSelected
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-800/80 text-slate-400 border-slate-700/60'
                      }`}>
                        {item.badge}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Barre de navigation rapide Suivant / Précédent */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 px-1">
              <span className="text-xs text-slate-500 font-medium">Naviguer dans le parc</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-850 transition-colors"
                  aria-label="Équipement précédent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-850 transition-colors"
                  aria-label="Équipement suivant"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : VITRINE DÉTAILLÉE HAUTE QUALITÉ */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentEquipment.id}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md relative overflow-hidden"
              >
                {/* Lueur d'ambiance dynamique */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Cadre Visuel de la machine avec Lightbox */}
                <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 border border-slate-800 bg-slate-950 group">
                  <img 
                    src={currentEquipment.image} 
                    alt={currentEquipment.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Gradué cinématique pour contraste optimal */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  
                  {/* Badge en haut à gauche : Statut opérationnel live */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 shadow">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                      </span>
                      <span>En service actif</span>
                    </span>
                    <span className="bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                      {currentEquipment.badge}
                    </span>
                  </div>

                  {/* Bouton d'agrandissement en haut à droite */}
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-white backdrop-blur-md transition-all shadow"
                    title="Agrandir la photo"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  {/* Titre et type au bas de l'image */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-white leading-snug drop-shadow-md">
                      {currentEquipment.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-300 font-medium mt-0.5">
                      {currentEquipment.type}
                    </p>
                  </div>
                </div>

                {/* Box de performance / cadence mise en exergue */}
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="flex items-center gap-3.5 bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/30 p-4 rounded-2xl"
                >
                  <div className="p-2.5 bg-amber-400 text-slate-950 rounded-xl shadow-sm">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium block">
                      Performance / Cadence Opérationnelle :
                    </span>
                    <span className="text-sm sm:text-base font-black text-amber-300 tracking-tight">
                      {currentEquipment.capacity}
                    </span>
                  </div>
                </motion.div>

                {/* Description contextuelle et projets de référence */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {currentEquipment.description}
                </p>

                {/* Spécifications techniques détaillées */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Spécifications Techniques & Équipements Embarqués
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentEquipment.specs.map((spec, i) => (
                      <motion.div 
                        key={`spec-${currentEquipment.id}-${i}`} 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
                        className="flex items-start gap-2.5 bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 hover:border-slate-700 transition-colors"
                      >
                        <div className="p-1 rounded-md bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{spec}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Pied de carte : Contrôles qualité & Action immédiate */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-2 text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Étalonnages et contrôles périodiques vérifiés (ISO / AFNOR)</span>
                  </span>
                  
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-all shadow-md hover:shadow-amber-400/20 whitespace-nowrap"
                  >
                    <span>Demander les disponibilités</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Lightbox / Plein Écran pour la photo de l'équipement */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            key={`equipment-lightbox-${currentEquipment.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[75vh] flex items-center justify-center bg-slate-950">
                <img 
                  src={currentEquipment.image} 
                  alt={currentEquipment.name} 
                  className="max-h-[75vh] w-full object-contain"
                />
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 text-white hover:bg-black/90 border border-white/20 transition-all"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                    {currentEquipment.badge} • {currentEquipment.type}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    {currentEquipment.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {currentEquipment.capacity}
                  </p>
                </div>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

