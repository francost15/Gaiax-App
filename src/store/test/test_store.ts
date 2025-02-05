import { create } from "zustand";

type Answer = string | string[] | number | { done: boolean };

export interface TestStoreState {
  // Estados de las preguntas
  selectedAnswers: string[];
  ratingValue: number;
  rankingValues: Record<string, number>;
  openEndedAnswer: string;
  yesNoAnswer: boolean | null;
  availableTime: number | null;

  // Estados para secciones y preguntas
  currentSection: number;
  currentQuestion: number;
  answers: Answer[];
  results: any | null;

  // Nuevos estados para el test:
  selectedFormats: string[];
  selectedLearningStyle: string;
  improvementAreas: string[];
  userId: string;

  selectedGoals: string[];

  // Setters
  setSelectedAnswers: (answers: string[]) => void;
  setRatingValue: (val: number) => void;
  setRankingValues: (ranking: Record<string, number>) => void;
  setOpenEndedAnswer: (val: string) => void;
  setYesNoAnswer: (val: boolean | null) => void;
  setAvailableTime: (time: number) => void;
  setCurrentSection: (section: number) => void;
  setCurrentQuestion: (question: number) => void;
  setSelectedGoals: (goals: string[]) => void;
  setAnswers: (answers: Answer[]) => void;
  setResults: (results: any | null) => void;
  setSelectedFormats: (formats: string[]) => void;
  setSelectedLearningStyle: (style: string) => void;
  setImprovementAreas: (areas: string[]) => void;
  setUserId: (id: string) => void;

  // Funciones auxiliares
  resetRanking: (options: string[]) => void;
  resetTest: () => void;
}

export const useTestStore = create<TestStoreState>((set) => ({
  // Inicialización
  selectedGoals: [],
  selectedAnswers: [],
  ratingValue: 3,
  rankingValues: {},
  openEndedAnswer: "",
  yesNoAnswer: null,
  availableTime: null, // Inicializado en null para evitar undefined
  currentSection: 0,
  currentQuestion: 0,
  answers: [],
  results: null,
  selectedFormats: [],
  selectedLearningStyle: "",
  improvementAreas: [],
  userId: "",

  // Setters
  setSelectedGoals: (goals) => set({ selectedGoals: goals }),
  setSelectedAnswers: (answers) => set({ selectedAnswers: answers }),
  setRatingValue: (val) => set({ ratingValue: val }),
  setRankingValues: (ranking) => set({ rankingValues: ranking }),
  setOpenEndedAnswer: (val) => set({ openEndedAnswer: val }),
  setYesNoAnswer: (val) => set({ yesNoAnswer: val }),
  setAvailableTime: (time) => set({ availableTime: time }),
  setCurrentSection: (section) => set({ currentSection: section }),
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setAnswers: (answers) => set({ answers }),
  setResults: (results) => set({ results }),
  setSelectedFormats: (formats) => set({ selectedFormats: formats }),
  setSelectedLearningStyle: (style) => set({ selectedLearningStyle: style }),
  setImprovementAreas: (areas) => set({ improvementAreas: areas }),
  setUserId: (id) => set({ userId: id }),

  // Funciones auxiliares
  resetRanking: (options) =>
    set({
      rankingValues: options.reduce(
        (acc, option) => ({ ...acc, [option]: 0 }),
        {} as Record<string, number>
      ),
    }),
  resetTest: () =>
    set({
      selectedAnswers: [],
      ratingValue: 3,
      rankingValues: {},
      openEndedAnswer: "",
      yesNoAnswer: null,
      availableTime: null,
      currentSection: 0,
      currentQuestion: 0,
      answers: [],
      results: null,
      selectedFormats: [],
      selectedLearningStyle: "",
      improvementAreas: [],
    }),
}));
