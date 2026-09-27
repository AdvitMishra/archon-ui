'use client';

import { Terminal, Layout, Code2, Sparkles, Palette, Mic, FileText } from 'lucide-react';
import { Dock, DockIcon, DockItem } from '@/components/core/dock';

const DOCK_ITEMS = [
  { title: 'Prompt', icon: <Terminal className="text-zinc-300" />, href: '#prompt' },
  { title: 'Sandbox', icon: <Layout className="text-zinc-300" />, href: '#sandbox' },
  { title: 'Code', icon: <Code2 className="text-zinc-300" />, href: '#code' },
  { title: 'Scorecard', icon: <Sparkles className="text-zinc-300" />, href: '#scorecard' },
  { title: 'Presets', icon: <Palette className="text-zinc-300" />, href: '#presets' },
  { title: 'Voice', icon: <Mic className="text-zinc-300" />, href: '#prompt' },
  { title: 'Legal', icon: <FileText className="text-zinc-300" />, href: '/terms' },
];

export function ArchonDock() {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <Dock className="items-end rounded-2xl border border-zinc-800 bg-zinc-900/80 px-3 pb-3 backdrop-blur-md">
        {DOCK_ITEMS.map((item) => (
          <DockItem
            key={item.title}
            href={item.href}
            className="group aspect-square rounded-xl bg-zinc-800/80 transition-colors hover:bg-zinc-700"
          >
            <span className="absolute -top-9 left-1/2 hidden w-fit -translate-x-1/2 whitespace-nowrap rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-300 group-hover:block">
              {item.title}
            </span>
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}
