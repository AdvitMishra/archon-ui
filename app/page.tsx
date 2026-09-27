import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Workspace } from '@/components/workspace';
import { ArchonDock } from '@/components/archon-dock';
import { InViewRevealCard } from '@/components/in-view-card';
import { MessageSquareText, Mic, Gauge, Download, Palette, Users, ScanEye } from 'lucide-react';

const FEATURES = [
  {
    icon: MessageSquareText,
    title: 'Plain English to React',
    body: 'Type or speak a description. Archon UI returns a single self-contained component written with Tailwind CSS classes, ready to paste into a Next.js or Vite project.',
  },
  {
    icon: Mic,
    title: 'Hands-free prompting',
    body: 'The browser-native Web Speech API turns spoken descriptions into prompts, so you can iterate on a layout while presenting or sketching.',
  },
  {
    icon: Palette,
    title: 'Style preset chips',
    body: 'Apply Dark Fintech, Minimalist SaaS, Playful and Colorful, or Retro 90s design rules in one tap instead of writing CSS by hand.',
  },
  {
    icon: Users,
    title: 'Audience switcher',
    body: 'Shift placeholder copy between B2B Enterprise, Gen-Z E-Commerce, and Friendly Consumer without rewriting the prompt.',
  },
  {
    icon: ScanEye,
    title: 'Design scorecard',
    body: 'Every generation comes with a UX score from 0 to 10, a brand voice tag, and a short list of concrete usability fixes.',
  },
  {
    icon: Download,
    title: 'Pitch-ready export',
    body: 'Capture the live sandbox as a PNG for stakeholder decks, or copy the JSX straight into your repository.',
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Describe',
    body: 'Write or dictate what the component should do, who it is for, and which style vibe to apply.',
  },
  {
    number: '02',
    title: 'Synthesize',
    body: 'Gemini 2.0 Flash returns structured JSON with the component code and a design critique in under two seconds.',
  },
  {
    number: '03',
    title: 'Refine and export',
    body: 'Follow up in chat to adjust details, then export the PNG or copy the code. Your history carries context between turns.',
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
          <InViewRevealCard>
            <div className="max-w-3xl">
              <p className="mb-4 inline-block rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 font-mono text-xs text-zinc-400">
                React + Tailwind synthesis, free tier friendly
              </p>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-5xl">
                Describe a component. Get the code, the preview, and the critique.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
                Archon UI turns plain English or spoken instructions into a working React component
                rendered in a live sandbox, complete with a style preset, audience-aware copy, and a
                plain-language UX scorecard. Built for founders who do not write code and developers
                who do not write boilerplate twice.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#workspace"
                  className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
                >
                  Open the workspace
                </a>
                <a
                  href="#how-it-works"
                  className="rounded-lg border border-zinc-800 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900"
                >
                  See how it works
                </a>
              </div>
            </div>
          </InViewRevealCard>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100">How it works</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {STEPS.map((step) => (
              <InViewRevealCard key={step.number}>
                <div className="h-full rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                  <span className="font-mono text-xs text-violet-400">{step.number}</span>
                  <h3 className="mt-2 font-semibold text-zinc-100">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{step.body}</p>
                </div>
              </InViewRevealCard>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <InViewRevealCard key={feature.title}>
                <div className="h-full rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                  <feature.icon className="h-5 w-5 text-zinc-400" aria-hidden />
                  <h3 className="mt-3 font-semibold text-zinc-100">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{feature.body}</p>
                </div>
              </InViewRevealCard>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <InViewRevealCard>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="flex items-start gap-4">
                <Gauge className="mt-1 h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
                <div>
                  <h2 className="font-semibold text-zinc-100">Runs inside the free tier</h2>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-400">
                    A server-side request guard keeps usage within the Google AI Studio limit of 15
                    requests per minute, and your API key never reaches the browser. Responses start
                    streaming through the serverless route in about 1.5 seconds.
                  </p>
                </div>
              </div>
            </div>
          </InViewRevealCard>
        </section>

        <div id="workspace">
          <Workspace />
        </div>
      </main>
      <Footer />
      <ArchonDock />
    </>
  );
}
