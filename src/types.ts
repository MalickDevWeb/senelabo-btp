export type ServiceCategory = 
  | 'geotechnique'
  | 'laboratoire_sols'
  | 'chaussees_auscultation'
  | 'controle_betons'
  | 'mines_forages'
  | 'hydraulique_vrd';

export interface ServiceDetail {
  id: ServiceCategory;
  title: string;
  shortTitle: string;
  tagline: string;
  icon: string;
  description: string;
  norms: string[];
  features: string[];
  keyTests: {
    name: string;
    norm: string;
    description: string;
  }[];
  deliverables: string[];
  image: string;
}

export type ProjectCategory = 'all' | 'infrastructures' | 'batiments' | 'ouvrages_art' | 'mines_energie';

export interface ProjectReference {
  id: string;
  title: string;
  client: string;
  location: string;
  country: string;
  year: string;
  category: ProjectCategory;
  missionType: string;
  description: string;
  metrics: string[];
  image: string;
  tag: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  type: string;
  capacity: string;
  specs: string[];
  description: string;
  image: string;
  badge: string;
}

export interface MissionNorm {
  code: string;
  name: string;
  shortLabel?: string;
  phase: string;
  description: string;
  objectives: string[];
  recommendedFor: string;
  riskAvoidance: string;
}

export interface QuoteRequestData {
  projectType: string;
  missionType: string;
  location: string;
  soilCondition: string;
  buildingHeight: string;
  surfaceArea: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  comments: string;
}

export interface LeaderQuote {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  context?: string;
  imagePosition?: string; // CSS object-position for centering the subject's face
  department?: string;
}

export interface InfographicItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
}

export interface YearlyReference {
  year: string;
  title: string;
  client: string;
  description: string;
  details?: string;
}

export interface LabSampleReport {
  id: string;
  sampleCode: string;
  projectName: string;
  clientName?: string;
  client?: string;
  dateReceived: string;
  dateCompleted: string;
  testType: string;
  norm: string;
  status: 'Conforme' | 'Non Conforme' | 'En cours d\'analyse';
  keyValues: {
    label: string;
    value: string;
    target: string;
    unit: string;
  }[];
  conclusion: string;
}
