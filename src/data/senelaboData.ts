import { 
  ServiceDetail, 
  ProjectReference, 
  EquipmentItem, 
  MissionNorm, 
  LabSampleReport,
  LeaderQuote,
  InfographicItem,
  YearlyReference 
} from '../types';

export const COMPANY_INFO = {
  name: 'SENELABO BTP S.A.',
  legalName: 'SOCIÉTÉ SÉNÉGALAISE DE LABORATOIRE DU BTP',
  logo: '/files/senelabo/img/senelab-btp-logo.png',
  tagline: "Bureau d'études sols, laboratoires d'essai, reconnaissance minière - Des résultats fiables",
  group: 'Bureau d’études & Laboratoire Géotechnique d’envergure sous-régionale',
  established: 2006,
  capital: '150 000 000 FCFA',
  directeurGeneral: 'Jean-Christophe ANDRÉ',
  directeurGeneralAdjoint: 'Raoul AHOUANDJINOU',
  coFounders: ['Jean-Christophe ANDRÉ', 'Raoul AHOUANDJINOU'],
  address: 'N°139 SOTRAC MERMOZ sur ancienne piste',
  bp: 'BP 13162 CP 14563 DAKAR YOFF',
  city: 'Dakar',
  country: 'Sénégal',
  phone: '+221 33 860 78 00',
  fax: '+221 33 860 78 01',
  email: 'contact@senelabo-btp.sn',
  emergencyPhone: '+221 77 638 90 12',
  hours: 'Lundi - Vendredi: 08h00 - 18h00 | Samedi: 08h00 - 13h00',
  stats: {
    yearsExperience: 18,
    kmRoadsInspected: 5000,
    completedProjects: 1250,
    drillingRigs: 5,
    labTechnicians: 52,
    isoConformity: 'NF P 94-500, ASTM, AASHTO'
  },
  pillars: {
    vocation: 'Apporter aux maîtres d’ouvrages du BTP toute l’expertise nécessaire au bon déroulement des travaux, en phase étude et pendant les phases de construction.',
    independance: 'Notre indépendance nous confère l’objectivité et l’impartialité dans l’exercice de nos fonctions.',
    ambition: 'Développer les nouvelles technologies appliquées aux activités de la géotechnique et du BTP.'
  }
};

export const SENELABO_LEADERS: LeaderQuote[] = [
  {
    id: 'andre',
    name: 'Jean-Christophe ANDRÉ',
    role: 'Administrateur Général',
    quote: 'Celles et ceux qui connaissent bien le terrain savent que les aléas sont nombreux en mission... Notre plus grand défi est d’avancer sans cesse vers l’amélioration de nos services pour vous garantir une expertise irréprochable.',
    image: '/files/senelabo/imgfullscreen/DSC05360-1800.JPG',
    imagePosition: '75% 20%',
    context: 'Direction générale & Stratégie sous-régionale'
  },
  {
    id: 'ahouandjinou',
    name: 'Raoul AHOUANDJINOU',
    role: 'Administrateur Général Adjoint',
    quote: 'Notre secret, c’est l’équilibre entre les compétences, le matériel, l’expérience et la téranga* (*hospitalité en wolof). Nous pouvons vous accompagner, même sur les projets les plus ambitieux.',
    image: '/files/senelabo/imgfullscreen/DSC05231-1800.jpg',
    imagePosition: '74% 20%',
    context: 'Pilotage opérationnel & Relations institutionnelles'
  },
  {
    id: 'samb',
    name: 'Sam SAMB',
    role: 'Ingénieur Principal',
    quote: 'Nos ingénieurs sont moins célèbres... mais plus fiables ! Notre connaissance des spécificités locales est un atout essentiel pour vous garantir des études géotechniques fiables.',
    image: '/files/senelabo/imgfullscreen/samb1-conseildami-geotechnique-1800.jpg',
    imagePosition: '62% 20%',
    context: 'Études de fondations & Dimensionnement'
  },
  {
    id: 'ndoye',
    name: 'Aïssatou N’DOYE',
    role: 'Ingénieur Génie Civil',
    quote: 'La mission que nous avons menée à l’Aéroport International Blaise Diagne (AIBD) à Diass pour la détection et le traitement de cavités est sans précédent en Afrique de l’Ouest.',
    image: '/files/senelabo/imgfullscreen/DSC05126-1800.jpg',
    imagePosition: '78% 22%',
    context: 'Géophysique appliquée & Cavités souterraines'
  },
  {
    id: 'bangoura',
    name: 'Aboubacar BANGOURA',
    role: 'Chef de Laboratoire',
    quote: 'L’indépendance est une nécessité dans l’exercice d’une expertise impartiale. Nous mettons tout en œuvre pour rester objectif, c’est essentiel dans notre rôle d’interface entre le maître d’ouvrage et les professionnels du BTP.',
    image: '/files/senelabo/imgfullscreen/DSC04467-1800.jpg',
    imagePosition: '50% 20%',
    context: 'Essais de laboratoire & Contrôle qualité PAQ'
  },
  {
    id: 'faye',
    name: 'Momadou FAYE',
    role: 'Ingénieur Géologue',
    quote: 'Le sol n’a plus de secret pour nos équipes. Notre différence ? C’est l’expérience du sol capitalisée au fil de nos expertises de 1 à 80 m de profondeur.',
    image: '/files/senelabo/imgfullscreen/Faye-1800.jpg',
    imagePosition: '32% 20%',
    context: 'Reconnaissance minière & Sondages profonds'
  }
];

export const SENELABO_INFOGRAPHICS: InfographicItem[] = [
  {
    id: 'info-afnor',
    title: 'Maîtrise de la Norme NF P 94-500',
    subtitle: 'Missions géotechniques normalisées types G1, G2, G3/G4 et G5 de l’Union Syndicale Géotechnique',
    image: '/files/senelabo/imgfullscreen/infographie-afnor-1800.png',
    category: 'Normes & Méthodologie'
  },
  {
    id: 'info-afrique',
    title: '5 000 km de Routes Auscultées',
    subtitle: 'Leader sur le marché de l’expertise géotechnique et routière en Afrique de l’Ouest',
    image: '/files/senelabo/imgfullscreen/infographie-afrique-ouest-1800.png',
    category: 'Empreinte Régionale'
  },
  {
    id: 'info-metro',
    title: 'Métro Panafricain & Réseau Ouest-Africain',
    subtitle: 'Intervention sur les corridors stratégiques transnationaux et projets de transport',
    image: '/files/senelabo/imgfullscreen/senelab-btp-senegal-metro-panafricain-1800.png',
    category: 'Infrastructures'
  },
  {
    id: 'info-materiel',
    title: 'Évolution Continue du Parc Matériel',
    subtitle: 'Sondeuses polyvalentes, carottiers diamantés, déflectographe et presses étalonnées',
    image: '/files/senelabo/imgfullscreen/infographie-materiel-1800.png',
    category: 'Technologie & Équipements'
  },
  {
    id: 'info-geophysique',
    title: 'Domaines d’Application Géophysique',
    subtitle: 'Radar géologique GPR, tomographie électrique, recherche de cavités et réseaux',
    image: '/files/senelabo/imgfullscreen/infographie-domainsapplications-1800.png',
    category: 'Géophysique'
  },
  {
    id: 'info-paq',
    title: 'Plan d’Assurance Qualité (PAQ)',
    subtitle: 'Procédures rigoureuses, traçabilité des échantillons et formation continue des techniciens',
    image: '/files/senelabo/imgfullscreen/senelab-btp-senegal-assurance-qualite-1800.png',
    category: 'Assurance Qualité'
  },
  {
    id: 'info-points-forts',
    title: 'Nos Points Forts & Valeurs',
    subtitle: 'Vocation, indépendance et ambition pour bâtir l’avenir durablement',
    image: '/files/senelabo/imgfullscreen/senelab-btp-senegal-nos-points-forts-1800.png',
    category: 'Identité'
  },
  {
    id: 'info-pise',
    title: 'Des Ingénieurs Fiables',
    subtitle: 'Nos ingénieurs sont moins célèbres... mais plus fiables pour garantir la stabilité de vos ouvrages',
    image: '/files/senelabo/imgfullscreen/infographie-pise-1800.png',
    category: 'Expertise Sol'
  }
];

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'geotechnique',
    title: 'Études Géotechniques & Ingénierie des Fondations',
    shortTitle: 'Études Géotechniques (G1 à G5)',
    tagline: 'Sécurisation des fondations superficielles, semi-profondes et profondes',
    icon: 'Layers',
    image: '/files/senelabo/imgfullscreen/20140626_julien_ANDRE_cc_by_sa_23-1800.jpg',
    description: 'Conception géotechnique conforme à la norme NF P 94-500. Nous caractérisons le comportement mécanique et géologique des sols afin de dimensionner des fondations sûres et économiques pour tous types d’ouvrages (bâtiments R+X, ponts, pylônes, usines).',
    norms: ['NF P 94-500', 'Eurocode 7', 'ASTM D1586', 'NF P 94-110-1'],
    features: [
      'Sondages pressiométriques Ménard avec mesure du module EM et de la pression limite Pl',
      'Sondages carottés avec carottiers double et triple pour prélèvement d’échantillons intacts',
      'Essais au pénétromètre dynamique lourd (DPSH) et carottage continu destructif avec enregistrement des paramètres',
      'Essais au scissomètre de chantier pour sols cohérents mous',
      'Modélisation géotechnique des tassements et de la portance (Talren, Foxta, K-Réa)'
    ],
    keyTests: [
      { name: 'Essai Pressiométrique Ménard', norm: 'NF P 94-110-1', description: 'Mesure de déformabilité et contrainte de rupture in-situ jusqu’à 40m+ de profondeur' },
      { name: 'Sondage Carotté continu', norm: 'NF P 94-202', description: 'Extraction de carottes de sol et de roche avec calcul du RQD et prélèvement d’échantillons' },
      { name: 'Pénétromètre Dynamique Lourd (DPSH)', norm: 'NF P 94-115', description: 'Reconnaissance rapide de la compacité des couches de sol et détection des cavités' },
      { name: 'Diagraphie & Enregistrement des paramètres', norm: 'NF EN ISO 22476-15', description: 'Vitesse d’avancement, pression sur l’outil, pression d’injection d’eau et couple de rotation' }
    ],
    deliverables: [
      'Rapport d’Étude Géotechnique préalable (G1 ES / G1 PGC)',
      'Rapport d’Étude Géotechnique de Conception (G2 AVP / G2 PRO / G2 DCE)',
      'Coupes stratigraphiques 2D/3D et modèles de sol',
      'Calculs de capacité portante et de tassements admissibles'
    ]
  },
  {
    id: 'laboratoire_sols',
    title: 'Laboratoire de Mécanique des Sols & Roches',
    shortTitle: 'Laboratoire Sols & Roches',
    tagline: 'Essais d’identification, de compactage, de compressibilité et de cisaillement',
    icon: 'TestTubes',
    image: '/files/senelabo/imgfullscreen/20130919_julien_ANDRE_cc_by_sa_5-1800.jpg',
    description: 'Nos laboratoires fixes à Dakar et nos bases mobiles réalisent l’intégralité des essais physiques et mécaniques selon les référentiels internationaux pour qualifier les sols de fondation, les remblais et les emprunts.',
    norms: ['NF P 94-051', 'NF P 94-052', 'NF P 94-068', 'NF P 94-093', 'NF P 94-071-1'],
    features: [
      'Identification complète : granulométrie par tamisage et sédimentométrie, limites d’Atterberg, valeur de bleu de méthylène (VBS)',
      'Essais de compactage Proctor Normal et Modifié pour remblais et couches de forme',
      'Essais de portance CBR immédiat et après 4 jours d’immersion',
      'Essais œdométriques avec étude de consolidation, gonflement et pression de gonflement',
      'Essais de cisaillement direct à la boîte de Casagrande et essais triaxiaux (UU, CU+u, CD)'
    ],
    keyTests: [
      { name: 'Essai Proctor Modifié & CBR', norm: 'NF P 94-093 / NF P 94-078', description: 'Détermination de la densité maximale et de la portance sous charges de trafic' },
      { name: 'Essai de Cisaillement Direct (Casagrande)', norm: 'NF P 94-071-1', description: 'Détermination de l’angle de frottement interne φ et de la cohésion c des sols' },
      { name: 'Essai Œdométrique de compressibilité', norm: 'NF P 94-090-1', description: 'Calcul des tassements sous charges d’ouvrages et détection des argiles gonflantes' },
      { name: 'Valeur de Bleu de Méthylène (VBS)', norm: 'NF P 94-068', description: 'Activité de la fraction argileuse et potentiel de retrait-gonflement' }
    ],
    deliverables: [
      'Procès-verbaux d’essais normalisés avec courbes granulométriques',
      'Fiches de classification GTR (Guide des Terrassements Routiers)',
      'Courbes œdométriques et modules de déformation volumique',
      'Certificats d’aptitude des matériaux de remblai'
    ]
  },
  {
    id: 'chaussees_auscultation',
    title: 'Auscultation Routière & Ingénierie des Chaussées',
    shortTitle: 'Chaussées & Déflectographe',
    tagline: 'Mesure de déflexion informatisée à grand rendement et dimensionnement',
    icon: 'TrendingUp',
    image: '/files/senelabo/imgfullscreen/_DSC03727-1800.jpg',
    description: 'Doté d’un déflectographe informatisé haute cadence et d’équipements d’auscultation modernes, Senelabo BTP est le partenaire privilégié de l’AGEROUTE et des bailleurs pour le diagnostic, le contrôle et le renforcement des réseaux routiers (+5 000 km auscultés).',
    norms: ['NF P 98-200', 'Catalogue AGEROUTE', 'Méthode Alizé-LCPC', 'AASHTO Guide'],
    features: [
      'Auscultation continue de la déflexion sous essieu lourd standard de 13 tonnes',
      'Carottage d’enrobés bitumineux et mesure des épaisseurs de couches en place',
      'Mesures de rugosité (essai à la tache de sable) et d’uni longitudinal (APL)',
      'Relevé dégradations de surface et inventaire géoréférencé par GPS différentiel',
      'Dimensionnement et calcul de renforcement de chaussées souples et semi-rigides'
    ],
    keyTests: [
      { name: 'Mesure de Déflexion au Déflectographe', norm: 'NF P 98-200-1', description: 'Acquisition informatisée continue tous les 3,5 mètres à vitesse de 5 km/h' },
      { name: 'Carottage d’enrobés bitumineux', norm: 'NF EN 12697-27', description: 'Prélèvement de carottes pour contrôle de compactage, d’épaisseur et teneur en bitume' },
      { name: 'Essai à la Tache de Sable (HS)', norm: 'NF EN 13036-1', description: 'Mesure de la macrorugosité et de l’adhérence des couches de roulement' },
      { name: 'Poutre Benkelman & Déflectomètre', norm: 'NF P 98-200-2', description: 'Mesures ponctuelles de fléchissement élastique de la chaussée' }
    ],
    deliverables: [
      'Cartographie continue des bassins de déflexion et détection des zones homogènes',
      'Profils en long des déflexions caractéristiques d90 et d95',
      'Dossier technique de renforcement de chaussée (couches de base et d’usure)',
      'Rapports d’auscultation pour banques de données routières'
    ]
  },
  {
    id: 'controle_betons',
    title: 'Contrôle des Bétons, Aciers & Matériaux de Construction',
    shortTitle: 'Bétons & Matériaux',
    tagline: 'Assurance qualité des bétons hydrauliques, granulats et aciers d’armature',
    icon: 'ShieldCheck',
    image: '/files/senelabo/imgfullscreen/P1050218.JPG',
    description: 'Contrôle de convenance, de conformité et de réception des matériaux sur chantiers et en usine. Nos presses automatiques de 2000 kN et 3000 kN garantissent des mesures précises et fiables de la résistance mécanique.',
    norms: ['NF EN 12390-3', 'NF EN 206+A2/CN', 'NF A 35-080', 'NF EN 933'],
    features: [
      'Confection, prélèvement et conservation normalisée d’éprouvettes cylindriques et prismatiques en salle climatisée à 20°C ± 2°C et 95% d’hygrométrie',
      'Essais d’écrasement à la compression à 7, 14, 28 et 90 jours sur presses étalonnées',
      'Essais non destructifs in-situ : scléromètre de Schmidt, ultrasons pour auscultation d’ouvrages existants',
      'Essais de traction, pliage et adhérence sur aciers à béton (ronds lisses, barres HA)',
      'Analyse des granulats de carrières : Los Angeles (LA), Micro-Deval (MDE), équivalent de sable (ES)'
    ],
    keyTests: [
      { name: 'Compression sur Éprouvettes Béton', norm: 'NF EN 12390-3', description: 'Détermination de la résistance caractéristique fc28 sur éprouvettes 16x32 ou 11x22' },
      { name: 'Essai Sclérométrique in-situ', norm: 'NF EN 12504-2', description: 'Contrôle non destructif de l’homogénéité du béton durci sur piliers, voiles et dalles' },
      { name: 'Essai Los Angeles (LA)', norm: 'NF EN 1097-2', description: 'Mesure de la résistance à la fragmentation des gravillons et ballasts' },
      { name: 'Essai Micro-Deval (MDE)', norm: 'NF EN 1097-1', description: 'Mesure de la résistance à l’usure des granulats en présence d’eau' }
    ],
    deliverables: [
      'Procès-verbaux d’écrasement avec courbes de montée en résistance',
      'Formulations de bétons optimisées selon environnement d’exposition',
      'Rapports d’expertise de structures existantes et carottage de béton durci',
      'Certificats de conformité pour agrément de carrière'
    ]
  },
  {
    id: 'mines_forages',
    title: 'Reconnaissance Minière, Forages Profonds & Géophysique',
    shortTitle: 'Mines & Géophysique',
    tagline: 'Exploration géologique, forages jusqu’à 90m et tomographie électrique',
    icon: 'Compass',
    image: '/files/senelabo/imgfullscreen/20140626_julien_ANDRE_cc_by_sa_59-1800.jpg',
    description: 'Campagnes de forages carottés profonds et prospection géophysique pour les projets miniers (phosphates, minéraux lourds), carriers et les infrastructures stratégiques. Des milliers de mètres linéaires déjà forés sur tout le territoire sénégalais.',
    norms: ['ASTM D2113', 'NF EN ISO 22475-1', 'Normes Géophysiques SEG'],
    features: [
      'Campagnes de carottage minier continu wireline (diamètres PQ, HQ, NQ) de 1 à 80m+ de profondeur',
      'Orientation de carottes et relevés géostructuraux (fracturation, pendage, failles)',
      'Prospection géophysique de surface : radar géologique (GPR), sismique réfraction, tomographie électrique (ERT)',
      'Recherche de cavités souterraines (comme sur l’AIBD et l’Autoroute Diamniadio)',
      'Pose de piézomètres à tube crépiné et suivi des nappes aquifères'
    ],
    keyTests: [
      { name: 'Carottage Profond Wireline HQ/NQ', norm: 'ASTM D2113', description: 'Extraction continue de carottes de roche pour logs géologiques et analyses structurales' },
      { name: 'Radar Géologique (GPR) & Cavités', norm: 'Méthodes Géophysiques', description: 'Détection non destructive de vides souterrains, réseaux et hétérogénéités' },
      { name: 'Tomographie Électrique (ERT)', norm: 'Méthodes Géophysiques', description: 'Imagerie 2D de résistivité pour détecter failles, cavités et interfaces rocheuses' },
      { name: 'Sismique Réfraction', norm: 'ASTM D5777', description: 'Détermination des vitesses d’ondes sismiques Vp et Vs pour rippabilité des roches' }
    ],
    deliverables: [
      'Logs lithologiques et géotechniques détaillés avec calcul de RQD et RMR',
      'Profils géophysiques 2D interprétés et pseudo-sections de résistivité',
      'Cartes de rippabilité des terrains pour travaux de terrassement lourd',
      'Caisses à carottes inventoriées et archivage de carothèque'
    ]
  },
  {
    id: 'hydraulique_vrd',
    title: 'Hydraulique, Assainissement & Voiries Réseaux Divers (VRD)',
    shortTitle: 'Hydraulique & VRD',
    tagline: 'Essais de perméabilité, assèchement de canaux et contrôle de tranchées',
    icon: 'Droplet',
    image: '/files/senelabo/imgfullscreen/20140627_julien_ANDRE_cc_by_sa_6-1800.jpg',
    description: 'Accompagnement complet pour les réseaux de drainage, assèchement de canaux industriels (ex: Canal VI de Dakar), barrages (ex: Dodji à Linguère), bassins de rétention et voiries urbaines.',
    norms: ['NF P 94-130', 'Fascicule 70', 'Guide SETRA'],
    features: [
      'Essais de perméabilité Matsuo et Porchet pour dimensionnement des bassins d’infiltration',
      'Contrôle de compactage des tranchées de réseaux au pénétromètre dynamique',
      'Reconnaissance géotechnique pour ouvrages hydrauliques (digues, canaux, collecteurs, stations de pompage)',
      'Étude de battement de nappe phréatique et préconisation de rabattement de nappe'
    ],
    keyTests: [
      { name: 'Essai Porchet / Matsuo in-situ', norm: 'NF P 94-130', description: 'Calcul du coefficient de perméabilité K pour dispositifs d’infiltration et assainissement' },
      { name: 'Contrôle de Tranchées de Réseaux', norm: 'NF P 94-105', description: 'Vérification de la conformité du compactage selon l’objectif Q3/Q4 de la norme' },
      { name: 'Piézométrie & Niveau d’eau', norm: 'NF P 94-157-1', description: 'Mesure continue du niveau d’eau et évaluation du risque d’inondation des sous-sols' },
      { name: 'Essais d’Agressivité de l’Eau sur Béton', norm: 'NF EN 196-2', description: 'Analyse chimique de l’eau souterraine pour choix du ciment résistant aux sulfates' }
    ],
    deliverables: [
      'Notes de calcul d’infiltration et dimensionnement des ouvrages de rétention',
      'Rapports de contrôle de compactage de tranchées de canalisations',
      'Recommandations de protection des bétons contre les attaques chimiques'
    ]
  }
];

export const EQUIPMENT_DATA: EquipmentItem[] = [
  {
    id: 'deflectographe',
    name: 'Déflectographe Informatisé Lacroix',
    type: 'Auscultation Routière Haute Cadence',
    capacity: 'Jusqu’à 40 km / jour de mesure continue informatisée',
    badge: 'Équipement Emblématique',
    image: '/files/senelabo/imgfullscreen/_DSC03727-1800.jpg',
    specs: [
      'Châssis porteur lourd avec essieu arrière standardisé de 13 tonnes',
      'Poutres de mesure articulées avec palpeurs millimétriques haute fidélité',
      'Acquisition informatisée temps réel synchronisée par GPS différentiel',
      'Cadence continue de relevé à 5 km/h sans interruption de trafic majeur'
    ],
    description: 'Il vous permet d’obtenir des mesures informatisées en continu dans le but d’analyser et de choisir des solutions pertinentes pour la gestion et l’entretien de vos routes. Plus de 5 000 km auscultés pour l’AGEROUTE.'
  },
  {
    id: 'sondeuse_optima',
    name: 'Atelier de Sondage OPTIMA',
    type: 'Sondeuse Géotechnique Tout-Terrain sur Chenilles',
    capacity: 'Forage jusqu’à 80 m de profondeur',
    badge: 'Polyvalence & Puissance',
    image: '/files/senelabo/imgfullscreen/20140626_julien_ANDRE_cc_by_sa_23-1800.jpg',
    specs: [
      'Moteur diesel insonorisé et chenillard tout-terrain à faible pression au sol',
      'Tête de rotation à couple élevé pour carottage diamanté et tarière',
      'Équipée pour essais pressiométriques Ménard et pénétromètre SPT intégré',
      'Enregistreur numérique de paramètres de forage'
    ],
    description: 'Idéale pour les sols urbains encombrés de Dakar et les accès délicats, assurant des prélèvements intacts de haute qualité et des essais in-situ normalisés.'
  },
  {
    id: 'sondeuse_ec700',
    name: 'Atelier de Forage Lourd EC700',
    type: 'Sondeuse Lourde sur Porteur 4x4 / 6x6',
    capacity: 'Forage profond jusqu’à 150 m',
    badge: 'Grandes Profondeurs',
    image: '/files/senelabo/imgfullscreen/20140321_julien_ANDRE_cc_by_sa_18-1800.jpg',
    specs: [
      'Treuil wireline rapide pour carottage minier continu HQ / NQ',
      'Pompe à boue haute pression pour terrains instables et aquifères',
      'Mât renforcé pour manœuvre de trains de tiges lourds',
      'Autonomie totale sur chantiers isolés avec groupe électrogène intégré'
    ],
    description: 'Mobilisée pour les projets d’infrastructures majeures (AIBD, ponts de franchissement en Casamance, reconnaissance minière et prospection phosphates).'
  },
  {
    id: 'ateliers_rb350_silea',
    name: 'Ateliers de Forage RB 350 & SILEA',
    type: 'Sondeuses Géotechniques de Dernière Génération',
    capacity: 'Forage et sondages carottés polyvalents',
    badge: 'Flotte Renouvelée',
    image: '/files/senelabo/imgfullscreen/DSC05287.JPG',
    specs: [
      'Système hydraulique asservi de haute précision',
      'Carottiers battus et rotatifs haute vitesse',
      'Capteurs électroniques d’avancement et de couple',
      'Respect des normes environnementales et de sécurité au travail'
    ],
    description: 'Renforcement continu de la flotte de sondage pour répondre à la demande croissante des chantiers en Afrique de l’Ouest.'
  },
  {
    id: 'presses_beton_3000kn',
    name: 'Presses Électrohydrauliques 3000 kN & 2000 kN',
    type: 'Laboratoire Fixe d’Écrasement Béton',
    capacity: 'Charge maximale 3 000 kN avec asservissement numérique',
    badge: 'Laboratoire Accrédité',
    image: '/files/senelabo/imgfullscreen/P1050218.JPG',
    specs: [
      'Centrale de mesure numérique avec enregistrement automatique de la courbe force/temps',
      'Plateaux d’écrasement auto-alignés conformes NF EN 12390-4',
      'Salle de conservation normalisée à 20°C ± 2°C et humidité relative ≥ 95%',
      'Traçabilité par code-barres de chaque éprouvette réceptionnée'
    ],
    description: 'Garantit l’impartialité et l’exactitude absolue des mesures de résistance à la rupture des bétons de génie civil et de bâtiment.'
  },
  {
    id: 'bancs_oedométriques',
    name: 'Bancs Œdométriques & Cellules Triaxiales Automatisées',
    type: 'Mécanique des Sols Avancée',
    capacity: '12 postes de chargement continu',
    badge: 'Haute Précision',
    image: '/files/senelabo/imgfullscreen/24_julien_ANDRE_20120207_CC_BY_SA.JPG',
    specs: [
      'Capteurs de déplacement LVDT haute résolution',
      'Système de pressurisation pneumatique et hydraulique régulée',
      'Logiciel d’acquisition en temps réel des tassements',
      'Mesure de pression interstitielle dans les essais triaxiaux CU+u'
    ],
    description: 'Permet la prévision rigoureuse des tassements des fondations de tours (comme la Tour Millénium Plazza) et des remblais sur sols compressibles.'
  }
];

export const PROJECTS_DATA: ProjectReference[] = [
  {
    id: 'aibd',
    title: 'Aéroport International Blaise Diagne (AIBD)',
    client: 'Saudi Binladin Group / État du Sénégal',
    location: 'Diass / Ndiass, Région de Thiès',
    country: 'Sénégal',
    year: '2008 - 2014',
    category: 'infrastructures',
    missionType: 'Forages avec enregistrement de paramètres & Traitement de cavités',
    description: 'Campagne de forage avec enregistrement des paramètres (environ 100 000 ml) pour le traitement de cavités par injection dans le cadre des travaux de construction du nouvel aéroport. Reconnaissance géophysique de cavités sans précédent en Afrique de l’Ouest.',
    metrics: ['~100 000 ml de forage avec paramètres', 'Détection géophysique de cavités', 'Injection de traitement sous piste & aérogare'],
    image: '/files/senelabo/imgfullscreen/DSC05126-1800.jpg',
    tag: 'Aéroportuaire'
  },
  {
    id: 'reseau_ageroute',
    title: 'Réseau Routier Classé National (5 300 km)',
    client: 'AGEROUTE Sénégal',
    location: 'Territoire National (RN1, RN2, RN3, RN4, RN5, RN6...)',
    country: 'Sénégal',
    year: '2012 - Présent',
    category: 'infrastructures',
    missionType: 'Auscultation au Déflectographe Lacroix & Sondages de Labo',
    description: 'Campagne majeure de mesures de déflexions sur 5 300 km de réseau routier classé au Déflectographe Lacroix. Élaboration des grilles de décisions pour les travaux d’entretien et catalogue de dimensionnement des chaussées pour le Sénégal aux côtés d’Egis International et de l’IFSTTAR.',
    metrics: ['5 300 km auscultés', 'Catalogue de dimensionnement chaussées', 'Déflectographe informatisé continu'],
    image: '/files/senelabo/imgfullscreen/infographie-afrique-ouest-1800.png',
    tag: 'Routier'
  },
  {
    id: 'autoroute_peage',
    title: 'Autoroutes à Péage (Dakar-Diamniadio & Thiès-Touba)',
    client: 'Eiffage Sénégal / APIX / CRBC',
    location: 'Dakar - Diamniadio - AIBD - Mbour - Touba',
    country: 'Sénégal',
    year: '2007 - 2014',
    category: 'infrastructures',
    missionType: 'Études géotechniques de tracé, stabilité des déblais & géoradar',
    description: 'Études de stabilité des grands déblais sur la section Diamniadio - AIBD (Eiffage), détection de cavités par géoradar (GPR), études APD pour l’autoroute Thiès - Touba (CRBC) et étude des sols de fondation des ouvrages AIBD - Mbour (CWE).',
    metrics: ['Stabilité des grands déblais', 'Investigation par géoradar GPR', 'Études de tracé et gisements'],
    image: '/files/senelabo/imgfullscreen/20140627_julien_ANDRE_cc_by_sa_15-1800.jpg',
    tag: 'Autoroutier'
  },
  {
    id: 'tour_millenium',
    title: 'Tour Millénium Plazza (R+22)',
    client: 'ZAKHEM CONSTRUCTION',
    location: 'Avenue Malik Sy / Dakar',
    country: 'Sénégal',
    year: '2006 - 2008',
    category: 'batiments',
    missionType: 'Études géotechniques des sols de fondation (G2 PRO)',
    description: 'Études de sol complètes pour un complexe grande hauteur emblématique de la capitale dakaroise. Campagne de sondages carottés et pressiométriques profonds pour la détermination des tassements et du système de fondation sur pieux forés.',
    metrics: ['Tour R+22 avec sous-sols', 'Sondages pressiométriques profonds', 'Calcul de tassements admissibles'],
    image: '/files/senelabo/imgfullscreen/_P1060167-1800.jpg',
    tag: 'Grande Hauteur'
  },
  {
    id: 'ambassade_usa',
    title: 'Nouvelle Ambassade des États-Unis à Dakar',
    client: 'SCHNABEL Engineering / Ambassade des USA',
    location: 'Dakar Almadies',
    country: 'Sénégal',
    year: '2007 - 2010',
    category: 'batiments',
    missionType: 'Études géotechniques complémentaires & Systèmes de fondation',
    description: 'Études géotechniques dans le cadre du projet de construction du nouveau complexe diplomatique américain. Détermination des systèmes de fondation selon les normes américaines ASTM et françaises NF.',
    metrics: ['Normes ASTM & NF', 'Sondages de sol haute sécurité', 'Fondations spéciales & dallages'],
    image: '/files/senelabo/imgfullscreen/DSC05360-1800.JPG',
    tag: 'Institutionnel'
  },
  {
    id: 'projets_miniers',
    title: 'Campagnes de Prospection Minière (Phosphates & Minéraux)',
    client: 'Atlas Ressources / African Investment Group / West African Investment',
    location: 'Chérif Lô Ngakham, Kébémer, Kolda, Farim (Guinée-Bissau)',
    country: 'Sénégal & Guinée-Bissau',
    year: '2011 - 2014',
    category: 'mines_energie',
    missionType: 'Sondages carottés profonds de prospection minière (jusqu’à 90 m)',
    description: 'Campagnes intensives de recherche de phosphate et minéraux lourds : 17 sondages de 63,5 à 90m à Kolda, forages carottés à Chérif Lô Ngakham, Kébémer et Farim en Guinée Bissau. Des milliers de mètres linéaires forés avec succès.',
    metrics: ['Sondages profonds 63,5 à 90m', 'Recherche phosphates & minéraux lourds', 'Intervention transfrontalière'],
    image: '/files/senelabo/imgfullscreen/20140626_julien_ANDRE_cc_by_sa_59-1800.jpg',
    tag: 'Mines & Carrières'
  },
  {
    id: 'ponts_strategiques',
    title: 'Ponts Stratégiques (Émile Badiane, Baila, Diouloulou, Ziguinchor)',
    client: 'Eiffage Sénégal / SACI / GRID CONSULTAS',
    location: 'Ziguinchor, Katakalousse, Diakhane, Niambalang, Casamance',
    country: 'Sénégal',
    year: '2010 - 2013',
    category: 'ouvrages_art',
    missionType: 'Sondages, essais pressiométriques & mesures géophysiques',
    description: 'Études géotechniques complètes (sondages profonds et essais pressiométriques) et diagnostic des éléments de fondation par mesures géophysiques dans le cadre des travaux de réhabilitation du Pont Émile Badiane à Ziguinchor et des ponts de Casamance.',
    metrics: ['Diagnostic géophysique des piles', 'Sondages en site fluvio-maritime', 'Dossiers d’appel d’offres (DAO)'],
    image: '/files/senelabo/imgfullscreen/20140626_julien_ANDRE_cc_by_sa_56-1800.jpg',
    tag: 'Ouvrage d’Art'
  },
  {
    id: 'cimenterie_dangote',
    title: 'Nouvelle Cimenterie DANGOTE à Pout',
    client: 'DANGOTE Group / SASIF',
    location: 'Pout, Région de Thiès',
    country: 'Sénégal',
    year: '2008 - 2010',
    category: 'mines_energie',
    missionType: 'Reconnaissance géotechnique & Caractérisation gisement argiles',
    description: 'Réalisation d’essais géotechniques dans le cadre de la campagne de reconnaissance du projet de construction de la nouvelle cimenterie et campagne de sondages carottés (~600 ml) en vue de la caractérisation du gisement d’argiles à Tchicky.',
    metrics: ['600 ml de sondages carottés', 'Caractérisation gisement d’argiles', 'Fondations lourdes industrielles'],
    image: '/files/senelabo/imgfullscreen/DSC05287.JPG',
    tag: 'Industrie Lourde'
  }
];

export const YEARLY_REFERENCES: YearlyReference[] = [
  // 2014
  {
    year: '2014',
    title: 'Réhabilitation de la RN5 entre Passy et Sokone (Sénégal)',
    client: 'ACCIONA',
    description: 'Études géotechniques et recherche de matériaux pour l’actualisation des études techniques du projet de réhabilitation routière.'
  },
  {
    year: '2014',
    title: 'Centrale électrique de Boutoute (Sénégal)',
    client: 'GTI / WARTSILA',
    description: 'Études géotechniques pour la construction de la centrale électrique thermique.'
  },
  {
    year: '2014',
    title: 'Campagne de sondages de prospection minière phosphate (Chérif Lô Ngakham)',
    client: 'ATLAS RESSOURCES',
    description: 'Sondages carottés pour la recherche et l’évaluation des gisements de phosphates.'
  },
  {
    year: '2014',
    title: 'Autoroute à péage Thiès - Touba (Sénégal)',
    client: 'CRBC (China Road and Bridge Corporation)',
    description: 'Études géotechniques dans le cadre des études d’avant-projet détaillé (APD).'
  },
  {
    year: '2014',
    title: 'Nouveaux bureaux de l’IFC à Dakar (Sénégal)',
    client: 'THE WORLD BANK GROUP',
    description: 'Études géotechniques complètes pour la construction du siège régional de la Société Financière Internationale.'
  },
  // 2013
  {
    year: '2013',
    title: 'RN6 Ziguinchor - Tanaff - Vélingara (250 km)',
    client: 'ISOLUX CORSAN',
    description: 'Études géotechniques en phase projet d’exécution sur 250 km d’axe routier structurant en Casamance.'
  },
  {
    year: '2013',
    title: 'Stabilité des grands déblais Autoroute Diamniadio - AIBD',
    client: 'EIFFAGE SÉNÉGAL',
    description: 'Études géotechniques de stabilité de talus et confortement des grands déblais autoroutiers.'
  },
  {
    year: '2013',
    title: 'Prospection minière de phosphate dans le périmètre de Kébémer',
    client: 'AFRICAN INVESTMENT GROUP',
    description: 'Campagne de sondages carottés et destructifs pour la recherche de phosphate.'
  },
  {
    year: '2013',
    title: 'Détection de cavités par géoradar (GPR) sur Autoroute Diamniadio - AIBD',
    client: 'EIFFAGE SÉNÉGAL',
    description: 'Campagne d’investigation géophysique par radar géologique haute fréquence pour la cartographie des vides souterrains.'
  },
  {
    year: '2013',
    title: 'Prospection minière de phosphates dans la région de Kolda',
    client: 'WEST AFRICAN INVESTMENT',
    description: '17 forages profonds carottés de 63,5 à 90 m de profondeur.'
  },
  // 2012
  {
    year: '2012',
    title: 'Mesures de déflexions au Déflectographe Lacroix sur le réseau routier classé (5 300 km)',
    client: 'AGEROUTE',
    description: 'Auscultation continue de 5 300 km et élaboration des grilles de décision pour les travaux d’entretien routier.'
  },
  {
    year: '2012',
    title: 'Campagne de sondages et essais de laboratoire sur le réseau classé (5 300 km)',
    client: 'AGEROUTE',
    description: 'Carottages et essais complets pour la caractérisation des structures de chaussée existantes.'
  },
  {
    year: '2012',
    title: 'Élaboration du catalogue de dimensionnement des chaussées pour le Sénégal',
    client: 'AGEROUTE / EGIS INTERNATIONAL / IFSTTAR',
    description: 'Contribution technique et géotechnique majeure à la rédaction du référentiel national sénégalais.'
  },
  {
    year: '2012',
    title: 'Autoroute AIBD - Mbour (Sénégal)',
    client: 'CWE (China West Electrical & Road)',
    description: 'Études des sols de fondation des ouvrages d’art et viaducs du tronçon autoroutier.'
  },
  // 2011
  {
    year: '2011',
    title: 'Ponts de Katakalousse, Diakhane et Niambalang (Ziguinchor)',
    client: 'GRID CONSULTAS',
    description: 'Études géotechniques (phase APD) pour la réhabilitation des ponts et de leurs accès.'
  },
  {
    year: '2011',
    title: 'Prospection minière de phosphate dans la région de Farim (Guinée-Bissau)',
    client: 'GB MINERAIS SARL',
    description: 'Campagne de sondages géologiques transfrontaliers pour l’exploration minière.'
  },
  {
    year: '2011',
    title: 'Mine "Grande Côte Opération" à Diogo',
    client: 'GRANDE CÔTE OPÉRATION (GCO)',
    description: 'Études géotechniques pour les infrastructures d’extraction et de traitement des sables minéralisés.'
  },
  {
    year: '2011',
    title: 'Ponts de BAILA et DIOULOULOU en Casamance',
    client: 'SACI',
    description: 'Études géotechniques pour l’élaboration du dossier d’appel d’offres (DAO) pour la reconstruction des ponts.'
  },
  // 2010
  {
    year: '2010',
    title: 'Nouvel Aéroport International Blaise Diagne (AIBD) à Diass',
    client: 'SAUDI BINLADIN GROUP',
    description: 'Campagne de forages avec enregistrement de paramètres (~100 000 ml) pour le traitement des cavités par injection.'
  },
  {
    year: '2010',
    title: 'Terminal à Conteneurs WP04 sur le Port de Dakar',
    client: 'SHAFA',
    description: 'Contrôle technique qualité externe pour les travaux de construction portuaire.'
  },
  {
    year: '2010',
    title: 'Pont Émile Badiane à Ziguinchor',
    client: 'EIFFAGE SÉNÉGAL',
    description: 'Sondages, essais pressiométriques et diagnostic géophysique des fondations pour les travaux de réhabilitation.'
  },
  {
    year: '2010',
    title: 'Port Autonome de Dakar - Môle 5',
    client: 'SOGEC',
    description: 'Contrôle externe et assistance technique dans le cadre des travaux de réhabilitation d’un quai.'
  },
  // 2009
  {
    year: '2009',
    title: 'Décharge de Mbeubeuss',
    client: 'EDE',
    description: 'Études géotechniques de reconversion du site, suivi des biogaz, installation de piézomètres et caractérisation des sols de confinement.'
  },
  {
    year: '2009',
    title: 'Projet de nouvelle cimenterie DANGOTE (Pout)',
    client: 'DANGOTE GROUP',
    description: 'Campagne de sondages carottés (~600 ml) en vue de la caractérisation du gisement d’argiles à Tchicky.'
  },
  {
    year: '2009',
    title: 'Pylônes de télécommunications à Kaolack, Gorée, Thiès',
    client: 'HUAWEI',
    description: 'Études de sol pour la stabilité des fondations de pylônes télécoms.'
  },
  // 2008 & 2007 & 2006
  {
    year: '2008',
    title: 'Modernisation de la Ville de Touba',
    client: 'SOGEC',
    description: 'Contrôle externe et assistance technique pour les voiries et infrastructures.'
  },
  {
    year: '2007',
    title: 'Autoroute à péage Dakar-Diamniadio (Pikine - Diamniadio)',
    client: 'SCETAUROUTE / STUDI INTERNATIONAL / APIX',
    description: 'Études géotechniques (sol du tracé, ouvrages d’art, prospection des gisements et carrières).'
  },
  {
    year: '2007',
    title: '68 Écoles et Collèges au Sénégal',
    client: 'SATA AFRIQUE',
    description: 'Études géotechniques de sol pour le programme d’infrastructures scolaires.'
  },
  {
    year: '2006',
    title: 'Canal VI à Dakar - Assèchement et stations de pompage',
    client: 'CABINET MERLIN / SENAGROSOL',
    description: 'Études géotechniques pour l’assèchement du canal VI et collecteurs de reprise en zone industrielle.'
  },
  {
    year: '2006',
    title: 'Barrage de DODJI (Département de Linguère)',
    client: 'STUDI INTERNATIONAL',
    description: 'Études géotechniques dans le cadre de l’étude d’avant-projet sommaire (APS).'
  },
  {
    year: '2006',
    title: 'Programme Triennal Glissant 2006-2008 (2 000 km)',
    client: 'LABOSOL-APAVE SAHEL / AATR',
    description: 'Organisation et exécution d’une campagne de déflexions et sondages sur 2 000 km de réseau revêtu.'
  }
];

export const MISSIONS_NORMS_DATA: MissionNorm[] = [
  {
    code: 'G1',
    name: 'Étude Géotechnique Préalable',
    shortLabel: 'Préalable',
    phase: 'Phase Étude Préliminaire / Esquisse / Schéma directeur',
    description: 'Permet d’établir une première identification des risques géologiques majeurs d’un site et de fixer les principes généraux d’adaptation du projet au terrain.',
    objectives: [
      'G1 ES (Étude de Site) : Enquête documentaire, visite géologique de terrain, premiers sondages indicatifs',
      'G1 PGC (Principes Généraux de Construction) : Définition des hypothèses géotechniques préliminaires et réduction des aléas'
    ],
    recommendedFor: 'Achat de terrain, faisabilité économique, programmation immobilière',
    riskAvoidance: 'Évite l’acquisition d’un terrain inconstructible ou exposé à des cavités ou argiles gonflantes majeures.'
  },
  {
    code: 'G2',
    name: 'Étude Géotechnique de Conception',
    shortLabel: 'Conception',
    phase: 'Phase Avant-Projet (AVP) & Projet (PRO) / DCE',
    description: 'Mission fondamentale et obligatoire pour tout projet de construction. Elle dimensionne avec précision les fondations, les dallages et les ouvrages de soutènement.',
    objectives: [
      'G2 AVP : Campagne de sondages in-situ (pressiomètres, forages carottés, essais labo) et choix du type de fondation',
      'G2 PRO : Calculs définitifs de capacité portante, tassements prévisibles, dimensionnement des pieux/radier/semelles',
      'G2 DCE : Élaboration des prescriptions géotechniques pour le dossier de consultation des entreprises de terrassement'
    ],
    recommendedFor: 'Bâtiments R+X, villas, entrepôts, ouvrages d’art, routes et voiries',
    riskAvoidance: 'Évite les tassements différentiels, les fissures murales, les ruptures de dallage et les surcoûts imprévus.'
  },
  {
    code: 'G3',
    name: 'Étude & Suivi Géotechniques d’Exécution',
    shortLabel: 'Exécution',
    phase: 'Phase Réalisation des Travaux (à la charge de l’Entreprise)',
    description: 'Permet à l’entreprise de travaux de valider ses méthodes d’exécution, de dimensionner ses soutènements provisoires et d’adapter son matériel.',
    objectives: [
      'Étude des méthodes de terrassement, de blindage et d’épuisement des eaux',
      'Suivi en temps réel des paramètres de forage des pieux et contrôle des fonds de fouille',
      'Vérification de la portance réelle sous les semelles avant coulage'
    ],
    recommendedFor: 'Entreprises générales de BTP, fondateurs, terrassiers',
    riskAvoidance: 'Évite l’effondrement de parois de fouille, les arrêts de chantier et les non-conformités d’exécution.'
  },
  {
    code: 'G4',
    name: 'Supervision Géotechnique d’Exécution',
    shortLabel: 'Supervision',
    phase: 'Phase Chantier (au service du Maître d’Ouvrage / Maître d’Œuvre)',
    description: 'Mission d’audit et de contrôle externe permettant au client de s’assurer que l’entreprise respecte scrupuleusement les prescriptions géotechniques de la G2 et de la G3.',
    objectives: [
      'Supervision de l’étude géotechnique d’exécution G3',
      'Visites inopinées de contrôle de chantier et réception des fonds de fouille',
      'Validation des essais d’intégrité des pieux et des réceptions de plate-forme'
    ],
    recommendedFor: 'Maîtres d’ouvrage publics et privés, promoteurs exigeants, assureurs',
    riskAvoidance: 'Protège la responsabilité du maître d’ouvrage et garantit la décennale.'
  },
  {
    code: 'G5',
    name: 'Diagnostic Géotechnique',
    shortLabel: 'Diagnostic',
    phase: 'Phase Exploitation / Sinistre / Réhabilitation',
    description: 'Intervention ponctuelle pour analyser un désordre existant (fissures, affaissement, glissement de talus) ou adapter une structure existante à une nouvelle charge.',
    objectives: [
      'Expertise après désordre : recherche de la cause d’un tassement ou d’une fissuration',
      'Étude de surélévation d’un bâtiment existant (ex: ajout d’un étage R+4)',
      'Définition des travaux de confortement (reprise en sous-œuvre, micropieux, injection de résine)'
    ],
    recommendedFor: 'Bâtiments fissurés, litiges judiciaires, réhabilitations lourdes',
    riskAvoidance: 'Stoppe l’aggravation des pathologies du bâtiment et prévient l’effondrement.'
  }
];

export const SAMPLE_LAB_REPORTS: LabSampleReport[] = [
  {
    id: 'rep-001',
    sampleCode: 'SN-BET-2024-0892',
    projectName: 'Immeuble Résidentiel R+9 Mermoz',
    client: 'Entreprise Générale de Construction Dakaroise',
    dateReceived: '12/08/2024',
    dateCompleted: '09/09/2024',
    testType: 'Résistance à la compression du béton à 28 jours (NF EN 12390-3)',
    norm: 'NF EN 12390-3 / NF EN 206',
    status: 'Conforme',
    keyValues: [
      { label: 'Résistance cible C25/30', value: '32.4 MPa', target: '≥ 30.0 MPa', unit: 'MPa' },
      { label: 'Densité du béton durci', value: '2 390 kg/m³', target: '2350 - 2450', unit: 'kg/m³' },
      { label: 'Affaissement au cône d’Abrams (slump)', value: '175 mm (S4)', target: '160 - 210', unit: 'mm' }
    ],
    conclusion: 'Les résultats obtenus à 28 jours d’âge sur la série de 3 éprouvettes cylindriques 16x32 cm démontrent une résistance caractéristique conforme aux exigences de la classe de résistance C25/30.'
  },
  {
    id: 'rep-002',
    sampleCode: 'SN-SOL-2024-0418',
    projectName: 'Plate-forme Logistique Port Autonome de Dakar',
    client: 'Groupement BTP Maritime & Travaux Publics',
    dateReceived: '20/07/2024',
    dateCompleted: '28/07/2024',
    testType: 'Essai Proctor Modifié et Portance CBR 4 jours (NF P 94-093 / NF P 94-078)',
    norm: 'NF P 94-078',
    status: 'Conforme',
    keyValues: [
      { label: 'Densité sèche maximale (OPM)', value: '2.08 t/m³', target: '≥ 2.05', unit: 't/m³' },
      { label: 'Teneur en eau optimale (wOPM)', value: '7.8 %', target: '7.0 - 8.5', unit: '%' },
      { label: 'Indice CBR à 95% OPM immergé 4j', value: '38 %', target: '≥ 30.0', unit: '%' }
    ],
    conclusion: 'Le matériau sableux graveleux prélevé en carrière de Sébikotane présente une portance CBR supérieure au seuil contractuel requis pour une utilisation en couche de fondation de chaussée lourde.'
  },
  {
    id: 'rep-003',
    sampleCode: 'SN-GEO-2024-0155',
    projectName: 'Résidence Diplomatique Ngor Almadies',
    client: 'Cabinet d’Architecture & Urbanisme Dakar',
    dateReceived: '05/06/2024',
    dateCompleted: '19/06/2024',
    testType: 'Sondages Pressiométriques Ménard & Étude de Sol G2 AVP',
    norm: 'NF P 94-110-1 / NF P 94-500',
    status: 'Conforme',
    keyValues: [
      { label: 'Pression limite nette équivalente Ple*', value: '1.45 MPa', target: 'Couche d’ancrage à 4.2m', unit: 'MPa' },
      { label: 'Module pressiométrique moyen EM', value: '18.2 MPa', target: 'Sables compacts', unit: 'MPa' },
      { label: 'Taux de travail admissible qnet', value: '0.28 MPa (2.8 bars)', target: 'Semelles isolées', unit: 'MPa' }
    ],
    conclusion: 'Faisabilité géotechnique validée en fondations superficielles sur semelles isolées ancrées à une cote minimale de -2.00 m par rapport au terrain naturel nivelé.'
  }
];

export const PARTNERS_LOGOS = [
  { 
    name: 'Steurbaut', 
    role: 'Travaux de fondations spéciales & Forages',
    logo: '/files/senelabo/img/steurbaut-forage-senegal-fondations-speciales-logo.png' 
  },
  { 
    name: '3Géotech BTP', 
    role: 'Routes & Géotechnique Algérie',
    logo: '/files/senelabo/img/algerie-geotechnique-route-3geotech-btp-logo.png' 
  },
  { 
    name: 'SENE Projets', 
    role: 'Ingénierie & Conseil BTP',
    logo: '/files/senelabo/img/sene_projets.png' 
  },
  { 
    name: 'The World Bank Group / IFC', 
    role: 'Bailleur International',
    logo: null 
  },
  { 
    name: 'AGEROUTE Sénégal', 
    role: 'Agence de Gestion des Routes',
    logo: null 
  },
  { 
    name: 'Eiffage Sénégal', 
    role: 'Major BTP & Concessions',
    logo: null 
  },
  { 
    name: 'Saudi Binladin Group', 
    role: 'Grandes Infrastructures AIBD',
    logo: null 
  },
  { 
    name: 'DANGOTE Group', 
    role: 'Industrie & Cimenterie de Pout',
    logo: null 
  },
  { 
    name: 'Egis International', 
    role: 'Ingénierie & Catalogue Chaussées',
    logo: null 
  },
  { 
    name: 'IFSTTAR', 
    role: 'Recherche Routière & Transports',
    logo: null 
  }
];

export const FAQ_DATA = [
  {
    question: 'Pourquoi une étude géotechnique est-elle indispensable à Dakar et au Sénégal ?',
    answer: 'La presqu’île de Dakar et les régions sénégalaises présentent une géologie contrastée et souvent complexe : sables dunaires sensibles au décompactage, argiles gonflantes dans les zones de Diamniadio et Rufisque, présence d’anciennes carrières remblayées, et risques de remontée de nappe phréatique en saison des pluies. L’étude géotechnique permet de dimensionner les fondations au plus juste, d’éviter les surcoûts de béton et d’éliminer les risques de fissuration, d’affaissement ou d’effondrement.'
  },
  {
    question: 'Quelle est la différence entre une mission G1, G2 et G3/G4 selon la norme NF P 94-500 ?',
    answer: 'La mission G1 est une étude préalable pour cerner les grands risques lors de l’achat d’un terrain. La mission G2 (Avant-Projet et Projet) est celle qui permet aux ingénieurs structures de calculer le type et la profondeur des fondations de votre bâtiment. La mission G3 est réalisée par l’entreprise de travaux pour préparer son exécution, et la G4 est la supervision indépendante pour le compte du maître d’ouvrage.'
  },
  {
    question: 'Sous quels délais Senelabo BTP peut-il mobiliser une équipe et rendre un rapport ?',
    answer: 'Grâce à notre parc de 5 ateliers de sondage mobiles et notre laboratoire permanent à Dakar, nous pouvons mobiliser une équipe de sondage sous 48 à 72 heures ouvrées partout au Sénégal. Pour les essais d’identification en laboratoire (granulométrie, Proctor, CBR), les premiers résultats sont disponibles sous 3 à 5 jours. Un rapport géotechnique complet G2 AVP est habituellement remis sous 10 à 15 jours calendaires après fin des forages.'
  },
  {
    question: 'Quelles sont les capacités de votre déflectographe pour l’auscultation routière ?',
    answer: 'Notre déflectographe informatisé est monté sur un porteur lourd avec un essieu étalonné de 13 tonnes. Il réalise des mesures automatisées de fléchissement élastique tous les 3,5 mètres à une vitesse constante de 5 km/h, permettant d’ausculter jusqu’à 40 km de voie par jour avec un relevé géolocalisé au mètre près.'
  },
  {
    question: 'Senelabo BTP intervient-il en dehors du Sénégal ?',
    answer: 'Oui. Senelabo BTP s’est entouré de compétences pluridisciplinaires d’envergure sous-régionale et réalise des missions d’expertise, de sondages miniers (phosphates en Guinée-Bissau), de contrôle routier et de laboratoire dans plusieurs pays d’Afrique de l’Ouest.'
  }
];
