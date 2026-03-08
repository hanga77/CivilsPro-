import React, { useState, useEffect } from 'react';
import { Project } from '@/types';
import { INITIAL_PROJECTS } from '@/lib/constants';
import { projectService } from '@/services/projectService';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ProjectCard from '@/components/ui/ProjectCard';
import FilterTabs from '@/components/ui/FilterTabs';
import Modal from '@/components/ui/Modal';
import WatermarkedImage from '@/components/ui/WatermarkedImage';
import CTABanner from '@/components/ui/CTABanner';
import PageBanner from '@/components/ui/PageBanner';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [filter, setFilter] = useState('Tout');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    projectService.getAll().then(setProjects).catch(() => {});
  }, []);

  const sectors = ['Tout', ...new Set(projects.map(p => p.sector))];
  const statusFilters = ['Tout', 'En Cours', 'Terminé'];

  const filteredProjects = projects.filter(p => {
    if (filter === 'Tout') return true;
    if (filter === 'En Cours' || filter === 'Terminé') return p.status === filter;
    return p.sector === filter;
  });

  return (
    <div className="animate-fadeIn">
      <PageBanner
        label="Preuves de terrain"
        title="Portfolio"
        titleAccent="Infrastructures."
        description="Chaque projet est une démonstration concrète de notre maîtrise technique et de notre engagement envers l'excellence."
        breadcrumb="Réalisations"
        bgImage="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070"
        stats={[
          { value: '150+', label: 'Projets réalisés' },
          { value: '12 ANS', label: "d'expérience" },
          { value: '100%', label: 'Livrés dans les délais' },
          { value: '3', label: 'Pays couverts' },
        ]}
      />

      <div className="bg-slate-50 pb-32">
        <div className="max-w-[1400px] mx-auto px-6 pt-16">
          {/* Filters */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-12">
              <FilterTabs filters={statusFilters} activeFilter={filter} onFilterChange={setFilter} />
              <FilterTabs filters={sectors} activeFilter={filter} onFilterChange={setFilter} />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-20">
            {filteredProjects.map((p, idx) => (
              <ScrollReveal key={p.id} delay={idx * 0.1}>
                <ProjectCard project={p} reverse={idx % 2 !== 0} onClick={() => setSelectedProject(p)} />
              </ScrollReveal>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 font-bold italic text-lg">Aucun projet trouvé pour ce filtre.</p>
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} title={selectedProject?.name} maxWidth="max-w-4xl">
        {selectedProject && (
          <div className="space-y-8">
            <div className="h-80 rounded-xl overflow-hidden">
              <WatermarkedImage src={selectedProject.thumbnail} alt={selectedProject.name} className="h-full" />
            </div>

            {/* Before/After pairs */}
            {selectedProject.beforeAfterImages && selectedProject.beforeAfterImages.length > 0 && (
              <div className="space-y-6">
                <p className="text-[9px] font-black text-[#FFB81C] uppercase tracking-widest flex items-center gap-2">
                  <i className="fas fa-arrow-right-arrow-left"></i>
                  Évolution du Chantier ({selectedProject.beforeAfterImages.length} phase{selectedProject.beforeAfterImages.length > 1 ? 's' : ''})
                </p>
                {selectedProject.beforeAfterImages.map((pair, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    {pair.label && (
                      <p className="text-[10px] font-black text-[#001E42] uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-5 h-5 bg-[#001E42] text-white text-[8px] rounded-full flex items-center justify-center">{idx + 1}</span>
                        {pair.label}
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[8px] font-black text-red-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                          <i className="fas fa-arrow-left"></i> Avant
                        </p>
                        <div className="rounded-xl overflow-hidden h-48 bg-slate-200">
                          <WatermarkedImage src={pair.before} alt={`Avant ${pair.label || idx + 1}`} className="h-full" />
                        </div>
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-green-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                          <i className="fas fa-arrow-right"></i> Après
                        </p>
                        <div className="rounded-xl overflow-hidden h-48 bg-slate-200">
                          <WatermarkedImage src={pair.after} alt={`Après ${pair.label || idx + 1}`} className="h-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-slate-600 text-lg italic leading-relaxed">"{selectedProject.description}"</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-slate-50 p-4 rounded-xl">
                <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Statut</span>
                <span className="text-sm font-black text-[#001E42]">{selectedProject.status}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Client</span>
                <span className="text-sm font-black text-[#001E42]">{selectedProject.client}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Localisation</span>
                <span className="text-sm font-black text-[#001E42]">{selectedProject.location}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">Progression</span>
                <span className="text-sm font-black text-[#001E42]">{selectedProject.progress}%</span>
              </div>
            </div>

            {/* Gallery images */}
            {selectedProject.galleryImages && selectedProject.galleryImages.length > 0 && (
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Galerie du Projet</p>
                <div className="grid grid-cols-3 gap-3">
                  {selectedProject.galleryImages.map((img, i) => (
                    <WatermarkedImage key={i} src={img} alt={`${selectedProject.name} ${i + 1}`} className="h-32 rounded-lg" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      <CTABanner />
    </div>
  );
};

export default ProjectsPage;
