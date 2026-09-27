'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type GlowEffectProps = {
  colors?: string[];
  mode?: 'colorShift' | 'rotate';
  blur?: 'soft' | 'medium' | 'strong';
  duration?: number;
  scale?: number;
  className?: string;
};

export function GlowEffect({
  colors = ['#7C3AED', '#10B981', '#6366F1', '#F59E0B'],
  mode = 'colorShift',
  blur = 'soft',
  duration = 3,
  scale = 0.9,
  className,
}: GlowEffectProps) {
  const blurMap = { soft: 'blur-md', medium: 'blur-lg', strong: 'blur-xl' };
  const gradient = `conic-gradient(from 0deg, ${colors.join(', ')}, ${colors[0]})`;

  return (
    <motion.div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 -z-10', blurMap[blur], className)}
      style={{ borderRadius: 'inherit', scale }}
      animate={
        mode === 'rotate'
          ? { rotate: 360 }
          : { rotate: 360, opacity: [0.5, 0.9, 0.5] }
      }
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <div className="absolute inset-0" style={{ background: gradient, borderRadius: 'inherit' }} />
      <div className="absolute inset-[2px] rounded-[inherit] bg-zinc-950" />
    </motion.div>
  );
}
