'use client';

import {
  Children,
  isValidElement,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, type Transition, type Variants } from 'motion/react';

export function TransitionPanel({
  activeIndex,
  variants,
  transition,
  children,
}: {
  activeIndex: number;
  variants?: Variants;
  transition?: Transition;
  children: ReactNode;
}) {
  const [previousIndex, setPreviousIndex] = useState(activeIndex);
  const [direction, setDirection] = useState(1);

  if (previousIndex !== activeIndex) {
    setDirection(activeIndex > previousIndex ? 1 : -1);
    setPreviousIndex(activeIndex);
  }

  const items = Children.toArray(children);

  return (
    <div className="relative">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={activeIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
        >
          {isValidElement(items[activeIndex]) ? items[activeIndex] : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
