'use client';

import { InfiniteSlider } from '@/components/core/infinite-slider';
import { TechLogo } from '@/components/tech-logo';

const STACK = [
  { name: 'Next.js', path: 'M12 2L2 22h20L12 2zm0 6l6 12H6l6-12z' },
  { name: 'React', path: 'M12 10a2 2 0 100 4 2 2 0 000-4zm-7 2a7 7 0 0114 0 7 7 0 01-14 0zm2.5 0a4.5 4.5 0 009 0 4.5 4.5 0 00-9 0z' },
  { name: 'Tailwind CSS', path: 'M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 1.9 1.5C13.4 11 14.6 12 17 12c2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-1.9-1.5C15.6 7 14.4 6 12 6zM7 12c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 1.9 1.5 1 1.5 2.2 2.5 4.6 2.5 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-1.9-1.5C10.6 13 9.4 12 7 12z' },
  { name: 'Google Gemini 2.0', path: 'M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z' },
  { name: 'TypeScript', path: 'M2 4h20v16H2V4zm9.5 8.6c0-1.2-.7-1.9-1.9-1.9-.9 0-1.6.4-2 1.1l1.2.7c.2-.4.5-.6.9-.6.4 0 .6.2.6.6v.4h-.8c-1.5 0-2.3.7-2.3 1.8 0 1.1.8 1.8 1.9 1.8.7 0 1.3-.3 1.6-.9.3.6.9.9 1.7.9.4 0 .8-.1 1.1-.3v-1.3c-.2.1-.4.2-.7.2-.4 0-.6-.2-.6-.7v-.8h.3zm4.6-1.8h-1.6v5.4h1.5v-1.4h.4c1.5 0 2.4-.8 2.4-2s-.9-2-2.7-2zm-.1 2.8h-.3v-1.4h.3c.6 0 .9.3.9.7s-.3.7-.9.7z' },
  { name: 'Monaco Editor', path: 'M4 4h16v16H4V4zm3 4l4 4-4 4m5 0h5' },
  { name: 'Vercel', path: 'M12 4l9 16H3l9-16z' },
];

export function TechStackSlider() {
  return (
    <InfiniteSlider gap={32} reverse speed={30} className="py-2">
      {STACK.map((tech) => (
        <TechLogo key={tech.name} name={tech.name} path={tech.path} />
      ))}
    </InfiniteSlider>
  );
}
