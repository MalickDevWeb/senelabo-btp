import { jsPDF } from 'jspdf';
import { LabSampleReport } from '../types';

export interface QuotePdfPayload {
  quoteNumber: string;
  projectType: string;
  location: string;
  missionType: string;
  soilCondition: string;
  surfaceArea: string;
  buildingHeight: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  comments?: string;
  priceEstimate: string;
  deliveryTime: string;
  labTests: string[];
}

export interface ConcreteCalcPdfPayload {
  concreteClass: string;
  targetFck: number;
  ageDays: number;
  ageRatio: number;
  fcjMeasured: number;
  complianceRatio: number;
  isCompliant: boolean;
  specimenShape: string;
  batchNumber?: string;
  notes?: string;
}

/**
 * Helper to add header branding for Senelabo BTP documents
 */
function addDocumentHeader(doc: jsPDF, title: string, subtitle: string, refNumber: string) {
  // Top bar navy
  doc.setFillColor(15, 23, 42); // #0f172a
  doc.rect(0, 0, 210, 24, 'F');

  // Amber accent line
  doc.setFillColor(245, 158, 11); // #f59e0b
  doc.rect(0, 24, 210, 2.5, 'F');

  // Header texts
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('SENELABO BTP', 15, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(245, 158, 11);
  doc.text('FILIALE DU GROUPE GÉOTEC AFRIQUE • DAKAR, SÉNÉGAL', 15, 18);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(`RÉF : ${refNumber}`, 195, 12, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  const today = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  doc.text(`Date : ${today}`, 195, 18, { align: 'right' });

  // Main document title banner
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(15, 31, 180, 16, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(title.toUpperCase(), 20, 39);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(subtitle, 20, 44);
}

/**
 * Helper to add official footer
 */
function addDocumentFooter(doc: jsPDF, pageNumber = 1, totalPages = 1) {
  const y = 282;
  doc.setDrawColor(226, 232, 240);
  doc.line(15, y, 195, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'SENELABO BTP SARL • Route de la Pyrotechnie, Mermoz Dakar • Tél : +221 33 860 60 70 • Email : contact@senelabo.sn',
    105,
    y + 5,
    { align: 'center' }
  );
  doc.text(
    'Laboratoire agréé BTP • Essais géotechniques & contrôle de conformité des matériaux • Groupe Géotec',
    105,
    y + 9,
    { align: 'center' }
  );

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(148, 163, 184);
  doc.text(`Page ${pageNumber} / ${totalPages}`, 195, y + 9, { align: 'right' });
}

/**
 * 1. Download Laboratory Test Report PDF
 */
export function downloadLabReportPdf(report: LabSampleReport): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  addDocumentHeader(
    doc,
    "Procès-Verbal Officiel d'Essais en Laboratoire",
    `Contrôle de conformité selon la norme ${report.norm}`,
    report.sampleCode
  );

  let currentY = 53;

  // Box 1: Identification & Project Details
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(15, currentY, 180, 42, 2, 2, 'FD');

  doc.setFillColor(241, 245, 249);
  doc.rect(15, currentY, 180, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('1. IDENTIFICATION DU PROJET & ÉCHANTILLONNAGE', 19, currentY + 5);

  currentY += 12;
  doc.setFontSize(8.5);

  // Left column
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Projet :', 19, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(report.projectName, 42, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Client / MO :', 19, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(report.client || report.clientName || 'Donneur d’ordre BTP Dakar', 42, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Type d’essai :', 19, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(report.testType, 42, currentY);

  // Right column
  const rightX = 115;
  let rightY = currentY - 12;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Date réception :', rightX, rightY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(report.dateReceived, rightX + 28, rightY);

  rightY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Date fin essai :', rightX, rightY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(report.dateCompleted, rightX + 28, rightY);

  rightY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Norme d’essai :', rightX, rightY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 83, 9);
  doc.text(report.norm, rightX + 28, rightY);

  currentY += 16;

  // Box 2: Measured Parameters Table
  doc.setFillColor(241, 245, 249);
  doc.rect(15, currentY, 180, 7, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.rect(15, currentY, 180, 7, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('2. RÉSULTATS D’ESSAIS MESURÉS EN LABORATOIRE', 19, currentY + 5);

  currentY += 7;

  // Table header
  doc.setFillColor(15, 23, 42);
  doc.rect(15, currentY, 180, 7, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('PARAMÈTRE CONTRÔLÉ', 19, currentY + 4.8);
  doc.text('VALEUR MESURÉE', 90, currentY + 4.8);
  doc.text('SEUIL / RÉFÉRENCE', 135, currentY + 4.8);
  doc.text('STATUT', 175, currentY + 4.8);

  currentY += 7;

  // Table rows
  report.keyValues.forEach((item, index) => {
    const isEven = index % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.rect(15, currentY, 180, 8, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(15, currentY, 180, 8, 'S');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(item.label, 19, currentY + 5.2);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`${item.value} ${item.unit || ''}`, 90, currentY + 5.2);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`${item.target} ${item.unit || ''}`, 135, currentY + 5.2);

    // Conforme badge
    doc.setFillColor(220, 252, 231);
    doc.setDrawColor(187, 247, 208);
    doc.roundedRect(173, currentY + 1.5, 18, 5, 1, 1, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(22, 101, 52);
    doc.text('CONFORME', 182, currentY + 4.8, { align: 'center' });

    currentY += 8;
  });

  currentY += 6;

  // Box 3: Technical Conclusion
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(15, currentY, 180, 28, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(20, 83, 45);
  doc.text('3. AVIS & CONCLUSION TECHNIQUE DE L’INGÉNIEUR GÉOTECHNIQUE', 19, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const conclusionLines = doc.splitTextToSize(report.conclusion, 172);
  doc.text(conclusionLines, 19, currentY + 12);

  currentY += 34;

  // Box 4: Official Stamps and Signatures
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(15, currentY, 180, 48, 2, 2, 'FD');

  // Left stamp
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('Opérateur Laboratoire Essais :', 20, currentY + 7);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('M. S. Ndiaye — Technicien Supérieur BTP', 20, currentY + 12);
  doc.text('Visa laboratoire certifié', 20, currentY + 16);

  // Digital stamp simulation
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.6);
  doc.roundedRect(20, currentY + 20, 45, 20, 1.5, 1.5, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(180, 83, 9);
  doc.text('SENELABO BTP', 42.5, currentY + 27, { align: 'center' });
  doc.setFontSize(6);
  doc.text('CONTRÔLE LABORATOIRE', 42.5, currentY + 31, { align: 'center' });
  doc.text('Dakar • Sénégal', 42.5, currentY + 35, { align: 'center' });

  // Right signature
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('Le Responsable Technique Géotechnique :', 110, currentY + 7);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Dr. Ing. A. Diallo — Chef de Division Sols & Ouvrages', 110, currentY + 12);
  doc.text('Rapport certifié conforme aux normes en vigueur', 110, currentY + 16);

  // Security seal
  doc.setDrawColor(15, 23, 42);
  doc.roundedRect(110, currentY + 20, 75, 20, 1.5, 1.5, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(15, 23, 42);
  doc.text('GROUPE GÉOTEC AFRIQUE • VALIDATION OFFICIELLE', 147.5, currentY + 27, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(100, 116, 139);
  doc.text(`Certificat n° SN-${report.sampleCode}-CERT`, 147.5, currentY + 32, { align: 'center' });
  doc.text('Document opposable selon code CIMA / Eurocodes', 147.5, currentY + 36, { align: 'center' });

  addDocumentFooter(doc, 1, 1);

  // Save / trigger download
  doc.save(`PV_Officiel_Senelabo_${report.sampleCode}.pdf`);
}

/**
 * 2. Download Official Proforma Quote PDF
 */
export function downloadQuotePdf(data: QuotePdfPayload): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  addDocumentHeader(
    doc,
    "Proposition Technique & Financière (Devis Proforma)",
    "Étude de sol géotechnique & programme d'investigations in-situ",
    data.quoteNumber
  );

  let currentY = 53;

  // Box 1: Client & Project Overview
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(15, currentY, 180, 40, 2, 2, 'FD');

  doc.setFillColor(241, 245, 249);
  doc.rect(15, currentY, 180, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('1. INFORMATIONS DU DEMANDEUR & DU SITE DU PROJET', 19, currentY + 5);

  currentY += 12;
  doc.setFontSize(8);

  // Left (Client)
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Demandeur :', 19, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(data.clientName || 'Client Particulier / Promoteur', 42, currentY);

  currentY += 5.5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Société :', 19, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(data.clientCompany || 'Non renseigné', 42, currentY);

  currentY += 5.5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Téléphone :', 19, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(data.clientPhone || 'Non renseigné', 42, currentY);

  currentY += 5.5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Email :', 19, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(data.clientEmail || 'contact@client.sn', 42, currentY);

  // Right (Project specs)
  const rightX = 110;
  let rightY = currentY - 16.5;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Ouvrage prévu :', rightX, rightY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.projectType} (${data.buildingHeight || 'RDC'})`, rightX + 28, rightY);

  rightY += 5.5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Localisation :', rightX, rightY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(data.location || 'Dakar et environs', rightX + 28, rightY);

  rightY += 5.5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Emprise sol :', rightX, rightY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.surfaceArea} m² — ${data.soilCondition}`, rightX + 28, rightY);

  rightY += 5.5;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Mission :', rightX, rightY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 83, 9);
  doc.text(data.missionType.toUpperCase(), rightX + 28, rightY);

  currentY += 12;

  // Box 2: Scope & Program of investigation
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(15, currentY, 180, 52, 2, 2, 'FD');

  doc.setFillColor(241, 245, 249);
  doc.rect(15, currentY, 180, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('2. PROGRAMME PRÉCONISÉ D’INVESTIGATIONS IN-SITU & LABORATOIRE', 19, currentY + 5);

  currentY += 12;

  const investigations = [
    { title: 'Sondages Pressiométriques Ménard', desc: 'Réalisation de forages avec essais pressiométriques tous les mètres (Norme NF P 94-110-1).' },
    { title: 'Essais de Pénétration Statique / Dynamique', desc: 'Mesure de résistance de pointe qd et détection de cavités ou lentilles compressibles.' },
    { title: 'Essais de Laboratoire Normalisés', desc: data.labTests.join(', ') || 'Analyse granulométrique, Limites d’Atterberg, Teneur en eau, Cisaillement.' },
    { title: 'Rapport d’Ingénierie Géotechnique Opposable', desc: 'Dimensionnement des fondations, calculs de portance q_adm, estimation des tassements et préconisations de dallage.' }
  ];

  investigations.forEach((inv) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(`• ${inv.title} :`, 19, currentY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const descLines = doc.splitTextToSize(inv.desc, 120);
    doc.text(descLines, 65, currentY);

    currentY += 8.5;
  });

  currentY += 4;

  // Box 3: Financial Quote & Turnaround
  doc.setFillColor(254, 252, 232); // Amber light
  doc.setDrawColor(251, 191, 36);
  doc.roundedRect(15, currentY, 180, 36, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(146, 64, 14);
  doc.text('3. ESTIMATION FINANCIÈRE & DÉLAIS DE MOBILISATION', 19, currentY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text('Montant estimatif de la mission géotechnique :', 19, currentY + 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text(data.priceEstimate, 19, currentY + 24);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('(Prix indicatif hors taxes en Francs CFA)', 19, currentY + 29);

  // Right details in financial box
  const finX = 115;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('Délai d’intervention :', finX, currentY + 15);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(data.deliveryTime, finX + 32, currentY + 15);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Validité de l’offre :', finX, currentY + 21);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('60 jours à compter de l’émission', finX + 32, currentY + 21);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Modalités :', finX, currentY + 27);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('50% à la commande, solde à la remise du rapport', finX + 32, currentY + 27);

  currentY += 42;

  // Box 4: Acceptance & Signature Block
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(15, currentY, 180, 42, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('Pour Senelabo BTP (Groupe Géotec) :', 20, currentY + 7);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Direction Commerciale & Géotechnique', 20, currentY + 12);
  doc.text('Dakar Mermoz • Tél : +221 33 860 60 70', 20, currentY + 16);

  // Senelabo seal
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.6);
  doc.roundedRect(20, currentY + 20, 50, 18, 1, 1, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(180, 83, 9);
  doc.text('SENELABO BTP', 45, currentY + 27, { align: 'center' });
  doc.setFontSize(6);
  doc.text('DEVIS VALIDÉ POUR ORDRE', 45, currentY + 31, { align: 'center' });

  // Client signature area
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('Bon pour Accord & Commande Client :', 110, currentY + 7);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Date, signature et cachet précédés de la mention manuscrite', 110, currentY + 12);
  doc.text('« Bon pour accord et exécution de la mission »', 110, currentY + 16);

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.roundedRect(110, currentY + 19, 75, 19, 1, 1, 'S');

  addDocumentFooter(doc, 1, 1);

  doc.save(`Devis_Officiel_Senelabo_BTP_${data.quoteNumber}.pdf`);
}

/**
 * 3. Download Concrete Crushing Test Follow-up PDF
 */
export function downloadConcreteFollowUpPdf(data: ConcreteCalcPdfPayload): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const refCode = data.batchNumber || `BETON-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`;

  addDocumentHeader(
    doc,
    "Fiche de Contrôle & Suivi d’Écrasement Béton",
    "Contrôle de résistance à la compression selon la norme NF EN 12390-3",
    refCode
  );

  let currentY = 53;

  // Box 1: Test & Specimen Parameters
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(15, currentY, 180, 42, 2, 2, 'FD');

  doc.setFillColor(241, 245, 249);
  doc.rect(15, currentY, 180, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('1. PARAMÈTRES DU BÉTON & CONDITIONS DE CURAGE', 19, currentY + 5);

  currentY += 13;
  doc.setFontSize(8);

  // Left
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Classe du béton :', 19, currentY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(data.concreteClass, 50, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Résistance cible fck,28 :', 19, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.targetFck} MPa (à 28 jours)`, 50, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Type d’éprouvette :', 19, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(data.specimenShape, 50, currentY);

  // Right
  const rightX = 115;
  let rightY = currentY - 12;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Âge à l’écrasement :', rightX, rightY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 83, 9);
  doc.text(`J+${data.ageDays} jours`, rightX + 32, rightY);

  rightY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Facteur théorique Eurocode 2 :', rightX, rightY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(`βcc = ${data.ageRatio.toFixed(3)}`, rightX + 46, rightY);

  rightY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Numéro de gâchée / Lot :', rightX, rightY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(data.batchNumber || 'Non spécifié', rightX + 36, rightY);

  currentY += 15;

  // Box 2: Measured Result vs Target
  const targetAtAge = data.targetFck * data.ageRatio;
  doc.setFillColor(data.isCompliant ? 240 : 254, data.isCompliant ? 253 : 242, data.isCompliant ? 244 : 242);
  doc.setDrawColor(data.isCompliant ? 187 : 252, data.isCompliant ? 247 : 165, data.isCompliant ? 208 : 165);
  doc.roundedRect(15, currentY, 180, 46, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(data.isCompliant ? 20 : 153, data.isCompliant ? 83 : 27, data.isCompliant ? 45 : 27);
  doc.text('2. RÉSULTAT DU CONTRÔLE D’ÉCRASEMENT & CONFORMITÉ', 19, currentY + 7);

  currentY += 15;

  // 3 metric columns
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('RÉSISTANCE MESURÉE :', 19, currentY);
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.fcjMeasured.toFixed(1)} MPa`, 19, currentY + 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('SEUIL THÉORIQUE ATTENDU :', 80, currentY);
  doc.setFontSize(16);
  doc.setTextColor(71, 85, 105);
  doc.text(`${targetAtAge.toFixed(1)} MPa`, 80, currentY + 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('VERDICT CONFORMITÉ :', 140, currentY);
  doc.setFontSize(14);
  if (data.isCompliant) {
    doc.setTextColor(22, 101, 52);
    doc.text('CONFORME ✓', 140, currentY + 8);
  } else {
    doc.setTextColor(185, 28, 28);
    doc.text('ATTENTION !', 140, currentY + 8);
  }

  currentY += 15;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const verdictText = data.isCompliant
    ? `La résistance mesurée de ${data.fcjMeasured.toFixed(1)} MPa atteint ${data.complianceRatio.toFixed(1)}% de l’objectif fixé à J+${data.ageDays}, validant le durcissement du béton selon les critères de l’Eurocode 2.`
    : `La résistance mesurée de ${data.fcjMeasured.toFixed(1)} MPa est inférieure au seuil attendu (${targetAtAge.toFixed(1)} MPa). Un contrôle complémentaire à J+28 est fortement recommandé.`;
  doc.text(doc.splitTextToSize(verdictText, 172), 19, currentY);

  currentY += 22;

  // Box 3: Notes & Standard reference
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(15, currentY, 180, 36, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('3. RAPPELS NORMATIFS & PROTOCOLE LABORATOIRE', 19, currentY + 6);

  currentY += 11;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  const notes = [
    '• Norme NF EN 12390-3 : Essai de compression sur éprouvettes durcies cubiques (15x15 cm) ou cylindriques (16x32 cm).',
    '• Norme NF EN 206/CN : Spécification, performance, production et conformité du béton.',
    '• Recommandation : Les éprouvettes doivent être conservées dans un bac d’eau à 20°C ± 2°C jusqu’à la minute de l’essai.',
    '• Opposabilité : Seuls les essais réalisés sur presse étalonnée périodiquement font foi auprès des bureaux de contrôle.'
  ];
  notes.forEach((note) => {
    doc.text(note, 19, currentY);
    currentY += 5;
  });

  currentY += 10;

  // Box 4: Signature & Visa
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(15, currentY, 180, 40, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('Visa de l’Agent de Laboratoire :', 20, currentY + 7);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Senelabo BTP — Laboratoire Matériaux & Bétons', 20, currentY + 12);
  doc.text('Presse d’écrasement asservie 3000 kN', 20, currentY + 16);

  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.6);
  doc.roundedRect(20, currentY + 19, 45, 16, 1, 1, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(180, 83, 9);
  doc.text('SENELABO BTP', 42.5, currentY + 25, { align: 'center' });
  doc.setFontSize(5.5);
  doc.text('SECTION BÉTONS CERTIFIÉE', 42.5, currentY + 29, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('Signature de l’Ingénieur Contrôle Qualité :', 110, currentY + 7);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Fiche technique certifiée conforme', 110, currentY + 12);
  doc.text('Groupe Géotec Afrique • Dakar', 110, currentY + 16);

  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(110, currentY + 19, 75, 16, 1, 1, 'S');

  addDocumentFooter(doc, 1, 1);

  doc.save(`Controle_Ecrasement_Beton_Senelabo_${refCode}.pdf`);
}
