import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  FileText, 
  Calculator, 
  Layers, 
  CheckCircle2, 
  ChevronRight,
  Shield,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_INFO } from '../data/senelaboData';

interface HeaderProps {
  onOpenSimulator: () => void;
  onOpenPortal: () => void;
  onOpenGuide: () => void;
  onOpenConcreteCalc?: () => void;
  currentSection?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenSimulator, 
  onOpenPortal, 
  onOpenGuide,
  onOpenConcreteCalc
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Nos Métiers', href: '#metiers' },
    { name: 'Parc Matériel', href: '#materiel' },
    { name: 'Références', href: '#references' },
    { name: 'Normes G1-G5', href: '#normes', onClick: onOpenGuide },
    { name: 'Calculateur Béton', href: '#calculateur-beton', onClick: onOpenConcreteCalc },
    { name: 'À Propos', href: '#apropos' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-slate-200">
      {/* Top utility bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors shrink-0">
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 shrink-0" />
              <a href={`tel:${COMPANY_INFO.phone}`} className="text-[11px] sm:text-xs font-semibold text-white tracking-tight">{COMPANY_INFO.phone}</a>
            </span>
            <span className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors text-xs">
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-slate-400 text-xs">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>N°139 SOTRAC Mermoz, Dakar</span>
            </span>
            <span className="hidden xl:flex items-center gap-1.5 text-slate-400 text-xs">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>08h - 18h</span>
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 bg-slate-900 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] text-amber-400 font-medium border border-amber-500/25">
              <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0" />
              <span className="hidden xs:inline sm:hidden">Géotec Afrique</span>
              <span className="xs:hidden">Géotec</span>
              <span className="hidden sm:inline">Filiale Géotec Afrique - Groupe Géotec</span>
            </div>
            <button
              onClick={onOpenPortal}
              id="header-btn-espace-client"
              className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded transition-colors cursor-pointer"
            >
              <FileText className="w-3 h-3 text-amber-400" />
              <span>Espace PV & Rapports</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand identity */}
          <a href="#accueil" className="flex items-center shrink-0 py-1 group">
            <img 
              src={COMPANY_INFO.logo} 
              alt="Logo Senelabo BTP" 
              className="h-8 sm:h-11 w-auto max-w-[190px] sm:max-w-[300px] object-contain transition-transform group-hover:scale-102"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            {/* Fallback badge shown only if image fails to load */}
            <div className="hidden items-center gap-2">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-950 font-display">
                SENELABO<span className="text-amber-500 ml-0.5">BTP</span>
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded border border-amber-200 uppercase">
                S.A.
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 shrink min-w-0">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={link.onClick}
                className="text-xs 2xl:text-sm font-semibold text-slate-700 hover:text-amber-600 transition-colors py-2 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenSimulator}
              id="header-btn-devis"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:scale-98 text-slate-950 text-xs 2xl:text-sm font-bold px-3.5 2xl:px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer"
            >
              <Calculator className="w-4 h-4 shrink-0" />
              <span>Simuler un Devis</span>
            </motion.button>
          </div>

          {/* Mobile/Tablet hamburger button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenSimulator}
              className="sm:hidden p-2 text-amber-600 hover:bg-amber-50 rounded-lg cursor-pointer"
              title="Calculer un devis"
            >
              <Calculator className="w-5 h-5" />
            </button>
            <button
              type="button"
              id="header-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet menu dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            key="header-mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden border-t border-slate-200 bg-white shadow-xl px-4 pt-3 pb-6 space-y-3 overflow-hidden"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    if (link.onClick) link.onClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-amber-600 transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSimulator();
                }}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-lg text-sm cursor-pointer shadow-sm"
              >
                <Calculator className="w-4 h-4" />
                <span>Demander une Étude / Devis en ligne</span>
              </motion.button>

              {onOpenConcreteCalc && (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConcreteCalc();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-amber-50 text-amber-950 border border-amber-300 font-bold py-2.5 rounded-lg text-sm hover:bg-amber-100 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-amber-700" />
                  <span>Calculateur d'Écrasement Béton (J+7 / J+28)</span>
                </motion.button>
              )}

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-medium py-2.5 rounded-lg text-sm hover:bg-slate-800 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Consulter un PV d'Essai / Espace Client</span>
              </motion.button>
            </div>

            <div className="pt-3 text-xs text-slate-500 space-y-1 bg-slate-50 p-3 rounded-lg">
              <p className="font-semibold text-slate-700">Senelabo BTP S.A. - Siège Dakar :</p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{COMPANY_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{COMPANY_INFO.address}, Dakar</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
