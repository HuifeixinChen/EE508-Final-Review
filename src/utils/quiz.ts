import type { QuizQuestion } from "../types";

export function sampleQuestions(questions: QuizQuestion[], count: number): QuizQuestion[] {
  return [...questions].sort(() => Math.random() - 0.5).slice(0, count);
}

export function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase().replace(/\s+/g, " ");
}

export function isCorrect(question: QuizQuestion, answer: string): boolean {
  return normalizeAnswer(answer) === normalizeAnswer(question.correctAnswer);
}
