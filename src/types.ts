import type { ComponentType } from "react";

export type Priority = "high" | "medium" | "low";
export type Difficulty = "easy" | "medium" | "hard";
export type QuizType = "multiple" | "truefalse" | "short" | "calculation" | "code" | "shape" | "scenario";

export interface Topic {
  id: string;
  navTitle: string;
  title: string;
  subtitle: string;
  priority?: Priority;
  tags: string[];
  concepts: string[];
  importance: string[];
  formulas: string[];
  intuition: string[];
  examQuestions: string[];
  answerTemplate: string;
  commonMistakes: string[];
  miniQuiz: string[];
  playgroundIds?: string[];
}

export interface Formula {
  id: string;
  group: string;
  label: string;
  expression: string;
  note: string;
}

export interface GlossaryTerm {
  term: string;
  english: string;
  definition: string;
  topic: string;
}

export interface QuizQuestion {
  id: string;
  topic: string;
  difficulty: Difficulty;
  type: QuizType;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  commonMistake: string;
}

export interface ProgressState {
  masteredTopicIds: string[];
}

export interface PlaygroundMeta {
  id: string;
  title: string;
  description: string;
  component: ComponentType;
}
