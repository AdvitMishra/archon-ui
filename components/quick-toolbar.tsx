'use client';

import React, { useRef, useState } from 'react';
import useMeasure from 'react-use-measure';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import useClickOutside from '@/hooks/useClickOutside';
import { Mic, Users, SlidersHorizontal, Share2 } from 'lucide-react';
import { STYLE_PRESETS } from '@/components/vibe-style-panel';
import { AUDIENCES } from '@/lib/constants';

export default function ArchonQuickToolbar({
  onVoice,
  onAudience,
  onPreset,
  onExportPng,
  onCopyLink,
}: {
  onVoice: () => void;
  onAudience: (audience: string) => void;
  onPreset: (preset: string) => void;
  onExportPng: () => void;
  onCopyLink: () => void;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [contentRef, { height: heightContent }] = useMeasure();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(ref, () => {
    setIsOpen(false);
    setActive(null);
  });

  const TOOLBAR_ITEMS = [
    {
      id: 1,
      label: 'Voice Input',
      title: <Mic className="h-5 w-5" />,
      content: (
        <div className="flex flex-col gap-2 p-2">
          <span className="text-xs font-semibold text-zinc-300">Hands-Free Voice Prompting</span>
          <button
            onClick={onVoice}
            className="w-full rounded-md bg-violet-600 py-1.5 text-xs font-medium text-white transition-colors hover:bg-violet-500"
          >
            Start Listening
          </button>
        </div>
      ),
    },
    {
      id: 2,
      label: 'Audience Switcher',
      title: <Users className="h-5 w-5" />,
      content: (
        <div className="flex flex-col gap-1 p-2 text-xs text-zinc-300">
          <span className="mb-1 font-semibold text-zinc-200">Target Demographic</span>
          {AUDIENCES.map((audience) => (
            <button
              key={audience}
              onClick={() => onAudience(audience)}
              className="rounded px-2 py-1 text-left transition-colors hover:bg-zinc-800"
            >
              {audience}
            </button>
          ))}
        </div>
      ),
    },
    {
      id: 3,
      label: 'Style Presets',
      title: <SlidersHorizontal className="h-5 w-5" />,
      content: (
        <div className="flex flex-col gap-1 p-2 text-xs text-zinc-300">
          <span className="mb-1 font-semibold text-zinc-200">Design Vibe</span>
          {STYLE_PRESETS.map((preset) => (
            <button
              key={preset.title}
              onClick={() => onPreset(preset.title)}
              className="rounded px-2 py-1 text-left transition-colors hover:bg-zinc-800"
            >
              {preset.title}
            </button>
          ))}
        </div>
      ),
    },
    {
      id: 4,
      label: 'Export & Share',
      title: <Share2 className="h-5 w-5" />,
      content: (
        <div className="flex flex-col gap-2 p-2">
          <button
            onClick={onExportPng}
            className="w-full rounded-md bg-zinc-800 py-1.5 text-xs text-zinc-200 transition-colors hover:bg-zinc-700"
          >
            Export PNG Pitch Image
          </button>
          <button
            onClick={onCopyLink}
            className="w-full rounded-md bg-zinc-800 py-1.5 text-xs text-zinc-200 transition-colors hover:bg-zinc-700"
          >
            Copy Shareable Link
          </button>
        </div>
      ),
    },
  ];

  return (
    <MotionConfig transition={{ type: 'spring', bounce: 0.1, duration: 0.25 }}>
      <div className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2" ref={ref}>
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: heightContent || 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden border-b border-zinc-800"
              >
                <div ref={contentRef} className="min-w-[220px] p-1">
                  {TOOLBAR_ITEMS.map((item) => (
                    active === item.id && <div key={item.id}>{item.content}</div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex space-x-1 p-1.5">
            {TOOLBAR_ITEMS.map((item) => (
              <button
                key={item.id}
                aria-label={item.label}
                onClick={() => {
                  if (!isOpen) setIsOpen(true);
                  if (active === item.id) {
                    setIsOpen(false);
                    setActive(null);
                    return;
                  }
                  setActive(item.id);
                }}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 ${
                  active === item.id ? 'bg-zinc-800 text-zinc-100' : ''
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
