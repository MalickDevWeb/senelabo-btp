import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Award, 
  Users, 
  Target, 
  CheckCircle2, 
  Shield, 
  Globe, 
  Layers,
  Quote,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Play,
  Pause
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_INFO, SENELABO_LEADERS, SENELABO_INFOGRAPHICS, PARTNERS_LOGOS } from '../data/senelaboData';

export const AboutSection: React.FC = () => {
  const [activeLeaderIndex, setActiveLeaderIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedInfographic, setSelectedInfographic] = useState<string | null>(null);

  const activeLeader = SENELABO_LEADERS[activeLeaderIndex];

  // Auto-play timer (pauses when user hovers over the card)
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveLeaderIndex((prev) => (prev + 1) % SENELABO_LEADERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered]);

  const nextLeader = () => {
    setDirection(1);
    setActiveLeaderIndex((prev) => (prev + 1) % SENELABO_LEADERS.length);
  };

  const prevLeader = () => {
    setDirection(-1);
    setActiveLeaderIndex((prev) => (prev - 1 + SENELABO_LEADERS.length) % SENELABO_LEADERS.length);
  };

  const selectLeader = (index: number) => {
    setDirection(index > activeLeaderIndex ? 1 : -1);
    setActiveLeaderIndex(index);
  };

  return (
    <section id="apropos" className="py-20 bg-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top: Institutional Presentation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
        >
          
          {/* Left Column: Authentic Field Visual & Experience */}
          <div className="lg:col-span-5 relative flex flex-col justify-between space-y-4 h-full">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 flex-1 min-h-[280px] sm:min-h-[320px] flex flex-col"
            >
              <img 
                src="/files/senelabo/imgfullscreen/_P1060167-1800.jpg" 
                alt="Équipes et ingénieurs Senelabo BTP sur le terrain" 
                className="w-full h-full min-h-[280px] sm:min-h-[320px] flex-1 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Siège N°139 SOTRAC MERMOZ • Dakar Yoff
                </span>
                <p className="text-sm font-semibold text-slate-100">
                  Compétences pluridisciplinaires d’envergure sous-régionale
                </p>
              </div>
            </motion.div>

            {/* Floating Experience Box - Pinned and aligned with right Corporate Factsheet */}
            <motion.div 
              whileHover={{ y: -2 }}
              className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-4 shrink-0 min-h-[92px] sm:min-h-[96px]"
            >
              <div className="w-14 h-14 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-2xl shrink-0 font-display">
                2006
              </div>
              <div>
                <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Création à Dakar</p>
                <p className="text-sm font-bold text-white">18+ Années d’Expertise BTP & Sols</p>
                <p className="text-xs text-slate-400">Pionnier de la géotechnique informatisée en Afrique de l’Ouest</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Historical Content, The 3 Pillars & Aligned Corporate Factsheet */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 h-full">
            
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300/60 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Building className="w-3.5 h-3.5" />
                  <span>Présentation Institutionnelle</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-950 tracking-tight leading-tight">
                  L’expertise géotechnique internationale ancrée dans la réalité des sols ouest-africains
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Créée à Dakar en 2006, <strong>SENELABO BTP S.A.</strong> s’est entourée de compétences pluridisciplinaires afin de s’élever au rang de bureau d’études et laboratoire d’essais de premier plan en Afrique de l’Ouest.
              </p>

              {/* The 3 Authentic Pillars from senelabo-btp.sn */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                <motion.div 
                  whileHover={{ y: -3 }}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between h-full"
                >
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                      <Target className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Notre Vocation</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Apporter aux maîtres d’ouvrages du BTP toute l’expertise nécessaire au bon déroulement des travaux, en phase étude et pendant les phases de construction.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -3 }}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between h-full"
                >
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                      <Shield className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Notre Indépendance</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Notre indépendance nous confère l’objectivité et l’impartialité indispensables dans l’exercice de nos fonctions de contrôle et d’ingénierie.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -3 }}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between h-full"
                >
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Notre Ambition</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Développer les nouvelles technologies appliquées aux activités de la géotechnique, de la géophysique et du BTP en Afrique de l’Ouest.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Corporate Factsheet - Pinned and aligned with left Experience Box */}
            <div className="bg-slate-900 text-slate-300 p-4 sm:p-5 rounded-2xl text-xs flex flex-wrap justify-between items-center gap-4 border border-slate-800 shrink-0 min-h-[92px] sm:min-h-[96px] shadow-xl">
              <div>
                <span className="text-slate-500 block">Forme juridique :</span>
                <strong className="text-white">Société Anonyme (S.A.)</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Capital Social :</span>
                <strong className="text-amber-400">150 000 000 FCFA</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Administrateur Général :</span>
                <strong className="text-white">Jean-Christophe ANDRÉ</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Admin. Général Adjoint :</span>
                <strong className="text-white">Raoul AHOUANDJINOU</strong>
              </div>
            </div>

          </div>

        </motion.div>

        {/* Authentic Leadership Quotes & Voice of the Team */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg shadow-slate-200/50 space-y-8 relative overflow-hidden"
        >
          {/* Subtle background ambient warmth */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6 relative z-10">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Parole de nos Experts & Dirigeants
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-950 tracking-tight">
                L’humain et la rigueur au cœur de chaque mission
              </h3>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              {/* Segmented Progress Indicators */}
              <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl">
                {SENELABO_LEADERS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectLeader(idx)}
                    className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                      activeLeaderIndex === idx 
                        ? 'w-7 bg-amber-500 shadow-xs' 
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Aller au dirigeant ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Play / Pause Toggle */}
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                title={isAutoPlay ? "Mettre en pause l'animation" : "Activer la rotation automatique"}
              >
                {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={prevLeader}
                  className="w-9 h-9 rounded-lg hover:bg-white text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                  aria-label="Dirigeant précédent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>
                
                <span className="text-xs font-bold text-slate-600 px-2 min-w-[46px] text-center font-mono">
                  {activeLeaderIndex + 1} / {SENELABO_LEADERS.length}
                </span>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={nextLeader}
                  className="w-9 h-9 rounded-lg hover:bg-white text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                  aria-label="Dirigeant suivant"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Slide Content with Directional Animation */}
          <div className="relative overflow-hidden min-h-[340px] sm:min-h-[300px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div 
                key={activeLeader.id}
                custom={direction}
                initial={(dir: number) => ({
                  opacity: 0,
                  x: dir > 0 ? 60 : -60,
                  scale: 0.97
                })}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: {
                    x: { type: "spring", stiffness: 280, damping: 28 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 }
                  }
                }}
                exit={(dir: number) => ({
                  opacity: 0,
                  x: dir > 0 ? -60 : 60,
                  scale: 0.97,
                  transition: {
                    x: { type: "spring", stiffness: 280, damping: 28 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 }
                  }
                })}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full"
              >
                {/* Photo Column with Precise Focal Point Centering */}
                <div className="md:col-span-4 relative group">
                  <div className="relative w-full aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-slate-950/15 border-4 border-white ring-1 ring-slate-200/80 bg-slate-900">
                    <img 
                      src={activeLeader.image} 
                      alt={activeLeader.name} 
                      style={{ 
                        objectPosition: activeLeader.imagePosition || '50% 20%' 
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    {/* Vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/10 pointer-events-none"></div>

                    {/* Authentic Identification Badge */}
                    <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                      <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-[11px] font-semibold text-amber-300 flex items-center justify-between shadow-lg">
                        <span className="truncate">{activeLeader.name}</span>
                        <span className="text-white/80 text-[9px] font-bold uppercase tracking-wider ml-1 shrink-0">Senelabo</span>
                      </div>
                    </div>
                  </div>

                  {/* Ambient back-glow behind photo */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/25 via-amber-400/10 to-transparent rounded-3xl blur-xl -z-10 opacity-75 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Quote and Details Column */}
                <div className="md:col-span-8 space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="inline-flex items-center gap-2 text-amber-800 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-2xs"
                  >
                    <Quote className="w-3.5 h-3.5 text-amber-600 fill-amber-500/20" />
                    <span>{activeLeader.context}</span>
                  </motion.div>

                  <motion.blockquote 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                    className="text-base sm:text-xl font-medium text-slate-800 italic leading-relaxed relative"
                  >
                    <span className="text-3xl sm:text-4xl text-amber-400 font-serif leading-none mr-1 select-none">“</span>
                    {activeLeader.quote}
                    <span className="text-3xl sm:text-4xl text-amber-400 font-serif leading-none ml-1 select-none">”</span>
                  </motion.blockquote>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="pt-2 border-l-2 border-amber-500 pl-3.5"
                  >
                    <h4 className="text-lg sm:text-xl font-black text-slate-950 font-display tracking-tight">
                      {activeLeader.name}
                    </h4>
                    <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                      {activeLeader.role} • Senelabo BTP
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Leader Selection Pills with Mini-Avatars and Shared Sliding Background */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              {SENELABO_LEADERS.map((leader, idx) => {
                const isSelected = activeLeaderIndex === idx;
                return (
                  <button
                    key={leader.id}
                    onClick={() => selectLeader(idx)}
                    className={`relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none ${
                      isSelected 
                        ? 'text-white' 
                        : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="active-leader-pill"
                        className="absolute inset-0 bg-slate-950 rounded-xl shadow-md"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    
                    {/* Miniature Avatar circle with perfectly matched focal centering */}
                    <div className="relative z-10 w-5 h-5 rounded-full overflow-hidden shrink-0 border border-white/30 bg-slate-800">
                      <img 
                        src={leader.image} 
                        alt={leader.name}
                        style={{ objectPosition: leader.imagePosition || '50% 20%' }}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <span className="relative z-10">
                      {leader.name.split(' ')[0]} {leader.name.split(' ')[1]}
                    </span>

                    {isSelected && (
                      <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Infographics Gallery from the Original Website */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto space-y-2"
          >
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Documentation & Infographies Originales
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-950">
              Les repères clés de notre savoir-faire
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Retrouvez l’ensemble des schémas, normes AFNOR et bilans d’activités publiés par Senelabo BTP.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SENELABO_INFOGRAPHICS.map((info) => (
              <motion.div 
                key={info.id}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedInfographic(info.image)}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative h-44 bg-slate-950 overflow-hidden flex items-center justify-center p-2">
                  <img 
                    src={info.image} 
                    alt={info.title} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 text-slate-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Agrandir
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                    {info.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-amber-600 transition-colors">
                    {info.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {info.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partners Showcase with authentic logos */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Réseau de Partenaires & Donneurs d’Ordre
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-display text-slate-950">
              Ils nous accordent leur confiance
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 items-center">
            {PARTNERS_LOGOS.map((partner, idx) => (
              <motion.div 
                key={`partner-${partner.name}-${idx}`}
                whileHover={{ scale: 1.05, borderColor: '#f59e0b' }}
                className="h-20 bg-slate-50 hover:bg-white rounded-xl border border-slate-200 p-3 flex flex-col items-center justify-center text-center transition-all group cursor-default"
              >
                {partner.logo ? (
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-12 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                  />
                ) : (
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900 leading-tight">
                      {partner.name}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {partner.role}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal for full size infographic viewing with AnimatePresence */}
      <AnimatePresence>
        {selectedInfographic && (
          <motion.div 
            key={`infographic-modal-${selectedInfographic}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedInfographic(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden p-3 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end p-2">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedInfographic(null)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg cursor-pointer"
                >
                  Fermer
                </motion.button>
              </div>
              <div className="max-h-[75vh] overflow-auto flex items-center justify-center p-4 bg-slate-900 rounded-xl">
                <img 
                  src={selectedInfographic} 
                  alt="Infographie agrandie" 
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
