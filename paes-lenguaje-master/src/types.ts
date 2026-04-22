/**
 * Shared types for the PAES master app
 */

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // 0-3
  explanation: string;
  competency: 'Localizar' | 'Interpretar' | 'Evaluar';
}

export interface Passage {
  id: string;
  title: string;
  content: string;
  type: 'Literario' | 'No Literario' | 'Vocabulario';
  questions: Question[];
}

export interface UserStats {
  completedPassages: number;
  correctAnswers: number;
  totalAnswers: number;
  byCompetency: Record<Question['competency'], { correct: number; total: number }>;
}
