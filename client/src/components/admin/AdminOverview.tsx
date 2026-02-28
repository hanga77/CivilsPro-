import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { projectService } from '@/services/projectService';
import { messageService } from '@/services/messageService';
import { rentalService } from '@/services/rentalService';
import { industryService } from '@/services/industryService';

const CHART_COLORS = ['#001E42', '#FFB81C', '#10B981', '#3B82F6'];

const AdminOverview: React.FC = () => {
  const [stats, setStats] = useState({ projects: 0, messages: 0, unread: 0, rentals: 0, industries: 0 });
  const [projectData, setProjectData] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      projectService.getAll(),
      messageService.getAll(),
      rentalService.getAll(),
      industryService.getAll(),
    ]).then(([projects, messages, rentals, industries]) => {
      setStats({
        projects: projects.length,
        messages: messages.length,
        unread: messages.filter((m: any) => !m.isRead).length,
        rentals: rentals.length,
        industries: industries.length,
      });

      const statusCounts = projects.reduce((acc: any, p: any) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
      }, {});
      setProjectData(Object.entries(statusCounts).map(([name, value]) => ({ name, value })));
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'Projets', value: stats.projects, icon: 'fa-helmet-safety', color: 'bg-blue-50 text-blue-600' },
    { label: 'Messages', value: stats.messages, icon: 'fa-envelope', color: 'bg-green-50 text-green-600', badge: stats.unread },
    { label: 'Matériel', value: stats.rentals, icon: 'fa-truck-pickup', color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Secteurs', value: stats.industries, icon: 'fa-microchip', color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(card => (
          <div key={card.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                <i className={`fas ${card.icon}`}></i>
              </div>
              {card.badge ? <span className="bg-[#FFB81C] text-[#001E42] px-2 py-0.5 rounded-full text-[8px] font-black">{card.badge} non lu{card.badge > 1 ? 's' : ''}</span> : null}
            </div>
            <p className="text-3xl font-black text-[#001E42] italic">{card.value}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-[#001E42] uppercase mb-6">Projets par Statut</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={projectData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {projectData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-[#001E42] uppercase mb-6">Répartition</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={projectData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#FFB81C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
