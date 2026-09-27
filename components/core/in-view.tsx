'use client';

import type { ReactNode } from 'react';
import { motion, type Transition, type Variants } from 'motion/react';

export function InView({
  children,
  variants,
  transition,
  className,
  once = true,
}: {
  children: ReactNode;
  variants?: Variants;
  transition?: Transition;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
