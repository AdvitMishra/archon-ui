'use client';

export function TechLogo({ name, path }: { name: string; path: string }) {
  return (
    <span className="flex items-center gap-2 opacity-70 transition-opacity hover:opacity-100">
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-zinc-400" aria-hidden>
        <path d={path} />
      </svg>
      <span className="text-xs font-medium text-zinc-400">{name}</span>
    </span>
  );
}
