import React, { useState, useEffect } from 'react';
import { ContactMessage } from '@/types';
import { messageService } from '@/services/messageService';
import toast from 'react-hot-toast';

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => { load(); }, []);
  const load = () => messageService.getAll().then(setMessages).catch(() => {});

  const markRead = async (id: string) => {
    try { await messageService.markAsRead(id); load(); } catch { toast.error('Erreur'); }
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-black text-[#001E42] uppercase">
          Messages ({messages.length})
          {unreadCount > 0 && <span className="ml-2 bg-[#FFB81C] text-[#001E42] px-2 py-0.5 rounded-full text-[8px]">{unreadCount} non lu{unreadCount > 1 ? 's' : ''}</span>}
        </h3>
      </div>
      <div className="space-y-4">
        {messages.length === 0 && <p className="text-center py-20 text-slate-400 font-bold italic">Aucun message pour le moment.</p>}
        {messages.map(m => (
          <div key={m.id} className={`p-6 rounded-2xl border ${m.isRead ? 'bg-slate-50 border-slate-100' : 'bg-white border-[#FFB81C] shadow-sm'}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-black text-[#001E42] uppercase text-sm">{m.name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{m.email} — {m.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-slate-100 rounded-full text-[8px] font-black text-slate-500 uppercase">{m.subject}</span>
                {!m.isRead && <button onClick={() => markRead(m.id)} className="text-[8px] font-black text-[#FFB81C] uppercase underline">Marquer Lu</button>}
              </div>
            </div>
            <p className="text-slate-600 text-sm italic">"{m.message}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;
