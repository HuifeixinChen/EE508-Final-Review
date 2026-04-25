import type { ProgressState } from "../types";

export const PROGRESS_KEY = "ee508-progress";
export const WRONG_KEY = "ee508-wrong-answers";
export const THEME_KEY = "ee508-theme";

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : { masteredTopicIds: [] };
  } catch {
    return { masteredTopicIds: [] };
  }
}

export function saveProgress(progress: ProgressState) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function loadWrongAnswers(): string[] {
  try {
    return JSON.parse(localStorage.getItem(WRONG_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveWrongAnswers(ids: string[]) {
  localStorage.setItem(WRONG_KEY, JSON.stringify(Array.from(new Set(ids))));
}

export function resetAllProgress() {
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(WRONG_KEY);
}
