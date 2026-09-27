'use client';

import React, { useState } from 'react';
import useMeasure from 'react-use-measure';
import { TransitionPanel } from '@/components/core/transition-panel';

export const STYLE_PRESETS = [
  { title: 'Dark Fintech', description: 'High contrast, deep zinc backgrounds with violet accent highlights.' },
  { title: 'Minimalist SaaS', description: 'Clean layout, subtle borders, and balanced monochrome typography.' },
  { title: 'Playful & Colorful', description: 'Vibrant gradients, soft rounded corners, and engaging visual accents.' },
  { title: 'Retro 90s', description: 'Neo-brutalist borders, bold shadows, and high-energy contrast tones.' },
];

export function VibeStyleTransitionPanel({
  onSelectPreset,
  selectedPreset,
}: {
  onSelectPreset: (preset: string) => void;
  selectedPreset: string;
}) {
  const activeIndex = Math.max(
    0,
    STYLE_PRESETS.findIndex((p) => p.title === selectedPreset)
  );
  const [directionIndex, setDirectionIndex] = useState(activeIndex);
  const [ref, bounds] = useMeasure();

  const goTo = (next: number) => {
    setDirectionIndex(next);
    onSelectPreset(STYLE_PRESETS[next].title);
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900" id="presets">
      <TransitionPanel
        activeIndex={activeIndex}
        variants={{
          enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
          center: { zIndex: 1, x: 0, opacity: 1 },
          exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            position: 'absolute',
          }),
        }}
        transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
      >
        {STYLE_PRESETS.map((preset, index) => (
          <div key={index} className="p-4" ref={ref}>
            <h3 className="font-semibold text-zinc-100">{preset.title}</h3>
            <p className="mt-1 text-sm text-zinc-400">{preset.description}</p>
            <p className="mt-2 font-mono text-xs text-zinc-500">
              {bounds.height > 0 ? '' : ''}
              {preset.title === selectedPreset ? 'Currently applied' : 'Tap apply to use this vibe'}
            </p>
          </div>
        ))}
      </TransitionPanel>
      <div className="flex items-center justify-between border-t border-zinc-800 p-3">
        <button
          onClick={() => goTo((activeIndex + 1) % STYLE_PRESETS.length)}
          className="text-xs font-medium text-violet-400 transition-colors hover:text-violet-300"
        >
          Cycle Style Vibe &#8594;
        </button>
        <button
          onClick={() => onSelectPreset(STYLE_PRESETS[activeIndex].title)}
          className="rounded-md bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-700"
        >
          Apply {STYLE_PRESETS[activeIndex].title}
        </button>
      </div>
      <span className="sr-only">Direction state {directionIndex}</span>
    </div>
  );
}
