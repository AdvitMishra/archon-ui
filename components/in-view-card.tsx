'use client';

import type { ReactNode } from 'react';
import { InView } from '@/components/core/in-view';

export function InViewRevealCard({ children }: { children: ReactNode }) {
  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </InView>
  );
}
