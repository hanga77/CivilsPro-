import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Connexion réussie');
      navigate('/admin/dashboard');
    } catch {
      toast.error('Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-40 pb-32 bg-slate-50 min-h-screen animate-fadeIn">
      <div className="max-w-md mx-auto bg-white p-12 border border-slate-200 shadow-2xl rounded-[2rem]">
        <h2 className="text-3xl font-black text-[#001E42] italic uppercase mb-10 text-center tracking-tighter">Accès <span className="text-[#FFB81C]">Ingénieur.</span></h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="EMAIL ADMINISTRATEUR"
            className="w-full bg-slate-50 p-6 text-xs font-black uppercase border border-slate-200 rounded-xl outline-none focus:border-[#FFB81C]"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="MOT DE PASSE"
            className="w-full bg-slate-50 p-6 text-xs font-black border border-slate-200 rounded-xl outline-none focus:border-[#FFB81C]"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-[#001E42] text-white font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-[#FFB81C] hover:text-[#001E42] transition-all rounded-xl disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Entrer dans le Dashboard'}
          </button>
        </form>
        <p className="mt-8 text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">Connexion sécurisée JWT</p>
      </div>
    </div>
  );
};

export default AdminLogin;
