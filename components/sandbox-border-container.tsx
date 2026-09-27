'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { BorderTrail } from '@/components/core/border-trail';

export function SandboxBorderContainer({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: ReactNode;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      {isLoading && (
        <BorderTrail
          className={cn(
            'bg-gradient-to-l from-emerald-300 via-emerald-500 to-emerald-300 transition-opacity duration-300',
            isLoading ? 'opacity-100' : 'opacity-0'
          )}
          size={120}
          transition={{
            ease: [0, 0.5, 0.8, 0.5],
            duration: 3,
            repeat: Infinity,
          }}
        />
      )}
      {children}
    </div>
  );
}
