import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { Check, X, ArrowRight, Loader2, Info, Sparkles, BookOpen } from 'lucide-react';
import { generatePassage } from '../services/gemini';
import { Passage, Question } from '../types';
import { cn } from '../lib/utils';

interface PracticeModuleProps {
  onComplete: (correct: number, total: number) => void;
}

export const PracticeModule = ({ onComplete }: PracticeModuleProps) => {
  const [passage, setPassage] = useState<Passage | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [results, setResults] = useState<{ qIndex: number; correct: boolean }[]>([]);

  const fetchPassage = async () => {
    setLoading(true);
    const newPassage = await generatePassage();
    setPassage(newPassage);
    setLoading(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setResults([]);
  };

  useEffect(() => {
    fetchPassage();
  }, []);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleVerify = () => {
    if (selectedOption === null) return;
    const currentQ = passage!.questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQ.correctAnswer;
    
    setResults([...results, { qIndex: currentQuestionIndex, correct: isCorrect }]);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < passage!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      const correctCount = results.filter(r => r.correct).length;
      
      const compRes: Record<string, { correct: number, total: number }> = {};
      results.forEach((res) => {
        const comp = passage.questions[res.qIndex].competency;
        if (!compRes[comp]) compRes[comp] = { correct: 0, total: 0 };
        compRes[comp].total++;
        if (res.correct) compRes[comp].correct++;
      });

      onComplete(correctCount, passage.questions.length, compRes);
      setPassage(null); // Clear to show success state or fetch new
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-500">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="font-medium">Gemini está redactando un texto para ti...</p>
      </div>
    );
  }

  if (!passage) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
        <div className="p-4 bg-blue-50 rounded-full w-fit mx-auto mb-6">
          <BookOpen className="text-blue-600" size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-2">¡Misión cumplida!</h3>
        <p className="text-slate-500 mb-8">¿Quieres seguir practicando con otro texto?</p>
        <button 
          onClick={fetchPassage}
          className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
        >
          <Sparkles size={20} /> Generar nuevo texto
        </button>
      </div>
    );
  }

  const currentQ = passage.questions[currentQuestionIndex];

  return (
    <div id="practice-module" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Passage Side */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="col-span-1 lg:col-span-7 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 sticky top-24 max-h-[calc(100vh-140px)] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase tracking-widest border border-blue-100">
            {passage.type}
          </span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Lectura #{passage.id.slice(0,4)}</span>
        </div>
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 leading-tight">{passage.title}</h2>
        <div className="markdown-body prose prose-slate max-w-none">
          <Markdown>{passage.content}</Markdown>
        </div>
      </motion.div>

      {/* Questions Side */}
      <div className="col-span-1 lg:col-span-5 space-y-6">
        <motion.div 
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="flex gap-1.5 flex-1">
              {passage.questions.map((_, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "h-1.5 rounded-full transition-all flex-1",
                    idx === currentQuestionIndex ? "bg-blue-600" : (idx < currentQuestionIndex ? "bg-slate-200" : "bg-slate-100")
                  )}
                />
              ))}
            </div>
            <span className="text-[10px] font-black text-slate-300 uppercase ml-4 tracking-widest">Q{currentQuestionIndex + 1}</span>
          </div>

          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-slate-50 text-slate-500 rounded-lg border border-slate-100">
            <Info size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest leading-none">{currentQ.competency}</span>
          </div>
          
          <h3 className="text-xl font-bold text-slate-800 mb-8 leading-snug">{currentQ.text}</h3>

          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 group font-medium text-sm leading-relaxed",
                  selectedOption === idx 
                    ? "border-blue-600 bg-blue-50/30 text-blue-900" 
                    : "border-slate-50 hover:border-slate-200 bg-slate-50/50 text-slate-600",
                  isAnswered && idx === currentQ.correctAnswer && "border-emerald-500 bg-emerald-50/30 text-emerald-950",
                  isAnswered && selectedOption === idx && idx !== currentQ.correctAnswer && "border-red-500 bg-red-50/30 text-red-950"
                )}
              >
                <span className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-black transition-colors",
                  selectedOption === idx ? "bg-blue-600 text-white" : "bg-white text-slate-400 border border-slate-200"
                )}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="pt-0.5">{option}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {!isAnswered ? (
              <motion.button
                key="verify"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                disabled={selectedOption === null}
                onClick={handleVerify}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold disabled:opacity-30 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                Verificar respuesta
              </motion.button>
            ) : (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-3 text-slate-800 font-bold text-xs uppercase tracking-widest">
                    <Sparkles size={14} className="text-blue-600" />
                    Explicación del Tutor IA
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed italic border-l-2 border-blue-200 pl-4">
                    {currentQ.explanation}
                  </p>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                >
                  Continuar <ArrowRight size={20} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Floating Hint */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <h4 className="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
             <div className="w-6 h-6 bg-amber-100 text-amber-600 rounded flex items-center justify-center text-xs">!</div>
             Estrategia de Resolución
           </h4>
           <p className="text-xs text-slate-500 leading-relaxed">
             Para preguntas de <strong>{currentQ.competency}</strong>, considera {
               currentQ.competency === 'Localizar' ? 'identificar el párrafo exacto y buscar sinónimos de la información clave.' :
               currentQ.competency === 'Interpretar' ? 'el tono del autor y el propósito principal de este fragmento específico.' :
               'si el autor utiliza argumentos basados en hechos o juicios valorativos.'
             }
           </p>
        </div>
      </div>
    </div>
  );
};
