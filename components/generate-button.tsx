'use client';

import { ArrowRight, Loader2 } from 'lucide-react';
import { GlowEffect } from '@/components/core/glow-effect';
import { BorderTrail } from '@/components/core/border-trail';
import { useState } from 'react';

export function GenerateButton({
  onClick,
  isLoading,
}: {
  onClick: () => void;
  isLoading: boolean;
}) {
  const [showTrail, setShowTrail] = useState(false);

  const handleClick = () => {
    setShowTrail(true);
    onClick();
  };

  const handleAnimationComplete = () => {
    setTimeout(() => {
      setShowTrail(false);
    }, 300);
  };

  return (
    <div className="relative inline-block rounded-lg">
      <GlowEffect
        colors={['#7C3AED', '#10B981', '#6366F1', '#F59E0B']}
        mode="colorShift"
        blur="soft"
        duration={3}
        scale={0.9}
      />

      {showTrail && (
        <BorderTrail
          className="bg-linear-to-l from-green-300 via-green-500 to-green-300 dark:from-green-700/30 dark:via-green-500 dark:to-green-700/30"
          size={120}
          transition={{
            ease: [0, 0.5, 0.8, 0.5],
            duration: 4,
            repeat: 2,
          }}
          onAnimationComplete={handleAnimationComplete}
        />
      )}

      <button
        onClick={handleClick}
        disabled={isLoading}
        className="relative inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-50 outline-none transition-all hover:bg-zinc-900 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <>
            Generating
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            Generate
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
}