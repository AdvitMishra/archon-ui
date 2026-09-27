'use client';

import { useState } from 'react';
import { Disclosure, DisclosureContent, DisclosureTrigger } from '@/components/core/disclosure';

export type Scorecard = {
  uxScore: number;
  brandVoice: string;
  critique: string;
  copywritingSuggestions: string;
  improvements: string[];
};

export function ScorecardDisclosure({ scorecard }: { scorecard: Scorecard | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-4"
      id="scorecard"
    >
      <Disclosure onOpenChange={setIsOpen} open={isOpen}>
        <DisclosureTrigger>
          <span className="flex w-full cursor-pointer items-center justify-between text-left text-sm font-semibold text-white">
            <span>AI Design &amp; Copy Scorecard</span>
            <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
              {scorecard ? `UX Score: ${scorecard.uxScore} / 10` : 'Awaiting first synthesis'}
            </span>
          </span>
        </DisclosureTrigger>
        <DisclosureContent>
          <div className="mt-3 flex flex-col gap-2 border-t border-zinc-800 pt-3 text-xs text-zinc-300">
            {scorecard ? (
              <>
                <p>
                  <strong className="text-zinc-100">Brand Voice:</strong> {scorecard.brandVoice}
                </p>
                <p>
                  <strong className="text-zinc-100">Critique:</strong> {scorecard.critique}
                </p>
                <p>
                  <strong className="text-zinc-100">Copy Notes:</strong> {scorecard.copywritingSuggestions}
                </p>
                <div className="mt-2">
                  <strong className="text-zinc-100">Actionable Improvements:</strong>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-zinc-400">
                    {scorecard.improvements?.map((tip: string, idx: number) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <p className="text-zinc-500">
                Generate a component to receive a UX score, brand voice tag, and usability critique.
              </p>
            )}
          </div>
        </DisclosureContent>
      </Disclosure>
    </div>
  );
}
