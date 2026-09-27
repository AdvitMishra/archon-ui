import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Archon UI. Natural language web component synthesis.</p>
        <div className="flex gap-5">
          <Link href="/privacy" className="transition-colors hover:text-zinc-300">Privacy Policy</Link>
          <Link href="/terms" className="transition-colors hover:text-zinc-300">Terms and Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
