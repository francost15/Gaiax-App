import { create } from "zustand";

type Answer = string | string[] | number | { [key: string]: number };

export interface TestStoreState {
  // Estados de las preguntas
  selectedAnswers: string[];
  ratingValue: number;
  rankingValues: Record<string, number>;
  openEndedAnswer: string;
  yesNoAnswer: boolean | null;

  // Estados para secciones y preguntas
  currentSection: number;
  currentQuestion: number;
  answers: Answer[];
  results: any | null;

  // Setters
  setSelectedAnswers: (answers: string[]) => void;
  setRatingValue: (val: number) => void;
  setRankingValues: (ranking: Record<string, number>) => void;
  setOpenEndedAnswer: (val: string) => void;
  setYesNoAnswer: (val: boolean | null) => void;

  setCurrentSection: (section: number) => void;
  setCurrentQuestion: (question: number) => void;
  setAnswers: (answers: Answer[]) => void;
  setResults: (results: any | null) => void;

  // Funciones auxiliares
  resetRanking: (options: string[]) => void;
  resetTest: () => void;
}

export const useTestStore = create<TestStoreState>((set) => ({
  // Inicialización
  selectedAnswers: [],
  ratingValue: 3,
  rankingValues: {},
  openEndedAnswer: "",
  yesNoAnswer: null,

  currentSection: 0,
  currentQuestion: 0,
  answers: [],
  results: null,

  // Setters
  setSelectedAnswers: (answers) => set({ selectedAnswers: answers }),
  setRatingValue: (val) => set({ ratingValue: val }),
  setRankingValues: (ranking) => set({ rankingValues: ranking }),
  setOpenEndedAnswer: (val) => set({ openEndedAnswer: val }),
  setYesNoAnswer: (val) => set({ yesNoAnswer: val }),

  setCurrentSection: (section) => set({ currentSection: section }),
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setAnswers: (answers) => set({ answers }),
  setResults: (results) => set({ results }),

  // Auxiliares
  resetRanking: (options) =>
    set(() => {
      const initial = options.reduce<Record<string, number>>((acc, opt, i) => {
        acc[opt] = i + 1;
        return acc;
      }, {});
      return { rankingValues: initial };
    }),
  resetTest: () =>
    set({
      currentSection: 0,
      currentQuestion: 0,
      answers: [],
      results: null,
      selectedAnswers: [],
      ratingValue: 3,
      rankingValues: {},
      openEndedAnswer: "",
      yesNoAnswer: null,
    }),
}));
