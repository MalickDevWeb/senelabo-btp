import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Tag, 
  Layers, 
  ArrowUpRight, 
  Briefcase,
  Users,
  Search,
  Filter,
  History,
  Grid,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA, YEARLY_REFERENCES } from '../data/senelaboData';
import { ProjectCategory, ProjectReference } from '../types';

export const ProjectsSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'featured' | 'archive'>('featured');
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectReference | null>(null);
  
  // Archive filter state
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: 'Tous les Chantiers', value: 'all' },
    { label: 'Infrastructures & Routes', value: 'infrastructures' },
    { label: 'Bâtiments & Tours', value: 'batiments' },
    { label: 'Ouvrages d’Art & Ponts', value: 'ouvrages_art' },
    { label: 'Mines & Énergie', value: 'mines_energie' },
  ];

  const years = ['all', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006'];

  const filteredProjects = activeCategory === 'all' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === activeCategory);

  const filteredArchive = YEARLY_REFERENCES.filter(item => {
    const matchesYear = selectedYear === 'all' || item.year === selectedYear;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesSearch;
  });

  return (
    <section id="references" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header with reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300/60 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Nos Références Majeures</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-950 tracking-tight">
            Les plus grands chantiers du Sénégal reposent sur notre expertise
          </h2>
          <p className="text-base text-slate-600">
            Depuis 2006, Senelabo BTP a contribué à la sécurité géotechnique des infrastructures emblématiques : aéroports, tours grande hauteur, ponts stratégiques et axes autoroutiers.
          </p>
        </motion.div>

        {/* View Mode Switcher */}
        <div className="flex justify-center">
          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-200 shadow-2xs">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setViewMode('featured')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                viewMode === 'featured'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-4 h-4 text-amber-500" />
              <span>Chantiers Phares Illustrés</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setViewMode('archive')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                viewMode === 'archive'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <History className="w-4 h-4 text-amber-500" />
              <span>Archive Historique (2006-2014)</span>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {YEARLY_REFERENCES.length}
              </span>
            </motion.button>
          </div>
        </div>

        {viewMode === 'featured' ? (
          <div className="space-y-8">
            {/* Categories Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat.value}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeCategory === cat.value
                      ? 'bg-slate-900 text-amber-400 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>

            {/* Projects Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    whileHover={{ y: -6 }}
                    key={project.id}
                    className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl hover:border-amber-400/80 transition-all flex flex-col group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-800">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-amber-400 font-bold text-[11px] px-2.5 py-1 rounded-md uppercase tracking-wider border border-amber-500/20">
                        {project.tag}
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-900 font-bold text-xs px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{project.year}</span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base sm:text-lg font-bold text-slate-950 font-display group-hover:text-amber-600 transition-colors leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{project.location}</span>
                        </p>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                        <div className="text-[11px] text-slate-500">
                          Client : <strong className="text-slate-800">{project.client.split('/')[0]}</strong>
                        </div>
                        <span className="text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          Détails <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        ) : (
          /* Exhaustive Archive View */
          <div className="space-y-6">
            {/* Archive Filters */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Rechercher par projet ou client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-amber-500"
                />
              </div>

              {/* Year pills */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Année:
                </span>
                {years.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      selectedYear === yr
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {yr === 'all' ? 'Toutes' : yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Archive List / Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-2xs">
              {filteredArchive.map((ref, idx) => (
                <div key={`archive-${ref.year}-${ref.title}-${idx}`} className="p-4 sm:p-5 hover:bg-slate-50 transition-colors grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
                      <Calendar className="w-3 h-3 text-amber-600" />
                      {ref.year}
                    </span>
                  </div>
                  <div className="sm:col-span-6 space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      {ref.title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {ref.description}
                    </p>
                  </div>
                  <div className="sm:col-span-4 flex items-center justify-start sm:justify-end">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">
                        Maître d’Ouvrage / Partenaire
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {ref.client}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {filteredArchive.length === 0 && (
                <div className="p-8 text-center text-slate-500 text-xs sm:text-sm">
                  Aucune référence trouvée pour vos critères de recherche.
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Modal Detail for Featured Project with AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            key={`project-modal-${selectedProject.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="relative h-56 rounded-xl overflow-hidden bg-slate-900">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[11px] uppercase tracking-wider font-bold bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded">
                    {selectedProject.tag}
                  </span>
                  <h3 className="text-xl font-bold mt-1 text-white">{selectedProject.title}</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block">Maître d’Ouvrage / Client :</span>
                  <span className="font-bold text-slate-900">{selectedProject.client}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Localisation :</span>
                  <span className="font-bold text-slate-900">{selectedProject.location}, {selectedProject.country}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Période de réalisation :</span>
                  <span className="font-bold text-slate-900">{selectedProject.year}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Mission Géotechnique :</span>
                  <span className="font-bold text-amber-700">{selectedProject.missionType}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">
                  Descriptif des investigations réalisées
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">
                  Indicateurs techniques du projet
                </h4>
                <ul className="space-y-1.5">
                  {selectedProject.metrics.map((m, i) => (
                    <li key={`metric-${selectedProject.id}-${i}`} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Fermer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
