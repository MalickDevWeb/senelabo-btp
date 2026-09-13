import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Printer, 
  Info,
  ShieldCheck,
  Building2,
  HelpCircle,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_INFO } from '../data/senelaboData';
import { downloadConcreteFollowUpPdf } from '../utils/pdfGenerator';

interface ConcreteCrushingCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ConcreteGrade {
  code: string;
  name: string;
  fckCyl: number; // MPa on 16x32 cylinder
  fckCube: number; // MPa on 15x15 cube
  targetJ7: number; // ~70% of fck
  typicalUse: string;
}

const CONCRETE_GRADES: ConcreteGrade[] = [
  {
    code: 'C20/25',
    name: 'C20/25 (Béton B20)',
    fckCyl: 20,
    fckCube: 25,
    targetJ7: 14,
    typicalUse: 'Dallages, semelles filantes simples, éléments peu armés'
  },
  {
    code: 'C25/30',
    name: 'C25/30 (Béton B25 - Standard BTP)',
    fckCyl: 25,
    fckCube: 30,
    targetJ7: 17.5,
    typicalUse: 'Poteaux, poutres, dalles, planchers d\'immeubles R+1 à R+6 à Dakar'
  },
  {
    code: 'C30/37',
    name: 'C30/37 (Béton B30 - Haute Performance)',
    fckCyl: 30,
    fckCube: 37,
    targetJ7: 21,
    typicalUse: 'Ouvrages d\'art, radiers sous-sol, réservoirs, ponts, tours R+8+'
  },
  {
    code: 'C35/45',
    name: 'C35/45 (BHP Génie Civil)',
    fckCyl: 35,
    fckCube: 45,
    targetJ7: 24.5,
    typicalUse: 'Béton précontraint, piles de pont, environnements marins agressifs'
  }
];

export const ConcreteCrushingCalculatorModal: React.FC<ConcreteCrushingCalculatorModalProps> = ({
  isOpen,
  onClose
}) => {
  // Today's date in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  
  const [pourDate, setPourDate] = useState<string>(todayStr);
  const [structurePart, setStructurePart] = useState<string>('Poteaux / Voiles RDC');
  const [gradeCode, setGradeCode] = useState<string>('C25/30');
  const [specimenShape, setSpecimenShape] = useState<'cylinder' | 'cube'>('cylinder');
  const [testAge, setTestAge] = useState<'J7' | 'J28'>('J28');
  const [measuredForceKn, setMeasuredForceKn] = useState<string>('520');
  const [showPrintView, setShowPrintView] = useState<boolean>(false);

  const selectedGrade = CONCRETE_GRADES.find(g => g.code === gradeCode) || CONCRETE_GRADES[1];

  // Specimen cross-section in mm²
  // Cylinder 16x32: Diameter 160 mm -> Area = pi * (80)^2 = 20106 mm² (~201 cm²)
  // Cube 15x15: 150 mm x 150 mm = 22500 mm² (225 cm²)
  const specimenArea = specimenShape === 'cylinder' ? 201.06 : 225.0; // in cm²
  const specimenAreaMm2 = specimenShape === 'cylinder' ? 20106 : 22500; // in mm²

  // Calculate critical lab milestone dates
  const calculateDate = (baseDateStr: string, daysToAdd: number) => {
    try {
      const date = new Date(baseDateStr);
      if (isNaN(date.getTime())) return '-';
      date.setDate(date.getDate() + daysToAdd);
      return date.toLocaleDateString('fr-FR', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return '-';
    }
  };

  const dateDemolding = calculateDate(pourDate, 1);
  const dateJ7 = calculateDate(pourDate, 7);
  const dateJ28 = calculateDate(pourDate, 28);
  const dateJ60 = calculateDate(pourDate, 60);

  // Pressure calculation
  // Force in kN = 1000 N. Area in mm².
  // Stress (MPa) = (Force * 1000) / AreaMm2
  const forceKn = parseFloat(measuredForceKn) || 0;
  const calculatedStressMpa = forceKn > 0 ? (forceKn * 1000) / specimenAreaMm2 : 0;

  // Target requirement
  const targetRequiredMpa = testAge === 'J7' 
    ? (specimenShape === 'cylinder' ? selectedGrade.targetJ7 : selectedGrade.targetJ7 * 1.15)
    : (specimenShape === 'cylinder' ? selectedGrade.fckCyl : selectedGrade.fckCube);

  const complianceRatio = targetRequiredMpa > 0 ? (calculatedStressMpa / targetRequiredMpa) * 100 : 0;
  const isCompliant = calculatedStressMpa >= targetRequiredMpa;
  const isBorderline = !isCompliant && calculatedStressMpa >= targetRequiredMpa * 0.9;

  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownloadPdf = () => {
    setIsDownloadingPdf(true);
    setDownloadSuccess("Génération et téléchargement de la fiche d'écrasement PDF en cours...");
    try {
      setTimeout(() => {
        downloadConcreteFollowUpPdf({
          concreteClass: selectedGrade.code,
          targetFck: specimenShape === 'cylinder' ? selectedGrade.fckCyl : selectedGrade.fckCube,
          ageDays: testAge === 'J7' ? 7 : 28,
          ageRatio: testAge === 'J7' ? 0.7 : 1.0,
          fcjMeasured: calculatedStressMpa,
          complianceRatio,
          isCompliant,
          specimenShape: specimenShape === 'cylinder' ? 'Cylindrique 16×32 cm (201 cm²)' : 'Cubique 15×15 cm (225 cm²)',
          batchNumber: structurePart || 'Lot béton chantier',
          notes: `Date coulage : ${pourDate} | Échéance : ${testAge === 'J7' ? dateJ7 : dateJ28}`
        });
        setDownloadSuccess("✓ La fiche officielle de contrôle béton a été téléchargée avec succès sur votre appareil !");
        setIsDownloadingPdf(false);
      }, 300);
      setTimeout(() => setDownloadSuccess(null), 6000);
    } catch (err) {
      console.error(err);
      setDownloadSuccess("Erreur lors de la génération du PDF.");
      setIsDownloadingPdf(false);
    }
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      handleDownloadPdf();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="concrete-crushing-calculator-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto"
          onClick={onClose}
        >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-slate-900"
        >
          {/* Header */}
          <div className="bg-slate-950 text-white px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black font-display text-white tracking-tight">
                    Calculateur d'Échéances & Écrasement Béton
                  </h3>
                  <span className="hidden sm:inline bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                    NF EN 12390-3
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Laboratoire Matériaux & Auscultation • Senelabo BTP Dakar
                </p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
            
            {/* Section 1: Formulaire des paramètres de coulage */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  1. Paramètres de Coulage & Identification de l'Élément
                </span>
                <span className="text-[11px] text-slate-500">Chantier Sénégal</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Date de coulage */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Date de coulage / prélèvement * :
                  </label>
                  <input
                    type="date"
                    value={pourDate}
                    onChange={(e) => setPourDate(e.target.value)}
                    className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Élément d'ouvrage coulé */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Élément coulé / Lot :
                  </label>
                  <input
                    type="text"
                    value={structurePart}
                    onChange={(e) => setStructurePart(e.target.value)}
                    placeholder="Ex: Poteaux R+2, Semelles isolées S1"
                    className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Forme de l'éprouvette */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Type d'éprouvette :
                  </label>
                  <select
                    value={specimenShape}
                    onChange={(e) => setSpecimenShape(e.target.value as 'cylinder' | 'cube')}
                    className="w-full text-xs font-medium p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="cylinder">Cylindre 16×32 cm (Standard Sénégal)</option>
                    <option value="cube">Cube 15×15 cm (Section 225 cm²)</option>
                  </select>
                </div>
              </div>

              {/* Choix de la classe du béton */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Classe de résistance prescrite (Cahier des charges / CCTP) :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {CONCRETE_GRADES.map((grade) => {
                    const isSelected = grade.code === gradeCode;
                    return (
                      <button
                        key={grade.code}
                        type="button"
                        onClick={() => setGradeCode(grade.code)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-950 text-white border-slate-900 shadow-md ring-2 ring-amber-500/50'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-black ${isSelected ? 'text-amber-400' : 'text-slate-900'}`}>
                            {grade.code}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                            isSelected ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {grade.fckCyl} MPa
                          </span>
                        </div>
                        <p className={`text-[11px] line-clamp-2 leading-tight ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {grade.typicalUse}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 2: Calendrier légal d'écrasement en Laboratoire */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Calendrier Réglementaire de Rupture en Laboratoire (NF EN 12390)
                  </h4>
                </div>
                <span className="text-[11px] text-slate-400">Immersion bassin à 20°C ± 2°C</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* J+1 */}
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Étape 1 : Démoulage (J+1)
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-1">
                    {dateDemolding}
                  </span>
                  <span className="text-[10px] text-amber-400 block mt-0.5">
                    Mise en cure immergée
                  </span>
                </div>

                {/* J+7 */}
                <div className="bg-slate-800/80 p-3 rounded-xl border border-amber-500/40 relative">
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                    Échéance 7 Jours (J+7)
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-1">
                    {dateJ7}
                  </span>
                  <span className="text-[10px] text-slate-300 block mt-0.5">
                    Cible ~{selectedGrade.targetJ7} MPa (≥70%)
                  </span>
                </div>

                {/* J+28 */}
                <div className="bg-slate-800/80 p-3 rounded-xl border border-emerald-500/50 relative">
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                    Échéance Légale 28J (J+28)
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-1">
                    {dateJ28}
                  </span>
                  <span className="text-[10px] text-slate-300 block mt-0.5">
                    Cible ≥ {specimenShape === 'cylinder' ? selectedGrade.fckCyl : selectedGrade.fckCube} MPa (100%)
                  </span>
                </div>

                {/* J+60 */}
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Échéance Tardive (J+60)
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block mt-1">
                    {dateJ60}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Sécurité ciment pouzzolane
                  </span>
                </div>
              </div>
            </div>

            {/* Section 3: Simulateur d'Écrasement & Contrôle de Conformité Direct */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <span className="text-xs font-bold text-slate-950 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  3. Simulateur de Rupture à la Presse Hydraulique (Contrôle direct)
                </span>
                <span className="text-[11px] text-slate-600 font-medium">Presse 2000 kN</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Échéance testée :
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTestAge('J7')}
                      className={`py-2 text-xs font-bold rounded-lg border transition-colors ${
                        testAge === 'J7'
                          ? 'bg-slate-900 text-amber-400 border-slate-900'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      À 7 Jours
                    </button>
                    <button
                      type="button"
                      onClick={() => setTestAge('J28')}
                      className={`py-2 text-xs font-bold rounded-lg border transition-colors ${
                        testAge === 'J28'
                          ? 'bg-slate-900 text-amber-400 border-slate-900'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      À 28 Jours
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Force de rupture lue sur presse (kN) :
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="5"
                      min="50"
                      max="2500"
                      value={measuredForceKn}
                      onChange={(e) => setMeasuredForceKn(e.target.value)}
                      className="w-full text-sm font-black p-2.5 pr-12 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                      kN
                    </span>
                  </div>
                </div>

                {/* Résultat de contrainte calculé */}
                <div className="bg-white p-2.5 rounded-xl border border-slate-300">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">
                    Contrainte équivalente :
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xl font-black text-slate-950">
                      {calculatedStressMpa.toFixed(1)}
                    </span>
                    <span className="text-xs font-bold text-slate-600">MPa</span>
                    <span className="text-[11px] text-slate-400 ml-auto">
                      Cible: ≥ {targetRequiredMpa.toFixed(1)} MPa
                    </span>
                  </div>
                </div>
              </div>

              {/* Diagnostic de conformité instantané */}
              <div className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
                isCompliant 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : isBorderline
                  ? 'bg-amber-100/90 border-amber-400 text-amber-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}>
                {isCompliant ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}

                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm font-bold uppercase">
                      {isCompliant 
                        ? 'Béton Conforme aux exigences du CCTP'
                        : isBorderline
                        ? 'Résistance Limite / À surveiller à 28 jours'
                        : 'Alerte Résistance Insuffisante (Non Conforme)'}
                    </strong>
                    <span className="font-mono font-bold text-xs bg-white/70 px-2 py-0.5 rounded">
                      {complianceRatio.toFixed(0)}% de l'objectif
                    </span>
                  </div>
                  <p className="leading-relaxed opacity-90">
                    {isCompliant ? (
                      `L'éprouvette atteint ${calculatedStressMpa.toFixed(1)} MPa pour un minimum requis de ${targetRequiredMpa.toFixed(1)} MPa à ${testAge}. La résistance caractéristique est validée.`
                    ) : isBorderline ? (
                      `La valeur mesurée (${calculatedStressMpa.toFixed(1)} MPa) est légèrement inférieure au seuil contractuel (${targetRequiredMpa.toFixed(1)} MPa). Il est conseillé d'attendre l'échéance complémentaire J+60 jours ou d'effectuer des mesures au scléromètre.`
                    ) : (
                      `La résistance mesurée est en deçà du seuil contractuel. Senelabo BTP recommande un contrôle non-destructif sur site (ultrasons, carottage sur ouvrage durci selon NF EN 12504-1).`
                    )}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Download Notification */}
          {downloadSuccess && (
            <div className="mx-5 sm:mx-8 mb-3 p-3 bg-amber-50 border border-amber-300 text-amber-950 rounded-xl text-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{downloadSuccess}</span>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="bg-slate-100 px-5 sm:px-8 py-3.5 sm:py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Dépôt des éprouvettes au laboratoire Senelabo BTP Mermoz Dakar (08h - 18h).</span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isDownloadingPdf}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-slate-950 font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isDownloadingPdf ? 'Téléchargement...' : 'Télécharger la Fiche (PDF)'}</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimer</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};
