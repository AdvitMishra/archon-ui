import Link from 'next/link';
import { Hexagon } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-100">
          <Hexagon className="h-5 w-5 text-violet-500" aria-hidden />
          Archon UI
        </Link>
        <div className="flex items-center gap-5 text-sm text-zinc-400">
          <a href="/#workspace" className="transition-colors hover:text-zinc-100">Workspace</a>
          <a href="/#how-it-works" className="transition-colors hover:text-zinc-100">How it works</a>
          <Link href="/privacy" className="transition-colors hover:text-zinc-100">Privacy</Link>
          <Link href="/terms" className="transition-colors hover:text-zinc-100">Terms</Link>
        </div>
      </nav>
    </header>
  );
}
