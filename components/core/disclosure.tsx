'use client';

import {
  createContext,
  useContext,
  useId,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'motion/react';

const DisclosureContext = createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}>({ open: false, onOpenChange: () => {}, id: 'disclosure' });

export function Disclosure({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <DisclosureContext.Provider value={{ open: !!open, onOpenChange: onOpenChange ?? (() => {}), id }}>
      {children}
    </DisclosureContext.Provider>
  );
}

export function DisclosureTrigger({ children }: { children: ReactNode }) {
  const { open, onOpenChange, id } = useContext(DisclosureContext);
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={`${id}-content`}
      onClick={() => onOpenChange(!open)}
      className="w-full text-left"
    >
      {children}
    </button>
  );
}

export function DisclosureContent({ children }: { children: ReactNode }) {
  const { open, id } = useContext(DisclosureContext);
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={`${id}-content`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
