'use client';

import { Children, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function InfiniteSlider({
  children,
  gap = 16,
  reverse = false,
  speed = 40,
  className,
}: {
  children: ReactNode;
  gap?: number;
  reverse?: boolean;
  speed?: number;
  className?: string;
}) {
  const count = Children.count(children);
  const copy = (
    <div
      className="flex shrink-0 items-center"
      style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
      aria-hidden={false}
    >
      {children}
    </div>
  );

  return (
    <div className={cn('flex w-full overflow-hidden', className)}>
      <motion.div
        className="flex will-change-transform"
        initial={{ x: reverse ? '-50%' : '0%' }}
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ ease: 'linear', duration: speed, repeat: Infinity }}
        style={{ gap: 0 }}
      >
        {copy}
        <div
          className="flex shrink-0 items-center"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
          aria-hidden
        >
          {children}
        </div>
      </motion.div>
      <span className="sr-only">{count} technology logos</span>
    </div>
  );
}
