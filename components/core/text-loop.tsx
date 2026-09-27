'use client';

import { Children, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, type Transition, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';

export function TextLoop({
  children,
  className,
  transition,
  variants,
  interval = 2.5,
}: {
  children: ReactNode;
  className?: string;
  transition?: Transition;
  variants?: Variants;
  interval?: number;
}) {
  const items = Children.toArray(children);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, interval * 1000);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  return (
    <span className={cn('relative inline-block whitespace-nowrap', className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants}
          className="inline-block will-change-transform"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
