'use client';

import { create } from 'zustand';
import type { Scorecard } from '@/components/scorecard-disclosure';

export type HistoryEntry = {
  role: 'user' | 'model';
  text: string;
};

type WorkspaceState = {
  prompt: string;
  stylePreset: string;
  audienceTarget: string;
  jsxCode: string;
  componentName: string;
  scorecard: Scorecard | null;
  history: HistoryEntry[];
  versions: { componentName: string; jsxCode: string; savedAt: string }[];
  viewport: 'desktop' | 'mobile';
  setPrompt: (prompt: string) => void;
  setStylePreset: (preset: string) => void;
  setAudience: (audience: string) => void;
  setViewport: (viewport: 'desktop' | 'mobile') => void;
  applySynthesis: (payload: {
    componentName: string;
    jsxCode: string;
    scorecard: Scorecard;
    userPrompt: string;
  }) => void;
  reset: () => void;
};

export const useWorkspace = create<WorkspaceState>((set) => ({
  prompt: '',
  stylePreset: 'Dark Fintech',
  audienceTarget: 'B2B Enterprise',
  jsxCode: '',
  componentName: '',
  scorecard: null,
  history: [],
  versions: [],
  viewport: 'desktop',
  setPrompt: (prompt) => set({ prompt }),
  setStylePreset: (stylePreset) => set({ stylePreset }),
  setAudience: (audienceTarget) => set({ audienceTarget }),
  setViewport: (viewport) => set({ viewport }),
  applySynthesis: ({ componentName, jsxCode, scorecard, userPrompt }) =>
    set((state) => ({
      componentName,
      jsxCode,
      scorecard,
      history: [
        ...state.history,
        { role: 'user', text: userPrompt },
        { role: 'model', text: `Generated ${componentName}` },
      ],
      versions: [
        ...state.versions,
        { componentName, jsxCode, savedAt: new Date().toISOString() },
      ].slice(-20),
    })),
  reset: () =>
    set({ prompt: '', jsxCode: '', componentName: '', scorecard: null, history: [], versions: [] }),
}));
