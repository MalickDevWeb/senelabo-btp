import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Search, 
  CheckCircle2, 
  Download, 
  Printer, 
  ShieldCheck, 
  Building, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SAMPLE_LAB_REPORTS, COMPANY_INFO } from '../data/senelaboData';
import { LabSampleReport } from '../types';
import { downloadLabReportPdf } from '../utils/pdfGenerator';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({ isOpen, onClose }) => {
  const [selectedReport, setSelectedReport] = useState<LabSampleReport>(SAMPLE_LAB_REPORTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = SAMPLE_LAB_REPORTS.find(r => 
      r.sampleCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (found) {
      setSelectedReport(found);
      setSearchFeedback(null);
    } else {
      setSearchFeedback("Rapport introuvable pour ce code. Affichage d'un spécimen représentatif ci-dessous.");
    }
  };

  const handleDownload = () => {
    setIsGenerating(true);
    setDownloadNotice(`Génération et téléchargement du PV officiel (${selectedReport.sampleCode}) en cours...`);
    try {
      setTimeout(() => {
        downloadLabReportPdf(selectedReport);
        setDownloadNotice(`✓ Le fichier "PV_Officiel_Senelabo_${selectedReport.sampleCode}.pdf" a été téléchargé avec succès sur votre appareil.`);
        setIsGenerating(false);
      }, 300);
      setTimeout(() => setDownloadNotice(null), 6000);
    } catch (err) {
      console.error(err);
      setDownloadNotice("Impossible de générer le fichier PDF. Veuillez réessayer.");
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      handleDownload();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="client-portal-modal"
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
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header (pinned at top) */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-white">
                    Portail Client & Consultation des PV d’Essais Officiels
                  </h3>
                  <p className="text-xs text-slate-400">
                    Accès direct aux procès-verbaux de contrôle laboratoire certifiés
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Fermer le portail"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

        <div className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1 overscroll-contain">
          
          {/* Quick Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Entrez un code d’échantillon (Ex: SN-BET-2024-0892 ou SN-SOL...)"
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl"
            >
              Vérifier le PV
            </button>
          </form>

          {searchFeedback && (
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{searchFeedback}</span>
            </div>
          )}

          {/* Quick Tabs of Demo Reports */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {SAMPLE_LAB_REPORTS.map((rep) => (
              <button
                key={rep.id}
                onClick={() => {
                  setSelectedReport(rep);
                  setSearchFeedback(null);
                }}
                className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap border transition-colors ${
                  selectedReport.id === rep.id
                    ? 'bg-amber-50 text-amber-900 border-amber-400'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {rep.sampleCode} ({rep.norm.split('/')[0]})
              </button>
            ))}
          </div>

          {/* Official Report Card (Styled like an authentic lab document) */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Document Header with Senelabo and QR code simulation */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b-2 border-slate-900 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black font-display tracking-tight text-slate-950">
                    SENELABO<span className="text-amber-500">BTP</span>
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-1.5 py-0.5 rounded border border-slate-300">
                    S.A.
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">
                  {COMPANY_INFO.tagline} • Filiale Géotec Afrique
                </p>
                <p className="text-[10px] text-slate-400">
                  {COMPANY_INFO.address}, Dakar • Tél : {COMPANY_INFO.phone}
                </p>
              </div>

              <div className="text-right sm:border-l sm:border-slate-200 sm:pl-6">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Procès-Verbal Officiel Conforme</span>
                </span>
                <p className="text-xs font-mono font-bold text-slate-900">
                  Réf : {selectedReport.sampleCode}
                </p>
                <p className="text-[10px] text-slate-500">
                  Délivré le : {selectedReport.dateCompleted}
                </p>
              </div>
            </div>

            {/* Test Subject Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[11px]">Intitulé du Projet :</span>
                <strong className="text-slate-900 text-sm">{selectedReport.projectName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Demandeur / Entreprise :</span>
                <strong className="text-slate-900">{selectedReport.clientName || selectedReport.client}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Type d’essai réalisé :</span>
                <strong className="text-slate-900">{selectedReport.testType}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Référentiel Normatif :</span>
                <strong className="text-amber-800 font-mono">{selectedReport.norm}</strong>
              </div>
            </div>

            {/* Test Results Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Valeurs Mesurées en Laboratoire :
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Paramètre Contrôlé</th>
                      <th className="p-3">Valeur Mesurée</th>
                      <th className="p-3">Seuil Exigé / Référence</th>
                      <th className="p-3 text-right">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedReport.keyValues.map((kv, i) => (
                      <tr key={`param-${selectedReport.id}-${i}`} className="hover:bg-slate-50">
                        <td className="p-3 font-medium text-slate-800">{kv.label}</td>
                        <td className="p-3 font-bold text-slate-950 font-mono">{kv.value}</td>
                        <td className="p-3 text-slate-600 font-mono">{kv.target}</td>
                        <td className="p-3 text-right">
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                            Conforme
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Technical Conclusion */}
            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 block">
                Conclusion de l’Ingénieur de Laboratoire :
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedReport.conclusion}
              </p>
            </div>

            {/* Download notice feedback */}
            {downloadNotice && (
              <div className="p-3 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{downloadNotice}</span>
              </div>
            )}

            {/* Signatures & Accreditation watermark */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Document authentifié par signature électronique Senelabo BTP</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-slate-950 font-bold rounded-lg transition-colors text-xs cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isGenerating ? 'Téléchargement...' : 'Télécharger le PV (PDF)'}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg transition-colors text-xs cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimer</span>
                </motion.button>
              </div>
            </div>

          </div>

        </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
