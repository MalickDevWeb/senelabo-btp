import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  ShieldAlert, 
  CheckCircle2, 
  ChevronRight, 
  HelpCircle,
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MISSIONS_NORMS_DATA } from '../data/senelaboData';

interface GeotechGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSimulator: () => void;
}

export const GeotechGuideModal: React.FC<GeotechGuideModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenSimulator
}) => {
  const [selectedMission, setSelectedMission] = useState<string>('G2');

  const currentMission = MISSIONS_NORMS_DATA.find(m => m.code === selectedMission) || MISSIONS_NORMS_DATA[1];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="geotech-guide-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header (fixed at top of modal, never scrolls off) */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-white">
                    Guide des Missions Géotechniques (Norme NF P 94-500)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Classification officielle des missions d’ingénierie de sol et responsabilités
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Fermer le guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-8 space-y-6 overflow-y-auto flex-1 overscroll-contain">
          
          {/* Why normative geotechnics matter */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="block font-bold mb-0.5">Pourquoi respecter l’enchaînement des missions G1 à G5 au Sénégal ?</strong>
              Une étude de sol incomplète ou mal encadrée est la cause de plus de 80% des désordres sur les bâtiments à Dakar (fissures, tassements différentiels de fondations, désolidarisation de dalles). La norme NF P 94-500 garantit la bonne répartition des rôles entre le maître d’ouvrage, l’architecte et l’entrepreneur.
            </div>
          </div>

          {/* Mission Select Tabs with clear, non-truncated titles */}
          <div className="grid grid-cols-5 gap-2">
            {MISSIONS_NORMS_DATA.map((m) => {
              const isActive = m.code === selectedMission;
              return (
                <button
                  key={m.code}
                  onClick={() => setSelectedMission(m.code)}
                  className={`py-2.5 sm:py-3 px-1.5 sm:px-2 rounded-xl text-center transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-sm font-bold ring-2 ring-amber-400/40'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border-slate-200 font-semibold text-xs'
                  }`}
                >
                  <span className="block text-base sm:text-lg font-black">{m.code}</span>
                  <span className="text-[11px] block font-medium truncate mt-0.5">{m.shortLabel || m.name}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Mission View */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                  Mission {currentMission.code}
                </span>
                <h4 className="text-xl font-bold text-slate-950 mt-1">
                  {currentMission.name}
                </h4>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                {currentMission.phase}
              </span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {currentMission.description}
            </p>

            {/* Objectives */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Objectifs opérationnels de la mission :
              </h5>
              <div className="space-y-2">
                {currentMission.objectives.map((obj, i) => (
                  <div key={`obj-${currentMission.code}-${i}`} className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-semibold mb-1">Destiné à :</span>
                <span className="font-bold text-slate-900">{currentMission.recommendedFor}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-semibold mb-1">Aléa évité :</span>
                <span className="font-bold text-amber-700">{currentMission.riskAvoidance}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Fermer le guide
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onClose();
                onOpenSimulator();
              }}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shadow cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Demander un devis pour la mission {currentMission.code}</span>
            </motion.button>
          </div>

        </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
