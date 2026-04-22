import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Sparkles, BookCheck, Clock } from 'lucide-react';
import { Navigation, StatsCard } from './components/Layout';
import { PracticeModule } from './components/PracticeModule';
import { UserStats } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('paes_stats');
    return saved ? JSON.parse(saved) : {
      completedPassages: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      byCompetency: {
        Localizar: { correct: 0, total: 0 },
        Interpretar: { correct: 0, total: 0 },
        Evaluar: { correct: 0, total: 0 }
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('paes_stats', JSON.stringify(stats));
  }, [stats]);

  const handlePracticeComplete = (correct: number, total: number, competencyResults: Record<string, { correct: number, total: number }>) => {
    setStats(prev => {
      const newByCompetency = { ...prev.byCompetency };
      Object.entries(competencyResults).forEach(([comp, res]) => {
        const key = comp as keyof typeof newByCompetency;
        if (newByCompetency[key]) {
          newByCompetency[key].correct += res.correct;
          newByCompetency[key].total += res.total;
        }
      });

      return {
        ...prev,
        completedPassages: prev.completedPassages + 1,
        correctAnswers: prev.correctAnswers + correct,
        totalAnswers: prev.totalAnswers + total,
        byCompetency: newByCompetency
      };
    });
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header / Navigation Bar */}
      <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
          <span className="font-bold text-lg tracking-tight">PREP-PAES <span className="text-blue-600 uppercase text-xs">Lenguaje</span></span>
        </div>
        
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase leading-none">Estudiante</p>
            <p className="text-sm font-bold text-slate-800">Joaquín Morales</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
             <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Joaquin" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto w-full px-8 py-10 flex-1">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">
              ¡Hola de nuevo, Joaquín!
            </h1>
            <p className="text-slate-500 font-medium">
              Continúa con tu preparación para la PAES de Competencia Lectora.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-4 py-2 bg-slate-200 text-slate-700 rounded-full text-[10px] font-black uppercase tracking-widest">
              Meta: 850 pts
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <StatsCard stats={stats} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                    <GraduationCap size={24} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-1">Textos Literarios</h3>
                  <p className="text-sm text-slate-500 mb-6">Análisis de narrativa, lírica y drama.</p>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-2/3"></div>
                  </div>
                </section>

                <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                    <BookCheck size={24} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-1">Textos No Literarios</h3>
                  <p className="text-sm text-slate-500 mb-6">Artículos, infografías y textos de opinión.</p>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-full"></div>
                  </div>
                </section>

                <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                    <Clock size={24} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-1">Vocabulario</h3>
                  <p className="text-sm text-slate-500 mb-6">Contextualización y sinonimia en textos.</p>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full w-1/3"></div>
                  </div>
                </section>
              </div>

              {/* Action area */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-1">Continuar donde lo dejaste</h4>
                  <p className="text-slate-500 text-sm">Módulo 4: Estrategias de síntesis y parafraseo.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('practice')}
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
                >
                  Continuar Práctica
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'practice' && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <PracticeModule onComplete={handlePracticeComplete} />
            </motion.div>
          )}

          {activeTab === 'mock' && (
            <motion.div
              key="mock"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-8">
                <Target size={48} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Modo Simulacro</h2>
              <p className="text-slate-500 max-w-md mb-8">
                Próximamente: Una experiencia inmersiva con tiempo real, 65 preguntas y análisis detallado de puntaje estimado.
              </p>
              <button 
                onClick={() => setActiveTab('practice')}
                className="text-blue-600 font-bold hover:underline"
              >
                Volver a práctica libre
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
