import React from 'react';
import { BookOpen, Trophy, Target, PieChart, GraduationCap, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { UserStats } from '../types';

interface StatsCardProps {
  stats: UserStats;
}

export const StatsCard = ({ stats }: StatsCardProps) => {
  const accuracy = stats.totalAnswers > 0 
    ? Math.round((stats.correctAnswers / stats.totalAnswers) * 100) 
    : 0;

  return (
    <div id="stats-dashboard" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col"
      >
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Acierto General</h3>
        <div className="flex flex-col items-center flex-1 justify-center py-2">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100" />
              <motion.circle 
                initial={{ strokeDashoffset: 352 }}
                animate={{ strokeDashoffset: 352 - (352 * accuracy) / 100 }}
                transition={{ duration: 1, ease: "easeOut" }}
                cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="10" fill="transparent" 
                strokeDasharray="352" className="text-blue-600" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-800">{accuracy}%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Precisión</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
      >
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Textos Completados</h3>
        <div className="flex flex-col gap-2">
          <div className="text-4xl font-black text-slate-800">{stats.completedPassages}</div>
          <p className="text-sm text-slate-500 font-medium italic">De un total renovado semanal de 15 textos.</p>
        </div>
        <div className="mt-8 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={cn("h-1.5 flex-1 rounded-full", i < stats.completedPassages ? "bg-emerald-500" : "bg-slate-100")} />
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-100 flex flex-col"
      >
        <h3 className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-4">Próximo Desafío</h3>
        <div className="flex-1">
          <h4 className="font-bold text-lg leading-tight mb-2">Ensayo Parcial: Narrativa</h4>
          <p className="text-blue-100 text-xs leading-relaxed mb-6 italic">Enfocado en identificar narrador y focalización.</p>
        </div>
        <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-sm text-sm">
          Comenzar Ahora
        </button>
      </motion.div>
    </div>
  );
};

export const Navigation = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: PieChart },
    { id: 'practice', label: 'Módulos', icon: GraduationCap },
    { id: 'mock', label: 'Ensayos', icon: Target },
  ];

  return (
    <nav id="main-nav" className="flex gap-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "text-sm font-bold transition-all py-5 relative",
            activeTab === tab.id 
              ? "text-blue-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600" 
              : "text-slate-500 hover:text-slate-800"
          )}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};
