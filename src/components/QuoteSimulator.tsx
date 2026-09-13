import React, { useState } from 'react';
import { 
  Calculator, 
  Check, 
  Send, 
  Layers, 
  Building2, 
  Compass, 
  MapPin, 
  Clock, 
  FileText, 
  Download, 
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Printer,
  Shield,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_INFO } from '../data/senelaboData';
import { downloadQuotePdf } from '../utils/pdfGenerator';

interface QuoteSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteSimulator: React.FC<QuoteSimulatorProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [projectType, setProjectType] = useState<string>('immeuble');
  const [levels, setLevels] = useState<string>('r+4');
  const [hasBasement, setHasBasement] = useState<boolean>(false);
  const [surface, setSurface] = useState<string>('800');
  const [location, setLocation] = useState<string>('dakar');
  const [missionType, setMissionType] = useState<string>('g2_avp');
  const [soilType, setSoilType] = useState<string>('inconnu');
  const [showOfficialPdf, setShowOfficialPdf] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);

  // Contact form state
  const [contactData, setContactData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Dynamic engineering recommendation calculation
  const getRecommendation = () => {
    let boreholesCount = 2;
    let boreholeDepth = '10 à 15 m';
    let inSituTest = 'Sondages Pressiométriques Ménard (NF P 94-110-1) + Sondage Carotté';
    let labTests = ['Granulométrie par tamisage', 'Limites d’Atterberg (WL, WP)', 'Teneur en eau naturelle'];
    let estimatedDuration = '10 à 15 jours ouvrés';

    if (projectType === 'immeuble') {
      if (levels === 'r+1' || levels === 'r+2') {
        boreholesCount = 2;
        boreholeDepth = '10 à 12 m';
      } else if (levels === 'r+4' || levels === 'r+6') {
        boreholesCount = 3;
        boreholeDepth = '15 à 20 m';
        labTests.push('Essai Œdométrique de tassement');
      } else {
        boreholesCount = 4;
        boreholeDepth = hasBasement ? '25 à 35 m' : '20 à 30 m';
        inSituTest = 'Pressiomètre haute pression + Carottage profond continu + Diagraphies';
        labTests.push('Essais Œdométriques', 'Cisaillement direct', 'Agressivité de l’eau souterraine');
      }
    } else if (projectType === 'route') {
      boreholesCount = Math.max(3, Math.round(Number(surface || 1000) / 300));
      boreholeDepth = '2 à 5 m';
      inSituTest = 'Auscultation au Déflectographe informatisé + Puits manuels / Pénétromètre lourd';
      labTests = ['Essais Proctor Modifié', 'Indice CBR immédiat et après 4j immersion', 'Équivalent de sable', 'Granulométrie'];
    } else if (projectType === 'hangar') {
      boreholesCount = 3;
      boreholeDepth = '8 à 12 m';
      inSituTest = 'Pénétromètre dynamique lourd (DPSH) + Sondages pressiométriques';
    } else if (projectType === 'pont') {
      boreholesCount = 4;
      boreholeDepth = '25 à 40 m';
      inSituTest = 'Sondages carottés avec scissomètre et pressiomètre pour pieux forés';
      labTests.push('Essais triaxiaux', 'Compressibilité œdométrique');
    }

    if (location === 'diamniadio' || location === 'rufisque') {
      labTests.push('Essai de Gonflement à l’œdomètre (Argiles marneuses gonflantes)');
    }

    return {
      boreholesCount,
      boreholeDepth,
      inSituTest,
      labTests,
      estimatedDuration
    };
  };

  const rec = getRecommendation();

  // Financial estimations
  const getFinancials = () => {
    let base = 1800000;
    if (projectType === 'immeuble') {
      if (levels === 'r+1' || levels === 'r+2') base = 1650000;
      else if (levels === 'r+4') base = 2400000;
      else if (levels === 'r+6') base = 3200000;
      else if (levels === 'r+8') base = 4100000;
      else base = 5600000;
      if (hasBasement) base += 450000;
    } else if (projectType === 'route') {
      base = 2100000;
    } else if (projectType === 'hangar') {
      base = 1850000;
    } else if (projectType === 'pont') {
      base = 5200000;
    }

    if (location === 'diamniadio' || location === 'rufisque') base += 250000;
    if (location === 'interieur' || location === 'casamance') base += 400000;

    const tva = Math.round(base * 0.18);
    const ttc = base + tva;
    return {
      ht: base,
      tva,
      ttc
    };
  };

  const financials = getFinancials();
  const formatFcfa = (val: number) => val.toLocaleString('fr-FR') + ' FCFA';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const quoteNumber = `DEV-SN-2026-${Math.abs((location.length * 37 + (projectType.length * 91)) % 9000 + 1000)}`;

  const handleDownloadQuotePdf = () => {
    setIsGeneratingPdf(true);
    setDownloadFeedback("Génération et téléchargement de votre devis officiel PDF...");
    try {
      setTimeout(() => {
        downloadQuotePdf({
          quoteNumber,
          projectType: projectType === 'immeuble' ? `Bâtiment / Immeuble (${levels.toUpperCase()}${hasBasement ? ' + sous-sol' : ''})` : projectType === 'route' ? 'Plateforme / Voirie & Réseaux' : projectType === 'hangar' ? 'Hangar Industriel' : 'Ouvrage d’Art / Pont',
          location: location.toUpperCase(),
          missionType: missionType.toUpperCase(),
          soilCondition: soilType === 'sable' ? 'Sables dunaires' : soilType === 'argile' ? 'Argiles marneuses gonflantes' : soilType === 'roche' ? 'Basalte / Latérite' : 'Sol à déterminer par sondages',
          surfaceArea: surface,
          buildingHeight: levels.toUpperCase(),
          clientName: contactData.name || 'Client Senelabo',
          clientCompany: contactData.company || 'Promoteur / Particulier',
          clientEmail: contactData.email || 'Non renseigné',
          clientPhone: contactData.phone || 'Non renseigné',
          comments: contactData.notes || '',
          priceEstimate: formatFcfa(financials.ht),
          deliveryTime: rec.estimatedDuration,
          labTests: rec.labTests,
        });
        setDownloadFeedback(`✓ Le devis officiel "${quoteNumber}.pdf" a été téléchargé avec succès sur votre appareil.`);
        setIsGeneratingPdf(false);
      }, 300);
      setTimeout(() => setDownloadFeedback(null), 6000);
    } catch (err) {
      console.error(err);
      setDownloadFeedback("Erreur lors de la génération du devis PDF. Veuillez réessayer.");
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      handleDownloadQuotePdf();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            key="quote-simulator-modal"
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
            
            {/* Modal Header - pinned at top */}
            <div className="bg-slate-900 text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
                  <Calculator className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold font-display text-white truncate">
                    Simulateur de Devis Géotechnique Express
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400">
                    Norme NF P 94-500 • Senelabo BTP Dakar
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                title="Fermer le simulateur"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

        {/* Content Body */}
        {!isSubmitted ? (
          <div className="p-5 sm:p-8 space-y-6 overflow-y-auto flex-1 overscroll-contain">
            {/* Step Indicators */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 text-xs font-bold">
              <span className={`flex items-center gap-1.5 ${step >= 1 ? 'text-amber-600' : 'text-slate-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-600'}`}>1</span>
                <span>Type d’Ouvrage</span>
              </span>
              <span className="text-slate-300">──</span>
              <span className={`flex items-center gap-1.5 ${step >= 2 ? 'text-amber-600' : 'text-slate-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-600'}`}>2</span>
                <span>Localisation & Sols</span>
              </span>
              <span className="text-slate-300">──</span>
              <span className={`flex items-center gap-1.5 ${step >= 3 ? 'text-amber-600' : 'text-slate-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-600'}`}>3</span>
                <span>Programme & Devis</span>
              </span>
            </div>

            {/* Step 1: Project Type */}
            {step === 1 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-950 uppercase tracking-wider">
                  1. Quel est le type de votre projet ?
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'immeuble', label: 'Immeuble / Bâtiment', desc: 'R+1 à R+15+ résidentiel ou bureau' },
                    { id: 'villa', label: 'Villa Individuelle', desc: 'RDC ou R+1 particulier' },
                    { id: 'route', label: 'Route / Voirie / Parking', desc: 'Plate-forme logistique ou chaussée' },
                    { id: 'hangar', label: 'Hangar / Usine', desc: 'Structure métallique ou industrielle' },
                    { id: 'pont', label: 'Ouvrage d’Art / Pont', desc: 'Génie civil lourd, passerelle' },
                    { id: 'mine', label: 'Projet Minier / Forage', desc: 'Reconnaissance géologique continue' }
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setProjectType(item.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        projectType === item.id
                          ? 'border-amber-500 bg-amber-50/50 text-slate-950 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <p className="text-xs font-bold">{item.label}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {projectType === 'immeuble' && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <label className="text-xs font-bold text-slate-800 block">
                      Nombre de niveaux prévus :
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['r+1', 'r+2', 'r+4', 'r+6', 'r+8', 'r+10+'].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setLevels(lvl)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg uppercase border transition-colors ${
                            levels === lvl
                              ? 'bg-slate-900 text-amber-400 border-slate-900'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="basement"
                        checked={hasBasement}
                        onChange={(e) => setHasBasement(e.target.checked)}
                        className="w-4 h-4 text-amber-600 rounded border-slate-300"
                      />
                      <label htmlFor="basement" className="text-xs font-semibold text-slate-800 cursor-pointer">
                        Projet avec sous-sol (sous-sol(s) ou parking souterrain)
                      </label>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl transition-colors"
                  >
                    Étape suivante : Localisation →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Location and Soil */}
            {step === 2 && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-950 uppercase tracking-wider">
                  2. Localisation géographique & Contexte du site
                </h4>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Localisation du terrain :
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full text-xs font-medium p-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="dakar">Dakar Ville (Almadies, Mermoz, Plateau, Yoff, Ouakam)</option>
                    <option value="diamniadio">Diamniadio / Pôles Urbains (Zone à risque argiles gonflantes)</option>
                    <option value="rufisque">Rufisque / Bargny (Zone côtière / carrières)</option>
                    <option value="petite_cote">Petite Côte (Mbour, Saly, Nianing, Somone)</option>
                    <option value="thies">Thiès / Diass (Zone AIBD)</option>
                    <option value="saint_louis">Saint-Louis / Vallée du Fleuve (Sols alluvionnaires)</option>
                    <option value="casamance">Casamance (Ziguinchor, Cap Skirring - Sols mous)</option>
                    <option value="interieur">Intérieur Sénégal (Kaolack, Touba, Tambacounda, Kédougou)</option>
                    <option value="sous_region">Sous-Région UEMOA (Mali, Guinée, Gambie, Côte d'Ivoire)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Emprise au sol approximative (m²) :
                    </label>
                    <input
                      type="number"
                      value={surface}
                      onChange={(e) => setSurface(e.target.value)}
                      placeholder="Ex: 500"
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Mission souhaitée :
                    </label>
                    <select
                      value={missionType}
                      onChange={(e) => setMissionType(e.target.value)}
                      className="w-full text-xs font-medium p-3 rounded-xl border border-slate-300 bg-white text-slate-900"
                    >
                      <option value="g2_avp">G2 AVP (Conception Avant-Projet - Recommandé)</option>
                      <option value="g2_pro">G2 PRO / DCE (Projet détaillé pour consultation)</option>
                      <option value="g1">G1 (Étude préalable / Achat terrain)</option>
                      <option value="g3_g4">G3 / G4 (Contrôle et supervision chantier)</option>
                      <option value="labo_seul">Essais de laboratoire seuls (Béton / Sols)</option>
                    </select>
                  </div>
                </div>

                {location === 'diamniadio' && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zone Diamniadio :</strong> Les sols marneux de cette zone présentent un fort potentiel de retrait-gonflement. Notre programme inclura systématiquement des essais œdométriques de gonflement pour prémunir votre bâtiment des fissures.
                    </span>
                  </div>
                )}

                <div className="flex justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    ← Retour
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl transition-colors"
                  >
                    Générer le programme technique →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Generated Technical Investigation & Quote Form */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Generated Technical Program Box */}
                <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                        Programme Géotechnique Recommandé par Senelabo
                      </span>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                      Norme NF P 94-500
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                      <span className="text-slate-400 block text-[10px]">Points de sondage :</span>
                      <span className="font-bold text-amber-400 text-sm">{rec.boreholesCount} forages</span>
                    </div>
                    <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
                      <span className="text-slate-400 block text-[10px]">Profondeur cible :</span>
                      <span className="font-bold text-white text-sm">{rec.boreholeDepth}</span>
                    </div>
                    <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700 sm:col-span-2">
                      <span className="text-slate-400 block text-[10px]">Délai estimé du rapport :</span>
                      <span className="font-bold text-emerald-400 text-sm">{rec.estimatedDuration}</span>
                    </div>
                  </div>

                  <div className="text-xs space-y-1.5 pt-1">
                    <p className="text-slate-300 font-semibold">Méthodologie in-situ :</p>
                    <p className="text-amber-200 text-[11px] bg-slate-800/50 p-2 rounded border border-slate-700/50">
                      {rec.inSituTest}
                    </p>
                  </div>

                  <div className="text-xs space-y-1.5">
                    <p className="text-slate-300 font-semibold">Essais laboratoire associés :</p>
                    <div className="flex flex-wrap gap-1.5">
                      {rec.labTests.map((t, idx) => (
                        <span key={`rec-lab-test-${t}-${idx}`} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                          ✓ {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Estimation financière indicative */}
                  <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Budget Estimatif de la Mission (HT) :
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg sm:text-xl font-black text-amber-400 font-mono">
                          {formatFcfa(financials.ht)}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          ({formatFcfa(financials.ttc)} TTC)
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowOfficialPdf(true)}
                      className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Prévisualiser Devis PDF</span>
                    </button>
                  </div>
                </div>

                {/* Direct Contact Form */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">
                    Vos Coordonnées pour l’envoi de l’Offre Financière & du Devis Formel
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Nom complet * :
                      </label>
                      <input
                        type="text"
                        required
                        value={contactData.name}
                        onChange={(e) => setContactData({...contactData, name: e.target.value})}
                        placeholder="Ex: Babacar Diop"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Société / Bureau d’études :
                      </label>
                      <input
                        type="text"
                        value={contactData.company}
                        onChange={(e) => setContactData({...contactData, company: e.target.value})}
                        placeholder="Ex: Société BTP Dakar"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Téléphone direct * :
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactData.phone}
                        onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                        placeholder="Ex: +221 77 123 45 67"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Adresse Email * :
                      </label>
                      <input
                        type="email"
                        required
                        value={contactData.email}
                        onChange={(e) => setContactData({...contactData, email: e.target.value})}
                        placeholder="Ex: b.diop@entreprise.sn"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Remarques particulières ou description du terrain :
                    </label>
                    <textarea
                      rows={2}
                      value={contactData.notes}
                      onChange={(e) => setContactData({...contactData, notes: e.target.value})}
                      placeholder="Ex: Terrain plat, présence de nappe présumée, besoin urgent pour dépôt permis de construire..."
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    ← Modifier paramètres
                  </button>

                  <button
                    type="submit"
                    id="submit-quote-btn"
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md hover:shadow transition-all flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmettre ma demande à l’équipe Senelabo</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        ) : (
          /* Submission Confirmation & Printable Summary */
          <div className="p-6 sm:p-8 text-center space-y-6 overflow-y-auto flex-1 overscroll-contain">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h4 className="text-xl font-bold text-slate-950">
                Demande d'Étude & Devis Enregistrée avec Succès !
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Merci {contactData.name}. Votre dossier a été transmis à la direction technique de Senelabo BTP Dakar. Un ingénieur géotechnicien prendra contact sous 24h avec votre offre chiffrée détaillée.
              </p>
            </div>

            {/* Recap Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-lg mx-auto text-xs space-y-2">
              <p className="font-bold text-slate-900 border-b border-slate-200 pb-1.5">
                Récapitulatif de votre simulation :
              </p>
              <p><span className="text-slate-500">Projet :</span> <strong className="text-slate-800 uppercase">{projectType} ({levels})</strong></p>
              <p><span className="text-slate-500">Localisation :</span> <strong className="text-slate-800 uppercase">{location}</strong></p>
              <p><span className="text-slate-500">Programme préconisé :</span> <strong className="text-amber-700">{rec.boreholesCount} forages ({rec.boreholeDepth})</strong></p>
              <p><span className="text-slate-500">Estimation HT :</span> <strong className="text-slate-900 font-mono">{formatFcfa(financials.ht)}</strong></p>
              <p><span className="text-slate-500">Contact :</span> <strong className="text-slate-800">{contactData.phone || 'Non renseigné'} ({contactData.email || 'Non renseigné'})</strong></p>
            </div>

            {/* PDF Download Feedback notification */}
            {downloadFeedback && (
              <div className="p-3 bg-amber-50 border border-amber-300 text-amber-950 rounded-xl text-xs flex items-center justify-center gap-2 max-w-lg mx-auto">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{downloadFeedback}</span>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadQuotePdf}
                disabled={isGeneratingPdf}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isGeneratingPdf ? 'Téléchargement...' : 'Télécharger le Devis Officiel (PDF)'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowOfficialPdf(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Consulter / Imprimer</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setStep(1);
                  onClose();
                }}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* MODAL / DOCUMENT OFFICIEL DEVIS PDF IMPRIMABLE */}
      <AnimatePresence>
        {showOfficialPdf && (
          <motion.div 
            key="official-quote-pdf-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-xs overflow-y-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[94vh] flex flex-col overflow-hidden text-slate-900 border border-slate-300">
            {/* Action Bar (Top) */}
            <div className="bg-slate-950 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span className="text-xs sm:text-sm font-bold">Document Officiel de Devis — Senelabo BTP</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadQuotePdf}
                  disabled={isGeneratingPdf}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isGeneratingPdf ? 'Génération...' : 'Télécharger PDF'}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimer</span>
                </button>
                <button
                  onClick={() => setShowOfficialPdf(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Paper Area */}
            <div id="printable-quote-area" className="p-6 sm:p-10 overflow-y-auto space-y-6 text-xs bg-white">
              {/* Header Letterhead */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b-2 border-slate-900 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-slate-950 tracking-tight font-display">
                      SENELABO<span className="text-amber-500 ml-0.5">BTP</span> S.A.
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-semibold">
                    Laboratoire de Géotechnique, Essais des Sols & Auscultation des Chaussées
                  </p>
                  <p className="text-[10px] text-slate-500">
                    SOTRAC Mermoz, Rue MZ 48, Dakar • BP 15420 Dakar-Fann<br />
                    Tél : +221 33 860 78 00 / +221 77 569 42 10 • contact@senelabo.sn<br />
                    NINEA : 005423891 2V3 • Registre de Commerce Dakar
                  </p>
                </div>

                <div className="sm:text-right bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-xs font-black text-slate-950 uppercase block">
                    DEVIS ESTIMATIF
                  </span>
                  <span className="font-mono text-amber-700 font-bold text-xs block">
                    N° {quoteNumber}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Date : {new Date().toLocaleDateString('fr-FR')}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold block">
                    Validité : 90 jours
                  </span>
                </div>
              </div>

              {/* Client & Project Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Donneur d'Ordre / Client :
                  </span>
                  <p className="font-bold text-slate-900 text-sm">{contactData.name || 'Client Particulier / Promoteur'}</p>
                  {contactData.company && <p className="text-slate-700 font-medium">{contactData.company}</p>}
                  <p className="text-slate-600">Tél : {contactData.phone || 'Non renseigné'}</p>
                  <p className="text-slate-600">Email : {contactData.email || 'Non renseigné'}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Objet & Site du Projet :
                  </span>
                  <p className="font-bold text-slate-900">
                    Étude de Sol Géotechnique ({missionType.toUpperCase()})
                  </p>
                  <p className="text-slate-700">Type : {projectType.toUpperCase()} ({levels.toUpperCase()}{hasBasement ? ' + Sous-sol' : ''})</p>
                  <p className="text-slate-600">Localisation : {location.toUpperCase()}</p>
                  <p className="text-slate-600">Superficie : {surface} m²</p>
                </div>
              </div>

              {/* Technical Services Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white text-[11px] uppercase">
                      <th className="py-2.5 px-3">Réf</th>
                      <th className="py-2.5 px-3">Désignation des Prestations Géotechniques (NF P 94-500)</th>
                      <th className="py-2.5 px-3 text-center">Qté</th>
                      <th className="py-2.5 px-3 text-right">Montant HT (FCFA)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-[11px]">
                    <tr>
                      <td className="py-2.5 px-3 font-mono text-slate-500">01</td>
                      <td className="py-2.5 px-3">
                        <strong>Amenée, repliement et installation de la sondeuse chenillée</strong>
                        <p className="text-[10px] text-slate-500">Transfert matériel, équipe de sondage et mise en station sur le site</p>
                      </td>
                      <td className="py-2.5 px-3 text-center">1 Forfait</td>
                      <td className="py-2.5 px-3 text-right font-mono">250 000</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-mono text-slate-500">02</td>
                      <td className="py-2.5 px-3">
                        <strong>{rec.inSituTest}</strong>
                        <p className="text-[10px] text-slate-500">{rec.boreholesCount} forages jusqu’à la profondeur de {rec.boreholeDepth}</p>
                      </td>
                      <td className="py-2.5 px-3 text-center">{rec.boreholesCount} U</td>
                      <td className="py-2.5 px-3 text-right font-mono">
                        {(financials.ht - 700000).toLocaleString('fr-FR')}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-mono text-slate-500">03</td>
                      <td className="py-2.5 px-3">
                        <strong>Campagne d'essais de laboratoire agréé Senelabo</strong>
                        <p className="text-[10px] text-slate-500">{rec.labTests.join(' • ')}</p>
                      </td>
                      <td className="py-2.5 px-3 text-center">1 Forfait</td>
                      <td className="py-2.5 px-3 text-right font-mono">250 000</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-mono text-slate-500">04</td>
                      <td className="py-2.5 px-3">
                        <strong>Rapport d'Ingénierie Géotechnique de Synthèse & Dimensionnement</strong>
                        <p className="text-[10px] text-slate-500">Type de fondations (semelles/pieux), contrainte admissible σ (bars / kPa), tassements, niveau de nappe</p>
                      </td>
                      <td className="py-2.5 px-3 text-center">1 Forfait</td>
                      <td className="py-2.5 px-3 text-right font-mono">200 000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Financial Totals */}
              <div className="flex justify-end">
                <div className="w-72 space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600">Total Hors Taxes (HT) :</span>
                    <strong className="font-mono text-slate-900">{formatFcfa(financials.ht)}</strong>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600">TVA Sénégalaise (18%) :</span>
                    <span className="font-mono text-slate-700">{formatFcfa(financials.tva)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black border-t border-slate-300 pt-2 text-slate-950">
                    <span>Total TTC (XOF) :</span>
                    <span className="text-amber-700 font-mono">{formatFcfa(financials.ttc)}</span>
                  </div>
                </div>
              </div>

              {/* Conditions & Signatures */}
              <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-6 text-[10px] text-slate-500">
                <div>
                  <p className="font-bold text-slate-800 mb-1">Conditions de règlement & délais :</p>
                  <p>• Acompte de 50% à la commande avant démarrage des sondages in-situ.</p>
                  <p>• Solde à la livraison du rapport définitif signé (délai : {rec.estimatedDuration}).</p>
                  <p>• Prestations réalisées en stricte conformité aux normes NF P 94-500 et Eurocode 7.</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <p className="font-bold text-slate-800">Direction Technique & Laboratoire</p>
                  <p className="text-[9px] text-slate-400 mt-1">Ingénieur Géotechnicien Principal</p>
                  <div className="mt-3 inline-block border border-amber-600/40 px-3 py-1 rounded text-amber-800 font-mono font-bold text-[9px] uppercase tracking-wider">
                    Visa & Cachet Senelabo BTP
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-slate-500">
                Document généré pour consultation officielle.
              </span>
              <button
                type="button"
                onClick={() => setShowOfficialPdf(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Fermer l'Aperçu
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};
