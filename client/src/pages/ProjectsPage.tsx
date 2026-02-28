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
      <div className="pt-40 pb-32 bg-slate-50 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6">
          <ScrollReveal>
            <header className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
              <div>
                <h2 className="text-6xl font-black italic text-[#001E42] uppercase tracking-tighter mb-4 leading-none">Portfolio <br /><span className="text-[#FFB81C]">Infrastructures.</span></h2>
                <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Preuves tangibles de notre expertise sur le terrain.</p>
              </div>
              <FilterTabs filters={statusFilters} activeFilter={filter} onFilterChange={setFilter} />
            </header>
          </ScrollReveal>

          {/* Sector filters */}
          <ScrollReveal>
            <div className="mb-12">
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

            {/* Before/After */}
            {selectedProject.beforeImage && selectedProject.afterImage && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Avant</p>
                  <img src={selectedProject.beforeImage} alt="Avant" className="w-full h-48 object-cover rounded-xl" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Après</p>
                  <img src={selectedProject.afterImage} alt="Après" className="w-full h-48 object-cover rounded-xl" />
                </div>
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
