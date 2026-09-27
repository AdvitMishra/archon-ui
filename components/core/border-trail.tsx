'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface BorderTrailProps {
  className?: string;
  size?: number;
  transition?: any;
  onAnimationComplete?: () => void;
}

export function BorderTrail({
  className,
  size = 120,
  transition,
  onAnimationComplete,
}: BorderTrailProps) {
  return (
    <motion.span
      aria-hidden
      className={cn(
        'absolute left-0 top-0 block h-[3px]',
        className
      )}
      style={{
        width: size,
        offsetPath: 'inset(0px round 12px)',
        offsetAnchor: '0% 0%',
        offsetRotate: 'auto',
        borderRadius: 9999,
      }}
      initial={{ offsetDistance: '0%' }}
      animate={{ offsetDistance: '100%' }}
      transition={
        transition ?? {
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }
      }
      onAnimationComplete={onAnimationComplete}
    />
  );
}