export type LearningPreferences = {
  id: string;
  userId: string;
  formats: string[];
  learningStyleKolb: string;
  availableTime: number;
  goals: string[];
  strengths: string[];
  skillLevel?: number;
  improvementAreas: string[];
};

export type Result = Record<string, string | number>;

export type Config = any;
