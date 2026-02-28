import React from 'react';
import { TeamMember } from '@/types';

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-slate-100">
      <div className="h-72 overflow-hidden">
        <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-lg font-black text-[#001E42] uppercase tracking-tight">{member.name}</h3>
        <p className="text-[10px] font-black text-[#FFB81C] uppercase tracking-widest mb-3">{member.role}</p>
        <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>
        {member.socialLinks && (
          <div className="flex justify-center gap-3 mt-4">
            {member.socialLinks.linkedin && (
              <a href={member.socialLinks.linkedin} target="_blank" className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#001E42] hover:text-white transition-all">
                <i className="fab fa-linkedin-in text-xs"></i>
              </a>
            )}
            {member.socialLinks.email && (
              <a href={`mailto:${member.socialLinks.email}`} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#001E42] hover:text-white transition-all">
                <i className="fas fa-envelope text-xs"></i>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;
