import { create } from "zustand";

export type Answer = "V" | "A" | "K";

export interface Results {
  V: number;
  A: number;
  K: number;
}

export interface Question {
  text: string;
  answers: { text: string; type: Answer }[];
}

interface VAKTestState {
  currentQuestion: number;
  answers: Answer[];
  results: Results | null;
  setCurrentQuestion: (question: number) => void;
  setAnswers: (answers: Answer[]) => void;
  setResults: (results: Results | null) => void;
  resetTest: () => void;
}

export const useVAKTestStore = create<VAKTestState>((set) => ({
  currentQuestion: 0,
  answers: [],
  results: null,
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setAnswers: (answers) => set({ answers }),
  setResults: (results) => set({ results }),
  resetTest: () =>
    set({
      currentQuestion: 0,
      answers: [],
      results: null,
    }),
}));
// vak-resulto.tsx
interface VAKStoreState {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  shouldShowToast: boolean;
  setShouldShowToast: (val: boolean) => void;
}

export const useVAKStore = create<VAKStoreState>((set) => ({
  isDialogOpen: false,
  setIsDialogOpen: (open) => set({ isDialogOpen: open }),
  shouldShowToast: false,
  setShouldShowToast: (val) => set({ shouldShowToast: val }),
}));
