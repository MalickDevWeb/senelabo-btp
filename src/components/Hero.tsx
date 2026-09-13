import React, { useState } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck, 
  Play,
  Maximize2,
  X,
  Film
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingLettersHeadline } from './FloatingLettersHeadline';

interface HeroProps {
  onOpenSimulator: () => void;
  onOpenGuide: () => void;
  onExploreServices: () => void;
}

const PRESENTATION_VIDEO = {
  id: 'klaRnDfEgmY',
  title: 'Film Institutionnel Senelabo BTP & Groupe Géotec',
  duration: '01:30',
  desc: 'Découvrez en vidéo les expertises de Senelabo BTP, laboratoire agréé et ingénierie géotechnique à Dakar.'
};

export const Hero: React.FC<HeroProps> = ({ 
  onOpenSimulator, 
  onOpenGuide, 
  onExploreServices 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  return (
    <section id="accueil" className="relative bg-slate-950 text-white overflow-hidden">
      {/* Background layer with subtle technical grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Background imagery with dark engineering tint */}
      <div className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none">
        <img 
          src="/files/senelabo/imgfullscreen/20140626_julien_ANDRE_cc_by_sa_23-1800.jpg" 
          alt="Chantier de génie civil et sondages géotechniques Senelabo BTP" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Animated glowing ambient orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.18, 0.1] 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-14 lg:pb-24">
        {/* Live operational master badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-center mb-6 lg:mb-8"
        >
          <div className="inline-flex items-center gap-2.5 bg-slate-900/90 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs text-slate-300 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
            </span>
            <span className="font-semibold text-amber-400">SENELABO BTP</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">Laboratoire Agréé & Études Géotechniques</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400 font-medium">Dakar, Sénégal</span>
          </div>
        </motion.div>

        {/* Grille 2 colonnes parfaitement alignées au sommet et en proportion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* CÔTÉ 1 : PRÉSENTATION DE SENELABO BTP */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6 text-left flex flex-col justify-start"
          >
            {/* Main Animated Headline with floating letters */}
            <FloatingLettersHeadline className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl" />

            {/* Subtitle / Company Presentation */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed"
            >
              Depuis 2006 à Dakar, <strong className="text-white font-semibold">Senelabo BTP</strong> (filiale de Géotec Afrique / Groupe Géotec) accompagne les maîtres d'ouvrage, promoteurs, architectes et entreprises de BTP dans toute l’Afrique de l’Ouest avec des <strong className="text-white font-semibold">études géotechniques complètes G1 à G5</strong>, un laboratoire agréé accrédité et un <strong className="text-amber-400 font-semibold">déflectographe informatisé</strong> de pointe.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="pt-1 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenSimulator}
                id="hero-btn-simulator"
                className="relative inline-flex items-center justify-center gap-2.5 sm:gap-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 sm:px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all text-sm sm:text-base group cursor-pointer"
              >
                <Calculator className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Simuler votre Étude & Devis</span>
                <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1.5 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenGuide}
                id="hero-btn-guide"
                className="inline-flex items-center justify-center gap-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-500 px-4 sm:px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all cursor-pointer backdrop-blur-sm"
              >
                <FileCheck className="w-5 h-5 text-amber-400" />
                <span>Guide Missions G1-G5</span>
              </motion.button>
            </motion.div>

            {/* Guarantees / Quality Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="pt-1 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Normes NF P 94-500 & ASTM</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mobilisation sous 48h au Sénégal</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Rapports signés certifiés</span>
              </div>
            </motion.div>
          </motion.div>

          {/* CÔTÉ 2 : CADRE VIDÉO ÉPURÉ & PARFAITEMENT ALIGNÉ */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.97, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.65, ease: "easeOut" }}
            className="w-full flex flex-col justify-start"
          >
            <div className="relative group w-full">
              {/* Halo d'ambiance lumineux et doux */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/20 via-amber-400/15 to-blue-500/15 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Cadre biseauté très soigné */}
              <div className="relative rounded-3xl overflow-hidden p-2 sm:p-2.5 bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-slate-950 border border-slate-700/70 group-hover:border-amber-500/40 shadow-2xl backdrop-blur-xl transition-all duration-500">
                
                {/* Écran 16:9 */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-inner group/screen">
                  {isPlaying ? (
                    <div className="relative w-full h-full">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${PRESENTATION_VIDEO.id}?autoplay=1&rel=0&modestbranding=1`}
                        title={PRESENTATION_VIDEO.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <button
                        onClick={() => setIsPlaying(false)}
                        className="absolute top-3 right-3 z-20 bg-slate-950/85 hover:bg-slate-900 text-white px-2.5 py-1.5 rounded-xl text-xs backdrop-blur-md transition-all flex items-center gap-1.5 border border-slate-700/70 shadow-lg cursor-pointer"
                        title="Fermer la vidéo"
                      >
                        <X className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-[11px] font-medium">Fermer</span>
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => setIsPlaying(true)}
                      className="relative w-full h-full cursor-pointer"
                    >
                      {/* Image de couverture immersive */}
                      <img 
                        src="/files/senelabo/imgfullscreen/20140626_julien_ANDRE_cc_by_sa_23-1800.jpg" 
                        alt="Film de présentation Senelabo BTP" 
                        className="w-full h-full object-cover group-hover/screen:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Dégradé cinématique épuré */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-slate-950/20" />

                      {/* Badge discret haut gauche */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-white/10 text-slate-200 text-xs font-medium backdrop-blur-md shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                          Film Officiel • {PRESENTATION_VIDEO.duration}
                        </span>
                      </div>

                      {/* Bouton plein écran discret haut droit */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsFullscreenOpen(true);
                        }}
                        className="absolute top-3 right-3 bg-slate-950/80 hover:bg-slate-900 border border-white/10 text-slate-300 hover:text-white p-2 rounded-xl backdrop-blur-md transition-colors cursor-pointer shadow-sm"
                        title="Agrandir en mode cinéma"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>

                      {/* Bouton central Play magnifique */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-slate-950 flex items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.5)] group-hover/screen:shadow-[0_0_55px_rgba(245,158,11,0.8)] transition-all duration-300"
                        >
                          <span className="absolute inset-0 rounded-full border-2 border-amber-300 animate-ping opacity-60 pointer-events-none" />
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-slate-950 ml-1 text-slate-950" />
                        </motion.div>
                        <p className="mt-3.5 text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow-md">
                          Lancer la vidéo
                        </p>
                      </div>

                      {/* Signature discrète au bas */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-left pointer-events-none">
                        <span className="text-xs font-medium text-slate-200 drop-shadow-md">
                          Senelabo BTP • Dakar Mermoz
                        </span>
                        <span className="text-[11px] text-amber-400 font-semibold tracking-wide">
                          Groupe Géotec
                        </span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </motion.div>


        </div>

        {/* Live Counters Banner with hover motion */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-14 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
        >
          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="space-y-1 p-3 rounded-xl hover:bg-slate-900/60 transition-colors"
          >
            <p className="text-3xl sm:text-4xl font-black font-display text-amber-400">18+ ans</p>
            <p className="text-sm font-semibold text-white">Créé en 2006 à Dakar</p>
            <p className="text-xs text-slate-400">Pionnier de la géotechnique moderne au Sénégal</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="space-y-1 p-3 rounded-xl hover:bg-slate-900/60 transition-colors"
          >
            <p className="text-3xl sm:text-4xl font-black font-display text-white">+5 000 km</p>
            <p className="text-sm font-semibold text-amber-400">Chaussées Auscultées</p>
            <p className="text-xs text-slate-400">Déflectographe informatisé haute cadence</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="space-y-1 p-3 rounded-xl hover:bg-slate-900/60 transition-colors"
          >
            <p className="text-3xl sm:text-4xl font-black font-display text-white">+1 250</p>
            <p className="text-sm font-semibold text-white">Projets Majeurs Livrés</p>
            <p className="text-xs text-slate-400">AIBD, Tour Millénium, Ambassade USA, AGEROUTE</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="space-y-1 p-3 rounded-xl hover:bg-slate-900/60 transition-colors"
          >
            <p className="text-3xl sm:text-4xl font-black font-display text-amber-400">5 Ateliers</p>
            <p className="text-sm font-semibold text-white">Sondeuses & Forages</p>
            <p className="text-xs text-slate-400">Capacité de déploiement sous-régional rapide</p>
          </motion.div>
        </motion.div>

      </div>

      {/* MODAL CINÉMA / PLEIN ÉCRAN */}
      <AnimatePresence>
        {isFullscreenOpen && (
          <motion.div 
            key="hero-video-fullscreen-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setIsFullscreenOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-slate-700 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Modal */}
              <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <Film className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-white text-sm">
                    {PRESENTATION_VIDEO.title}
                  </span>
                </div>
                <button 
                  onClick={() => setIsFullscreenOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Fermer le plein écran"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Player 16:9 */}
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${PRESENTATION_VIDEO.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={PRESENTATION_VIDEO.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Footer Modal avec description & navigation */}
              <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
                <div>
                  <p className="text-xs text-slate-300 font-medium">
                    {PRESENTATION_VIDEO.desc}
                  </p>
                  <p className="text-[11px] text-amber-400 mt-0.5">
                    Senelabo BTP • Filiale de Géotec Afrique (Groupe Géotec) • Dakar Mermoz
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsFullscreenOpen(false);
                    onOpenSimulator();
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  Demander un devis pour votre projet
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
