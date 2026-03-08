import React from 'react';
import { Project } from '@/types';
import WatermarkedImage from '@/components/ui/WatermarkedImage';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
  reverse?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, reverse = false }) => {
  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-white group shadow-xl overflow-hidden rounded-[2rem] cursor-pointer`} onClick={onClick}>
      <div className="lg:w-1/2 h-[400px] lg:h-[500px] overflow-hidden relative">
        <WatermarkedImage src={project.thumbnail} alt={project.name} className="h-full" />
        <div className="absolute top-8 left-8 bg-[#FFB81C] text-[#001E42] px-6 py-2 text-[10px] font-black uppercase tracking-widest z-10">{project.sector}</div>
      </div>
      <div className="flex-grow p-10 lg:p-16 flex flex-col justify-center bg-white">
        <div className="flex items-center gap-6 mb-6">
          <span className={`px-4 py-1 text-[9px] font-black uppercase tracking-widest rounded-full ${
            project.status === 'Terminé' ? 'bg-green-100 text-green-600' : project.status === 'En Cours' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'
          }`}>{project.status}</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Démarrage : {project.startDate}</span>
        </div>
        <h3 className="text-4xl lg:text-5xl font-black text-[#001E42] italic uppercase mb-6 tracking-tighter leading-tight">{project.name}</h3>
        <p className="text-slate-500 mb-8 max-w-xl text-lg italic leading-relaxed">"{project.description}"</p>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Progression</span>
            <span className="text-[9px] font-black text-[#001E42] uppercase">{project.progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#FFB81C] rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 pt-8 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase mb-2 tracking-widest">Maître d'Ouvrage</span>
            <span className="text-sm font-black text-[#001E42] uppercase">{project.client}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase mb-2 tracking-widest">Localisation</span>
            <span className="text-sm font-black text-[#001E42] uppercase">{project.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
