'use client';

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { cn } from '@/lib/utils';

const INITIAL_SIZE = 40;
const MAGNIFIED_SIZE = 68;
const MAGNIFICATION_RANGE = 140;

const DockMouseXContext = createContext<MotionValue<number> | null>(null);

export function Dock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <DockMouseXContext.Provider value={mouseX}>
      <motion.div
        onMouseMove={(event) => mouseX.set(event.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn('mx-auto flex items-end gap-2', className)}
        role="toolbar"
        aria-label="Quick navigation"
      >
        {children}
      </motion.div>
    </DockMouseXContext.Provider>
  );
}

export function DockItem({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const contextMouseX = useContext(DockMouseXContext);
  const fallbackMouseX = useMotionValue(Infinity);
  const mouseX = contextMouseX ?? fallbackMouseX;

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - (bounds.x + bounds.width / 2);
  });

  const sizeSync = useTransform(
    distance,
    [-MAGNIFICATION_RANGE, 0, MAGNIFICATION_RANGE],
    [INITIAL_SIZE, MAGNIFIED_SIZE, INITIAL_SIZE]
  );
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      className={cn(
        'relative flex cursor-pointer items-center justify-center',
        className
      )}
    >
      {href ? <a href={href} className="flex h-full w-full items-center justify-center">{children}</a> : children}
    </motion.div>
  );
}

export function DockLabel({ children }: { children: ReactNode }) {
  return (
    <span className="pointer-events-none absolute -top-9 left-1/2 w-fit -translate-x-1/2">
      <AnimatePresence>
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="block rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-300"
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function DockIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-1/2 w-1/2 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
      {children}
    </span>
  );
}
