'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function TextShimmer({
  children,
  className,
  duration = 1.5,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <motion.span
      className={cn(
        'inline-block bg-clip-text text-transparent',
        'bg-[linear-gradient(110deg,#a1a1aa,45%,#e9e9ff,55%,#a1a1aa)] bg-[length:200%_100%]',
        className
      )}
      initial={{ backgroundPositionX: '100%' }}
      animate={{ backgroundPositionX: '-100%' }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {children}
    </motion.span>
  );
}
