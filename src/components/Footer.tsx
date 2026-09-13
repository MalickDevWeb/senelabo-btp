import React from 'react';
import { 
  Layers, 
  Phone, 
  Mail, 
  MapPin, 
  Shield, 
  ArrowUp, 
  FileText, 
  Calculator,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/senelaboData';

interface FooterProps {
  onOpenSimulator: () => void;
  onOpenPortal: () => void;
  onOpenGuide: () => void;
  onOpenConcreteCalc?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenSimulator, 
  onOpenPortal, 
  onOpenGuide,
  onOpenConcreteCalc
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top Banner inside footer */}
      <div className="border-b border-slate-800/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Column 1: Brand & Identity */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-white p-1.5 rounded-lg border border-slate-700 shadow-xs flex items-center justify-center">
                  <img 
                    src={COMPANY_INFO.logo} 
                    alt="Logo Senelabo BTP" 
                    className="h-9 w-auto object-contain"
                  />
                </div>
                <div>
                  <span className="text-lg font-black font-display tracking-tight text-white">
                    SENELABO<span className="text-amber-400">BTP</span>
                  </span>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                    S.A. Capital 150M FCFA
                  </p>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed text-xs">
                Laboratoire de sols, chaussées et matériaux de construction. Bureau d'études géotechniques de référence au Sénégal et en Afrique de l'Ouest depuis 2006.
              </p>

              <div className="inline-flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-amber-400 font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>Filiale Géotec Afrique (Groupe Géotec)</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Nos Domaines d'Intervention
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#metiers" className="hover:text-amber-400 transition-colors">Études Géotechniques G1 à G5</a></li>
                <li><a href="#metiers" className="hover:text-amber-400 transition-colors">Laboratoire Mécanique des Sols & Roches</a></li>
                <li><a href="#metiers" className="hover:text-amber-400 transition-colors">Auscultation Routière & Déflectographe</a></li>
                <li><a href="#metiers" className="hover:text-amber-400 transition-colors">Contrôle Bétons (Presses 3000 kN)</a></li>
                <li><a href="#metiers" className="hover:text-amber-400 transition-colors">Forages Miniers Wireline HQ/NQ</a></li>
                <li><a href="#metiers" className="hover:text-amber-400 transition-colors">Hydraulique & Perméabilité VRD</a></li>
              </ul>
            </div>

            {/* Column 3: Tools & Norms */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Outils & Documentation
              </h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={onOpenGuide} className="text-slate-400 hover:text-amber-400 transition-colors text-left flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-amber-500" />
                    <span>Guide des Missions NF P 94-500</span>
                  </button>
                </li>
                <li>
                  <button onClick={onOpenSimulator} className="text-slate-400 hover:text-amber-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                    <ChevronRight className="w-3 h-3 text-amber-500" />
                    <span>Simulateur d'Étude & Devis (Export PDF)</span>
                  </button>
                </li>
                {onOpenConcreteCalc && (
                  <li>
                    <button onClick={onOpenConcreteCalc} className="text-amber-300 hover:text-amber-400 transition-colors text-left flex items-center gap-1.5 font-medium cursor-pointer">
                      <ChevronRight className="w-3 h-3 text-amber-500" />
                      <span>Calculateur Écrasement Béton (J+7 / J+28)</span>
                    </button>
                  </li>
                )}
                <li>
                  <button onClick={onOpenPortal} className="text-slate-400 hover:text-amber-400 transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                    <ChevronRight className="w-3 h-3 text-amber-500" />
                    <span>Consultation des PV d'Essais</span>
                  </button>
                </li>
                <li>
                  <a href="#references" className="text-slate-400 hover:text-amber-400 transition-colors text-left flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-amber-500" />
                    <span>Projets Emblématiques (AIBD, Millénium)</span>
                  </a>
                </li>
                <li>
                  <a href="#materiel" className="text-slate-400 hover:text-amber-400 transition-colors text-left flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-amber-500" />
                    <span>Parc de Sondage (OPTIMA, EC700)</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Direct Headquarters Contact */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Siège Dakar
              </h4>
              <div className="space-y-2 text-slate-400">
                <p className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.address}, BP 13162 Dakar Yoff, Sénégal</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white font-bold text-slate-200">
                    {COMPANY_INFO.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                    {COMPANY_INFO.email}
                  </a>
                </p>
              </div>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenSimulator}
                  className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Demander une étude en ligne</span>
                </motion.button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-[11px] text-center sm:text-left">
          © 2006 - {new Date().getFullYear()} SENELABO BTP S.A. Tous droits réservés. Filiale Géotec Afrique - Groupe Géotec. Conforme aux normes NF P 94-500 & ASTM.
        </p>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors p-1 cursor-pointer"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>

    </footer>
  );
};
