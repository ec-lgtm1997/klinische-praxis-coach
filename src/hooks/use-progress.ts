import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "pflege-progress-v1";

export type Confidence = "all" | "partial" | "none";

interface ProgressState {
  /** quiz question id → correct? */
  quizAnswered: Record<string, boolean>;
  /** OSCE step key "caseId:step" → confidence */
  osceConfidence: Record<string, Confidence>;
  /** bookmarks: case id (quiz or osce) */
  bookmarks: string[];
}

const defaultState: ProgressState = {
  quizAnswered: {},
  osceConfidence: {},
  bookmarks: [],
};

function read(): ProgressState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(defaultState);

  useEffect(() => {
    setState(read());
  }, []);

  const persist = useCallback((next: ProgressState) => {
    setState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  return {
    state,
    markQuiz: (qid: string, correct: boolean) =>
      persist({ ...state, quizAnswered: { ...state.quizAnswered, [qid]: correct } }),
    setOsce: (caseId: string, step: number, c: Confidence) =>
      persist({
        ...state,
        osceConfidence: { ...state.osceConfidence, [`${caseId}:${step}`]: c },
      }),
    toggleBookmark: (id: string) => {
      const exists = state.bookmarks.includes(id);
      persist({
        ...state,
        bookmarks: exists ? state.bookmarks.filter((b) => b !== id) : [...state.bookmarks, id],
      });
    },
    isBookmarked: (id: string) => state.bookmarks.includes(id),
    reset: () => persist(defaultState),
  };
}
