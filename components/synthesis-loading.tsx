'use client';

import { TextShimmer } from '@/components/core/text-shimmer';

export function SynthesisLoadingState() {
  return (
    <TextShimmer className="font-mono text-sm" duration={1}>
      Synthesizing component code...
    </TextShimmer>
  );
}
